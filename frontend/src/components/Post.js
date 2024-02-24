import React from "react";

import { FaChevronRight } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Post({ title, image, author, createdAt, _id }) {
  return (
    <div className="w-96 rounded-sm overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ">
      <Link to={`/post/${_id}`}>
        <img
          className="width-full object-cover object-center h-54"
          src={image}
          alt="postimage"
        />
      </Link>

      <div className="flex items-center gap-5 py-2 px-4 w-full h-auto">
        <p className="font-roboto font-light text-xs text-gray-600">
          {createdAt}
        </p>
        <h5 className="font-roboto font-light text-xs text-rose-600">
          {author}
        </h5>
      </div>
      <div className=" flex items-center mx-3 mt-3 mb-6  px-1">
        <Link to={`/post/${_id}`}>
          <h1 className="font-roboto text-sm flex-initial text-gray-700 hover:underline cursor-pointer  ">
            {title}
          </h1>
        </Link>
        <FaChevronRight size={15} color="#777" />
      </div>
    </div>
  );
}
