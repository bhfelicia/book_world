const { client, syncAndSeed } = require("./db");
const express = require("express");
const path = require("path");

const html = require("html-template-tag");

const app = express();

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/", async (req, res, next) => {
  try {
    const authorRes = await client.query(`SELECT * FROM author;`);
    const authors = authorRes.rows;
    res.send(html`
      <html>
        <head>
          <link rel="stylesheet" href="/assets/styles.css" />
        </head>
        <body>
          <h1>Works in Translation that Shaped the Literary Landscape</h1>
          <h2>Authors</h2>
          <ul>
            ${authors.map(
              (author) => `
      <li>
      <a href='/authors/${author.id}'>
      ${author.name}
      </a>
      </li>
      `
            )}
          </ul>
        </body>
      </html>
    `);
  } catch (error) {
    next(error);
  }
});

app.get("/authors/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const bookRes = await client.query(
      `SELECT * FROM book JOIN author ON book.author_id = author.id WHERE book.author_id = $1`,
      [id]
    );
    const books = bookRes.rows;

    res.send(html`
      <html>
        <head>
          <link rel="stylesheet" href="/assets/styles.css" />
        </head>
        <body>
          <h1>Literary works by ${books[0].name}</h1>
          ${books.map(
            (book) => html` <div class="book">
              <h3>${book.english_title}</h3>
              <div>A ${book.genre}</div>
              <div class="original">
                Originally ${book.original_title} in ${book.language}
              </div>
              <div>Translated into English by ${book.translator}</div>
              <div></div>
            </div>`
          )}
          <h3><a href="/">Back to All Authors</a></h3>
        </body>
      </html>
    `);
  } catch (error) {
    next(error);
  }
});

const port = process.env.PORT || 3000;

const setUp = async () => {
  try {
    await client.connect();
    await syncAndSeed();
    console.log("connected to database");
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
setUp();
