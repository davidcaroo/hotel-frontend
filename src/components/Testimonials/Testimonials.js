import React, { useEffect, useState } from 'react';
import './Testimonials.css';

const Testimonials = () => {
    const [testimonios, setTestimonios] = useState([]);

    useEffect(() => {
        fetch('http://localhost/hotel-api/api/comments/getTestimonios.php') // ajusta tu URL
            .then(res => res.json())
            .then(data => setTestimonios(data))
            .catch(err => console.error('Error cargando testimonios:', err));
    }, []);

    return (
        <section className="testimonios-section">
            <h2 className="testimonios-title">TESTIMONIOS</h2>
            <div className="testimonios-container">
                {testimonios.map((t) => (
                    <div className="testimonial-card" key={t.id}>
                        <img src={t.imagen} alt={t.nombre} />

                        <h3 className="testimonial-name">{t.nombre.toUpperCase()}</h3>
                        <p className="testimonial-msg">{t.mensaje}</p>
                        <div className="testimonial-stars">
                            {'★'.repeat(t.calificacion)}{'☆'.repeat(5 - t.calificacion)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
