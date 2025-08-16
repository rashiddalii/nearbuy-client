import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect() {
    if (!this.socket) {
      // For Socket.IO, we need to connect to the root server URL, not the API path
      const apiUrl = import.meta.env.VITE_API_URL || 'https://nearbuy-server-j5wo.onrender.com';
      const serverUrl = apiUrl.replace('/api', ''); // Remove /api from the URL for Socket.IO
      
      // Try the most basic connection possible
      try {
        this.socket = io(serverUrl);
        console.log('Socket instance created successfully');
      } catch (error) {
        console.error('Failed to create socket instance:', error);
        return null;
      }

      this.socket.on('connect', () => {
        console.log('Socket connected successfully:', this.socket.id);
        this.isConnected = true;
      });

      this.socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
        this.isConnected = false;
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        this.isConnected = false;
        
        // Try to reconnect after a delay
        setTimeout(() => {
          if (this.socket && !this.socket.connected) {
            console.log('Attempting to reconnect...');
            this.socket.connect();
          }
        }, 5000);
      });

      this.socket.on('reconnect', (attemptNumber) => {
        console.log('Socket reconnected after', attemptNumber, 'attempts');
        this.isConnected = true;
      });

      this.socket.on('reconnect_error', (error) => {
        console.error('Socket reconnection error:', error);
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  getSocket() {
    return this.socket;
  }

  isSocketConnected() {
    return this.isConnected && this.socket?.connected;
  }

  // Wait for socket to be ready
  waitForConnection() {
    return new Promise((resolve, reject) => {
      if (this.socket?.connected) {
        resolve(this.socket);
        return;
      }

      const timeout = setTimeout(() => {
        reject(new Error('Socket connection timeout'));
      }, 10000);

      this.socket?.once('connect', () => {
        clearTimeout(timeout);
        resolve(this.socket);
      });

      this.socket?.once('connect_error', (error) => {
        clearTimeout(timeout);
        reject(error);
      });
    });
  }
}

// Create a singleton instance
const socketService = new SocketService();
export default socketService;
