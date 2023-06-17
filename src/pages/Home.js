import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen md:min-h-[90.7vh] bg-gradient-to-r from-blue-400 to-indigo-400 text-white xl:min-h-[95vh] ">
      <header className="text-xl mt-[-20vh] md:mt-0 md:text-4xl font-bold mb-8">
        Welcome to F Bank
      </header>
      <div>
        <section className="max-w-2xl  bg-white p-8 mx-8 md:mx-0  text-white bg-gradient-to-br from-indigo-600  mb-6 to-blue-600 rounded-lg shadow-xl">
          <h2 className="md:text-2xl font-bold mb-4">Secure Online Banking</h2>
          <p className="md:mb-4">
            Manage your finances conveniently and securely with F's online
            banking services.
          </p>
          {/* <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Sign In
        </button> */}
        </section>
        <section className="max-w-2xl bg-white p-6 mx-8 md:mx-0 text-white bg-gradient-to-br from-indigo-600  mb-2 to-blue-600 rounded-lg shadow-xl">
          <h2 className="md:text-2xl font-bold mb-4">
            Elevate Your Financial Management Experience
          </h2>
          <p className="md:mb-4">
            With F's Secure Online Banking, offering convenient and reliable
            ways to oversee your finances.
          </p>
          {/* <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Sign In
        </button> */}
        </section>
      </div>
    </div>
  );
};

export default Home;
