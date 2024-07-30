// ContactPage.jsx

import React from 'react';
import './ContactPage.css';
import Navbar from './Navbar';
function ContactPage() {
    return (
        <div>
        <Navbar/>
        <div className="contact-container">
            <div className="contact-form">
                <h1>Contact Us</h1>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" rows="4" required></textarea>

                <button type="submit">Submit</button>
            </div>
            <div className="contactPhoto">
            </div>
        </div>
        </div>
    );
}

export default ContactPage;
