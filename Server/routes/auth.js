import Express from "express";

const router = Express.Router();
import {
  register,
  login,
  currentUser,
  forgotPassword,
  updateProfile,
  findPeople,
  userFollow,
  addFollower,
  userFollowing,
  userUnFollow,
  removeFollower,
} from "../controllers/auth";
import { requireSignin } from "../middlewares/auth";

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/current-user", requireSignin, currentUser);
router.get("/find-people", requireSignin, findPeople);
router.put("/update-profile", requireSignin, updateProfile);
router.put("/user-follow", requireSignin, addFollower, userFollow);
router.get("/user-following", requireSignin, userFollowing);
router.put("/user-unfollow", requireSignin, removeFollower, userUnFollow);

module.exports = router;
