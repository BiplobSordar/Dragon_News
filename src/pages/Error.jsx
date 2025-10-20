import React from "react";
import { Link, useRouteError } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="h-full flex flex-col justify-center items-center bg-slate-50 px-4 text-center">
      <AlertCircle className="w-16 h-16 text-red-500 mb-6 animate-pulse" />
      <h1 className="text-4xl font-bold text-slate-800 mb-4">Something went wrong</h1>
      <p className="text-slate-600 mb-6">
        {error?.statusText || error?.message || "An unexpected error occurred."}
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
