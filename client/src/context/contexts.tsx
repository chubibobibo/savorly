import { createContext } from "react";
import { RecipeTypes } from "../types/Types";

export const AllRecipesContext = createContext<RecipeTypes[] | null>(null);
