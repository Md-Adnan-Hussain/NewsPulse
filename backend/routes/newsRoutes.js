import express from "express";
import {
  getNewsByCategory,
  searchNews,
} from "../controllers/newsController.js";

const router = express.Router();

router.get("/category/:category", getNewsByCategory);
router.get("/search", searchNews);

export default router;
