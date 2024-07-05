// book router

import { Router } from "express";
import * as BookController from "./book.controller.js";
import authenticate from "../../Midleware/authentication.midleware.js";
import { validationMiddleware } from "../../Midleware/validation.middleware.js";
import { createSchema, deleteSchema, getBookByIdSchema, searchSchema, updateSchema } from "./book.schema.js";
import { paginationSchema } from "../author/author.schema.js";

const router = Router();

router.post("/createBook", validationMiddleware(createSchema),authenticate, BookController.createBook);
router.get("/getAllBooks", BookController.getAllBooks);
router.get("/getBookById/:_id",validationMiddleware(getBookByIdSchema), BookController.getBookById);
router.patch("/updateBook/:_id", validationMiddleware(updateSchema),authenticate, BookController.updateBook);
router.delete("/deleteBook/:_id", validationMiddleware(deleteSchema),authenticate, BookController.deleteBook);
router.get("/getBookWithAuthor",BookController.getBookWithAuthor);
router.get("/getBookByPagination",validationMiddleware(paginationSchema),BookController.getBookByPagination);
router.get("/searchBook",validationMiddleware(searchSchema),BookController.searchBook);
export default router