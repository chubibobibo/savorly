import express from "express";
const router = express.Router();
import { createRecipe, getAllRecipes } from "../controllers/recipesController";
import { isLoggedIn } from "../middleware/isLoggedIn";
import upload from "../middleware/multerMiddleware";

router.get("/getAllRecipes", isLoggedIn, getAllRecipes);
//adding a recipe
router.post(
  "/createRecipe",
  upload.single("photoUrl"),
  isLoggedIn,
  createRecipe
);

export default router;
