// Author Router


import { Router } from "express";
import * as AuthorController from "./author.controller.js";
import authenticate from "../../Midleware/authentication.midleware.js";

const router = Router();

router.post("/signUp", AuthorController.signUp);
router.post("/signIn", AuthorController.signIn);
router.post("/logOut" ,authenticate,AuthorController.logOut);
router.get("/getAuthor", authenticate, AuthorController.getAuthor);
router.get("/getAllAuthors", AuthorController.getAllAuthors);
router.patch("/updateAuthor", authenticate, AuthorController.updateAuthor);
router.delete("/deleteAuthor", authenticate, AuthorController.deleteAuthor);
// router.get("/getAuthorByPagination", AuthorController.getAuhtorByPagination);
export default router;
