import mongoose from "mongoose";
import UserModel from "./UserSchema";
import { Types } from "mongoose";

import recipeCategories from "../utils/recipeCategories";

const { Schema } = mongoose;

interface SchemaType {
  recipeName: string;
  recipeIngredients: { ingredientName: string; ingredientQty: string }[];
  recipeDescription: string;
  recipeInstruction: string;
  createdBy: Types.ObjectId;
  category: string;
  cookingTime: number;
  photoId: string;
  photoUrl: string;
}

const RecipeSchema = new Schema<SchemaType>({
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
        type: Number,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel,
  },

  category: {
    type: String,
    enum: Object.values(recipeCategories),
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
});

export const RecipeModel = mongoose.model("RecipeSchema", RecipeSchema);
