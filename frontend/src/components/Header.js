import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, clearUser } from "../authSlice";
import { useDispatch } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    // Dispatch action to clear user when logging out
    dispatch(clearUser());
    // Also, perform any other logout actions like redirecting or clearing tokens
    navigate("/login");
  };
  return (
    <header className=" w-full h-[60px] pt-3 bg-white shadow-md">
      <div className="max-w-[1160px] mx-auto flex flex-row justify-between items-center ">
        <div className="">
          <Link className="text-xl text-gray-700 font-semibold hover:text-red-600" to="/">
            Rastr
          </Link>
        </div>
        <div className="w-[350px] flex flex-row items-center gap-4 bg-gray-100 p-2 rounded-full">
          <FaSearch className="text-red-600" />
          <input
            className="border-none outline-none bg-gray-100 text-sm"
            type="text"
            placeholder="search post..."
          />
        </div>
        {user ? (
          <div className="create_post">
            <Link className="navlinks" to="/account">
              <p>Welcome {user.firstName}</p>
            </Link>
            <Link className="navlinks" to="/create">
              Create Post
            </Link>
            <li>
              <button onClick={handleLogout}>LogOut</button>
            </li>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-4">
            <div>
              <Link className="text-sm hover:underline underline-offset-1" to="/login">
                Login
              </Link>
            </div>
            <div>
              <Link className="bg-red-500 px-5 py-2 text-white  text-sm rounded-full hover:bg-red-600" to="/register">
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
