import React from 'react';
import './Destacado.css';

const Destacado = () => {
    return (
        <section className="destacado-section">
            {/* Contenido izquierdo */}
            <div className="left-content">

                {/* Título principal */}
                <h1 className="main-title">SUITE ROOM</h1>

                {/* Subtítulo */}
                <p className="sub-title">RECONOCIDA</p>

                {/* Descripción */}
                <p className="description">
                    Esta habitación cuenta con los siguientes servicios: Desayuno incluido, Piscina infinita, Spa y masajes, Wifi, Vista al mar. La habitación se encuentra en el piso 30 y cuenta con Restaurante gourmet. Se aceptan mascotas, número máximo de huéspedes 2 (dos).
                </p>

                {/* Botón de reserva */}
                <button className="reserve-button">RESERVA AQUÍ</button>
            </div>

            {/* Contenido derecho */}
            <div className="right-content">
                {/* Imagen de la suite room */}
                <img src="https://i.pinimg.com/736x/c2/0e/c5/c20ec5f6f761cf8aa9dbbe9a05b9081a.jpg" alt="Suite Room" className="suite-image" />

                {/* Sello verde */}
                <div className="award-badge">
                    <img src="https://i.pinimg.com/736x/9e/35/de/9e35def67b7deaa18295241ae07eb737.jpg" alt="Sello de reconocimiento" className="badge-icon" />
                </div>
            </div>
        </section>
    );
};

export default Destacado;