import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect to login if user is not logged in
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Or you can render a loading spinner or message
  }
  return (
    <div>
      <p>
        Hello, {user.firstName} {user.lastName}
      </p>
    </div>
  );
};

export default Profile;
