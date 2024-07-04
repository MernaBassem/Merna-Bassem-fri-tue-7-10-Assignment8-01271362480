// book router

import { Router } from "express";
import * as BookController from "./book.controller.js";
import authenticate from "../../Midleware/authentication.midleware.js";

const router = Router();

router.post("/createBook", authenticate, BookController.createBook);
router.get("/getAllBooks", BookController.getAllBooks);
router.get("/getBookById/:_id", BookController.getBookById);
router.patch("/updateBook/:_id", authenticate, BookController.updateBook);
router.delete("/deleteBook/:_id", authenticate, BookController.deleteBook);
router.get("/getBookWithAuthor",BookController.getBookWithAuthor);
router.get("/getBookByPagination",BookController.getBookByPagination);
router.get("/searchBook",BookController.searchBook);
export default router