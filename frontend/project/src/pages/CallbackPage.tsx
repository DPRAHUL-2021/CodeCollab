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

  return <div className="flex items-center justify-center">Loading....</div>;
}
