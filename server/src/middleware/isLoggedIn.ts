import { NextFunction, Response } from "express";
import UserModel from "../Schema/UserSchema";
import { UserRequest } from "../types/Types";
import { ExpressError } from "../ExpressError/ExpressError";
import { StatusCodes } from "http-status-codes";

export const isLoggedIn: any = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new ExpressError(
      "User needs to be logged in",
      StatusCodes.UNAUTHORIZED
    );
  }

  next();
};
