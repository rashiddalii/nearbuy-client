import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Messages = () => {
  const [conversations] = useState([
    {
      id: 1,
      user: "John Doe",
      lastMessage: "Is the iPhone still available?",
      timestamp: "2 hours ago",
      unread: true,
      avatar: "👨"
    },
    {
      id: 2,
      user: "Sarah Wilson",
      lastMessage: "Can you deliver to downtown?",
      timestamp: "1 day ago",
      unread: false,
      avatar: "👩"
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">Communicate with buyers and sellers</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {conversations.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {conversations.map((conversation) => (
              <Link
                key={conversation.id}
                to={`/conversation/${conversation.id}`}
                className="block p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                    {conversation.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{conversation.user}</h3>
                      <span className="text-sm text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread && (
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              </Link>
            ))}
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