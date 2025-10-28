Yurtdışı Sevkiyat Takip - Basit Sunucu + Frontend

Özellikler
- Kullanıcı yönetimi (admin, rep) - parolalar bcrypt ile saklanır.
- JWT tabanlı kimlik doğrulama.
- Sevkiyat kayıtları: karayolu/havayolu/denizyolu (transport field).
- Otomatik mail (nodemailer) - SMTP ayarları için environment değişkenleri kullanılır.
- Raporlar: durum özeti, ülke dağılımı, gecikme raporu, kullanıcı performansı.
- Basit herkese açık takip endpoint'i: /api/track/:tracking

Başlatma (lokal)
1. Node.js yüklü olmalı.
2. Proje dizininde:
   npm install
3. Sunucuyu başlat:
   node server.js
4. Tarayıcıda http://localhost:3000 aç.

Render / Production notları
- SMTP için environment değişkenleri ayarla: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
- JWT_SECRET environment değişkenini üret ve ayarla (güvenlik için).
- Render deploy: repo'yu ekledikten sonra auto-deploy çalışır.

Varsayılan kullanıcılar (eğer users tablosu boşsa otomatik oluşturulur)
- admin / admin123  (role: admin)
- rep / rep123      (role: rep)
