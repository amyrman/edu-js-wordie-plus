import express from "express";
import cors from "cors";
import { engine } from "express-handlebars";
import helpers from "../utils/helpers.js";
import { createHighscoresTable } from "../db/database.js";

const app = express();
const port = process.env.port || 3001;

app.engine("handlebars", engine({ helpers }));
app.set("view engine", "handlebars");
app.use(cors(), express.static("public"), express.json());

createHighscoresTable();

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});

export default app;
