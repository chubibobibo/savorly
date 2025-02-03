import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import { ExpressError } from "../ExpressError/ExpressError";
import UserModel from "../Schema/UserSchema";
import { Request, Response } from "express";

import { UserInterfaceType } from "../Schema/UserSchema";

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
