import axios from 'axios';

// Configuración base de la URL de tu API
const apiClient = axios.create({
    baseURL: 'http://localhost/hotel-api/api',
    // IMPORTANTE: Esto permite que axios envíe la cookie de sesión en cada petición
    withCredentials: true
});

export default apiClient;