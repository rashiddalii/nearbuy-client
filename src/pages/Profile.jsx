import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { authAPI, userAPI } from '../services/api';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch profile and stats in parallel
        const [profileRes, statsRes] = await Promise.all([
          authAPI.getProfile(),
          userAPI.getStats()
        ]);
        
        // Extract user data from API response
        const userData = profileRes.data.data;
        const profileData = {
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          location: userData.location || '',
          bio: userData.bio || '',
          avatar: userData.avatar || '👤',
        };
        
        setProfile(profileData);
        setFormData(profileData);
        setStats(statsRes.data.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          toast.error("Failed to load profile data.");
        }
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);



  // Validation functions
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation (optional but if provided, must be valid)
    if (formData.phone && formData.phone.trim()) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }
    
    // Bio validation (optional but if provided, must be reasonable length)
    if (formData.bio && formData.bio.trim().length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error('Please fix the errors before saving');
      return;
    }
    
    try {
      setIsSaving(true);
      
      // Only send fields that have values to avoid overwriting with empty strings
      const updateData = {};
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
          updateData[key] = formData[key];
        }
      });

      // Use authAPI for consistent baseURL and token handling
      const res = await authAPI.updateProfile(updateData);
      const updatedProfile = {
        ...profile,
        ...res.data
      };
      setProfile(updatedProfile);
      setFormData(updatedProfile);
      setIsEditing(false);
      setErrors({});
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
    setErrors({});
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile || !stats) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-600">Failed to load profile data. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isSaving 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isSaving 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gray-600 hover:bg-gray-700'
                } text-white`}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-900">{profile.name || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                {isEditing ? (
                  <div>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-900">{profile.email || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                {isEditing ? (
                  <div>
                    <input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Enter your phone number (e.g., +923001234567)"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-900">{profile.phone || <span className="text-gray-500 italic">Not provided - Click edit to add</span>}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Enter your location (e.g., City, State)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profile.location || <span className="text-gray-500 italic">Not provided - Click edit to add</span>}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                {isEditing ? (
                  <div>
                    <textarea
                      value={formData.bio || ''}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      rows={3}
                      placeholder="Tell others about yourself, your selling experience, or what you specialize in..."
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.bio ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.bio && (
                      <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
                    )}
                    <p className="text-gray-500 text-sm mt-1">
                      {formData.bio ? formData.bio.length : 0}/500 characters
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-900">{profile.bio || <span className="text-gray-500 italic">No bio provided - Click edit to add a description about yourself</span>}</p>
                )}
              </div>
            </div>
          </div>

          {/* <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Settings</h2>
            <div className="space-y-4">
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Change Password
              </button>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Notification Settings
              </button>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Privacy Settings
              </button>
            </div>
          </div> */}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Avatar & Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-4">
              {profile.avatar || '👤'}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{profile.name}</h3>
            <p className="text-gray-600 mb-4">{profile.location || 'Location not set'}</p>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.activeListings || 0}</div>
                <div className="text-sm text-gray-600">Active Listings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.soldItems || 0}</div>
                <div className="text-sm text-gray-600">Items Sold</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center mt-4">
              <div>
                <div className="text-lg font-bold text-purple-600">{stats.totalViews || 0}</div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
              <div>
                <div className="text-lg font-bold text-red-600">{stats.totalSaves || 0}</div>
                <div className="text-sm text-gray-600">Total Saves</div>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Seller Rating</h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                ⭐ {stats.averageRating ? stats.averageRating.toFixed(1) : 'N/A'}
              </div>
              <p className="text-gray-600 text-sm">{stats.totalReviews || 0} reviews</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button 
                onClick={() => navigate('/my-listings')}
                className="w-full text-left text-blue-600 hover:text-blue-700 py-2 transition-colors"
              >
                📝 View My Listings
              </button>
              <button 
                onClick={() => navigate('/messages')}
                className="w-full text-left text-blue-600 hover:text-blue-700 py-2 transition-colors"
              >
                💬 View Messages
              </button>
              <button 
                onClick={() => navigate('/saved-items')}
                className="w-full text-left text-blue-600 hover:text-blue-700 py-2 transition-colors"
              >
                💾 Saved Items
              </button>
              <button 
                onClick={() => navigate('/add-listing')}
                className="w-full text-left text-blue-600 hover:text-blue-700 py-2 transition-colors"
              >
                ➕ Add New Listing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;