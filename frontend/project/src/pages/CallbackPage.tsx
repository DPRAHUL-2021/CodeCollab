import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function CallbackPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const finishLogin = async (authCode: any) => {
    try {
      console.log("Sending code to backend:", authCode);
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/callback",
        { code: authCode },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.statusCode === 201) {
        localStorage.setItem("githubId", response.data.data.githubId);
        navigate("/signup");
      }
      if (response.data.statusCode === 200) {
        navigate("/");
      }
      console.log("Response from backend:", response.data);
    } catch (error: any) {
      console.error("Error during login:", error.response || error.message);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
    if (code) {
      finishLogin(code);
    }
  }, [location.search]);

  return (
    <div className="relative min-h-screen bg-gray-900 flex flex-col justify-center items-center px-6 py-12">
      {/* Form Container */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-gray-800 bg-opacity-80 shadow-xl rounded-3xl px-10 py-8 mb-6 max-w-lg">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-100">
            Processing...
          </h2>
          <p className="text-center text-sm text-gray-400">
            We're authenticating your account. Please wait while we set things up for you.
          </p>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
    </div>
  );
}
