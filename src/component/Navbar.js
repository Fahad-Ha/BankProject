import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";
import { logout, me } from "../api/auth";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  // Get profile data
  const { data: profile } = useQuery(["profile"], () => me());

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
          <div className="block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink
                to="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </NavLink>

              {user ? (
                <>
                  <NavLink
                    to="/profile"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/users"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Users
                  </NavLink>
                  <NavLink
                    onClick={() => {
                      logout();
                      setUser(false);
                    }}
                    to="/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
