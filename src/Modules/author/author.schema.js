import Joi from "joi";

export const SignUpSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: { allow: ["com", "net", "org"] },
      })
      .required(),
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
      }),
    bio: Joi.string().min(3),
    birthDate: Joi.date(),
  }).options({ presence: "required" }),
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
      .required(),
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
      }),
  }).options({ presence: "required" }),
}
//------------------------------------------------------------------