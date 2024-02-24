import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  axios.defaults.withCredentials = true;
  const onSubmit = async (data, e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:8080/api/user/forgot-password",
        data
      );
      navigate("/login");
      // Handle success response
    } catch (error) {
      console.error("Error sending email");
    }
  };

  return (
    <form className="w-[50%] mx-auto p-5" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-gray-600 text-sm mb-2">
        Please provide us your registered email and we will send a password
        reset link in to your email account
      </p>
      <label>
        Email:
        <input
          className="w-full border border-gray-300 p-2 rounded my-2 focus:outline-red-300"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-700">{errors.email.message}</p>}
      </label>

      <button
        className="bg-red-500 w-full p-2 my-1 rounded text-white text-sm"
        type="submit"
      >
        Send Email
      </button>

      {errors.apiError && <p>{errors.apiError.message}</p>}
    </form>
  );
};

export default ForgotPassword;
