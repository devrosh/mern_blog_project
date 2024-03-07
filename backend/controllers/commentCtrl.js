const Comment = require("../models/commentModel");
const asyncHandler = require("../utils/asyncHandler");

const createComment = asyncHandler(async (req, res) => {
  try {
    const { text, postId, userId } = req.body;

    if (userId.toString() !== req.user._id.toString()) {
      return res.json({ message: "You are not allowed to comment" });
    } else {
      const newComment = new Comment({
        postId,
        userId,
        text,
      });
      await newComment.save();
      // Populate the user information before sending the response
      await newComment.populate("userId", [
        "firstName",
        "lastName",
        "profileImg",
      ]);

      // Send the populated comment in the response
      res.json({ comment: newComment });
    }
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(400).json({ message: "Cant add comments" });
  }
});
//---------Get all Comments---------------
const getAllComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId }).populate("userId", [
      "firstName",
      "lastName",
      "profileImg",
    ]);

    // Extract only the populated user data
    const populatedComments = comments.map((comment) => ({
      ...comment.toObject(),
      userId: {
        firstName: comment.userId.firstName,
        lastName: comment.userId.lastName,
        profileImg: comment.userId.profileImg,
      },
    }));

    res.status(200).json(populatedComments);
  } catch (error) {
    res.status(402).json({ message: "Error getting comments" });
  }
});

//-------------Edit Comment-------------------
const editComment = asyncHandler(async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      {
        new: true,
      }
    ).populate("userId", ["firstName", "lastName", "profileImg"]);
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
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//--------------Like a comment------
const likeComment = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const commentId = req.body.commentId;

    // Check if the user has already liked the comment
    const alreadyLiked = await Comment.exists({
      _id: commentId,
      likes: userId,
    });

    if (alreadyLiked) {
      return res.status(400).json({ message: "Comment already liked" });
    }
    // If not already liked, proceed to update the comment
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $push: { likes: userId } },
      { new: true }
    );

    res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Error liking comment", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//----------------Unlike comment-------
const unlikeComment = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const commentId = req.body.commentId;

    // Check if the user has already unliked the comment
    const alreadyUnliked = await Comment.exists({
      _id: commentId,
      likes: userId,
    });

    if (!alreadyUnliked) {
      return res.status(400).json({ message: "Comment not liked" });
    }

    // If already unliked, proceed to update the comment
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $pull: { likes: userId } },
      { new: true }
    );

    res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Error unliking comment", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = {
  createComment,
  deleteComment,
  editComment,
  getAllComments,
  likeComment,
  unlikeComment,
};
