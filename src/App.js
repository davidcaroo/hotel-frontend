import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// Componente AppContent que usa el contexto de autenticación
function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, loading } = useAuth();

  const navigate = (page) => {
    setCurrentPage(page);
  };

  // No renderizar nada hasta que se verifique el estado de la sesión
  if (loading) {
    return <div className="loading-full-page">Cargando...</div>;
  }

  const renderPage = () => {
    // Si el usuario intenta ir al dashboard sin estar logueado, llévalo al login
    if (currentPage === 'dashboard' && !user) {
      return <LoginPage navigate={navigate} />;
    }

    switch (currentPage) {
      case 'login':
        return <LoginPage navigate={navigate} />;
      case 'register':
        return <RegisterPage navigate={navigate} />;
      case 'dashboard':
        return <DashboardPage />;
      case 'home':
      default:
        return <HomePage navigate={navigate} />;

    }
  };

  return (
    <div className="App">
      <Header navigate={navigate} />
      <main>
        {renderPage()}
      </main>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={5000} theme="light" />
    </div>
  );
}

// Componente principal App que envuelve todo con el AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;