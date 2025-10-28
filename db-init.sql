-- Initialize users and shipments tables. Default users will be created by server.js if table empty.
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  role TEXT DEFAULT 'rep',
  email TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shipments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  transport TEXT DEFAULT 'road',
  tracking_no TEXT,
  customer TEXT,
  country TEXT,
  carrier TEXT,
  booking_no TEXT,
  departure_date TEXT,
  free_time_days INTEGER,
  eta TEXT,
  status TEXT,
  auto_email INTEGER,
  email TEXT,
  notes TEXT,
  user_id INTEGER,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
