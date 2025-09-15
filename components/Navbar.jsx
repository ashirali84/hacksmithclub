"use client";

import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import Cookies from "js-cookie";

const Navbar = ({ children }) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = Cookies.get("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setIsLogin(true);
          setUsername(parsedUser?.name || "user");
        } catch (error) {
          console.error("Error parsing user cookie:", error);
        }
      } else {
        setIsLogin(false);
        setUsername("");
      }
      setLoading(false);
    };

    checkUser(); // initial check

    // Listen for login/logout events
    window.addEventListener("userLogin", checkUser);
    window.addEventListener("userLogout", checkUser);

    return () => {
      window.removeEventListener("userLogin", checkUser);
      window.removeEventListener("userLogout", checkUser);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    setIsLogin(false);
    setDropdownOpen(false);

    window.dispatchEvent(new Event("userLogout"));
    router.push("/");
  };

  // ✅ Until user state is checked → show only Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-950 text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <>
      <nav className="text-white w-full bg-blue-950 flex justify-between items-center p-4 sticky top-0 z-50">
        {/* Logo */}
        <a href="/" className="text-sky-400 text-xl font-bold font-mono">
          Hacksmith
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex justify-around gap-8 items-center text-center mx-8">
          <a href="/">Home</a>
          {isLogin ? <a href="/challenges">Challenges</a> : <a href="/#">Challenges</a>}
          {isLogin ? <a href="/scoreboard">Scoreboard</a> : <a href="/#">Scoreboard</a>}

          {isLogin ? (
            <div className="relative">
              <CgProfile
                className="text-2xl cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute z-50 right-0 mt-4 w-36 bg-gray-100 text-black rounded-md shadow-lg">
                  <button
                    className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    onClick={() => router.push("/profile")}
                  >
                    {username}
                  </button>
                  <button
                    className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a href="/login">Signup/Login</a>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-14 left-0 w-full bg-blue-900 flex flex-col items-center gap-4 py-4 md:hidden">
            <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
            {isLogin ? (
              <>
                <a href="/challenges" onClick={() => setMenuOpen(false)}>Challenges</a>
                <a href="/scoreboard" onClick={() => setMenuOpen(false)}>Scoreboard</a>
                <button
                  className="px-4 py-2 w-full text-center bg-gray-200 text-black rounded-md"
                  onClick={() => {
                    router.push("/profile");
                    setMenuOpen(false);
                  }}
                >
                  {username}
                </button>
                <button
                  className="px-4 py-2 w-full text-center bg-red-500 rounded-md"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <a href="/login" onClick={() => setMenuOpen(false)}>Signup/Login</a>
            )}
          </div>
        )}
      </nav>

      {/* Page content */}
      <main>{children}</main>
    </>
  );
};

export default Navbar;
