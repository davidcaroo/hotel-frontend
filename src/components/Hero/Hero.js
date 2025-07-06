// src/components/Hero.js
import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-container">
            <div className="hero-content">
                <div className="hero-image">
                    <img
                        src="https://i.pinimg.com/736x/22/67/30/22673006042a649a36a509cffeeacb63.jpg"
                        alt="Recepción del hotel"
                    />
                </div>
                <div className="hero-text">
                    <h2 className="hero-title">QUIENES <br /> SOMOS</h2>
                    <h4 className="hero-subtitle">OASIS RETREAT</h4>
                    <p className="hero-description">
                        Somos el destino ideal para quienes buscan una experiencia de descanso y lujo en armonía con la naturaleza.
                        Nos destacamos por ofrecer un servicio personalizado, habitaciones exclusivas con diseño único y un ambiente
                        acogedor que invita a la relajación. Nuestro compromiso es brindar a nuestros huéspedes una estancia inolvidable,
                        combinando comodidad, hospitalidad y experiencias auténticas.
                    </p>
                    <button className="hero-button">LEER MÁS</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
