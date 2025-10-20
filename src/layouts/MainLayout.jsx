
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import googleIconImage from '../assets/google.png';
import { FaGithub, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { format } from "date-fns";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import Loader from "../components/Loader";
import { useNews } from "../hooks/useNews";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";



// LeftAside


const categories = ["World", "Politics", "Business", "Tech", "Sport"];

const sportNews = [
  {
    id: 1,
    title: "Champions League Highlights",
    category: "Sport",
    date: new Date(),
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Local Football League Results",
    category: "Sport",
    date: new Date(),
    image: "https://via.placeholder.com/150",
  },
];

function Badge({ children }) {
  return (
    <span className="px-2 py-1 bg-sky-50 text-sky-700 rounded-full text-xs font-medium">
      {children}
    </span>
  );
}

function LeftAside() {
  const {
    categories,
    newsLoading,
    categoriesLoading,
    getSportNews,

  } = useNews()
  return (
    <div className="sticky w-full top-20 space-y-6">

      <div className="bg-white rounded-2xl shadow-md p-4 border border-slate-100 text-center">
        <h3 className="font-semibold text-sky-700 text-lg mb-3">📂 Categories</h3>
        {categoriesLoading ? <div className="flex w-full flex-wrap gap-2"> <Loader /> </div> : <div className="flex w-full flex-wrap gap-2">
          {categories.map((cat) => (
            <NavLink
              key={cat.id}
              to={`/category/${cat?.id}`}
              className={({ isActive }) =>
                `py-2 rounded-xl font-medium transition   max-w-fit px-2 ${isActive
                  ? "bg-sky-600 text-white"
                  : "bg-sky-50 text-sky-700 hover:bg-sky-100"
                }`
              }
            >
              {cat?.name}
            </NavLink>
          ))}
        </div>}

      </div>


      <div className="bg-white rounded-2xl shadow-md p-4 border border-slate-100 h-[600px] flex flex-col">
      {/* Heading stays fixed */}
      <h3 className="font-semibold text-sky-700 text-lg mb-3 shrink-0">
        ⚽ Sport News
      </h3>

      {/* Scrollable container for cards */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {newsLoading ? (
          <Loader />
        ) : (
          getSportNews()?.map((news) => (
            <Link to={`/news/${news?.id}`}>
            <div
              key={news.id}
              className="bg-sky-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
          
              <img
                src={news.image_url || news.thumbnail_url}
                alt={news.title}
                className="w-full h-48 object-cover"
              />

            
              <div className="p-4 space-y-2">
                <h4 className="font-semibold text-sky-700 text-base md:text-lg">
                  {news.title}
                </h4>

                <div className="flex items-center justify-between text-slate-500 text-xs md:text-sm">
                  <span>{news.author?.name}</span>
                  <span>
                    {format(new Date(news.author?.published_date), "PPP")}
                  </span>
                </div>

                <p className="text-sky-700 text-sm">
                  Category: {news.category_id}
                </p>

                <div className="flex items-center gap-3 text-slate-500 text-xs">
                  <span>Views: {news.total_view}</span>
                  {news.rating?.badge && (
                    <span className="px-2 py-1 bg-sky-100 text-sky-700 rounded-full font-medium">
                      {news.rating.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {news.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            </Link>
          ))
        )}
      </div>
    </div>

    </div>
  );
}



const socialLinks = [
  { name: "Facebook", icon: <FaFacebook />, url: "https://facebook.com" },
  { name: "Twitter", icon: <FaTwitter />, url: "https://twitter.com" },
  { name: "Instagram", icon: <FaInstagram />, url: "https://instagram.com" },
];

const quizData = [
  {
    id: 1,
    title: "JavaScript Basics Quiz",
    description: "Test your JavaScript fundamentals.",
  },
  {
    id: 2,
    title: "HTML & CSS Quiz",
    description: "Check your web design knowledge.",
  },
];

function RightAside() {
  const navigate = useNavigate();
  const { user, loginWithGoogle, loginWithGithub, } = useAuth()

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await loginWithGoogle()
      const currentUser = userCredential.user;
      await currentUser.reload();
      toast.success("Logged In Successfully!");
    } catch (err) {

      toast.error("Google login failed.");
    }
  }
  const handleGithubLogin = async () => {
    try {
      const userCredential = await loginWithGithub();
      const currentUser = userCredential.user;
      await currentUser.reload();
      toast.success("Logged In Successfully!");
    } catch (err) {

      toast.error("GitHub login failed.");
      console.log(err)
    }
  };

  return (
    <div className="sticky top-20 w-full space-y-6">


      {!user && <div className="bg-white rounded-2xl shadow-md p-4 border border-slate-100 text-center">
        <h3 className="font-semibold text-sky-700 text-lg mb-3">🔑 Login to Access More</h3>
        <p className="text-sm text-slate-600 mb-3">Sign in to personalize your experience</p>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-xl hover:bg-red-500 hover:text-white transition font-medium"
          >
            <img src={googleIconImage} alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
          <button
            onClick={handleGithubLogin}
            className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-xl hover:bg-gray-900 hover:text-white transition font-medium"
          >
            <FaGithub className="w-5 h-5" />
            Continue with GitHub
          </button>
        </div>
      </div>}


      <div className="bg-white rounded-2xl shadow-md p-4 border border-slate-100 text-center">
        <h3 className="font-semibold text-sky-700 text-lg mb-3">🌐 Find Us On</h3>
        <div className="flex flex-col gap-2 items-center">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-1 px-3 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 w-full justify-center"
            >
              {social.icon} {social.name}
            </a>
          ))}
        </div>
      </div>


      <div className="bg-white rounded-2xl shadow-md p-4 border border-slate-100 text-center">
        <h3 className="font-semibold text-sky-700 text-lg mb-3">📝 Quiz</h3>
        <div className="flex flex-col gap-3">
          {quizData.map((quiz) => (
            <div key={quiz.id} className="bg-sky-50 rounded-xl p-4 text-left shadow-sm">
              <h4 className="font-semibold text-sky-700 mb-1">{quiz.title}</h4>
              <p className="text-slate-600 text-sm">{quiz.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default function MainLayout() {
  const headerNavbarFooterHeight = 200;

  return (
    <div className="flex flex-col min-h-screen w-full  bg-slate-50">

      <Header />


      <div className="sticky top-0 z-50">
        <Navbar user={{}} onSignOut={() => { }} />
      </div>


      <main className="flex-1 max-w-[1600px] mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-200px)]">

        <aside className="md:col-span-3 hidden md:block">

          <div className="sticky top-24 h-[calc(100vh-200px)] w-full overflow-hidden">
            <LeftAside />
          </div>
        </aside>


        <section className="md:col-span-6 w-full overflow-y-auto pr-2">
          <Outlet />
        </section>


        <aside className="md:col-span-3 w-full hidden md:block">
          <div className="sticky top-24 h-[calc(100vh-200px)] overflow-hidden">
            <RightAside />
          </div>
        </aside>
      </main>


      <Footer />
    </div>
  );
}