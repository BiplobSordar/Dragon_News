import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendEmailVerification } from "firebase/auth";

export default function Signup() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const user = await signup(email, password);

      await sendEmailVerification(user?.user, {
        url: "http://localhost:5173/login",
        handleCodeInApp: true,
      });

      toast.success(
        "Registration successful! Please check your email to verify your account."
      );

      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error("SignUp Error: " + err.message);
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 text-sky-700">
          Create Your Account
        </h2>

        {error && (
          <div className="mb-4 text-red-600 font-medium text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                <span>Signing Up...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-600 text-sm sm:text-base">
          Already have an account?{" "}
          <span
            className="text-sky-600 hover:text-indigo-700 font-medium cursor-pointer"
            onClick={() => navigate("/auth/login")}
          >
            Log In
          </span>
        </p>

       < p className="mt-4 text-center text-slate-600 text-sm sm:text-base">
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
