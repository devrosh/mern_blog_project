import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../authSlice";
import LoadingSpinner from "../components/LoadingSpinner";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        data
      );
      dispatch(setUser(response.data));

      navigate("/profile"); // Handle success response
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center text-gray-800 text-3xl font-semibold my-5">
        Sign In
      </h1>
      <form
        className="w-[50%] bg-white shadow-sm mx-auto p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>
          Email:
          <input
            className="w-full border border-gray-300 p-2 rounded my-2 outline-none focus:border-red-500"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-700">{errors.email.message}</p>
          )}
        </label>

        <label>
          Password:
          <input
            className="w-full border border-gray-300 p-2 rounded my-2 outline-none focus:border-red-500"
            {...register("password", { required: "Password is required" })}
            type="password"
          />
          {errors.password && (
            <p className="text-red-700">{errors.password.message}</p>
          )}
        </label>

        <button
          className="bg-red-500 w-full p-2 my-3 rounded text-white hover:bg-red-600"
          type="submit"
        >
          {isLoading ? <LoadingSpinner /> : "Login"}
        </button>
        <div className="flex flex-col gap-3">
          <span>
            Don't have an account?{" "}
            <Link
              className="text-red-600 text-sm hover:underline"
              to="/register"
            >
              Register here
            </Link>
          </span>
          <span>
            Forgot Password?{" "}
            <Link
              to="/forgot-password"
              className="text-red-600 text-sm hover:underline "
            >
              Click here
            </Link>
          </span>
        </div>

        {errors.apiError && <p>{errors.apiError.message}</p>}
      </form>
      <Footer className="mt-[50px]" />
      <Copyright />
    </>
  );
}

export default Login;
