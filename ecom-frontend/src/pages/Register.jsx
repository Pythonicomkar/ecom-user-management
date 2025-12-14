import React from "react";
import { PublicAPI } from "../services/api";

function Register() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await PublicAPI.post("register/", formData);
      alert("Registration successful. Please login.");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "500px", margin: "auto" }}>
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input name="username" placeholder="Username" required />
          <input name="email" placeholder="Email" />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <input name="contact_number" placeholder="Contact Number" />
          <input name="dob" type="date" />

          {/* Address Field */}
          <textarea
            name="address"
            placeholder="Enter your address"
            rows="3"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontFamily: "inherit",
            }}
          ></textarea>

          <input name="profile_photo" type="file" />

          <button className="primary-btn" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
