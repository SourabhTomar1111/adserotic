-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2022 at 07:46 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ads_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `campaigns`
--

CREATE TABLE `campaigns` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `campaign_name` varchar(255) NOT NULL,
  `group_id` int(11) NOT NULL,
  `label_ids` varchar(255) NOT NULL,
  `device_type` varchar(15) NOT NULL,
  `tracker` varchar(100) NOT NULL,
  `ad_format` int(1) NOT NULL,
  `ad_dimension_size` varchar(20) NOT NULL,
  `duration` int(1) NOT NULL,
  `ad_start_at` datetime NOT NULL,
  `ad_end_at` datetime NOT NULL,
  `frequency_capping` int(1) NOT NULL,
  `frequency_cap_times` int(11) NOT NULL,
  `frequency_cap_every` int(11) NOT NULL,
  `frequency_cap_units` varchar(12) NOT NULL,
  `category` varchar(100) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `audience_exclusion` int(1) NOT NULL,
  `audience_exclusion_cookie` text NOT NULL,
  `audience_retargeting` int(1) NOT NULL,
  `audience_retargeting_cookie` text NOT NULL,
  `keyword_targeting` int(1) NOT NULL,
  `keyword_selected` text NOT NULL,
  `keyword_excluded` text NOT NULL,
  `geo_targeting` int(1) NOT NULL,
  `country` varchar(30) NOT NULL,
  `state` varchar(20) NOT NULL,
  `region` varchar(20) NOT NULL,
  `os_targeting` int(1) NOT NULL,
  `os` varchar(255) NOT NULL,
  `exchange_format` varchar(20) NOT NULL,
  `ad_position` varchar(30) NOT NULL,
  `browser_targeting` int(1) NOT NULL,
  `browser` varchar(255) NOT NULL,
  `browser_language_targeting` int(1) NOT NULL,
  `browser_language_selected` varchar(255) NOT NULL,
  `connection_targeting` int(1) NOT NULL,
  `connection_type` varchar(50) NOT NULL,
  `status` int(1) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` bigint(20) NOT NULL,
  `country_name` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `country_name`) VALUES
(1, 'Anguilla'),
(2, 'Argentina'),
(3, 'Falkland Islands'),
(4, 'Chile'),
(5, 'French Southern Territories'),
(6, 'New Zealand'),
(7, 'Saint Helena'),
(8, 'Uruguay'),
(9, 'South Africa'),
(10, 'Brazil'),
(11, 'Lesotho'),
(12, 'Namibia'),
(13, 'French Polynesia'),
(14, 'Paraguay'),
(15, 'Swaziland'),
(16, 'Smaller Territories of Chile'),
(17, 'Botswana'),
(18, 'Mozambique'),
(19, 'Madagascar'),
(20, 'Smaller Territories of the UK'),
(21, 'Bolivia'),
(22, 'New Caledonia'),
(23, 'Zimbabwe'),
(24, 'Cook Islands'),
(25, 'Reunion'),
(26, 'Tonga'),
(27, 'Mauritius'),
(28, 'Vanuatu'),
(29, 'Fiji Islands'),
(30, 'Peru'),
(31, 'Zambia'),
(32, 'Angola'),
(33, 'Malawi'),
(34, 'American Samoa'),
(35, 'Wallis and Futuna'),
(36, 'Samoa'),
(37, 'Mayotte'),
(38, 'Comoros'),
(39, 'External Territories of Australia'),
(40, 'Congo (Dem. Rep.)'),
(41, 'Solomon Islands'),
(42, 'Tanzania'),
(43, 'Papua New Guinea'),
(44, 'Indonesia'),
(45, 'Tokelau'),
(46, 'Tuvalu'),
(47, 'East Timor'),
(48, 'Congo'),
(49, 'Kenya'),
(50, 'Ecuador'),
(51, 'Colombia'),
(52, 'Burundi'),
(53, 'Gabon'),
(54, 'Kiribati'),
(55, 'Rwanda'),
(56, 'Equatorial Guinea'),
(57, 'Uganda'),
(58, 'Somalia'),
(59, 'Maldives'),
(60, 'Nauru'),
(61, 'Sao Tome and Principe'),
(62, 'Malaysia'),
(63, 'Cameroon'),
(64, 'Palau'),
(65, 'French Guiana'),
(66, 'Guyana (British)'),
(67, 'Central African Republic'),
(68, 'Ethiopia'),
(69, 'Micronesia'),
(70, 'Sudan'),
(71, 'Nigeria'),
(72, 'Liberia'),
(73, 'Ivory Coast'),
(74, 'Brunei'),
(75, 'Marshall Islands'),
(76, 'Philippines'),
(77, 'Ghana'),
(78, 'Suriname'),
(79, 'Venezuela'),
(80, 'Thailand'),
(81, 'Sri Lanka'),
(82, 'Togo'),
(83, 'Benin'),
(84, 'Sierra Leone'),
(85, 'Panama'),
(86, 'Guinea Republic'),
(87, 'Chad'),
(88, 'India'),
(89, 'Costa Rica'),
(90, 'Vietnam'),
(91, 'Burkina Faso'),
(92, 'Trinidad and Tobago'),
(93, 'Cambodia'),
(94, 'Nicaragua'),
(95, 'Mali'),
(96, 'Djibouti'),
(97, 'Guinea-Bissau'),
(98, 'Niger'),
(99, 'Grenada'),
(100, 'Netherlands Antilles'),
(101, 'Myanmar'),
(102, 'Senegal'),
(103, 'Yemen'),
(104, 'Saint Vincent and The Grenadines'),
(105, 'Eritrea'),
(106, 'Barbados'),
(107, 'Honduras'),
(108, 'Gambia'),
(109, 'El Salvador'),
(110, 'Guam'),
(111, 'Saint Lucia'),
(112, 'Guatemala'),
(113, 'Northern Mariana Islands'),
(114, 'Martinique'),
(115, 'Mexico'),
(116, 'Cape Verde'),
(117, 'Laos'),
(118, 'Mauritania'),
(119, 'Dominica'),
(120, 'Guadeloupe'),
(121, 'Belize'),
(122, 'Saudi Arabia'),
(123, 'Oman'),
(124, 'Antigua and Barbuda'),
(125, 'Saint Kitts and Nevis'),
(126, 'Virgin Islands of the United States'),
(127, 'Jamaica'),
(128, 'Dominican Republic'),
(129, 'Puerto Rico'),
(130, 'Haiti'),
(131, 'China'),
(132, 'British Virgin Islands'),
(133, 'Cayman Islands'),
(134, 'Algeria'),
(135, 'Cuba'),
(136, 'Bangladesh'),
(137, 'Bahamas'),
(138, 'Turks and Caicos Islands'),
(139, 'Taiwan'),
(140, 'Western Sahara'),
(141, 'Egypt'),
(142, 'Pakistan'),
(143, 'Libya'),
(144, 'United Arab Emirates'),
(145, 'Japan'),
(146, 'Qatar'),
(147, 'Iran'),
(148, 'Bahrain'),
(149, 'Nepal'),
(150, 'Bhutan'),
(151, 'Spain'),
(152, 'Morocco'),
(153, 'Kuwait'),
(154, 'Jordan'),
(155, 'Israel'),
(156, 'Iraq'),
(157, 'Aruba'),
(158, 'Palestine'),
(159, 'Tunisia'),
(160, 'Bermuda'),
(161, 'Syria'),
(162, 'Portugal'),
(163, 'Lebanon'),
(164, 'Korea (South)'),
(165, 'Cyprus'),
(166, 'Greece'),
(167, 'Malta'),
(168, 'Turkey'),
(169, 'Italy'),
(170, 'Uzbekistan'),
(171, 'Tajikistan'),
(172, 'Turkmenistan'),
(173, 'Korea (North)'),
(174, 'Azerbaijan'),
(175, 'Armenia'),
(176, 'Albania'),
(177, 'Kyrgyzstan'),
(178, 'Kazakhstan'),
(179, 'Macedonia'),
(180, 'Georgia'),
(181, 'Russia'),
(182, 'France'),
(183, 'Bulgaria'),
(184, 'Serbia and Montenegro'),
(185, 'Andorra'),
(186, 'Croatia'),
(187, 'Bosnia and Herzegovina'),
(188, 'Mongolia'),
(189, 'Romania'),
(190, 'Monaco'),
(191, 'San Marino'),
(192, 'Ukraine'),
(193, 'Slovenia'),
(194, 'Moldova'),
(195, 'Hungary'),
(196, 'Switzerland'),
(197, 'Austria'),
(198, 'Saint Pierre and Miquelon'),
(199, 'Liechtenstein'),
(200, 'Germany'),
(201, 'Slovakia'),
(202, 'Czech Republic'),
(203, 'Jersey'),
(204, 'Poland'),
(205, 'Guernsey and Alderney'),
(206, 'Luxembourg'),
(207, 'Belgium'),
(208, 'Netherlands'),
(209, 'Ireland'),
(210, 'Belarus'),
(211, 'Lithuania'),
(212, 'Isle of Man'),
(213, 'Denmark'),
(214, 'Sweden'),
(215, 'Latvia'),
(216, 'Estonia'),
(217, 'Norway'),
(218, 'Finland'),
(219, 'Greenland'),
(220, 'Faroe Islands'),
(221, 'Iceland'),
(222, 'Svalbard and Jan Mayen'),
(223, 'United States of America'),
(224, 'Canada'),
(225, 'United Kingdom'),
(226, 'Australia'),
(227, 'Singapore'),
(228, 'Saint Barthelemy'),
(229, 'Russian Federation'),
(230, 'Korea, Dem. Republic of'),
(231, 'Hong Kong'),
(232, 'England '),
(233, 'Bonaire'),
(235, 'Canary Islands'),
(236, 'Curacao'),
(237, 'Gibraltar'),
(238, 'Guinea-Equat'),
(239, 'Kosovo'),
(240, 'Mariana Islands'),
(241, 'Montenegro'),
(242, 'Montserrat'),
(243, 'Nevis'),
(244, 'Niue'),
(245, 'Seychelles'),
(246, 'St. Barthelemy'),
(247, 'St. Eustatius'),
(248, 'St. Helena'),
(249, 'St. Kitts'),
(250, 'St. Lucia'),
(251, 'St. Maarten'),
(252, 'St. Vincent'),
(253, 'Tahiti'),
(254, 'Vatican City'),
(255, 'Macau');

-- --------------------------------------------------------

--
-- Table structure for table `device_dimensions`
--

CREATE TABLE `device_dimensions` (
  `id` int(11) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `device` enum('desktop','mobile','laptop','') NOT NULL,
  `type` enum('static_banner','overlay_banner','video_banner','video_stream') NOT NULL,
  `ad_format` enum('above_fold','below_fold','fullpage','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `device_dimensions`
--

INSERT INTO `device_dimensions` (`id`, `width`, `height`, `device`, `type`, `ad_format`) VALUES
(1, 160, 1000, 'desktop', 'static_banner', 'above_fold'),
(2, 300, 250, 'desktop', 'static_banner', 'above_fold'),
(3, 315, 300, 'desktop', 'static_banner', 'above_fold'),
(4, 400, 400, 'desktop', 'static_banner', 'above_fold'),
(5, 468, 60, 'desktop', 'static_banner', 'above_fold'),
(6, 635, 150, 'desktop', 'static_banner', 'above_fold'),
(7, 770, 76, 'desktop', 'static_banner', 'above_fold'),
(8, 950, 250, 'desktop', 'static_banner', 'above_fold'),
(9, 300, 150, 'mobile', 'static_banner', 'above_fold'),
(10, 300, 250, 'mobile', 'static_banner', 'above_fold'),
(11, 305, 99, 'mobile', 'static_banner', 'above_fold'),
(12, 315, 300, 'mobile', 'static_banner', 'above_fold'),
(13, 320, 75, 'mobile', 'static_banner', 'above_fold'),
(14, 950, 250, 'mobile', 'static_banner', 'above_fold'),
(15, 300, 250, 'desktop', 'video_banner', 'above_fold'),
(16, 305, 99, 'mobile', 'video_banner', 'above_fold'),
(17, 300, 250, 'desktop', 'static_banner', 'below_fold'),
(18, 770, 76, 'desktop', 'static_banner', 'below_fold'),
(19, 950, 250, 'desktop', 'static_banner', 'below_fold'),
(20, 300, 150, 'mobile', 'static_banner', 'below_fold'),
(21, 300, 250, 'mobile', 'static_banner', 'below_fold'),
(22, 305, 99, 'mobile', 'static_banner', 'below_fold'),
(23, 315, 300, 'mobile', 'static_banner', 'below_fold'),
(24, 320, 75, 'mobile', 'static_banner', 'below_fold'),
(25, 950, 250, 'mobile', 'static_banner', 'below_fold'),
(26, 300, 150, 'mobile', 'video_banner', 'below_fold'),
(27, 305, 99, 'mobile', 'video_banner', 'below_fold');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `keywords`
--

CREATE TABLE `keywords` (
  `id` int(11) NOT NULL,
  `keyword` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `keywords`
--

INSERT INTO `keywords` (`id`, `keyword`, `slug`, `user_id`, `status`, `created_at`) VALUES
(1, 'Laptop', 'laptop', 1, 1, '2022-03-29 16:37:32'),
(2, 'Cricket', 'cricket', 1, 1, '2022-03-29 16:37:32'),
(3, 'Electric', 'electric', 1, 1, '2022-03-29 16:39:59'),
(4, 'Washing Machine', 'washing-machine', 1, 1, '2022-03-29 16:39:59'),
(5, 'XXX', 'xxx', 1, 1, '2022-03-29 16:41:25'),
(6, 'Fuck', 'fuck', 1, 1, '2022-03-29 16:41:25'),
(7, 'Sex', 'sex', 1, 1, '2022-03-29 16:42:28'),
(8, 'Mobile', 'mobile', 1, 1, '2022-03-29 16:42:28'),
(9, 'Toys', 'toys', 1, 1, '2022-03-29 16:43:05'),
(10, 'Gadgets', 'gadgets', 1, 1, '2022-03-29 16:43:05'),
(11, 'Women', 'women', 1, 1, '2022-03-29 16:43:44'),
(12, 'Men', 'men', 1, 1, '2022-03-29 16:43:44'),
(13, 'Apple', 'apple', 1, 1, '2022-03-29 16:44:20'),
(14, 'Google', 'google', 1, 1, '2022-03-29 16:44:20'),
(15, 'MacBook', 'macbook', 1, 1, '2022-03-29 16:45:05'),
(16, 'Windows', 'windows', 1, 1, '2022-03-29 16:45:05');

-- --------------------------------------------------------

--
-- Table structure for table `labels`
--

CREATE TABLE `labels` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 1,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `labels`
--

INSERT INTO `labels` (`id`, `user_id`, `title`, `slug`, `status`) VALUES
(1, 1, 'dsd', 'dsd', 1),
(2, 1, 'addddd', 'addddd', 1),
(3, 1, 'sdd', 'sdd', 1),
(4, 1, 'test', 'test', 1),
(5, 1, 'newtest', 'newtest', 1),
(6, 1, 'testsdfsd', 'testsdfsd', 1),
(7, 1, 'ssssss', 'ssssss', 1),
(8, 1, 'ddddd', 'ddddd', 1),
(9, 1, 'eeeee', 'eeeee', 1),
(10, 1, 'reerterter', 'reerterter', 1),
(11, 1, 'sdfsdf', 'sdfsdf', 1),
(12, 1, 'fghfghfghf', 'fghfghfghf', 1),
(13, 1, 'ttttjjjjj', 'ttttjjjjj', 1),
(14, 1, 'mymy', 'mymy', 1),
(15, 1, 'ggggg', 'ggggg', 1),
(16, 1, 'yyyy', 'yyyy', 1),
(17, 1, 'yyyyyy', 'yyyyyy', 1),
(18, 1, 'tests', 'tests', 1),
(27, 2, 'cricket', 'cricket', 1),
(28, 2, 'cricket', 'cricket', 1),
(31, 57, 'Football', 'football', 1),
(34, 57, 'Chess', 'chess', 1),
(35, 57, 'Cricket', 'cricket', 1),
(36, 57, 'Pepsi', 'pepsi', 1),
(37, 57, 'Coca cola', 'coca-cola', 1),
(38, 57, 'Lenovo', 'lenovo', 1),
(55, 3, 'test', 'test', 1),
(56, 3, 'cricket', 'cricket', 1),
(57, 3, 'pet', 'pet', 1);

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` int(1) NOT NULL,
  `title` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `extension` varchar(10) NOT NULL,
  `mimetype` varchar(50) NOT NULL,
  `size` int(11) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 2 COMMENT '1:approved, 2:pending, 3:rejected',
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `added` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `user_id`, `type`, `title`, `name`, `extension`, `mimetype`, `size`, `status`, `updated`, `added`) VALUES
(29, 57, 1, '3.jpeg', '1644917834907_2.jpeg', 'jpeg', 'image/jpeg', 81958, 2, '2022-02-15 09:37:14', '2022-02-15 09:37:14'),
(30, 57, 1, '1.jpeg', '1644917834907_2.jpeg', 'jpeg', 'image/jpeg', 74201, 2, '2022-02-15 09:37:15', '2022-02-15 09:37:15'),
(31, 57, 1, '2.jpeg', '1644917834907_2.jpeg', 'jpeg', 'image/jpeg', 43759, 2, '2022-02-15 09:37:15', '2022-02-15 09:37:15'),
(32, 57, 3, 'file_example_AVI_640_800kB.avi', '1644917855309_file_example_AVI_640_800kB.avi', 'avi', 'video/avi', 829208, 2, '2022-02-15 09:37:35', '2022-02-15 09:37:35'),
(33, 57, 2, 'passengers.png', '1644917902252_passengers.png', 'png', 'image/png', 673, 2, '2022-02-15 09:38:22', '2022-02-15 09:38:22'),
(34, 57, 4, 'file_example_AVI_1920_2_3MG.avi', '1644918468658_file_example_AVI_1920_2_3MG.avi', 'avi', 'video/avi', 2279794, 2, '2022-02-15 09:47:48', '2022-02-15 09:47:48'),
(36, 57, 4, 'SampleVideo_1280x720_5mb.mp4', '1646418295580_SampleVideo_1280x720_5mb.mp4', 'mp4', 'video/mp4', 5253880, 2, '2022-03-04 18:24:55', '2022-03-04 18:24:55'),
(37, 57, 4, 'SampleVideo_1280x720_1mb.mp4', '1646420358118_SampleVideo_1280x720_1mb.mp4', 'mp4', 'video/mp4', 1055736, 2, '2022-03-04 18:59:18', '2022-03-04 18:59:18'),
(38, 57, 4, 'SampleVideo_1280x720_10mb.mp4', '1646420366046_SampleVideo_1280x720_10mb.mp4', 'mp4', 'video/mp4', 10498677, 2, '2022-03-04 18:59:26', '2022-03-04 18:59:26'),
(39, 57, 2, 'Website logo_200x55 pixel.png', '1646420647127_Website logo_200x55 pixel.png', 'png', 'image/png', 3980, 2, '2022-03-04 19:04:07', '2022-03-04 19:04:07'),
(40, 57, 1, 'cursive.jpg', '1646421277693_cursive.jpg', 'jpg', 'image/jpeg', 160576, 2, '2022-03-04 19:14:37', '2022-03-04 19:14:37'),
(41, 57, 2, 'Youtube channel art.png', '1646421314980_Youtube channel art.png', 'png', 'image/png', 86853, 2, '2022-03-04 19:15:14', '2022-03-04 19:15:14'),
(42, 57, 2, 'FB Cover.png', '1646421398356_FB Cover.png', 'png', 'image/png', 40333, 2, '2022-03-04 19:16:38', '2022-03-04 19:16:38'),
(43, 57, 2, 'FB Cover.png', '1646421556976_FB Cover.png', 'png', 'image/png', 40333, 2, '2022-03-04 19:19:16', '2022-03-04 19:19:16'),
(44, 57, 2, 'FB Cover.png', '1646421921219_FB Cover.png', 'png', 'image/png', 40333, 2, '2022-03-04 19:25:21', '2022-03-04 19:25:21'),
(45, 57, 2, 'FB Cover.png', '1646421957047_FB Cover.png', 'png', 'image/png', 40333, 2, '2022-03-04 19:25:57', '2022-03-04 19:25:57'),
(46, 57, 2, 'FB Cover.png', '1646422134427_FB Cover.png', 'png', 'image/png', 40333, 2, '2022-03-04 19:28:54', '2022-03-04 19:28:54'),
(47, 57, 2, 'Facebook Logo.png', '1646422171649_Facebook Logo.png', 'png', 'image/png', 5637, 2, '2022-03-04 19:29:31', '2022-03-04 19:29:31'),
(48, 57, 2, 'Facebook Logo.png', '1646422289396_Facebook Logo.png', 'png', 'image/png', 5637, 2, '2022-03-04 19:31:29', '2022-03-04 19:31:29'),
(49, 57, 2, 'Facebook Logo.png', '1646422342003_Facebook Logo.png', 'png', 'image/png', 5637, 2, '2022-03-04 19:32:22', '2022-03-04 19:32:22'),
(50, 57, 3, 'file_example_AVI_640_800kB.avi', '1646422385935_file_example_AVI_640_800kB.avi', 'avi', 'video/avi', 829208, 2, '2022-03-04 19:33:05', '2022-03-04 19:33:05'),
(51, 57, 3, 'file_example_AVI_480_750kB.avi', '1646422451696_file_example_AVI_480_750kB.avi', 'avi', 'video/avi', 742478, 2, '2022-03-04 19:34:11', '2022-03-04 19:34:11'),
(52, 57, 1, 'WhatsApp Image 2021-12-10 at 10.01.09 PM (1).jpeg', '1646422722697_WhatsApp Image 2021-12-10 at 10.01.09 PM (1).jpeg', 'jpeg', 'image/jpeg', 79324, 2, '2022-03-04 19:38:42', '2022-03-04 19:38:42'),
(53, 57, 1, '3.jpeg', '1646422865209_3.jpeg', 'jpeg', 'image/jpeg', 81958, 2, '2022-03-04 19:41:05', '2022-03-04 19:41:05'),
(54, 57, 1, '1.jpeg', '1646422896130_1.jpeg', 'jpeg', 'image/jpeg', 74201, 2, '2022-03-04 19:41:36', '2022-03-04 19:41:36'),
(55, 57, 1, '2.jpeg', '1646422951565_2.jpeg', 'jpeg', 'image/jpeg', 43759, 2, '2022-03-04 19:42:31', '2022-03-04 19:42:31'),
(56, 57, 1, 'FB Cover.png', '1646422981712_FB Cover.png', 'png', 'image/png', 40333, 2, '2022-03-04 19:43:01', '2022-03-04 19:43:01'),
(57, 57, 1, 'Facebook Logo.png', '1646423110201_Facebook Logo.png', 'png', 'image/png', 5637, 2, '2022-03-04 19:45:10', '2022-03-04 19:45:10'),
(58, 57, 1, 'WhatsApp Image 2021-12-10 at 10.01.09 PM.jpeg', '1646423250703_WhatsApp Image 2021-12-10 at 10.01.09 PM.jpeg', 'jpeg', 'image/jpeg', 52524, 2, '2022-03-04 19:47:30', '2022-03-04 19:47:30'),
(59, 57, 3, 'file_example_AVI_640_800kB.avi', '1646423407326_file_example_AVI_640_800kB.avi', 'avi', 'video/avi', 829208, 2, '2022-03-04 19:50:07', '2022-03-04 19:50:07'),
(64, 3, 2, 'Youtube channel art.png', '1646479156910_Youtube channel art.png', 'png', 'image/png', 86853, 2, '2022-03-05 11:19:16', '2022-03-05 11:19:16'),
(65, 3, 1, 'WhatsApp Image 2021-12-10 at 10.01.09 PM (1).jpeg', '1646481740213_WhatsApp Image 2021-12-10 at 10.01.09 PM (1).jpeg', 'jpeg', 'image/jpeg', 79324, 2, '2022-03-05 12:02:20', '2022-03-05 12:02:20'),
(66, 3, 1, 'WhatsApp Image 2021-12-10 at 10.01.09 PM (1).jpeg', '1646481933231_WhatsApp Image 2021-12-10 at 10.01.09 PM (1).jpeg', 'jpeg', 'image/jpeg', 79324, 2, '2022-03-05 12:05:33', '2022-03-05 12:05:33'),
(67, 3, 1, 'WhatsApp Image 2021-12-10 at 10.01.09 PM (1).jpeg', '1646481989793_WhatsApp Image 2021-12-10 at 10.01.09 PM (1).jpeg', 'jpeg', 'image/jpeg', 79324, 2, '2022-03-05 12:06:29', '2022-03-05 12:06:29'),
(68, 3, 3, 'file_example_AVI_640_800kB.avi', '1646500783355_file_example_AVI_640_800kB.avi', 'avi', 'video/avi', 829208, 2, '2022-03-05 17:19:43', '2022-03-05 17:19:43'),
(69, 3, 3, 'file_example_AVI_640_800kB.avi', '1646501588781_file_example_AVI_640_800kB.avi', 'avi', 'video/avi', 829208, 2, '2022-03-05 17:33:08', '2022-03-05 17:33:08'),
(70, 3, 1, '3.jpeg', '1646501632833_3.jpeg', 'jpeg', 'image/jpeg', 81958, 2, '2022-03-05 17:33:52', '2022-03-05 17:33:52'),
(71, 3, 2, 'Cover_1128 x 191 px.png', '1646501765085_Cover_1128 x 191 px.png', 'png', 'image/png', 40232, 2, '2022-03-05 17:36:05', '2022-03-05 17:36:05'),
(72, 3, 4, 'SampleVideo_1280x720_5mb.mp4', '1646504247122_SampleVideo_1280x720_5mb.mp4', 'mp4', 'video/mp4', 5253880, 2, '2022-03-05 18:17:27', '2022-03-05 18:17:27');

