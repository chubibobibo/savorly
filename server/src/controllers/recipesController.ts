import { Request, Response } from "express";
import { ExpressError } from "../ExpressError/ExpressError";
import { StatusCodes } from "http-status-codes";
import { RecipeModel } from "../Schema/RecipeSchema";
import { UserRequest } from "../types/Types";

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

/** @UserRequest extended type from Request that contains _id  */
export const getAllRecipes: any = async (req: UserRequest, res: Response) => {
  const { search, category } = req.query;

  /** @queryObj will be used as default query for getAllRecipes */
  const queryObj: any = {
    createdBy: req.user._id,
  };

  if (search) {
    queryObj.$or = [
      {
        recipeName: { $regex: search, $options: "i" },
      },
    ];
  }

  if (category) {
    queryObj.$or = [
      {
        category: { $regex: category, $options: "i" },
      },
    ];
  }

  const foundRecipes = await RecipeModel.find(queryObj)
    .populate("createdBy")
    .sort({ createdAt: -1 });
  if (!foundRecipes) {
    res.status(StatusCodes.OK).json({ message: "No recipes found" });
  } else {
    res.status(StatusCodes.OK).json({ message: "recipes found", foundRecipes });
  }
};
