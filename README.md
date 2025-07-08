```markdown
# Sistema de Reservas de Hotel 🏨

Este es un sistema de reservas de hotel full-stack que cuenta con un frontend moderno y responsive construido con React y un backend robusto gestionado por una API RESTful en PHP y MySQL.
El proyecto permite a los usuarios registrarse, iniciar sesión, ver habitaciones, realizar reservas y gestionar su panel de usuario.

---

## ✨ Características

- **Autenticación de Usuarios**: Sistema completo de registro e inicio de sesión con manejo de sesiones en el backend.
- **Catálogo de Habitaciones**: Muestra de habitaciones con descripciones detalladas, imágenes de alta calidad y precios.
- **Sistema de Reservas**: Formulario de reserva modal e intuitivo que calcula el costo total automáticamente.
- **Panel de Usuario**: Página de "Mis Reservas" donde los usuarios autenticados pueden ver el historial de sus estancias.
- **Diseño Responsive**: Interfaz de usuario adaptable a dispositivos móviles, tablets y de escritorio.
- **Notificaciones en Tiempo Real**: Alertas dinámicas para confirmar acciones o notificar errores.
- **Experiencia de Usuario Mejorada**: Transiciones suaves y animaciones de carga para una navegación más agradable.

---

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- [React.js](https://reactjs.org/): Para construir la interfaz de usuario interactiva.
- [React Context API](https://reactjs.org/docs/context.html): Para la gestión del estado global de autenticación.
- [Axios](https://axios-http.com/): Para realizar peticiones HTTP a la API del backend.
- [Formik y Yup](https://formik.org/): Para la gestión y validación de formularios.
- [React Toastify](https://fkhadra.github.io/react-toastify): Para notificaciones y alertas.
- [Framer Motion](https://www.framer.com/motion/): Para animaciones y transiciones suaves.
- **CSS Moderno**: Diseño con variables CSS y enfoque en la responsividad.

### **Backend**
- **PHP**: Para la lógica de la API RESTful.
- **MySQL**: Base de datos relacional para almacenar usuarios, habitaciones y reservas.
- **Servidor Apache**: Servidor web para correr los scripts de PHP (gestionado con XAMPP).
- **phpMyAdmin**: Para la administración de la base de datos.

---

## 🚀 Instalación y Configuración Local

### **Prerrequisitos**
- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [XAMPP](https://www.apachefriends.org/index.html)

---

### **1. Configuración del Backend (PHP + MySQL)**

1. **Iniciar XAMPP**:  
   Abre el panel de control de XAMPP y inicia los servicios de **Apache** y **MySQL**.

2. **Clonar el Backend**:  
   Copia la carpeta `hotel-api` dentro del directorio `htdocs` de tu instalación de XAMPP.  
   Ruta típica: `C:\xampp\htdocs\hotel-api`

3. **Crear la Base de Datos**:  
   - Abre tu navegador y accede a [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
   - Crea una nueva base de datos llamada `hotel_db`.
   - Selecciona la base de datos `hotel_db` y ve a la pestaña **SQL**.
   - Ejecuta el contenido del archivo `database.sql` para crear tablas y datos iniciales.

4. **Verificar la Conexión**:  
   El archivo de configuración `hotel-api/config/database.php` ya está ajustado para conectarse con `root` y contraseña vacía (configuración por defecto de XAMPP).

---

### **2. Configuración del Frontend (React)**

1. **Clonar el Frontend**:  
   Abre una terminal y clona el repositorio o copia la carpeta `hotel-frontend`.

2. **Navegar al Directorio**:  
   ```bash
   cd hotel-frontend
   ```

3. **Instalar Dependencias**:  
   ```bash
   npm install
   ```

4. **Verificar la Conexión a la API**:  
   El archivo `src/api.js` está configurado para conectarse a `http://localhost/hotel-api/api`.  
   Si usaste la estructura sugerida, no necesitas cambios adicionales.

---

### **3. Ejecutar la Aplicación**

1. Asegúrate de que **Apache** y **MySQL** estén activos en XAMPP.
2. En la terminal, ejecuta:
   ```bash
   npm start
   ```
3. La aplicación se abrirá automáticamente en [http://localhost:3000](http://localhost:3000).

---

## ☁️ Despliegue (Deployment)

### **Frontend (React)**
1. **Generar el Build**:  
   ```bash
   npm run build
   ```
   Esto crea una carpeta `build` con archivos optimizados.

2. **Elegir un Servicio**:  
   - [Netlify](https://www.netlify.com/)
   - [Vercel](https://vercel.com/)
   - Arrastra la carpeta `build` a la interfaz web o conecta tu repositorio de GitHub para despliegue automático.

3. **Variables de Entorno**:  
   Configura la URL de tu API como variable de entorno:  
   ```env
   REACT_APP_API_URL=https://tu-api.com/api
   ```

---

### **Backend (PHP + MySQL)**
1. **Elegir un Hosting**:  
   - Hosting compartido (ej: [Hostinger](https://www.hostinger.com/))
   - VPS (ej: [DigitalOcean](https://www.digitalocean.com/))

2. **Proceso de Despliegue**:  
   - **Base de Datos**: Usa phpMyAdmin en cPanel para importar `hotel_db.sql`.
   - **Archivos PHP**: Sube los archivos de `hotel-api` mediante FTP o el administrador de archivos del hosting.
   - **Configurar Conexión**: Actualiza `config/database.php` con las credenciales del hosting.
   - **Configurar CORS**:  
     En `config/database.php`, cambia la línea:  
     ```php
     header("Access-Control-Allow-Origin: https://tu-frontend-desplegado.com");
     ```

---

## 📜 Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE). Consulta el archivo `LICENSE` para más detalles.
``` 

---
**Autor:** [David Caro](https://github.com/davidcaroo)
@David Caro💡
