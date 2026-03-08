import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setMessageOpen, setChatUser } from '../store/uiSlice';
import API from '../services/api';
import { X, MessageSquare } from 'lucide-react';
import './MeassagePage.css';
import { userContext } from '../context/userContext';
import { useContext } from 'react';

function MeassagePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useContext(userContext).user?._id;

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data } = await API.get('/chat');
        setConversations(data.conversations || data.messageTosend || []);
      } catch (err) {
        console.error('Failed to fetch conversations:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  const openChat = async (conversationId, userId, fullName) => {
    try {
      const { data } = await API.get(`/chat/${conversationId}`);
      dispatch(setChatUser({ _id: userId, fullName, conversationId }));
      dispatch(setMessageOpen(false));

      navigate('/chat');
    } catch (err) {
      console.error('Failed to get user:', err);
    }
  };

  return (
    <div className="msg-panel">
      <div className="msg-panel__header">
        <div className="msg-panel__header-left">
          <MessageSquare size={20} />
          <h2 className="msg-panel__title">Messages</h2>
        </div>
        <button className="msg-panel__close" onClick={() => dispatch(setMessageOpen(false))}>
          <X size={20} />
        </button>
      </div>

      <div className="msg-panel__body">
        {loading ? (
          <div className="msg-panel__loading">
            {[1, 2, 3].map((i) => (
              <div key={i} className="msg-panel__skeleton" />
            ))}
          </div>
        ) : conversations.length > 0 ? (
          conversations.map((conv) => (
            <div
              className="msg-panel__conv"
              key={conv._id}
              onClick={() => openChat(conv._id, conv.user1._id === userId ? conv.user2._id : conv.user1._id, conv.user1._id === userId ? conv.user2.fullName : conv.user1.fullName)}
            >
              <div className="msg-panel__conv-avatar">
                {(conv.msgSender || conv.userName || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="msg-panel__conv-info">
                <p className="msg-panel__conv-name">{conv.user1._id === userId ? conv.user2.fullName : conv.user1.fullName}</p>
                <p className="msg-panel__conv-last">{conv.lastMessage || 'Start a conversation...'}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="msg-panel__empty">
            <div className="msg-panel__empty-icon">💬</div>
            <p className="msg-panel__empty-title">No messages yet</p>
            <p className="msg-panel__empty-text">
              When you order a product, a chat with the farmer will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MeassagePage;
