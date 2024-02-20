import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";

function EditPost() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:8080/api/post/update" + id).then((response) => {
      response.json().then((postDetail) => {
        setTitle(postDetail.title);
        setContent(postDetail.content);
        setFiles(postDetail.image);
      });
    });
  }, [id]);

  function updatePost(e) {
    e.preventdefault();
  }

  if (redirect) {
    return navigate("/");
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
          accept="image/png, image/jpg, image/jpeg"
          onChange={(e) => setFiles(e.target.files)}
        />
        <Editor value={content} onChange={setContent} />

        <button
          type="submit"
          className="w-[600px] bg-gray-800 text-white text-sm rounded-sm mt-3 px-8  py-2"
        >
          Update post
        </button>
      </form>
    </div>
  );
}

export default EditPost;
