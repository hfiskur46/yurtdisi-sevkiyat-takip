const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const DB_FILE = path.join(__dirname, 'shipments.db');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize DB (create file if not exists and run init SQL)
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) console.error(err);
  else console.log('SQLite bağlandı.', DB_FILE);
});

const initSql = fs.readFileSync(path.join(__dirname,'db-init.sql'),'utf8');
db.exec(initSql, (err) => { if (err) console.error('DB init error', err); });

// Simple auth endpoint (demo only)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Eksik bilgiler' });
  db.get('SELECT id, username, role FROM users WHERE username=? AND password=?', [username,password], (err,row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(401).json({ error: 'Hatalı kullanıcı veya şifre' });
    const token = Buffer.from(`${row.username}:${row.role}`).toString('base64');
    res.json({ token, user: row });
  });
});

// Middleware (demo)
function authMiddleware(req,res,next){
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ error: 'Yetkilendirme gerekli' });
  try{
    // In a real app decode and verify token
    next();
  }catch(e){
    return res.status(401).json({ error: 'Geçersiz token' });
  }
}

app.get('/api/shipments', (req,res) => {
  const q = req.query.q || '';
  const sql = `SELECT * FROM shipments WHERE tracking_no LIKE ? OR customer LIKE ? OR booking_no LIKE ? ORDER BY updated_at DESC`;
  const like = `%${q}%`;
  db.all(sql, [like, like, like], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/shipments/:id', (req,res) => {
  db.get('SELECT * FROM shipments WHERE id=?', [req.params.id], (err,row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Bulunamadı' });
    res.json(row);
  });
});

app.post('/api/shipments', (req,res) => {
  const s = req.body;
  const sql = `INSERT INTO shipments (tracking_no, customer, country, carrier, booking_no, departure_date, free_time_days, eta, status, notes, auto_email, email, last_email_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  db.run(sql, [s.tracking_no, s.customer, s.country, s.carrier, s.booking_no, s.departure_date, s.free_time_days, s.eta, s.status, s.notes, s.auto_email?1:0, s.email, s.last_email_date||null], function(err){
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM shipments WHERE id=?',[this.lastID], (e,row)=>{ if (e) return res.status(500).json({error:e.message}); res.json(row); });
  });
});

app.put('/api/shipments/:id', (req,res) => {
  const s = req.body;
  const sql = `UPDATE shipments SET tracking_no=?, customer=?, country=?, carrier=?, booking_no=?, departure_date=?, free_time_days=?, eta=?, status=?, notes=?, auto_email=?, email=?, last_email_date=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`;
  db.run(sql, [s.tracking_no, s.customer, s.country, s.carrier, s.booking_no, s.departure_date, s.free_time_days, s.eta, s.status, s.notes, s.auto_email?1:0, s.email, s.last_email_date||null, req.params.id], function(err){
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM shipments WHERE id=?',[req.params.id], (e,row)=>{ if (e) return res.status(500).json({error:e.message}); res.json(row); });
  });
});

app.delete('/api/shipments/:id', (req,res) => {
  db.run('DELETE FROM shipments WHERE id=?',[req.params.id], function(err){
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Sunucu çalışıyor:', PORT));
