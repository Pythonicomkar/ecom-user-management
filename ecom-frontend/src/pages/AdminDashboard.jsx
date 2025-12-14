import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await API.get("admin/users/");
      setUsers(res.data);
    } catch (err) {
      alert("Failed to load users");
    }
  };

  const toggleStatus = async (id) => {
    try {
      await API.put(`admin/user/${id}/status/`);
      fetchUsers();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2>Admin Dashboard</h2>

        {/* Logout Button */}
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  <td>{u.status}</td>
                  <td>
                    <button
                      className="primary-btn"
                      onClick={() => toggleStatus(u.id)}
                    >
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
