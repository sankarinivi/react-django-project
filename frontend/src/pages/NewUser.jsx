import React from "react";
import { Link } from "react-router-dom";

const NewUser = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-xl text-center">

        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          New User Registration
        </h1>

        <p className="text-gray-600 mb-6">
          This is the New User page.
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700"
        >
          Back to Login
        </Link>

      </div>

    </div>
  );
};

export default NewUser;