import express from "express";
const router = express.Router();
import { createRecipe, getAllRecipes } from "../controllers/recipesController";
import { isLoggedIn } from "../middleware/isLoggedIn";

router.get("/getAllRecipes", isLoggedIn, getAllRecipes);
//adding a recipe
router.post("/createRecipe", isLoggedIn, createRecipe);

export default router;
