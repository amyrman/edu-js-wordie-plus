import express from "express";
import cors from "cors";
import { engine } from "express-handlebars";
import helpers from "./helpers.js";

const app = express();
const port = process.env.port || 3001;

app.engine("handlebars", engine({ helpers }));
app.set("view engine", "handlebars");
app.use(
    cors(),
    express.static("public"),
    express.json());

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});

export default app;
