import React, { useEffect, useState } from "react";
import { confirmPasswordReset, getAuth } from "firebase/auth";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const oobCode = searchParams.get("oobCode");
    if (!oobCode) {
      setMessage("Invalid or expired reset link.");
    }
  }, [searchParams]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const oobCode = searchParams.get("oobCode");
    if (!oobCode) {
      toast.error("Invalid or expired reset link.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      toast.success("Password has been reset successfully!");
      setMessage("Password reset successful!");
      navigate("/login");
    } catch (error) {
      console.error("Reset error:", error);
      toast.error("Reset failed. Link may have expired.");
      setMessage("Reset failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-sky-700 mb-4">
          Reset Your Password
        </h2>

        {message && (
          <p className="text-center text-slate-600 font-medium mb-4">{message}</p>
        )}

        <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition text-sm sm:text-base"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition text-sm sm:text-base"
          />
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 to-indigo-600 text-white py-3 rounded-xl font-semibold text-sm sm:text-base transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Resetting...</span>
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-600 text-sm sm:text-base">
          Remembered your password?{" "}
          <span
            onClick={() => navigate("/login")}
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
