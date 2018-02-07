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
-- Table structure for table `activetreatment`
--

DROP TABLE IF EXISTS `activetreatment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activetreatment` (
  `ActiveTreatmentId` int(11) NOT NULL AUTO_INCREMENT,
  `NameTreatment` varchar(100) DEFAULT NULL,
  `PatientDetail` int(11) DEFAULT NULL,
  `ProviderDetail` int(11) DEFAULT NULL,
  `TimeStart` date DEFAULT NULL,
  `EndTime` date DEFAULT NULL,
  `Created` int(11) DEFAULT NULL,
  `CreatedBy` date DEFAULT NULL,
  `Modified` int(11) DEFAULT NULL,
  `ModifiedBy` date DEFAULT NULL,
  PRIMARY KEY (`ActiveTreatmentId`),
  KEY `FKAcTrPatientDetail` (`PatientDetail`),
  KEY `FKAcTrProviderDetail_idx` (`ProviderDetail`),
  CONSTRAINT `FKAcTrPatientDetail` FOREIGN KEY (`PatientDetail`) REFERENCES `patients` (`PatientId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FKAcTrProviderDetail` FOREIGN KEY (`ProviderDetail`) REFERENCES `providers` (`ProviderID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1129 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-07 11:22:48
