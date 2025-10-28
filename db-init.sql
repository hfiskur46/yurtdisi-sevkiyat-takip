CREATE TABLE shipments (
    id SERIAL PRIMARY KEY,
    sender_name VARCHAR(100) NOT NULL,
    receiver_name VARCHAR(100) NOT NULL,
    origin_country VARCHAR(50),
    destination_country VARCHAR(50),
    tracking_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(30) DEFAULT 'Hazırlanıyor',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
