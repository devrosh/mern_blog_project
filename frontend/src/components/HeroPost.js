import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroPost = ({ title, image, author, createdAt, _id }) => {
  return (
    <div className="mx-5 max-w-[900px] rounded-sm overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ">
      <div className=" w-full h-auto ">
        <Link to={`/post/${_id}`}>
          <img
            className="block width-full object-center object-cover cursor-pointer"
            src={image}
            alt="postimage"
          />
        </Link>
      </div>

      <div className="flex items-center gap-5 py-2 px-4 w-full h-auto">
        <p className="font-roboto font-light text-sm text-gray-600">
          {createdAt}
        </p>
        <h5 className="font-roboto font-light text-xs text-rose-600">
          {author}
        </h5>
      </div>
      <Link
        to={`/post/${_id}`}
        className="flex items-center mx-3 my-5 gap-1 px-1"
      >
        <h1 className="font-roboto text-xl text-gray-700 hover:underline cursor-pointer">
          {title}
        </h1>
        <FaChevronRight size={20} color="#555" />
      </Link>
    </div>
  );
};

export default HeroPost;
