import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function RightAside() {
  return (
    <div className="sticky top-24 space-y-4">
     
      <div className="bg-white rounded-2xl shadow-md p-4 border border-slate-100 text-center">
        <h3 className="font-semibold text-sky-700 text-lg">📬 Subscribe</h3>
        <p className="text-sm mt-2 text-slate-600">
          Get the latest news delivered weekly.
        </p>
        <div className="mt-3 flex flex-col  gap-2 justify-center w-full">
          <input
            className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
            placeholder="Your email"
          />
          <button className="px-4 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition">
            Join
          </button>
        </div>
      </div>

     
      <div className="bg-white rounded-2xl shadow-md p-4 border border-slate-100 text-center">
        <h3 className="font-semibold text-sky-700 text-lg">💡 Advertisement</h3>
        <div className="h-36 bg-gradient-to-br from-sky-50 to-indigo-50 rounded-xl mt-3 flex items-center justify-center text-sm text-slate-500">
          Ad Space
        </div>
      </div>

      
      
    </div>
  );
}

// SinglePostLayout
export default function SinglePostLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
     
      <Header />

     
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar user={{}} onSignOut={() => {}} />
      </div>


      <main className="flex-1 max-w-[1600px] mx-auto px-4 py-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
         
          <section className="md:col-span-9 order-1">
            <Outlet />
          </section>

         
          <aside className="md:col-span-3 order-2">
            <RightAside />
          </aside>
        </div>
      </main>


      <Footer />
    </div>
  );
}
