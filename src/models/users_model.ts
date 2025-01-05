import mongoose from "mongoose";
//import { User } from "../types";

export interface User {
  email: string;
  password: string;
  username: string;
  imgUrl?: string;
  _id?: string;
  firstName: string;
  lastName:string;
  refreshTokens?: string[];
}

const userSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
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
  imgUrl: {
    type: String,
  },
  refreshTokens: {
    type: [String],
    required: false,
  },
});

export default mongoose.model<User>("User", userSchema);