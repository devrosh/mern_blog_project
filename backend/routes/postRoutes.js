const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createPost,
  getSinglePost,
  getAllPosts,
  updatePost,
  deletePost,
} = require("../controllers/postCtrl");
const { upload } = require("../middlewares/multerMiddleware");

router.post("/create", authMiddleware, upload.single("image"), createPost);

router.get("/all-posts", getAllPosts);

router.get("/:id", getSinglePost);
router.put("/update/:id", authMiddleware, upload.single("image"), updatePost);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
