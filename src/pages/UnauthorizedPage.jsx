import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  const { role } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md text-center">
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">Unauthorized</h1>
        <p className="text-gray-700 text-lg mb-3">
          You are a <span className="font-semibold text-red-600">{role || "unknown"}</span>. This page is forbidden for you.
        </p>
        <p className="text-gray-600 mb-6">
          You do not have permission to access this page.
        </p>
        <button
          onClick={() => navigate(`/${role}-dashboard`)}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition text-sm sm:text-base"
        >
          Go Back to Dashboard
        </button>
      </div>
    </div>
  );
}
