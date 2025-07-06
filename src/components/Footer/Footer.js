import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      {/* Título */}
      <h2 className="footer-title">MÀS INFORMACIÒN</h2>

      {/* Imagen central */}
      <div className="footer-image-wrapper">
        <img
          src="./assets/LuxuryHotel.png"
          alt="Restaurant"
          className="footer-main-img"
        />
      </div>

      {/* Información (Ubicación y Contacto) */}
      <div className="footer-info-row">
        {/* Ubicación */}
        <div className="footer-info-box">
          <div className="footer-icon-circle location-icon">
            <img
              src="./assets/Location.png"
              alt="Icon Location"
            />
          </div>
          <div className="footer-text">
            <h4>UBICACIÒN</h4>
            <p>123 Anywhere St., Any City, ST 12345</p>
          </div>
        </div>

        {/* Contacto */}
        <div className="footer-info-box">
          <div className="footer-icon-circle contact-icon">
            <img
              src="./assets/Phone.png"
              alt="Icon Phone"
            />
          </div>
          <div className="footer-text">
            <h4>CONTACTO</h4>
            <p>+123-456-7890 / 123-456-7890</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;