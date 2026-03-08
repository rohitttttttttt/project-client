import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';
import { socket } from '../pages/Home';
import API from '../services/api';
import { ArrowLeft, Send } from 'lucide-react';
import './ChatPage.css';
import { useDispatch } from 'react-redux';
import { setMessageOpen } from '../store/uiSlice';

export default function ChatPage() {
  const { user, chatUser } = useContext(userContext);
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  const [messageToSend, setMessageToSend] = useState('');
  const [messageToDisplay, setMessageToDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const disPatch = useDispatch();

  // Listen for incoming messages
  useEffect(() => {
    const handler = (incomingMessage) => {
      // Format incoming real-time message to match DB model structure
      const formattedMessage = {
        id: Date.now(),
        conversationId: incomingMessage.conversationId,
        sender: { _id: incomingMessage.senderId },
        message: incomingMessage.content,
        createdAt: incomingMessage.timestamp,
      };
      setMessageToDisplay((prev) => [...prev, formattedMessage]);
    };
    socket.on('message-received', handler);
    return () => socket.off('message-received', handler);
  }, []);

  // Fetch existing messages
  useEffect(() => {
    if (!chatUser?._id) return;
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/chat/${chatUser.conversationId}`);
        // API returns newer messages first due to pagination sorting, so we reverse it to render naturally
        const fetchedMessages = res.data.messages || [];
        setMessageToDisplay([...fetchedMessages].reverse());
      } catch (err) {
        console.error('Error fetching messages:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [chatUser?._id]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageToDisplay]);

  const handleSend = () => {
    if (!messageToSend.trim()) return;
    setMessageToDisplay((prev) => [
      ...prev,
      { sender: { _id: user._id }, message: messageToSend, id: Date.now() },
    ]);
    socket.emit('send-message', {
      conversationId: chatUser.conversationId,
      content: messageToSend,
    });
    setMessageToSend('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!chatUser?._id) {
    return (
      <div className="chat-page">
        <div className="chat-page__empty">
          <div className="chat-page__empty-icon">💬</div>
          <h3>No conversation selected</h3>
          <p>Open a product and click "Chat with Farmer" to start messaging.</p>
          <button className="chat-page__back-btn" onClick={() => navigate('/')}>
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-page__header">
        <button className="chat-page__header-back" onClick={() => { disPatch(setMessageOpen(true)); navigate("/") }}>
          <ArrowLeft size={20} />
        </button>
        <div className="chat-page__header-avatar">
          {(chatUser.fullName || chatUser.userName || 'U').charAt(0).toUpperCase()}
        </div>
        <div className="chat-page__header-info">
          <p className="chat-page__header-name">{chatUser.fullName || chatUser.userName || 'User'}</p>
          <p className="chat-page__header-status">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-page__messages">
        {loading ? (
          <p className="chat-page__loading">Loading messages...</p>
        ) : messageToDisplay.length === 0 ? (
          <p className="chat-page__loading">No messages yet. Say hello!</p>
        ) : (
          messageToDisplay.map((msg, i) => (
            <div
              key={msg.id || i}
              className={`chat-page__bubble ${msg.sender._id === user._id ? 'chat-page__bubble--sent' : 'chat-page__bubble--received'}`}
            >
              <p className="chat-page__bubble-text">{msg.message}</p>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chat-page__input-bar">
        <input
          type="text"
          className="chat-page__input"
          placeholder="Type a message..."
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="chat-page__send-btn"
          onClick={handleSend}
          disabled={!messageToSend.trim()}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
