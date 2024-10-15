import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ article }) => {
  return (
    <Link
      to={`/news/${article.title}`}
      state={{ article }}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105"
    >
      <img
        src={article.urlToImage || "https://via.placeholder.com/300x200"}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
        <p className="text-gray-600 mb-4">
          {article.description?.slice(0, 100)}...
        </p>
      </div>
    </Link>
  );
};

export default NewsCard;
