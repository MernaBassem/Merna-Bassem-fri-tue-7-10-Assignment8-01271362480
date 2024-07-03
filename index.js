// index.js file
import express from "express";
import { connection_db } from "./DB/connection.js";
// import BookRouter from "./src/Modules/book/book.routes.js";


const app = express();
const port = 3000;
connection_db();

app.use(express.json());
// app.use("/book", BookRouter);


app.get("/", (req, res) => res.send("Hello World"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

