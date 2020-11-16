-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 3.1.41.139    Database: banking
-- ------------------------------------------------------
-- Server version	5.7.31-0ubuntu0.18.04.1

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
-- Table structure for table `SaveAccounts`
--

DROP TABLE IF EXISTS `SaveAccounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SaveAccounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accountNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `customerId` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `balance` bigint(10) NOT NULL,
  `expired` int(11) NOT NULL,
  `rate` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SaveAccounts`
--

LOCK TABLES `SaveAccounts` WRITE;
/*!40000 ALTER TABLE `SaveAccounts` DISABLE KEYS */;
INSERT INTO `SaveAccounts` VALUES (1,'9002760296734','1084aebc-01da-415a-b56a-4e745cba7332',1000000,9,1,'2020-07-31 10:41:01','2020-07-31 10:41:01'),(2,'9002289122844','1084aebc-01da-415a-b56a-4e745cba7332',2000000,12,3,'2020-07-31 10:42:22','2020-07-31 10:42:22'),(3,'9002747885714','93a9c08a-50e5-4044-93e6-4ebb7c584012',5000000,12,3,'2020-08-19 20:38:16','2020-08-19 20:38:16'),(4,'9002006766705','a497ef92-4bac-450d-886d-30fd6521e362',2000000,6,2,'2020-08-19 20:48:59','2020-08-19 20:48:59'),(5,'9002304243343','71ebbaa7-0deb-4f37-a5ed-642c68709c0d',10000000,12,3,'2020-08-19 23:15:49','2020-08-19 23:15:49');
/*!40000 ALTER TABLE `SaveAccounts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-29 23:12:55