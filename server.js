const { client, syncAndSeed } = require("./db");
const express = require("express");
const path = require("path");

const html = require("html-template-tag");

const app = express();

app.use("assets", express.static(path.join(__dirname, "/assets/styles.css")));

app.get("/", async (req, res, next) => {
  try {
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
