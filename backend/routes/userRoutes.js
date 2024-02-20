const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/multerMiddleware");
router.post("/register", upload.single("profileImg"), registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);
router.put("/update", authMiddleware, updateUser);
router.get("/logout", authMiddleware, logoutUser);

module.exports = router;
