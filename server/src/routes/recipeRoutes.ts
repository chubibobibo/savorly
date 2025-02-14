import express from "express";
const router = express.Router();
import { createRecipe } from "../controllers/recipesController";

//adding a recipe
router.post("/createRecipe", createRecipe);

export default router;
