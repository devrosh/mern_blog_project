import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import SocialShare from "../components/SocialShare";
import HeroPost from "../components/HeroPost";

export default function HomePage(props) {
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
        console.log(posts);
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
          <HeroPost
            title={posts[3]?.title}
            image={posts[3]?.image}
            author={posts[0?.author]}
            createdAt={posts[0]?.createdAt}
          />
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
