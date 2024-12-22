import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, AlertCircle } from "lucide-react";
import axios from "axios";

export function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  console.log(import.meta.env.FRONTEND_URL);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      //Api logic
      window.location.href = "http://localhost:3000/api/v1/user/login";
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <button onClick={handleSubmit}>Sign in with github</button>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading..</p>}
    </div>
  );
}
