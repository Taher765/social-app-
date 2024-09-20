import Post from "../models/post";
import User from "../models/user";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINAEY_NAME,
  api_key: process.env.CLOUDINAEY_API,
  api_secret: process.env.CLOUDINAEY_SECRET,
});

export const createPost = async (req, res) => {
  const { content, image } = req.body;
  const imgValid = Object.keys(image);
  if (!content.length && imgValid.length === 0) {
    return res.json({
      error: "Please fill in one of the fields",
    });
  }

  try {
    const post = new Post({
      content,
      image,
      postedBy: req.auth._id,
    });
    console.log("POST => ", post);
    post.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.files.image.path);
    console.log("image url =. 1", result);
    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.log(error);
  }
};

// get All Posts Any User

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id name image")
      .sort({ createdAt: -1 });
    // .limit(10);
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

// get Posts user
export const postsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.auth._id })
      .populate("postedBy", "_id name image")
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

// get post By ID

export const userPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params._id);
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

// Update Post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};
// Delete Post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params._id);
    if (post.image && post.image.public_id) {
      const image = await cloudinary.v2.uploader.destroy(post.image.public_id);
    }

    res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};

// get Posts => Following only

export const getNewsFeed = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id);

    let following = user.following;

    following.push(req.auth._id);

    const posts = await Post.find({ postedBy: { $in: following } })
      .populate("postedBy", "_id name image")
      .populate("comments.postedBy", "_id name image")
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

// Handle Like
export const likePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      { $addToSet: { likes: req.auth._id } },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

// Handle Un Like
export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      { $pull: { likes: req.auth._id } },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

// Handle Add Comment
export const addComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: { text: comment, postedBy: req.auth._id } },
      },
      { new: true }
    )
      .populate("postedBy", "_id name image")
      .populate("comments.postedBy", "_id name image");
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};
// Handle Remove Comment
export const removeComment = async (req, res) => {};
