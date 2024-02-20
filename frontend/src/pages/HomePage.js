import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import { FaChevronRight } from "react-icons/fa";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import SocialShare from "../components/SocialShare";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts from the server
        const response = await fetch(
          "http://localhost:8080/api/post/all-posts"
        );

        // Check if the request was successful (status code 2xx)
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        // Parse the response as JSON
        const posts = await response.json();

        // Set the fetched posts in the component's state
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 pt-6">
        <div className="col-span-2">
          <h2 className="mx-5 pb-5 text-lg text-black-600">Featured</h2>
          <div className="mx-5 max-w-[900px] rounded-sm overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ">
            <div className=" w-full h-auto ">
              <img
                className="block width-full object-center object-cover  "
                src="https://images.pexels.com/photos/4050387/pexels-photo-4050387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="postimage"
              />
            </div>

            <div className="flex items-center gap-5 py-2 px-4 w-full h-auto">
              <p className="font-roboto font-light text-sm text-gray-600">
                Sep 21, 2023 |
              </p>
              <h5 className="font-roboto font-light text-xs text-rose-600">
                Roshan Singh Dwariya - CEO of Devrosh
              </h5>
            </div>
            <div className="flex items-center mx-3 my-5 gap-1 px-1">
              <h1 className="font-roboto text-xl text-gray-700 hover:underline cursor-pointer">
                Future of AI in the current technology world for betterment of
                life
              </h1>
              <FaChevronRight size={20} color="#555" />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:gap-x-5 gap-y-5 px-5 pb-10">
          <h2 className="  text-lg text-black-600">More Posts</h2>
          {posts.length > 0 &&
            posts.map((post, index) => <Post key={index} {...post} />)}
        </div>
      </div>

      <SocialShare />
      <Footer />
      <Copyright />
    </>
  );
}
