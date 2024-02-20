import { formatISO9075 } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

function PostDetails() {
  const [postDetail, setPostDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`http://localhost:8080/api/post/${id}`);
      const postDetail = await response.json();
      setPostDetail(postDetail);
    };
    getPost();
  }, [id]);
  if (!postDetail) {
    return "";
  }
  return (
    <div className="mx-auto px-3 bg-white pt-3 max-w-900">
      <h1 className="text-3xl text-center text-gray-800 font-medium mt-10 pb-3">
        {postDetail.title}
      </h1>
      <time className=" block text-gray-500 text-sm text-center">
        {formatISO9075(new Date(postDetail.createdAt))}
      </time>
      <div className="text-gray-500 text-sm text-center pb-3">by devrosh</div>
      <div className="text-center mb-3 flex justify-center">
        <Link
          to={`/edit/${postDetail._id}`}
          className=" w-40 text-sm text-white bg-gray-900 px-8 py-2 mb-3 text-center rounded flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 mx-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          Edit Post
        </Link>
      </div>
      <div className="max-h-80 overflow-hidden flex">
        <img
          className="object-center object-cover"
          src={`http://localhost:8080/${postDetail.image}`}
          alt="pic"
        />
      </div>

      <div dangerouslySetInnerHTML={{ __html: postDetail.content }} />
    </div>
  );
}

export default PostDetails;
