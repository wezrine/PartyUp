import React, { useState, useEffect, useRef } from 'react';
import io from "socket.io-client";
import Messages from "./Messages";
import UserList from './UserList';

// const SERVER = "http://localhost:8080";

function Chat() {
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:8080');

    socketRef.current.on("your id", id => {
      setYourID(id);
    })

    socketRef.current.on("message", (message) => {
      console.log("here");
      receivedMessage(message);
    })
  }, []);

  function receivedMessage(message) {
    setMessages(oldMsgs => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: yourID,
    };
    setMessage("");
    socketRef.current.emit("send message", messageObject);
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }


  return (
    <section className="msger">
      <header className="msger-header">
        <div className="msger-header-title">
          <i className="fas fa-comment-alt"></i> Party Name
        </div>
      </header>

      <main className="msger-chat">
        {messages.map((message, index) => {
          if (message.id === yourID) {
            return (
              <div className="msg right-msg" key={index}>
                <div className="msg-bubble">
                  <div className="msg-info">
                    <div className="msg-info-name">Shawn</div>
                    <div className="msg-info-time">12:46</div>
                  </div>
                  <div className="msg-text">{message.body}</div>
                </div>
              </div>
            )
          }
          return (
            <div className="msg left-msg" key={index}>
              <div className="msg-bubble">
                <div className="msg-info">
                  <div className="msg-info-name">Zack</div>
                  <div className="msg-info-time">12:45</div>
                </div>
                <div className="msg-text">{message.body}</div>
              </div>
            </div>
          )
        })}
      </main>

      <form className="msger-inputarea" onSubmit={sendMessage}>
        <input type="text" className="msger-input" placeholder="Enter your message..." value={message} onChange={handleChange} />
        <button type="submit" className="msger-send-btn">Send</button>
      </form>
    </section>
  )
}

export default Chat;