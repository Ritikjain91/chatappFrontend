import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css';

const socket = io('http://localhost:3001');

function Chat({ currentUserId, chatWithUserId }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.emit('register', currentUserId);

    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, `From ${data.from}: ${data.message}`]);
    });

    return () => {
      socket.off('receive_message'); // Cleanup
    };
  }, [currentUserId]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', {
        to: chatWithUserId,
        from: currentUserId,
        message,
      });

      setChat((prev) => [...prev, `Me: ${message}`]);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat between {currentUserId} and {chatWithUserId}</h2>
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <div className="chat-log">
        {chat.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
    </div>
  );
}

export default Chat;
