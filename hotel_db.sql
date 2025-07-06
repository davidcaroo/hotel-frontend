-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-07-2025 a las 04:46:00
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hotel_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hotel_info`
--

CREATE TABLE `hotel_info` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `subtitulo` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen1` varchar(255) DEFAULT NULL,
  `imagen2` varchar(255) DEFAULT NULL,
  `imagen3` varchar(255) DEFAULT NULL,
  `imagen4` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hotel_info`
--

INSERT INTO `hotel_info` (`id`, `titulo`, `subtitulo`, `descripcion`, `imagen1`, `imagen2`, `imagen3`, `imagen4`, `created_at`) VALUES
(1, 'Bienvenido al Hotel Luxury', 'Tu escape de lujo en el corazón de la ciudad', 'El Hotel Luxor ofrece alojamiento de alta calidad con servicios premium como piscina infinita, spa de clase mundial, restaurante gourmet y habitaciones con vistas panorámicas.', 'https://picsum.photos/id/1018/800/600 ', 'https://picsum.photos/id/1015/800/600 ', 'https://picsum.photos/id/1016/800/600 ', 'https://picsum.photos/id/1019/800/600 ', '2025-07-02 06:13:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `check_in_date` date DEFAULT NULL,
  `check_out_date` date DEFAULT NULL,
  `num_guests` int(11) NOT NULL,
  `total_cost` decimal(10,2) NOT NULL,
  `status` enum('confirmed','pending','cancelled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservations`
--

INSERT INTO `reservations` (`id`, `room_id`, `user_id`, `check_in_date`, `check_out_date`, `num_guests`, `total_cost`, `status`, `created_at`) VALUES
(1, 1, 1, '2025-06-27', '2025-07-03', 1, 1500.00, 'confirmed', '2025-06-28 04:14:18'),
(2, 3, 1, '2025-06-29', '2025-07-02', 3, 540.00, 'pending', '2025-06-28 04:18:04'),
(3, 1, 1, '2025-07-01', '2025-07-05', 1, 1000.00, 'confirmed', '2025-06-29 03:31:01'),
(4, 1, 1, '2025-07-01', '2025-07-02', 6, 1500.00, 'pending', '2025-06-29 03:46:36'),
(5, 1, 2, '2025-07-01', '2025-07-02', 1, 250.00, 'confirmed', '2025-07-01 02:44:15'),
(6, 5, 3, '2025-07-01', '2025-07-07', 1, 160.00, 'confirmed', '2025-07-01 04:26:31'),
(7, 1, 3, '2025-07-01', '2025-07-15', 4, 500.00, 'confirmed', '2025-07-01 04:29:08'),
(8, 1, 3, '2025-06-10', '2025-07-20', 3, 2000.00, 'confirmed', '2025-07-01 19:04:26'),
(9, 1, 3, '2025-07-01', '2025-07-10', 2, 500.00, 'pending', '2025-07-01 23:29:43'),
(10, 5, 4, '2025-07-05', '2025-07-06', 4, 80.00, 'pending', '2025-07-05 23:10:44'),
(11, 1, 4, '2025-07-04', '2025-07-05', 2, 1000.00, 'pending', '2025-07-06 02:35:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `amenities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`amenities`)),
  `price_per_night` decimal(10,2) NOT NULL,
  `image_urls` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`image_urls`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `description`, `amenities`, `price_per_night`, `image_urls`) VALUES
