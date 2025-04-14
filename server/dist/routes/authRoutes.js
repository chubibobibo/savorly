"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const inputValidation_1 = require("../middleware/inputValidation");
const passport_1 = __importDefault(require("passport"));
const http_status_codes_1 = require("http-status-codes");
const express_rate_limit_1 = require("express-rate-limit");
const multerMiddleware_1 = __importDefault(require("../middleware/multerMiddleware"));
const isLoggedIn_1 = require("../middleware/isLoggedIn");
const router = express_1.default.Router();
const requestLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 1 * 60 * 1000, // 15 minutes
    limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
    message: { error: "Too many login attempts. Try again in 10 minutes" },
});
router.get("/getLoggedUser", authControllers_1.getLoggedUser);
router.post("/register", multerMiddleware_1.default.single("photoUrl"), inputValidation_1.registerInputValidation, authControllers_1.registerUser);
router.post("/login", inputValidation_1.loginInputValidation, requestLimiter, (req, res, next) => {
    passport_1.default.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: info.message || "Username or password incorrect",
            });
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return (0, authControllers_1.loginUser)(req, res, next);
        });
    })(req, res, next);
}, authControllers_1.loginUser);
router.post("/logout", authControllers_1.logout);
router.patch("/updateUser", multerMiddleware_1.default.single("photoUrl"), isLoggedIn_1.isLoggedIn, authControllers_1.updateUser);
exports.default = router;
