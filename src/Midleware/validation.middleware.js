
const reqKeys = ["body", "query", "params", "headers"];

export const validationMiddleware = (schema) => {
  return (req, res, next) => {
    try {
      const validationErrors = [];
      for (const key of reqKeys) {
        const validationResult = schema[key]?.validate(req[key], {
          abortEarly: false,
        });

        if (validationResult?.error) {
          validationErrors.push(validationResult.error.details);
        }
      }

      if (validationErrors.length) {
        return res
          .status(400)
          .json({ message: "Validation Error", errors: validationErrors });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
