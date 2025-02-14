import express from "express";
const router = express.Router();
import { createRecipe, getAllRecipes } from "../controllers/recipesController";

router.get("/getAllRecipes", getAllRecipes);
//adding a recipe
router.post("/createRecipe", createRecipe);

export default router;
