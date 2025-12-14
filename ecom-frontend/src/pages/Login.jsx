import React from "react";
import { useState } from "react";
import {PublicAPI} from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await PublicAPI.post("login/", { username, password });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      alert("Login failed. Check credentials or status.");
    }
  };

  return (
  <div className="container">
    <div className="card" style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primary-btn" type="submit">
          Login
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        New user? <a href="/register">Register</a>
      </p>
    </div>
  </div>
);

}

export default Login;
