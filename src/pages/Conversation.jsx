import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { chatAPI } from '../services/api';
import socketService from '../services/socket';

const Conversation = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [chat, setChat] = useState(null); // chat object from backend
  const [messages, setMessages] = useState([]); // messages array from backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUserId = localStorage.getItem('userId'); // Declared here for use throughout component
  // Get chat and messages from backend
  useEffect(() => {
    const fetchChat = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get chat info (with product and user info)
        const chatRes = await chatAPI.getMyChats();
        const foundChat = chatRes.data.find(c => c._id === conversationId);
        if (!foundChat) {
          setError('Chat not found.');
          setLoading(false);
          return;
        }
        setChat(foundChat);
        // Get messages for this chat
        const msgRes = await chatAPI.getMessages(conversationId);
        setMessages(msgRes.data);
        
        // Mark messages as read when opening conversation
        await chatAPI.markAsRead(conversationId);
      } catch (err) {
        setError('Failed to load chat.');
      } finally {
        setLoading(false);
      }
    };
    fetchChat();

    // Setup socket.io connection
    const setupSocket = async () => {
      try {
        const socket = socketService.connect();
        
        // Wait for socket to be ready
        await socketService.waitForConnection();
        
        // Join chat room
        socket.emit('join', conversationId);
        console.log('Joined chat room:', conversationId);
        
        // Listen for new messages
        socket.on('receiveMessage', (message) => {
          console.log('Received new message via socket:', message);
          setMessages(prev => {
            // Check if message already exists to avoid duplicates
            const messageExists = prev.some(msg => msg._id === message._id);
            if (messageExists) {
              return prev;
            }
            return [...prev, message];
          });
          
          // Mark new message as read if it's from other user
          if (message.sender !== currentUserId && message.sender?._id?.toString() !== currentUserId) {
            chatAPI.markAsRead(conversationId);
          }
        });
        
        // Handle socket connection events (for debugging)
        socket.on('connect', () => {
          console.log('Socket connected in Conversation');
        });
        
        socket.on('disconnect', (reason) => {
          console.log('Socket disconnected in Conversation:', reason);
        });
        
        socket.on('connect_error', (error) => {
          console.error('Socket connection error in Conversation:', error);
        });
        
      } catch (error) {
        console.error('Failed to setup socket connection:', error);
        // Continue without real-time updates if socket fails
      }
    };
    
    setupSocket();
    
    return () => {
      const socket = socketService.getSocket();
      if (socket) {
        socket.off('receiveMessage');
        socket.off('connect');
        socket.off('disconnect');
        socket.off('connect_error');
        socket.emit('leave', conversationId);
      }
    };
    // eslint-disable-next-line
  }, [conversationId, currentUserId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mark messages as read when user scrolls to view them
  useEffect(() => {
    const messagesContainer = document.querySelector('.messages-container');
    if (messagesContainer) {
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = messagesContainer;
        // If user is near the bottom (within 100px), mark messages as read
        if (scrollHeight - scrollTop - clientHeight < 100) {
          markMessagesAsRead();
        }
      };

      messagesContainer.addEventListener('scroll', handleScroll);
      return () => messagesContainer.removeEventListener('scroll', handleScroll);
    }
  }, [messages, chat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !chat) return;
    setSending(true);
    try {
      // Send message to backend
      const res = await chatAPI.sendMessage({ chatId: chat._id, text: newMessage });
      const newMessageData = res.data;
      
      // Add message to local state immediately
      setMessages(prev => [...prev, newMessageData]);
      
      // Emit to socket for real-time delivery to other users
      const socket = socketService.getSocket();
      if (socket && socketService.isSocketConnected()) {
        console.log('Emitting message via socket:', { chatId: chat._id, message: newMessageData });
        socket.emit('sendMessage', { chatId: chat._id, message: newMessageData });
      }
      
      setNewMessage('');
      toast.success('Message sent!');
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  // Function to mark messages as read
  const markMessagesAsRead = async () => {
    try {
      await chatAPI.markAsRead(chat._id);
             // Update messages to show as read
       setMessages(prev => prev.map(msg => ({
         ...msg,
         read: msg.sender === currentUserId || msg.sender?._id?.toString() === currentUserId ? msg.read : true
       })));
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading conversation...</p>
        </div>
      </div>
    );
  }
  if (error || !chat) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Conversation not found</h3>
          <p className="text-gray-600 mb-6">{error || 'The conversation you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/messages')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Messages
          </button>
        </div>
      </div>
    );
  }

  // Find the other user in the chat - properly identify who is NOT the current user
  const otherUser = chat.members.find(u => u._id.toString() !== currentUserId);
  
  // If no other user found (shouldn't happen), show error
  if (!otherUser) {
    console.warn('No other user found in chat:', chat);
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Invalid conversation</h3>
          <p className="text-gray-600 mb-6">This conversation appears to be invalid.</p>
          <button
            onClick={() => navigate('/messages')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Messages
          </button>
        </div>
      </div>
    );
  }
  const product = chat.product;
  console.log(product);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/messages')}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg">
                  {/* Avatar fallback */}
                  {otherUser.avatar || otherUser.name?.charAt(0) || '👤'}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">{otherUser.name}</h2>
                  {/* Online status not available unless using socket.io */}
                </div>
              </div>
            </div>
            {/* Product Info */}
            <div className="flex items-center space-x-3">
              <img
                src={product?.images?.[0] || product?.image || ''}
                alt={product?.title}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 line-clamp-1">
                  {product?.title}
                </p>
                <p className="text-sm text-green-600 font-semibold">
                  ${product?.price}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="messages-container h-96 overflow-y-auto p-6 space-y-4">
                     {messages.map((message, index) => {
             const isMe = message.sender === currentUserId || message.sender?._id?.toString() === currentUserId;
            const showDate = index === 0 || 
              formatDate(message.createdAt) !== formatDate(messages[index - 1]?.createdAt);

            return (
              <div key={message._id || message.id}>
                {/* Date Separator */}
                {showDate && (
                  <div className="text-center my-4">
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                      {formatDate(message.createdAt)}
                    </span>
                  </div>
                )}

                {/* Message */}
                <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  {/* Avatar for other user */}
                  {!isMe && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm bg-gray-500 mr-2 flex-shrink-0">
                      {otherUser.avatar || otherUser.name?.charAt(0) || '👤'}
                    </div>
                  )}
                  
                  {/* Message Bubble */}
                  <div className={`max-w-xs lg:max-w-md ${isMe ? 'ml-auto' : ''}`}>
                    <div className={`px-4 py-2 rounded-lg ${
                      isMe 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <div className={`flex items-center justify-between mt-1 ${
                        isMe ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <span className="text-xs">{formatTime(message.createdAt)}</span>
                        {/* Read status for my messages */}
                        {isMe && (
                          <span className="text-xs ml-2">
                            {message.read ? '✓✓' : '✓'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Avatar for current user */}
                  {isMe && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm bg-blue-500 ml-2 flex-shrink-0">
                      👤
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={sending}
            />
            <button
              type="submit"
              disabled={sending || !newMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
        <div className="flex space-x-4">
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            📞 Call
          </button>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            📍 Share Location
          </button>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            📷 Send Photo
          </button>
          <button className="text-red-600 hover:text-red-700 font-medium text-sm">
            🚫 Block User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Conversation; 