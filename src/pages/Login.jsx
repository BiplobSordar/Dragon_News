import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import googleIconImage from "../assets/google.png";

export default function Login() {
  const { login, loginWithGoogle, loginWithGithub, role, user, loading: contextLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();


  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await login(email, password);
      const currentUser = userCredential.user;

      // Force reload user to get latest emailVerified status
      await currentUser.reload();

      if (!currentUser.emailVerified) {
        toast.warning("Please verify your email before logging in.");
        setLoading(false);
        return;
      }

      toast.success(`Logged In Successfully!`);
      navigate('/category/0')
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

const handleGoogleLogin = async () => {
    try {
      const userCredential = await loginWithGoogle();
      const currentUser = userCredential.user;
      await currentUser.reload();
      toast.success("Logged In Successfully!");
    } catch (err) {
      setError(err.message);
      toast.error("Google login failed.");
    }
  };

  const handleGithubLogin = async () => {
    try {
      const userCredential = await loginWithGithub();
      const currentUser = userCredential.user;
      await currentUser.reload();
      toast.success("Logged In Successfully!");
    } catch (err) {
      setError(err.message);
      toast.error("GitHub login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 text-sky-700">
          Welcome Back
        </h2>

        {error && (
          <div className="mb-4 text-red-600 font-medium text-center">{error}</div>
        )}

        <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            className="border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition text-sm sm:text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition text-sm sm:text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 to-indigo-600 text-white py-3 rounded-xl font-semibold transition text-sm sm:text-base ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Logging in...</span>
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="my-6 flex items-center justify-center gap-2 text-gray-400">
          <span className="flex-grow border-t border-gray-300"></span>
          <span className="px-2 text-xs sm:text-sm">or continue with</span>
          <span className="flex-grow border-t border-gray-300"></span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            onClick={handleGoogleLogin}
            className="flex-1 flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-red-500 hover:text-white transition font-medium text-sm sm:text-base"
          >
            <img src={googleIconImage} alt="Google" className="w-5 h-5 sm:w-6 sm:h-6" />
            Google
          </button>

          <button
            onClick={handleGithubLogin}
            className="flex-1 flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-900 hover:text-white transition font-medium text-sm sm:text-base"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              alt="GitHub"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
            GitHub
          </button>
        </div>

        <p className="mt-6 text-center text-slate-600 text-sm sm:text-base">
          Don't have an account?{" "}
          <span
            className="text-sky-600 hover:text-indigo-700 font-medium cursor-pointer"
            onClick={() => navigate("/auth/signup")}
          >
            Sign Up
          </span>
        </p>

        <p className="mt-4 text-center text-slate-600 text-sm sm:text-base">
          Forgot Password?{" "}
          <span
            className="text-red-600 hover:text-indigo-700 font-medium cursor-pointer"
            onClick={() => navigate("/auth/forgot-password")}
          >
            Reset
          </span>
        </p>

        <p className="mt-4 text-center text-slate-600 text-sm sm:text-base">
          Go to{" "}
          <span
            className="text-sky-600 hover:text-indigo-700 font-medium cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </span>
        </p>
      </div>
    </div>
  );
}
