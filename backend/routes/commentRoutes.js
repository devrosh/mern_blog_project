const express = require("express");
const router = express.Router();
const {
  createComment,
  getAllComments,
  deleteComment,
  editComment,
  likeComment,
  unlikeComment,
} = require("../controllers/commentCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { checkCommentOwnership } = require("../middlewares/commentMiddleware");

router.post("/create", authMiddleware, createComment);
router.get("/getAllComments/:postId", getAllComments);
router.put(
  "/edit/:commentId",
  authMiddleware,
  checkCommentOwnership,
  editComment
);
router.put("/like", authMiddleware, likeComment);
router.put("/unlike", authMiddleware, unlikeComment);
router.delete(
  "/delete/:commentId",
  authMiddleware,
  checkCommentOwnership,
  deleteComment
);
module.exports = router;
