import { formatISO9075 } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import { useSelector } from "react-redux";
import { selectUser } from "../authSlice";
import Post from "../components/Post";
function PostDetails() {
  const user = useSelector(selectUser);
  const [postDetail, setPostDetail] = useState(null);
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  //----get recent posts---
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts from the server
        const response = await fetch(
          `http://localhost:8080/api/post/all-posts?limit=2`
        );
        // Check if the request was successful
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        // Parse the response as JSON
        const posts = await response.json();
        console.log(posts);
        // Set the fetched posts in the component's state
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const getPost = async () => {
      const response = await axios.get(`http://localhost:8080/api/post/${id}`);
      const postDetail = await response.data;
      setPostDetail(postDetail);
    };
    getPost();
  }, [id]);
  if (!postDetail) {
    return "";
  }

  return (
    <div className="mx-auto px-3 bg-white py-3 max-w-900 mt-3">
      <h1 className="text-3xl text-center text-gray-800 font-medium mt-10 pb-3">
        {postDetail.title}
      </h1>
      <time className=" block text-gray-500 text-sm text-center">
        {formatISO9075(new Date())}
      </time>
      <div className="text-gray-500 text-sm text-center pb-3">by devrosh</div>
      {user ? (
        <div className="text-center mb-3 flex justify-center">
          <Link
            to={`/post/${postDetail._id}/update`}
            className=" w-40 text-center text-sm text-white bg-red-500 px-6 py-2 mb-3 rounded hover:bg-red-600 "
          >
            Edit Post
          </Link>
        </div>
      ) : null}

      <div className="max-h-80 overflow-hidden flex">
        <img
          className="object-center object-cover"
          src={postDetail.image}
          alt="pic"
        />
      </div>

      <div dangerouslySetInnerHTML={{ __html: postDetail.content }} />
      <Comments postId={postDetail._id} />
      <div className=" md:gap-x-5 gap-y-5 mt-5 px-5 pb-10">
        <h2 className="text-xl font-semibold mb-5 text-gray-700 text-center">
          Recent Posts
        </h2>
        <div className="flex flex-row gap-5 justify-center items-center">
          {posts.length > 0 &&
            posts.map((post, index) => <Post key={index} {...post} />)}
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
