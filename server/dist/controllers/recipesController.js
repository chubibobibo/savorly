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
exports.updateRecipe = exports.deleteRecipe = exports.getRecipe = exports.getAllRecipes = exports.createRecipe = void 0;
const ExpressError_1 = require("../ExpressError/ExpressError");
const http_status_codes_1 = require("http-status-codes");
const RecipeSchema_1 = require("../Schema/RecipeSchema");
const cloudinary_1 = __importDefault(require("cloudinary"));
const fs_1 = require("fs");
/** @parsedUpdateArea array where the parsed ingredients data is pushed then used as the new value of req.body.recipeIngredients */
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        throw new ExpressError_1.ExpressError("No data received", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    // console.log(req.body);
    if (req.file) {
        const response = yield cloudinary_1.default.v2.uploader.upload(req.file.path, {
            folder: "savorly",
            quality: 70,
        });
        // console.log(response);
        fs_1.promises.unlink(req.file.path); //deletes the image saved by multer in the public folder
        req.body.photoUrl = response.secure_url;
        req.body.photoId = response.public_id;
    }
    // console.log(req.body.recipeIngredients);
    /** multiple recipeIngredients results in an array that needs to be mapped and parsed for each of the items */
    /** single recipe ingredient needs to be parsed without mapping */
    const parsedDataArray = [];
    if (Array.isArray(req.body.recipeIngredients)) {
        req.body.recipeIngredients.map((ingredients) => {
            const parsedData = JSON.parse(ingredients);
            parsedDataArray.push(parsedData);
            // console.log(parsedData);
            req.body.recipeIngredients = parsedDataArray;
            // console.log(req.body.recipeIngredients);
        });
    }
    else {
        const parsedData = JSON.parse(req.body.recipeIngredients);
        req.body.recipeIngredients = parsedData;
    }
    // console.log(req.body.recipeIngredients);
    if (!req.user) {
        throw new ExpressError_1.ExpressError("User not found", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    else {
        req.body.createdBy = req.user._id;
    }
    const addedRecipe = yield RecipeSchema_1.RecipeModel.create(req.body);
    if (!addedRecipe) {
        throw new ExpressError_1.ExpressError("Cannot create recipe", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    else {
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: "createdRecipe", addedRecipe });
    }
});
exports.createRecipe = createRecipe;
/** @UserRequest extended type from Request that contains _id  */
const getAllRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, category } = req.query;
    /** @queryObj will be used as default query for getAllRecipes */
    const queryObj = {
        createdBy: req.user._id,
    };
    if (search) {
        queryObj.$or = [
            {
                recipeName: { $regex: search, $options: "i" },
            },
        ];
    }
    if (category) {
        queryObj.$or = [
            {
                category: { $regex: category, $options: "i" },
            },
        ];
    }
    const foundRecipes = yield RecipeSchema_1.RecipeModel.find(queryObj)
        .populate("createdBy")
        .sort({ createdAt: -1 });
    if (!foundRecipes) {
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: "No recipes found" });
    }
    else {
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: "recipes found", foundRecipes });
    }
});
exports.getAllRecipes = getAllRecipes;
/** GET SPECIFIC RECIPE */
const getRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const foundRecipe = yield RecipeSchema_1.RecipeModel.findOne({ _id: id });
    if (!foundRecipe) {
        throw new ExpressError_1.ExpressError("No recipe found", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Recipe Found", foundRecipe });
});
exports.getRecipe = getRecipe;
/** Delete Specific Recipe */
const deleteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedRecipe = yield RecipeSchema_1.RecipeModel.findByIdAndDelete(id);
    if (!deletedRecipe) {
        throw new ExpressError_1.ExpressError("Cannot delete recipe", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Recipe Deleted" });
});
exports.deleteRecipe = deleteRecipe;
/** Update Recipe */
/** @parsedUpdateData array where we pushed the parsed strings of ingredient from the client that we then use as the value for req.body.recipeIngredients */
const updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.body) {
        throw new ExpressError_1.ExpressError("No data provided", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    if (req.file) {
        const response = yield cloudinary_1.default.v2.uploader.upload(req.file.path, {
            quality: 70,
            folder: "savorly",
        });
        req.body.photoUrl = response.secure_url;
        req.body.photoId = response.public_id;
    }
    const parsedUpdateData = [];
    if (!req.body.recipeIngredients) {
        throw new ExpressError_1.ExpressError("Recipe ingredients and quantity cannot be empty", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    if (Array.isArray(req.body.recipeIngredients)) {
        req.body.recipeIngredients.forEach((ingredients) => {
            const parsed = JSON.parse(ingredients);
            parsedUpdateData.push(parsed);
        });
    }
    else {
        const parsedData = JSON.parse(req.body.recipeIngredients);
        parsedUpdateData.push(parsedData);
    }
    //after updating the entry, delete the image in cloudinary using the publicId
    if (req.body.photoId) {
        const foundRecipe = yield RecipeSchema_1.RecipeModel.findById(id);
        if (!foundRecipe) {
            throw new ExpressError_1.ExpressError("No found recipe", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        else if (foundRecipe === null || foundRecipe === void 0 ? void 0 : foundRecipe.photoId) {
            yield cloudinary_1.default.v2.uploader.destroy(foundRecipe === null || foundRecipe === void 0 ? void 0 : foundRecipe.photoId);
        }
    }
    req.body.recipeIngredients = parsedUpdateData;
    const updateRecipe = yield RecipeSchema_1.RecipeModel.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    if (!updateRecipe) {
        throw new ExpressError_1.ExpressError("Cannot update recipe", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ message: "Successfully updated recipe", updateRecipe });
});
exports.updateRecipe = updateRecipe;
