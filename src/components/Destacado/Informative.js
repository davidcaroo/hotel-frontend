import React, { useEffect, useState } from 'react';
import './Informative.css';

const Informative = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch('http://localhost/hotel-api/api/info/getHotelInfo.php')
      .then(res => res.json())
      .then(data => setInfo(data))
      .catch(err => console.error('Error al obtener información:', err));
  }, []);

  if (!info) return <div className="informative-loading">Cargando...</div>;

  return (
    <section className="informative-section">
      <div className="informative-text">
        <h2>{info.titulo}</h2>
        <h3>{info.subtitulo}</h3>
        <p>{info.descripcion}</p>
      </div>

      <div className="informative-images">
        {info.imagen1 && <img src={`http://localhost/hotel/uploads/${info.imagen1}`} alt="Hotel 1" />}
        {info.imagen2 && <img src={`http://localhost/hotel/uploads/${info.imagen2}`} alt="Hotel 2" />}
        {info.imagen3 && <img src={`http://localhost/hotel/uploads/${info.imagen3}`} alt="Hotel 3" />}
        {info.imagen4 && <img src={`http://localhost/hotel/uploads/${info.imagen4}`} alt="Hotel 4" />}
      </div>
    </section>
  );
};

export default Informative;
