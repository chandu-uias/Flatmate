
import React, { useState } from 'react';
import './loginPage.css'; // Import CSS for LoginPage styling
// import { sendOTP } from './api'; // Import API function to send OTP

function LoginPage() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async () => {
    try {
      // Call API to send OTP to the provided email
      await sendOTP(email);
      setOtpSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleLogin = () => {
    // Here you would send an API request to your backend to verify the OTP
    // For simplicity, I'm just setting loggedIn to true if OTP is correct
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail('');
    setOtpSent(false);
    setOtp('');
  };

  return (
    <div className="login-page">
      {loggedIn ? (
        <div>
          <p>Welcome, you are logged in!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
          {!otpSent ? (
            <button onClick={handleSendOtp}>Send OTP</button>
          ) : (
            <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
              />
              <button onClick={handleLogin}>Login</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
