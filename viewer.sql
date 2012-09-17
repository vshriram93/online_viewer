-- phpMyAdmin SQL Dump
-- version 3.4.5deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 17, 2012 at 06:10 AM
-- Server version: 5.1.63
-- PHP Version: 5.3.6-13ubuntu3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `viewer`
--

-- --------------------------------------------------------

--
-- Table structure for table `viewer_chat`
--

CREATE TABLE IF NOT EXISTS `viewer_chat` (
  `chat_id` int(11) NOT NULL AUTO_INCREMENT,
  `chat_message` text NOT NULL,
  `chat_user` varchar(30) NOT NULL,
  `chat_group` varchar(30) NOT NULL,
  PRIMARY KEY (`chat_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `viewer_groups`
--

CREATE TABLE IF NOT EXISTS `viewer_groups` (
  `groups_id` int(11) NOT NULL AUTO_INCREMENT,
  `groups_name` varchar(30) NOT NULL,
  `groups_users` varchar(30) NOT NULL,
  PRIMARY KEY (`groups_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `viewer_slides`
--

CREATE TABLE IF NOT EXISTS `viewer_slides` (
  `slides_id` int(11) NOT NULL AUTO_INCREMENT,
  `slides_title` varchar(30) NOT NULL,
  `slides_content` text NOT NULL,
  `slides_group` varchar(30) NOT NULL,
  `slides_admin` varchar(50) NOT NULL,
  PRIMARY KEY (`slides_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `viewer_slides`
--

INSERT INTO `viewer_slides` (`slides_id`, `slides_title`, `slides_content`, `slides_group`, `slides_admin`) VALUES
(4, 'Identity', 'Bruce Wayne', 'Batman', '');

-- --------------------------------------------------------

--
-- Table structure for table `viewer_users`
--

CREATE TABLE IF NOT EXISTS `viewer_users` (
  `users_id` int(11) NOT NULL AUTO_INCREMENT,
  `users_name` varchar(30) NOT NULL,
  PRIMARY KEY (`users_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
