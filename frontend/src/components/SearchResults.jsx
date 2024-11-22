import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import SearchResultCard from "./SearchResultCard";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/news/search?q=${searchQuery}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("Failed to fetch search results. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-12">
          Search Results for "{searchQuery}"
        </h1>
        <div className="flex justify-center items-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">
        Search Results for "{searchQuery}"
      </h1>
      <hr className="mb-12" />
      {searchResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="row gx-0">
          {searchResults.map((article) => (
            <SearchResultCard
              key={"searchcardresults" + index}
              article={article}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
