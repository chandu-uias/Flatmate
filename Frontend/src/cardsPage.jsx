// MainPage.jsx
import React from 'react';
// import Navbar from './Navbar';
import './cardsPage.css'
import boy1 from './assets/Profile images/boy1.jpg';
import rupee from './assets/rupee.png';

function cardsPage() {
    return (
        <div>
            <div className="mainContent">
                <div className="peopleCard">
                    <div className="peopleProfile">
                        <img src={boy1} alt='boy-img'></img>
                    </div>
                    <div className="profileContent">
                        <div className="profile-name">
                            <h3>Rakesh Kumar</h3>
                            <p>
                            {/*loaction img here*/}
                            New Nallakunta,Hyderabad,Telangana,India</p>
                        </div>
                        <div className="card-row">
                                <div className="money">
                                    <p>Rent</p>
                                    <div className='rent'>
                                        <img src={rupee}></img>
                                        <h4>4000</h4>
                                    </div>
                                </div>
                                <div className="card-info">
                                    <p>Looking for</p>
                                    <h4>Male</h4>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="peopleCard">
                    <div className="peopleProfile">
                        <img src={boy1} alt='boy-img'></img>
                    </div>
                    <div className="profileContent">
                        <div className="profile-name">
                            <h3>Rakesh Kumar</h3>
                            <p>
                            {/*loaction img here*/}
                            New Nallakunta,Hyderabad,Telangana,India</p>
                        </div>
                        <div className="card-row">
                                <div className="money">
                                    <p>Rent</p>
                                    <div className='rent'>
                                        <img src={rupee}></img>
                                        <h4>4000</h4>
                                    </div>
                                </div>
                                <div className="card-info">
                                    <p>Looking for</p>
                                    <h4>Male</h4>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default cardsPage;
