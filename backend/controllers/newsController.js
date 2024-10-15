import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_BASE_URL = "https://newsapi.org/v2";

const filterArticles = (articles, len) => {
  const filtered = articles.filter((article) => {
    return (
      article.source.name !== "[Removed]" &&
      article.title !== "[Removed]" &&
      article.description !== "[Removed]" &&
      article.url !== "https://removed.com" &&
      article.content !== "[Removed]" &&
      article.urlToImage !== null
    );
  });

  return len ? filtered.slice(0, len) : filtered;
};

export const getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
      params: {
        country: "us",
        category,
        apiKey: NEWS_API_KEY,
      },
    });

    const validArticles = filterArticles(response.data.articles, 9);
    res.json(validArticles);
  } catch (error) {
    console.error("Error fetching news by category:", error);
    res.status(500).json({ message: "Error fetching news" });
  }
};

export const searchNews = async (req, res) => {
  try {
    const { q } = req.query;
    const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
      params: {
        q,
        apiKey: NEWS_API_KEY,
      },
    });

    const validArticles = filterArticles(response.data.articles);
    res.json(validArticles);
  } catch (error) {
    console.error("Error searching news:", error);
    res.status(500).json({ message: "Error searching news" });
  }
};
