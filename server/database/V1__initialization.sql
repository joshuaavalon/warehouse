CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE location (
  id SERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE storage (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES product(id) ON DELETE CASCADE,
  location_id INTEGER NOT NULL REFERENCES location(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL
);

CREATE UNIQUE INDEX storage_unique ON storage(product_id, location_id);