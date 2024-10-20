import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NewsDetails = () => {
  const location = useLocation();
  const { article } = location.state || {};
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();

  const handleReadFullArticle = () => {
    setShowOverlay(true);
    setTimeout(() => {
      window.open(article.url, "_blank");
      setShowOverlay(false);
    }, 2000);
  };

  if (!article) {
    return <div className="text-center mt-8">Article not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto relative">
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-50 transition-opacity duration-300">
          <div className="text-white text-lg mb-4">
            Redirecting to the full article...
          </div>
          <div className="loader">
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <img
        src={article.urlToImage || "https://via.placeholder.com/800x400"}
        alt={article.title}
        className="w-full h-64 object-cover mb-4 rounded-lg"
      />
      <p className="text-gray-600 mb-4">{article.description}</p>
      <p className="mb-4">{article.content}</p>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Published at: {new Date(article.publishedAt).toLocaleString()}
        </p>
        <button
          onClick={handleReadFullArticle}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
        >
          Read Full Article
        </button>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="block mt-8 text-blue-600 hover:underline"
      >
        ← Back
      </button>
    </div>
  );
};

export default NewsDetails;
