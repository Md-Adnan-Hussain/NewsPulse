import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import "./Home.css";

const categories = [
  "general",
  "business",
  "technology",
  "sports",
  "entertainment",
  "health",
  "science",
];

const Home = () => {
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const responses = await Promise.all(
          categories.map((category) =>
            axios.get(`http://localhost:5000/api/news/category/${category}`)
          )
        );
        const newsData = {};
        responses.forEach((response, index) => {
          newsData[categories[index]] = response.data;
        });
        console.log(newsData);

        setNews(newsData);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to fetch news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

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
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p> {/* Show error message */}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Latest News</h1>
      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 capitalize">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news[category]?.map((article) => (
              <NewsCard key={article.title} article={article} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
