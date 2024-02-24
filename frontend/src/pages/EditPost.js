import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../authSlice";
import LoadingSpinner from "../components/LoadingSpinner";

function EditPost() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [files, setFiles] = useState("");
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/post/${id}`);
        const postDetail = await response.json();
        console.log(postDetail);

        setTitle(postDetail.title);
        setContent(postDetail.content);
        setFiles(postDetail.image);
        setAuthor(postDetail.author);
      } catch (error) {
        console.log("Error fetching post details:");
      }
    };

    fetchPostDetails();
  }, [id]);

  async function updatePost(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("author", author);
      formData.append("image", files[0]);
      setLoading(true);
      const response = await axios.put(
        `http://localhost:8080/api/post/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      console.log(response.data);

      navigate("/");
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto text-gray-800 text-lg h-fit py-16">
      <h1 className="flex justify-center text-2xl">Edit this post</h1>
      <form
        onSubmit={updatePost}
        className="flex flex-col gap-3 items-center my-5"
        encType="multipart/form-data"
      >
        <input
          className="w-[600px] px-3 text-xs py-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
          type="text"
          placeholder="Enter a post title.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-[600px] px-3 text-xs py-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
          type="text"
          placeholder="Enter an author name.."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          className="text-xs text-gray-700"
          type="file"
          placeholder="Upload image"
          accept="image/png, image/jpg, image/jpeg"
          onChange={(e) => setFiles(e.target.files)}
        />
        <Editor value={content} onChange={setContent} />

        <button
          type="submit"
          className="w-[600px] bg-red-600 text-white text-sm rounded-md mt-3 px-8  py-3"
        >
          {loading ? <LoadingSpinner /> : " Update post"}
        </button>
      </form>
    </div>
  );
}

export default EditPost;
