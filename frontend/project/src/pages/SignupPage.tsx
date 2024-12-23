import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { User, Mail } from "lucide-react";
import axios from "axios";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [batch, setBatch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!rollNumber || !email) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        {
          rollNumber: rollNumber,
          batch: batch,
          contactInfo: contactInfo,
          githubId: localStorage.getItem("githubId"),
          email: email,
        }
      );
      console.log(response.data);
      if (response.data.statusCode === 200) {
        navigate("/login");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 flex justify-center items-center px-4 py-8">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      {/* Form Container */}
      <div className="w-full max-w-lg bg-gray-800 shadow-lg rounded-xl p-8 mx-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-center text-gray-100 mb-6">
              Create Your Account
            </h2>

            {error && (
              <div className="mb-4 p-4 bg-red-600 text-red-100 rounded-md text-sm flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}

            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-400 mb-2"
                htmlFor="rollNumber"
              >
                Roll Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="w-full py-3 pl-10 pr-4 border border-gray-600 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="rollNumber"
                  type="text"
                  placeholder="Your Roll Number"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-400 mb-2"
                htmlFor="batch"
              >
                Batch
              </label>
              <input
                className="w-full py-3 pl-4 pr-4 border border-gray-600 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="batch"
                type="text"
                placeholder="Batch (e.g., 20XX-20XX)"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-400 mb-2"
                htmlFor="contactInfo"
              >
                Contact Info
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="w-full py-3 pl-10 pr-4 border border-gray-600 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="contactInfo"
                  type="text"
                  placeholder="Contact Info (e.g., 91XXXXXXXX)"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-400 mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="w-full py-3 pl-10 pr-4 border border-gray-600 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isLoading ? "Loading..." : "Sign Up"}
              </button>
            </div>

            <div className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <a href="/login" className="text-blue-400 hover:underline">
                Log in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
