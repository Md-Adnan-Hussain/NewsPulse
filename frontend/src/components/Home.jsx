import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import "./Home.css";

const categories = [
  "business",
  "technology",
  "sports",
  "entertainment",
  "health",
  "science",
];

const Home = () => {
  const [news, setNews] = useState({});
  const [hotTopics, setHotTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingHotTopics, setLoadingHotTopics] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const responses = await Promise.all(
          categories.map((category) =>
            axios.get(`http://localhost:3000/api/news/category/${category}`)
          )
        );
        const newsData = {};
        responses.forEach((response, index) => {
          newsData[categories[index]] = response.data;
        });
        setNews(newsData);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to fetch news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchHotTopics = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/news/category/general"
        );
        const hotTopicsData = response.data.slice(0, 3);
        setHotTopics(hotTopicsData);
      } catch (error) {
        console.error("Error fetching hot topics:", error);
        setError("Failed to fetch hot topics. Please try again later.");
      } finally {
        setLoadingHotTopics(false);
      }
    };

    fetchNews();
    fetchHotTopics();
  }, []);

  if (loading || loadingHotTopics) {
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
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Hot Topics</h1>
      <hr className="mb-8" />
      <div
        id="carouselExampleCaptions"
        className="carousel slide mb-8"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {hotTopics.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {hotTopics.map((article, index) => (
            <>
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={article.title}
              >
                <img
                  src={article.urlToImage}
                  className="d-block w-full h-[23rem] object-cover rounded-lg"
                  alt={article.title}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="text-xl font-bold mb-2">{article.title}</h5>

                  <p>{article.description}</p>
                </div>
              </div>
            </>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-2">Latest News</h1>
      <hr className="mb-8" />
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
