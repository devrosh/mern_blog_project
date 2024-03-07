import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchPosts = async () => {
    try {
      const response = await axios.get(`/api/post/search?query=${query}`);
      setSearchResults(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };
  return <div>SearchResults</div>;
};

export default SearchResults;
