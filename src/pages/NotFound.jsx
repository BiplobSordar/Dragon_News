import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="h-full flex flex-col justify-center items-center  px-4 text-center">
      <Search className="w-16 h-16 text-sky-500 mb-6 animate-bounce" />
      <h1 className="text-4xl font-bold text-slate-800 mb-4">404 - Page Not Found</h1>
      <p className="text-slate-600 mb-6">
        The page you are looking for does not exist.
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
