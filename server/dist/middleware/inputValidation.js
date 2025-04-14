"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRecipesInputValidation = exports.loginInputValidation = exports.registerInputValidation = void 0;
const express_validator_1 = require("express-validator");
const ExpressError_1 = require("../ExpressError/ExpressError");
const http_status_codes_1 = require("http-status-codes");
const UserSchema_1 = __importDefault(require("../Schema/UserSchema"));
const recipeCategories_1 = __importDefault(require("../utils/recipeCategories"));
//create a function that will handle the error
//This function will accept an array (validateValues) of valeus to be validated.
//then this function will return the array we passed as an argument and an error response
// console.log(Object.values(recipeCategories));
const withValidationErrors = (validateValues) => {
    return [
        ...validateValues, // spread to treat validateValues as an array of function instead of a single middleware (typescript)
        (req, res, next) => {
            const errors = (0, express_validator_1.validationResult)(req); //this returns all available errors based on the validation provided when checking the incoming request.
            //check if the errors array is not empty meaning there errors.
            if (!errors.isEmpty()) {
                const errorMessages = errors
                    .array()
                    .map((allErrors) => allErrors.msg); //turns the errors from the validationResult into array then mapped it to access the msg key for every item in the original array, then populate the created array with that.
                throw new ExpressError_1.ExpressError(errorMessages, http_status_codes_1.StatusCodes.BAD_REQUEST); //use the custom error that we created and pass the errorMessages that we mapped instead of a string.
            }
            next();
        },
    ];
};
//register input validation
exports.registerInputValidation = withValidationErrors([
    (0, express_validator_1.body)("username")
        .notEmpty()
        .withMessage("Username cannot be empty")
        .isLength({ min: 4 })
        .withMessage("Username must be more than 5 characters")
        .custom((username) => __awaiter(void 0, void 0, void 0, function* () {
        const foundUsername = yield UserSchema_1.default.findOne({ username: username });
        if (foundUsername) {
            throw new ExpressError_1.ExpressError("Username already used", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
    })),
    (0, express_validator_1.body)("firstName")
        .notEmpty()
        .withMessage("First name cannot be empty")
        .isLength({ min: 4 })
        .withMessage("First name must be more than 5 characters"),
    (0, express_validator_1.body)("lastName")
        .notEmpty()
        .withMessage("Last name cannot be empty")
        .isLength({ min: 4 })
        .withMessage("Last name must be more than 5 characters"),
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Email should be valid")
        .notEmpty()
        .withMessage("Last name cannot be empty")
        .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        const foundEmail = yield UserSchema_1.default.findOne({ email: email });
        if (foundEmail) {
            throw new ExpressError_1.ExpressError("Email already used", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
    })),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
]);
exports.loginInputValidation = withValidationErrors([
    (0, express_validator_1.body)("username")
        .notEmpty()
        .withMessage("Username cannot be empty")
        .isLength({ min: 4 })
        .withMessage("Username must be more than 5 characters"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
]);
exports.addRecipesInputValidation = withValidationErrors([
    (0, express_validator_1.body)("recipeName").notEmpty().withMessage("Recipe name cannot be empty"),
    (0, express_validator_1.body)("recipeInstruction")
        .notEmpty()
        .withMessage("Recipe instruction cannot be empty"),
    (0, express_validator_1.body)("recipeDescription")
        .isLength({ min: 5 })
        .withMessage("Recipe description should be between 5 to 250 characters")
        .notEmpty()
        .withMessage("Recipe description cannot be empty"),
    (0, express_validator_1.body)("category")
        .notEmpty()
        .withMessage("Category cannot be empty")
        .isIn(Object.values(recipeCategories_1.default))
        .withMessage("Invalid category"),
    (0, express_validator_1.body)("cookingTime")
        .notEmpty()
        .withMessage("Cooking time cannot be empty")
        .isNumeric()
        .withMessage("Cooking time must be a number"),
    // body("recipeIngredients.*.ingredientName")
    //   .notEmpty()
    //   .withMessage("Ingredient name cannot be empty"),
    // body("recipeIngredients.*.ingredientQty")
    //   .notEmpty()
    //   .withMessage("Ingredient quantity cannot be empty")
    //   .isNumeric()
    //   .withMessage("Ingredient quantity must be a number"),
]);
