import { ConnectionType } from "@prisma/client";
import { checkSchema } from "express-validator";

const testConnectionValidator = checkSchema({
  host: {
    in: "body",
    trim: true,
    exists: {
      errorMessage: "Host is required.",
    },
    notEmpty: {
      errorMessage: "Host should not be empty.",
    },
    isString: {
      errorMessage: "Host must be string.",
    },
  },
  user: {
    in: "body",
    trim: true,
    exists: {
      errorMessage: "User is required.",
    },
    notEmpty: {
      errorMessage: "User should not be empty.",
    },
    isString: {
      errorMessage: "User must be string.",
    },
  },
  password: {
    in: "body",
    trim: true,
    optional: true,
    isString: {
      errorMessage: "Password must be string.",
    },
  },
  database: {
    in: "body",
    trim: true,
    exists: {
      errorMessage: "Database is required.",
    },
    notEmpty: {
      errorMessage: "Database should not be empty.",
    },
    isString: {
      errorMessage: "Database must be string.",
    },
  },
  port: {
    in: "body",
    trim: true,
    exists: {
      errorMessage: "Port is required.",
    },
    notEmpty: {
      errorMessage: "Port should not be empty.",
    },
    isInt: {
      errorMessage: "Port must be number.",
    },
  },
  type: {
    in: "body",
    trim: true,
    exists: {
      errorMessage: "Type is required.",
    },
    notEmpty: {
      errorMessage: "Type should not be empty.",
    },
  },
});

export default testConnectionValidator;
