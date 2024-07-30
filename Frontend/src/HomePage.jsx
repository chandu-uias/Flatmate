import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import searchIcon from './assets/loupe.png';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState('');

  // Function to handle search button click
  const handleSearch = () => {
    if (selectedLocation) {
      navigate(`/MainPagesort/${selectedLocation}`);
    } else {
      navigate('/MainPagesort');
    }
  };

  // Function to handle navigation when clicking on a specific location
  const handleNavigation = (location) => {
    navigate(`/MainPagesort/${location}`);
  };

  return (
    <div>
      <Navbar />
      <section className="home">
        <div className="home-content">
          <h1>Welcome to Our <span>Roomies</span> Search</h1>
          <p>Find the best roommates as per your preference</p>

          <div className="search-container">
            <span><img src={searchIcon} alt="Search Icon" /></span>
            {/* Dropdown select for locations */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="search-bar"
            >
              <option value="">Select a location</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Banglore">Banglore</option>
              <option value="Mumbai">Mumbai</option>
            </select>
            {/* Search button */}
            <div className="search-button-home" onClick={handleSearch}>Search</div>
          </div>
        </div>
        {/* <div className="home-image"></div> */}
      </section>
      <section>
        <h2 className='home-heading'>View Rooms in Popular Places</h2>
        <div className='Homemaincard'>
          {/* Clickable cards for each location */}
          <div className='home-card card1' onClick={() => handleNavigation('Hyderabad')}>
            <h3 className='textpop'>Hyderabad</h3>
          </div>
          <div className='home-card card2' onClick={() => handleNavigation('Banglore')}>
            <h3 className='textpop'>Banglore</h3>
          </div>
          <div className='home-card card3' onClick={() => handleNavigation('Mumbai')}>
            <h3 className='textpop'>Mumbai</h3>
          </div>
        </div>
      </section>
      <footer className='footer'>
                <div className="foot-content">
                    <div className="foot_ele footer-links">
                        <a href="/about">About Us</a>
                        <a href="/blogs">Blogs</a>
                        <a href="/reviews">Reviews</a>
                    </div>
                    <div className="foot_ele footer-contact">
                        <h4>Contact us </h4>
                        <a href="mailto:example@example.com">example@example.com</a>
                    </div>
                    <div className="foot_address">
                        <p>Address: 123 Street, City, Country</p>
                    </div>
                </div>
            </footer>
    </div>
  );
}

export default HomePage;
