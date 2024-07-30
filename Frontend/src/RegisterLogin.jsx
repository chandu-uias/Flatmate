import React, { useState } from 'react';
import './RegisterLogin.css'; // Import the CSS file
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterLogin() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      // Handle registration logic here
      console.log('Registering with:', username, email, password, mobile);
      try {
        const response = await axios.post("http://localhost:5000/employee", {
          username,
          email,
          password,
          mobile
        });
        console.log('Registration response:', response.data);
        setErrorMessage('');
        setLoginSuccessMessage('Registered successfully');
      } catch (error) {
        console.error("Failed to register:", error);
        setLoginSuccessMessage('');
        if (error.response && error.response.status === 400 && error.response.data.message === 'Email is already registered') {
          setErrorMessage('Email is already registered');
        } else {
          setErrorMessage('Failed to register. Please try again later.');
        }
      }
    } else {
      // Handle user login logic here
      try {
        const response = await axios.post("http://localhost:5000/userLogin", {
          email,
          password,
        });
        console.log('Login response:', response.data);
        setErrorMessage('');
        setLoginSuccessMessage('Login Successful');
        setTimeout(() => {
          navigate('/AddListing');
        }, 1000);
      } catch (error) {
        console.error("Failed to login:", error);
        setLoginSuccessMessage('');
        if (error.response && error.response.status === 401) {
          setErrorMessage('Invalid credentials. Please try again.');
        } else {
          setErrorMessage('Failed to login. Please try again later.');
        }
      }
    }
  };

  const handleRegisterSwitch = () => {
    setIsRegistering(true);
    setErrorMessage('');
  };

  const handleUserLoginSwitch = () => {
    setIsRegistering(false);
    setErrorMessage('');
  };

  return (
    <div>
      <Navbar />
      <div className="containerreg">
        <div className="form-wrapper">
          {isRegistering ? (
            <>
              <h2 className='loginh2'>Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className='passreg'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    title="Password must contain at least one special character, one capital letter, and be at least 8 characters long"
                  />
                  {password.length > 0 && (
                    <small className="text-danger">
                      {password.length < 8 && "Password must be at least 8 characters long. "}
                      {!/(?=.*[A-Z])/.test(password) && "Password must contain at least one capital letter. "}
                      {!/(?=.*[@$!%*?&])/.test(password) && "Password must contain at least one special character. "}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    placeholder="Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                {loginSuccessMessage && <p className="success-message">{loginSuccessMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit" className="form-group loginbutton">
                  Register
                </button>
              </form>
              <p className="form-group">
                Already have an account? <button onClick={handleUserLoginSwitch} className="link"><b>Login here</b></button>.
              </p>
            </>
          ) : (
            <>
              <h2 className='loginh2'>User Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    className='emailinput'
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className='passinput'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {loginSuccessMessage && <p className="success-message">{loginSuccessMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit" className="form-group loginbutton">
                  Login
                </button>
              </form>
              <p className="form-group">
                Don't have an account? <button onClick={handleRegisterSwitch} className="link"><b>Register here</b></button>.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterLogin;
