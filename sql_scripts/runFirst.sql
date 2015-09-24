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
  `club_id` int(10) NOT NULL AUTO_INCREMENT,
  `club_name` varchar(20) NOT NULL,
  `club_address` varchar(45) NOT NULL,
  `club_gps_str` varchar(100) DEFAULT NULL,
  `club_phones` varchar(45) DEFAULT NULL,
  `club_email` varchar(45) DEFAULT NULL,
  `club_homepage` varchar(100) DEFAULT NULL,
  `club_key` varchar(200) DEFAULT NULL,
  `club_schedule` varchar(100) NOT NULL,
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
  `expense_id` int(11) NOT NULL AUTO_INCREMENT,
  `expense_club_id` int(11) NOT NULL,
  `expense_description` varchar(200) NOT NULL,
  `expense_receipt_photo` varchar(100) DEFAULT NULL,
  `expense_date` date NOT NULL,
  `expense_amount` decimal(15,2) NOT NULL,
  `expense_inputed_by_user_id` int(11) NOT NULL,
  `expense_input_time` datetime NOT NULL,
  PRIMARY KEY (`expense_id`),
  KEY `fk_expenses_club_id` (`expense_club_id`),
  KEY `fk_expenses_inputed_by_user_id` (`expense_inputed_by_user_id`),
  CONSTRAINT `fk_expenses_club_id` FOREIGN KEY (`expense_club_id`) REFERENCES `clubs` (`club_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_expenses_inputed_by_user_id` FOREIGN KEY (`expense_inputed_by_user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `position_rights`
--

DROP TABLE IF EXISTS `position_rights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `position_rights` (
  `position_right_position_id` int(11) NOT NULL,
  `position_right_text` varchar(45) NOT NULL,
  PRIMARY KEY (`position_right_position_id`,`position_right_text`),
  CONSTRAINT `fk_position_rights_position_id` FOREIGN KEY (`position_right_position_id`) REFERENCES `positions` (`position_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `position_workout_type_relation`
--

DROP TABLE IF EXISTS `position_workout_type_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `position_workout_type_relation` (
  `position_id` int(11) NOT NULL,
  `workout_type_id` int(11) NOT NULL,
  PRIMARY KEY (`position_id`,`workout_type_id`),
  KEY `fk_position_workout_type_relation_workout_type_id` (`workout_type_id`),
  CONSTRAINT `fk_position_workout_type_relation_position_type_id` FOREIGN KEY (`position_id`) REFERENCES `positions` (`position_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_position_workout_type_relation_workout_type_id` FOREIGN KEY (`workout_type_id`) REFERENCES `workout_types` (`workout_type_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `positions`
--

DROP TABLE IF EXISTS `positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `positions` (
  `position_id` int(11) NOT NULL AUTO_INCREMENT,
  `position_club_id` int(11) NOT NULL,
  `position_name` varchar(45) NOT NULL,
  PRIMARY KEY (`position_id`),
  KEY `fk_positions_position_club_id` (`position_club_id`),
  CONSTRAINT `fk_positions_position_club_id` FOREIGN KEY (`position_club_id`) REFERENCES `clubs` (`club_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staff_comings`
--

DROP TABLE IF EXISTS `staff_comings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_comings` (
  `staff_coming_id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_coming_user_id` int(11) NOT NULL,
  `staff_coming_date` datetime NOT NULL,
  `staff_coming_hours` int(11) NOT NULL,
  `staff_coming_inputed_by_user_id` int(11) NOT NULL,
  `staff_coming_update_time` datetime NOT NULL,
  PRIMARY KEY (`staff_coming_id`),
  KEY `fk_staff_comings_inputed_by_user_id` (`staff_coming_inputed_by_user_id`),
  KEY `fk_staff_comings_user_id` (`staff_coming_user_id`),
  CONSTRAINT `fk_staff_comings_inputed_by_user_id` FOREIGN KEY (`staff_coming_inputed_by_user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_staff_comings_user_id` FOREIGN KEY (`staff_coming_user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `staff_payments`
--

DROP TABLE IF EXISTS `staff_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_payments` (
  `staff_payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_payment_receiver_id` int(11) NOT NULL,
  `staff_payment_date` datetime NOT NULL,
  `staff_payment_amount` decimal(15,2) NOT NULL,
  `staff_payment_inputed_by_user_id` int(11) NOT NULL,
  `staff_payment_input_time` datetime NOT NULL,
  PRIMARY KEY (`staff_payment_id`),
  KEY `fk_staff_payments_inputed_by_user_id` (`staff_payment_inputed_by_user_id`),
  KEY `fk_staff_payments_receiver_id` (`staff_payment_receiver_id`),
  CONSTRAINT `fk_staff_payments_inputed_by_user_id` FOREIGN KEY (`staff_payment_inputed_by_user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_staff_payments_receiver_id` FOREIGN KEY (`staff_payment_receiver_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE
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
  `ticket_freez_sale_id` int(11) NOT NULL,
  `ticket_freez_start_date` datetime NOT NULL,
  `ticket_freez_days` int(11) NOT NULL,
  `ticket_freezed_by_user_id` int(11) NOT NULL,
  PRIMARY KEY (`ticket_freez_id`),
  KEY `fk_ticket_freezs_freezed_by_user_id` (`ticket_freezed_by_user_id`),
  KEY `fk_ticket_freezs_sale_id` (`ticket_freez_sale_id`),
  CONSTRAINT `fk_ticket_freezs_freezed_by_user_id` FOREIGN KEY (`ticket_freezed_by_user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_ticket_freezs_sale_id` FOREIGN KEY (`ticket_freez_sale_id`) REFERENCES `ticket_sales` (`ticket_sale_id`) ON UPDATE CASCADE
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
  `ticket_sale_type_id` int(11) NOT NULL,
  `ticket_sale_buyer_id` int(11) NOT NULL,
  `ticket_sale_price` decimal(15,2) NOT NULL,
  `ticket_sale_date` datetime NOT NULL,
  `ticket_sale_seller_id` int(11) NOT NULL,
  PRIMARY KEY (`ticket_sale_id`),
  KEY `fk_ticket_sales_buyer_id` (`ticket_sale_buyer_id`),
  KEY `fk_ticket_sales_seller_id` (`ticket_sale_seller_id`),
  KEY `fk_ticket_sales_type_id` (`ticket_sale_type_id`),
  CONSTRAINT `fk_ticket_sales_buyer_id` FOREIGN KEY (`ticket_sale_buyer_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_ticket_sales_seller_id` FOREIGN KEY (`ticket_sale_seller_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_ticket_sales_type_id` FOREIGN KEY (`ticket_sale_type_id`) REFERENCES `ticket_types` (`ticket_type_id`) ON UPDATE CASCADE
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
  PRIMARY KEY (`ticket_type_id`,`workout_type_id`),
  KEY `fk_ticket_type_workout_type_relation_workout_type_id` (`workout_type_id`),
  CONSTRAINT `fk_ticket_type_workout_type_relation_ticket_type_id` FOREIGN KEY (`ticket_type_id`) REFERENCES `ticket_types` (`ticket_type_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_ticket_type_workout_type_relation_workout_type_id` FOREIGN KEY (`workout_type_id`) REFERENCES `workout_types` (`workout_type_id`) ON UPDATE CASCADE
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
  PRIMARY KEY (`ticket_type_id`),
  KEY `fk_ticket_types_club_id` (`ticket_type_club_id`),
  CONSTRAINT `fk_ticket_types_club_id` FOREIGN KEY (`ticket_type_club_id`) REFERENCES `clubs` (`club_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_rights`
--

DROP TABLE IF EXISTS `user_rights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_rights` (
  `user_right_user_id` int(11) NOT NULL,
  `user_right_text` varchar(45) NOT NULL,
  PRIMARY KEY (`user_right_user_id`,`user_right_text`),
  CONSTRAINT `fk_user_rights_user_id` FOREIGN KEY (`user_right_user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE
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
  PRIMARY KEY (`user_id`),
  KEY `fk_users_user_club_id` (`user_club_id`),
  KEY `fk_users_user_position_id` (`user_position_id`),
  CONSTRAINT `fk_users_user_club_id` FOREIGN KEY (`user_club_id`) REFERENCES `clubs` (`club_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_users_user_position_id` FOREIGN KEY (`user_position_id`) REFERENCES `positions` (`position_id`) ON UPDATE CASCADE
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
  `scheduled_workout_type_id` int(11) NOT NULL,
  `scheduled_workout_trainer_id` int(11) NOT NULL,
  `scheduled_workout_inputed_by_user_id` int(11) NOT NULL,
  `scheduled_workout_cancel_time` datetime DEFAULT NULL,
  `scheduled_workout_canceled_by_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`scheduled_workout_id`),
  KEY `fk_workout_schedule_club_id` (`scheduled_workout_club_id`),
  KEY `fk_workout_schedule_canceled_by_user_id` (`scheduled_workout_canceled_by_user_id`),
  KEY `fk_workout_schedule_inputed_by_user_id` (`scheduled_workout_inputed_by_user_id`),
  KEY `fk_workout_schedule_trainer_id` (`scheduled_workout_trainer_id`),
  KEY `fk_workout_schedule_type_id` (`scheduled_workout_type_id`),
  CONSTRAINT `fk_workout_schedule_canceled_by_user_id` FOREIGN KEY (`scheduled_workout_canceled_by_user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_workout_schedule_club_id` FOREIGN KEY (`scheduled_workout_club_id`) REFERENCES `clubs` (`club_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_workout_schedule_inputed_by_user_id` FOREIGN KEY (`scheduled_workout_inputed_by_user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_workout_schedule_trainer_id` FOREIGN KEY (`scheduled_workout_trainer_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_workout_schedule_type_id` FOREIGN KEY (`scheduled_workout_type_id`) REFERENCES `workout_types` (`workout_type_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `workout_signings`
--

DROP TABLE IF EXISTS `workout_signings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workout_signings` (
  `workout_signing_id` int(11) NOT NULL AUTO_INCREMENT,
  `workout_signing_scheduled_workout_id` int(11) NOT NULL,
  `workout_signing_visitor_id` int(11) NOT NULL,
  `workout_signing_input_time` datetime NOT NULL,
  `workout_signing_inputed_by_user_id` int(11) NOT NULL,
  `workout_signing_canceled_by_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`workout_signing_id`),
  KEY `fk_workout_signings_canceled_by_user_id` (`workout_signing_canceled_by_user_id`),
  KEY `fk_workout_signings_inputed_by_user_id` (`workout_signing_inputed_by_user_id`),
  KEY `fk_workout_signings_scheduled_workout_id` (`workout_signing_scheduled_workout_id`),
  KEY `fk_workout_signings_visitor_id` (`workout_signing_visitor_id`),
  CONSTRAINT `fk_workout_signings_canceled_by_user_id` FOREIGN KEY (`workout_signing_canceled_by_user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_workout_signings_inputed_by_user_id` FOREIGN KEY (`workout_signing_inputed_by_user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_workout_signings_scheduled_workout_id` FOREIGN KEY (`workout_signing_scheduled_workout_id`) REFERENCES `workout_schedule` (`scheduled_workout_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_workout_signings_visitor_id` FOREIGN KEY (`workout_signing_visitor_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE
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
  `workout_type_club_id` int(11) NOT NULL,
  `workout_type_name` varchar(45) NOT NULL,
  `workout_type_max_visitors` int(11) DEFAULT NULL,
  `workout_type_duration` int(11) NOT NULL,
  `workout_type_description` varchar(200) DEFAULT NULL,
  `workout_type_min_fee` decimal(15,2) NOT NULL,
  `workout_type_pervisitor_fee` decimal(15,2) NOT NULL,
  `workout_type_max_fee` decimal(15,2) NOT NULL,
  `workout_type_is_active` bit(1) NOT NULL,
  PRIMARY KEY (`workout_type_id`),
  KEY `fk_workout_types_club_id` (`workout_type_club_id`),
  CONSTRAINT `fk_workout_types_club_id` FOREIGN KEY (`workout_type_club_id`) REFERENCES `clubs` (`club_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `workout_visits`
--

DROP TABLE IF EXISTS `workout_visits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workout_visits` (
  `workout_visit_id` int(11) NOT NULL AUTO_INCREMENT,
  `workout_visit_schedule_id` int(11) NOT NULL,
  `workout_visit_visitor_id` int(11) NOT NULL,
  `workout_visit_input_time` datetime NOT NULL,
  `workout_visit_inputed_by_user_id` int(11) NOT NULL,
  PRIMARY KEY (`workout_visit_id`),
  KEY `fk_workout_visits_inputed_by_user_id` (`workout_visit_inputed_by_user_id`),
  KEY `fk_workout_visits_schedule_id` (`workout_visit_schedule_id`),
  KEY `fk_workout_visits_visitor_id` (`workout_visit_visitor_id`),
  CONSTRAINT `fk_workout_visits_inputed_by_user_id` FOREIGN KEY (`workout_visit_inputed_by_user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_workout_visits_schedule_id` FOREIGN KEY (`workout_visit_schedule_id`) REFERENCES `workout_schedule` (`scheduled_workout_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_workout_visits_visitor_id` FOREIGN KEY (`workout_visit_visitor_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE
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

-- Dump completed on 2015-09-21  0:15:16
