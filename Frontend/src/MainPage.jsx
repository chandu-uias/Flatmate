import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './MainPage.css';
import boy1 from './assets/Profile images/boy1.jpg';
import girl from './assets/Profile images/girl.jpg';
import rupee from './assets/rupee.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MainPagesort() {
  const [listings, setListings] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [showAll, setShowAll] = useState(true); // State to manage showing all listings

  useEffect(() => {
    // Fetch listings data when the component mounts
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:7000/listings');
        setAllListings(response.data); // Store all listings in allListings state
        setListings(response.data); // Initially, set listings to all listings
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      }
    };
    fetchListings();
  }, []);

  // Function to show all listings
  const showAllListings = () => {
    setListings(allListings); // Set listings to all listings
    setShowAll(true); // Update showAll state
  };

  // Function to show only a subset of listings
  const showSubsetListings = () => {
    // Replace with logic to filter and show subset if needed
    // For example, set listings to some filtered subset
    setShowAll(false); // Update showAll state
  };

  return (
    <div>
      <Navbar />
      <div className="mainContent">
        <div className="listingBar">
          <button className={showAll ? 'selected' : ''} onClick={showAllListings}>All Listings</button>
          {/* Add more buttons for different categories if needed */}
        </div>
        {/* Render listings based on showAll state */}
        {listings.map((listing, index) => (
          <Link to={`/Detailedview/${listing._id}`} key={index} className="peopleCard">
            <div className="peopleProfile">
              {listing.lookingFor === "female" ? (
                <img src={girl} alt="girl-img" />
              ) : (
                <img src={boy1} alt="boy-img" />
              )}
            </div>
            <div className="profileContent">
              <div className="profile-name">
                <h3>{listing.name}</h3>
                {/* Render other listing details */}
                <p>{listing.location}</p>
              </div>
              <div className="card-row">
                <div className="money">
                  <p>Rent</p>
                  <div className="rent">
                    <img src={rupee} alt="rupee" />
                    <h4>{listing.rent}</h4>
                  </div>
                </div>
                <div className="card-info">
                  <p>Looking for</p>
                  <h4>{listing.lookingFor}</h4>
                </div>
                <div className="card-info">
                  <p>Looking for</p>
                  <h4>Roommate</h4>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MainPagesort;
