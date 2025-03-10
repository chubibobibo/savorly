import { Types } from "mongoose";
import { Request } from "express";

export interface UserTypes {
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
  _id: Types.ObjectId;
}

/** extending @Request type object to include user and _id property. This allows us to type properly req.user._id */
// export interface UserRequest extends Request {
//   user: {
//     _id: Types.ObjectId;
//   };
// }

export interface UserRequest extends Request {
  user: {
    _id: Types.ObjectId;
  };
}
