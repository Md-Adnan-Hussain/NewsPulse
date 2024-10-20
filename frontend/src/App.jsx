import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import NewsDetails from "./components/NewsDetails";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/news/:id" element={<NewsDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
