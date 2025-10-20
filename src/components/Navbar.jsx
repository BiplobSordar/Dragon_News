// import { Link } from "react-router-dom";
// import NavLink from "./NavLink";
// import { LogIn, LogOut, Search } from "lucide-react";
// import { useAuth } from "../context/AuthContext";

// export default function Navbar() {
//   const {user,loading,logout,}=useAuth()
//   return (
//     <nav className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md">
//       <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
//         <div className="flex items-center gap-4">
          
          

//           <div className="hidden md:flex font-bold text-2xl text-white items-center gap-5 ml-6">
//             <NavLink to="/category/0">Home</NavLink>
//             <NavLink to="/contact">Contact</NavLink>
//             <NavLink to="/about">About</NavLink>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <Search className="hidden sm:block opacity-90 hover:opacity-100" />

//           {user ? (
//             <div className="flex items-center gap-2">
//               <img
//                 src={user?.photoURL || "/Avatar.jpg"}
//                 alt="user"
//                 className="h-8 w-8 rounded-full border-2 border-white/30"
//               />
//               <span className="hidden sm:inline font-medium">
//                 {user.displayName || user.email}
//               </span>
//               <button
//                 onClick={logout}
//                 className="px-3 py-1 rounded-md bg-white/20 hover:bg-white/30 transition flex items-center gap-1"
//               >
//                 <LogOut size={16} />
//                 <span className="hidden sm:inline">Logout</span>
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center gap-2">
//               <Link
//                 to="/auth/login"
//                 className="px-3 py-1 rounded-md bg-white/20 hover:bg-white/30 transition flex items-center gap-1"
//               >
//                 <LogIn size={14} /> Login
//               </Link>
//               <Link
//                 to="/auth/signup"
//                 className="px-3 py-1 rounded-md bg-white text-sky-700 font-semibold hover:bg-slate-100 transition"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }




import { useState } from "react";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import { LogIn, LogOut, Search, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center gap-4">
            {/* Hamburger (visible only on mobile) */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/20 transition"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex font-bold text-2xl text-white items-center gap-5 ml-6">
              <NavLink to="/category/0">Home</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              <NavLink to="/about">About</NavLink>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <Search className="hidden sm:block opacity-90 hover:opacity-100" />

            {user ? (
              <div className="flex items-center gap-2">
                <img
                  src={user?.photoURL || "/Avatar.jpg"}
                  alt="user"
                  className="h-8 w-8 rounded-full border-2 border-white/30"
                />
                <span className="hidden sm:inline font-medium">
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={logout}
                  className="px-3 py-1 hidden rounded-md bg-white/20 hover:bg-white/30 transition md:flex items-center gap-1"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth/login"
                  className="px-3 py-1 rounded-md bg-white/20 hover:bg-white/30 transition flex items-center gap-1"
                >
                  <LogIn size={14} /> Login
                </Link>
                <Link
                  to="/auth/signup"
                  className="px-3 py-1 rounded-md bg-white text-sky-700 font-semibold hover:bg-slate-100 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`absolute top-0 left-0 h-full w-64 bg-white text-slate-700 p-5 shadow-lg transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-sky-700">Menu</h2>
            <button
              className="p-1 rounded-md hover:bg-slate-100"
              onClick={() => setMenuOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col space-y-3">
            <NavLink
              to="/category/0"
              onClick={() => setMenuOpen(false)}
              className="text-sky-700 text-base font-medium"
            >
              Home
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="text-sky-700 text-base font-medium"
            >
              Contact
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="text-sky-700 text-base font-medium"
            >
              About
            </NavLink>
          </div>

          {/* Auth Section (optional) */}
          <div className="mt-6 border-t border-slate-200 pt-4">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full justify-center py-2 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition"
              >
                <LogOut size={16} /> Logout
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition"
                >
                  <LogIn size={14} /> Login
                </Link>
                <Link
                  to="/auth/signup"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-200 text-sky-700 font-semibold hover:bg-slate-300 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
