import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null); // Initialize as null to handle loading state better
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      console.error("No user ID found in localStorage");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/user/${storedUserId}`
      );

      if (response.data) {
        setUser(response.data);
        setFormData(response.data);
      } else {
        console.error("Invalid response structure", response);
      }
    } catch (error) {
      console.error("Error fetching user details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8080/user/update",
        formData
      );
      alert(response.data.message);

      // Check if the username has been updated and update localStorage
      if (formData.username && formData.username !== user.username) {
        localStorage.setItem("userName", formData.username);
      }

      setEditMode(false);
      fetchUserDetails(); // Refresh user details after saving
    } catch (error) {
      console.error("Error updating user details", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching user data
  }

  if (!user) {
    return <div>No user data found. Please log in again.</div>; // Handle missing user data gracefully
  }

  return (
    <div className="profile-container">
      <div className="sidebar">
        <h3>Hello, {user.username || "Guest"}</h3>
        <ul>
          <li>My Orders</li>
          <li>Account Settings</li>
          <li>Payments</li>
          <li>My Stuff</li>
        </ul>
      </div>
      <div className="profile-content">
        <h2>Personal Information</h2>
        {!editMode ? (
          <div className="profile-details">
            <p>Name: {user.username || "N/A"}</p>
            <p>Gender: {user.gender || "N/A"}</p>
            <p>Email: {user.email || "N/A"}</p>
            <p>Mobile Number: {user.contactNumber || "N/A"}</p>
            <button onClick={handleEdit}>Edit</button>
          </div>
        ) : (
          <div className="profile-form">
            <label>Name:</label>
            <input
              type="text"
              name="username"
              value={formData.username || ""}
              onChange={handleInputChange}
            />
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender || ""}
              onChange={handleInputChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
            />
            <label>Mobile Number:</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber || ""}
              onChange={handleInputChange}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
