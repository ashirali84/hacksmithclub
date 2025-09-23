"use client";
import React, { useState } from "react";

const EventRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    team: "",
    event: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/event_register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("✅ Registration successful!");
        setFormData({ name: "", email: "", team: "", event: "" });
      } else {
        setMessage("❌ Failed to register.");
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[85.8vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center text-blue-400 mb-6">
          Event Registration
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="team"
          placeholder="Team Name (optional)"
          value={formData.team}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="event"
          value={formData.event}
          onChange={handleChange}
          required
          className="w-full p-3 mb-6 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Event</option>
          <option value="Boster 2k25">Boster 2k25</option>
          <option value="HackFest 2025">HackFest 2025</option>
          <option value="CodeWar 2026">CodeWar 2026</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors duration-300"
        >
          Register Now
        </button>

        {message && (
          <p className="text-green-400 text-center mt-4">{message}</p>
        )}
      </form>
    </div>
  );
};

export default EventRegistration;
