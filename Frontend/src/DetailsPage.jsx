// // Listings.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainPage from './MainPage';
import './DetailsPage.css'; // Import the CSS file

const DetailsPage = ({ setListings }) => {
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
  }, [setListings]);

  return (
    <div>
      <h1>All Listings</h1>
      {/* <MainPage listings={listings} /> */}
      {/* No need to render anything here, MainPage will handle the rendering */}
    </div>
  );
};

export default DetailsPage;
