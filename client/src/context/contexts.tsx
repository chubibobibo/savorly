import { createContext } from "react";
import { RecipeTypes, UserTypes } from "../types/Types";

export const AllRecipesContext = createContext<RecipeTypes[] | null>(null);
export const LoggedUserContext = createContext<UserTypes | null>(null);
