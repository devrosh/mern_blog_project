import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../authSlice";
const EditComment = ({ commentId, initialText, onEdit }) => {
  const user = useSelector(selectUser);
  const [editedText, setEditedText] = useState(initialText);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8080/api/comment/edit/${commentId}`,
        { text: editedText },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      // Assuming the server responds with the updated comment data
      const updatedComment = response.data;
      // Call the onEdit function to update the state in the parent component
      onEdit(updatedComment);
    } catch (error) {
      console.error("Error editing comment", error);
    }
  };

  return (
    <form className="flex flex-col gap-5 p-2" onSubmit={handleEditSubmit}>
      <textarea
        className="text-xs py-3 px-2 border border-gray-200 rounded-sm outline-none focus:border-red-500"
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
      />
      <div className="flex flex-row gap-4 items-center">

        <button
          className="text-xs text-white bg-red-500 px-2  py-1 rounded-md"
          type="submit"
        >
          Save
        </button>
        <button
          className="text-xs text-white bg-red-500 px-2  py-1 rounded-md"
          type="submit"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditComment;
