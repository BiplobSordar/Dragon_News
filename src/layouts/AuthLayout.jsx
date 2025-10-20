import React from "react";
import { Outlet, NavLink } from "react-router-dom";


export default function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-slate-50">
     <div className="hidden md:flex bg-gradient-to-br from-sky-700 via-blue-800 to-indigo-900 text-white items-center justify-center relative overflow-hidden">
 
  <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />


  <div className="relative z-10 text-center max-w-md space-y-6 px-8">
   
    <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-lg">
      <span className="text-sky-200">The Daily Report</span>
    </h1>

    <p className="text-lg italic text-sky-100 font-light">
      “Journalism Without Fear or Favour”
    </p>

    <p className="text-sky-100 text-base leading-relaxed mt-4">
      Stay informed with real stories, fearless voices, and honest journalism.  
      <span className="font-semibold text-sky-200 block mt-2">
        Sign in or create an account to explore more.
      </span>
    </p>
  </div>

 
  <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
  <div className="absolute top-10 left-10 w-40 h-40 bg-sky-500/20 rounded-full blur-2xl animate-pulse"></div>
</div>

   
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full shadow-xl border border-slate-100 rounded-3xl animate-fade-in">
        
       
          <Outlet />

        
          
        </div>
      </div>
    </div>
  );
}
