-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2023 at 02:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
  `date` varchar(500) NOT NULL,
  `user_name` varchar(2000) NOT NULL,
  `user_email` varchar(2000) NOT NULL,
  `vet_name` varchar(2000) NOT NULL,
  `vet_email` varchar(2000) NOT NULL,
  `type` varchar(2000) NOT NULL,
  `slot` varchar(500) NOT NULL,
  `subject` varchar(500) NOT NULL,
  `status` varchar(500) NOT NULL,
  `id` int(244) NOT NULL,
  `vet_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`date`, `user_name`, `user_email`, `vet_name`, `vet_email`, `type`, `slot`, `subject`, `status`, `id`, `vet_id`, `user_id`) VALUES
('2023-12-06 22:40:42.955', 'sameed', 'f200116@cfd.nu.edu.pk', 'Ayesha Ali', 'petsyncsystem@gmail.com', '(One Health Approach)', '2023-12-20T11:41', 'illness', 'approved', 9, 1, 7),
('2023-12-07 13:04:18.147', 'AsifAmeer', 'asif.ameer@nu.edu.pk', 'Ayesha Ali', 'petsyncsystem@gmail.com', '(One Health Approach)', '2023-12-20T09:03', 'dentalCare', 'approved', 10, 1, 8),
('2023-12-07 13:30:36.214', 'faryalsaud', 'faryal.saud@nu.edu.pk', 'Ayesha Ali', 'petsyncsystem@gmail.com', '(One Health Approach)', '2023-12-15T10:30', 'vaccination', 'approved', 11, 1, 9);

-- --------------------------------------------------------

--
-- Table structure for table `health_records`
--

CREATE TABLE `health_records` (
  `id` int(11) NOT NULL,
  `pet_id` int(11) DEFAULT NULL,
  `vaccination` varchar(255) DEFAULT NULL,
  `medication` varchar(255) DEFAULT NULL,
  `allergies` varchar(255) DEFAULT NULL,
  `surgeries` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `health_records`
--

INSERT INTO `health_records` (`id`, `pet_id`, `vaccination`, `medication`, `allergies`, `surgeries`, `created_at`) VALUES
(1, 1, 'parvovirus', 'allergy-medication', 'Contact Allergens', 'no_surgery', '2023-12-01 11:21:13'),
(2, 4, 'parvovirus', 'antifungal', 'Environmental Allergens', 'eye-surgery', '2023-12-06 17:44:18'),
(3, 5, 'leptospirosis', 'heartworm-preventive', 'Plants And Allergies In Dogs', 'fracture-repair', '2023-12-07 08:11:33'),
(4, 5, 'distemper', 'pain-reliever', 'Medications', 'c-section', '2023-12-07 08:13:26'),
(5, 4, 'parvovirus', 'antifungal', 'Environmental Allergens', 'abdominal-surgery', '2023-12-07 08:35:15');

-- --------------------------------------------------------

--
-- Table structure for table `pet_memories`
--

CREATE TABLE `pet_memories` (
  `date` varchar(200) NOT NULL,
  `pet_owner` varchar(500) NOT NULL,
  `petname` varchar(500) NOT NULL,
  `about` varchar(1000) NOT NULL,
  `petPicture` varchar(1000) NOT NULL,
  `id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pet_memories`
--

INSERT INTO `pet_memories` (`date`, `pet_owner`, `petname`, `about`, `petPicture`, `id`) VALUES
('Wed Dec 06 2023 22:43:26 GMT+0500 (Pakistan Standard Time)', 'sameed', 'Zerox1', 'i love to make other animals my friends', '1701884606195-bruce-mars.jpg', 1),
('Tue Dec 12 2023 10:49:01 GMT+0500 (Pakistan Standard Time)', 'AsifAmeer', 'Zerox2', 'i love to make other animals my friends', '1702360141083-admin.jpg', 3),
('Tue Dec 12 2023 11:58:27 GMT+0500 (Pakistan Standard Time)', 'sameed', 'Zerox3', 'i love to make other animals my friends', '1702364307156-bruce-mars.jpg', 4);

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
  `about` varchar(500) NOT NULL,
  `petPicture` varchar(1000) NOT NULL,
  `owner_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pet_profile`
--

INSERT INTO `pet_profile` (`id`, `pet_owner`, `petname`, `gender`, `age`, `breed`, `species`, `weight`, `color`, `about`, `petPicture`, `owner_id`) VALUES
(1, 'usmanashfaq1', 'caspher', 'male', 8, 'Persian', 'cat', '10', 'Black', 'CASPHER@1', '1701428180021-manja-vitolic-gKXKBY-C-Dk-unsplash.jpg', 1),
(3, 'usmanashfaq1', 'Tommy', 'male', 8, 'germanShepherd', 'dog', '35', 'Black', 'Tommy@1', '1701870296224-tommy2.png', 1),
(4, 'sameed', 'Zerox2', 'male', 23, 'persian', 'dog', '23', 'Black and white', 'i love to make other animals my friends', '1701884572020-bg_profile.jpg', 7),
(5, 'AsifAmeer', 'Zerox1', 'male', 22, 'germanShepherd', 'cat', '33', 'Black and white', 'i love to make other animals my friends', '1701936630089-admin.jpg', 8),
(6, 'sameed', 'Zerox3', 'male', 23, 'poodle', 'dog', '12', 'Black and white', '121', '1702364289487-admin.jpg', 7),
(7, 'sameed', 'Zerox2', 'male', 12, 'labrador', 'dog', '12', 'blue', '12', '1702367315547-admin.jpg', 7);

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
(1, 'usmanashfaq1', 'usmanx458@gmail.com', '$2b$10$nSenlqGmptOuVt4bCGOk8eDR/.qWSu.vhOFIOHJU.6IOw/.5PdIIG', '$2b$10$nSenlqGmptOuVt4bCGOk8eDR/.qWSu.vhOFIOHJU.6IOw/.5PdIIG'),
(7, 'sameed', 'f200116@cfd.nu.edu.pk', '$2b$10$AgC9C3ouFwoqOVsbMc3WruiFTmGS34FVMo1X6NzPSC1AE1QGYHnYC', '$2b$10$QuSqFafesr3/yrmnI24lKuAu9ATXmpQvuAA0xOT7KDTk49IaNHEJW'),
(8, 'AsifAmeer', 'asif.ameer@nu.edu.pk', '$2b$10$CC8yebepMjvskoalI/3ikuwQWalMgLLh3PoLD1qArZO8YDma88P8y', '$2b$10$CC8yebepMjvskoalI/3ikuwQWalMgLLh3PoLD1qArZO8YDma88P8y'),
(9, 'faryalsaud', 'faryal.saud@nu.edu.pk', '$2b$10$jyegANYSJ32oqV4FlRbEre1uzMeODjuwHTWLcpeZaM/4KP6cu/il2', '$2b$10$jyegANYSJ32oqV4FlRbEre1uzMeODjuwHTWLcpeZaM/4KP6cu/il2');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vet`
--

