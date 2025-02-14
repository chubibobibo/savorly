import { Request, Response } from "express";
import { ExpressError } from "../ExpressError/ExpressError";
import { StatusCodes } from "http-status-codes";
import { RecipeModel } from "../Schema/RecipeSchema";

export const createRecipe = async (req: Request, res: Response) => {
  if (!req.body) {
    throw new ExpressError("No data received", StatusCodes.NOT_FOUND);
  }
  const addedRecipe = await RecipeModel.create(req.body);
  if (!addedRecipe) {
    throw new ExpressError("Cannot create recipe", StatusCodes.BAD_REQUEST);
  } else {
    res.status(StatusCodes.OK).json({ message: "createdRecipe", addedRecipe });
  }
};

export const getAllRecipes = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ExpressError(
      "User needs to be logged in",
      StatusCodes.UNAUTHORIZED
    );
  }
  const foundRecipes = await RecipeModel.find().populate("createdBy");
  if (!foundRecipes) {
    res.status(StatusCodes.OK).json({ message: "No recipes found" });
  } else {
    res.status(StatusCodes.OK).json({ message: "recipes found", foundRecipes });
  }
};
