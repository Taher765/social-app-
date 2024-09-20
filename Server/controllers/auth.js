import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
// REDISTER FUNCTION
export const register = async (req, res) => {
  const { name, email, password, secret } = req.body;
  // Check Name
  if (!name) {
    return res.json({
      error: "Name Is Required .",
    });
  }

  // Check Email
  if (!email) {
    return res.json({
      error: "Email Is Required .",
    });
  }
  // Check Exist Email
  const exist = await User.findOne({ email });
  if (exist) {
    return res.json({
      error: "Email Is taken .",
    });
  }

  // Check password
  if (!password || password.length < 6) {
    return res.json({
      error: "Password Is Required And should be 6 characters long .",
    });
  }

  // Check Secret
  if (!secret) {
    return res.json({
      error: "Anwser Is Required .",
    });
  }

  //Password encryption
  const hashedPassword = await hashPassword(password);

  // Send data to the Schema
  const user = new User({
    name,
    email,
    password: hashedPassword,
    secret,
    username: nanoid(6),
  });
  try {
    // Send data to the database
    await user.save();
    console.log("REGISTERED USE =>", user);
    // Send Data to the client
    user.password = undefined;
    return res.json({
      ok: true,
      user,
    });
  } catch (error) {
    // Error
    console.log("REGISTER FAILD => ", error);
    return res.json({
      error: "Erorr Try Again .",
    });
  }
};
// LOGIN FUNCTION
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "No User Found." });
    }
    const match = await comparePassword(password, user.password);
    if (!match)
      return res.json({
        error: "Wrong Password.",
      });

    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    user.secret = undefined;
    return res.json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: "Erorr Try Again .",
    });
  }
};
// CurrenUser FUNCTION
export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id);
    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

// Forgo Password
export const forgotPassword = async (req, res) => {
  const { email, newPassword, secret } = req.body;
  const user = await User.findOne({ email, secret });
  if (!user) {
    return res.json({
      error: "We Can Not Verfiy You With Those Details .",
    });
  }
  if (!newPassword || newPassword.length < 6)
    return res.json({
      error: "New Password is Required and Should Be Min 6 Charachters ong .",
    });
  if (!secret)
    return res.json({
      error: "Secret Is Required .",
    });

  try {
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    return res.json({
      success: "Now You Can Login With New Password.",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: "Something Wrong. Try Again",
    });
  }
};

// Update Profile

export const updateProfile = async (req, res) => {
  try {
    const data = {};

    if (req.body.username) {
      data.username = req.body.username;
    }

    if (req.body.image) {
      data.image = req.body.image;
    }

    if (req.body.about) {
      data.about = req.body.about;
    }

    if (req.body.name) {
      data.name = req.body.name;
    }

    if (req.body.secret) {
      data.secret = req.body.secret;
    }

    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.json({
          error:
            "New Password is Required and Should Be Min 6 Charachters ong .",
        });
      } else {
        data.password = await hashPassword(req.body.password);
      }
    }

    let user = await User.findByIdAndUpdate(req.auth._id, data, {
      new: true,
    });

    user.password = undefined;
    user.secret = undefined;
    console.log(data);
    return res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ error: "Duplicate Username" });
    }
    console.log(error);
  }
};

// / getPeople (ال انا مش عاملهم فولو بس)
export const findPeople = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id);
    let following = user.following;
    following.push(user._id);

    const people = await User.find({ _id: { $nin: following } })
      .select("-password -secret")
      .limit(10);
    res.json(people);
  } catch (error) {
    console.log(error);
  }
};

// middleware (Add Follow)
export const addFollower = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, {
      $addToSet: { followers: req.auth._id },
    });
    next();
  } catch (error) {
    console.log(error);
  }
};

// Function user Follow
export const userFollow = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.auth._id,
      {
        $addToSet: { following: req.body._id },
      },
      { new: true }
    ).select("-password -secret");
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
// Function get user Follow
export const userFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id);
    const following = await User.find({ _id: user.following }).limit(100);
    res.json(following);
  } catch (error) {
    console.log(error);
  }
};

// middleware unFollow

export const removeFollower = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, {
      $pull: { followers: req.auth._id },
    });
    next();
  } catch (error) {
    console.log(error);
  }
};

// function unFollow

export const userUnFollow = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.auth._id,
      { $pull: { following: req.body._id } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
