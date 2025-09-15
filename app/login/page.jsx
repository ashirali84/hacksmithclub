"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const url = "/api/auth?login=true";
    try {
      const { data } = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMessage(data.message);

      if (data.message === "Email or Password wrong..!") {
        alert(data.message);
      } else {
        setIsLogin(true);
        Cookies.set("token", data.token, { expires: 7, path: "/" });
        Cookies.set("user", JSON.stringify(data.user), { expires: 7, path: "/" });
        window.dispatchEvent(new Event("userLogin"));
        router.push("/");
      }
    } catch (error) {
      setMessage("Something went wrong..!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="my-6">
        <style>
          {`
          @keyframes slideInLeft {
            0% { transform: translateX(-100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideInRight {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          .animate-slide-in-left {
            animation: slideInLeft 1.2s ease-out forwards;
          }
          .animate-slide-in-right {
            animation: slideInRight 1.2s ease-out forwards;
          }
        `}
        </style>
        <h1 className="text-2xl md:text-3xl text-center text-blue-500 font-bold">
          Welcome Back! Hacksmith Club
        </h1>
      </div>

      {/* Responsive layout */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 px-4 md:px-12 my-6">
        {/* Form Section */}
        <section className="w-full md:w-1/2 animate-slide-in-left">
          <div className="flex flex-col items-center justify-center">
            <a href="/" className="text-2xl font-semibold text-blue-500 mb-6">
              Hacksmith
            </a>
            <div className="w-full bg-gray-700 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm text-gray-900 dark:text-white">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm text-gray-900 dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="text-white bg-blue-600 rounded-lg w-full p-2.5 hover:bg-blue-700"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <a href="/register" className="text-blue-600 hover:underline">
                      Sign up
                    </a>
                  </p>
                </form>
                {message && <p className="text-red-400">{message}</p>}
              </div>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center animate-slide-in-right">
          <img
            className="border-2 border-blue-400 rounded-xl shadow-lg w-full md:w-3/4 lg:w-2/3 object-cover"
            src="/poster.jpg"
            alt="Poster"
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
