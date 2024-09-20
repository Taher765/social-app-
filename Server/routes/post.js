import Express from "express";
import ExpressFormidable from "express-formidable";

const router = Express.Router();

import { requireSignin, canEditDeletePost } from "../middlewares/auth";

import {
  createPost,
  uploadImage,
  postsByUser,
  getPosts,
  userPost,
  updatePost,
  deletePost,
  getNewsFeed,
  likePost,
  unlikePost,
  addComment,
  removeComment,
} from "../controllers/post";

router.post("/create-post", requireSignin, createPost);
router.post(
  "/upload-image",
  requireSignin,
  ExpressFormidable({
    maxFieldsSize: 5 * 1024 * 1024,
  }),
  uploadImage
);

router.get("/posts", getPosts);
router.get("/user-posts", requireSignin, postsByUser);
router.get("/news-feed", requireSignin, getNewsFeed);
router.get("/user-posts/:_id", requireSignin, userPost);
router.put("/update-post/:_id", requireSignin, canEditDeletePost, updatePost);
router.delete(
  "/delete-post/:_id",
  requireSignin,
  canEditDeletePost,
  deletePost
);
router.put("/like-post", requireSignin, likePost);
router.put("/unlike-post", requireSignin, unlikePost);
router.put("/add-comment", requireSignin, addComment);
router.put("/remove-comment", requireSignin, removeComment);

module.exports = router;
