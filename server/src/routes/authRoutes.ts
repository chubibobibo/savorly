import express, { NextFunction, Request, Response } from "express";
import { loginUser, registerUser } from "../controllers/authControllers";

import { registerInputValidation } from "../middleware/inputValidation";
import passport from "passport";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.post("/register", registerInputValidation, registerUser);
router.post(
  "/login",
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      (err: Error, user: Express.User, info: any) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: info.message || "Username or password incorrect",
          });
        }
        req.login(user, (err) => {
          if (err) {
            return next(err);
          }
          return loginUser(req, res, next);
        });
      }
    )(req, res, next);
  },
  loginUser
);

export default router;