(1, 'Suite Deluxe con Vista al Mar', 'Disfrute de un lujo incomparable en nuestra Suite Deluxe. Ofrece vistas panorámicas al océano, una cama king-size y un balcón privado para su relajación.', '[\"WiFi Gratis\", \"Aire Acondicionado\", \"TV de 75\'\' con Netflix\", \"Minibar\", \"Balcón Privado\", \"Jacuzzi\"]', 250.00, '[\"https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\", \"https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\"]'),
(2, 'Habitación Doble Estándar', 'Perfecta para amigos o familiares, nuestra habitación doble cuenta con dos cómodas camas matrimoniales y todas las comodidades modernas para una estancia placentera.', '[\"WiFi Gratis\", \"Aire Acondicionado\", \"TV de 55\'\'\", \"Escritorio de Trabajo\"]', 150.00, '[\"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\", \"https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\"]'),
(3, 'Bungalow Privado en el Jardín', 'Escape del mundo en su propio bungalow privado rodeado de exuberantes jardines tropicales. Ideal para parejas que buscan una escapada romántica y tranquila.', '[\"WiFi Gratis\", \"Ventilador de Techo\", \"Terraza Privada\", \"Hamaca\", \"Cocina Pequeña\"]', 180.00, '[\"https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\", \"https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80\"]'),
(4, 'Suite Room', 'Habitación especial de lujo con vista panorámica.', '[\"Aire acondicionado\", \"TV de pantalla plana\", \"Minibar\", \"Caja fuerte\", \"Baño privado con ducha de hidromasaje\"]', 500.00, '[\"https://i.pinimg.com/736x/b6/aa/91/b6aa915a8af1139561f0b9ec24a2e5af.jpg \"]'),
(5, 'Habitación Sencilla', 'Espacio cómodo y funcional ideal para viajeros individuales. Incluye todas las comodidades básicas para una estancia agradable.', '[\"WiFi Gratis\", \"Aire Acondicionado\", \"TV de 40\'\", \"Escritorio\", \"Cama Individual\"]', 80.00, '[\"https://i.pinimg.com/736x/d3/82/ab/d382ab131d64ca04a2f6cfb2ca4d70f8.jpg\"]'),
(6, 'Salón Privado VIP', 'El espacio más exclusivo del hotel, diseñado para quienes buscan lujo absoluto. Cuenta con jacuzzi privado, iluminación ambiental y servicios premium.', '[\"Jacuzzi Privado\", \"Iluminación Ambiental\", \"Minibar Premium\", \"Sistema de Sonido Surround\", \"Vista Panorámica\", \"Área de Descanso Amplia\"]', 750.00, '[\"https://i.pinimg.com/736x/2d/2e/5a/2d2e5a01a6d1060e99bf4a21db1b5749.jpg\"]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `mensaje` text NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `calificacion` int(11) DEFAULT NULL CHECK (`calificacion` between 1 and 5),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `testimonials`
--

INSERT INTO `testimonials` (`id`, `nombre`, `mensaje`, `imagen`, `calificacion`, `created_at`) VALUES
(1, 'María González', '¡Una experiencia inolvidable! El servicio fue excepcional y la habitación muy cómoda. Definitivamente regresaré.', 'https://i.pravatar.cc/150?img=1', 5, '2025-07-01 23:39:13'),
(2, 'Carlos Méndez', 'Buena atención y excelente desayuno. Solo el wifi fallaba ocasionalmente, pero en general fue buena.', ' https://i.pravatar.cc/150?img=2', 4, '2025-07-01 23:39:13'),
(3, 'Laura Torres', 'No recomiendo este hotel para estancias largas. Las camas no eran cómodas y el aire acondicionado hacía ruido.', ' https://i.pravatar.cc/150?img=3', 2, '2025-07-01 23:39:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `created_at`) VALUES
(1, 'Usuario Invitado', 'guest@example.com', 'invitado123', '2025-06-29 04:36:05'),
(2, 'HB ARQUITECTURA Y CONSTRUCCIÓN', 'Juliana@gmail.com', '$2y$10$4qrfDBa10I0tDSNkc5oaZOBt1QQNQdAuDYqzF1NiFAKlVxBVkg.iK', '2025-07-01 02:43:59'),
(3, 'David Caro Morales', 'david123@gmail.com', '$2y$10$tqpqzKgwippaYgg7o1jhnuFT2YXJ0wqBoUT//PoNHJtGEDupMb/YC', '2025-07-01 03:08:31'),
(4, 'Jennifer Suárez', 'jennifer123@gmail.com', '$2y$10$a.rnRqMw91u/aTfa90PYa.5T.oFcY56LssHF1lHI4OqhbV5xtqNx.', '2025-07-05 23:09:45');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `hotel_info`
--
ALTER TABLE `hotel_info`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indices de la tabla `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `hotel_info`
--
ALTER TABLE `hotel_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
