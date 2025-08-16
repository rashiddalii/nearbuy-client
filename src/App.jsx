import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import AddListingPage from "./pages/AddListing";
import EditListingPage from "./pages/EditListing";
import HomePage from "./pages/Home";
import MarketplacePage from "./pages/Marketplace";
import ProductDetailPage from "./pages/ProductDetail";
import AboutPage from "./pages/About";
import MyListingsPage from "./pages/MyListings";
import MessagesPage from "./pages/Messages";
import ConversationPage from "./pages/Conversation";
import ProfilePage from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Navbar from "./components/Navbar";
import socketService from "./services/socket";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  // Initialize socket connection when app starts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      socketService.connect();
    }
  }, []);

  const token = localStorage.getItem('token');

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route 
              path="/" 
              element={
                token ? <Navigate to="/dashboard" replace /> : <HomePage />
              } 
            />
            <Route 
              path="/marketplace" 
              element={
                token ? <Navigate to="/dashboard" replace /> : <MarketplacePage />
              } 
            />
            <Route 
              path="/about" 
              element={
                token ? <Navigate to="/dashboard" replace /> : <AboutPage />
              } 
            />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-listing"
              element={
                <PrivateRoute>
                  <AddListingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-listing/:id"
              element={
                <PrivateRoute>
                  <EditListingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-listings"
              element={
                <PrivateRoute>
                  <MyListingsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <PrivateRoute>
                  <MessagesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/conversation/:conversationId"
              element={
                <PrivateRoute>
                  <ConversationPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            {/* Optionally a catch-all route */}
            {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
          </Routes>
        </div>
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
