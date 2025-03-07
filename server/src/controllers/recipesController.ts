import { Request, Response } from "express";
import { ExpressError } from "../ExpressError/ExpressError";
import { StatusCodes } from "http-status-codes";
import { RecipeModel } from "../Schema/RecipeSchema";
import { UserRequest, UserTypes } from "../types/Types";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const createRecipe = async (req: Request, res: Response) => {
  if (!req.body) {
    throw new ExpressError("No data received", StatusCodes.NOT_FOUND);
  }
  // console.log(req.body);

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "savorly",
      quality: 70,
    });
    // console.log(response);

    fs.unlink(req.file.path);
    req.body.photoUrl = response.secure_url;
    req.body.photoId = response.public_id;
  }

  /** multiple recipeIngredients results in an array that needs to be mapped and parsed for each of the items */
  /** single recipe ingredient needs to be parsed without mapping */
  if (Array.isArray(req.body.recipeIngredients)) {
    req.body.recipeIngredients.map((ingredients: any) => {
      const parsedData = (ingredients = JSON.parse(ingredients));
      req.body.recipeIngredients = parsedData;
    });
  } else {
    const parsedData = (req.body.recipeIngredients = JSON.parse(
      req.body.recipeIngredients
    ));
    req.body.recipeIngredients = parsedData;
  }

  // if (!req.user) {
  //   res.status(StatusCodes.NOT_FOUND).json({ message: "User not logged in" });
  // } else {
  //   req.body.createdBy = req.user._id;
  // }

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
