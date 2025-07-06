import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { motion, AnimatePresence } from 'framer-motion';
import apiClient from '../../api';

import 'react-datepicker/dist/react-datepicker.css';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose, room }) => {
    const [totalCost, setTotalCost] = useState(0);

   const validationSchema = Yup.object({
    checkIn: Yup.date().required('Requerido').nullable(),
    checkOut: Yup.date().required('Requerido').nullable().min(Yup.ref('checkIn'), "Check-out no puede ser anterior"),
    guests: Yup.number().min(1, 'Mínimo 1').required('Requerido'),
  });

  const formik = useFormik({

    initialValues: { checkIn: null, checkOut: null, guests: 1 },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {

      const submissionData = {
        roomId: room.id,
        checkIn: values.checkIn.toISOString().split('T')[0],
        checkOut: values.checkOut.toISOString().split('T')[0],
        guests: values.guests,
        totalCost: totalCost,
      };
      
      try {
        // ApiClient que ya tiene withCredentials=true
        const response = await apiClient.post('/reservation/create.php', submissionData);
        toast.success(response.data.message || '¡Reserva confirmada!');
        resetForm();
        onClose();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error al crear la reserva.');
      } finally {
        setSubmitting(false);
      }
    },
  });
    
    useEffect(() => {
        const { checkIn, checkOut, guests } = formik.values;
        if (checkIn && checkOut && checkOut > checkIn) {
            const diffTime = Math.abs(checkOut - checkIn);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setTotalCost(diffDays * room.price_per_night * guests);
        } else {
            setTotalCost(0);
        }
    }, [formik.values.checkIn, formik.values.checkOut, formik.values.guests, room.price_per_night]);


    const modalVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 50 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-backdrop" onClick={onClose}>
                    <motion.div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        <button className="close-button" onClick={onClose}>×</button>
                        <h2>Reservar: {room.name}</h2>
                        <form onSubmit={formik.handleSubmit}>
                            

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="checkIn">Fecha de Check-in</label>
                                    <DatePicker
                                        id="checkIn"
                                        selected={formik.values.checkIn}
                                        onChange={date => formik.setFieldValue('checkIn', date)}
                                        selectsStart
                                        startDate={formik.values.checkIn}
                                        endDate={formik.values.checkOut}
                                        minDate={new Date()}
                                        placeholderText="Seleccionar fecha"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                    {formik.touched.checkIn && formik.errors.checkIn ? <div className="error-message">{formik.errors.checkIn}</div> : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="checkOut">Fecha de Check-out</label>
                                    <DatePicker
                                        id="checkOut"
                                        selected={formik.values.checkOut}
                                        onChange={date => formik.setFieldValue('checkOut', date)}
                                        selectsEnd
                                        startDate={formik.values.checkIn}
                                        endDate={formik.values.checkOut}
                                        minDate={formik.values.checkIn || new Date()}
                                        placeholderText="Seleccionar fecha"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                    {formik.touched.checkOut && formik.errors.checkOut ? <div className="error-message">{formik.errors.checkOut}</div> : null}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="guests">Número de Huéspedes</label>
                                <input id="guests" type="number" min="1" {...formik.getFieldProps('guests')} />
                                {formik.touched.guests && formik.errors.guests ? <div className="error-message">{formik.errors.guests}</div> : null}
                            </div>

                            <div className="total-cost">
                                <h3>Costo Total Estimado:</h3>
                                <p>${totalCost.toFixed(2)}</p>
                            </div>

                            <button type="submit" className="submit-button" disabled={formik.isSubmitting}>
                                {formik.isSubmitting ? 'Confirmando...' : 'Confirmar Reserva'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;