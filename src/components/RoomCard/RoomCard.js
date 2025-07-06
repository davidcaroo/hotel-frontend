import React from 'react';
import './RoomCard.css';

const RoomCard = ({ room, onReserve }) => {
    return (
        <div className="room-card">
            <div className="room-image-container">
                <img src={room.image_urls[0]} alt={room.name} className="room-image" />
            </div>
            <div className="room-content">
                <h3 className="room-title">{room.name}</h3>
                <p className="room-description">{room.description}</p>
                <div className="room-amenities">
                    <h4>Amenidades:</h4>
                    <ul>
                        {room.amenities.map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                        ))}
                    </ul>
                </div>
                <div className="room-footer">
                    <p className="room-price">
                        ${parseInt(room.price_per_night)}<span> / noche</span>
                    </p>
                    <button className="reserve-button" onClick={() => onReserve(room)}>
                        Reservar Ahora
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;