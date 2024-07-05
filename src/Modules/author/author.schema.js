// author schema validation

import Joi from "joi";

export const SignUpSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
      "string.min": "Name should have a minimum length of 3 characters",
      "string.max": "Name should have a maximum length of 30 characters",
      "any.required": "Name is required",
      "string.base": "Name must be a string",
    }),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: { allow: ["com", "net", "org"] },
      })
      .required()
      .messages({
        "string.email": "Email is not valid",
        "any.required": "Email is required",
        "string.base": "Email must be a string",
      }),
    password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must have at least one lowercase letter, one uppercase letter, one number and one special character",
        "any.required": "You need to provide a password",
        "string.min": "Password should have a minimum length of 3 characters",
        "string.base": "Password must be a string",
      }),
    bio: Joi.string().min(3).messages({
      "string.min": "Bio should have a minimum length of 3 characters",
      "string.base": "Bio must be a string",
    }),

    birthDate: Joi.date().iso().messages({
      "date.base": "Author birthDate is not valid",
      "date.format":
        "Author birthDate must be in ISO 8601 date format (YYYY-MM-DD)",
    }),
  }),
};

//---------------------------------------------------
export const SignInSchema = {
  body: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: { allow: ["com", "net", "org"] },
      })
      .required()
      .messages({
        "string.email": "Email is not valid",
        "string.base": "Email must be a string",
        "any.required": "Email is required",
      }),
    password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must have at least one lowercase letter, one uppercase letter, one number and one special character",
        "any.required": "You need to provide a password",
        "string.min": "Password should have a minimum length of 3 characters",
        "string.base": "Password must be a string",
      }),
  }),
};
//------------------------------------------------------------------
// logout schema

export const logOutSchema = {
  headers: Joi.object({
    token: Joi.string().required().messages({
      "any.required": "Please Enter The Token In Header",

    }),
  }).unknown(true), // Allow other headers
};
//---------------------------------------------------------------------------
// get schema author
export const AuthorSchema = {
  headers: Joi.object({
    token: Joi.string().required().messages({
      "any.required": "Please Enter The Token In Header",
    }),
  }).unknown(true), // Allow other headers
};

//---------------------------------------------------------------------------
// update schema author

export const updateSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(30).messages({
      "string.min": "Name should have a minimum length of 3 characters",
      "string.max": "Name should have a maximum length of 30 characters",
      "string.base": "Name must be a string",
    }),
    bio: Joi.string().min(3).messages({
      "string.min": "Bio should have a minimum length of 3 characters",
      "string.base": "Bio must be a string",
    }),
    birthDate: Joi.date().iso().messages({
      "date.base": "Author birthDate is not valid",
      "date.format":
        "Author birthDate must be in ISO 8601 date format (YYYY-MM-DD)",
    }),
    email: Joi.forbidden().messages({
      "any.unknown": "Author email is not allowed to be updated",
    }),
    password: Joi.forbidden().messages({
      "any.unknown": "Author password is not allowed to be updated",
    }),
  }),
  // check the token
  headers: Joi.object({
    token: Joi.string().required(),
  }).unknown(true), // Allow other headers
};
//-------------------------------------------------------------------------
// delete schema author
// the take token

export const deleteSchema = {
  headers: Joi.object({
    token: Joi.string().required().messages({
      "any.required": "Please Enter The Token In Header",
    }),
  }).unknown(true),
};
//---------------------------------------------------------------
// pagination the take limit and skip from query

export const paginationSchema = {
  query: Joi.object({
    skip: Joi.number().required().messages({
      "any.required": "Please Enter The Skip In Query",
    }),
    limit: Joi.number().required().messages({
      "any.required": "Please Enter The Limit In Query",
    }),
  }),
};

//----------------------------------------------------------------
// search schema author
export const searchSchema = {
  query: Joi.object({
    wordSearch: Joi.string().required().messages({
      "any.required": "Please Enter The WordSearch In Query",
      "string.base": "WordSearch must be a string",
    }),
  }),
};
