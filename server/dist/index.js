"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const http_status_codes_1 = require("http-status-codes");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const recipeRoutes_1 = __importDefault(require("./routes/recipeRoutes"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_session_1 = __importDefault(require("express-session"));
const ExpressError_1 = require("./ExpressError/ExpressError");
const passport_1 = __importDefault(require("passport"));
const UserSchema_1 = __importDefault(require("./Schema/UserSchema"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
const mongodbConnectionString = process.env.MONGO_DB;
const app = (0, express_1.default)();
/**serving public folder */
app.use(express_1.default.static(path_1.default.join(__dirname, "./public")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); //parses data and populates req.body if content is application/x-www-form-urlencoded
app.use((0, cors_1.default)());
// const __dirname = dirname(fileURLToPath(import.meta.url));
// app.use(express.static(path.resolve(__dirname, "./src/public")));
app.use(express_1.default.static("./src/public"));
// connection to mongoose
// ensure that the connection string exist before passing it as connection arg.
main().catch((err) => console.log(err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!mongodbConnectionString) {
            throw new Error("Problem with connection");
        }
        yield mongoose_1.default.connect(mongodbConnectionString);
    });
}
// configure mongo store
const storeSecret = process.env.MONGO_STORE_SECRET;
if (!storeSecret) {
    throw new ExpressError_1.ExpressError("No secret string provided", http_status_codes_1.StatusCodes.BAD_REQUEST);
}
const mongoStore = connect_mongo_1.default.create({
    mongoUrl: process.env.MONGO_DB,
    touchAfter: 24 * 3600,
    crypto: {
        secret: storeSecret,
    },
});
// verify if session_secret exist before being used.
if (!process.env.SESSION_SECRET) {
    throw new ExpressError_1.ExpressError("Session secret not provided", http_status_codes_1.StatusCodes.BAD_REQUEST);
}
// configure session using mongo store
app.use((0, express_session_1.default)({
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
}));
// initialize passport
app.use(passport_1.default.initialize()); // creates passport object that contains user data
app.use(passport_1.default.session()); // adds the passport object to session that allows persistent userdata.
passport_1.default.use(UserSchema_1.default.createStrategy()); //allows passport to use local strategy define in the USerSchema
passport_1.default.serializeUser(UserSchema_1.default.serializeUser()); // determines what data of user is stored when logging in
passport_1.default.deserializeUser(UserSchema_1.default.deserializeUser()); // attaches the user data from the the database to the req.user obj.
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
//ROUTES
app.use("/api/auth/", authRoutes_1.default);
app.use("/api/recipe/", recipeRoutes_1.default);
//access to index.html from the client
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "./public", "index.html"));
});
//error handler page not found
app.use("*", (req, res) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "Page not found" });
});
//express error handler
app.use((err, req, res, next) => {
    const status = err.status || 400;
    const message = err.message || "Something went wrong";
    res.status(status).json({ message: message });
});
app.listen(process.env.PORT, () => {
    console.log(`SERVING PORT ${process.env.PORT}`);
});
