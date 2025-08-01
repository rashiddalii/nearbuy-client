import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Conversation = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);

  // Mock conversation data
  const [conversation] = useState({
    id: conversationId,
    user: {
      name: "John Doe",
      avatar: "👨",
      online: true
    },
    product: {
      title: "iPhone 13 Pro - Excellent Condition",
      price: 799,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop"
    },
    messages: [
      {
        id: 1,
        sender: 'them',
        text: "Hi! Is the iPhone still available?",
        timestamp: "2024-01-20T10:30:00",
        read: true
      },
      {
        id: 2,
        sender: 'me',
        text: "Yes, it's still available! Are you interested?",
        timestamp: "2024-01-20T10:32:00",
        read: true
      },
      {
        id: 3,
        sender: 'them',
        text: "Yes, I'm very interested. Can you tell me more about the condition?",
        timestamp: "2024-01-20T10:35:00",
        read: true
      },
      {
        id: 4,
        sender: 'me',
        text: "It's in excellent condition. No scratches, includes original box and charger. 256GB Pacific Blue.",
        timestamp: "2024-01-20T10:37:00",
        read: true
      },
      {
        id: 5,
        sender: 'them',
        text: "That sounds perfect! Can we meet tomorrow? I'm available in the afternoon.",
        timestamp: "2024-01-20T10:40:00",
        read: false
      }
    ]
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setSending(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In real app, this would be sent to backend
      const message = {
        id: Date.now(),
        sender: 'me',
        text: newMessage,
        timestamp: new Date().toISOString(),
        read: false
      };
      
      // Add to messages (in real app, this would come from backend)
      conversation.messages.push(message);
      
      setNewMessage('');
      toast.success('Message sent!');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSending(false);
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
                  {conversation.user.avatar}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">{conversation.user.name}</h2>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${conversation.user.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-sm text-gray-600">
                      {conversation.user.online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="flex items-center space-x-3">
              <img
                src={conversation.product.image}
                alt={conversation.product.title}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 line-clamp-1">
                  {conversation.product.title}
                </p>
                <p className="text-sm text-green-600 font-semibold">
                  ${conversation.product.price}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {conversation.messages.map((message, index) => {
            const isMe = message.sender === 'me';
            const showDate = index === 0 || 
              formatDate(message.timestamp) !== formatDate(conversation.messages[index - 1].timestamp);

            return (
              <div key={message.id}>
                {/* Date Separator */}
                {showDate && (
                  <div className="text-center my-4">
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                      {formatDate(message.timestamp)}
                    </span>
                  </div>
                )}

                {/* Message */}
                <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md ${isMe ? 'order-2' : 'order-1'}`}>
                    <div className={`px-4 py-2 rounded-lg ${
                      isMe 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <div className={`flex items-center justify-between mt-1 ${
                        isMe ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <span className="text-xs">{formatTime(message.timestamp)}</span>
                        {isMe && (
                          <span className="text-xs">
                            {message.read ? '✓✓' : '✓'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                    isMe ? 'bg-blue-500 order-1 ml-2' : 'bg-gray-500 order-2 mr-2'
                  }`}>
                    {isMe ? '👤' : conversation.user.avatar}
                  </div>
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