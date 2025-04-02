import express, { NextFunction, Request, Response } from "express";
import {
  getLoggedUser,
  loginUser,
  logout,
  registerUser,
  updateUser,
} from "../controllers/authControllers";

import {
  loginInputValidation,
  registerInputValidation,
} from "../middleware/inputValidation";
import passport from "passport";
import { StatusCodes } from "http-status-codes";

import { rateLimit } from "express-rate-limit";

import upload from "../middleware/multerMiddleware";
import { isLoggedIn } from "../middleware/isLoggedIn";

const router = express.Router();

const requestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
  message: { error: "Too many login attempts. Try again in 10 minutes" },
});

router.get("/getLoggedUser", getLoggedUser);

router.post(
  "/register",
  upload.single("photoUrl"),
  registerInputValidation,
  registerUser
);
router.post(
  "/login",
  loginInputValidation,
  requestLimiter,
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      (err: Error, user: Express.User, info: any) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(StatusCodes.NOT_FOUND).json({
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

router.post("/logout", logout);

router.patch("/updateUser", isLoggedIn, updateUser);

export default router;
