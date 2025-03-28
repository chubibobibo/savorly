import { Types } from "mongoose";
import { Request } from "express";

export interface UserTypes {
  username: string;
  lastName: string;
  firstName: string;
  email: string;
  setPassword: (args: string) => string;
  password: string;
  role: string;
  createdAt: string;
  photoId: string;
  photoUrl: string;
  _id: Types.ObjectId;
}

export type ParsedDataType = {
  ingredientName: string;
  ingredientQty: string;
  id: string | null;
};

/** extending @Request type object to include user and _id property. This allows us to type properly req.user._id */
export interface UserRequest extends Request {
  // user: {
  //   _id: Types.ObjectId;
  // };
  // _id: Types.ObjectId;
  photoId: string;
  user: {
    _id: string;
  };
}

export type IngredientType = {
  ingredientName?: string;
  ingredientQty?: string;
  id?: string | null;
};

export type RecipeData = {
  recipeName: string;
  // recipeIngredients: IngredientType[];
  recipeIngredients: IngredientType[];
  recipeDescription: string;
  recipeInstruction: string;
  createdBy: string;
  category: string;
  photoUrl?: File | string;
  photoId?: string;
  cookingTime: number;
  _id?: string;
};
