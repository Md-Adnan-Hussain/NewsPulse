import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">NewsPulse</Link>
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-l-md text-gray-800 focus:outline-none"
          />
          <button type="submit" className="bg-blue-500 px-4 py-2 rounded-r-md hover:bg-blue-400">
            <Search size={20} />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;