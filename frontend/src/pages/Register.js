import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("profileImg", data.profileImg[0]);

      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        formData
      );

      navigate("/login"); // Handle success response
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center text-gray-800 text-3xl font-semibold my-5">
        Sign Up
      </h1>
      <form
        className=" w-[50%] bg-white shadow-sm mx-auto p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>
          First Name:
          <input
            className="w-full border border-gray-300 p-2 rounded my-1 outline-none focus:border-red-500"
            {...register("firstName", { required: "First name is required" })}
            autoComplete="off"
          />
          {errors.firstName && (
            <p className="text-red-700">{errors.firstName.message}</p>
          )}
        </label>

        <label>
          Last Name:
          <input
            className="w-full border border-gray-300 p-2 my-1 rounded outline-none focus:border-red-500"
            {...register("lastName", { required: "Last name is required" })}
            autoComplete="off"
          />
          {errors.lastName && (
            <p className="text-red-700">{errors.lastName.message}</p>
          )}
        </label>

        <label>
          Email:
          <input
            className="w-full border border-gray-300 p-2 my-1 rounded outline-none focus:border-red-500"
            {...register("email", { required: "Email is required" })}
            autoComplete="off"
          />
          {errors.email && (
            <p className="text-red-700">{errors.email.message}</p>
          )}
        </label>

        <label>
          Password:
          <input
            className="w-full border border-gray-300 p-2 my-1 rounded outline-none focus:border-red-500"
            {...register("password", { required: "Password is required" })}
            type="password"
            autoComplete="off"
          />
          {errors.password && (
            <p className="text-red-700">{errors.password.message}</p>
          )}
        </label>

        <label className="text-sm text-gray-800">
          Upload Profile Image:
          <input
            className="my-1 mx-2 outline-none"
            {...register("profileImg", {
              required: "Profile image is required",
            })}
            type="file"
            autoComplete="off"
          />
          {errors.profileImg && (
            <p className="text-red-700">{errors.profileImg.message}</p>
          )}
        </label>

        <button
          className="bg-red-500 w-full p-2 my-4 rounded text-white hover:bg-red-600"
          type="submit"
        >
          {isLoading ? <LoadingSpinner /> : "Register"}
        </button>
        <span>
          Already have an account?{" "}
          <Link className="text-red-600 text-sm hover:underline " to="/login">
            Login here
          </Link>
        </span>

        {errors.apiError && (
          <p className="text-red-700">{errors.apiError.message}</p>
        )}
      </form>
      <Footer />
      <Copyright />
    </>
  );
}

export default Register;
