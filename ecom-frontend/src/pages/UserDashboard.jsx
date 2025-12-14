import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await API.get("profile/");
      setUser(res.data);
    } catch (err) {
      alert("Failed to load profile");
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="container">
        <div className="card">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2>User Dashboard</h2>

        {/* Logout Button */}
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

        <br /><br />

        {/* Profile Photo */}
        {user.profile_photo && (
          <img
            className="profile-img"
            src={`http://127.0.0.1:8000${user.profile_photo}`}
            alt="Profile"
          />
        )}

        {/* User Details Table */}
        <table>
          <tbody>
            <tr>
              <td><strong>Username</strong></td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td><strong>Email</strong></td>
              <td>{user.email || "-"}</td>
            </tr>
            <tr>
              <td><strong>Address</strong></td>
              <td>{user.address || "-"}</td>
            </tr>
            <tr>
              <td><strong>Contact</strong></td>
              <td>{user.contact_number || "-"}</td>
            </tr>
            <tr>
              <td><strong>Date of Birth</strong></td>
              <td>{user.dob || "-"}</td>
            </tr>
            <tr>
              <td><strong>Status</strong></td>
              <td>{user.status}</td>
            </tr>
            <tr>
              <td><strong>Role</strong></td>
              <td>{user.role}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDashboard;
