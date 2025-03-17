import express from "express";
const router = express.Router();
import { createRecipe, getAllRecipes } from "../controllers/recipesController";
import { isLoggedIn } from "../middleware/isLoggedIn";
import upload from "../middleware/multerMiddleware";
import { addRecipesInputValidation } from "../middleware/inputValidation";

router.get("/getAllRecipes", isLoggedIn, getAllRecipes);
//adding a recipe
router.post(
  "/createRecipe",
  upload.single("photoUrl"),
  isLoggedIn,
  addRecipesInputValidation,
  createRecipe
);

export default router;
