"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const challenges = [
  { id: 1, title: "Crack me", category: "Cryptography", points: 50, hintTitle: "Crack Me", hint: "RUVHQUF7SV9BTV9CQFMzNjRfM05DUllQVEkwTn0=" },
  { id: 2, title: "Decode It", category: "Cryptography", points: 70, hintTitle: "Decode It", hint: "Hint: Hexadecimal\n45454741417B7730775F75726C5F336E633064696E675F643363727970747D" },
  { id: 3, title: "Think Bigger", category: "Cryptography", points: 100, hintTitle: "Think Bigger", hint: "hint: R-13 \n UlJUTk57X1ZOWl9HRTFQWExfbGJoX1BOQUdfVFI3fQ==" },
  { id: 4, title: "Can You FindMe", category: "OSINT", points: 50, hintTitle: "Can You FindMe", hint: "Z2l0aHViLmNvbS9hc2hpcmFsaTg0L0hhY2tzbWl0aF9mbGFnLw==" },
  { id: 5, title: "I am Not Main", category: "OSINT", points: 100, hintTitle: "I am Not Main", hint: "Z2l0aHViLmNvbS9hc2hpcmFsaTg0L0hhY2tzbWl0aF9mbGFnLw==" },
];

export default function Page() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [flagInput, setFlagInput] = useState("");
  const [message, setMessage] = useState(null);
  const [solvedMap, setSolvedMap] = useState({});
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const storedUser = Cookies.get("user");

    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.email) {
          setUser(parsedUser);
          fetchSolvedData(parsedUser.email);
        }
      } catch (err) {
        console.error("Invalid user cookie:", err);
        Cookies.remove("user"); // galat cookie remove kar do
      }
    }
  }, []);

  const fetchSolvedData = async (email) => {
    try {
      const res = await fetch(`/api/solved?email=${email}`);
      const data = await res.json();
      if (data.success) {
        const solved = {};
        data.solvedChallenges.forEach((c) => {
          solved[c.id] = c;
        });
        setSolvedMap(solved);
        setTotalPoints(data.totalPoints);
      }
    } catch (err) {
      console.error("Failed to fetch solved challenges:", err);
    }
  };

  const openModal = (challenge) => {
    setSelected(challenge);
    setFlagInput("");
    setMessage(null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelected(null);
    setFlagInput("");
    setMessage(null);
  };

  const submitFlag = async (e) => {
    e.preventDefault();
    if (!selected || !user?.email) return;

    try {
      const res = await fetch("/api/submit-flag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          challengeId: selected.id,
          submittedFlag: flagInput,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: "success", text: data.message });
        setSolvedMap({
          ...solvedMap,
          [selected.id]: { points: selected.points, solvedAt: new Date() },
        });
        setTotalPoints(data.totalPoints);
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Something went wrong" });
    }
  };

  // Separate challenges by category
  const cryptographyChallenges = challenges.filter(c => c.category === "Cryptography");
  const osintChallenges = challenges.filter(c => c.category === "OSINT");

  return (
    <>
      <div className="text-white text-3xl text-center bg-blue-900 sticky top-14">
        Challenges
        <hr />
      </div>

      {/* Cryptography Section */}
      <div>
        <h1 className="text-white text-center text-2xl my-10 items-center">Cryptography</h1>
        <div className="flex text-center items-center flex-wrap my-10 justify-center p-6 gap-6">
          {cryptographyChallenges.map((c) => (
            <button
              key={c.id}
              onClick={() => openModal(c)}
              className={`w-64 h-44 border-2 border-gray-600 text-center cursor-pointer text-white p-4 rounded-lg hover:scale-[1.02] transition-transform bg-opacity-10
                ${solvedMap[c.id] ? "opacity-70 ring-2 ring-green-500" : ""}`}
            >
              <h2 className="text-2xl font-semibold mb-2">{c.title}</h2>
              <p className="text-lg mb-4">{c.category}</p>
              <p className="font-medium">Points: {c.points}</p>
              {solvedMap[c.id] && <p className="text-sm mt-2 text-green-300">Solved</p>}
            </button>
          ))}
        </div>
      </div>

      {/* OSINT Section */}
      <div>
        <h1 className="text-white text-center text-2xl mb-0 items-center">OSINT</h1>
        <div className="flex text-center items-center flex-wrap my-10 justify-center p-6 gap-6">
          {osintChallenges.map((c) => (
            <button
              key={c.id}
              onClick={() => openModal(c)}
              className={`w-64 h-44 border-2 border-gray-600 text-center cursor-pointer text-white p-4 rounded-lg hover:scale-[1.02] transition-transform bg-opacity-10
                ${solvedMap[c.id] ? "opacity-70 ring-2 ring-green-500" : ""}`}
            >
              <h2 className="text-2xl font-semibold mb-2">{c.title}</h2>
              <p className="text-lg mb-4">{c.category}</p>
              <p className="font-medium">Points: {c.points}</p>
              {solvedMap[c.id] && <p className="text-sm mt-2 text-green-300">Solved</p>}
            </button>
          ))}
        </div>
      </div>

      {user && (
        <div className="text-center mb-6">
          <div className="inline-block bg-[#0b1220] px-4 py-2 rounded-md shadow">
            <span className="font-medium text-white">Total points collected: </span>
            <span className="font-bold text-sky-400 ml-2">{totalPoints}</span>
          </div>
        </div>
      )}

      {open && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b1220] text-white rounded-lg w-full max-w-lg p-6 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold">{selected.hintTitle}</h3>
                <p className="text-sm text-gray-300">{selected.category} • {selected.points} pts</p>
              </div>
              <button onClick={closeModal} className="text-gray-300 hover:text-white ml-4 text-xl">✕</button>
            </div>

            <div className="mt-4 text-wrap  space-y-3">
              <div>
                <p className="text-sm text-gray-300">Hint / Data:</p>
                <pre className="bg-black bg-opacity-30 p-3 text-wrap rounded break-words">{selected.hint}</pre>
              </div>

              <form onSubmit={submitFlag} className="mt-2">
                <label className="block text-sm text-gray-300 mb-2">Submit flag:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    placeholder="EEGAA{...}"
                    className="flex-1 px-3 py-2 rounded bg-black bg-opacity-20 border border-gray-600 text-white outline-none"
                    disabled={!!solvedMap[selected.id]}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
                    disabled={!!solvedMap[selected.id]}
                  >
                    Submit
                  </button>
                </div>
              </form>

              {message && (
                <div className={`mt-3 p-2 rounded ${message.type === "success" ? "bg-green-800 text-green-200" : "bg-red-800 text-red-200"}`}>
                  {message.text}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
