import React, { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Comprobar si hay una sesión activa al cargar la app
        apiClient.get('/user/status.php')
            .then(response => {
                if (response.data.loggedIn) {
                    setUser(response.data.user);
                }
            })
            .catch(error => console.error("Error checking auth status:", error))
            .finally(() => setLoading(false));
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = async () => {
        await apiClient.post('/user/logout.php');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
    return useContext(AuthContext);
};