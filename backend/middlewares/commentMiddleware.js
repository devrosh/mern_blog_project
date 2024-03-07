// Middleware to check if the authenticated user is the owner of the comment
const Comment = require("../models/commentModel");
const checkCommentOwnership = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
      // The authenticated user is not the owner of the comment
      return res
        .status(403)
        .json({ message: "your are not allowed to perfrom this action" });
    }

    // User is authorized to proceed
    next();
  } catch (error) {
    console.error("Error checking comment ownership", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { checkCommentOwnership };
