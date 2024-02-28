const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const asyncHandler = require("../utils/asyncHandler");

const createComment = asyncHandler(async (req, res) => {
  try {
    const { text, postId, userId } = req.body;
    if (userId !== req.user._id) {
      res.json({ message: "You are not allowed to comment" });
    }
    const newComment = new Comment({
      postId,
      userId,
      text,
    });
    await newComment.save();
  } catch (error) {
    res.status(400).json({ message: "Cant add comments" });
  }
});

//-------------Edit Comment-------------------
const editComment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const comment = await Comment.findByIdAndUpdate(
      id,
      { text },
      {
        new: true,
      }
    );
    if (!comment) {
      res.status(400).json({ message: "Could not find comment" });
    } else {
      res.status(200).json(comment);
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating comment" });
  }
});

//-----------------Delete comments-------------
const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  try {
    // Check if the comment exists

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//---------Get all Comments---------------
const getAllComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId });

    res.status(200).json(comments);
  } catch (error) {
    res.status(402).json({ message: "Error getting comments" });
  }
});

module.exports = { createComment, deleteComment, editComment, getAllComments };
