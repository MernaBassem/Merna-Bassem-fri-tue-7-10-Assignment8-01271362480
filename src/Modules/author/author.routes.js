// Author Router

import { Router } from "express";
import * as AuthorController from "./author.controller.js";
import authenticate from "../../Midleware/authentication.midleware.js";
import { validationMiddleware } from "../../Midleware/validation.middleware.js";
import {
  AuthorSchema,
  SignInSchema,
  SignUpSchema,
  deleteSchema,
  logOutSchema,
  paginationSchema,
  searchSchema,
  updateSchema,
} from "./author.schema.js";

const router = Router();
//-- sign up
router.post(
  "/signUp",
  validationMiddleware(SignUpSchema),
  AuthorController.signUp
);
//-- sign in
router.post(
  "/signIn",
  validationMiddleware(SignInSchema),
  AuthorController.signIn
);
//-- log out
router.post(
  "/logOut",
  validationMiddleware(logOutSchema),
  authenticate,
  AuthorController.logOut
);
//-- get author
router.get(
  "/getAuthor",
  validationMiddleware(AuthorSchema),
  authenticate,
  AuthorController.getAuthor
);
//-- get all authors
router.get("/getAllAuthors", AuthorController.getAllAuthors);
//-- update author
router.patch(
  "/updateAuthor",
  validationMiddleware(updateSchema),
  authenticate,
  AuthorController.updateAuthor
);
//-- delete author
router.delete(
  "/deleteAuthor",
  validationMiddleware(deleteSchema),
  authenticate,
  AuthorController.deleteAuthor
);
//-- get author by pagination
router.get(
  "/getAuthorByPagination",
  validationMiddleware(paginationSchema),
  AuthorController.getAuhtorByPagination
);
//-- get author with book
router.get(
  "/getAuthorWithBook",
  validationMiddleware(AuthorSchema),
  authenticate,
  AuthorController.getAuthorWithBook
);
//-- search author
router.get(
  "/searchAuthor",
  validationMiddleware(searchSchema),
  AuthorController.searchAuthor
);
//-- confirm email
router.get("/confirm-email/:token", AuthorController.confirmEmail);

export default router;
