import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";
import { logout, me } from "../api/auth";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // Get profile data
  const { data: profile } = useQuery(["profile"], () => me());

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {user ? (
              <Link to="/profile">
                <div className="flex">
                  <img
                    className="w-16 mr-2 rounded-full"
                    src={`https://coded-projects-api.herokuapp.com${profile?.image}`}
                    alt="Profile Image"
                  />
                  <span className="font-semibold text-xl text-white py-2">
                    {`Welcome, ${profile?.username}`}
                  </span>
                </div>
              </Link>
            ) : (
              <Link to="/">
                <span className="font-semibold text-xl text-white">F Bank</span>
              </Link>
            )}
          </div>
          <div className="block sm:hidden">
            <button
              onClick={toggleMenu}
              className="flex items-center px-3 py-2 border rounded text-gray-300 hover:text-white hover:border-white transition duration-300 ease-in-out"
            >
              <svg
                className={`h-4 w-4 fill-current transform ${
                  menuOpen ? "rotate-90" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M0 3.5C0 2.67 0.67 2 1.5 2H18.5C19.33 2 20 2.67 20 3.5C20 4.33 19.33 5 18.5 5H1.5C0.67 5 0 4.33 0 3.5ZM0 10.5C0 9.67 0.67 9 1.5 9H18.5C19.33 9 20 9.67 20 10.5C20 11.33 19.33 12 18.5 12H1.5C0.67 12 0 11.33 0 10.5ZM1.5 16C0.67 16 0 16.67 0 17.5C0 18.33 0.67 19 1.5 19H18.5C19.33 19 20 18.33 20 17.5C20 16.67 19.33 16 18.5 16H1.5Z" />
              </svg>
            </button>
          </div>
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } sm:flex sm:pt-2 pt-28  sm:pb-4 px-2 mr-[-2.15vh] sm:mr-0  sm:space-x-4 bg-gray-800 rounded-md transition duration-300 ease-in-out z-10`}
          >
            <NavLink
              exact
              to="/"
              activeClassName="bg-gray-900"
              className="block sm:inline-block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              onClick={closeMenu}
            >
              Home
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/profile"
                  activeClassName="bg-gray-900"
                  className="block sm:inline-block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={closeMenu}
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/users"
                  activeClassName="bg-gray-900"
                  className="block sm:inline-block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={closeMenu}
                >
                  Users
                </NavLink>
                <NavLink
                  onClick={() => {
                    logout();
                    setUser(false);
                    closeMenu();
                  }}
                  to="/login"
                  activeClassName="bg-gray-900"
                  className="block sm:inline-block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  activeClassName="bg-gray-900"
                  className="block sm:inline-block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  activeClassName="bg-gray-900"
                  className="block sm:inline-block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={closeMenu}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
