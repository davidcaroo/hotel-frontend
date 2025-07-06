import React from 'react';
import './Banner.css';

const Banner = ({ navigate }) => {
    return (
        <section className="banner">
            <div className="banner-overlay">
                <div className="banner-content">
                    <h1 className="title">OASIS <br /> RETREAT</h1>
                    <p className="subtitle">DONDE LA COMODIDAD SE ENCUENTRA CON EL LUJO</p>
                    <button className="btn-reserva" onClick={() => navigate('reservas')}>
                        RESERVA AQUÍ
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Banner;
