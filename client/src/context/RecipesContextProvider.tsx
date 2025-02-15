import axios from "axios";
import { AllRecipesContext } from "./contexts";
import { ReactNode } from "react";
import { useEffect, useState } from "react";

import { RecipeTypes } from "../types/Types";
// import { RecipeContextType } from "./contexts";

//type for the children prop
type ChildrenType = {
  children: ReactNode;
};

function RecipesContextProvider({ children }: ChildrenType) {
  const [recipes, setRecipes] = useState<RecipeTypes[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchAllRecipes = async () => {
      try {
        const foundRecipes = await axios.get("/api/recipe/getAllRecipes");
        const allRecipes = foundRecipes?.data?.foundRecipes;
        setRecipes(allRecipes);
      } catch (err) {
        console.log(err);
      }
      controller.abort();
    };
    fetchAllRecipes();
  }, []);

  return (
    <AllRecipesContext.Provider value={recipes}>
      {children}
    </AllRecipesContext.Provider>
  );
}
export default RecipesContextProvider;
