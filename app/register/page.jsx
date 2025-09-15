"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    name: "", 
    password: "",
  });

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

    const url = "/api/auth?register=true";
    try {
      const { data } = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setMessage(data.message);
      router.push("/login");
    } catch (error) {
      setMessage("Something went wrong..!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-blue-500 text-center my-7">
        Welcome to Hacksmith Club
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 px-4 md:px-12 my-6">
        {/* Form Section */}
        <section className="w-full md:w-1/2 animate-slide-in-left">
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

          <div className="flex flex-col items-center justify-center">
            <a
              href="/"
              className="flex items-center mb-6 text-2xl font-semibold text-sky-400"
            >
              Hacksmith
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Name"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  {/* Terms */}
                  <div className="flex items-start">
                    <input
                      id="terms"
                      type="checkbox"
                      required
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="terms" className="ml-2 text-sm font-light text-gray-500 dark:text-gray-300">
                      I accept the{" "}
                      <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Terms and Conditions
                      </a>
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 w-full"
                  >
                    {loading ? "Creating account..." : "Create an account"}
                  </button>

                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Login here
                    </a>
                  </p>
                </form>
                {message && <p className="my-2 text-red-400">{message}</p>}
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

export default Page;
