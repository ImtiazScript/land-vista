import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaSave, FaFilter } from 'react-icons/fa';
import '../styles/AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-container">
      <section className="about-header">
        <h2>About This Tool</h2>
        <p className="intro-text">
          Welcome to this map-based tool, a proof of concept designed to help you save, manage, and filter your map
          preferences. Whether you're an individual landowner or a company looking to store map locations, this tool can be
          customized to meet your needs.
        </p>
        <img className="map-image" src="/images/screenshot.png" alt="Map Preview" />
      </section>

      <section className="about-content">
        <h3>Project Overview</h3>
        <p>
          This tool allows you to save map centers, create detailed map markers for your properties, and filter saved maps.
          It's designed as a starting point for a larger platform that can be customized based on user requirements. The tool
          is currently set up to save data in the browser's local storage.
        </p>

        <div className="features-section">
          <div className="feature-box">
            <FaMapMarkerAlt className="icon" />
            <p>Save Map Center</p>
            <p>Users can store their preferred map center coordinates and revisit them anytime.</p>
          </div>
          <div className="feature-box">
            <FaSave className="icon" />
            <p>Save Map Details</p>
            <p>Create and save your land's information with custom markers and descriptions.</p>
          </div>
          <div className="feature-box">
            <FaFilter className="icon" />
            <p>Filter Saved Maps</p>
            <p>Easily filter and manage your saved maps based on location, markers, or other preferences.</p>
          </div>
        </div>

        <p>
          As this is a proof of concept, features like authorization and cloud storage are not yet implemented. All data is
          saved locally in your browser storage. If you need advanced features, feel free to reach out, and I can build upon
          this foundation according to your requirements.
        </p>

        <p className="customization-offer">
          <strong>Looking for a custom solution?</strong> This tool can be customized to suit personal or corporate needs. If
          you'd like to place an order or request additional features, I'm happy to discuss and implement them.
        </p>
      </section>

      <section className="contact-section">
        <h3>Contact Information</h3>
        <p>If you'd like to get in touch, here are my details:</p>
        <ul className="contact-list">
          <li>
            <FaEnvelope /> Email: <a href="mailto:emtiaj2011@gmail.com">emtiaj2011@gmail.com</a>
          </li>
          <li>
            <FaLinkedin /> LinkedIn: <a href="https://www.linkedin.com/in/imtiaz-bd/">Imtiaz Ahmed</a>
          </li>
          <li>
            <FaGithub /> GitHub: <a href="https://github.com/imtiazUAP">github.com/imtiazUAP</a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;