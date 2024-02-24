import React from "react";

const Comment = ({ comment }) => {
  return (
    <div>
      <p>{comment.text}</p>
      <small>
        {comment.user.firstName} {comment.user.lastName}
      </small>
    </div>
  );
};

export default Comment;
