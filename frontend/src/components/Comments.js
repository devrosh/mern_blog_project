import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../authSlice";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import moment from "moment";
import EditComment from "./EditComment";

const Comments = ({ postId }) => {
  const user = useSelector(selectUser);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  axios.defaults.withCredentials = true;

  const createComment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/comment/create",
        { text: newComment, postId, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const data = response.data;

      setComments([...comments, data]);
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  useEffect(() => {
    setNewComment("");
  }, [comments]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/comment/getAllComments/${postId}`
        );
        if (res.status === 200) {
          const data = res.data;
          setComments(data);
        } else {
          console.log(res.status);
        }
      } catch (error) {
        console.log("Could not fetch comments");
      }
    };
    getComments();
  }, [postId]);

  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/comment/delete/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      console.log(response.data);

      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment", error);
    }
  };

  const handleEditClick = (commentId) => {
    setEditCommentId(commentId);
  };

  const handleEditComplete = (editedComment) => {
    const updatedComments = comments.map((comment) =>
      comment._id === editedComment._id ? editedComment : comment
    );

    setComments(updatedComments);
    setEditCommentId(null);
  };
  //-------------handle like and unlike comment------
  const handleLike = async (id) => {
    try {
      if (!id) {
        console.error("Invalid commentId");
        return;
      }
      const response = await axios.put(
        "http://localhost:8080/api/comment/like",
        { commentId: id },

        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const updatedComment = response.data;
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === id ? updatedComment : comment
        )
      );
      setLikes(updatedComment.likesCount);
      setIsLiked(true);
    } catch (error) {
      console.error("Error liking comment", error);
    }
  };

  const handleUnlike = async (id) => {
    try {
      if (!id) {
        console.error("Invalid commentId");
        return;
      }
      const response = await axios.put(
        "http://localhost:8080/api/comment/unlike",
        { commentId: id },

        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const updatedComment = response.data;
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === id ? updatedComment : comment
        )
      );
      setLikes(updatedComment.likesCount);
      setIsLiked(false);
    } catch (error) {
      console.error("Error unliking comment", error);
    }
  };

  return (
    <div className="flex items-center justify-start gap-10">
      <form
        onSubmit={createComment}
        className="flex flex-col items-start my-5 mx-1 gap-3"
      >
        <h1 className="text-red-500 font-medium">Add a Comment</h1>
        <textarea
          className="w-[350px] h-[170px] px-5 py-3 border border-gray-50 bg-gray-100 rounded-md focus:outline-red-300 text-sm"
          type="text-area"
          placeholder="Write a comment"
          name="text"
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
        />
        <button
          type="submit"
          className="bg-red-500 px-6 py-2 rounded text-sm text-white hover:bg-red-600"
        >
          Post a comment
        </button>
      </form>
      {comments.length == 0 ? (
        <p>There are no comments yet.</p>
      ) : (
        <>
          <div className="">
            <div className="flex flex-row gap-2 items-center mb-4 ">
              <p className="text-md text-gray-700">Comments</p>
              <p className="text-md text-gray-700 border border-gray-300 px-2">
                {comments.length}
              </p>
            </div>

            {comments.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row gap-3 my-2 border-b p-3 dark:border-gray-300"
                >
                  <div>
                    <img
                      className="w-[40px] h-[40px] rounded-full border border-gray-200"
                      src={user?.profileImg}
                    />
                  </div>
                  <div>
                    <div className="flex flex-row gap-2 items-center">
                      <p className=" text-gray-600 font-semibold text-sm">
                        {`@${user?.firstName} ${user?.lastName}`}
                      </p>
                      <span className="text-xs text-gray-500">
                        {moment(item.createdAt).fromNow()}
                      </span>
                    </div>
                    {editCommentId === item._id ? (
                      // Render EditComment component when editing is in progress
                      <EditComment
                        commentId={item._id}
                        initialText={item.text}
                        onEdit={handleEditComplete}
                      />
                    ) : (
                      // Render comment text when not in editing mode
                      <p className="text-xs text-gray-500 p-2" key={item._id}>
                        {item.text}
                      </p>
                    )}

                    <div className="flex flex-row items-center gap-3 my-1">
                      <div
                        onClick={() => {
                          handleLike(item._id);
                        }}
                        className={`text-md ${
                          isLiked ? "text-red-500" : "text-gray-500"
                        }`}
                      >
                        <AiFillLike />
                      </div>
                      <div
                        onClick={() => {
                          handleUnlike(item._id);
                        }}
                        className={`text-md ${
                          !isLiked ? "text-red-500" : "text-gray-500"
                        }`}
                      >
                        <AiFillDislike />
                      </div>
                      <span className="text-xs text-gray-600">
                        {item.likes.length} Likes
                      </span>

                      <Link
                        onClick={() => handleEditClick(item._id)}
                        className="text-xs text-gray-600 hover:text-red-500"
                      >
                        Edit
                      </Link>
                      <Link
                        onClick={() => deleteComment(item._id)}
                        className="text-xs text-gray-600 hover:text-red-500"
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Comments;
