
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import apiClient from '../api';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = ({ navigate }) => {
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object({
            email: Yup.string().email('Email no válido').required('Requerido'),
            password: Yup.string().required('Requerido'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await apiClient.post('/user/login.php', values);
                toast.success(response.data.message);
                login(response.data.user);
                navigate('home');
            } catch (error) {
                toast.error(error.response?.data?.message || 'Error al iniciar sesión');
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="login-container">
            <form onSubmit={formik.handleSubmit} className="login-form">
                <h2>Iniciar Sesión</h2>

                <div className="input-group">
                    <FaEnvelope className="input-icon" />
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        {...formik.getFieldProps('email')}
                    />
                </div>
                {formik.touched.email && formik.errors.email && (
                    <div className="error-text">{formik.errors.email}</div>
                )}

                <div className="input-group">
                    <FaLock className="input-icon" />
                    <input
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        {...formik.getFieldProps('password')}
                    />
                </div>
                {formik.touched.password && formik.errors.password && (
                    <div className="error-text">{formik.errors.password}</div>
                )}

                <button type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
                </button>

                <p className="switch-text">
                    ¿No tienes una cuenta?{' '}
                    <span onClick={() => navigate('register')}>Regístrate</span>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
