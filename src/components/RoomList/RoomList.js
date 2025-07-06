import React, { useState, useEffect } from 'react';
import apiClient from '../../api';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion'; // Importamos para la animación del overlay

import RoomCard from '../RoomCard/RoomCard';
import BookingModal from '../BookingModal/BookingModal';
import './RoomList.css';

const RoomList = ({ navigate }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  // --- NUEVO ESTADO PARA LA ANIMACIÓN ---
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const { user } = useAuth();

  useEffect(() => {
    apiClient.get('/room/read.php')
      .then(response => {
        if (response.data.records) {
          setRooms(response.data.records);
        } else {
          setRooms([]);
        }
      })
      .catch(error => {
        console.error("Error fetching rooms:", error);
        setError('No se pudieron cargar las habitaciones. Por favor, intente más tarde.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleOpenModal = (room) => {
    if (user) {
      setSelectedRoom(room);
      setIsModalOpen(true);
    } else {

      setIsRedirecting(true);

      setTimeout(() => {
        toast.info("Por favor, inicia sesión para poder reservar.");
        navigate('login');

      }, 1200); 
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  if (loading) return <p className="status-message">Cargando habitaciones...</p>;
  if (error) return <p className="status-message error">{error}</p>;

  return (
    // Usamos un React.Fragment (<>) para poder tener elementos hermanos
    <>
      {/* --- NUEVO COMPONENTE DE CARGA --- */}
      {/* Usamos AnimatePresence para que la animación de salida funcione */}
      <AnimatePresence>
        {isRedirecting && (
          <motion.div 
            className="redirecting-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="redirecting-spinner"></div>
            <p>Redirigiendo al inicio de sesión...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="rooms" className="room-list-section">
        <div className="container">
          <h2 className="section-title">Nuestras Habitaciones</h2>
          <div className="room-list-grid">
            {rooms.length > 0 ? (
              rooms.map(room => (
                <RoomCard key={room.id} room={room} onReserve={handleOpenModal} />
              ))
            ) : (
              !loading && <p className="status-message">No hay habitaciones disponibles en este momento.</p>
            )}
          </div>
        </div>
        
        {selectedRoom && (
          <BookingModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            room={selectedRoom}
          />
        )}
      </section>
    </>
  );
};


export default RoomList;

