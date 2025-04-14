"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userRoles_1 = require("../utils/roles/userRoles");
const mongoose_2 = require("mongoose");
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
const { Schema } = mongoose_1.default;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(userRoles_1.userRoles),
    },
    photoUrl: {
        type: String,
    },
    photoId: {
        type: String,
    },
}, { timestamps: true });
UserSchema.plugin(passport_local_mongoose_1.default); //add a username hash and salt field, hashed and salt value for password.
exports.default = (0, mongoose_2.model)("UserModel", UserSchema);
