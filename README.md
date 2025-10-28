Yurtdışı Sevkiyat Takip — Node.js (Express) sürümü
==================================================

İçerik:
- server.js         -> Express sunucu (ESM)
- package.json      -> Bağımlılıklar ve start script
- /public           -> Statik site dosyaları (index.html, tracking.html, ...)
- README.md

Yerel olarak çalıştırmak:
1. Klasörde terminal açın (package.json'in olduğu yerde)
2. `npm install`
3. `npm start`
4. Tarayıcıda `http://localhost:3000` adresini açın

Render için önerilen ayarlar:
- Service type: Web Service (Node)
- Build Command: `npm install`
- Start Command: `npm start`
- Environment: (genelde boş bırakılabilir) NODE_VERSION=18 (opsiyonel)

Notlar:
- Bu proje `type: "module"` ile ESM modunda çalışır (Node 18+ önerilir).
- Statik dosyalar `/public` altında tutulur. İsterseniz React/Vite gibi bir frontend ile değiştirebilirsiniz.
