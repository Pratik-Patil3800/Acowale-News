import React, { useEffect, useState } from 'react';
import languagesAndCountries from '../languagesAndCountries.json';
import Navbar from './navbar';
import axios from 'axios';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [language, setLanguage] = useState('Any');
  const [country, setCountry] = useState('Any');
  const [category, setCategory] = useState('general');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopHeadlines = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(`http://localhost:7000/home`, 
          { 
            category: category,
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
        if (response.data && response.data.articles) {
          setArticles(response.data.articles);
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Unable to fetch articles. Please try again later.');
      }
      setLoading(false);
    };

    fetchTopHeadlines();
  }, [language, country, category]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="general">General</option>
              <option value="world">World</option>
              <option value="nation">Nation</option>
              <option value="business">Business</option>
              <option value="technology">Technology</option>
              <option value="entertainment">Entertainment</option>
              <option value="sports">Sports</option>
              <option value="science">Science</option>
              <option value="health">Health</option>
            </select>

            <select 
              value={country} 
              onChange={(e) => setCountry(e.target.value)} 
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
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
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="Any">Any Language</option>
              {languagesAndCountries.languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="text-center text-blue-600">Loading articles...</div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : articles.length === 0 ? (
            <div className="text-center text-gray-600">No articles available.</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <img 
                    src={article.image || '/default-image.jpg'} 
                    alt={article.title} 
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {article.description || 'No description available.'}
                  </p>
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:underline"
                  >
                    Read More
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
