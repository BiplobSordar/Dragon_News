import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNews } from "../hooks/useNews";
import {
  FaStar,
  FaEye,
  FaTag,
  FaArrowLeft,
  FaCalendarAlt,
  FaUser,
  FaHashtag,
} from "react-icons/fa";

const SingleNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getNewsById } = useNews();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const newsItem = getNewsById(id);
      setPost(newsItem || null);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timeout);
  }, [id, getNewsById]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-80">
        <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!post)
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] text-center">
        <h2 className="text-3xl font-semibold text-gray-700 mb-2">
          Post Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          The news you’re looking for doesn’t exist or was removed.
        </p>
        <button
          onClick={() => navigate("/news")}
          className="px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
        >
          <FaArrowLeft className="inline-block mr-2" /> Go Back to All News
        </button>
      </div>
    );

  const {
    title,
    author,
    image_url,
    thumbnail_url,
    details,
    tags,
    rating,
    total_view,
    category_id,
    id: newsId,
    others,
    production,
  } = post;

  return (
    <article className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden p-6 mb-10 max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <FaUser className="text-sky-500" />
            <span>{author?.name || "Unknown Author"}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-sky-500" />
            <span>
              {new Date(author?.published_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FaHashtag className="text-sky-500" /> <span>ID: {newsId}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaHashtag className="text-sky-500" />{" "}
            <span>Category ID: {category_id}</span>
          </div>
        </div>
      </header>

      {/* Author Section */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={author?.img}
          alt={author?.name}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-sky-700">{author?.name}</p>
          <p className="text-xs text-gray-400">
            {new Date(author?.published_date).toLocaleString()}
          </p>
        </div>
      </div>

    

      {/* Main Image */}
      {image_url && (
        <img
          src={image_url}
          alt={title}
          className="w-full h-96 object-cover rounded-xl mb-6"
        />
      )}

      {/* Details */}
      <section className="text-gray-700 leading-relaxed mb-6">
        <p>{details}</p>
      </section>

      {/* Tags */}
      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-sky-50 text-sky-700 text-sm rounded-full border border-sky-200"
            >
              <FaTag className="text-sky-600" /> {tag}
            </span>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="flex flex-wrap justify-between items-center border-t border-slate-200 pt-4 text-gray-600 text-sm mb-4">
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-400" /> Rating: {rating?.number || "N/A"}
          {rating?.badge && (
            <span className="ml-2 px-2 py-0.5 bg-sky-100 text-sky-600 text-xs rounded-full">
              {rating.badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <FaEye /> Total Views: {total_view?.toLocaleString()}
        </div>
      </div>

      {/* Additional Flags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {others?.is_trending && (
          <span className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-600 rounded-full">
            🔥 Trending
          </span>
        )}
        {others?.is_today_pick && (
          <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-600 rounded-full">
            🌟 Today’s Pick
          </span>
        )}
        {production && (
          <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-600 rounded-full">
            ✅ Production: True
          </span>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 pt-4 text-sm text-gray-500">
        <p>
          <strong>ID:</strong> {newsId}
        </p>
        <p>
          <strong>Category ID:</strong> {category_id}
        </p>
        <p>
          <strong>Production:</strong> {production ? "Yes" : "No"}
        </p>
      </footer>
    </article>
  );
};

export default SingleNews;
