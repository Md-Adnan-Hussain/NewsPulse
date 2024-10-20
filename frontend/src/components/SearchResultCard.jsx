import React from "react";
import { Link } from "react-router-dom";

const SearchResultCard = ({ article }) => {
  return (
    <Link to={`/news/${article.title}`} state={{ article }} className="block">
      <div className="flex transition-transform transform duration-300 overflow-hidden rounded-lg hover:scale-105 hover:shadow-lg hover:border">
        <div className="w-3/12">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-56 object-cover rounded-sm"
          />
        </div>
        <div className="flex flex-col justify-between w-9/12 pl-4 py-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600">{article.description}</p>
          </div>
          <p className="text-sm text-gray-500">{article.publishedAt}</p>
        </div>
      </div>
      <hr className="my-4" />
    </Link>
  );
};

export default SearchResultCard;
