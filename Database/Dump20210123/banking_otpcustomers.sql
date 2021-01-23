-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: banking
-- ------------------------------------------------------
-- Server version	5.7.30-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `otpcustomers`
--

DROP TABLE IF EXISTS `otpcustomers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otpcustomers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `OTP` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timeSend` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otpcustomers`
--

LOCK TABLES `otpcustomers` WRITE;
/*!40000 ALTER TABLE `otpcustomers` DISABLE KEYS */;
INSERT INTO `otpcustomers` VALUES (1,'anhoapham2302@gmail.com','508579','2020-09-02 20:55:38','2020-07-26 16:33:12','2020-09-02 20:55:38'),(2,'nguyenhuuhoa1998@gmail.com','661389','2020-11-29 00:53:02','2020-07-26 16:33:37','2020-11-29 00:53:02'),(3,'pse88180@cuoly.com',NULL,NULL,'2020-07-31 13:28:00','2020-07-31 13:28:00'),(4,'lannguyen10a1@gmail.com','407388','2020-08-19 23:07:42','2020-08-05 16:01:40','2020-08-19 23:07:42'),(5,'kac67631@cuoly.com',NULL,NULL,'2020-08-18 20:49:42','2020-08-18 20:49:42'),(6,'hui07230@eoopy.com','213700','2020-08-19 22:04:40','2020-08-19 20:48:08','2020-08-19 22:04:40'),(7,'hoaan31071998@gmail.com','735967','2020-08-20 00:17:09','2020-08-19 20:50:34','2020-08-20 00:17:09'),(8,'anhoapham1612210@gmail.com','580301','2020-08-19 23:46:09','2020-08-19 22:00:46','2020-08-19 23:46:09'),(9,'1612209@student.hcmus.edu.vn','098484','2020-08-19 23:52:03','2020-08-19 22:37:06','2020-08-19 23:52:03'),(10,'hoaan2302@gmail.com','311105','2020-08-20 00:20:55','2020-08-20 00:03:54','2020-08-20 00:20:55'),(11,'tzp44303@eoopy.com','889839','2020-08-20 00:21:09','2020-08-20 00:05:21','2020-08-20 00:21:09');
/*!40000 ALTER TABLE `otpcustomers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-23 21:27:40
