import { createContext } from "react";
import { RecipeTypes } from "../types/Types";

//initial value of allRecipesContext
export type RecipeContextType = [
  {
    recipeName: string;
    recipeIngredients: { ingredientName: string; ingredientQty: number }[];
    recipeDescription: string;
    createdBy: string;
    category: string;
  }
];

export const AllRecipesContext = createContext<RecipeTypes[] | null>(null);
