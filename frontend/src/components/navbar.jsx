import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-extrabold tracking-wide">
          Acowale News
        </div>

        <div className="space-x-8">
          <NavLink
            to="/"
            exact
            className="hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105"
            activeClassName="border-b-2 border-yellow-300"
          >
            Home
          </NavLink>

          <NavLink
            to="/search"
            className="hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105"
            activeClassName="border-b-2 border-yellow-300"
          >
            Search
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
