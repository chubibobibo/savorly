import mongoose, { InferSchemaType } from "mongoose";
import { userRoles } from "../utils/roles/userRoles";
import { Document } from "mongoose";
import { model } from "mongoose";

import passportLocalMongoose from "passport-local-mongoose";

const { Schema } = mongoose;

export interface UserInterfaceType extends Document {
  username: string;
  lastName: string;
  firstName: string;
  email: string;
  setPassword: (args: string) => string;
  password: string;
  role: string;
  createdAt: string;
  photoId: string;
  photoUrl: string;
}

const UserSchema = new Schema<UserInterfaceType>(
  {
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
      enum: Object.values(userRoles),
    },

    photoUrl: {
      type: String,
    },

    photoId: {
      type: String,
    },
  },
  { timestamps: true }
);

type UserType = InferSchemaType<typeof UserSchema>;

UserSchema.plugin(passportLocalMongoose); //add a username hash and salt field, hashed and salt value for password.
export default model<UserType>("UserModel", UserSchema);
