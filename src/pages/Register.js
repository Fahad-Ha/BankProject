import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import ErrorMsg from "../component/ErrorMsg";

const Register = () => {
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useContext(UserContext);
  const [errorMsgName, setErrorMsgName] = useState(false);
  const [errorMsgPass, setErrorMsgPass] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.files[0] });
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };
  const { mutate: registerFn, isError: errorMsgValue } = useMutation({
    mutationFn: () => register(userInfo),
    onSuccess: () => {
      if (localStorage.getItem("token")) {
        setUser(true);
        navigate("/");
      } else {
        if (errorMsgPass == true) {
          setErrorMsgName(false);
        } else {
          setErrorMsgName(true);
        }
      }
    },
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();

    //Check for password to to be 8 char and on capital and lower case char
    const passwordPattern = /[a-zA-Z0-9]{8,30}/;
    const isPasswordValid = passwordPattern.test(userInfo.password);

    if (!isPasswordValid) {
      setErrorMsgPass(true);
      return;
    } else {
      setErrorMsgPass(false);
    }
    // Add register logic here
    registerFn();
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-indigo-400 min-h-screen flex items-center justify-center absolute inset-0 z-[-1] ">
      <div className="max-w-md w-full px-6 py-8 bg-gradient-to-br from-indigo-600  mb-2 to-blue-600 rounded-lg p-6 shadow-2xl mx-6 md:mx-0">
        <h2 className="text-2xl md:text-3xl text-white font-semibold mb-6">
          Register
        </h2>
        <form onSubmit={handleFormSubmit}>
          {errorMsgName && (
            <ErrorMsg
              msg={"Username already exists, please use another username."}
            />
          )}
          {errorMsgPass && (
            <>
              <ErrorMsg
                msg={
                  "Password must at least 8 digits with a combination of numbers and letters."
                }
              />
            </>
          )}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-white text-sm font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="username"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>
          <div className="mb-4"></div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-white text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-white text-sm font-medium mb-2"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-00 text-white"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md  transition-colors"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
