import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../authSlice";
import LoadingSpinner from "../components/LoadingSpinner";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],

    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link", "image", "video"],
    [{ color: [] }, { background: [] }],

    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "list",
  "indent",
  "size",
  "header",
  "link",
  "image",
  "video",
  "color",
  "background",
  "clean",
];

function CreatePost() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("author", author);
      formData.append("image", image[0]);

      const response = await axios.post(
        "http://localhost:8080/api/post/create",
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
      console.error("Post not created");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto text-gray-800 text-lg h-fit py-16">
      <h1 className="flex justify-center text-2xl">Create a post</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 items-center my-5"
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
          placeholder="Enter auhtor name.."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          className="text-xs text-gray-700"
          type="file"
          placeholder="Upload image"
          onChange={(e) => setImage(e.target.files)}
        />
        <ReactQuill
          value={content}
          className="w-[600px] h-auto bg-white border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
          placeholder="Write something amazing.."
          modules={modules}
          formats={formats}
          onChange={(newValue) => setContent(newValue)}
        />
        <button
          type="submit"
          className="w-[600px] bg-red-600 text-white text-sm rounded-md mt-3 px-8  py-3"
        >
          {loading ? <LoadingSpinner /> : "Create post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
