-- Kullanıcı tablosu
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- Örnek kullanıcı
INSERT OR IGNORE INTO users (username, password) VALUES ('Hasan', '1121');

-- Sevkiyat tablosu
CREATE TABLE IF NOT EXISTS shipments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fatura_no TEXT,
  musteri TEXT,
  ulke TEXT,
  nakliyeci TEXT,
  booking_no TEXT,
  kalkis_tarihi TEXT,
  free_time TEXT,
  varis_tarihi TEXT,
  durum TEXT,
  aciklama TEXT
);
