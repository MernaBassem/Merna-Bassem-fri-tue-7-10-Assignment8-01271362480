// index.js file
import express from "express";
import { connection_db } from "./DB/connection.js";


const app = express();
const port = 3000;

app.use(express.json());
connection_db

app.get("/", (req, res) => res.send("Hello World"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

