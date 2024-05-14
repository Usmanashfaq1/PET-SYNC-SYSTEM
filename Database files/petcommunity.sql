-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 14, 2024 at 07:02 PM
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
-- Database: `petcommunity`
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
('2024-05-17 10:07:11.506', 'chaudhry1', 'f200115@cfd.nu.edu.pk', 'John Doe', 'john.doe@example.com', '(One Health Approach)', '2024-02-24T10:07', 'vaccination', 'approved', 9, 123, 10),
('2024-02-17 10:29:21.844', 'chaudhry1', 'f200115@cfd.nu.edu.pk', 'John Doe', 'john.doe@example.com', '(One Health Approach)', '2024-02-24T03:29', 'grooming', 'approved', 10, 123, 10),
('2024-03-12 19:44:36.167', 'chaudhry1', 'f200115@cfd.nu.edu.pk', 'John Doe', 'john.doe@example.com', '(One Health Approach)', '2024-03-23T12:49', 'vaccination', 'approved', 11, 123, 10),
('2024-03-26 13:05:53.108', 'sameed3', 'f200116@cfd.nu.edu.pk', 'Usman  Ashfaq', 'chusmanjutt.129@gmail.com', '(Emergency and Critical Care)', '2024-03-27T18:10', 'dentalCare', 'approved', 12, 124, 11),
('2024-05-01 09:53:10.949', 'sameed3', 'f200116@cfd.nu.edu.pk', 'John Doe', 'john.doe@example.com', '(One Health Approach)', '2024-05-09T23:54', 'grooming', 'unapproved', 13, 123, 11),
('2024-05-01 09:57:10.205', 'sameed3', 'f200116@cfd.nu.edu.pk', 'John Doe', 'john.doe@example.com', '(One Health Approach)', '2024-05-03T00:00', 'weightManagement', 'unapproved', 14, 123, 11),
('2024-05-01 10:27:04.318', 'sameed3', 'f200116@cfd.nu.edu.pk', 'John Doe', 'john.doe@example.com', '(One Health Approach)', '2024-04-28T10:26', 'grooming', 'unapproved', 15, 123, 11),
('2024-05-01 11:08:30.733', 'sameed3', 'f200116@cfd.nu.edu.pk', 'John Doe', 'john.doe@example.com', '(One Health Approach)', '2024-05-08T11:10', 'dentalCare', 'unapproved', 16, 123, 11),
('2024-05-01 11:16:36.723', 'sameed3', 'f200116@cfd.nu.edu.pk', 'John Doe', 'john.doe@example.com', '(One Health Approach)', '2024-05-02T11:16', 'illness', 'unapproved', 17, 123, 11),
('2024-05-01 11:18:17.532', 'sameed3', 'f200116@cfd.nu.edu.pk', 'Usman  Ashfaq', 'chusmanjutt.129@gmail.com', '(Emergency and Critical Care)', '2024-05-10T11:18', 'dentalCare', 'approved', 18, 124, 11),
('2024-05-14 11:03:36.351', 'chaudhry1', 'f200115@cfd.nu.edu.pk', 'Usman  Ashfaq', 'chusmanjutt.129@gmail.com', '(Emergency and Critical Care)', '2024-05-22T03:07', 'vaccination', 'approved', 19, 124, 10),
('2024-05-14 11:05:25.651', 'chaudhry1', 'f200115@cfd.nu.edu.pk', 'Usman  Ashfaq', 'chusmanjutt.129@gmail.com', '(Emergency and Critical Care)', '2024-05-17T02:05', 'illness', 'approved', 20, 124, 10),
('2024-05-14 11:11:31.882', 'chaudhry1', 'f200115@cfd.nu.edu.pk', 'Usman  Ashfaq', 'chusmanjutt.129@gmail.com', '(Emergency and Critical Care)', '2024-05-24T03:11', 'dentalCare', 'approved', 21, 124, 10),
('2024-05-14 11:14:41.452', 'chaudhry1', 'f200115@cfd.nu.edu.pk', 'Usman  Ashfaq', 'chusmanjutt.129@gmail.com', '(Emergency and Critical Care)', '2024-05-15T03:18', 'grooming', 'unapproved', 22, 124, 10),
('2024-05-14 11:15:39.738', 'chaudhry1', 'f200115@cfd.nu.edu.pk', 'Usman  Ashfaq', 'chusmanjutt.129@gmail.com', '(Emergency and Critical Care)', '2024-06-06T03:15', 'illness', 'unapproved', 23, 124, 10),
('2024-05-14 11:26:03.906', 'chaudhry1', 'f200115@cfd.nu.edu.pk', 'Usman  Ashfaq', 'chusmanjutt.129@gmail.com', '(Emergency and Critical Care)', '2024-06-07T04:25', 'grooming', 'unapproved', 24, 124, 10),
('2024-05-14 11:32:23.357', 'chaudhry1', 'f200115@cfd.nu.edu.pk', 'Usman  Ashfaq', 'chusmanjutt.129@gmail.com', '(Emergency and Critical Care)', '2024-05-25T03:32', 'dentalCare', 'unapproved', 25, 124, 10),
('2024-05-14 12:00:54.353', 'chaudhry1', 'f200115@cfd.nu.edu.pk', 'Usman  Ashfaq', 'chusmanjutt.129@gmail.com', '(Emergency and Critical Care)', '2024-05-22T16:05', 'grooming', 'unapproved', 26, 124, 10),
('2024-05-14 12:13:38.608', 'chaudhry1', 'f200115@cfd.nu.edu.pk', 'Usman  Ashfaq', 'chusmanjutt.129@gmail.com', '(Emergency and Critical Care)', '2024-05-22T17:18', 'grooming', 'unapproved', 27, 124, 10),
('2024-05-14 12:16:24.686', 'chaudhry1', 'f200115@cfd.nu.edu.pk', 'Usman  Ashfaq', 'chusmanjutt.129@gmail.com', '(Emergency and Critical Care)', '2024-05-23T16:21', 'dentalCare', 'unapproved', 28, 124, 10),
('2024-05-14 15:34:38.136', 'chaudhry1', 'f200115@cfd.nu.edu.pk', 'Ali Ahmad', 'usmanx458@gmail.com', '(Veterinary Medicine)', '2024-05-24T19:38', 'vaccination', 'unapproved', 29, 125, 10),
('2024-05-14 17:54:47.175', 'chaudhry1', 'f200115@cfd.nu.edu.pk', 'Ali Ahmad', 'usmanx458@gmail.com', '(Veterinary Medicine)', '2024-05-18T09:57', 'vaccination', 'unapproved', 30, 125, 10);

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `behavior_records`
--

