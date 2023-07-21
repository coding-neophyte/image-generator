DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    username TEXT NOT NULL,
    password_hash TEXT NOT NULL
);