-- --------------------------------------------------------

--
-- Table structure for table `media_types`
--

CREATE TABLE `media_types` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  `added` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `media_types`
--

INSERT INTO `media_types` (`id`, `title`, `slug`, `status`, `added`) VALUES
(1, 'Static Banner', 'static_banner', 1, '2022-02-09 12:10:20'),
(2, 'Overlay Banner', 'overlay_banner', 1, '2022-02-09 12:10:20'),
(3, 'Video Banner', 'video_banner', 1, '2022-02-09 12:10:58'),
(4, 'Video Stream', 'video_stream', 1, '2022-02-09 12:10:58');

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `id` int(11) NOT NULL,
  `option_key` varchar(255) DEFAULT NULL,
  `option_value` text NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `option_key`, `option_value`, `status`) VALUES
(1, 'publisher_referral_link ', 'https://adserotic.com/sign-up/advertiser?source=referral&referralCode=', 1),
(2, 'advertiser_refferal_link', 'https://adserotic.com/sign-up/advertiser?source=referral&referralCode=', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('3iunqA8yLVNf2-0UKczY3okJBOQvFz9s', 1648908222, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"loggedIn\":true,\"user\":{\"id\":3,\"firstname\":\"sanjay\",\"lastname\":\"yadav\",\"username\":\"sanjayadav\",\"user_role\":3,\"email\":\"sanjay@aaaa.com\",\"currency\":\"USD\"}}'),
('R9Spkk6pl9FBafsXdKnqmADdVTAdiIiu', 1654278337, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"loggedIn\":true,\"user\":{\"id\":3,\"firstname\":\"sanjay\",\"lastname\":\"yadav\",\"username\":\"sanjayadav\",\"user_role\":3,\"email\":\"sanjay@aaaa.com\",\"currency\":\"USD\"}}'),
('VvaG84NkNjKlQ_5O0NABVW2s3DxgI3av', 1648883517, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"loggedIn\":true,\"user\":{\"id\":3,\"firstname\":\"sanjay\",\"lastname\":\"yadav\",\"username\":\"sanjayadav\",\"user_role\":3,\"email\":\"sanjay@aaaa.com\",\"currency\":\"USD\"}}'),
('nSALUUAaD6-0Hu-nfUdVYIo0brLHxw-j', 1648844215, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"loggedIn\":true,\"user\":{\"id\":3,\"firstname\":\"sanjay\",\"lastname\":\"yadav\",\"username\":\"sanjayadav\",\"user_role\":3,\"email\":\"sanjay@aaaa.com\",\"currency\":\"USD\"}}'),
('uIF_uG6zCgeZV863L0DMUGKJLXZ7BWiC', 1648921826, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"loggedIn\":true,\"user\":{\"id\":3,\"firstname\":\"sanjay\",\"lastname\":\"yadav\",\"username\":\"sanjayadav\",\"user_role\":3,\"email\":\"sanjay@aaaa.com\",\"currency\":\"USD\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `static_banner`
--

CREATE TABLE `static_banner` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  `added` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` int(11) NOT NULL,
  `country` varchar(50) NOT NULL,
  `nationality` varchar(50) NOT NULL,
  `currency` varchar(20) NOT NULL,
  `skype_id` varchar(100) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `status` int(2) NOT NULL,
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `firstname`, `lastname`, `email`, `password`, `user_type`, `country`, `nationality`, `currency`, `skype_id`, `company_name`, `status`, `updated`, `created`) VALUES
(1, 'sanjayadavtest', 'sanjay', 'yadav', 'sanjay@test.com', '$2b$10$2kBarc3g/WaNC3ZZYeg1HO1/Mqz/pIIxTmkFZ7bA76WzxzpprdgVG', 2, 'india', 'Russia', 'EUR', 'sanjaytest', 'Google', 1, '2022-01-28 14:17:31', '2022-01-28 14:17:31'),
(2, 'sanjayadave', 'sanjay', 'yadav', 'sanjay@yyyy.com', '$2b$10$2kBarc3g/WaNC3ZZYeg1HO1/Mqz/pIIxTmkFZ7bA76WzxzpprdgVG', 2, 'india', 'Canada', 'USD', 'sanjaytest', 'Google', 1, '2022-02-01 08:23:20', '2022-02-01 08:23:20'),
(3, 'sanjayadav', 'sanjay', 'yadav', 'sanjay@aaaa.com', '$2b$10$2qpByppxM1lqq9qG3lpJLehKeBnfeMHb3J8Xi4aQq8Hoa09nLVsWC', 3, 'Russia', 'Russia', 'USD', 'sanjay143', 'Meta', 1, '2022-02-01 08:27:24', '2022-02-01 08:27:24'),
(57, 'AdvertiserTest', 'Advertiser', 'Test', 'advertiser@test.com', '$2b$10$leIuXVyRHTNV87Lmcw4V2eCpkjctl.Gp/n/ZLRfXY4sI/QOvNA69O', 3, 'Canada', 'Canada', 'USD', 'Advertiser Skype', 'ADvertiser Company', 1, '2022-02-15 07:35:56', '2022-02-15 07:35:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `device_dimensions`
--
ALTER TABLE `device_dimensions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `keywords`
--
ALTER TABLE `keywords`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `labels`
--
ALTER TABLE `labels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media_types`
--
ALTER TABLE `media_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `option_key_2` (`option_key`),
  ADD KEY `option_key` (`option_key`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `static_banner`
--
ALTER TABLE `static_banner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `campaigns`
--
ALTER TABLE `campaigns`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=256;

--
-- AUTO_INCREMENT for table `device_dimensions`
--
ALTER TABLE `device_dimensions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `keywords`
--
ALTER TABLE `keywords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `labels`
--
ALTER TABLE `labels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `media_types`
--
ALTER TABLE `media_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `static_banner`
--
ALTER TABLE `static_banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
