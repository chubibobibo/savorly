import { Request, Response } from "express";
import { ExpressError } from "../ExpressError/ExpressError";
import { StatusCodes } from "http-status-codes";
import { RecipeModel } from "../Schema/RecipeSchema";
import { ParsedDataType, UserRequest, UserTypes } from "../types/Types";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

/** @parsedDataArray array where the parsed ingredients data is pushed then used as the new value of req.body.recipeIngredients */

export const createRecipe: any = async (req: UserRequest, res: Response) => {
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

  // console.log(req.body.recipeIngredients);
  /** multiple recipeIngredients results in an array that needs to be mapped and parsed for each of the items */
  /** single recipe ingredient needs to be parsed without mapping */
  const parsedDataArray: ParsedDataType[][] = [];
  if (Array.isArray(req.body.recipeIngredients)) {
    req.body.recipeIngredients.map((ingredients: any) => {
      const parsedData: ParsedDataType[] = JSON.parse(ingredients);
      parsedDataArray.push(parsedData);
      // console.log(parsedData);
      req.body.recipeIngredients = parsedDataArray;
      // console.log(req.body.recipeIngredients);
    });
  } else {
    const parsedData = JSON.parse(req.body.recipeIngredients);
    req.body.recipeIngredients = parsedData;
  }
  // console.log(req.body.recipeIngredients);
  if (!req.user) {
    throw new ExpressError("User not found", StatusCodes.NOT_FOUND);
  } else {
    req.body.createdBy = req.user._id;
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

/** GET SPECIFIC RECIPE */
export const getRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  const foundRecipe = await RecipeModel.findOne({ _id: id });
  if (!foundRecipe) {
    throw new ExpressError("No recipe found", StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ message: "Recipe Found", foundRecipe });
};

/** Delete Specific Recipe */
export const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedRecipe = await RecipeModel.findByIdAndDelete(id);
  if (!deletedRecipe) {
    throw new ExpressError("Cannot delete recipe", StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ message: "Recipe Deleted" });
};

/** Update Recipe */
export const updateRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!req.body) {
    throw new ExpressError("No data provided", StatusCodes.BAD_REQUEST);
  }

  if (req.file) {
    const response = cloudinary.v2.uploader.upload(req.file.path);
  }

  const updateRecipe = await RecipeModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updateRecipe) {
    throw new ExpressError("Cannot update recipe", StatusCodes.BAD_REQUEST);
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "Successfully updated recipe", updateRecipe });
};
