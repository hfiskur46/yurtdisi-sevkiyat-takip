const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const SECRET = process.env.JWT_SECRET || 'change_this_secret_in_prod';
const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';

let mailer = null;
if (SMTP_HOST && SMTP_USER) {
  mailer = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });
  mailer.verify().then(()=>console.log('Mailer ready')).catch(()=>console.log('Mailer not verified (check env)'));
} else {
  console.log('SMTP not configured; auto-email disabled by default. Set SMTP_* env vars to enable.');
}

// Dinamik port (Render uyumlu)
const PORT = process.env.PORT || 3000;

// Database setup
const DB_FILE = path.join(__dirname, 'shipments.db');
const DB_INIT_SQL = path.join(__dirname, 'db-init.sql');

const db = new sqlite3.Database(DB_FILE);

// Eğer database yoksa oluştur
if (!fs.existsSync(DB_FILE)) {
  if (!fs.existsSync(DB_INIT_SQL)) {
    console.error('db-init.sql bulunamadı. Lütfen dosyayı ekleyin.');
    process.exit(1);
  }
  const initSql = fs.readFileSync(DB_INIT_SQL, 'utf8');
  db.exec(initSql, (err) => { if(err) console.error('DB init error', err); else console.log('DB initialized'); });
}

// Ensure default users
function ensureDefaultUsers(){
  db.get("SELECT COUNT(*) AS c FROM users", (err,row)=>{
    if(err){ console.error(err); return; }
    if(row && row.c === 0){
      const saltRounds = 10;
      const adminPass = 'admin123';
      const repPass = 'rep123';
      bcrypt.hash(adminPass, saltRounds, (e,ah)=>{
        if(e) return console.error(e);
        bcrypt.hash(repPass, saltRounds, (ee,rh)=>{
          if(ee) return console.error(ee);
          db.run("INSERT INTO users (username, password, role, email) VALUES (?,?,?,?)", ['admin', ah, 'admin', 'admin@example.com']);
          db.run("INSERT INTO users (username, password, role, email) VALUES (?,?,?,?)", ['rep', rh, 'rep', 'rep@example.com']);
          console.log('Default users created: admin / rep');
        });
      });
    }
  });
}
setTimeout(ensureDefaultUsers, 500);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Auth helpers
function authenticateToken(req, res, next){
  const auth = req.headers['authorization'];
  if(!auth) return res.status(401).json({message:'No token'});
  const parts = auth.split(' ');
  if(parts.length !== 2) return res.status(401).json({message:'Bad auth header'});
  const token = parts[1];
  jwt.verify(token, SECRET, (err, user) => {
    if(err) return res.status(403).json({message:'Invalid token'});
    req.user = user;
    next();
  });
}

function requireRole(role){
  return (req, res, next) => {
    if(!req.user) return res.status(401).json({message:'Not authenticated'});
    if(req.user.role !== role && req.user.role !== 'admin') return res.status(403).json({message:'Forbidden'});
    next();
  };
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username=?", [username], (err,row)=>{
    if(err) return res.status(500).json({message:'Veritabanı hatası'});
    if(!row) return res.status(401).json({message:'Geçersiz kullanıcı adı veya şifre'});
    bcrypt.compare(password, row.password, (e,match)=>{
      if(e) return res.status(500).json({message:'Hash karşılaştırma hatası'});
      if(!match) return res.status(401).json({message:'Geçersiz kullanıcı adı veya şifre'});
      const token = jwt.sign({ id: row.id, username: row.username, role: row.role }, SECRET, { expiresIn: '8h' });
      res.json({ token, user: { id: row.id, username: row.username, role: row.role, email: row.email } });
    });
  });
});

// Users (admin)
app.get('/api/users', authenticateToken, requireRole('admin'), (req,res)=>{
  db.all("SELECT id, username, role, email, created_at FROM users", (err,rows)=>{
    if(err) return res.status(500).json({message:'Hata'});
    res.json(rows);
  });
});

app.post('/api/users', authenticateToken, requireRole('admin'), (req,res)=>{
  const { username, password, role, email } = req.body;
  if(!username || !password) return res.status(400).json({message:'Eksik alan'});
  bcrypt.hash(password, 10, (err,hash)=>{
    if(err) return res.status(500).json({message:'Hash hatası'});
    db.run("INSERT INTO users (username, password, role, email) VALUES (?,?,?,?)", [username, hash, role||'rep', email||null], function(err){
      if(err) return res.status(500).json({message: 'Kullanıcı eklenemedi', error: err.message});
      res.json({id: this.lastID});
    });
  });
});

// Shipments endpoints
app.get('/api/shipments', authenticateToken, (req,res)=>{
  const q = req.query.q || '';
  if(req.user.role === 'admin'){
    const sql = q ? "SELECT * FROM shipments WHERE tracking_no LIKE ? OR customer LIKE ? OR booking_no LIKE ? ORDER BY updated_at DESC" :
                    "SELECT * FROM shipments ORDER BY updated_at DESC";
    const param = '%' + q + '%';
    db.all(sql, q ? [param,param,param] : [], (err,rows)=>{
      if(err) return res.status(500).json({message:'Hata'});
      res.json(rows);
    });
  } else {
    const sql = q ? "SELECT * FROM shipments WHERE user_id = ? AND (tracking_no LIKE ? OR customer LIKE ? OR booking_no LIKE ?) ORDER BY updated_at DESC" :
                    "SELECT * FROM shipments WHERE user_id = ? ORDER BY updated_at DESC";
    const param = '%' + q + '%';
    db.all(sql, q ? [req.user.id,param,param,param] : [req.user.id], (err,rows)=>{
      if(err) return res.status(500).json({message:'Hata'});
      res.json(rows);
    });
  }
});

