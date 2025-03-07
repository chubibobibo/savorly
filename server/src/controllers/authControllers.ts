import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import { ExpressError } from "../ExpressError/ExpressError";
import UserModel from "../Schema/UserSchema";
import { NextFunction, Request, Response } from "express";

import { UserInterfaceType } from "../Schema/UserSchema";
import { UserRequest } from "../types/Types";
import { RequestHandler } from "express";
import cloudinary from "cloudinary";
import { promises as fs } from "fs"; //fs used to remove image files from the storage

/** REGISTER USER */
/** @isAdmin boolean that determines if created user is first in the collection, to be used to specify roles */
export const registerUser = async (req: Request, res: Response) => {
  if (!req.body) {
    throw new ExpressError("no data received", StatusCodes.NOT_FOUND);
  }

  if (req.file) {
    // console.log(req.file);
    const response = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "savorly",
      quality: 70,
    });
    // console.log(response);
    fs.unlink(req.file.path);
    req.body.photoUrl = response.secure_url;
    req.body.photoId = response.public_id;
  }

  const { password }: UserInterfaceType = req.body;

  // provide roles depending if user is the first created
  const isAdmin = (await UserModel.countDocuments()) === 0;
  req.body.role = isAdmin ? "admin" : "user";

  const registeredUser = await UserModel.create(req.body);
  await registeredUser.setPassword(password);
  await registeredUser.save();

  if (!registeredUser) {
    throw new ExpressError(
      "Problem registering the user",
      StatusCodes.BAD_REQUEST
    );
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "New user created", registeredUser });
};

/** LOGIN USER */
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body) {
    throw new ExpressError("No data received", StatusCodes.BAD_REQUEST);
  }

  const foundUser = await UserModel.findOne({ username: req.body.username });
  if (!foundUser) {
    throw new ExpressError("User does not exist", StatusCodes.NOT_FOUND);
  } else {
    res.status(StatusCodes.OK).json({ message: "logged user", foundUser });
  }
};

// GET LOGGED USER
/** @req used UserRequest to type the request object which includes the user and _id so that we can access req.user._id without any type errors */
export const getLoggedUser: any = async (req: UserRequest, res: Response) => {
  if (!req.user) {
    throw new ExpressError("User is not logged in", StatusCodes.UNAUTHORIZED);
  }

  const loggedUser = await UserModel.findById(req.user._id);
  if (!loggedUser) {
    throw new ExpressError("User is not logged in", StatusCodes.UNAUTHORIZED);
  }
  res.status(StatusCodes.OK).json({ message: "LoggedUser", loggedUser });
};

/** Logging out user */
export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      next(err);
    }
    res.status(StatusCodes.OK).json({ message: "User logged out" });
  });
};
