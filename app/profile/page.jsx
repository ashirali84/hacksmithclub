"use client"
import { Cookie } from "next/font/google";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Page = () => {
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedUser = Cookies.get("user");  // Get 'user' cookie
    if (storedUser) {                        // If cookie exists
        try {
            setUser(JSON.parse(storedUser));  
        } catch (error) {
            console.error("Error parsing user:", error); 
        }
    }
}, []); 


  if (!user) {
    return (
      <div className="text-white text-2xl text-center mt-10">
        No user found. Please login.
      </div>
    );
  }

  return (
    <div className="text-white text-2xl flex flex-col items-center mt-10 gap-4">
      <h1 className="font-bold text-3xl">👤 Profile</h1>
      
      <div className="bg-blue-900 p-6 rounded-xl shadow-lg w-96 text-left">
        <p><span className="font-semibold">Name:</span> {user.name}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p>
          <span className="font-semibold">Password:</span>{" "}
          {showPassword ? user.password : "••••••••"}
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="ml-3 text-sm text-sky-400 hover:underline"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Page;
