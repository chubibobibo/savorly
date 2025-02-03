import express from "express";
import { registerUser } from "../controllers/authControllers";

import { registerInputValidation } from "../middleware/inputValidation";

const router = express.Router();

router.post("/register", registerInputValidation, registerUser);

export default router;
