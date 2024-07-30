import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './Detailedview.css';
import axios from 'axios';
import girl from './assets/Profile images/girl.jpg';
import boy1 from './assets/Profile images/boy1.jpg';
import location from './assets/logo3.jpg';

import NonSmoker from './assets/Habits/Non Smoker.jpg';
import Earlybird from './assets/Habits/Earlybird.jpg';
import FitnessFreak from './assets/Habits/Fitness Freak.jpg';
import MusicLover from './assets/Habits/Music Lover.jpg';
import NightOwl from './assets/Habits/nightowl.jpg';
import NonAlcoholic from './assets/Habits/Non Alcoholic.jpg';
import PartyLover from './assets/Habits/Party Lover.jpg';
import PetLover from './assets/Habits/Pet Lover.jpg'; 
import Sporty from './assets/Habits/Sporty.jpg';
import Studious from './assets/Habits/Studious.jpg';
import Vegan from './assets/Habits/Vegan.jpg';
import Wanderer from './assets/Habits/Wanderer.jpg';

import AirConditioner from './assets/Amenities/Air Conditioner.jpg';
import Cook from './assets/Amenities/Cook.jpg';
import Fridge from './assets/Amenities/Fridge.jpg';
import Kitchen from './assets/Amenities/Kitchen.jpg';
import Parking from './assets/Amenities/Parking.jpg';
import PowerBackup from './assets/Amenities/PowerBackup.jpg';
import Tv from './assets/Amenities/Tv.jpg';
import Washingmachine from './assets/Amenities/washing machine.jpg';
import Wifi from './assets/Amenities/Wifi.jpg';

import { useParams } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

// Mapping text to images
const imageMapping = {
  "NonSmoker": NonSmoker,
  "Earlybird": Earlybird,
  "FitnessFreak": FitnessFreak,
  "Music Lover": MusicLover,
  "Night Owl": NightOwl,
  "Non Alcoholic": NonAlcoholic,
  "Party Lover": PartyLover,
  "Pet Lover": PetLover,
  "Sporty": Sporty,
  "Studious": Studious,
  "Vegan": Vegan,
  "Wanderer": Wanderer,

  "Air Conditioner": AirConditioner,
  "Cook": Cook,
  "Fridge": Fridge,
  "Kitchen": Kitchen,
  "Parking": Parking,
  "Power Backup": PowerBackup,
  "Tv": Tv,
  "Washingmachine": Washingmachine,
  "Wifi": Wifi,
};

const Detailedview = () => {
  const [listing, setListing] = useState(null);
  
  const userEmail = "maggie331@gmail.com"; // Replace with actual user's email if available
  const { id } = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/listings/${id}`);
        console.log(response.data);
        setListing(response.data);
      } catch (error) {
        console.error("Failed to fetch listing:", error);
      }
    };

    fetchListing();
  }, [id]);

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="detailed-container">
        <div className="left-container">
          <div className="img-detailed">
            {listing.lookingFor === "female" ? (
              <img src={girl} alt="girl-img" />
              
            ) : (
              <img src={boy1} alt="boy-img" />
             
            )}
          </div>
          <div className='img-description'>
            <h2>{listing.name}</h2>
            <div className="contact-buttons">
          

<a href={`mailto:${userEmail}`} className="detailed-button email-button">
  <i className="fas fa-envelope"></i>
</a>

  <a href={`https://wa.me/8247332524`} target="_blank" rel="noopener noreferrer" className="detailed-button whatsapp-button">
  <i className="fab fa-whatsapp"></i>
</a>

            </div>
          </div>
        </div>

        <div className="right-container">
          <div className="person-detailed">
            <div className='details Location-detailed'>
              <h2>Location</h2>
              <p><img src={location} alt="location-img" /> {listing.location}</p>
            </div>
          </div>

          <div className='BasicInfo-detailed'>
            <div className='details basicheading-detailed'>
              <h2>Basic Info</h2>
            </div>
            <div className='para-detailed'>
              {/* <div>
                <p>Gender</p>
                <h2>{listing.gender}</h2>
              </div> */}
              <div>
                <p>Approx Rent</p>
                <h5>{listing.rent}</h5>
              </div>
              <div>
                <p>Occupancy</p>
                <h5>{listing.occupancy}</h5>
              </div>
              <div>
                <p>Looking for</p>
                <h5>{listing.lookingFor}</h5>
              </div>
            </div>
          </div>

          <div className='details picture-detailed'>
            <h2>Pictures</h2>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {listing.photos.map((photo, index) => (
                  <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                    <img src={`http://localhost:7000/${photo}`} className="d-block w-100" alt={`room${index + 1}`} />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          <div className='details preferences-detailed'>
            <h2>Preferences</h2>
            <div className='preferences-row'>
              {listing.preferences.map((preference, index) => (
                <div key={index} className='preference-item'>
                  {imageMapping[preference] && (
                    <img src={imageMapping[preference]} alt={`preference-${index}`} />
                  )}
                  <h5>{preference}</h5>
                </div>
              ))}
            </div>
          </div>

          <div className='details Highlited-detailed'>
            <h2>Highlights</h2>
            <div className='highlight-row-detailed'>
              {listing.highlights.map((highlight, index) => (
                <div key={index} className='highlight-item'>
                  {imageMapping[highlight] && (
                    <img src={imageMapping[highlight]} alt={`highlight-${index}`} />
                  )}
                  <h5>{highlight}</h5>
                </div>
              ))}
            </div>
          </div>

          <div className='details Amenties-detailed'>
            <h2>Amenities</h2>
            <div className='amen-row'>
              {listing.amenities.map((amenity, index) => (
                <div key={index} className='amenity'>
                  {imageMapping[amenity] && (
                    <img src={imageMapping[amenity]} alt={`amenity-${index}`} />
                  )}
                  <h5>{amenity}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detailedview;
