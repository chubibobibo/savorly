import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

interface AppError {
  status?: number;
  message?: string;
}

const app = express();

app.use(express.json());
app.use(cors());

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
