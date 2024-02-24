const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const asyncHandler = require("../utils/asyncHandler");

const createComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const { postId } = req.params;
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      res.status(400).json({ message: "Post not found" });
    } else {
      const newComment = await Comment.create({
        postId,
        user: userId,
        text,
      });
      post.comments.push(newComment._id);
      await post.save();
      res.status(200).json(newComment);
    
    }
  } catch (error) {
    res.status(400).json({ message: "Cant add comments" });
  }
});
//-----------------Delete comments-------------
const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  try {
    // Check if the comment exists
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    // Check if the user owns the comment
    if (comment.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this comment" });
    }
    // Remove the comment from the post's comments array
    const post = await Post.findById(comment.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.comments = post.comments.filter(
      (comment) => comment.toString() !== commentId.toString()
    );
    await post.save();

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { createComment, deleteComment };
