import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    window.location.href = "http://localhost:3000/api/v1/user/login";
  };

  return (
    <div className="relative min-h-screen bg-gray-900 flex flex-col justify-center items-center px-6 py-12">
     

      {/* Form Container */}
      <div className="w-full max-w-md relative z-10">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 bg-opacity-80 shadow-xl rounded-3xl px-10 py-8 mb-6 max-w-lg"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-100">
            Sign in to your account
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-500 text-white rounded-xl text-sm flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
              <button
                onClick={() => setError("")}
                className="text-white text-lg font-semibold"
              >
                ×
              </button>
            </div>
          )}

          <div className="mb-8">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-5 rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300 transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex justify-center items-center space-x-2">
                  <div className="w-4 h-4 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                "Sign in with GitHub"
              )}
            </button>
          </div>

          <p className="text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            {/* Use Link to navigate to the signup page */}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-500 transition duration-300"
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
    </div>
  );
}
