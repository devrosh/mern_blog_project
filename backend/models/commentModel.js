const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
