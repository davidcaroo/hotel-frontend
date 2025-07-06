import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';
import { FiLogIn, FiLogOut, FiUser } from 'react-icons/fi';

const Header = ({ navigate }) => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('home');
    };

    // Función para obtener primer nombre
    const getFirstName = (fullName) => {
        if (!fullName) return '';
        return fullName.trim().split(' ')[0];
    };

    return (
        <header className="header">
            <div className="container header-container">
                <div className="logo" onClick={() => navigate('home')}>
                    <span className="logo-text">HOTEL <br />BOUTIQUE</span>
                </div>

                <nav className="nav-box">
                    <a onClick={() => navigate('home')}>Inicio</a>

                    {!user && <a onClick={() => navigate('reservas')}>Reservas</a>}

                    <a onClick={() => navigate('contacto')}>Contacto</a>
               

                    {user ? (
                        <div className="user-dropdown">
                            <div className="user-toggle">
                                <FiUser size={16} />
                                <span>Hola, {getFirstName(user.name)}</span>
                            </div>
                            <div className="dropdown-menu">
                                <a onClick={() => navigate('dashboard')}>Mis Reservas</a>
                                <a onClick={handleLogout}>
                                    <FiLogOut size={16} style={{ marginRight: '4px' }} />
                                    Cerrar Sesión
                                </a>
                            </div>
                        </div>
                    ) : (
                        <button className="login-btn" onClick={() => navigate('login')}>
                            <FiLogIn size={18} />
                        </button>
                    )}


                </nav>
            </div>
        </header>
    );
};

export default Header;
