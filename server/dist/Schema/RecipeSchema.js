"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema_1 = __importDefault(require("./UserSchema"));
const recipeCategories_1 = __importDefault(require("../utils/recipeCategories"));
const { Schema } = mongoose_1.default;
const RecipeSchema = new Schema({
    recipeName: {
        type: String,
        required: true,
    },
    recipeIngredients: [
        {
            ingredientName: {
                type: String,
                required: true,
            },
            ingredientQty: {
                type: String,
                required: true,
            },
        },
    ],
    recipeDescription: {
        type: String,
        required: true,
    },
    recipeInstruction: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: UserSchema_1.default,
    },
    category: {
        type: String,
        enum: Object.values(recipeCategories_1.default),
    },
    cookingTime: {
        type: Number,
        required: true,
    },
    photoUrl: {
        type: String,
    },
    photoId: {
        type: String,
    },
}, { timestamps: true });
exports.RecipeModel = mongoose_1.default.model("RecipeSchema", RecipeSchema);
