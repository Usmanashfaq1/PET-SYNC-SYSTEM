-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2023 at 06:29 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pet-sync-database`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_login`
--

CREATE TABLE `admin_login` (
  `id` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_login`
--

INSERT INTO `admin_login` (`id`, `username`, `email`, `password`) VALUES
(1, 'sameed', 'sameed@gmail.com', '123');

-- --------------------------------------------------------

--
-- Table structure for table `sign_up`
--

CREATE TABLE `sign_up` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  `confirm_password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sign_up`
--

INSERT INTO `sign_up` (`id`, `username`, `email`, `password`, `confirm_password`) VALUES
(1, 'sameed', 'sameed@gmail.com', '$2b$10$1ru/cZBX3oUzuXG0xrt38O3Z.wK.Sz811d4s.J8yvoAINtIzq8yfS', '$2b$10$1ru/cZBX3oUzuXG0xrt38O3Z.wK.Sz811d4s.J8yvoAINtIzq8yfS'),
(2, 'sameed2', 'sameed2@gmail.com', '$2b$10$dWtvu732Xdvv31l.cby5WOIByrvvbXisPmUTRrVGyHt4/6WJIXWIm', '$2b$10$dWtvu732Xdvv31l.cby5WOIByrvvbXisPmUTRrVGyHt4/6WJIXWIm'),
(3, 'sameed23', 'sameed23@gmail.com', '$2b$10$1mUa4fl8159CIX02VRznzOJ2jQZxd2Zyv3QjwnpWewItyLfiXhXly', '$2b$10$1mUa4fl8159CIX02VRznzOJ2jQZxd2Zyv3QjwnpWewItyLfiXhXly'),
(4, 'sameed234', 'sameed4@gmail.com', '$2b$10$ylr3lmGfL5WIkpiUjiiV/ujI7n2cvesjzwx0V8M94vDde8JZPj.MW', '$2b$10$ylr3lmGfL5WIkpiUjiiV/ujI7n2cvesjzwx0V8M94vDde8JZPj.MW'),
(5, 'sameed12', 'sameed21@gmail.com', '$2b$10$2v6ttMvfE8XDFbYaxksxd.dY.oTCamqC/CV0.4YO8fYug..DaMr/C', '$2b$10$2v6ttMvfE8XDFbYaxksxd.dY.oTCamqC/CV0.4YO8fYug..DaMr/C'),
(6, '20F-0116', 'us@gmail.com', '$2b$10$xJKK36fB2TGCMQ0KQRiVoejgGIhagL6IpaELvEyzM2ila3aJBNgbW', '$2b$10$xJKK36fB2TGCMQ0KQRiVoejgGIhagL6IpaELvEyzM2ila3aJBNgbW');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_login`
--
ALTER TABLE `admin_login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sign_up`
--
ALTER TABLE `sign_up`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_login`
--
ALTER TABLE `admin_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sign_up`
--
ALTER TABLE `sign_up`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
