import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import CSS for Navbar styling
import logoImage from './assets/theroomie-logo.webp' // Import the image file

function Navbar() {
    return (
        <nav className="navbarnav">
            <div className="containernav">
                <Link to="/" className="logo">
                    <img src={logoImage} alt="Roommate Logo" />
                </Link>
                <ul className="nav-links">
                    <li><Link to="/" className="navactive">Home</Link></li>
                    <li><Link to="/about" className="navactive">About Us</Link></li>
                    <li><Link to="/contact" className="navactive">Contact Us</Link></li>
                    <li><Link to="/MainPage" className="navactive">Mainpage</Link></li>
                    {/* <li><Link to="/Detailedview/:id" className="active">DetailedView</Link></li> */}
                </ul>
                <div className="buttonsnav">
                    <Link to="/AddListing" className="btnnav">Add Listing</Link>
                    <Link to="/Register" className="btnnav">Register/Login</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
