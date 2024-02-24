import { formatISO9075 } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Comment from "../components/comment"

function PostDetails() {
  const [postDetail, setPostDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      const response = await axios.get(`http://localhost:8080/api/post/${id}`);
      const postDetail = await response.data;
      console.log(postDetail);
      setPostDetail(postDetail);
    };
    getPost();
  }, [id]);
  if (!postDetail) {
    return "";
  }
  return (
    <div className="mx-auto px-3 bg-white py-3 max-w-900">
      <h1 className="text-3xl text-center text-gray-800 font-medium mt-10 pb-3">
        {postDetail.title}
      </h1>
      <time className=" block text-gray-500 text-sm text-center">
        {formatISO9075(new Date())}
      </time>
      <div className="text-gray-500 text-sm text-center pb-3">by devrosh</div>
      <div className="text-center mb-3 flex justify-center">
        <Link
          to={`/post/${postDetail._id}/update`}
          className=" w-40 text-center text-sm text-white bg-gray-900 px-8 py-2 mb-3 rounded "
        >
          Edit Post
        </Link>
      </div>
      <div className="max-h-80 overflow-hidden flex">
        <img
          className="object-center object-cover"
          src={postDetail.image}
          alt="pic"
        />
      </div>

      <div dangerouslySetInnerHTML={{ __html: postDetail.content }} />
    </div>
  );
}

export default PostDetails;
