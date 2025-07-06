import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import apiClient from '../api';
import './LoginPage.css'; // Reutilizamos el estilo

const RegisterPage = ({ navigate }) => {
    const formik = useFormik({
        initialValues: { fullName: '', email: '', password: '' },
        validationSchema: Yup.object({
            fullName: Yup.string().required('Requerido'),
            email: Yup.string().email('Email no válido').required('Requerido'),
            password: Yup.string().min(6, 'Debe tener al menos 6 caracteres').required('Requerido'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await apiClient.post('/user/register.php', values);
                toast.success(response.data.message);
                navigate('login');
            } catch (error) {
                toast.error(error.response?.data?.message || 'Error en el registro');
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="login-container">
            <form onSubmit={formik.handleSubmit} className="login-form">
                <h2>Crear Cuenta</h2>

                <div className="input-group">
                    <FaUser className="input-icon" />
                    <input
                        id="fullName"
                        type="text"
                        placeholder="Nombre Completo"
                        {...formik.getFieldProps('fullName')}
                    />
                </div>
                {formik.touched.fullName && formik.errors.fullName && (
                    <div className="error-text">{formik.errors.fullName}</div>
                )}

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
                    {formik.isSubmitting ? 'Registrando...' : 'Registrarse'}
                </button>

                <p className="switch-text">
                    ¿Ya tienes una cuenta?{' '}
                    <span onClick={() => navigate('login')}>Inicia Sesión</span>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;
