import {
  validationResult,
  ValidationChain,
  body,
  param,
} from "express-validator";

import { ExpressError } from "../ExpressError/ExpressError";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

import UserModel from "../Schema/UserSchema";

//create a function that will handle the error
//This function will accept an array (validateValues) of valeus to be validated.
//then this function will return the array we passed as an argument and an error response
const withValidationErrors = (validateValues: ValidationChain[]) => {
  return [
    ...validateValues, // spread to treat validateValues as an array of function instead of a single middleware (typescript)
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req); //this returns all available errors based on the validation provided when checking the incoming request.
      //check if the errors array is not empty meaning there errors.
      if (!errors.isEmpty()) {
        const errorMessages: string[] = errors
          .array()
          .map((allErrors) => allErrors.msg); //turns the errors from the validationResult into array then mapped it to access the msg key for every item in the original array, then populate the created array with that.
        throw new ExpressError(errorMessages as any, StatusCodes.BAD_REQUEST); //use the custom error that we created and pass the errorMessages that we mapped instead of a string.
      }
      next();
    },
  ];
};

//register input validation
export const registerInputValidation = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 5 })
    .withMessage("Username must be more than 5 characters")
    .custom(async (username) => {
      const foundUsername = await UserModel.findOne({ username: username });
      if (foundUsername) {
        throw new ExpressError(
          "Username already used",
          StatusCodes.BAD_REQUEST
        );
      }
    }),
  body("firstName")
    .notEmpty()
    .withMessage("First name cannot be empty")
    .isLength({ min: 5 })
    .withMessage("First name must be more than 5 characters"),

  body("lastName")
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .isLength({ min: 5 })
    .withMessage("Last name must be more than 5 characters"),

  body("email")
    .isEmail()
    .withMessage("Email should be valid")
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .custom(async (email) => {
      const foundEmail = await UserModel.findOne({ email: email });
      if (foundEmail) {
        throw new ExpressError("Email already used", StatusCodes.BAD_REQUEST);
      }
    }),

  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
]);
