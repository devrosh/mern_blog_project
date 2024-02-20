import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTelegram, FaTwitter } from "react-icons/fa";

function SocialShare() {
  return (
    <div className="bg-gray-200 h-[60px] mt-6 mb-[-40px] w-full">
      <div className="max-w-[1200px] mx-auto flex items-center gap-5 pt-5 px-4 ">
        <p className="text-center text-sm">Follow Us: </p>
        <div className="flex items-center gap-2">
          <Link to="">
            <FaFacebook size={21} color="#ed2939" />
          </Link>
          <Link to="">
            <FaInstagram size={21} color="#ed2939" />
          </Link>
          <Link to="">
            <FaTwitter size={21} color="#ed2939" />
          </Link>
          <Link to="">
            <FaTelegram size={21} color="#ed2939" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SocialShare;
