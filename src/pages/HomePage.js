import React from 'react';
import Banner from '../components/Banner/Banner';
import RoomList from '../components/RoomList/RoomList';
import Hero from '../components/Hero/Hero';
import Destacado from '../components/Destacado/Destacado';
import Testimonials from '../components/Testimonials/Testimonials';
import Informative from '../components/Destacado/Informative';
// Importamos los componentes necesarios para la página de inicio
//

// Pasamos la función 'navigate' para poder redirigir desde RoomList
const HomePage = ({ navigate }) => {
    return (
        <>
            <Banner />
            <Hero />
           
            {/* Pasamos 'navigate' como prop a RoomList */}
            <RoomList navigate={navigate} />
             <Destacado />
             <Testimonials />
             <Informative />
        </>
    );
};

export default HomePage;