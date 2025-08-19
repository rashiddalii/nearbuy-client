# 🛍️ NearBuy Frontend - Community Marketplace

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **The frontend React application for NearBuy - Your local community marketplace where neighbors buy, sell, and connect safely.**

## 📖 Overview

NearBuy Frontend is a modern, responsive React application that provides an intuitive and engaging user interface for a community marketplace platform. Built with React 19 and Vite, it offers a seamless experience for users to browse local listings, manage their own products, communicate with other users through real-time chat, and build trust within their community.

### 🎯 What This Frontend Does

- **User Interface**: Provides a beautiful, mobile-responsive interface for the NearBuy marketplace
- **Real-time Communication**: Enables instant messaging between buyers and sellers using Socket.io
- **Product Management**: Allows users to create, edit, and manage their product listings
- **User Authentication**: Handles secure login, registration, and profile management
- **Interactive Features**: Includes saved items, messaging, and user dashboard functionality

## ✨ Features

### 🔐 Authentication & User Management
- **Secure Login/Register**: JWT-based authentication with form validation
- **User Profiles**: Customizable profiles with avatar and bio management
- **Protected Routes**: Route protection for authenticated users
- **Session Management**: Automatic token handling and session persistence

### 🛒 Marketplace Interface
- **Product Browsing**: Responsive grid layout for browsing marketplace items
- **Product Details**: Comprehensive product pages with seller information
- **Category Filtering**: Organized browsing by product categories
- **Search Functionality**: Find items by title, description, and location
- **Product Cards**: Attractive product cards with images and key information

### 💬 Real-time Communication
- **Instant Messaging**: Real-time chat using Socket.io integration
- **Conversation Management**: Organized chat threads and message history
- **Message Notifications**: Real-time updates for new messages
- **Chat Interface**: Modern chat UI with message timestamps and read receipts

### 📱 User Dashboard & Management
- **Personal Dashboard**: Overview of user's activity and listings
- **My Listings**: Manage and edit your own product listings
- **Saved Items**: Bookmark and organize favorite products
- **Profile Settings**: Update personal information and preferences
- **Add/Edit Listings**: Intuitive forms for creating and updating products

### 🎨 User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, professional interface with smooth animations
- **Toast Notifications**: User feedback for actions and errors
- **Loading States**: Smooth loading indicators and skeleton screens
- **Error Handling**: Graceful error handling with user-friendly messages

### 🖼️ Media & Content
- **Image Upload**: Cloudinary integration for product images
- **Multiple Images**: Support for multiple product photos
- **Image Optimization**: Automatic image resizing and optimization
- **Rich Content**: Rich text descriptions and product details

## 🛠️ Tech Stack

### Core Framework
- **React 19** - Latest React with hooks and functional components
- **React Router DOM 7** - Client-side routing and navigation
- **Vite 7** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Icons 5** - Comprehensive icon library
- **React Toastify 11** - Toast notification system

### State Management & Data
- **Axios 1.11** - HTTP client for API communication
- **Socket.io Client 4.8** - Real-time bidirectional communication
- **Local Storage** - Client-side data persistence

