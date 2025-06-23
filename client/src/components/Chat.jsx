import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../config";
// const socket = io("http://localhost:5000");
const socket = io(`${BASE_URL}`);

export default function ChatBox({ dealId, user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    socket.emit("joinRoom", dealId);
    axios
      .get(`${BASE_URL}/api/chat/${dealId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setMessages(res.data));

    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [dealId, user.token]);

  const handleSend = async () => {
    await axios.post(
      `${BASE_URL}/api/chat/send`,
      { dealId, text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setText("");
  };

  return (
    <div className="border rounded-xl p-4 mt-6 bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
      <div className="h-40 overflow-y-auto border rounded p-2 bg-white mb-2">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`text-sm py-1 ${msg.sender._id === user.id ? "text-right" : "text-left"}`}
          >
            <span className="px-2 py-1 rounded bg-blue-100 inline-block">
              {msg.sender.name}: {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 px-3 py-2 border rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}