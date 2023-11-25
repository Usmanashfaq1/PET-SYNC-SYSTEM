-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2023 at 05:17 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pet-sync-database1`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `date` varchar(500) NOT NULL,
  `user_name` varchar(2000) NOT NULL,
  `user_email` varchar(2000) NOT NULL,
  `vet_name` varchar(2000) NOT NULL,
  `vet_email` varchar(2000) NOT NULL,
  `type` varchar(2000) NOT NULL,
  `slot` varchar(500) NOT NULL,
  `subject` varchar(500) NOT NULL,
  `status` varchar(500) NOT NULL,
  `id` int(244) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`date`, `user_name`, `user_email`, `vet_name`, `vet_email`, `type`, `slot`, `subject`, `status`, `id`) VALUES
('2023-11-24 15:53:48.926', 'Usman', 'usman123@gmail.com', 'Ayesha Ahsan', 'ayesha123@gmail.com', '(One Health Approach)', '2023-11-30T09:00', 'Cat Check Up', 'approved', 1),
('2023-11-24 16:40:53.972', 'Usman', 'usman123@gmail.com', 'Ali Ahmad', 'aliahmad123@gmail.com', '(Emergency and Critical Care)', '2023-12-10T15:40', 'Dog Check Up', 'approved', 2),
('2023-11-24 16:45:29.135', 'bilal', 'bilal1@gmail.com', 'Ayesha Ahsan', 'ayesha123@gmail.com', '(One Health Approach)', '2023-11-27T10:50', 'Cat Check Up', 'approved', 3);

-- --------------------------------------------------------

--
-- Table structure for table `pet_profile`
--

CREATE TABLE `pet_profile` (
  `id` int(11) NOT NULL,
  `pet_owner` varchar(150) NOT NULL,
  `petname` varchar(2000) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `age` int(50) NOT NULL,
  `breed` varchar(50) NOT NULL,
  `species` varchar(2000) NOT NULL,
  `weight` varchar(2000) NOT NULL,
  `color` varchar(2000) NOT NULL,
  `petPicture` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pet_profile`
--

INSERT INTO `pet_profile` (`id`, `pet_owner`, `petname`, `gender`, `age`, `breed`, `species`, `weight`, `color`, `petPicture`) VALUES
(1, 'Usman', 'Tommy', 'male', 5, 'German', 'dog', '20', 'Black', '1700807115781-dog.jpg');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(8, '1.', '107@gmail.com', '1', '$2b$10$RumXiz39Phfk.oH4FxqjsOKXCy42naFnQAASTSOtiy4bGPQZqqsnC'),
(9, 'Usman', 'usman123@gmail.com', '$2b$10$TxxhI9WmuBl/IqSM6zYvruJb1Le1bFCMZVBCDjENJ.wRm2MUtPwwi', '$2b$10$TxxhI9WmuBl/IqSM6zYvruJb1Le1bFCMZVBCDjENJ.wRm2MUtPwwi'),
(10, 'bilal', 'bilal1@gmail.com', '$2b$10$uCgboQS2jzmU2Weh6pvEpuN6oSHpSBYZIAkMPBAS3zm3LZyvo5whq', '$2b$10$uCgboQS2jzmU2Weh6pvEpuN6oSHpSBYZIAkMPBAS3zm3LZyvo5whq');

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
  `timeslot` varchar(200) NOT NULL,
  `password` varchar(2000) NOT NULL,
  `id` int(255) NOT NULL,
  `location` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vet`
--

INSERT INTO `vet` (`fname`, `lname`, `specialization`, `qualification`, `license_number`, `email`, `timeslot`, `password`, `id`, `location`) VALUES
('Ayesha', 'Ahsan', 'One Health Approach', 'Bachelor of Veterinary Medicine (BVM)', '11223A', 'ayesha123@gmail.com', 'Morning (8:00 AM - 12:00 PM)', '$2b$10$M4yueHX66S/IVUu9Vl8p3.koVFc9nNNsUgFSzxgqsqSuA6.ClCnia', 1, '1 Sheikhupura Rd Noorpur, Faisalabad, Punjab 38000 Pakistan'),
('Ali', 'Ahmad', 'Emergency and Critical Care', 'Doctor of Veterinary Medicine (DVM)', '11223B', 'aliahmad123@gmail.com', 'Afternoon (12:00 PM - 4:00 PM)', '$2b$10$azWQeXkvFMSHYvZSYIV6WuZIJTysfJCiTRDhcTIcaUzlyJplM2F6y', 2, 'GHUFRAN CLINIC, Tariq Rd, Sheikh Colony, Faisalabad, Punjab 38000, Pakistan');

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
  MODIFY `id` int(244) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pet_profile`
--
ALTER TABLE `pet_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sign_up`
--
ALTER TABLE `sign_up`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `vet`
--
ALTER TABLE `vet`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
