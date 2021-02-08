const pg = require("pg");

const client = new pg.Client("postgres://localhost/book_world_db");

const syncAndSeed = async () => {
  const SQL = `
  DROP TABLE IF EXISTS book;
  DROP TABLE IF EXISTS author;
  CREATE TABLE author(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  );

  CREATE TABLE book(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author_id INTEGER REFERENCES author(id)
  );
  `;
  await client.query(SQL);
};

module.exports = {
  client,
  syncAndSeed,
};
