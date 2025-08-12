import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { chatAPI } from '../services/api';
import socketService from '../services/socket';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await chatAPI.getMyChats();
        setConversations(res.data);
        
        // Get unread message count
        const unreadRes = await chatAPI.getUnreadCount();
        setUnreadCount(unreadRes.data.unreadCount);
      } catch (err) {
        setError('Failed to load messages.');
      } finally {
        setLoading(false);
      }
    };
    fetchChats();

    // Setup real-time updates
    const socket = socketService.connect();
    
    // Listen for new messages to update conversations list
    socket.on('receiveMessage', (message) => {
      console.log('New message received in Messages page:', message);
      // Refresh conversations to show updated last message and unread count
      fetchChats();
    });

    // Listen for read status updates
    socket.on('messagesRead', ({ chatId, messageIds }) => {
      console.log('Messages marked as read in Messages page:', messageIds);
      // Update conversations to reflect read status changes
      setConversations(prev => prev.map(conv => {
        if (conv._id === chatId) {
          // Update messages in this conversation
          const updatedMessages = conv.messages?.map(msg => ({
            ...msg,
            read: messageIds.includes(msg._id) ? true : msg.read
          })) || conv.messages;
          
          return {
            ...conv,
            messages: updatedMessages
          };
        }
        return conv;
      }));
      
      // Refresh unread count
      chatAPI.getUnreadCount().then(res => {
        setUnreadCount(res.data.unreadCount);
      }).catch(err => {
        console.error('Failed to update unread count:', err);
      });
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('messagesRead');
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
            <p className="text-gray-600">Communicate with buyers and sellers</p>
          </div>
          {unreadCount > 0 && (
            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {unreadCount} unread
            </div>
          )}
        </div>
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
              // Use the otherUser field provided by the backend
              const otherUser = conversation.otherUser;
              
              // If no other user found (shouldn't happen), skip this conversation
              if (!otherUser) {
                console.warn('No other user found in conversation:', conversation);
                return null;
              }
              
              // Get last message and unread count for this conversation
              const lastMessage = conversation.lastMessage || (conversation.messages && conversation.messages.length > 0 ? conversation.messages[conversation.messages.length - 1].text : '');
              const lastTimestamp = conversation.updatedAt || conversation.createdAt;
              const timeAgo = lastTimestamp ? new Date(lastTimestamp).toLocaleString() : '';
              
                             // Calculate unread messages for this conversation
               const currentUserId = localStorage.getItem('userId');
               const unreadMessages = conversation.messages ? conversation.messages.filter(msg => 
                 !msg.read && msg.sender !== currentUserId && msg.sender?._id?.toString() !== currentUserId
               ).length : 0;
              
              const hasUnread = unreadMessages > 0;
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
                        <h3 className={`font-semibold ${hasUnread ? 'text-gray-900' : 'text-gray-700'}`}>
                          {otherUser.name}
                        </h3>
                        <span className="text-sm text-gray-500">{timeAgo}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className={`text-sm ${hasUnread ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                          {lastMessage}
                        </p>
                        {hasUnread && (
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            <span className="text-xs text-blue-600 font-medium">
                              {unreadMessages}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
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