const express = require("express");
const port = process.env.port || 3001;
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.get("/highscore", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.get("/about", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
