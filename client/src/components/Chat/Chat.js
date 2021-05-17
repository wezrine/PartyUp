import React, { useState, useEffect, useRef } from 'react';
import io from "socket.io-client";
import MessageList from './MessageList'
import Messages from "./Messages";
import UserList from './UserList';

// const SERVER = "http://localhost:8080";

function Chat({ match }) {

  const [party, setParty] = useState({});
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [messagesReal, setMessagesReal] = useState([])

  const socketRef = useRef();

  useEffect(() => {
    getParty(match.params.partyId)

    socketRef.current = io.connect('http://localhost:8080');

    socketRef.current.on("your id", id => {
      setYourID(localStorage.getItem('userId'));
    })

    socketRef.current.on('connection', socket => {
      socketRef.current.emit('setPartyId', match.params.partyId)
    })


    socketRef.current.on("connection", (socket) => {
      console.log(socket)
    })

    socketRef.current.on("allMessages", (messages) => {
      console.log('38', messages)
      setMessagesReal(messages)
    })

    socketRef.current.on("message", (message) => {
      receivedMessage(message);
    })

  }, [match.params.partyId]);

  const getParty = (partyId) => {
    fetch(`http://localhost:8080/party/${partyId}`)
    .then(response => response.json())
    .then(party => {
      setParty(party)
    })
  }

  const saveMessage = (message) => {
    fetch('http://localhost:8080/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
  }

  function receivedMessage(message) {
    setMessages(oldMsgs => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();

    const messageObject = {
      body: message,
      time: Date().toString().slice(16,21),
      id: localStorage.getItem('userId'),
      partyId: party._id,
      username: localStorage.getItem('username')
    };
    setMessage("");

    saveMessage(messageObject)

    socketRef.current.emit("send message", messageObject);
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }


  return (
    <section className="msger">
      <header className="msger-header">
        <div className="msger-header-title">
          <i className="fas fa-comment-alt"></i> {party.partyName}
        </div>
      </header>


      

      <main className="msger-chat">
        {/* Past messages pulled on page load */}
      <MessageList messages={messagesReal} />

      {/* Live messages */}
        {messages.map((message, index) => {
          if (message.id === localStorage.getItem('userId')) {
            return ( 
              <div className="msg right-msg" key={index}>
                <div className="msg-bubble">
                  <div className="msg-info">
                    <div className="msg-info-name">{localStorage.getItem('username')}</div>
                    <div className="msg-info-time">{message.time}</div>
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
                  <div className="msg-info-name">{message.username}</div>
                  <div className="msg-info-time">{message.time}</div>
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