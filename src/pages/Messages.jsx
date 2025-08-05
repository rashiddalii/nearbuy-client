import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { chatAPI } from '../services/api';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await chatAPI.getMyChats();
        setConversations(res.data);
      } catch (err) {
        setError('Failed to load messages.');
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">Communicate with buyers and sellers</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading messages...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to load messages</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : conversations.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {conversations.map((conversation) => {
              // Find the other user
              const currentUserId = localStorage.getItem('userId');
              const otherUser = conversation.members.find(u => u._id !== currentUserId) || conversation.members[0];
              // Last message
              const lastMessage = conversation.lastMessage || (conversation.messages && conversation.messages.length > 0 ? conversation.messages[conversation.messages.length - 1].text : '');
              // Timestamp
              const lastTimestamp = conversation.updatedAt || conversation.createdAt;
              const timeAgo = lastTimestamp ? new Date(lastTimestamp).toLocaleString() : '';
              // Unread (for now, always false unless you add logic)
              const unread = false;
              return (
                <Link
                  key={conversation._id}
                  to={`/conversation/${conversation._id}`}
                  className="block p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                      {otherUser.avatar || otherUser.name?.charAt(0) || '👤'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{otherUser.name}</h3>
                        <span className="text-sm text-gray-500">{timeAgo}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{lastMessage}</p>
                    </div>
                    {unread && (
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No messages yet</h3>
            <p className="text-gray-600">Start browsing items to begin conversations with sellers</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages; 