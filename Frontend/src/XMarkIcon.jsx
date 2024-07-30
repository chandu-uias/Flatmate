import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom

function XMarkIcon({ size = 32 }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirect to the main page
    navigate('/MainPage');
  };

  return <AiOutlineCloseCircle onClick={handleClick} size={size}/>;
}

export default XMarkIcon;
