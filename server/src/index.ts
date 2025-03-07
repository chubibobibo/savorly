import express, { urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

import userRoute from "./routes/authRoutes";
import recipeRoutes from "./routes/recipeRoutes";
import MongoStore from "connect-mongo";
import session from "express-session";
import { ExpressError } from "./ExpressError/ExpressError";

import passport from "passport";
import UserModel from "./Schema/UserSchema";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

//interface to type check err
interface AppError {
  status?: number;
  message?: string;
}

const mongodbConnectionString = process.env.MONGO_DB;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //parses data and populates req.body if content is application/x-www-form-urlencoded
app.use(cors());
// const __dirname = dirname(fileURLToPath(import.meta.url));
// app.use(express.static(path.resolve(__dirname, "./src/public")));
app.use(express.static("./src/public"));

// connection to mongoose
// ensure that the connection string exist before passing it as connection arg.
main().catch((err) => console.log(err));
async function main() {
  if (!mongodbConnectionString) {
    throw new Error("Problem with connection");
  }
  await mongoose.connect(mongodbConnectionString);
}

// configure mongo store
const storeSecret = process.env.MONGO_STORE_SECRET;
if (!storeSecret) {
  throw new ExpressError("No secret string provided", StatusCodes.BAD_REQUEST);
}
const mongoStore = MongoStore.create({
  mongoUrl: process.env.MONGO_DB,
  touchAfter: 24 * 3600,
  crypto: {
    secret: storeSecret,
  },
});

// verify if session_secret exist before being used.
if (!process.env.SESSION_SECRET) {
  throw new ExpressError(
    "Session secret not provided",
    StatusCodes.BAD_REQUEST
  );
}
// configure session using mongo store
app.use(
  session({
    store: mongoStore,
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      //   expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: process.env.DEV_ENV === "production",
    },
  })
);

// initialize passport
app.use(passport.initialize()); // creates passport object that contains user data
app.use(passport.session()); // adds the passport object to session that allows persistent userdata.
passport.use(UserModel.createStrategy()); //allows passport to use local strategy define in the USerSchema

passport.serializeUser(UserModel.serializeUser() as any); // determines what data of user is stored when logging in
passport.deserializeUser(UserModel.deserializeUser() as any); // attaches the user data from the the database to the req.user obj.

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//ROUTES
app.use("/api/auth/", userRoute);
app.use("/api/recipe/", recipeRoutes);

//error handler page not found
app.use("*", (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "Page not found" });
});

//express error handler
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 400;
  const message = err.message || "Something went wrong";
  res.status(status).json({ message: message });
});

app.listen(process.env.PORT, () => {
  console.log(`SERVING PORT ${process.env.PORT}`);
});
