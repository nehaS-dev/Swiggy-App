import React, { useState, useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import "./Header.css";
import "../Auth/auth.css";

const Header = ({ searchText, setSearchText }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [userId, setUserId] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertLoginMessage, setAlertLoginMessage] = useState("");

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  const handleSignupSuccess = (email) => {
    setAlertMessage("Signup Successful");

    setUserId(email.split("@")[0]); // 👈 same behavior as login
    localStorage.setItem("userId", email.split("@")[0]);
    setShowSignup(false);

    setTimeout(() => {
      setAlertMessage("");
    }, 1500);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleLoginSuccess = (email) => {
    setAlertLoginMessage("Login Successful");

    setUserId(email);
    localStorage.setItem("userId", email);
    setShowLogin(false);
    setTimeout(() => {
      setAlertLoginMessage("");
    }, 1500);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setShowLogin(false);
      }
    };
    if (showLogin) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [showLogin]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setShowSignup(false);
      }
    };
    if (showSignup) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [showSignup]);

  useEffect(() => {
    const storedUser = localStorage.getItem("userId");
    if (storedUser) {
      setUserId(storedUser);
    }
  }, []);

  return (
    <header className="header">
      <div className="header_logo">Swiggy</div>

      <div className="header_search">
        <div className="location_search">
          <span className="location_icon">
            <MdLocationOn />
          </span>
          <span className="location_text">Gurgaon</span>
          <span className="location_divider">|</span>
        </div>

        <input
          type="text"
          className="restaurant_search"
          placeholder="Search for Restaurant"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="auth_buttons">
        {userId ? (
          <>
            <span className="user_id"> {userId.split("@")[0]}</span>
            <button
              className="logout_button"
              onClick={() => {
                setUserId(null);
                localStorage.removeItem("userId");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="login_button" onClick={handleLoginClick}>
              Login
            </button>
            <button className="signup_button" onClick={handleSignupClick}>
              Signup
            </button>
          </>
        )}
      </div>

      {showLogin && (
        <div className="auth_overlay" onClick={() => setShowLogin(false)}>
          <Login
            onClose={() => setShowLogin(false)}
            onSuccess={handleLoginSuccess}
          />
        </div>
      )}
      {alertLoginMessage && (
        <div className="custom_alert">{alertLoginMessage}</div>
      )}

      {showSignup && (
        <div className="auth_overlay" onClick={() => setShowSignup(false)}>
          <Signup
            onClose={() => setShowSignup(false)}
            onSuccess={handleSignupSuccess}
          />
        </div>
      )}
      {alertMessage && <div className="custom_alert">{alertMessage}</div>}
    </header>
  );
};

export default Header;