CREATE TABLE `behavior_records` (
  `id` int(11) NOT NULL,
  `pet_id` int(11) DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `pet_owner_email` varchar(255) DEFAULT NULL,
  `petname` varchar(255) DEFAULT NULL,
  `petPicture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `behavior_records`
--

INSERT INTO `behavior_records` (`id`, `pet_id`, `date_time`, `description`, `category`, `created_at`, `pet_owner_email`, `petname`, `petPicture`) VALUES
(6, 10, '2024-05-23 17:58:00', 'this is dummy data1', 'Behavior', '2024-05-14 12:57:03', 'f200115@cfd.nu.edu.pk', 'puppy', '1715673618687-husky-puppy-on-dog-walk.webp'),
(7, 8, '2024-05-25 21:01:00', 'this is dummy data ', 'Milestone', '2024-05-14 12:58:10', 'f200115@cfd.nu.edu.pk', 'Tommy', '1715691459900-puppy.jpeg'),
(8, 8, '2024-05-17 21:00:00', 'this is dummy data', 'Training', '2024-05-14 13:00:22', 'f200115@cfd.nu.edu.pk', 'Tommy', '1715691459900-puppy.jpeg'),
(9, 8, '2024-05-18 13:33:00', 'dummy ', 'Milestone', '2024-05-14 16:29:45', 'f200115@cfd.nu.edu.pk', 'Tommy', '1715691459900-puppy.jpeg'),
(11, 8, '2024-05-17 13:36:00', 'test dummy', 'Training', '2024-05-14 16:32:40', 'f200115@cfd.nu.edu.pk', 'Tommy', '1715691459900-puppy.jpeg'),
(12, 8, '2024-05-18 13:34:00', 'sfd', 'Training', '2024-05-14 16:34:06', 'f200115@cfd.nu.edu.pk', 'Tommy', '1715691459900-puppy.jpeg'),
(13, 8, '2024-05-23 13:39:00', 'dsf', 'Behavior', '2024-05-14 16:35:34', 'f200115@cfd.nu.edu.pk', 'Tommy', '1715691459900-puppy.jpeg'),
(14, 8, '2024-05-17 13:40:00', 'dummy', 'Training', '2024-05-14 16:36:52', 'f200115@cfd.nu.edu.pk', 'Tommy', '1715691459900-puppy.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `email` varchar(100) NOT NULL,
  `item_id` int(11) NOT NULL,
  `price` double NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`email`, `item_id`, `price`, `quantity`) VALUES
('f200116@cfd.nu.edu.pk', 2, 40, 1),
('rex@gmail.com', 2, 40, 1);

-- --------------------------------------------------------

--
-- Table structure for table `commentinfo`
--

CREATE TABLE `commentinfo` (
  `id` int(11) NOT NULL,
  `feedname` varchar(255) DEFAULT NULL,
  `commenttext` varchar(255) DEFAULT NULL,
  `commentby` varchar(255) DEFAULT NULL,
  `commentto` varchar(255) DEFAULT NULL,
  `likes` int(11) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `commentinfo`
--

INSERT INTO `commentinfo` (`id`, `feedname`, `commenttext`, `commentby`, `commentto`, `likes`, `created_at`) VALUES
(1, '1710415161136.jpg', 'fds', 'genny', '0', 0, '2024-03-15 12:11:02'),
(2, '1710415161136.jpg', 'wowowow', 'genny', '0', 0, '2024-03-15 12:11:17'),
(3, '1710254208710.png', 'nice', 'genny', '0', 0, '2024-03-15 12:13:01'),
(4, '1710488168947.jpg', 'sunset', 'genny', '0', 0, '2024-03-15 12:36:27'),
(5, '1710488168947.jpg', 'wowwowowow', 'chaudhry1', '0', 0, '2024-03-18 19:36:55'),
(6, '1710415161136.jpg', 'jkgkjgkgk', 'genny', '0', 0, '2024-03-19 13:30:01'),
(7, '1708060246605.jpg', 'heyyy', 'genny', '0', 0, '2024-03-26 12:28:43'),
(8, '1710254208710.png', 'my name is 123', 'genny', '0', 0, '2024-03-26 12:32:17'),
(9, '1708077704332.png', 'love u', 'mohinali', '0', 0, '2024-03-26 12:51:25'),
(10, '1710415161136.jpg', 'test comment : 1', 'genny', '0', 0, '2024-04-30 19:21:48'),
(11, '1714486932569.jpg', 'wow', 'genny', '0', 0, '2024-04-30 19:22:36'),
(12, '1714543226553.jpg', 'test comment', 'genny', '0', 0, '2024-05-01 11:00:46'),
(13, '1706104004953.jpg', 'nice dog', 'genny', '0', 0, '2024-05-08 20:28:43'),
(14, '1708060246605.jpg', 'hmm', 'genny', '0', 0, '2024-05-08 20:37:03'),
(15, '1710415161136.jpg', 'wow', 'genny', '0', 0, '2024-05-08 21:45:05'),
(16, '1710415161136.jpg', 'wow testing ', 'genny', '0', 0, '2024-05-08 21:45:10'),
(17, '1715184448140.jpg', 'wow', 'genny', '0', 0, '2024-05-08 21:45:34'),
(18, '1710415161136.jpg', 'wow', 'genny', '0', 0, '2024-05-14 13:39:51'),
(19, '1708077704332.png', 'yes', 'chaudhry1', '0', 0, '2024-05-14 13:45:33'),
(20, '1714538744515.jpg', 'asdijooszhudiajpodjsre', 'genny', '0', 0, '2024-05-14 15:24:09'),
(21, '1715682696359.jpg', 'frasfd', 'genny', '0', 0, '2024-05-14 15:32:37'),
(22, '1715691065205.jpeg', 'wow', 'chaudhry1', '0', 0, '2024-05-14 17:51:19'),
(23, '1715703854542.jpg', 'test', 'genny', '0', 0, '2024-05-14 21:24:35'),
(24, '1715691065205.jpeg', 'nice puppy', 'genny', '0', 0, '2024-05-14 21:56:06');

-- --------------------------------------------------------

--
-- Table structure for table `deliveries_order`
--

CREATE TABLE `deliveries_order` (
  `order_id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_email` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'pending',
  `amount_paid` double NOT NULL,
  `Date` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deliveries_order`
--

INSERT INTO `deliveries_order` (`order_id`, `customer_name`, `customer_email`, `status`, `amount_paid`, `Date`) VALUES
(1, 'sameed3', 'f200116@cfd.nu.edu.pk', 'shipped', 83, '2024-04-24'),
(2, 'sameed3', 'f200116@cfd.nu.edu.pk', 'delivered', 83, '2024-04-27'),
(3, 'sameed3', 'f200116@cfd.nu.edu.pk', 'shipped', 126, '2024-05-14T10:06:38.286Z'),
(4, 'anny', 'anny@gmail.com', 'confirmed', 312, '2024-05-14T10:07:57.574Z');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `vet_name` varchar(255) DEFAULT NULL,
  `vet_email` varchar(255) DEFAULT NULL,
  `feedback` varchar(255) DEFAULT NULL,
  `satisfied_count` int(11) DEFAULT 0,
  `dissatisfied_count` int(11) DEFAULT 0,
  `total_count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `vet_name`, `vet_email`, `feedback`, `satisfied_count`, `dissatisfied_count`, `total_count`) VALUES
(2, 'John Doe', 'john.doe@example.com', 'dissatisfied', 3, 1, 4),
(3, 'Usman  Ashfaq', 'chusmanjutt.129@gmail.com', 'dissatisfied', 0, 1, 1),
(4, 'Ali Ahmad', 'usmanx458@gmail.com', 'dissatisfied', 0, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `followcount`
--

CREATE TABLE `followcount` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `followers` int(11) DEFAULT 0,
  `following` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `followcount`
--

INSERT INTO `followcount` (`id`, `username`, `followers`, `following`) VALUES
(1, 'genny', 1, 2),
(2, 'chaudhry1', 1, 1),
(3, 'sameed3', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `followinfo`
--

CREATE TABLE `followinfo` (
  `id` int(11) NOT NULL,
  `follower` varchar(255) DEFAULT NULL,
  `following` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `followinfo`
--

INSERT INTO `followinfo` (`id`, `follower`, `following`) VALUES
(1, 'genny', 'chaudhry1'),
(2, 'genny', 'sameed3'),
(3, 'chaudhry1', 'genny');

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
(2, 4, 'distemper', 'anti-inflammatory', 'Flea Saliva And Bites', 'dental-cleaning', '2024-02-20 09:58:23'),
(3, 8, 'parvovirus', 'dewormer', 'Medications', 'tumor-removal', '2024-05-14 13:00:52');

-- --------------------------------------------------------

--
-- Table structure for table `likeinfo`
--

CREATE TABLE `likeinfo` (
  `id` int(11) NOT NULL,
  `feedname` varchar(255) DEFAULT NULL,
  `likedby` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `likeinfo`
--

INSERT INTO `likeinfo` (`id`, `feedname`, `likedby`) VALUES
(3, '1710415161136.jpg', 10),
(10, '1710425646708.jpg', 4),
(11, '1708077704332.png', 4),
(13, '1710488168947.jpg', 10),
(15, '1708060246605.jpg', 4),
(16, '1711438227932.jpg', 4),
(17, '1708077704332.png', 13),
(20, '1714486932569.jpg', 4),
(22, '1710415161136.jpg', 4),
(23, '1714543226553.jpg', 4),
(25, '1707314466008.jpg', 4),
(27, '1715184448140.jpg', 10),
(28, '1710488168947.jpg', 4),
(30, '1715184448140.jpg', 4),
(31, '1710254208710.png', 4),
(32, '1708077704332.png', 10),
(33, '1715682696359.jpg', 4),
(34, '1715691065205.jpeg', 10),
(35, '1715703854542.jpg', 4),
(36, '1715691065205.jpeg', 4);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender` varchar(255) NOT NULL,
  `recipient` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender`, `recipient`, `message`, `created_at`) VALUES
(1, 'genny', 'chaudhry1', 'heyyy whats up?', '2024-05-11 14:44:08'),
(2, 'chaudhry1', 'genny', 'yes i just saw your message?', '2024-05-11 14:45:30'),
(3, 'genny', 'sameed3', 'hey\r\n', '2024-05-14 10:33:36'),
(4, 'chaudhry1', 'genny', 'hey !', '2024-05-14 12:51:45');

-- --------------------------------------------------------

--
-- Table structure for table `order_products`
--

CREATE TABLE `order_products` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_products`
--

INSERT INTO `order_products` (`id`, `order_id`, `product_id`, `product_name`, `quantity`, `price`) VALUES
(5, 10, 9, 'White Cat', 1, 14.00),
(6, 10, 7, 'Husky', 1, 58.00),
(7, 10, 8, 'Puppy', 3, 25.00),
(8, 10, 5, 'Parrot Medicine', 1, 77.00),
(9, 11, 13, 'Macaw Parrot', 1, 38.00),
(10, 12, 7, 'Husky', 1, 58.00),
(11, 13, 8, 'Puppy', 1, 25.00),
(12, 14, 8, 'Puppy', 1, 25.00),
(13, 15, 8, 'Puppy', 1, 25.00),
(14, 16, 8, 'Puppy', 1, 25.00),
(15, 17, 8, 'Puppy', 1, 25.00),
(16, 18, 8, 'Puppy', 1, 25.00),
(17, 19, 7, 'Husky', 1, 58.00),
(18, 20, 7, 'Husky', 1, 58.00),
(19, 21, 7, 'Husky', 1, 58.00),
(20, 21, 8, 'Puppy', 1, 25.00),
(21, 21, 9, 'White Cat', 3, 14.00),
(22, 22, 7, 'Husky', 2, 58.00),
(23, 22, 8, 'Puppy', 1, 25.00),
(24, 23, 2, 'German Dog', 1, 40.00),
(25, 23, 5, 'Parrot Medicine', 1, 77.00),
(26, 23, 7, 'Husky', 1, 58.00),
(27, 23, 8, 'Puppy', 1, 25.00),
(28, 24, 10, 'Light white cat', 1, 20.00),
(29, 25, 5, 'Parrot Medicine', 13, 77.00),
(30, 25, 9, 'White Cat', 1, 14.00),
(31, 26, 5, 'Parrot Medicine', 2, 77.00),
(32, 26, 7, 'Husky', 1, 58.00),
(33, 26, 8, 'Puppy', 1, 25.00),
(34, 27, 5, 'Parrot Medicine', 2, 77.00),
(35, 28, 5, 'Parrot Medicine', 2, 77.00),
(36, 29, 5, 'Parrot Medicine', 2, 77.00),
(37, 30, 7, 'Husky', 1, 58.00),
(38, 30, 8, 'Puppy', 1, 25.00),
(39, 31, 8, 'Puppy', 1, 25.00),
(40, 32, 5, 'Parrot Medicine', 5, 77.00),
(41, 32, 9, 'White Cat', 1, 14.00),
(42, 33, 8, 'Puppy', 1, 25.00),
(43, 34, 7, 'Husky', 1, 58.00),
(44, 34, 8, 'Puppy', 1, 25.00),
(45, 1, 7, 'Husky', 1, 58.00),
(46, 1, 8, 'Puppy', 1, 25.00),
(47, 2, 8, 'Puppy', 1, 25.00),
(48, 2, 7, 'Husky', 1, 58.00),
(49, 3, 2, 'German Dog', 1, 40.00),
(50, 3, 7, 'Husky', 1, 58.00),
(51, 3, 12, 'Australian Parrot', 2, 10.00),
(52, 4, 8, 'Puppy', 1, 25.00),
(53, 4, 7, 'Husky', 1, 58.00),
(54, 4, 5, 'Parrot Medicine', 2, 77.00),
(55, 4, 13, 'Macaw Parrot', 1, 38.00),
(56, 4, 12, 'Australian Parrot', 1, 10.00),
(57, 4, 16, 'Tropical Fish', 1, 23.00);

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
('Tue Feb 20 2024 15:05:12 GMT+0500 (Pakistan Standard Time)', 'genny', 'abc', 'dgsbafv', '1708423512041-chen-FJXJ_ghi1tw-unsplash.jpg', 2),
('Mon Mar 25 2024 19:20:10 GMT+0500 (Pakistan Standard Time)', 'genny', 'Tom', 'i love to make other animals my friends', '1711376410271-PET CARRIER.jpg', 3),
('Tue May 14 2024 18:01:19 GMT+0500 (Pakistan Standard Time)', 'chaudhry1', 'puppy', 'dummy post', '1715691679064-husky-puppy-on-dog-walk.webp', 4);

-- --------------------------------------------------------

--
-- Table structure for table `pet_posts`
--

CREATE TABLE `pet_posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
(4, 'genny', 'Tom', 'female', 15, 'beagle', 'dog', '12', 'black', 'i love to make other animals my friends', '1708422961934-5ccf27a7a3b80d8ab01e145987630be9.jpg', 4),
(7, 'genny', 'wow', 'female', 3, 'beagle', 'cat', '6', 'brown', 'cat1', '1709963438615-chen-FJXJ_ghi1tw-unsplash.jpg', 4),
(8, 'chaudhry1', 'Tommy', 'male', 2, 'goldenRetriever', 'dog', '4', 'blue', 'dsf', '1715691459900-puppy.jpeg', 10),
(9, 'sameed3', 'wowdsf', 'male', 3, 'poodle', 'dog', '6', 'dfsf', 'dsfsf', '1709963861193-chen-FJXJ_ghi1tw-unsplash.jpg', 11),
(10, 'chaudhry1', 'puppy', 'other', 3, 'bulldog', 'dog', '32', 'white', 'dfzx', '1715673618687-husky-puppy-on-dog-walk.webp', 10),
(11, 'genny', 'caspher34', 'male', 16, 'siamese', 'dog', '12', 'Black and white', 'i love to make other animals my friends', '1711364812077-DOG HARNESS-NEOPRENE.jpg', 4),
(12, 'sameed3', 'caspher34', 'male', 12, 'bulldog', 'dog', '12', 'Black and white', 'i love to make other animals my friends', '1711471398964-DOG PUZZLE TOYS.jpg', 11),
(13, 'rex', 'Tommy', 'male', 23, 'goldenRetriever', 'dog', '5', 'black', 'Tommy 1', '1715309089842-taras-shypka-iFSvn82XfGo-unsplash.jpg', 2);

-- --------------------------------------------------------

--
-- Table structure for table `pet_schedule`
--

CREATE TABLE `pet_schedule` (
  `id` int(11) NOT NULL,
  `pet_id` int(11) NOT NULL,
  `day_of_week` varchar(10) NOT NULL,
  `meal_name` varchar(100) NOT NULL,
  `portion_size` varchar(50) NOT NULL,
  `schedule_timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pet_schedule`
--

INSERT INTO `pet_schedule` (`id`, `pet_id`, `day_of_week`, `meal_name`, `portion_size`, `schedule_timestamp`) VALUES
(2, 10, 'Monday', 'food1', '23mg', '2024-05-14 08:16:14');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_name` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `description` varchar(200) NOT NULL,
  `productPicture` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_name`, `category`, `price`, `stock`, `p_id`, `rating`, `description`, `productPicture`) VALUES
('German Dog', 'Pet', 40, 11, 2, 3, 'This is a German Dog imported recently from Germany', '1706875486109-tommy2.png'),
('Parrot Medicine', 'Pet Medicine', 77, 5, 5, 3, 'Very Good Parrot Medicine best for their Growth and Accretion', '1706961803324-zupreem.jpeg'),
('Husky', 'Pet', 58, 2, 7, 3, 'Husky breed of Dog. Limited slot available. Do not miss this amazing opportunity', '1706891767725-dog2.jpeg'),
('Puppy', 'Pet', 25, 16, 8, 4, 'New breed of Dog. Limited slot available. Do not miss this amazing opportunity', '1706891831693-dog3.jpeg'),
('White Cat', 'Pet', 14, 5, 9, 3, 'new breed of Cat. Limited slot available. Do not miss this amazing opportunity', '1706891884969-cat1.jpeg'),
('Light white cat', 'Pet', 20, 21, 10, 2, 'new breed of Cat. Limited slot available. Do not miss this amazing opportunity', '1706891919702-cat2.jpeg'),
('Orange cat', 'Pet', 30, 5, 11, 3, 'new breed of Cat. Limited slot available. Do not miss this amazing opportunity', '1706891954408-cat3.jpeg'),
('Australian Parrot', 'Pet', 10, 9, 12, 3, 'new breed of Parrot. Limited slot available. Do not miss this amazing opportunity', '1706891996804-parrot1.jpeg'),
('Macaw Parrot', 'Pet', 38, 8, 13, 3, 'new breed of Parrot. Limited slot available. Do not miss this amazing opportunity', '1706892141672-parrot2.jpeg'),
('Australian Parrot', 'Pet', 14, 5, 14, 4, 'new breed of Parrot. Limited slot available. Do not miss this amazing opportunity', '1706892169079-parrot3.jpeg'),
('Gold Fish', 'Pet', 7, 5, 15, 4, 'new breed of Fish. Limited slot available. Do not miss this amazing opportunity', '1706892202906-download.jpeg'),
('Tropical Fish', 'Pet', 23, 8, 16, 2, 'new breed of Fish. Limited slot available. Do not miss this amazing opportunity', '1706892276017-fish2.jpeg'),
('Nourvet cat  Food', 'Pet Food', 7, 23, 17, 4, 'All cat love this Food. Certified from ministry of Health', '1706892572311-norvetCatFood.jpeg'),
('Purina Dog Food', 'Pet Food', 7, 18, 18, 3, 'Dogs loves Purina. Limited slot available. Do not miss this amazing opportunity', '1706892657664-purnaDogFood.jpeg'),
('Pedigree Dog Food', 'Pet', 13, 10, 19, 3, 'Dogs love this food. Limited slot available. Do not miss this amazing opportunity', '1706892728934-pedigree.jpeg'),
('Petline Cat Food', 'Pet Food', 8, 14, 20, 2, 'Cat Food. Limited slot available. Do not miss this amazing opportunity', '1706892790317-petline.jpeg'),
('Zupreem Parrot food', 'Pet Food', 10, 18, 21, 2, 'Food for parrot. Limited slot available. Do not miss this amazing opportunity', '1706892872000-zupreem.jpeg'),
('Tetra Fish Food', 'Pet Food', 9, 15, 22, 4, 'new Food of Fish High Grade. Limited slot available. Do not miss this amazing opportunity', '1706892963894-tetra.jpg'),
('dsf', 'Pet', 45, 23, 48, 2, 'fsd', '1715617428616-BuBkFSh4Z4F9YT2ZLuBUYo.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `product_review`
--

CREATE TABLE `product_review` (
  `id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `description` varchar(200) NOT NULL,
  `date` text NOT NULL,
  `product_id` int(11) NOT NULL,
  `email` text NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_review`
--

INSERT INTO `product_review` (`id`, `rating`, `description`, `date`, `product_id`, `email`, `name`) VALUES
(1, 4, 'love it', '2024-04-27 16:35:40', 2, 'f200116@cfd.nu.edu.pk', 'sameed3'),
(2, 4, 'also love it', '2024-04-27 16:36:00', 2, 'usmanx458@gmail.com', 'ahsan1'),
(5, 3, 'Dummy\n', '2024-05-13 13:05:58', 5, 'f200116@cfd.nu.edu.pk', 'sameed3'),
(6, 2, 'dummy', '2024-05-13 13:06:07', 7, 'f200116@cfd.nu.edu.pk', 'sameed3'),
(7, 3, 'dummy', '2024-05-13 13:06:17', 8, 'f200116@cfd.nu.edu.pk', 'sameed3'),
(8, 0, 'retr\n', '2024-05-14 15:39:27', 48, 'rex@gmail.com', 'rex');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `reported_user_id` int(11) NOT NULL,
  `reporter_user_id` int(11) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `reported_user_id`, `reporter_user_id`, `reason`, `created_at`) VALUES
(34, 13, 4, 'bad behaviour', '2024-05-13 20:23:21');

-- --------------------------------------------------------

--
-- Table structure for table `userfeed`
--

CREATE TABLE `userfeed` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `feedname` varchar(255) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `likes` int(11) DEFAULT 0,
  `comment_count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `userfeed`
--

INSERT INTO `userfeed` (`id`, `userid`, `username`, `feedname`, `caption`, `created_at`, `likes`, `comment_count`) VALUES
(2, 2, 'rex', '1706101165872.jpg', NULL, '2024-01-24 17:59:25', 0, 0),
(3, 2, 'rex', '1706104004953.jpg', NULL, '2024-01-24 18:46:44', 0, 1),
(4, 3, 'anny', '1706199682574.jpg', 'test', '2024-01-25 21:21:22', 0, 0),
(5, 2, 'rex', '1706331535188.jpg', 'I am chilling', '2024-01-27 09:58:55', 0, 0),
(6, 2, 'rex', '1706798079376.png', 'whats up', '2024-02-01 19:34:39', 0, 0),
(7, 2, 'rex', '1707119833007.jpg', '', '2024-02-05 12:57:13', 0, 0),
(8, 2, 'rex', '1707314466008.jpg', 'heyy', '2024-02-07 19:01:06', 1, 0),
(9, 2, 'rex', '1707314541471.jpg', 'faadfsgb', '2024-02-07 19:02:21', 0, 0),
(10, 2, 'rex', '1708060246605.jpg', 'feb 16', '2024-02-16 10:10:46', 1, 2),
(11, 2, 'rex', '1708060412153.jpg', '#16febbbbb', '2024-02-16 10:13:32', 0, 0),
(12, 10, 'chaudhry1', '1708077704332.png', 'frest start', '2024-02-16 15:01:44', 3, 2),
(14, 10, 'chaudhry1', '1710415161136.jpg', 'nothingggg', '2024-03-14 16:19:21', 2, 7),
(15, 4, 'genny', '1710425646708.jpg', 'hjvgchf', '2024-03-14 19:14:06', 1, 0),
(16, 4, 'genny', '1710488168947.jpg', '', '2024-03-15 12:36:08', 2, 2),
(19, 4, 'genny', '1714486932569.jpg', 'Star', '2024-04-30 19:22:12', 1, 1),
(29, 3, 'anny', '1714919250452.jpg', 'hey ', '2024-05-05 19:27:30', 0, 0),
(31, 4, 'genny', '1715682428273.png', 'test1', '2024-05-14 15:27:08', 0, 0),
(33, 4, 'genny', '1715682696359.jpg', 'buttery flies', '2024-05-14 15:31:36', 1, 1),
(35, 10, 'chaudhry1', '1715691065205.jpeg', '14th may', '2024-05-14 17:51:05', 2, 2),
(36, 4, 'genny', '1715703854542.jpg', 'my new pet ', '2024-05-14 21:24:14', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

CREATE TABLE `userinfo` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `profilepic` varchar(255) DEFAULT NULL,
  `fullname` varchar(50) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `note` varchar(200) NOT NULL,
  `location` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`id`, `username`, `profilepic`, `fullname`, `birthdate`, `bio`, `note`, `location`) VALUES
(2, 'rex', '1707313862966.jpg', 'Rex', '2024-02-20', '????', 'Dark weather makes me feel wonder?', 'East Asia Pak'),
(3, 'anny', NULL, NULL, NULL, NULL, '', ''),
(4, 'genny', '1706333881914.jpg', NULL, NULL, 'star8', '', ''),
(5, 'annie', NULL, NULL, NULL, NULL, '', ''),
(10, 'chaudhry1', '1715691183703.png', 'chaudhryusman', '2024-05-22', 'this is my bio!', 'noting it here', 'FSD'),
(11, 'sameed3', NULL, NULL, NULL, NULL, '', ''),
(12, 'ahsan1', NULL, NULL, NULL, NULL, '', ''),
(13, 'mohinali', '1711439773794.jpg', NULL, NULL, 'no bio', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `is_blocked` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `created_at`, `is_blocked`) VALUES
(2, 'rex', '12345', 'rex@gmail.com', '2024-01-24 17:47:35', 0),
(3, 'anny', '12345', 'anny@gmail.com', '2024-01-24 18:00:58', 0),
(4, 'genny', '12345', 'genny@gmail.com', '2024-01-27 10:37:13', 0),
(5, 'annie', '12345', 'anny123@gmail.com', '2024-01-31 19:57:25', 0),
(6, 'ben', '12345', 'ben@gmail.com', '2024-02-01 21:22:07', 0),
(10, 'chaudhry1', '1234567890', 'f200115@cfd.nu.edu.pk', '2024-02-16 14:58:45', 0),
(11, 'sameed3', '12345', 'f200116@cfd.nu.edu.pk', '2024-02-16 17:19:12', 0),
(12, 'ahsan1', '12345', 'usmanx458@gmail.com', '2024-03-19 12:28:23', 0),
(13, 'mohinali', '12345', 'f200343@cfd.nu.edu.pk', '2024-03-26 12:33:50', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_requests`
--

CREATE TABLE `user_requests` (
  `id` int(11) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `request_text` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_requests`
--

INSERT INTO `user_requests` (`id`, `user_email`, `request_text`, `created_at`) VALUES
(10, 'rex@gmail.com', 'someone blocked me kindly unblock me test 2', '2024-05-13 15:04:40'),
(12, 'rex@gmail.com', 'kindly unblock me.....', '2024-05-13 15:07:52'),
(14, 'rex@gmail.com', 'sfsdf', '2024-05-13 16:24:50');

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
('John', 'Doe', 'One Health Approach', 'DVM', '123456', 'john.doe@example.com', 'Monday 9:00 AM - 5:00 PM', 'mypassword', 123, 'New York'),
('Usman ', 'Ashfaq', 'Emergency and Critical Care', 'Bachelor of Veterinary Medicine (BVM)', '12123', 'chusmanjutt.129@gmail.com', 'Morning (8:00 AM - 12:00 PM)', '12345', 124, 'Faisalabad, Pakistan'),
('Ali', 'Ahmad', 'Veterinary Medicine', 'Bachelor of Veterinary Medicine (BVM)', '1216A', 'usmanx458@gmail.com', 'Morning (8:00 AM - 12:00 PM)', '1234567890', 125, 'Faisalabad, Pakistan');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`id`, `item_id`, `email`) VALUES
(49, 5, 'f200116@cfd.nu.edu.pk'),
(50, 2, 'rex@gmail.com');

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
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `behavior_records`
--
ALTER TABLE `behavior_records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pet_id` (`pet_id`);

--
-- Indexes for table `commentinfo`
--
ALTER TABLE `commentinfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deliveries_order`
--
ALTER TABLE `deliveries_order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `followcount`
--
ALTER TABLE `followcount`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `followinfo`
--
ALTER TABLE `followinfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `health_records`
--
ALTER TABLE `health_records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `c1` (`pet_id`);

--
-- Indexes for table `likeinfo`
--
ALTER TABLE `likeinfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pet_memories`
--
ALTER TABLE `pet_memories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pet_posts`
--
ALTER TABLE `pet_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `pet_profile`
--
ALTER TABLE `pet_profile`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_owner_id` (`owner_id`);

--
-- Indexes for table `pet_schedule`
--
ALTER TABLE `pet_schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `product_review`
--
ALTER TABLE `product_review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reports_ibfk_1` (`reported_user_id`),
  ADD KEY `reports_ibfk_2` (`reporter_user_id`);

--
-- Indexes for table `userfeed`
--
ALTER TABLE `userfeed`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_requests`
--
ALTER TABLE `user_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vet`
--
ALTER TABLE `vet`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
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
  MODIFY `id` int(244) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `behavior_records`
--
ALTER TABLE `behavior_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `commentinfo`
--
ALTER TABLE `commentinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `deliveries_order`
--
ALTER TABLE `deliveries_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `followcount`
--
ALTER TABLE `followcount`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `followinfo`
--
ALTER TABLE `followinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `health_records`
--
ALTER TABLE `health_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `likeinfo`
--
ALTER TABLE `likeinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `pet_memories`
--
ALTER TABLE `pet_memories`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pet_posts`
--
ALTER TABLE `pet_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pet_profile`
--
ALTER TABLE `pet_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `pet_schedule`
--
ALTER TABLE `pet_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `product_review`
--
ALTER TABLE `product_review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `userfeed`
--
ALTER TABLE `userfeed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user_requests`
--
ALTER TABLE `user_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `vet`
--
ALTER TABLE `vet`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_vet` FOREIGN KEY (`vet_id`) REFERENCES `vet` (`id`);

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `behavior_records`
--
ALTER TABLE `behavior_records`
  ADD CONSTRAINT `behavior_records_ibfk_1` FOREIGN KEY (`pet_id`) REFERENCES `pet_profile` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `health_records`
--
ALTER TABLE `health_records`
  ADD CONSTRAINT `c1` FOREIGN KEY (`pet_id`) REFERENCES `pet_profile` (`id`);

--
-- Constraints for table `pet_posts`
--
ALTER TABLE `pet_posts`
  ADD CONSTRAINT `pet_posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `pet_profile`
--
ALTER TABLE `pet_profile`
  ADD CONSTRAINT `fk_owner_id` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`reported_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`reporter_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userfeed`
--
ALTER TABLE `userfeed`
  ADD CONSTRAINT `userfeed_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD CONSTRAINT `userinfo_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
