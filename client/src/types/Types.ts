import { IconType } from "react-icons";

export type IngredientType = {
  ingredientName?: string;
  ingredientQty?: string;
  id?: string | null;
};

export type RecipeTypes = {
  recipeName: string;
  // recipeIngredients: IngredientType[];
  recipeIngredients: IngredientType[];
  recipeDescription: string;
  recipeInstruction: string;
  createdBy: string;
  category: string;
  photoUrl: File | string;
  photoId: string;
  cookingTime: number;
  _id?: string;
};

export type RecipePropsIndex = {
  recipeName: string;
  recipeDescription: string;
  cookingTime: number;
  category:
    | "pork"
    | "beef"
    | "fish"
    | "chicken"
    | "vegetarian"
    | "vegan"
    | "dessert";
  _id?: string;
};

export type RecipeDataProps = {
  data: RecipeTypes;
  recipeData: RecipeTypes;
  recipeDataStateSetter: (args: RecipeTypes) => void;
};

export type UserTypes = {
  userData?: {
    username: string;
    lastName: string;
    firstName: string;
    email: string;
    setPassword?: (args: string) => string;
    password: string;
    role: string;
    createdAt: string;
    photoId: string | null;
    photoUrl: string | null;
    _id: string;
    status: number;
  };
};

export type SearchBadgeProps = {
  name: string;
  BadgeIcon: IconType;
  onClick: () => void;
  badgeId: string;
};

export interface SyntheticEvent<T> {
  currentTarget: EventTarget & T;
}

export interface SearchStateType {
  search: string;
}
