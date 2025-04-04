import express from "express";
const router = express.Router();
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
} from "../controllers/recipesController";
import { isLoggedIn } from "../middleware/isLoggedIn";
import upload from "../middleware/multerMiddleware";
import { addRecipesInputValidation } from "../middleware/inputValidation";

router.get("/getAllRecipes", isLoggedIn, getAllRecipes);
router.get("/recipe/:id", isLoggedIn, getRecipe);
//adding a recipe
router.post(
  "/createRecipe",
  upload.single("photoUrl"),
  isLoggedIn,
  addRecipesInputValidation,
  createRecipe
);

router.delete("/deleteRecipe/:id", isLoggedIn, deleteRecipe);

router.patch(
  "/updateRecipe/:id",
  upload.single("photoUrl"),
  isLoggedIn,
  updateRecipe
);

export default router;