app.post('/api/shipments', authenticateToken, (req,res)=>{
  const s = req.body;
  const sql = `INSERT INTO shipments (transport, tracking_no, customer, country, carrier, booking_no, departure_date, free_time_days, eta, status, auto_email, email, notes, user_id)
               VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  db.run(sql, [s.transport||'road', s.tracking_no, s.customer, s.country, s.carrier, s.booking_no, s.departure_date, s.free_time_days||0, s.eta, s.status||'In Transit', s.auto_email?1:0, s.email, s.notes, req.user.id], function(err){
    if(err) return res.status(500).json({message:'Kaydetme hatası', error: err.message});
    const id = this.lastID;
    if(s.auto_email && mailer && s.email){
      const mail = { from: SMTP_USER || 'no-reply@example.com', to: s.email, subject: `Yeni Sevkiyat: ${s.tracking_no}`, text: `Sevkiyat oluşturuldu. Tracking: ${s.tracking_no}` };
      mailer.sendMail(mail).catch(e=>console.error('Mail error', e));
    }
    res.json({id});
  });
});

app.get('/api/shipments/:id', authenticateToken, (req,res)=>{
  const id = req.params.id;
  db.get("SELECT * FROM shipments WHERE id = ?", [id], (err,row)=>{
    if(err) return res.status(500).json({message:'Hata'});
    if(!row) return res.status(404).json({message:'Bulunamadı'});
    if(req.user.role !== 'admin' && row.user_id !== req.user.id) return res.status(403).json({message:'Erişim reddedildi'});
    res.json(row);
  });
});

app.put('/api/shipments/:id', authenticateToken, (req,res)=>{
  const id = req.params.id;
  const s = req.body;
  db.get("SELECT * FROM shipments WHERE id = ?", [id], (err,row)=>{
    if(err) return res.status(500).json({message:'Hata'});
    if(!row) return res.status(404).json({message:'Bulunamadı'});
    if(req.user.role !== 'admin' && row.user_id !== req.user.id) return res.status(403).json({message:'Erişim reddedildi'});
    const sql = `UPDATE shipments SET transport=?, tracking_no=?, customer=?, country=?, carrier=?, booking_no=?, departure_date=?, free_time_days=?, eta=?, status=?, auto_email=?, email=?, notes=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`;
    db.run(sql, [s.transport||row.transport, s.tracking_no, s.customer, s.country, s.carrier, s.booking_no, s.departure_date, s.free_time_days||0, s.eta, s.status||row.status, s.auto_email?1:0, s.email, s.notes, id], function(err){
      if(err) return res.status(500).json({message:'Güncelleme hatası'});
      if(s.auto_email && mailer && s.email && s.status && s.status !== row.status){
        const mail = { from: SMTP_USER || 'no-reply@example.com', to: s.email, subject: `Sevkiyat Güncellemesi: ${s.tracking_no}`, text: `Durum güncellendi: ${s.status}` };
        mailer.sendMail(mail).catch(e=>console.error('Mail error', e));
      }
      res.json({changed: this.changes});
    });
  });
});

app.delete('/api/shipments/:id', authenticateToken, (req,res)=>{
  const id = req.params.id;
  db.get("SELECT * FROM shipments WHERE id = ?", [id], (err,row)=>{
    if(err) return res.status(500).json({message:'Hata'});
    if(!row) return res.status(404).json({message:'Bulunamadı'});
    if(req.user.role !== 'admin' && row.user_id !== req.user.id) return res.status(403).json({message:'Erişim reddedildi'});
    db.run("DELETE FROM shipments WHERE id = ?", [id], function(err){
      if(err) return res.status(500).json({message:'Silme hatası'});
      res.json({deleted: this.changes});
    });
  });
});

// Reports
app.get('/api/reports/status-summary', authenticateToken, (req,res)=>{
  db.all("SELECT status, COUNT(*) AS count FROM shipments GROUP BY status", (err,rows)=>{
    if(err) return res.status(500).json({message:'Rapor hatası'});
    res.json(rows);
  });
});

app.get('/api/reports/country-distribution', authenticateToken, (req,res)=>{
  db.all("SELECT country, COUNT(*) AS count FROM shipments GROUP BY country ORDER BY count DESC", (err,rows)=>{
    if(err) return res.status(500).json({message:'Rapor hatası'});
    res.json(rows);
  });
});

app.get('/api/reports/delays', authenticateToken, (req,res)=>{
  const today = new Date().toISOString().slice(0,10);
  db.all("SELECT * FROM shipments WHERE eta IS NOT NULL AND eta < ? AND status NOT IN ('Delivered','Arrived') ORDER BY eta ASC", [today], (err,rows)=>{
    if(err) return res.status(500).json({message:'Rapor hatası'});
    res.json(rows);
  });
});

app.get('/api/reports/user-performance', authenticateToken, requireRole('admin'), (req,res)=>{
  db.all("SELECT u.username, COUNT(s.id) AS count FROM users u LEFT JOIN shipments s ON u.id = s.user_id GROUP BY u.id ORDER BY count DESC", (err,rows)=>{
    if(err) return res.status(500).json({message:'Rapor hatası'});
    res.json(rows);
  });
});

// Public tracking
app.get('/api/track/:tracking', (req,res)=>{
  const t = req.params.tracking;
  db.get("SELECT id, transport, tracking_no, status, eta, carrier, country, updated_at FROM shipments WHERE tracking_no = ?", [t], (err,row)=>{
    if(err) return res.status(500).json({message:'Hata'});
    if(!row) return res.status(404).json({message:'Bulunamadı'});
    res.json(row);
  });
});

app.listen(PORT, ()=>console.log(`Sunucu çalışıyor: ${PORT}`));
