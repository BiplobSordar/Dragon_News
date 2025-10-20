import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { applyActionCode, getAuth } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

export default function AuthAction() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Processing...");
  const auth = getAuth();
  const { logout } = useAuth();

  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    if (!mode || !oobCode) {
      setStatus("Invalid or missing parameters.");
      return;
    }

    const handleAction = async () => {
      try {
        if (mode === "verifyEmail") {
          // Verify email
          await applyActionCode(auth, oobCode);
          await logout();
          setStatus("Email verified successfully! Redirecting to login...");
          setTimeout(() => navigate("/auth/login"), 1500);
        } else if (mode === "resetPassword") {
          // Navigate to reset password page with oobCode
          navigate(`/auth/reset-password?oobCode=${oobCode}`);
        } else {
          setStatus("Unknown action mode.");
        }
      } catch (error) {
        console.error("Auth action error:", error);
        setStatus(
          "Something went wrong. The link may be expired or invalid."
        );
      }
    };

    handleAction();
  }, [mode, oobCode, navigate, auth, logout]);

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-extrabold text-sky-700 mb-4">
          Authentication Action
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">{status}</p>
      </div>
    </div>
  );
}
