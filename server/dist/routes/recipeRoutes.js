"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const recipesController_1 = require("../controllers/recipesController");
const isLoggedIn_1 = require("../middleware/isLoggedIn");
const multerMiddleware_1 = __importDefault(require("../middleware/multerMiddleware"));
const inputValidation_1 = require("../middleware/inputValidation");
router.get("/getAllRecipes", isLoggedIn_1.isLoggedIn, recipesController_1.getAllRecipes);
router.get("/recipe/:id", isLoggedIn_1.isLoggedIn, recipesController_1.getRecipe);
//adding a recipe
router.post("/createRecipe", multerMiddleware_1.default.single("photoUrl"), isLoggedIn_1.isLoggedIn, inputValidation_1.addRecipesInputValidation, recipesController_1.createRecipe);
router.delete("/deleteRecipe/:id", isLoggedIn_1.isLoggedIn, recipesController_1.deleteRecipe);
router.patch("/updateRecipe/:id", multerMiddleware_1.default.single("photoUrl"), isLoggedIn_1.isLoggedIn, recipesController_1.updateRecipe);
exports.default = router;
