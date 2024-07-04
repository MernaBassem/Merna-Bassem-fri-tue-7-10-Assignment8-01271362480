// book router

import { Router } from "express";
import * as BookController from "./book.controller.js";
import authenticate from "../../Midleware/authentication.midleware.js";

const router = Router();

router.post("/createBook", authenticate, BookController.createBook);

export default router