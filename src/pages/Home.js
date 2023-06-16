import React from "react";
import ProfileCard from "../component/ProfileCard";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90.7vh] xl:min-h-screen bg-gradient-to-r from-blue-400 to-indigo-400 text-white">
      <header className="text-4xl font-bold mb-8 ">Welcome to F Bank</header>
      <section className="max-w-2xl bg-white p-8   text-white bg-gradient-to-br from-indigo-600  mb-2 to-blue-600 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Secure Online Banking</h2>
        <p className="mb-4">
          Manage your finances conveniently and securely with F's online banking
          services.
        </p>
        {/* <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Sign In
        </button> */}
      </section>
    </div>
  );
};

export default Home;
