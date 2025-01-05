import mongoose from "mongoose";

export interface IPosts {
    content: string;
    owner?: string;
    username: string;
    userImgUrl: string;
}

const postSchema = new mongoose.Schema<IPosts>({
  content: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  userImgUrl: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const postModel = mongoose.model<IPosts>("Posts", postSchema);

export default postModel;