// book schema validation

import Joi from "joi";

//-----------------------------------
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

//-----------------------------------
// create schema book
export const createSchema = {
  body: Joi.object({
    title: Joi.string().min(3).max(30).required().messages({
      "string.min": "Title should have a minimum length of 3 characters",
      "string.max": "Title should have a maximum length of 30 characters",
      "any.required": "Title is required",
      "string.base": "Title must be a string",
    }),
    content: Joi.string().min(3).required().messages({
      "string.min": "Content should have a minimum length of 3 characters",
      "any.required": "Content is required",
      "string.base": "Content must be a string",
    }),
    publishedDate: Joi.date().iso().messages({
      "date.base": "Book publishedDate is not valid",
      "date.format":
        "Book publishedDate must be in ISO 8601 date format (YYYY-MM-DD)",
    }),
  }),
  headers: Joi.object({
    token: Joi.string().required().messages({
      "any.required": "Please Enter The Token In Header",

    }),
  }).unknown(true), // Allow other headers
};
//-----------------------------------------------
// get schema book by id

export const getBookByIdSchema = {
  // check send _id Book in params
  // and check _id ObjectId hexa and 24 characters

  params: Joi.object({
    _id: Joi.string().length(24).pattern(objectIdPattern).required().messages({
      "string.base": "Book _id must be a string",
      "any.required": "Book _id is required",
      "string.empty": "Book _id cannot be an empty field",
      "string.length": "Book _id must be 24 characters long",
      "string.pattern.base": "Book _id must be a valid ObjectId",
    }),
  }),
};
//------------------------------------------------
// update schema book
export const updateSchema = {
  body: Joi.object({
    title: Joi.string().min(3).max(30).messages({
      "string.min": "Title should have a minimum length of 3 characters",
      "string.max": "Title should have a maximum length of 30 characters",
      "string.base": "Title must be a string",
    }),
    content: Joi.string().min(3).messages({
      "string.min": "Content should have a minimum length of 3 characters",
      "string.base": "Content must be a string",
    }),
    publishedDate: Joi.date().iso().messages({
      "date.base": "Book publishedDate is not valid",
      "date.format":
        "Book publishedDate must be in ISO 8601 date format (YYYY-MM-DD)",
    }),
  }),
  // check the token
  headers: Joi.object({
    token: Joi.string().required().messages({
      "any.required": "Please Enter The Token In Header",
    }), // check the token
  }).unknown(true), // Allow other headers
  params: Joi.object({
    _id: Joi.string().length(24).pattern(objectIdPattern).required().messages({
      "string.base": "Book _id must be a string",
      "any.required": "Book _id is required",
      "string.empty": "Book _id cannot be an empty field",
      "string.length": "Book _id must be 24 characters long",
      "string.pattern.base": "Book _id must be a valid ObjectId",
    }),
  }),
};
//-------------------------------------------------------------------
// delete schema book
export const deleteSchema = {
  headers: Joi.object({
    token: Joi.string().required().messages({
      "any.required": "Please Enter The Token In Header",
    }),
  }).unknown(true), // Allow other headers
  params: Joi.object({
    _id: Joi.string().length(24).pattern(objectIdPattern).required().messages({
      "string.base": "Book _id must be a string",
      "any.required": "Book _id is required",
      "string.empty": "Book _id cannot be an empty field",
      "string.length": "Book _id must be 24 characters long",
      "string.pattern.base": "Book _id must be a valid ObjectId",
    }),
  }),
};
//--------------------------------------------------------------------------
// get book by pagination
export const getBookByPaginationSchema = {
  query: Joi.object({
    skip: Joi.number().min(1).default(0).messages({
      "number.base": "Skip must be a number",
      "number.min": "Skip must be greater than or equal to 0",
    }),
    limit: Joi.number().min(1).default(10).messages({
      "number.base": "Limit must be a number",
      "number.min": "Limit must be greater than or equal to 1",
    }),
  }),
}; 
//-----------------------------------------------------------------------------
// search schema book

export const searchSchema = {
  query: Joi.object({
    wordSearch: Joi.string().required().messages({
      "string.base": "Word search must be a string",
      "any.required": "Word search is required",
    }),
  })}
