-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.43 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.12.0.7122
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for bd_registro_empleados
CREATE DATABASE IF NOT EXISTS `bd_registro_empleados` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bd_registro_empleados`;

-- Dumping structure for table bd_registro_empleados.asistencia
CREATE TABLE IF NOT EXISTS `asistencia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `empleado_id` int NOT NULL,
  `fecha` date NOT NULL,
  `hora_entrada` time DEFAULT NULL,
  `hora_salida` time DEFAULT NULL,
  `Estado_Asist` enum('Tardanza','Asistio','Inasistencia') DEFAULT 'Asistio',
  `Horas_Deuda` decimal(5,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `empleado_id` (`empleado_id`),
  CONSTRAINT `asistencia_ibfk_1` FOREIGN KEY (`empleado_id`) REFERENCES `empleado` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=298 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bd_registro_empleados.asistencia: ~198 rows (approximately)
INSERT INTO `asistencia` (`id`, `empleado_id`, `fecha`, `hora_entrada`, `hora_salida`, `Estado_Asist`, `Horas_Deuda`) VALUES
	(1, 1, '2024-04-15', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(2, 2, '2024-04-15', '09:10:00', '18:00:00', 'Tardanza', 0.00),
	(3, 3, '2024-04-15', '08:15:00', '16:30:00', 'Tardanza', 0.50),
	(4, 4, '2024-04-15', NULL, NULL, 'Inasistencia', 8.00),
	(5, 5, '2024-04-15', '09:00:00', '18:00:00', 'Asistio', 0.00),
	(6, 6, '2024-04-15', '08:10:00', '17:05:00', 'Tardanza', 0.00),
	(7, 7, '2024-04-15', '08:05:00', '17:00:00', 'Tardanza', 0.00),
	(8, 2, '2025-10-01', '08:45:00', '17:30:00', 'Asistio', 0.00),
	(9, 2, '2025-10-02', '09:15:00', '17:45:00', 'Asistio', 0.00),
	(10, 2, '2025-10-03', '08:30:00', '17:15:00', 'Asistio', 0.00),
	(11, 2, '2025-10-06', '08:50:00', '17:40:00', 'Asistio', 0.00),
	(12, 2, '2025-10-07', '09:05:00', '17:50:00', 'Asistio', 0.00),
	(13, 2, '2025-10-08', '08:40:00', '17:30:00', 'Asistio', 0.00),
	(14, 2, '2025-10-09', '08:55:00', '17:45:00', 'Asistio', 0.00),
	(15, 2, '2025-10-10', '09:20:00', '18:00:00', 'Asistio', 0.00),
	(16, 2, '2025-10-13', '08:30:00', '17:20:00', 'Asistio', 0.00),
	(17, 2, '2025-10-14', '08:45:00', '17:35:00', 'Asistio', 0.00),
	(18, 2, '2025-10-15', '09:10:00', '17:55:00', 'Asistio', 0.00),
	(19, 2, '2025-10-16', '08:35:00', '12:00:50', 'Asistio', 0.00),
	(20, 3, '2025-10-01', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(21, 3, '2025-10-02', '08:15:00', '17:15:00', 'Asistio', 0.00),
	(22, 3, '2025-10-03', '08:10:00', '17:10:00', 'Asistio', 0.00),
	(23, 3, '2025-10-06', '08:20:00', '17:20:00', 'Asistio', 0.00),
	(24, 3, '2025-10-07', '08:30:00', '17:30:00', 'Asistio', 0.00),
	(25, 3, '2025-10-08', '08:05:00', '17:05:00', 'Asistio', 0.00),
	(26, 3, '2025-10-09', '08:25:00', '17:25:00', 'Asistio', 0.00),
	(27, 3, '2025-10-10', '09:10:00', '17:40:00', 'Asistio', 0.00),
	(28, 3, '2025-10-13', '08:00:00', '12:00:00', 'Asistio', 0.00),
	(29, 3, '2025-10-14', '08:15:00', '17:20:00', 'Asistio', 0.00),
	(30, 3, '2025-10-15', '08:20:00', '17:15:00', 'Asistio', 0.00),
	(31, 3, '2025-10-16', '08:10:00', '17:00:00', 'Asistio', 0.00),
	(32, 4, '2025-10-01', '08:30:00', '17:30:00', 'Asistio', 0.00),
	(33, 4, '2025-10-02', '08:45:00', '17:45:00', 'Asistio', 0.00),
	(34, 4, '2025-10-03', '08:50:00', '17:40:00', 'Asistio', 0.00),
	(35, 4, '2025-10-06', '08:40:00', '17:35:00', 'Asistio', 0.00),
	(36, 4, '2025-10-08', '08:35:00', '17:30:00', 'Asistio', 0.00),
	(37, 4, '2025-10-09', '09:15:00', '17:45:00', 'Asistio', 0.00),
	(38, 4, '2025-10-10', '08:55:00', '17:50:00', 'Asistio', 0.00),
	(39, 4, '2025-10-13', '08:30:00', '17:25:00', 'Asistio', 0.00),
	(40, 4, '2025-10-14', '08:45:00', '17:40:00', 'Asistio', 0.00),
	(41, 4, '2025-10-15', '08:50:00', '17:45:00', 'Asistio', 0.00),
	(42, 4, '2025-10-16', '08:40:00', '17:30:00', 'Asistio', 0.00),
	(43, 5, '2025-10-01', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(44, 5, '2025-10-02', '08:10:00', '17:10:00', 'Asistio', 0.00),
	(45, 5, '2025-10-03', '08:20:00', '17:20:00', 'Asistio', 0.00),
	(46, 5, '2025-10-06', '08:05:00', '17:05:00', 'Asistio', 0.00),
	(47, 5, '2025-10-07', '08:15:00', '17:15:00', 'Asistio', 0.00),
	(48, 5, '2025-10-08', '08:25:00', '17:25:00', 'Asistio', 0.00),
	(49, 5, '2025-10-10', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(50, 5, '2025-10-13', '08:10:00', '17:10:00', 'Asistio', 0.00),
	(51, 5, '2025-10-14', '09:00:00', '17:30:00', 'Asistio', 0.00),
	(52, 5, '2025-10-15', '08:20:00', '17:20:00', 'Asistio', 0.00),
	(53, 5, '2025-10-16', '08:15:00', '17:15:00', 'Asistio', 0.00),
	(54, 6, '2025-10-01', '08:45:00', '17:45:00', 'Asistio', 0.00),
	(55, 6, '2025-10-02', '08:50:00', '17:50:00', 'Asistio', 0.00),
	(56, 6, '2025-10-03', '08:55:00', '17:55:00', 'Asistio', 0.00),
	(57, 6, '2025-10-06', '08:40:00', '17:40:00', 'Asistio', 0.00),
	(58, 6, '2025-10-07', '08:45:00', '17:45:00', 'Asistio', 0.00),
	(59, 6, '2025-10-08', '08:50:00', '17:50:00', 'Asistio', 0.00),
	(60, 6, '2025-10-09', '08:55:00', '17:55:00', 'Asistio', 0.00),
	(61, 6, '2025-10-10', '08:45:00', '17:45:00', 'Asistio', 0.00),
	(62, 6, '2025-10-13', '08:50:00', '17:50:00', 'Asistio', 0.00),
	(63, 6, '2025-10-14', '08:55:00', '17:55:00', 'Asistio', 0.00),
	(64, 6, '2025-10-15', '08:45:00', '17:45:00', 'Asistio', 0.00),
	(65, 6, '2025-10-16', '08:50:00', '17:50:00', 'Asistio', 0.00),
	(66, 7, '2025-10-01', '08:15:00', '17:15:00', 'Asistio', 0.00),
	(67, 7, '2025-10-02', '08:20:00', '17:20:00', 'Asistio', 0.00),
	(68, 7, '2025-10-03', '08:25:00', '17:25:00', 'Asistio', 0.00),
	(69, 7, '2025-10-06', '08:10:00', '17:10:00', 'Asistio', 0.00),
	(70, 7, '2025-10-08', '08:30:00', '12:30:00', 'Asistio', 0.00),
	(71, 7, '2025-10-09', '09:20:00', '17:30:00', 'Asistio', 0.00),
	(72, 7, '2025-10-10', '08:15:00', '17:15:00', 'Asistio', 0.00),
	(73, 7, '2025-10-13', '08:20:00', '17:20:00', 'Asistio', 0.00),
	(74, 7, '2025-10-14', '08:25:00', '17:25:00', 'Asistio', 0.00),
	(75, 7, '2025-10-15', '08:15:00', '17:15:00', 'Asistio', 0.00),
	(76, 7, '2025-10-16', '08:20:00', '17:20:00', 'Asistio', 0.00),
	(77, 2, '2025-10-17', '09:30:00', '18:15:00', 'Tardanza', 0.50),
	(78, 2, '2025-10-20', '09:25:00', '18:10:00', 'Tardanza', 0.42),
	(79, 2, '2025-10-21', '09:15:00', '20:16:03', 'Tardanza', 0.25),
	(81, 3, '2025-10-17', '08:45:00', '17:30:00', 'Tardanza', 0.75),
	(82, 3, '2025-10-20', '08:50:00', '17:40:00', 'Tardanza', 0.83),
	(83, 3, '2025-10-21', '08:40:00', '17:25:00', 'Tardanza', 0.67),
	(84, 4, '2025-10-17', '09:00:00', '17:45:00', 'Asistio', 0.00),
	(85, 4, '2025-10-20', '08:20:00', '17:15:00', 'Tardanza', 0.33),
	(86, 4, '2025-10-21', NULL, NULL, 'Inasistencia', 8.00),
	(87, 4, '2025-10-22', '08:55:00', '17:50:00', 'Tardanza', 0.92),
	(88, 5, '2025-10-17', '08:30:00', '17:15:00', 'Asistio', 0.00),
	(89, 5, '2025-10-20', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(90, 5, '2025-10-21', '08:15:00', '17:10:00', 'Tardanza', 0.25),
	(91, 5, '2025-10-22', '08:05:00', '17:00:00', 'Asistio', 0.00),
	(92, 6, '2025-10-17', '08:45:00', '17:40:00', 'Tardanza', 0.75),
	(93, 6, '2025-10-20', '08:50:00', '17:45:00', 'Tardanza', 0.83),
	(94, 6, '2025-10-21', '08:55:00', '17:50:00', 'Tardanza', 0.92),
	(95, 6, '2025-10-22', '09:00:00', '17:55:00', 'Tardanza', 1.00),
	(96, 7, '2025-10-17', '08:30:00', '17:20:00', 'Tardanza', 0.50),
	(97, 7, '2025-10-20', '08:40:00', '17:30:00', 'Tardanza', 0.67),
	(98, 7, '2025-10-21', '08:25:00', '17:15:00', 'Tardanza', 0.42),
	(99, 7, '2025-10-22', '08:35:00', '17:25:00', 'Tardanza', 0.58),
	(198, 35, '2025-10-21', '09:30:00', '18:15:00', 'Tardanza', 0.50),
	(199, 35, '2025-10-22', '09:25:00', '18:10:00', 'Tardanza', 0.42),
	(200, 35, '2025-10-23', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(201, 35, '2025-10-24', '09:10:00', '17:55:00', 'Tardanza', 0.17),
	(202, 35, '2025-10-27', '09:00:00', '17:45:00', 'Tardanza', 1.00),
	(203, 35, '2025-10-28', '08:30:00', '17:15:00', 'Asistio', 0.00),
	(204, 35, '2025-10-29', '09:45:00', '18:30:00', 'Tardanza', 1.75),
	(205, 35, '2025-10-30', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(206, 35, '2025-10-31', '09:15:00', '18:00:00', 'Tardanza', 1.25),
	(207, 36, '2025-10-21', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(208, 36, '2025-10-22', '08:10:00', '17:10:00', 'Asistio', 0.00),
	(209, 36, '2025-10-23', '08:30:00', '17:25:00', 'Tardanza', 0.50),
	(210, 36, '2025-10-24', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(211, 36, '2025-10-27', '08:45:00', '17:35:00', 'Tardanza', 0.75),
	(212, 36, '2025-10-28', NULL, NULL, 'Inasistencia', 8.00),
	(213, 36, '2025-10-29', '08:20:00', '17:15:00', 'Tardanza', 0.33),
	(214, 36, '2025-10-30', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(215, 36, '2025-10-31', '08:15:00', '17:10:00', 'Asistio', 0.00),
	(216, 37, '2025-10-21', '08:15:00', '17:10:00', 'Tardanza', 0.25),
	(217, 37, '2025-10-22', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(218, 37, '2025-10-23', '08:45:00', '17:40:00', 'Tardanza', 0.75),
	(219, 37, '2025-10-24', '08:30:00', '17:25:00', 'Tardanza', 0.50),
	(220, 37, '2025-10-27', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(221, 37, '2025-10-28', '09:00:00', '17:55:00', 'Tardanza', 1.00),
	(222, 37, '2025-10-29', '08:10:00', '17:05:00', 'Asistio', 0.00),
	(223, 37, '2025-10-30', '08:50:00', '17:45:00', 'Tardanza', 0.83),
	(224, 37, '2025-10-31', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(225, 38, '2025-10-21', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(226, 38, '2025-10-22', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(227, 38, '2025-10-23', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(228, 38, '2025-10-24', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(229, 38, '2025-10-27', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(230, 38, '2025-10-28', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(231, 38, '2025-10-29', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(232, 38, '2025-10-30', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(233, 38, '2025-10-31', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(234, 39, '2025-10-21', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(235, 39, '2025-10-22', '08:30:00', '17:25:00', 'Tardanza', 0.50),
	(236, 39, '2025-10-23', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(237, 39, '2025-10-24', '08:45:00', '17:40:00', 'Tardanza', 0.75),
	(238, 39, '2025-10-27', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(239, 39, '2025-10-28', '08:20:00', '17:15:00', 'Tardanza', 0.33),
	(240, 39, '2025-10-29', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(241, 39, '2025-10-30', NULL, NULL, 'Inasistencia', 8.00),
	(242, 39, '2025-10-31', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(243, 40, '2025-10-21', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(244, 40, '2025-10-22', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(245, 40, '2025-10-23', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(246, 40, '2025-10-24', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(247, 40, '2025-10-27', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(248, 40, '2025-10-28', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(249, 40, '2025-10-29', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(250, 40, '2025-10-30', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(251, 40, '2025-10-31', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(252, 41, '2025-10-21', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(253, 41, '2025-10-22', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(254, 41, '2025-10-23', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(255, 41, '2025-10-24', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(256, 41, '2025-10-27', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(257, 41, '2025-10-28', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(258, 41, '2025-10-29', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(259, 41, '2025-10-30', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(260, 41, '2025-10-31', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(261, 42, '2025-10-21', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(262, 42, '2025-10-22', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(263, 42, '2025-10-23', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(264, 42, '2025-10-24', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(265, 42, '2025-10-27', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(266, 42, '2025-10-28', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(267, 42, '2025-10-29', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(268, 42, '2025-10-30', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(269, 42, '2025-10-31', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(270, 6, '2025-10-21', '08:50:00', '17:45:00', 'Tardanza', 0.83),
	(271, 6, '2025-10-22', '09:00:00', '17:55:00', 'Tardanza', 1.00),
	(272, 6, '2025-10-23', '08:30:00', '17:25:00', 'Tardanza', 0.50),
	(273, 6, '2025-10-24', '08:15:00', '17:10:00', 'Tardanza', 0.25),
	(274, 6, '2025-10-27', '09:10:00', '18:00:00', 'Tardanza', 1.17),
	(275, 6, '2025-10-28', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(276, 6, '2025-10-29', '08:40:00', '17:35:00', 'Tardanza', 0.67),
	(277, 6, '2025-10-30', '08:00:00', '17:00:00', 'Asistio', 0.00),
	(278, 6, '2025-10-31', '09:05:00', '17:50:00', 'Tardanza', 1.08),
	(279, 1, '2025-10-20', '18:40:30', '20:57:22', 'Asistio', NULL),
	(280, 1, '2025-10-21', '20:27:44', NULL, 'Asistio', NULL),
	(281, 1, '2025-10-21', '20:28:15', NULL, 'Asistio', NULL),
	(282, 1, '2025-10-21', '20:31:25', NULL, 'Asistio', NULL),
	(283, 1, '2025-10-21', '20:52:48', NULL, 'Asistio', NULL),
	(284, 1, '2025-10-21', '20:53:05', NULL, 'Asistio', NULL),
	(285, 1, '2025-10-21', '20:54:10', NULL, 'Asistio', NULL),
	(286, 1, '2025-10-21', '20:55:31', NULL, 'Asistio', NULL),
	(287, 1, '2025-10-21', '20:55:48', '20:55:50', 'Asistio', NULL),
	(288, 1, '2025-10-21', '20:58:02', NULL, 'Asistio', NULL),
	(289, 2, '2025-10-21', '20:59:20', NULL, 'Asistio', NULL),
	(290, 2, '2025-10-21', '20:59:44', NULL, 'Asistio', NULL),
	(291, 2, '2025-10-21', '21:07:53', NULL, 'Asistio', NULL),
	(292, 2, '2025-10-21', '21:18:03', '21:18:08', 'Asistio', NULL),
	(293, 2, '2025-10-21', '21:18:51', '21:18:53', 'Asistio', NULL),
	(294, 6, '2025-10-22', '19:45:30', NULL, 'Asistio', NULL),
	(295, 6, '2025-10-22', '19:45:49', '19:45:51', 'Asistio', NULL),
	(296, 6, '2025-10-22', '20:15:31', '20:15:34', 'Asistio', NULL),
	(297, 2, '2025-10-22', '09:55:31', '09:55:42', 'Asistio', NULL);

-- Dumping structure for table bd_registro_empleados.cargo
CREATE TABLE IF NOT EXISTS `cargo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bd_registro_empleados.cargo: ~17 rows (approximately)
INSERT INTO `cargo` (`id`, `nombre`, `descripcion`) VALUES
	(1, 'Analista de Recursos Humanos', 'Encargado de procesos de seleccion y clima laboral'),
	(2, 'Desarrollador Backend', 'Responsable del desarrollo de la logica del sistema'),
	(3, 'Contador Senior', 'Encargado de la gestion financiera y reportes'),
	(4, 'Especialista en Marketing Digital', 'Manejo de campanas y redes sociales'),
	(5, 'Ejecutivo de Ventas', 'Encargado de captar y fidelizar clientes'),
	(6, 'Analista de Recursos Humanos', 'Encargado de procesos de seleccion y clima laboral'),
	(7, 'Desarrollador Backend', 'Responsable del desarrollo de la logica del sistema'),
	(8, 'Desarrollador Frontend', 'Responsable de la interfaz de usuario'),
	(9, 'Contador Senior', 'Encargado de la gestion financiera y reportes'),
	(10, 'Contador Junior', 'Apoyo en contabilidad y registros'),
	(11, 'Especialista en Marketing Digital', 'Manejo de campanas y redes sociales'),
	(12, 'Community Manager', 'Gestión de redes sociales y comunidad'),
	(13, 'Ejecutivo de Ventas', 'Encargado de captar y fidelizar clientes'),
	(14, 'Gerente de Operaciones', 'Supervisión de operaciones diarias'),
	(15, 'Coordinador de Logistica', 'Gestión de inventario y distribución'),
	(16, 'Ejecutivo de Servicio al Cliente', 'Atencion y soporte a clientes'),
	(17, 'Asistente Administrativo', 'Apoyo administrativo general');

-- Dumping structure for table bd_registro_empleados.departamento
CREATE TABLE IF NOT EXISTS `departamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bd_registro_empleados.departamento: ~9 rows (approximately)
INSERT INTO `departamento` (`id`, `nombre`, `descripcion`) VALUES
	(1, 'Recursos Humanos', 'Prueba descripcion'),
	(2, 'Tecnologia', 'descripcion prueba'),
	(3, 'Finanzas', NULL),
	(4, 'Marketing', NULL),
	(5, 'Ventas', NULL),
	(10, 'Ventas', NULL),
	(11, 'Operaciones', NULL),
	(12, 'Logistica', NULL),
	(13, 'Servicio al Cliente', NULL);

-- Dumping structure for table bd_registro_empleados.empleado
CREATE TABLE IF NOT EXISTS `empleado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `dni` varchar(8) NOT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `fecha_ingreso` date DEFAULT NULL,
  `estado` enum('Activo','Inactivo','Suspendido','Retirado') DEFAULT 'Activo',
  `departamento_id` int DEFAULT NULL,
  `cargo_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`),
  KEY `departamento_id` (`departamento_id`),
  KEY `cargo_id` (`cargo_id`),
  CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`departamento_id`) REFERENCES `departamento` (`id`),
  CONSTRAINT `empleado_ibfk_2` FOREIGN KEY (`cargo_id`) REFERENCES `cargo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bd_registro_empleados.empleado: ~17 rows (approximately)
INSERT INTO `empleado` (`id`, `nombre`, `apellido`, `dni`, `correo`, `telefono`, `fecha_ingreso`, `estado`, `departamento_id`, `cargo_id`) VALUES
	(1, 'Prueba 1', 'Prueba Apellido', '32132132', 'prueba@correo.com', '321321321', '2025-10-22', 'Activo', 12, 16),
	(2, 'Ana', 'Gomez', '87654322', 'ana.gomez@correo.com', '988222333', '2024-02-20', 'Activo', 2, 2),
	(3, 'Luis', 'Ramirez', '22334456', 'luis.ramirez@correo.com', '911223344', '2023-11-10', 'Activo', 3, 3),
	(4, 'Sofia', 'Lopez', '11223345', 'sofia.lopez@correo.com', '977111222', '2024-03-01', 'Activo', 4, 4),
	(5, 'Carlos', 'Martinez', '55667789', 'carlos.martinez@correo.com', '933222333', '2024-03-05', 'Activo', 2, 2),
	(6, 'Laura', 'Fernandez', '66778900', 'laura.fernandez@correo.com', '944333444', '2024-03-10', 'Activo', 1, 1),
	(7, 'Pedro', 'Salazar', '77889901', 'pedro.salazar@correo.com', '955444555', '2024-03-15', 'Activo', 5, 5),
	(35, 'Miguel', 'Diaz', '88991234', 'miguel.diaz@correo.com', '966555666', '2024-02-01', 'Activo', 2, 7),
	(36, 'Rosa', 'Torres', '99002345', 'rosa.torres@correo.com', '977666777', '2024-02-10', 'Activo', 4, 11),
	(37, 'Diego', 'Vargas', '11334567', 'diego.vargas@correo.com', '988777888', '2024-01-20', 'Activo', 2, 8),
	(38, 'Gabriela', 'Morales', '22445678', 'gabriela.morales@correo.com', '999888999', '2024-02-25', 'Activo', 3, 10),
	(39, 'Ricardo', 'Castro', '33556789', 'ricardo.castro@correo.com', '966111222', '2024-03-01', 'Activo', 5, 5),
	(40, 'Patricia', 'Gutierrez', '44667890', 'patricia.gutierrez@correo.com', '977222333', '2024-01-15', 'Activo', 11, 14),
	(41, 'Alejandro', 'Romero', '55778901', 'alejandro.romero@correo.com', '988333444', '2024-02-20', 'Activo', 12, 15),
	(42, 'Valentina', 'Silva', '66889012', 'valentina.silva@correo.com', '999444555', '2024-03-10', 'Activo', 13, 16),
	(47, 'prueba', 'prueba', '32131231', 'prueba@gmail.com', '32132132', '2025-10-21', 'Activo', 10, 15),
	(48, 'Manuel ', 'Lopez', '32132343', 'prueba@gmail.com', '999111222', '2025-10-22', 'Activo', 11, 3);

-- Dumping structure for table bd_registro_empleados.falta
CREATE TABLE IF NOT EXISTS `falta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `empleado_id` int NOT NULL,
  `fecha` date NOT NULL,
  `tipo` enum('TARDANZA','FALTA','SALIDA_ANTICIPADA') NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `estado` enum('PENDIENTE','JUSTIFICADA','RECHAZADA') DEFAULT 'PENDIENTE',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_falta` (`empleado_id`,`fecha`,`tipo`),
  CONSTRAINT `falta_ibfk_1` FOREIGN KEY (`empleado_id`) REFERENCES `empleado` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bd_registro_empleados.falta: ~25 rows (approximately)
INSERT INTO `falta` (`id`, `empleado_id`, `fecha`, `tipo`, `descripcion`, `estado`, `fecha_creacion`) VALUES
	(1, 1, '2024-04-16', 'TARDANZA', 'Retraso por tráfico', 'PENDIENTE', '2025-10-16 16:53:54'),
	(2, 1, '2024-04-18', 'SALIDA_ANTICIPADA', 'Salida por cita médica', 'PENDIENTE', '2025-10-16 16:53:54'),
	(3, 2, '2024-04-15', 'TARDANZA', 'Retraso de 10 minutos', 'PENDIENTE', '2025-10-16 16:53:54'),
	(4, 2, '2024-04-19', 'FALTA', 'Inasistencia sin aviso', 'PENDIENTE', '2025-10-16 16:53:54'),
	(5, 3, '2024-04-17', 'TARDANZA', 'Retraso por problema de transporte', 'PENDIENTE', '2025-10-16 16:53:54'),
	(6, 3, '2024-04-20', 'SALIDA_ANTICIPADA', 'Motivo personal', 'PENDIENTE', '2025-10-16 16:53:54'),
	(7, 4, '2024-04-15', 'FALTA', 'Ausencia no justificada', 'PENDIENTE', '2025-10-16 16:53:54'),
	(8, 4, '2024-04-16', 'TARDANZA', 'Llegó 15 minutos tarde', 'PENDIENTE', '2025-10-16 16:53:54'),
	(9, 4, '2024-04-22', 'FALTA', 'No se presentó', 'PENDIENTE', '2025-10-16 16:53:54'),
	(10, 5, '2024-04-18', 'TARDANZA', 'Retraso de 5 minutos', 'PENDIENTE', '2025-10-16 16:53:54'),
	(11, 6, '2024-04-17', 'SALIDA_ANTICIPADA', 'Permiso por asunto personal', 'PENDIENTE', '2025-10-16 16:53:54'),
	(12, 7, '2024-04-19', 'TARDANZA', 'Retraso 20 minutos', 'PENDIENTE', '2025-10-16 16:53:54'),
	(13, 7, '2024-04-21', 'FALTA', 'Ausencia injustificada', 'PENDIENTE', '2025-10-16 16:53:54'),
	(14, 1, '2024-04-10', 'TARDANZA', 'Tráfico en hora pico', 'JUSTIFICADA', '2025-10-16 16:53:54'),
	(15, 1, '2024-04-12', 'SALIDA_ANTICIPADA', 'Cita médica programada', 'JUSTIFICADA', '2025-10-16 16:53:54'),
	(16, 2, '2024-04-09', 'TARDANZA', 'Problema en transporte', 'JUSTIFICADA', '2025-10-16 16:53:54'),
	(17, 3, '2024-04-08', 'TARDANZA', 'Descompostura de auto', 'JUSTIFICADA', '2025-10-16 16:53:54'),
	(18, 3, '2024-04-14', 'SALIDA_ANTICIPADA', 'Cita con el dentista', 'JUSTIFICADA', '2025-10-16 16:53:54'),
	(19, 4, '2024-04-11', 'FALTA', 'Descanso médico certificado', 'JUSTIFICADA', '2025-10-16 16:53:54'),
	(20, 5, '2024-04-13', 'TARDANZA', 'Accidente vial menor', 'JUSTIFICADA', '2025-10-16 16:53:54'),
	(21, 6, '2024-04-09', 'TARDANZA', 'Retraso por lluvia', 'JUSTIFICADA', '2025-10-16 16:53:54'),
	(22, 7, '2024-04-07', 'TARDANZA', 'Cita médica urgente', 'JUSTIFICADA', '2025-10-16 16:53:54'),
	(23, 2, '2024-04-05', 'FALTA', 'No presentó justificación válida', 'RECHAZADA', '2025-10-16 16:53:54'),
	(24, 4, '2024-04-06', 'TARDANZA', 'Justificación no aceptada', 'RECHAZADA', '2025-10-16 16:53:54'),
	(25, 7, '2024-04-04', 'FALTA', 'Motivo no válido', 'RECHAZADA', '2025-10-16 16:53:54');

-- Dumping structure for table bd_registro_empleados.horario
CREATE TABLE IF NOT EXISTS `horario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `empleado_id` int NOT NULL,
  `dia_semana` enum('Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo') NOT NULL,
  `hora_entrada` time NOT NULL,
  `hora_salida` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `empleado_id` (`empleado_id`),
  CONSTRAINT `horario_ibfk_1` FOREIGN KEY (`empleado_id`) REFERENCES `empleado` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bd_registro_empleados.horario: ~10 rows (approximately)
INSERT INTO `horario` (`id`, `empleado_id`, `dia_semana`, `hora_entrada`, `hora_salida`) VALUES
	(1, 1, 'Lunes', '08:00:00', '17:00:00'),
	(2, 1, 'Martes', '08:00:00', '17:00:00'),
	(3, 1, 'Miercoles', '08:00:00', '17:00:00'),
	(4, 1, 'Jueves', '08:00:00', '17:00:00'),
	(5, 1, 'Viernes', '08:00:00', '17:00:00'),
	(6, 2, 'Lunes', '09:00:00', '18:00:00'),
	(7, 2, 'Martes', '09:00:00', '18:00:00'),
	(8, 2, 'Miercoles', '09:00:00', '18:00:00'),
	(9, 2, 'Jueves', '09:00:00', '18:00:00'),
	(10, 2, 'Viernes', '09:00:00', '18:00:00');

-- Dumping structure for table bd_registro_empleados.justificacion
CREATE TABLE IF NOT EXISTS `justificacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `asistencia_id` int NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `documento_url` varchar(255) DEFAULT NULL,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` varchar(50) DEFAULT NULL,
  `comentario` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `asistencia_id` (`asistencia_id`),
  CONSTRAINT `justificacion_ibfk_1` FOREIGN KEY (`asistencia_id`) REFERENCES `asistencia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bd_registro_empleados.justificacion: ~20 rows (approximately)
INSERT INTO `justificacion` (`id`, `asistencia_id`, `descripcion`, `documento_url`, `fecha_registro`, `estado`, `comentario`) VALUES
	(1, 2, 'Retraso por trafico intenso camino al trabajo', 'http://empresa.com/docs/trafico.pdf', '2025-10-16 15:47:34', 'APROBADA', 'Aceptada'),
	(2, 3, 'Salida anticipada por cita medica', 'http://empresa.com/docs/cita_medica.pdf', '2025-10-16 15:47:34', 'RECHAZADA', 'prueba'),
	(3, 4, 'Ausencia por descanso medico', 'http://empresa.com/docs/certificado_medico.pdf', '2025-10-16 15:47:34', 'APROBADA', 'Aceptada'),
	(4, 2, 'Retraso por tráfico intenso en la ruta principal debido a accidente vial', 'http://empresa.com/docs/trafico_20240415.pdf', '2025-10-16 16:53:54', 'APROBADA', 'Aceptada'),
	(5, 3, 'Descompostura del vehículo personal - Reparación de emergencia', 'http://empresa.com/docs/auto_descompuesto_20240415.pdf', '2025-10-16 16:53:54', 'RECHAZADA', 'Rechazado'),
	(6, 4, 'Descanso médico certificado por médico tratante', 'http://empresa.com/docs/descanso_medico_20240415.pdf', '2025-10-16 16:53:54', NULL, NULL),
	(7, 6, 'Lluvia intenso causó inundación en la ruta habitual', 'http://empresa.com/docs/lluvia_20240415.pdf', '2025-10-16 16:53:54', 'APROBADA', 'Aceptada'),
	(8, 7, 'Cita médica urgente con cardiología en la mañana', 'http://empresa.com/docs/cardiologia_20240415.pdf', '2025-10-16 16:53:54', NULL, NULL),
	(9, 2, 'fgf', '', '2025-10-20 23:15:33', NULL, NULL),
	(10, 2, 'rwrwrw', '', '2025-10-20 23:16:48', NULL, NULL),
	(11, 2, 'prueba', '', '2025-10-21 01:30:04', NULL, NULL),
	(12, 6, 'prueba para admin', '', '2025-10-21 23:59:08', 'APROBADA', 'Aceptada'),
	(13, 6, 'prueba 2 para admin', '', '2025-10-21 23:59:19', 'RECHAZADA', 'prueba'),
	(14, 92, 'prueba', '', '2025-10-22 00:40:14', NULL, NULL),
	(15, 92, 'prueba', '', '2025-10-22 00:40:23', NULL, NULL),
	(16, 93, 'dsadsad', '', '2025-10-22 00:42:44', NULL, NULL),
	(17, 94, 'dsadsa', '', '2025-10-22 01:17:22', NULL, NULL),
	(18, 95, 'dsadsa', '', '2025-10-22 01:17:26', NULL, NULL),
	(19, 270, 'dsadas', '', '2025-10-22 01:17:30', NULL, NULL),
	(20, 271, 'justificacion prueba laura', '', '2025-10-22 14:55:00', 'APROBADA', 'Aceptada');

-- Dumping structure for table bd_registro_empleados.rol
CREATE TABLE IF NOT EXISTS `rol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bd_registro_empleados.rol: ~2 rows (approximately)
INSERT INTO `rol` (`id`, `nombre`) VALUES
	(1, 'ADMIN'),
	(2, 'EMPLEADO');

-- Dumping structure for table bd_registro_empleados.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(50) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `empleado_id` int NOT NULL,
  `rol_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  KEY `empleado_id` (`empleado_id`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`empleado_id`) REFERENCES `empleado` (`id`),
  CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bd_registro_empleados.usuario: ~9 rows (approximately)
INSERT INTO `usuario` (`id`, `nombre_usuario`, `clave`, `empleado_id`, `rol_id`) VALUES
	(1, 'admin', '$2a$10$VzzD0Txa6whnStbeilPfsunzsaTkziqoT2ofAXeITbqIcY078hXHW', 1, 1),
	(2, 'ana.gomez', '$2a$10$VzzD0Txa6whnStbeilPfsunzsaTkziqoT2ofAXeITbqIcY078hXHW', 2, 2),
	(3, 'luis.ramirez', '$2a$10$VzzD0Txa6whnStbeilPfsunzsaTkziqoT2ofAXeITbqIcY078hXHW', 3, 2),
	(4, 'sofia.lopez', '$2a$10$VzzD0Txa6whnStbeilPfsunzsaTkziqoT2ofAXeITbqIcY078hXHW', 4, 2),
	(5, 'carlos.martinez', '$2a$10$VzzD0Txa6whnStbeilPfsunzsaTkziqoT2ofAXeITbqIcY078hXHW', 5, 2),
	(6, 'laura.fernandez', '$2a$10$VzzD0Txa6whnStbeilPfsunzsaTkziqoT2ofAXeITbqIcY078hXHW', 6, 2),
	(7, 'pedro.salazar', '$2a$10$VzzD0Txa6whnStbeilPfsunzsaTkziqoT2ofAXeITbqIcY078hXHW', 7, 2),
	(11, 'juan.perez', '$2a$10$AuyohngQvo7gp9aZW1wEX.FHOhQcUeXMvAyQ0sbTwpxRi42m.cJqm', 1, 2),
	(12, 'prueba.prueba', '$2a$10$lr7zfpLPG.ifeX0mQyWBceWpJUYvECSPXopmjydwULDIoJR.PsgK.', 47, 2);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