### Development Tools
- **ESLint 9** - Code linting and quality assurance
- **PostCSS 8.5** - CSS processing and optimization
- **Autoprefixer 10.4** - CSS vendor prefixing
- **TypeScript Types** - Type definitions for better development experience

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API running (see [Backend Repository](#nearbuy-server))

### Step 1: Clone the Repository
```bash
git clone https://github.com/rashiddalii/nearbuy-client.git
cd nearbuy-client
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Environment Setup
Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:5000/api
# or for production backend
# VITE_API_URL=https://nearbuy-server-j5wo.onrender.com/api
```

### Step 4: Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `https://nearbuy-client.vercel.app`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Usage

### Getting Started
1. **Open the Application**: Navigate to `https://nearbuy-client.vercel.app`
2. **Register/Login**: Create an account or sign in with existing credentials
3. **Browse Marketplace**: Explore local items in the marketplace
4. **Create Listings**: Add your own items for sale with photos and descriptions
5. **Connect with Users**: Use the built-in chat to communicate with buyers/sellers

### Key User Flows

#### 🔐 Authentication Flow
- **Registration**: Fill out the registration form with name, email, and password
- **Login**: Sign in with email and password
- **Profile Management**: Update profile information and avatar

#### 🛒 Marketplace Flow
- **Browse Products**: View all available items with filtering options
- **Product Details**: Click on products to view detailed information
- **Contact Seller**: Initiate chat with product sellers
- **Save Items**: Bookmark interesting products for later

#### 💬 Messaging Flow
- **Start Conversation**: Click "Message Seller" on any product
- **Real-time Chat**: Send and receive messages instantly
- **Conversation List**: View all your active conversations
- **Message History**: Access complete conversation history

#### 📝 Listing Management
- **Create Listing**: Add new products with images and descriptions
- **Edit Listings**: Update product information and photos
- **Manage Status**: Mark items as sold or inactive
- **View Analytics**: Track views and saves on your listings

### Testing Features
- **Real-time Chat**: Open multiple browser windows to test messaging
- **Responsive Design**: Test on different screen sizes and devices
- **Form Validation**: Try submitting forms with invalid data
- **Image Upload**: Test product image upload functionality

## 🌐 Deployment

### Vercel Deployment
This frontend is configured for easy deployment on Vercel:

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Set `VITE_API_URL` to your production backend URL
3. **Deploy**: Vercel will automatically build and deploy your application

### Environment Variables for Production
```env
VITE_API_URL=https://nearbuy-server-j5wo.onrender.com/api
```

### Build for Production
```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📸 Screenshots / Demo

### Homepage
![Homepage](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=NearBuy+Homepage)

### Marketplace
![Marketplace](https://via.placeholder.com/800x400/10B981/FFFFFF?text=Marketplace+View)

### Product Detail
![Product Detail](https://via.placeholder.com/800x400/F59E0B/FFFFFF?text=Product+Detail+Page)

### Chat Interface
![Chat](https://via.placeholder.com/800x400/EF4444/FFFFFF?text=Real-time+Chat)

### User Dashboard
![Dashboard](https://via.placeholder.com/800x400/8B5CF6/FFFFFF?text=User+Dashboard)

*Screenshots coming soon!*

## 🤝 Contributing

We welcome contributions to make NearBuy Frontend even better! Whether you're fixing bugs, adding features, or improving the UI, your contributions are valuable.

### How to Contribute
1. **Fork** this repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make Changes**: Follow the existing code style and conventions
4. **Test**: Ensure all features work correctly
5. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
6. **Push** to the branch (`git push origin feature/amazing-feature`)
7. **Open** a Pull Request

### Development Guidelines
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling (avoid custom CSS when possible)
- Ensure responsive design works on all screen sizes
- Add appropriate error handling and loading states
- Test your changes thoroughly before submitting

### Areas for Contribution
- 🐛 Bug fixes and improvements
- ✨ New UI components and features
- 🎨 UI/UX improvements and animations
- 📱 Mobile app development (React Native)
- 🔒 Security enhancements
- 🧪 Testing and quality assurance
- 📊 Analytics and user tracking
- 🌍 Internationalization (i18n)
- ♿ Accessibility improvements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🔗 Backend Repository

This frontend connects to the NearBuy backend API. For the complete full-stack application:

**Backend Repository**: [NearBuy Backend](https://github.com/rashiddalii/nearbuy-server)

The backend provides:
- RESTful API endpoints
- Socket.io server for real-time communication
- MongoDB database integration
- User authentication and authorization
- File upload handling with Cloudinary
- Message and chat management

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the fast build tool
- **Tailwind CSS** for the utility-first CSS framework
- **Socket.io** for real-time communication capabilities
- **React Router** for client-side routing

## 📞 Support

If you have any questions or need help:
- 📧 Email: mrashidali7540@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/rashiddalii/nearbuy-client/issues)

---

**Made with ❤️ by the NearBuy Community**

*Building stronger communities, one transaction at a time.*
