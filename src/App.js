import React, { useState } from "react";
import Message from "./components/Message";
const roomsList = [
  { name: "crypto23", color: "bg-green-500" },
  { name: "politics18", color: "bg-red-500" },
  { name: "weather99", color: "bg-yellow-500" },
  { name: "soccer21", color: "bg-blue-500" },
  { name: "tate5", color: "bg-orange-500" },
  { name: "spider88", color: "bg-indigo-500" },
];

function App() {
  const [mActive, setMactive] = useState(false);
  const [room, setRoom] = useState("");
  return (
    <main className="grid place-items-center h-[95vh] border">
      {mActive ? (
        <Message room={room} />
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-2xl md:text-4xl font-semibold">
              Secure chatrooms free for use
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setMactive(true);
              }}
              className="flex items-center gap-1 justify-center"
            >
              <input
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="#room"
                className="md:w-[350px]"
              />
              <button
                type="submit"
                className="py-2 border hover:text-orange-600 font-semibold px-8"
              >
                join
              </button>
            </form>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-2 place-items-center gap-2 mt-12">
            {roomsList.map((name) => (
              <div
                key={name.name.length * Math.random()}
                onClick={() => {
                  setRoom(name.name);
                  setMactive(true);
                }}
                className={`hover:scale-110 duration-100 cursor-pointer border p-2 rounded shadow-xl w-[150px] md:w-[200px] h-24 ${name.color} text-white font-semibold`}
              >
                {"#" + name.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
