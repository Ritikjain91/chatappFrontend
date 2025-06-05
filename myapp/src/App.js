import React, { useState } from "react";
import Chat from "./components/Chat";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [chatWith, setChatWith] = useState("");

  const handleStartChat = () => {
    if (currentUser && chatWith && currentUser !== chatWith) {
      localStorage.setItem("currentUser", currentUser);
      localStorage.setItem("chatWith", chatWith);
      window.location.reload(); // to re-render Chat component
    }
  };

  const savedCurrentUser = localStorage.getItem("currentUser");
  const savedChatWith = localStorage.getItem("chatWith");

  if (savedCurrentUser && savedChatWith) {
    return (
      <Chat
        currentUserId={savedCurrentUser}
        chatWithUserId={savedChatWith}
      />
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Select Users to Start Chat</h2>
      <div>
        <label>Your User ID: </label>
        <select value={currentUser} onChange={(e) => setCurrentUser(e.target.value)}>
          <option value="">--Select--</option>
          <option value="user1">User 1</option>
          <option value="user2">User 2</option>
        </select>
      </div>
      <div>
        <label>Chat With: </label>
        <select value={chatWith} onChange={(e) => setChatWith(e.target.value)}>
          <option value="">--Select--</option>
          <option value="user1">User 1</option>
          <option value="user2">User 2</option>
        </select>
      </div>
      <button onClick={handleStartChat} style={{ marginTop: 10 }}>
        Start Chat
      </button>
    </div>
  );
}

export default App;
