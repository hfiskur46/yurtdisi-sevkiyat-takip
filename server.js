import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import fs from 'fs';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Simple JSON "database" files (persisted)
const USERS_FILE = path.join(__dirname, 'users.json');
const SHIPMENTS_FILE = path.join(__dirname, 'shipments.json');

function readJson(file, fallback) {
  try {
    const raw = fs.readFileSync(file, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}
function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// API: login (mock)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const users = readJson(USERS_FILE, []);
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Geçersiz kullanıcı' });
  // Return minimal user info (no real tokens here; mock)
  res.json({ username: user.username, role: user.role, name: user.name });
});

// API: get shipments
app.get('/api/shipments', (req, res) => {
  const shipments = readJson(SHIPMENTS_FILE, []);
  res.json(shipments);
});

// API: add shipment (loigstics)
app.post('/api/shipments', (req, res) => {
  const shipments = readJson(SHIPMENTS_FILE, []);
  const newItem = { id: 'TRK-' + String(shipments.length + 1).padStart(3,'0'), ...req.body, createdAt: new Date().toISOString() };
  shipments.push(newItem);
  writeJson(SHIPMENTS_FILE, shipments);
  // send notification email (async, best-effort)
  sendShipmentNotification(newItem).catch(err => console.error('Mail error', err));
  res.status(201).json(newItem);
});

// API: update shipment status
app.put('/api/shipments/:id', (req, res) => {
  const shipments = readJson(SHIPMENTS_FILE, []);
  const idx = shipments.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  shipments[idx] = { ...shipments[idx], ...req.body, updatedAt: new Date().toISOString() };
  writeJson(SHIPMENTS_FILE, shipments);
  sendShipmentNotification(shipments[idx]).catch(err => console.error('Mail error', err));
  res.json(shipments[idx]);
});

// Simple mailer using SMTP env vars (configure in Render or .env locally)
// Environment variables:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM
async function sendShipmentNotification(shipment) {
  const host = process.env.SMTP_HOST;
  if (!host) {
    console.log('SMTP not configured, skipping email');
    return;
  }
  const port = process.env.SMTP_PORT || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM || user;

  const transporter = nodemailer.createTransport({
    host, port,
    auth: user && pass ? { user, pass } : undefined,
    secure: port == 465
  });

  const to = shipment.notifyEmails || process.env.MAIL_NOTIFY || user;
  const subject = `Sevkiyat Güncellemesi: ${shipment.id}`;
  const text = `Sevkiyat ${shipment.id} için durum güncellendi. Durum: ${shipment.status || 'Güncelleme'}`;
  await transporter.sendMail({ from, to, subject, text });
  console.log('Mail sent to', to);
}

// Serve API first, then static frontend (built) from /dist
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Frontend not built. Run `npm run build` or use `npm run dev` for development.');
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