INSERT INTO `vet` (`fname`, `lname`, `specialization`, `qualification`, `license_number`, `email`, `timeslot`, `password`, `id`, `location`) VALUES
('Ayesha', 'Ali', 'One Health Approach', 'Bachelor of Veterinary Medicine (BVM)', '14456A', 'petsyncsystem@gmail.com', 'Morning (8:00 AM - 12:00 PM)', '$2b$10$5jIa6YqH2hpvM2Vk5bHBaOQhSlpMzgs8eJn2G1HdjEkkS5U3HVppG', 1, 'Faisalabad, Pakistan'),
('Muhammad', 'Sameed', 'Behavioral Medicine', 'Doctor of Veterinary Medicine (DVM)', '12232', 'usmanextra58@gmail.com', 'Morning (8:00 AM - 12:00 PM)', '$2b$10$FYcrLjHdxx0Icpn6FwT9puA5qe6BRl3FWK1dVI98iYnjojcGjhQ6y', 9, 'Islamabad, Pakistan'),
('Muhammad', 'Sameed', 'Behavioral Medicine', 'Doctor of Veterinary Medicine (DVM)', '12212', 'usmanextra58@gmail.com', 'Morning (8:00 AM - 12:00 PM)', '$2b$10$ZcvytG.aAU/COZM10tmoueupYtQTQDbn.pn.f3rOJ8opYQQC0w0Lu', 10, 'Islamabad, Pakistan');

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vet` (`vet_id`),
  ADD KEY `fk_user` (`user_id`);

--
-- Indexes for table `health_records`
--
ALTER TABLE `health_records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `c1` (`pet_id`);

--
-- Indexes for table `pet_memories`
--
ALTER TABLE `pet_memories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pet_profile`
--
ALTER TABLE `pet_profile`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_owner` (`owner_id`);

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
  MODIFY `id` int(244) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `health_records`
--
ALTER TABLE `health_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pet_memories`
--
ALTER TABLE `pet_memories`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pet_profile`
--
ALTER TABLE `pet_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `sign_up`
--
ALTER TABLE `sign_up`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `vet`
--
ALTER TABLE `vet`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `sign_up` (`id`),
  ADD CONSTRAINT `fk_vet` FOREIGN KEY (`vet_id`) REFERENCES `vet` (`id`);

--
-- Constraints for table `health_records`
--
ALTER TABLE `health_records`
  ADD CONSTRAINT `c1` FOREIGN KEY (`pet_id`) REFERENCES `pet_profile` (`id`);

--
-- Constraints for table `pet_profile`
--
ALTER TABLE `pet_profile`
  ADD CONSTRAINT `fk_owner` FOREIGN KEY (`owner_id`) REFERENCES `sign_up` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
