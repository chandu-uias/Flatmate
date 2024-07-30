import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import AddListing from './AddListing';
import RegisterLogin from './RegisterLogin';
import MainPage from './MainPage';
import Navbar from './Navbar';
import Detailedview from './Detailedview'; 
import SamplePage from './SamplePage';
import MainPagesort from './MainPagesort';

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/AddListing" element={<AddListing />} />
          <Route path="/Register" element={<RegisterLogin />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/MainPage" element={<MainPage />} />
          <Route path="/sample" element={<SamplePage />} />
          <Route path="/Detailedview/:id" element={<Detailedview />} />
          <Route path="/MainPagesort" element={<MainPagesort />} />
          <Route path="/MainPagesort/:location" element={<MainPagesort />} /> {/* Dynamic route for location */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
