import { IconType } from "react-icons";

export type RecipeTypes = {
  recipeName: string;
  recipeIngredients: { ingredientName: string; ingredientQty: number }[];
  recipeDescription: string;
  recipeInstruction: string;
  createdBy: string;
  category:
    | "pork"
    | "beef"
    | "fish"
    | "chicken"
    | "vegetarian"
    | "vegan"
    | "dessert";
  photoUrl: string;
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
    photoId: string;
    photoUrl: string;
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
