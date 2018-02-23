-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 104.245.33.167    Database: curandusofficial
-- ------------------------------------------------------
-- Server version	5.7.19-log

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
-- Table structure for table `savedtreatmentitem`
--

DROP TABLE IF EXISTS `savedtreatmentitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `savedtreatmentitem` (
  `SavedTreatmentItemId` int(11) NOT NULL AUTO_INCREMENT,
  `SavedTreatmentDetail` int(11) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `TypeT` enum('ACK','MULTIPLE_CHOICE','NUMERIC_ENTRY','FREE_TEXT + image') DEFAULT NULL,
  `RepeatT` varchar(45) DEFAULT NULL,
  `Duration` varchar(45) DEFAULT NULL,
  `RenderingInfo` json DEFAULT NULL,
  `Status` enum('0','1') DEFAULT NULL,
  `Created` date DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `Modified` date DEFAULT NULL,
  `ModifiedBy` int(11) DEFAULT NULL,
  `Daytime` varchar(45) DEFAULT NULL,
  `Starttime` varchar(45) DEFAULT NULL,
  `Intervaldaytime` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`SavedTreatmentItemId`),
  KEY `FKSavedTreatmentDetail_idx` (`SavedTreatmentDetail`),
  CONSTRAINT `FKSavedTreatmentDetail` FOREIGN KEY (`SavedTreatmentDetail`) REFERENCES `savedtreatmenttemplate` (`SavedTreatmentTemplateId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2296 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-07 11:23:07