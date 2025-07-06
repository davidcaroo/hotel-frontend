import React, { useState, useEffect } from 'react';
import apiClient from '../api';
import { toast } from 'react-toastify';
import './DashboardPage.css';

const DashboardPage = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingReservation, setEditingReservation] = useState(null);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = () => {
        apiClient.get('/reservation/read_user_reservations.php')
            .then(response => {
                if (response.data.records) {
                    setReservations(response.data.records);
                }
            })
            .catch(error => {
                toast.error("No se pudieron cargar tus reservas.");
                console.error("Error fetching reservations:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();

        const dataToSend = {
            ...editingReservation,
            check_in_date: editingReservation.check_in_date,
            check_out_date: editingReservation.check_out_date,
            num_guests: parseInt(editingReservation.num_guests),
        };

        apiClient.post('/reservation/editReservations.php', dataToSend)
            .then(response => {
                if (response.data.success) {
                    toast.success("Reserva actualizada");
                    setEditingReservation(null);
                    fetchReservations();
                } else {
                    toast.error("Error al actualizar la reserva");
                }
            })
            .catch(err => {
                console.error(err);
                toast.error("Error al conectar con el servidor");
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingReservation(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    if (loading) {
        return <div className="dashboard-container"><p>Cargando tus reservas...</p></div>;
    }

    return (
        <div className="dashboard-container">
            <h1>Mis Reservas</h1>
            {reservations.length > 0 ? (
                <div className="reservations-list">
                    {reservations.map(res => (
                        <div key={res.id} className="reservation-card">
                            <img src={res.room_image_url} alt={res.room_name} className="reservation-room-image" />
                            <div className="reservation-details">
                                <h3>{res.room_name}</h3>
                                <p><strong>Check-in:</strong> {res.check_in_date.split('-').reverse().join('/')}</p>
                                <p><strong>Check-out:</strong> {res.check_out_date.split('-').reverse().join('/')}</p>
                                <p><strong>Huéspedes:</strong> {res.num_guests}</p>
                                <p><strong>Costo Total:</strong> ${parseFloat(res.total_cost).toFixed(2)}</p>
                                <p><strong>Estado:</strong> <span className={`status status-${res.status}`}>{res.status}</span></p>
                                <small>Reservado el: {new Date(res.created_at).toLocaleString()}</small>

                                <button
                                    onClick={() => setEditingReservation({
                                        ...res,
                                        check_in_date: formatDate(res.check_in_date),
                                        check_out_date: formatDate(res.check_out_date),
                                    })}
                                    className="edit-btn"
                                >
                                    Editar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Aún no has hecho ninguna reserva.</p>
            )}

            {/* Modal de edición */}
            {editingReservation && (
                <div className="edit-modal">
                    <form className="edit-form" onSubmit={handleEditSubmit}>
                        <h2>Editar Reserva</h2>
                        <label>Fecha Check-in:</label>
                        <input
                            type="date"
                            name="check_in_date"
                            value={editingReservation.check_in_date}
                            onChange={handleInputChange}
                            required
                        />
                        <label>Fecha Check-out:</label>
                        <input
                            type="date"
                            name="check_out_date"
                            value={editingReservation.check_out_date}
                            onChange={handleInputChange}
                            required
                        />
                        <label>Número de Huéspedes:</label>
                        <input
                            type="number"
                            name="num_guests"
                            value={editingReservation.num_guests}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="edit-buttons">
                            <button type="submit" className="btn-confirm">Guardar cambios</button>
                            <button type="button" className="btn-cancel" onClick={() => setEditingReservation(null)}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
