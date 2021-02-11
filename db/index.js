const pg = require("pg");

const client = new pg.Client("postgres://localhost/book_world_db");

const syncAndSeed = async () => {
  const SQL = `
  DROP TABLE IF EXISTS translator;
  DROP TABLE IF EXISTS book;
  DROP TABLE IF EXISTS author;
  CREATE TABLE author(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  );

  CREATE TABLE book(
    id SERIAL PRIMARY KEY,
    original_title VARCHAR(100) NOT NULL,
    english_title VARCHAR(100) NOT NULL,
    language VARCHAR(100) NOT NULL,
    genre VARCHAR(100),
    translator VARCHAR(100),
    author_id INTEGER REFERENCES author(id)
  );


  INSERT INTO author(name) VALUES('Marcel Proust');
  INSERT INTO author(name) VALUES('Leo Tolstoy');
  INSERT INTO author(name) VALUES('Jorge Luis Borges');

  INSERT INTO book(original_title, english_title, language, genre, translator, author_id) VALUES('À la recherche du temps perdu', 'Remembrance of Things Past', 'French', 'Modernist Novel', 'C. K. Scott Moncrieff and Terence Kilmartin', 1);

  INSERT INTO book(original_title, english_title, language, genre, translator, author_id) VALUES('Анна Каренина', 'Anna Karenina', 'Russian', 'Realist Novel', 'Louise and Aylmer Maude', 2);

  INSERT INTO book(original_title, english_title, language, genre, translator, author_id) VALUES('Война и мир', 'War and Peace', 'Russian', 'Philosophical Novel', 'Nathan Haskell Dole', 2);

  INSERT INTO book(original_title, english_title, language, genre, translator, author_id) VALUES('Ficciones', 'Fictions', 'Spanish', 'Short Story Collection', 'Anthony Kerrigan, Anthony Bonner, Alastair Reid, Helen Temple, and Ruthven Todd', 3);


  `;
  await client.query(SQL);
};

module.exports = {
  client,
  syncAndSeed,
};
