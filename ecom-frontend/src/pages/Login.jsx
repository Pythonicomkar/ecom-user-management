import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { PublicAPI } from "../services/api";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // Detect admin login intent
  const isAdminLogin = location.state?.admin === true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await PublicAPI.post("login/", {
        username: formData.get("username"),
        password: formData.get("password"),
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      alert("Invalid credentials or inactive account");
    }
  };

  return (
    <div className="container">
      <div className="card login-card">
        {/* Admin login link */}
        {!isAdminLogin && (
          <div className="admin-link">
            <Link to="/login" state={{ admin: true }}>
              Admin Login
            </Link>
          </div>
        )}

        <h2>{isAdminLogin ? "Admin Login" : "User Login"}</h2>

        <form onSubmit={handleSubmit}>
          <input name="username" placeholder="Username" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          <div className="login-actions">
            <button className="primary-btn" type="submit">
              Login
            </button>

            {!isAdminLogin && (
              <Link to="/register" className="register-link">
                Register
              </Link>
            )}
          </div>
        </form>

        {isAdminLogin && (
          <div className="back-link">
            <Link to="/login">← Back to User Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
