import React, { useState } from 'react';
import axios from 'axios';
import languagesAndCountries from '../languagesAndCountries.json'; 
import Navbar from './navbar';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [language, setLanguage] = useState('Any');
  const [country, setCountry] = useState('Any');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e, newPage = 1) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`http://localhost:7000/search`, 
        { 
          parameter: searchTerm, 
          page: newPage, 
          language: language, 
          country: country 
        }, 
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setArticles(response.data.articles);
      setTotalPages(response.data.totalArticles);
      setPage(newPage);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Unable to fetch articles. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-6">
          <form onSubmit={(e) => handleSearch(e, 1)} className="mb-8">
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-teal-400"
            />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <select 
                value={country} 
                onChange={(e) => setCountry(e.target.value)} 
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-teal-400"
              >
                <option value="Any">Any Country</option>
                {languagesAndCountries.countries.map((cnt) => (
                  <option key={cnt.code} value={cnt.code}>
                    {cnt.name}
                  </option>
                ))}
              </select>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)} 
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-teal-400"
              >
                <option value="Any">Any Language</option>
                {languagesAndCountries.languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <button 
              type="submit" 
              className={`bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-3 rounded-lg mt-4 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {error && <div className="text-center text-red-600 mb-4">{error}</div>}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src={article.image || '/default-image.jpg'} 
                    alt={article.title} 
                    className="w-full h-48 object-cover rounded-md mb-4" 
                  />
                  <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                  <p className="text-gray-600 text-sm mb-4">{article.description}</p>
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="to-blue-400 hover:underline"
                  >
                    Read More
                  </a>
                </div>
              ))
            ) : (
              !loading && <div className="text-center text-gray-600">No articles found.</div>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center items-center space-x-4">
            <button
              disabled={page === 1 || loading}
              onClick={(e) => handleSearch(e, page - 1)}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-2 rounded-lg"
              aria-label="Previous page"
            >
              Previous
            </button>
            <span>{page} / {totalPages}</span>
            <button
              disabled={page === totalPages || loading}
              onClick={(e) => handleSearch(e, page + 1)}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-2 rounded-lg"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
