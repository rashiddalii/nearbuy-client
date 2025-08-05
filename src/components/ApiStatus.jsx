import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApiStatus = () => {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    // Check the root endpoint for health, not /api/
    let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    // Remove trailing /api if present
    apiUrl = apiUrl.replace(/\/api\/?$/, '');
    axios.get(`${apiUrl}/`).then(() => {
      setStatus('online');
    }).catch(() => {
      setStatus('offline');
    });
  }, []);

  return (
    <span className={`ml-2 text-xs px-2 py-1 rounded ${
      status === 'online' ? 'bg-green-100 text-green-700' :
      status === 'offline' ? 'bg-red-100 text-red-700' :
      'bg-gray-100 text-gray-700'
    }`}>
      API: {status}
    </span>
  );
};

export default ApiStatus;
