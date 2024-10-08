import Post from "../models/post";
import { expressjwt } from "express-jwt";

export const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const canEditDeletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    if (req.auth._id != post.postedBy._id) {
      return res.status(400).send("You Are Not Authorized");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
