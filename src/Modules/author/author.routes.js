// Author Router


import { Router } from "express";
import * as AuthorController from "./author.controller.js";
const router = Router();

router.post("/signUp", AuthorController.register);
router.post("/signIn", AuthorController.signIn);



export default router;
