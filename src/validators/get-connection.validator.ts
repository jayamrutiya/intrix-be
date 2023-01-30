import { checkSchema } from "express-validator";

const getConnectionValidator = checkSchema({
  id: {
    in: "params",
    trim: true,
    exists: {
      errorMessage: "Id is required.",
    },
    notEmpty: {
      errorMessage: "Id should not be empty.",
    },
    isInt: {
      errorMessage: "Id must be number.",
    },
  },
});

export default getConnectionValidator;
