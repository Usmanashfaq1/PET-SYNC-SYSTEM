-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 18, 2024 at 03:45 PM
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
('2024-02-17 10:07:11.506', 'chaudhry1', 'f200115@cfd.nu.edu.pk', 'John Doe', 'john.doe@example.com', '(One Health Approach)', '2024-02-24T10:07', 'vaccination', 'approved', 9, 123, 10),
('2024-02-17 10:29:21.844', 'chaudhry1', 'f200115@cfd.nu.edu.pk', 'John Doe', 'john.doe@example.com', '(One Health Approach)', '2024-02-24T03:29', 'grooming', 'approved', 10, 123, 10),
('2024-03-12 19:44:36.167', 'chaudhry1', 'f200115@cfd.nu.edu.pk', 'John Doe', 'john.doe@example.com', '(One Health Approach)', '2024-03-23T12:49', 'vaccination', 'unapproved', 11, 123, 10);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`email`, `item_id`, `price`, `quantity`) VALUES
('f200115@cfd.nu.edu.pk', 13, 38, 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `commentinfo`
--

INSERT INTO `commentinfo` (`id`, `feedname`, `commenttext`, `commentby`, `commentto`, `likes`, `created_at`) VALUES
(1, '1710415161136.jpg', 'fds', 'genny', '0', 0, '2024-03-15 12:11:02'),
(2, '1710415161136.jpg', 'wowowow', 'genny', '0', 0, '2024-03-15 12:11:17'),
(3, '1710254208710.png', 'nice', 'genny', '0', 0, '2024-03-15 12:13:01'),
(4, '1710488168947.jpg', 'sunset', 'genny', '0', 0, '2024-03-15 12:36:27'),
(5, '1710488168947.jpg', 'wowwowowow', 'chaudhry1', '0', 0, '2024-03-18 19:36:55');

-- --------------------------------------------------------

--
-- Table structure for table `deliveries_order`
--

CREATE TABLE `deliveries_order` (
  `order_id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_email` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'Order Pending',
  `amount_paid` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `deliveries_order`
--

INSERT INTO `deliveries_order` (`order_id`, `customer_name`, `customer_email`, `status`, `amount_paid`) VALUES
(10, 'rex', 'rex@gmail.com', 'Order Pending', 224),
(11, 'chaudhry1', 'f200115@cfd.nu.edu.pk', 'Order Pending', 38);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `vet_name`, `vet_email`, `feedback`, `satisfied_count`, `dissatisfied_count`, `total_count`) VALUES
(2, 'John Doe', 'john.doe@example.com', 'dissatisfied', 3, 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `followcount`
--

CREATE TABLE `followcount` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `followers` int(11) DEFAULT 0,
  `following` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `followcount`
--

INSERT INTO `followcount` (`id`, `username`, `followers`, `following`) VALUES
(1, 'genny', 1, 2),
(2, 'chaudhry1', 1, 1),
(3, 'rex', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `followinfo`
--

CREATE TABLE `followinfo` (
  `id` int(11) NOT NULL,
  `follower` varchar(255) DEFAULT NULL,
  `following` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `followinfo`
--

INSERT INTO `followinfo` (`id`, `follower`, `following`) VALUES
(1, 'genny', 'chaudhry1'),
(3, 'genny', 'rex'),
(4, 'chaudhry1', 'genny');

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
(2, 4, 'rabies', 'anti-inflammatory', 'Flea Saliva And Bites', 'dental-cleaning', '2024-02-20 09:58:23');

-- --------------------------------------------------------

--
-- Table structure for table `likeinfo`
--

CREATE TABLE `likeinfo` (
  `id` int(11) NOT NULL,
  `feedname` varchar(255) DEFAULT NULL,
  `likedby` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `likeinfo`
--

INSERT INTO `likeinfo` (`id`, `feedname`, `likedby`) VALUES
(3, '1710415161136.jpg', 10),
(6, '1710415161136.jpg', 4),
(8, '1710254208710.png', 4),
(10, '1710425646708.jpg', 4),
(11, '1708077704332.png', 4),
(13, '1710488168947.jpg', 10);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_products`
--

INSERT INTO `order_products` (`id`, `order_id`, `product_id`, `product_name`, `quantity`, `price`) VALUES
(5, 10, 9, 'White Cat', 1, '14.00'),
(6, 10, 7, 'Husky', 1, '58.00'),
(7, 10, 8, 'Puppy', 3, '25.00'),
(8, 10, 5, 'Parrot Medicine', 1, '77.00'),
(9, 11, 13, 'Macaw Parrot', 1, '38.00');

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

--
-- Dumping data for table `pet_memories`
--

INSERT INTO `pet_memories` (`date`, `pet_owner`, `petname`, `about`, `petPicture`, `id`) VALUES
('Tue Feb 20 2024 15:05:12 GMT+0500 (Pakistan Standard Time)', 'genny', 'abc', 'dgsbafv', '1708423512041-chen-FJXJ_ghi1tw-unsplash.jpg', 2);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(4, 'genny', 'abc', 'male', 15, 'beagle', 'dog', '12', 'black', 'dgsbafv', '1708422961934-5ccf27a7a3b80d8ab01e145987630be9.jpg', 4),
(7, 'genny', 'wow', 'female', 3, 'beagle', 'cat', '6', 'brown', 'cat1', '1709963438615-chen-FJXJ_ghi1tw-unsplash.jpg', 4),
(8, 'chaudhry1', 'sdafas', 'male', 2, 'goldenRetriever', 'dog', '4', 'sad', 'dsf', '1709963771108-karlo-tottoc-ybZ5hRxaWS4-unsplash.jpg', 10),
(9, 'sameed3', 'wowdsf', 'male', 3, 'poodle', 'dog', '6', 'dfsf', 'dsfsf', '1709963861193-chen-FJXJ_ghi1tw-unsplash.jpg', 11),
(10, 'chaudhry1', 'gshdga', 'other', 3, 'bulldog', 'dog', '32', 'fadgfz', 'dfzx', '1710568993673-Untitled design.png', 10);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pet_schedule`
--

INSERT INTO `pet_schedule` (`id`, `pet_id`, `day_of_week`, `meal_name`, `portion_size`, `schedule_timestamp`) VALUES
(0, 0, 'Monday', 'fish', '3', '2024-02-21 05:40:36'),
(0, 4, 'Monday', 'fish', '3', '2024-02-21 05:44:09'),
(0, 4, 'Tuesday', 'chicken', '8', '2024-02-21 05:44:09');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_name`, `category`, `price`, `stock`, `p_id`, `rating`, `description`, `productPicture`) VALUES
('German Dog', 'Pet', 40, 12, 2, 3, 'This is a German Dog imported recently from Germany', '1706875486109-tommy2.png'),
('Parrot Medicine', 'Pet Medicine', 77, 1, 5, 3, '1', '1706961803324-zupreem.jpeg'),
('Husky', 'Pet', 58, 12, 7, 3, 'Husky breed of Dog. Limited slot available. Do not miss this amazing opportunity', '1706891767725-dog2.jpeg'),
('Puppy', 'Pet', 25, 32, 8, 4, 'New breed of Dog. Limited slot available. Do not miss this amazing opportunity', '1706891831693-dog3.jpeg'),
('White Cat', 'Pet', 14, 8, 9, 3, 'new breed of Cat. Limited slot available. Do not miss this amazing opportunity', '1706891884969-cat1.jpeg'),
('Light white cat', 'Pet', 20, 22, 10, 2, 'new breed of Cat. Limited slot available. Do not miss this amazing opportunity', '1706891919702-cat2.jpeg'),
('Orange cat', 'Pet', 30, 3, 11, 3, 'new breed of Cat. Limited slot available. Do not miss this amazing opportunity', '1706891954408-cat3.jpeg'),
('Australian Parrot', 'Pet', 10, 9, 12, 3, 'new breed of Parrot. Limited slot available. Do not miss this amazing opportunity', '1706891996804-parrot1.jpeg'),
('Macaw Parrot', 'Pet', 38, 8, 13, 3, 'new breed of Parrot. Limited slot available. Do not miss this amazing opportunity', '1706892141672-parrot2.jpeg'),
('Australian Parrot', 'Pet', 14, 2, 14, 4, 'new breed of Parrot. Limited slot available. Do not miss this amazing opportunity', '1706892169079-parrot3.jpeg'),
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
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `reported_user_id` int(11) NOT NULL,
  `reporter_user_id` int(11) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `reported_user_id`, `reporter_user_id`, `reason`, `created_at`) VALUES
(5, 3, 4, 'toxic behavuiur', '2024-02-21 10:31:23'),
(6, 10, 4, 'Issues', '2024-03-12 19:43:27'),
(7, 10, 4, 'bad ', '2024-03-14 11:54:51');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userfeed`
--

INSERT INTO `userfeed` (`id`, `userid`, `username`, `feedname`, `caption`, `created_at`, `likes`, `comment_count`) VALUES
(2, 2, 'rex', '1706101165872.jpg', NULL, '2024-01-24 17:59:25', 0, 0),
(3, 2, 'rex', '1706104004953.jpg', NULL, '2024-01-24 18:46:44', 0, 0),
(4, 3, 'anny', '1706199682574.jpg', 'test', '2024-01-25 21:21:22', 0, 0),
(5, 2, 'rex', '1706331535188.jpg', 'I am chilling', '2024-01-27 09:58:55', 0, 0),
(6, 2, 'rex', '1706798079376.png', 'whats up', '2024-02-01 19:34:39', 0, 0),
(7, 2, 'rex', '1707119833007.jpg', '', '2024-02-05 12:57:13', 0, 0),
(8, 2, 'rex', '1707314466008.jpg', 'heyy', '2024-02-07 19:01:06', 0, 0),
(9, 2, 'rex', '1707314541471.jpg', 'faadfsgb', '2024-02-07 19:02:21', 0, 0),
(10, 2, 'rex', '1708060246605.jpg', 'feb 16', '2024-02-16 10:10:46', 0, 0),
(11, 2, 'rex', '1708060412153.jpg', '#16febbbbb', '2024-02-16 10:13:32', 0, 0),
(12, 10, 'chaudhry1', '1708077704332.png', 'frest start', '2024-02-16 15:01:44', 1, 0),
(13, 4, 'genny', '1710254208710.png', 'nothing', '2024-03-12 19:36:48', 1, 1),
(14, 10, 'chaudhry1', '1710415161136.jpg', 'nothingggg', '2024-03-14 16:19:21', 2, 2),
(15, 4, 'genny', '1710425646708.jpg', 'hjvgchf', '2024-03-14 19:14:06', 1, 0),
(16, 4, 'genny', '1710488168947.jpg', '', '2024-03-15 12:36:08', 1, 2);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`id`, `username`, `profilepic`, `fullname`, `birthdate`, `bio`, `note`, `location`) VALUES
(2, 'rex', '1707313862966.jpg', 'Rex', '2024-02-20', '????', 'Dark weather makes me feel wonder?', 'East Asia Pak'),
(3, 'anny', NULL, NULL, NULL, NULL, '', ''),
(4, 'genny', '1706333881914.jpg', NULL, NULL, 'star', '', ''),
(5, 'annie', NULL, NULL, NULL, NULL, '', ''),
(10, 'chaudhry1', '1708077811031.JPG', '/////', '2024-03-21', 'hey there!bbbbbbbbbbb', 'hing', 'FSD'),
(11, 'sameed3', NULL, NULL, NULL, NULL, '', '');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(11, 'sameed3', '12345', 'f200116@cfd.nu.edu.pk', '2024-02-16 17:19:12', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_requests`
--

CREATE TABLE `user_requests` (
  `id` int(11) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `request_text` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_requests`
--

INSERT INTO `user_requests` (`id`, `user_email`, `request_text`, `created_at`) VALUES
(3, 'anny@gmail.com', 'unblock me !!!', '2024-02-21 05:35:27');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`id`, `item_id`, `email`) VALUES
(6, 7, 'rex@gmail.com');

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
  MODIFY `id` int(244) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `behavior_records`
--
ALTER TABLE `behavior_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `commentinfo`
--
ALTER TABLE `commentinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `deliveries_order`
--
ALTER TABLE `deliveries_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `followcount`
--
ALTER TABLE `followcount`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `followinfo`
--
ALTER TABLE `followinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `health_records`
--
ALTER TABLE `health_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `likeinfo`
--
ALTER TABLE `likeinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `pet_memories`
--
ALTER TABLE `pet_memories`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pet_posts`
--
ALTER TABLE `pet_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pet_profile`
--
ALTER TABLE `pet_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `userfeed`
--
ALTER TABLE `userfeed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user_requests`
--
ALTER TABLE `user_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `vet`
--
ALTER TABLE `vet`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
