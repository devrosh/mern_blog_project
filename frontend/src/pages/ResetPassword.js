import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { id, token } = useParams();

  const navigate = useNavigate();
  const [password, setPassword] = React.useState({
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value,
    });
  };

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `http://localhost:8080/api/user/reset-password/${id}/${token}`,
        password
      );
      const data = response.json();

      navigate("/login");

      // Handle success response
    } catch (error) {
      console.error("Error resetting password");
    }
  };
  return (
    <div>
      <form className="w-[50%] mx-auto p-5" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-semi-bold mb-2">Reset Password Here</h1>
        <label>
          New Password:
          <input
            type="password"
            name="password"
            value={password.password}
            className="w-full border border-gray-300 p-2 rounded my-2 focus:outline-red-300"
            onChange={handleChange}
          />
        </label>

        <button
          className="bg-red-500 w-full p-2 my-1 rounded text-white text-sm"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
