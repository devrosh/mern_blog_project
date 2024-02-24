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

const { createComment, deleteComment } = require('../controllers/commentCtrl');

router.post("/create", authMiddleware, upload.single("image"), createPost);
router.get("/all-posts", getAllPosts);
router.get("/:id", getSinglePost);
router.put("/update/:id", authMiddleware, upload.single("image"), updatePost);
router.delete("/:id", authMiddleware, deletePost);
router.post('/:postId/comments', authMiddleware, createComment);
router.delete('/comments/:commentId', authMiddleware, deleteComment);

module.exports = router;
