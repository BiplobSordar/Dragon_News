import React from "react";
import { Instagram, Twitter, Youtube, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {/* About Section */}
        <div className="flex flex-col items-center space-y-3">
          <h3 className="text-xl font-bold">About NewsPortal</h3>
          <p className="text-sm text-white/90">
            NewsPortal brings you the latest, verified, and unbiased news from around the world.
            Stay informed with breaking news, trending topics, and in-depth analysis.
            Journalism without fear or favor.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center space-y-3">
          <h3 className="text-xl font-bold">Quick Links</h3>
          <ul className="space-y-2 text-white/90 text-sm">
            <li><Link to="/" className="hover:text-sky-300 transition">Home</Link></li>
            <li><Link to="/categories/world" className="hover:text-sky-300 transition">World</Link></li>
            <li><Link to="/categories/tech" className="hover:text-sky-300 transition">Tech</Link></li>
            <li><Link to="/about" className="hover:text-sky-300 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-sky-300 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col items-center space-y-3">
          <h3 className="text-xl font-bold">Newsletter</h3>
          <p className="text-sm text-white/90">
            Subscribe to get weekly updates and latest news.
          </p>
          <div className=" hidden lg:flex flex-col sm:flex-row gap-2 w-full max-w-xs justify-center">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-black outline-none"
            />
            <button className="px-4 py-2 bg-white text-sky-600 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center">
              <Mail size={16} /> Subscribe
            </button>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center space-y-3">
          <h3 className="text-xl font-bold">Follow Us</h3>
          <p className="text-sm text-white/90">Stay connected on social media:</p>
          <div className="flex items-center gap-3">
            <Link to="#" className="hover:text-yellow-300 transition"><Instagram size={20} /></Link>
            <Link to="#" className="hover:text-blue-400 transition"><Twitter size={20} /></Link>
            <Link to="#" className="hover:text-red-500 transition"><Youtube size={20} /></Link>
            <Link to="#" className="hover:text-blue-600 transition"><Linkedin size={20} /></Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Credit */}
      <div className="border-t max-w-[1600px] mx-auto border-white/20 mt-6 py-4 text-center text-sm text-white/80 flex flex-col md:flex-row md:justify-between items-center gap-2">
        <span>&copy; {new Date().getFullYear()} NewsPortal. All rights reserved.</span>
        <span className="font-semibold">Developed by Biplob Sordar</span>
      </div>
    </footer>
  );
}
