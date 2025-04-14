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
exports.updateUser = exports.logout = exports.getLoggedUser = exports.loginUser = exports.registerUser = void 0;
require("express-async-errors");
const http_status_codes_1 = require("http-status-codes");
const ExpressError_1 = require("../ExpressError/ExpressError");
const UserSchema_1 = __importDefault(require("../Schema/UserSchema"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const fs_1 = require("fs"); //fs used to remove image files from the storage
/** REGISTER USER */
/** @isAdmin boolean that determines if created user is first in the collection, to be used to specify roles */
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        throw new ExpressError_1.ExpressError("no data received", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (req.file) {
        // console.log(req.file);
        const response = yield cloudinary_1.default.v2.uploader.upload(req.file.path, {
            folder: "savorly",
            quality: 70,
        });
        // console.log(response);
        fs_1.promises.unlink(req.file.path);
        req.body.photoUrl = response.secure_url;
        req.body.photoId = response.public_id;
    }
    const { password } = req.body;
    // provide roles depending if user is the first created
    const isAdmin = (yield UserSchema_1.default.countDocuments()) === 0;
    req.body.role = isAdmin ? "admin" : "user";
    const registeredUser = yield UserSchema_1.default.create(req.body);
    yield registeredUser.setPassword(password);
    yield registeredUser.save();
    if (!registeredUser) {
        throw new ExpressError_1.ExpressError("Problem registering the user", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ message: "New user created", registeredUser });
});
exports.registerUser = registerUser;
/** LOGIN USER */
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        throw new ExpressError_1.ExpressError("No data received", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    const foundUser = yield UserSchema_1.default.findOne({ username: req.body.username });
    if (!foundUser) {
        throw new ExpressError_1.ExpressError("User does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    else {
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: "logged user", foundUser });
    }
});
exports.loginUser = loginUser;
// GET LOGGED USER
/** @req used UserRequest to type the request object which includes the user and _id so that we can access req.user._id without any type errors */
const getLoggedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new ExpressError_1.ExpressError("User is not logged in", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    const loggedUser = yield UserSchema_1.default.findById(req.user._id);
    if (!loggedUser) {
        throw new ExpressError_1.ExpressError("User is not logged in", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: "LoggedUser", loggedUser });
});
exports.getLoggedUser = getLoggedUser;
/** Logging out user from passportJs*/
const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            next(err);
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: "User logged out" });
    });
};
exports.logout = logout;
/** Update user */
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const useReq = req;
    if (!req.body) {
        throw new ExpressError_1.ExpressError("No data received", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    if (req.file) {
        const response = yield cloudinary_1.default.v2.uploader.upload(req.file.path, {
            folder: "savorly",
            quality: 70,
        });
        if (!response) {
            throw new ExpressError_1.ExpressError("Cannot update user", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        fs_1.promises.unlink(req.file.path); //deletes the image saved by multer in the public folder
        req.body.photoUrl = response.secure_url;
        req.body.photoId = response.publicId;
    }
    if (req.body.password) {
        const foundUpdateUser = yield UserSchema_1.default.findById((_a = useReq === null || useReq === void 0 ? void 0 : useReq.user) === null || _a === void 0 ? void 0 : _a._id);
        yield (foundUpdateUser === null || foundUpdateUser === void 0 ? void 0 : foundUpdateUser.setPassword(req.body.password));
        yield (foundUpdateUser === null || foundUpdateUser === void 0 ? void 0 : foundUpdateUser.save());
    }
    if (useReq.user._id) {
        const updatedUser = yield UserSchema_1.default.findByIdAndUpdate((_b = useReq.user) === null || _b === void 0 ? void 0 : _b._id, req.body, { new: true });
        if (!updatedUser) {
            throw new ExpressError_1.ExpressError("Cannot update user", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: "User updated successfully", updatedUser });
    }
    else {
        throw new ExpressError_1.ExpressError("User is not logged in", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
});
exports.updateUser = updateUser;
