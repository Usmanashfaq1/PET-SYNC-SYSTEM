-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2023 at 04:46 PM
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
(1, 'sameed', 'f200116@cfd.nu.edu.pk', '123');

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `user_name` varchar(2000) NOT NULL,
  `user_email` varchar(2000) NOT NULL,
  `vet_name` varchar(2000) NOT NULL,
  `vet_email` varchar(2000) NOT NULL,
  `type` varchar(2000) NOT NULL,
  `id` int(244) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`user_name`, `user_email`, `vet_name`, `vet_email`, `type`, `id`) VALUES
('Usman', 'usmanx12@gmail.com', 'Hussan Ahamd', 'hussan1@gmail.com', '(Veterinary Medicine)', 1),
('ahsan', 'ahsan@gmail.com', 'Ayesha Ali', 'ayesha@gmail.com', '(Veterinary Medicine)', 2),
('noman', 'noman@gmail.com', 'Ayesha Ali', 'ayesha@gmail.com', '(Veterinary Medicine)', 3),
('Abdullah', 'abdullah@gmail.com', 'Hussan Ahamd', 'hussan1@gmail.com', '(Veterinary Medicine)', 4);

-- --------------------------------------------------------

--
-- Table structure for table `pet_profile`
--

CREATE TABLE `pet_profile` (
  `id` int(11) NOT NULL,
  `pet_owner` varchar(150) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `age` int(50) NOT NULL,
  `breed` varchar(50) NOT NULL,
  `about` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pet_profile`
--

INSERT INTO `pet_profile` (`id`, `pet_owner`, `gender`, `age`, `breed`, `about`) VALUES
(1, 'sameed1', 'female', 3, '3', '3'),
(2, 'null', 'male', 3, 'mackow', 'uhi'),
(3, 'null', 'male', 3, 'mackow', 'uhi'),
(4, 'sameed1', 'male', 3, '33', '3333');

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
(6, '20F-0116', 'us@gmail.com', '$2b$10$xJKK36fB2TGCMQ0KQRiVoejgGIhagL6IpaELvEyzM2ila3aJBNgbW', '$2b$10$xJKK36fB2TGCMQ0KQRiVoejgGIhagL6IpaELvEyzM2ila3aJBNgbW'),
(7, 'sameed1', 'master.official.445566@gmail.com', '$2b$10$sBzxTQsck9dl5vbd96unrebbWlnx/NnM.j1nJK5Y2bkqBEHb9XRg2', '$2b$10$k.1X/iaVY8t4LhBus7ud0egdSi8pHulbx/OcTVKdWWL/OtSRkPPcS'),
(8, '1.', '107@gmail.com', '1', '$2b$10$RumXiz39Phfk.oH4FxqjsOKXCy42naFnQAASTSOtiy4bGPQZqqsnC');

-- --------------------------------------------------------

--
-- Table structure for table `vet`
--

CREATE TABLE `vet` (
  `fname` varchar(2000) NOT NULL,
  `lname` varchar(2000) NOT NULL,
  `specialization` varchar(2000) NOT NULL,
  `qualification` varchar(2000) NOT NULL,
  `license_number` varchar(2000) NOT NULL,
  `email` varchar(2000) NOT NULL,
  `password` varchar(2000) NOT NULL,
  `id` int(255) NOT NULL,
  `location` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vet`
--

INSERT INTO `vet` (`fname`, `lname`, `specialization`, `qualification`, `license_number`, `email`, `password`, `id`, `location`) VALUES
('Ahamd', 'Ali', 'One Health Approach', 'bvm', '14456A', 'ahmadx458@gmail.com', '$2b$10$angUEcdwBNW6iY1ygAxCO.UeHz.bg/.FFaBzDykIcOLXzDW/bpCgK', 1, 'Faisalabad, Pakistan'),
('Ayesha', 'Ali', 'Veterinary Medicine', 'bsc', '14458A', 'ayesha@gmail.com', '$2b$10$u24JvTfYPzgQZuae/jg2k.VS7gI9VW5AkH2A3wkPRIsnhEmsDvi3W', 2, 'Faisalabad, Pakistan'),
('Hussan', 'Ahamd', 'Veterinary Medicine', 'bvm', '14451A', 'hussan1@gmail.com', '$2b$10$J1YVD/wqQap475WsvgVY7.tHntBlrACBmvg58VYXQZ5WvtzBzhjwW', 3, 'Faisalabad, Pakistan');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_login`
--
ALTER TABLE `admin_login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pet_profile`
--
ALTER TABLE `pet_profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sign_up`
--
ALTER TABLE `sign_up`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vet`
--
ALTER TABLE `vet`
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
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(244) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pet_profile`
--
ALTER TABLE `pet_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sign_up`
--
ALTER TABLE `sign_up`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `vet`
--
ALTER TABLE `vet`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
