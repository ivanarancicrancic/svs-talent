CREATE DATABASE  IF NOT EXISTS `ersatzteilhandel24ddbb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ersatzteilhandel24ddbb`;
-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: localhost    Database: ersatzteilhandel24ddbb
-- ------------------------------------------------------
-- Server version	8.0.11

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
-- Table structure for table `orderarticle`
--

DROP TABLE IF EXISTS `orderarticle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderarticle` (
  `orderarticle_id` varchar(255) NOT NULL,
  `orders_id` varchar(255) NOT NULL,
  `articleName` varchar(255) DEFAULT NULL,
  `articleDescription` varchar(255) DEFAULT NULL,
  `articlePromotion` varchar(255) DEFAULT NULL,
  `articleQuantity` varchar(15) NOT NULL,
  PRIMARY KEY (`orderarticle_id`),
  KEY `orders_id` (`orders_id`),
  CONSTRAINT `orderarticle_ibfk_1` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`orders_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderarticle`
--

LOCK TABLES `orderarticle` WRITE;
/*!40000 ALTER TABLE `orderarticle` DISABLE KEYS */;
INSERT INTO `orderarticle` VALUES ('3363753R555357jk8937&DDBG','563753R44357jk8937DDBG','1 Fimar Ersatzteil für Herde verfügbar','Gastronomie Ersatzteile: FIMAR GRIFF FÜR BACKOFENTÜR ø 28x90 mm M10','no promotion','1'),('563753R55357jk8837DDBG','563753R44357jk8937DIPG','2 Fimar Ersatzteil für Herde verfügbar','2 Gastronomie Ersatzteile: FIMAR GRIFF FÜR BACKOFENTÜR ø 28x90 mm M10','get a free gift promotion','5'),('563753R55357jk8837EDBG','563753R44357jk8937DIPG','3 Fimar Ersatzteil für Herde verfügbar','3 Gastronomie Ersatzteile: FIMAR GRIFF FÜR BACKOFENTÜR ø 28x90 mm M10','no promotion','1'),('563753R55357jk8937DDBG','563753R55357jk8937DDBG','Abdeckungen f.Lampen','Kopf ø 13,5 - Loch ø 10 mm - 120°C universelle Anwendung','get a free gift promotion','4');
/*!40000 ALTER TABLE `orderarticle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `orders_id` varchar(255) NOT NULL,
  `orderDate` datetime DEFAULT NULL,
  `paymentMethod` varchar(255) DEFAULT NULL,
  `shippingWay` varchar(255) DEFAULT NULL,
  `anrede` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `houseNumber` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `postcode` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `latest` decimal(10,0) DEFAULT NULL,
  `netPrice` varchar(255) DEFAULT NULL,
  `grossPrice` varchar(255) DEFAULT NULL,
  `netPriceWD` varchar(255) DEFAULT NULL,
  `grossPriceWD` varchar(255) DEFAULT NULL,
  `canceled` tinyint(1) DEFAULT NULL,
  `cancelreason` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`orders_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('563753R44357jk8937DDBG','2018-12-10 14:29:36','Credit card','dhl','anrede','Ivana','Rancic','logik-app','Germany','street','1/10-10','Skopje','10000','53850938583095680','ivana.rancic@app-logik.de',0,'5000','6000','4000','5000',0,''),('563753R44357jk8937DIPG','2018-12-21 14:29:36','Credit card','dhl','anrede','Anthony','Parker','logik-app','Germany','street','1/10-10','Skopje','10000','53850938583095680','antony.parker@app-logik.de',0,'55000','69500','50000','66000',1,'delay124'),('563753R55357jk8937DDBG','2018-10-07 14:29:36','Credit card','dhl','anrede','Ana','Rancic','logik-app','Macedonia','street','1/10-10','Skopje','10000','53850938583095680','ana.rancic@app-logik.de',0,'5000','6000','4000','5000',1,'de'),('563753R56357Uk8937DDBG','2018-10-21 14:29:36','Credit card','dhl','anrede','Diana','Fosi','logik-app','Italy','Via Abruzzi','1/10-10','Milan','10000','53850938583095680','diana.fosi@app-logik.de',0,'57000','66000','44000','54000',1,'delay');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ersatzteilhandel24ddbb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-04 15:48:07
