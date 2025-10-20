import React from "react";
import { FaShareAlt, FaRegBookmark, FaStar, FaEye } from "react-icons/fa";
import { format } from "date-fns";

export default function NewsCard({ news }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition my-5">


      {news.image_url && (
        <img
          src={news.image_url}
          alt={news.title}
          className="w-full h-64 md:h-80 object-cover"
        />
      )}

      <div className="p-5 space-y-3">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={news.author.img}
              alt={news.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sky-700">{news.author.name}</p>
              <p className="text-xs text-gray-400">
                {format(new Date(news.author.published_date), "PPP")}
              </p>
            </div>
          </div>
          <div className="flex gap-3 text-gray-500 text-lg cursor-pointer">
            <FaShareAlt className="hover:text-sky-600 transition" />
            <FaRegBookmark className="hover:text-sky-600 transition" />
          </div>
        </div>


        <div>
          <h3 className="text-[20px] font-semibold  md:text-2xl md:font-bold text-gray-800 hover:text-sky-700 transition">
            {news.title}
          </h3>
          <p className="text-gray-600 text-sm md:text-base mt-2 line-clamp-4">
            {news.details}
          </p>
        </div>


        <div className="flex flex-wrap gap-2 mt-3">
          {news.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-sky-50 text-sky-700 rounded-full text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>


        <div className="flex justify-between items-center mt-4 text-gray-500 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-400" /> {news.rating.number}{" "}
            {news.rating.badge && (
              <span className="ml-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {news.rating.badge}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <FaEye /> {news.total_view} views
          </div>
        </div>
      </div>
    </div>
  );
}
