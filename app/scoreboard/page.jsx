"use client";
import React, { useEffect, useState } from "react";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/leaderboard");
        const data = await res.json();
        if (data.success) {
          setLeaderboard(data.leaderboard);
        }
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="text-white text-center mt-10">Loading leaderboard...</div>;
  }

  return (
    <div className="text-white max-w-3xl mx-auto mt-10 p-6 bg-[#0b1220] rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-sky-400">
        🏆 Leaderboard
      </h2>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr
              key={user._id}
              className={`border-b border-gray-800 ${
                index === 0 ? "bg-yellow-900/30" : ""
              }`}
            >
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4 font-medium">{user.name}</td>
              <td className="py-2 px-4 font-bold text-sky-300">
                {user.totalPoints || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
