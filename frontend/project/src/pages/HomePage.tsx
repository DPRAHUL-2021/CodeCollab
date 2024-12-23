import React from "react";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Main Layout */}
      <div className="flex min-h-screen">
        {/* Left Side (CodeCollab text) */}
        <div className="w-1/3 bg-gray-800 bg-opacity-80 flex items-center justify-center">
          <h1 className="text-white text-6xl font-extrabold shadow-lg">
            CodeCollab
          </h1>
        </div>

        {/* Right Side (Login/Signup Buttons) */}
        <div className="w-2/3 bg-gray-900 bg-opacity-90 flex flex-col items-center justify-center px-8 py-12 relative z-10">
          <h2 className="text-4xl text-white mb-6 font-bold">
            Welcome to CodeCollab
          </h2>
          <p className="text-gray-400 text-center mb-8 max-w-lg">
            The ultimate platform for code collaboration and project sharing.
          </p>
          <div className="flex flex-col gap-6 w-full max-w-xs">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Background Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-5 z-0"></div>
    </div>
  );
}
