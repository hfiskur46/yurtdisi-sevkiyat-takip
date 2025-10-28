# Yurtdışı Sevkiyat Takip (Basit Node.js + HTML)

Bu proje, küçük ekiplerin yurtdışı sevkiyatlarını sunucu üzerinden takip edebilmeleri için basit bir Node.js + Express + SQLite uygulamasıdır.

İçindekiler:
- server.js : Node.js + Express sunucusu, SQLite veri tabanı.
- public/index.html : Müşteri temsilcilerinin kullandığı tek sayfa HTML arayüzü.
- package.json : Bağımlılıklar ve çalıştırma komutları.
- db-init.sql : Veritabanı oluşturma ve başlangıç verileri.
- README.md : Bu dosya.

Gereksinimler:
- Node.js (14+)
- npm

Başlatma:
1. Klasöre girin: `cd yurtdisi_sevkiyat_takip`
2. Bağımlılıkları yükleyin: `npm install`
3. Sunucuyu başlatın: `node server.js` veya `npm start`
4. Tarayıcıda: `http://localhost:3000`

Notlar:
- Bu demo uygulama basit bir kullanıcı doğrulaması (düz metin şifre) kullanır. Üretim için JWT + bcrypt önerilir.
- E-posta göndermek için SMTP/SendGrid entegrasyonu eklenmelidir.
