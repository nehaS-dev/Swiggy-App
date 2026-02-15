import React, { useState } from "react";
import "./Auth.css";

const Signup = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [contactError, setContactError] = useState("");

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleSendOtp = () => {
    console.log("Send OTP button clicked");

    let hasError = false;
    setEmailError("");
    setPasswordError("");
    setContactError("");

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

    if (contact === "") {
      setContactError("Contact Required");
      hasError = true;
    } else if (contact.length !== 10) {
      setContactError("Invalid Contact");
      hasError = true;
    }

    if (hasError) return;
    else {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000);
      setOtp(generatedOtp);
      setIsOtpSent(true);
      console.log("Generated OTP:", generatedOtp);
    }
  };

  const handleSubmit = () => {
    setSubmitError("");
    if (enteredOtp === "") {
      setSubmitError("Please enter otp");
      return;
    }
    if (enteredOtp !== otp.toString()) {
      setSubmitError("Invalid OTP");
      return;
    }
    onSuccess(email);
    onClose();
  };

  return (
    <div className="signup_menu" onClick={(e) => e.stopPropagation()}>
      <div className="signup_header">
        <h2 className="signup_name">Signup</h2>
        <button className="signup_close" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="signup_auth">
        <input
          className="signup_input"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="email_error">{emailError}</p>}

        <input
          className="signup_input"
          type="tel"
          placeholder="Enter your contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        {contactError && <p className="contact_error">{contactError}</p>}

        <input
          className="signup_input"
          type="password"
          placeholder="create atleast 6 digit password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className="password_error">{passwordError}</p>}

        <button type="button" className="send_otp" onClick={handleSendOtp}>
          {isOtpSent ? "Resend OTP" : "Send OTP"}
        </button>

        {isOtpSent && (
          <>
            <input
              className="otp_input"
              type="text"
              placeholder="Enter OTP"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
            />
            {submitError && <p className="otp_error">{submitError}</p>}
            <button
              type="button"
              className="submit_signup"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default Signup;
