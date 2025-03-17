import { createContext } from "react";
import { RecipeTypes, UserTypes } from "../types/Types";

/** initial value  of null ort based on the type used */
export const AllRecipesContext = createContext<RecipeTypes[] | null>(null);
export const LoggedUserContext = createContext<UserTypes | null>(null);
export const SpecificRecipe = createContext<RecipeTypes | null>(null);
