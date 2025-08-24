"use client"
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false); // should be boolean

  const handleChat = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse("Error: " + error.message);
    } finally {
      setLoading(false); // ensure loading stops even if error happens
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px" }}>
      <h1>AI Chat</h1>
      <br />

      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          rows={4}
          style={{ width: "80%", padding: "10px", marginBottom: "10px" }}
        />
      </div>

      <div>
        <button
          onClick={handleChat}
          style={{
            padding: "6px 14px",
            border: "1.5px solid #4F46E5",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "500",
            background: "none",
            color: "#4F46E5",
            cursor: "pointer",
            transition: "all 0.2s ease-in-out",
          }}
        >
          {loading ? "Loading..." : "Chat"}
        </button>
      </div>

      <br />

      <div
        style={{
          maxWidth: "600px",
          margin: "10px auto",
          padding: "12px 16px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          backgroundColor: "#f9fafb",
          fontSize: "15px",
          lineHeight: "1.5",
          color: "#374151",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        {response}
      </div>
    </div>
  );
}
