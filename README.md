Yurtdışı Sevkiyat Yönetim Paneli - Entegre React + Express
=============================================================

Bu repo hem frontend (Vite + React + Tailwind) hem de backend (Express) içerir.
Kök dizinde React dosyaları bulunur; Vite ile build edilip `dist/` içine alınır.
`server.js` production'da `dist/`'i servis eder ve aynı zamanda `/api/*` endpoint'leri sunar.

Önemli script'ler:
- `npm run dev` => frontend geliştirirken (Vite)
- `npm run build` => frontend üretim derlemesi (dist/)
- `npm start` => build yapar ve Express sunucuyu başlatır (Render için uygundur)

E-posta göndermek için environment değişkenleri (Render veya .env):
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM

Not: Geliştirme sırasında `npm run dev` kullan; production için `npm start` kullan.

