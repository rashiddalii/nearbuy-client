// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        toast.error("Failed to load user info.");
      })
      .finally(() => setLoading(false));
  }, []);

   const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged out successfully!", { position: "top-right" });
        setTimeout(() => {
        navigate("/login");
        }, 1000);
    };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Welcome, {user?.name || user?.email || "User"}!
            </h2>
            <p className="text-gray-600">You are now logged in 🎉</p>

            {/* Placeholder for future dashboard content */}
            <div className="mt-6 p-4 bg-gray-50 rounded border">
              <p className="text-sm text-gray-500">More features coming soon!</p>
            </div>
             <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4"
                >
                Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
