import React from "react";
import "./App.css";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="mx-auto max-w-[1200px]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/post/:id/update" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
