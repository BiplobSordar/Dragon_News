import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const getActionCodeSettings = (type) => ({
  url: `${window.location.origin}/${type === "verify" ? "verify-email" : "reset-password"}`,
  handleCodeInApp: true,
});

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/verify-email`,
        handleCodeInApp: true,
      });

      toast.success("Password reset email sent! Check your inbox.");
      setEmail("");
      navigate("/login");
    } catch (error) {
      console.error("Reset error:", error);
      if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Please enter a valid email address.");
      } else {
        toast.error("Something went wrong. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-sky-700 mb-4">
          Reset Your Password
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your email and we’ll send you a password reset link.
        </p>

        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition text-sm sm:text-base"
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
                <span>Sending...</span>
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-600 text-sm sm:text-base">
          Remembered your password?{" "}
          <span
            onClick={() => navigate("/auth/login")}
            className="text-sky-600 hover:text-indigo-700 font-medium cursor-pointer"
          >
            Go back to Login
          </span>
        </p>

        <p className="mt-4 text-center text-slate-600 text-sm sm:text-base">
          Go to{" "}
          <span
            onClick={() => navigate("/")}
            className="text-sky-600 hover:text-indigo-700 font-medium cursor-pointer"
          >
            Home
          </span>
        </p>
      </div>
    </div>
  );
}
