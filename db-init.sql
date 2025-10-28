PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS shipments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tracking_no TEXT NOT NULL,
  customer TEXT,
  country TEXT,
  carrier TEXT,
  booking_no TEXT,
  departure_date TEXT,
  free_time_days INTEGER,
  eta TEXT,
  status TEXT,
  notes TEXT,
  auto_email INTEGER DEFAULT 0,
  email TEXT,
  last_email_date TEXT,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO users (username, password, role) VALUES ('admin','admin123','admin');
INSERT OR IGNORE INTO users (username, password, role) VALUES ('rep','rep123','rep');

INSERT OR IGNORE INTO shipments (tracking_no, customer, country, carrier, booking_no, departure_date, free_time_days, eta, status, notes, auto_email, email) VALUES
('TRK0001','ACME Ltd','Germany','Maersk','BK12345','2025-10-01',7,'2025-10-20','In Transit','No issues',1,'acme@example.com');
