import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import { ExpressError } from "../ExpressError/ExpressError";
import UserModel from "../Schema/UserSchema";
import { NextFunction, Request, Response } from "express";

import { UserInterfaceType } from "../Schema/UserSchema";

/** REGISTER USER */
/** @isAdmin boolean that determines if created user is first in the collection, to be used to specify roles */
export const registerUser = async (req: Request, res: Response) => {
  if (!req.body) {
    throw new ExpressError("no data received", StatusCodes.NOT_FOUND);
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
