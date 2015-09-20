CREATE DATABASE  IF NOT EXISTS `go_core` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `go_core`;
-- MySQL dump 10.13  Distrib 5.6.24, for Win32 (x86)
--
-- Host: localhost    Database: go_core
-- ------------------------------------------------------
-- Server version	5.6.26-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clubs`
--

DROP TABLE IF EXISTS `clubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clubs` (
  `club_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `club_name` varchar(20) NOT NULL,
  `club_address` varchar(45) NOT NULL,
  `club_gps_str` varchar(100) DEFAULT NULL,
  `club_phones` varchar(45) DEFAULT NULL,
  `club_email` varchar(45) DEFAULT NULL,
  `club_homepage` varchar(100) DEFAULT NULL,
  `club_key` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`club_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expenses` (
  `expense_club_id` int(11) NOT NULL,
  `expense_description` varchar(200) NOT NULL,
  `expense_receipt_photo` varchar(100) DEFAULT NULL,
  `expense_date` date NOT NULL,
  `expense_amount` decimal(15,2) NOT NULL,
  `expense_inputed_by_user_id` int(11) NOT NULL,
  `expense_input_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `position_rights`
--

DROP TABLE IF EXISTS `position_rights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `position_rights` (
  `position_right_club_id` int(11) NOT NULL,
  `position_right_position_type_id` int(11) NOT NULL,
  `position_right_text` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `position_type_workout_type_relation`
--

DROP TABLE IF EXISTS `position_type_workout_type_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `position_type_workout_type_relation` (
  `position_type_id` int(11) NOT NULL,
  `workout_type_id` int(11) NOT NULL,
  PRIMARY KEY (`position_type_id`,`workout_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `position_types`
--

DROP TABLE IF EXISTS `position_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `position_types` (
  `position_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `position_club_id` int(11) NOT NULL,
  `position_name` varchar(45) NOT NULL,
  PRIMARY KEY (`position_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staff_comings`
--

DROP TABLE IF EXISTS `staff_comings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_comings` (
  `staff_coming_club_id` int(11) NOT NULL,
  `staff_coming_user_id` int(11) NOT NULL,
  `staff_coming_date` datetime NOT NULL,
  `staff_coming_hours` int(11) NOT NULL,
  `staff_coming_inputed_by_user_id` int(11) NOT NULL,
  `staff_coming_update_time` datetime NOT NULL,
  PRIMARY KEY (`staff_coming_club_id`,`staff_coming_user_id`,`staff_coming_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staff_payments`
--

DROP TABLE IF EXISTS `staff_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_payments` (
  `staff_payment_club_id` int(11) NOT NULL,
  `staff_payment_receiver_id` int(11) NOT NULL,
  `staff_payment_date` datetime NOT NULL,
  `staff_payment_amount` decimal(15,2) NOT NULL,
  `staff_payment_inputed_by_user_id` int(11) NOT NULL,
  `staff_payment_input_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ticket_freezs`
--

DROP TABLE IF EXISTS `ticket_freezs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket_freezs` (
  `ticket_freez_id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_freez_club_id` int(11) NOT NULL,
  `ticket_freez_sale_id` int(11) NOT NULL,
  `ticket_freez_start_date` datetime NOT NULL,
  `ticket_freez_days` int(11) NOT NULL,
  `ticket_freez_user_id` int(11) NOT NULL,
  PRIMARY KEY (`ticket_freez_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ticket_sales`
--

DROP TABLE IF EXISTS `ticket_sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket_sales` (
  `ticket_sale_id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_sale_club_id` int(11) NOT NULL,
  `ticket_sale_type` int(11) NOT NULL,
  `ticket_sale_buyer_id` int(11) NOT NULL,
  `ticket_sale_price` decimal(15,2) NOT NULL,
  `ticket_sale_date` datetime NOT NULL,
  `ticket_sale_seller_id` int(11) NOT NULL,
  PRIMARY KEY (`ticket_sale_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ticket_type_workout_type_relation`
--

DROP TABLE IF EXISTS `ticket_type_workout_type_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket_type_workout_type_relation` (
  `ticket_type_id` int(11) NOT NULL,
  `workout_type_id` int(11) NOT NULL,
  PRIMARY KEY (`ticket_type_id`,`workout_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ticket_types`
--

DROP TABLE IF EXISTS `ticket_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket_types` (
  `ticket_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_type_club_id` int(11) NOT NULL,
  `ticket_type_cost` decimal(15,2) NOT NULL,
  `ticket_type_visit_amount` int(11) DEFAULT NULL,
  `ticket_type_expires` int(11) DEFAULT NULL,
  `ticket_type_max_freez` int(11) NOT NULL,
  `ticket_type_time` varchar(100) DEFAULT NULL,
  `ticket_type_weekdays` varchar(100) DEFAULT NULL,
  `ticket_type_is_active` bit(1) NOT NULL,
  PRIMARY KEY (`ticket_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_rights`
--

DROP TABLE IF EXISTS `user_rights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_rights` (
  `user_right_club_id` int(11) NOT NULL,
  `user_right_user_id` int(11) NOT NULL,
  `user_right_text` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_club_id` int(11) NOT NULL,
  `user_login` varchar(45) NOT NULL,
  `user_password` varchar(45) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(45) DEFAULT NULL,
  `user_phones` varchar(100) NOT NULL,
  `user_gender` bit(1) NOT NULL,
  `user_birthday` date NOT NULL,
  `user_description` varchar(200) DEFAULT NULL,
  `user_position_id` int(11) DEFAULT NULL,
  `user_notes` varchar(200) DEFAULT NULL,
  `user_photo` varchar(100) NOT NULL,
  `user_is_active` bit(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `workout_schedule`
--

DROP TABLE IF EXISTS `workout_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workout_schedule` (
  `scheduled_workout_id` int(11) NOT NULL AUTO_INCREMENT,
  `scheduled_workout_club_id` int(11) NOT NULL,
  `scheduled_workout_time` datetime NOT NULL,
  `scheduled_workout_type` int(11) NOT NULL,
  `scheduled_workout_trainer_id` int(11) NOT NULL,
  `scheduled_workout_inputed_by_user_id` int(11) NOT NULL,
  `scheduled_workout_cancel_time` datetime DEFAULT NULL,
  `scheduled_workout_canceled_by_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`scheduled_workout_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `workout_signing`
--

DROP TABLE IF EXISTS `workout_signing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workout_signing` (
  `workout_signing_id` int(11) NOT NULL AUTO_INCREMENT,
  `workout_signing_club_id` int(11) NOT NULL,
  `workout_signing_scheduled_workout_id` int(11) NOT NULL,
  `workout_signing_visitor_id` int(11) NOT NULL,
  `workout_signing_input_time` datetime NOT NULL,
  `workout_signing_inputed_by_user_id` int(11) NOT NULL,
  `workout_signing_canceled_by_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`workout_signing_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `workout_types`
--

DROP TABLE IF EXISTS `workout_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workout_types` (
  `workout_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `workout_club_id` int(11) NOT NULL,
  `workout_name` varchar(45) NOT NULL,
  `workout_max_visitors` int(11) DEFAULT NULL,
  `workout_duration` int(11) NOT NULL,
  `workout_description` varchar(200) DEFAULT NULL,
  `workout_min_fee` decimal(15,2) NOT NULL,
  `workout_pervisitor_fee` decimal(15,2) NOT NULL,
  `workout_max_fee` decimal(15,2) NOT NULL,
  `workout_is_active` bit(1) NOT NULL,
  PRIMARY KEY (`workout_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `workout_visits`
--

DROP TABLE IF EXISTS `workout_visits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workout_visits` (
  `idworkout_visit_id` int(11) NOT NULL AUTO_INCREMENT,
  `workout_visit_club_id` int(11) NOT NULL,
  `workout_visit_schedule_id` int(11) NOT NULL,
  `workout_visit_visitor_id` int(11) NOT NULL,
  `workout_visit_input_time` datetime NOT NULL,
  `workout_visit_inputed_by_user_id` int(11) NOT NULL,
  PRIMARY KEY (`idworkout_visit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-09-20 17:59:04
