import { socket } from "../socket";
import { useEffect, useState } from "react";

function Message({ room }) {
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("");
  const [con, setCon] = useState(false);
  const [popup, setPopup] = useState(true);
  const [messages, setMessages] = useState([{ msg: "", name: "", time: "" }]);

  useEffect(() => {
    socket.emit("room", room);
    socket.on("connectRoom", (msg) => console.log(msg));
  }, []);

  const sendMessage = () => {
    socket.emit("send-msg", input);
    setInput("");
  };

  const sign = () => {
    if (userName === "") return;
    socket.emit("new-user", userName);
    setCon(true);
    setPopup(false);
  };

  socket.on("chat", (msg) => {
    appendMessage(msg.message, msg.name, msg.time);
  });

  const appendMessage = (msg, na, time) => {
    if (msg === "") return;
    const array = [{ msg: msg, name: na, time: time }, ...messages];
    setMessages(array);
  };

  return (
    <div className="m-8">
      <div
        className={`popup w-screen h-screen bg-black/70 absolute top-0 left-0 flex items-center gap-8 flex-col justify-center ${
          popup ? "block" : "hidden"
        }`}
      >
        <h1 className="text-white font-bold text-2xl">Welcome to Chat!</h1>
        <div className="flex gap-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sign();
            }}
          >
            <input
              placeholder="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button type="submit">connect</button>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex gap-3"
          >
            <input
              placeholder="message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">send</button>
          </form>
        </div>
        <div>
          <h3>logged in as: {userName}</h3>
        </div>
      </div>
      {con && (
        <div>
          {messages[0].msg
            ? messages.map((mes) => (
                <div
                  key={Math.random() * 20}
                  className={`p-4 shadow-xl w-64 mt-4 border hover:border-orange-600 cursor-pointer rounded-md duration-75`}
                >
                  <div className="text-black/60 font-semibold text-sm flex justify-between">
                    <p>{mes.name === userName ? "@you" : "@" + mes.name}</p>
                    <p>{mes.time}</p>
                  </div>
                  <p className="text-lg">{mes.msg}</p>
                </div>
              ))
            : "No messages to display..."}
        </div>
      )}
    </div>
  );
}

export default Message;
