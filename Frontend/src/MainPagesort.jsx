import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './MainPage.css';
import boy1 from './assets/Profile images/boy1.jpg';
import girl from './assets/Profile images/girl.jpg';
import rupee from './assets/rupee.png';
import axios from 'axios';
import { Link, useLocation, useParams } from 'react-router-dom';

function MainPagesort() {
  const [listings, setListings] = useState([]);
  const location = useLocation();
  const { location: locationParam } = useParams();

  const userPreferences = {
    location: locationParam || location.state?.location || '',
    rentRange: [1000, 5000], // Example rent range preference
    lookingFor: 'female' // Example gender preference
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:7000/listings');
        setListings(response.data);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      }
    };
    fetchListings();
  }, [locationParam]); // Include locationParam in dependency array for useEffect

  const calculateMatchPercentage = (listing) => {
    let score = 0;
    const totalCriteria = 3;

    if (userPreferences.location.toLowerCase() === listing.location.toLowerCase()) {
      score += 1;
    }

    if (listing.rent >= userPreferences.rentRange[0] && listing.rent <= userPreferences.rentRange[1]) {
      score += 1;
    }

    if (listing.lookingFor.toLowerCase() === userPreferences.lookingFor.toLowerCase()) {
      score += 1;
    }

    return (score / totalCriteria) * 100;
  };

  const filteredListings = listings.filter(listing =>
    userPreferences.location
      ? listing.location.toLowerCase() === userPreferences.location.toLowerCase()
      : true
  );

  return (
    <div>
      <Navbar />
      <div className="mainContent">
        {filteredListings.length === 0 ? (
          <p>No listings found for {userPreferences.location}</p>
        ) : (
          filteredListings.map((listing, index) => (
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
                  <div className="match-percentage">
                    <p>Match</p>
                    <h4>{calculateMatchPercentage(listing).toFixed(0)}%</h4>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default MainPagesort;
