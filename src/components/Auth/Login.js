import React, { useEffect, useState } from "react";
import "./auth.css";
const Login = ({ onClose, onSuccess  }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleOnSubmit = () => {
    let hasError = false;

    // reset previous errors
    setEmailError("");
    setPasswordError("");

    // Email validation
    if (email === "") {
      setEmailError("Email is required");
      hasError = true;
    } else if (!email.includes("@")) {
      setEmailError("Enter a valid email");
      hasError = true;
    }

    // Password validation
    if (password === "") {
      setPasswordError("Enter password");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    }

    if (hasError) return;

    // All good
    
    onSuccess(email);
  };

  return (
    <div
      className="login_menu"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="login_header">
        <h2 className="login_name">Login</h2>
        <button className="close_btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="login_form">
        <input
          className="login_input"
          type="email"
          placeholder="Enter Your Email Id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && (
          <span className="error_text" style={{ color: "#e23744" }}>
            {emailError}
          </span>
        )}

        <input
          className="login_input"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && (
          <span className="error_text" style={{ color: "#e23744" }}>
            {passwordError}
          </span>
        )}


        <button 
        className="login_submit" 
        type="button" 
        onClick={handleOnSubmit}
        >
          Submit
        </button>

      </div>
    </div>
  );
};
export default Login;
