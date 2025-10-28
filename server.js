const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Dinamik port (Render uyumlu)
const PORT = process.env.PORT || 3000;

// Database setup
const DB_FILE = path.join(__dirname, 'shipments.db');
const db = new sqlite3.Database(DB_FILE);

// Eğer database yoksa oluştur
if (!fs.existsSync(DB_FILE)) {
    const initSql = fs.readFileSync(path.join(__dirname, 'db-init.sql'), 'utf8');
    db.exec(initSql, (err) => { if(err) console.error(err); });
}

// Statik dosyalar
app.use(express.static(path.join(__dirname, 'public')));

// Ana sayfa route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Login API
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.get("SELECT * FROM users WHERE username=? AND password=?", [username, password], (err,row)=>{
        if(err) return res.status(500).json({message:'Veritabanı hatası'});
        if(!row) return res.status(401).json({message:'Geçersiz kullanıcı adı veya şifre'});
        res.json({message:'Giriş başarılı'});
    });
});

// Sevkiyat listeleme API
app.get('/api/shipments', (req,res)=>{
    db.all("SELECT * FROM shipments", (err,rows)=>{
        if(err) return res.status(500).json({message:'Hata'});
        res.json(rows);
    });
});

// Sunucu başlat
app.listen(PORT, ()=>console.log(`Sunucu çalışıyor: ${PORT}`));
