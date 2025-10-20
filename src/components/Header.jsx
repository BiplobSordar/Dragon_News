import { format } from "date-fns";
import { SunMedium } from "lucide-react";

import TopStoriesMarquee from "./TopStoriesMarquee";
import { Link } from "react-router-dom";

const Header = () => {
  const today = format(new Date(), "EEEE, MMMM d, yyyy");

  return (
    <header className="w-full  bg-[#0f172a] text-white shadow-lg border-b border-white/10">
    
      <div className="bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 py-2 px-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between text-sm font-medium tracking-wide">
          <span className="font-semibold">{today}</span>
          <div className="flex items-center gap-2 text-white/90">
            <SunMedium className="w-4 h-4 text-yellow-300" />
            <p className="italic">Truth. Clarity. Impact.</p>
          </div>
        </div>
      </div>

   
      <div className="max-w-[1600px] mx-auto px-4 py-6 flex flex-col items-center md:flex-row md:justify-between gap-6">
      
        <div className="flex items-center gap-3">
          
          <div>
            <Link className="cursor-pointer" to={'/category/1'}>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              <span className="text-white">The</span>
              <span className="text-sky-400">Daily Report</span>
            </h1>
            </Link>
            <p className="text-sm text-white/80 mt-1">
              Journalism Without Fear or Favour
            </p>
          </div>
        </div>

    
        <div className="flex items-center gap-3">
          <button className="px-5 py-2 cursor-pointer rounded-full bg-sky-500 hover:bg-sky-600 text-white font-semibold transition">
            Subscribe
          </button>
          <button className="px-5 py-2 cursor-pointer rounded-full border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white font-semibold transition">
            Contact Us
          </button>
        </div>
      </div>

  

      <TopStoriesMarquee/>
    </header>
  );
};

export default Header;
