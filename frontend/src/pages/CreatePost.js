import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("file", files[0]);

    const response = await axios.post(
      "http://localhost:8080/api/post/create",
      formData
    );
    if (response.ok) {
      setRedirect(true);
      console.log("msg:redirect succesful");
    }
    navigate("/");
  };

  if (redirect) {
    return null;
  }

  return (
    <div className="mx-auto text-gray-800 text-lg h-fit py-16">
      <h1 className="flex justify-center text-2xl">Create a post</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 items-center my-5"
        encType="multipart/form-data"
      >
        <input
          className="w-[600px] px-3 text-xs py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-red-500"
          type="text"
          placeholder="Enter a post title.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="text-xs text-gray-700"
          type="file"
          placeholder="Upload image"
      
          onChange={(e) => setFiles(e.target.files)}
        />
        <ReactQuill
          value={content}
          className="w-[600px] h-auto border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
          placeholder="Write something amazing.."
          modules={modules}
          formats={formats}
          onChange={(newValue) => setContent(newValue)}
        />
        <button
          type="submit"
          className="w-[600px] bg-gray-800 text-white text-sm rounded-sm mt-3 px-8  py-2"
        >
          Create post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
