import postsModel, { IPosts } from "../models/posts_model";
import BaseController from "./base_controller";

const postsController = new BaseController<IPosts>(postsModel);

export default postsController