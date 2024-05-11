-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 11, 2024 at 04:54 PM
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
('2024-05-01 11:18:17.532', 'sameed3', 'f200116@cfd.nu.edu.pk', 'Usman  Ashfaq', 'chusmanjutt.129@gmail.com', '(Emergency and Critical Care)', '2024-05-10T11:18', 'dentalCare', 'unapproved', 18, 124, 11);

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
(2, 10, '2024-03-22 16:45:00', 'gdfv', 'Training', '2024-03-16 07:45:19', 'f200115@cfd.nu.edu.pk', 'gshdga', '1710568993673-Untitled design.png'),
(3, 10, '2024-03-18 19:49:00', 'lazy behaviour', 'Behavior', '2024-03-18 11:47:02', 'f200115@cfd.nu.edu.pk', 'gshdga', '1710568993673-Untitled design.png');

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
(17, '1715184448140.jpg', 'wow', 'genny', '0', 0, '2024-05-08 21:45:34');

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
(1, 'sameed3', 'f200116@cfd.nu.edu.pk', 'confirmed', 83, '2024-04-24'),
(2, 'sameed3', 'f200116@cfd.nu.edu.pk', 'confirmed', 83, '2024-04-27');

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
(3, 'Usman  Ashfaq', 'chusmanjutt.129@gmail.com', 'dissatisfied', 0, 1, 1);

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
(1, 'genny', 1, -7),
(2, 'chaudhry1', 2, 1),
(3, 'rex', 1, 0),
(4, 'ahsan1', 1, 0),
(5, 'mohinali', 0, 1),
(6, '<%= userData.data.username %>', -10, 0);

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
(3, 'genny', 'rex'),
(7, 'mohinali', 'chaudhry1'),
(11, 'genny', 'ahsan1'),
(14, 'chaudhry1', 'genny'),
(16, 'genny', 'chaudhry1');

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
(2, 4, 'distemper', 'anti-inflammatory', 'Flea Saliva And Bites', 'dental-cleaning', '2024-02-20 09:58:23');

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
(26, '1710254208710.png', 4),
(27, '1715184448140.jpg', 10),
(28, '1710488168947.jpg', 4),
(30, '1715184448140.jpg', 4);

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
(2, 'chaudhry1', 'genny', 'yes i just saw your message?', '2024-05-11 14:45:30');

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
(48, 2, 7, 'Husky', 1, 58.00);

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
('Mon Mar 25 2024 19:20:10 GMT+0500 (Pakistan Standard Time)', 'genny', 'Tom', 'i love to make other animals my friends', '1711376410271-PET CARRIER.jpg', 3);

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
(8, 'chaudhry1', 'sdafas', 'male', 2, 'goldenRetriever', 'dog', '4', 'sad', 'dsf', '1709963771108-karlo-tottoc-ybZ5hRxaWS4-unsplash.jpg', 10),
(9, 'sameed3', 'wowdsf', 'male', 3, 'poodle', 'dog', '6', 'dfsf', 'dsfsf', '1709963861193-chen-FJXJ_ghi1tw-unsplash.jpg', 11),
(10, 'chaudhry1', 'gshdga', 'other', 3, 'bulldog', 'dog', '32', 'fadgfz', 'dfzx', '1710568993673-Untitled design.png', 10),
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
(0, 0, 'Monday', 'fish', '3', '2024-02-21 05:40:36'),
(0, 4, 'Monday', 'fish', '3', '2024-02-21 05:44:09'),
(0, 4, 'Tuesday', 'chicken', '8', '2024-02-21 05:44:09'),
(0, 0, 'Monday', 'fish', '10', '2024-03-26 08:04:07'),
(0, 11, 'Monday', 'fish', '12', '2024-03-26 08:04:21');

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
('Tetra Fish Food', 'Pet Food', 9, 15, 22, 4, 'new Food of Fish High Grade. Limited slot available. Do not miss this amazing opportunity', '1706892963894-tetra.jpg');

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
(3, 0, '', '2024-05-01 11:01:47', 2, 'rex@gmail.com', 'rex'),
(4, 0, 'yes good\n', '2024-05-05 19:25:40', 2, 'rex@gmail.com', 'rex');

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
(31, 10, 4, 'bad test', '2024-05-08 21:37:07');

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
(12, 10, 'chaudhry1', '1708077704332.png', 'frest start', '2024-02-16 15:01:44', 2, 1),
(13, 4, 'genny', '1710254208710.png', 'nothing', '2024-03-12 19:36:48', 1, 2),
(14, 10, 'chaudhry1', '1710415161136.jpg', 'nothingggg', '2024-03-14 16:19:21', 2, 6),
(15, 4, 'genny', '1710425646708.jpg', 'hjvgchf', '2024-03-14 19:14:06', 1, 0),
(16, 4, 'genny', '1710488168947.jpg', '', '2024-03-15 12:36:08', 2, 2),
(17, 4, 'genny', '1711438227932.jpg', 'heyy', '2024-03-26 12:30:27', 1, 0),
(18, 4, 'genny', '1711454636785.jpg', 'i am genny', '2024-03-26 17:03:56', 0, 0),
(19, 4, 'genny', '1714486932569.jpg', 'Star', '2024-04-30 19:22:12', 1, 1),
(20, 4, 'genny', '1714538572085.jpg', 'test message', '2024-05-01 09:42:52', 0, 0),
(21, 4, 'genny', '1714538744515.jpg', 'test 8', '2024-05-01 09:45:44', 0, 0),
(22, 4, 'genny', '1714538753128.jpg', 'test 8', '2024-05-01 09:45:53', 0, 0),
(23, 4, 'genny', '1714538978140.jpg', 'test 9', '2024-05-01 09:49:38', 0, 0),
(24, 4, 'genny', '1714539003598.jpg', 'test 20', '2024-05-01 09:50:03', 0, 0),
(25, 4, 'genny', '1714542109614.jpg', 'test99', '2024-05-01 10:41:49', 0, 0),
(26, 4, 'genny', '1714542113182.jpg', 'test99', '2024-05-01 10:41:53', 0, 0),
(27, 4, 'genny', '1714542389198.jpg', 'hey test 11133', '2024-05-01 10:46:29', 0, 0),
(28, 4, 'genny', '1714543226553.jpg', 'test 11111', '2024-05-01 11:00:26', 1, 1),
(29, 3, 'anny', '1714919250452.jpg', 'hey ', '2024-05-05 19:27:30', 0, 0),
(30, 10, 'chaudhry1', '1715184448140.jpg', 'test post 1111', '2024-05-08 21:07:28', 2, 1);

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
(10, 'chaudhry1', '1708077811031.JPG', '/////', '2024-03-21', 'hey there!bbbbbbbbbbb', 'hing', 'FSD'),
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
(2, 'rex', '12345', 'rex@gmail.com', '2024-01-24 17:47:35', 1),
(3, 'anny', '12345', 'anny@gmail.com', '2024-01-24 18:00:58', 0),
(4, 'genny', '12345', 'genny@gmail.com', '2024-01-27 10:37:13', 0),
(5, 'annie', '12345', 'anny123@gmail.com', '2024-01-31 19:57:25', 0),
(6, 'ben', '12345', 'ben@gmail.com', '2024-02-01 21:22:07', 0),
(10, 'chaudhry1', '12345', 'f200115@cfd.nu.edu.pk', '2024-02-16 14:58:45', 0),
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
('Usman ', 'Ashfaq', 'Emergency and Critical Care', 'Bachelor of Veterinary Medicine (BVM)', '12123', 'chusmanjutt.129@gmail.com', 'Morning (8:00 AM - 12:00 PM)', '12345', 124, 'Faisalabad, Pakistan');

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
  MODIFY `id` int(244) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `behavior_records`
--
ALTER TABLE `behavior_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `commentinfo`
--
ALTER TABLE `commentinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `deliveries_order`
--
ALTER TABLE `deliveries_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `followcount`
--
ALTER TABLE `followcount`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `followinfo`
--
ALTER TABLE `followinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `health_records`
--
ALTER TABLE `health_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `likeinfo`
--
ALTER TABLE `likeinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `pet_memories`
--
ALTER TABLE `pet_memories`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `product_review`
--
ALTER TABLE `product_review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `userfeed`
--
ALTER TABLE `userfeed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user_requests`
--
ALTER TABLE `user_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `vet`
--
ALTER TABLE `vet`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

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
