import React from 'react';
import './FrontPage.css';
import heroImage from '../assets/Hero.png'; 


const HomePage = () => {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="overlay"></div>
      <div className="content">
        <h1>Manage Your Team Efficiently</h1>
        <p>CRUD system for employee data</p>
        <div className="buttons">
          <a href="/form" className="btn btn-primary">Post New User</a>
          <a href="/home" className="btn btn-outline">View Dashboard</a>
        </div>
      </div>

    </section>
   
  );
};

export default HomePage;
