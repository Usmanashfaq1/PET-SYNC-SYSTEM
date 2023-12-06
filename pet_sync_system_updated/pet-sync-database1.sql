-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2023 at 04:49 PM
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
  `id` int(244) NOT NULL,
  `vet_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`date`, `user_name`, `user_email`, `vet_name`, `vet_email`, `type`, `slot`, `subject`, `status`, `id`, `vet_id`, `user_id`) VALUES
('2023-12-06 20:13:50.412', 'usmanashfaq1', 'usmanx458@gmail.com', 'Ayesha Ali', 'petsyncsystem@gmail.com', '(One Health Approach)', '2023-12-14T08:15', 'grooming', 'approved', 7, NULL, NULL),
('2023-12-06 20:30:22.936', 'Usman2', 'f200115@cfd.nu.edu.pk', 'Ayesha Ali', 'petsyncsystem@gmail.com', '(One Health Approach)', '2023-12-14T10:33', 'vaccination', 'approved', 8, NULL, NULL);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `health_records`
--

INSERT INTO `health_records` (`id`, `pet_id`, `vaccination`, `medication`, `allergies`, `surgeries`, `created_at`) VALUES
(1, 1, 'parvovirus', 'allergy-medication', 'Contact Allergens', 'no_surgery', '2023-12-01 11:21:13');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pet_profile`
--

INSERT INTO `pet_profile` (`id`, `pet_owner`, `petname`, `gender`, `age`, `breed`, `species`, `weight`, `color`, `about`, `petPicture`, `owner_id`) VALUES
(1, 'usmanashfaq1', 'caspher', 'male', 8, 'Persian', 'cat', '10', 'Black', 'CASPHER@1', '1701428180021-manja-vitolic-gKXKBY-C-Dk-unsplash.jpg', 1),
(3, 'usmanashfaq1', 'Tommy', 'male', 8, 'germanShepherd', 'dog', '35', 'Black', 'Tommy@1', '1701870296224-tommy2.png', 1);

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
(1, 'usmanashfaq1', 'usmanx458@gmail.com', '$2b$10$nSenlqGmptOuVt4bCGOk8eDR/.qWSu.vhOFIOHJU.6IOw/.5PdIIG', '$2b$10$nSenlqGmptOuVt4bCGOk8eDR/.qWSu.vhOFIOHJU.6IOw/.5PdIIG');

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
('Ayesha', 'Ali', 'One Health Approach', 'Bachelor of Veterinary Medicine (BVM)', '14456A', 'petsyncsystem@gmail.com', 'Morning (8:00 AM - 12:00 PM)', '$2b$10$5jIa6YqH2hpvM2Vk5bHBaOQhSlpMzgs8eJn2G1HdjEkkS5U3HVppG', 1, 'Faisalabad, Pakistan');

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
  MODIFY `id` int(244) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `health_records`
--
ALTER TABLE `health_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pet_memories`
--
ALTER TABLE `pet_memories`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pet_profile`
--
ALTER TABLE `pet_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sign_up`
--
ALTER TABLE `sign_up`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `vet`
--
ALTER TABLE `vet`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
-- Constraints for table `pet_memories`
--
ALTER TABLE `pet_memories`
  ADD CONSTRAINT `ps1` FOREIGN KEY (`id`) REFERENCES `pet_profile` (`id`);

--
-- Constraints for table `pet_profile`
--
ALTER TABLE `pet_profile`
  ADD CONSTRAINT `fk_owner` FOREIGN KEY (`owner_id`) REFERENCES `sign_up` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
