"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  // 🗂️ Event data (Dynamic)
  const events = [
    {
      id: 1,
      title: "Boster 2k25",
      date: "10-11-2025 - 10-11-2025",
      duration: "3 Hours non-stop challenges",
      link: "/challenges",
    },
    {
      id: 2,
      title: "HackFest 2025",
      date: "Upcomming",
      duration: "24 Hours CTF Hackathon",
      link: "#",
    },
    {
      id: 3,
      title: "CodeWar 2026",
      date: "Upcomming",
      duration: "5 Hours Competitive Coding",
      link: "#",
    },
  ];

  return (
    <>
      <div className="text-3xl text-center text-white my-8 font-bold">
        Current & Upcoming Events
      </div>

      {/* Responsive Grid for Multiple Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-6 border border-gray-700 bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            <h1 className="text-center text-2xl font-semibold text-blue-400">
              {event.title}
            </h1>
            <h2 className="my-3 text-center text-gray-300">📅 {event.date}</h2>
            <p className="text-center text-gray-400 mb-6">⏱️ {event.duration}</p>

            <div className="flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition-colors duration-300"
                onClick={() => router.push(event.link)}
              >
                View Challenges
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
