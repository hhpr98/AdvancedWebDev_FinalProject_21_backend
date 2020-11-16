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
-- Table structure for table `PaymentAccounts`
--

DROP TABLE IF EXISTS `PaymentAccounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PaymentAccounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accountNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `customerId` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `balance` bigint(10) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accountNumber` (`accountNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PaymentAccounts`
--

LOCK TABLES `PaymentAccounts` WRITE;
/*!40000 ALTER TABLE `PaymentAccounts` DISABLE KEYS */;
INSERT INTO `PaymentAccounts` VALUES (1,'9001454953559','93a9c08a-50e5-4044-93e6-4ebb7c584012',28193595,'2020-07-26 16:33:12','2020-08-20 08:12:08'),(2,'9001862475790','1084aebc-01da-415a-b56a-4e745cba7332',21524000,'2020-07-26 16:33:37','2020-08-20 00:18:29'),(3,'9001292728653','2ee66ce3-b235-4538-8317-800e34f46b27',700000,'2020-07-31 13:28:00','2020-08-19 22:03:39'),(4,'9001935829242','71ebbaa7-0deb-4f37-a5ed-642c68709c0d',10750000,'2020-08-05 16:01:40','2020-08-19 23:15:00'),(5,'9001219033696','671f032a-9b1d-480e-9948-09f7ab71a379',2140000,'2020-08-18 20:49:42','2020-08-19 01:12:19'),(6,'9001502384489','a497ef92-4bac-450d-886d-30fd6521e362',18345000,'2020-08-19 20:48:08','2020-08-20 00:15:57'),(7,'9001542516833','e8a633bb-378e-4518-84a1-25d5196d1331',111170000,'2020-08-19 20:50:34','2020-08-20 00:17:22'),(8,'9001917849805','8626706e-4823-4ebd-92a3-e2b291334cd5',52500000,'2020-08-19 22:00:46','2020-08-20 00:08:19'),(9,'9001105345150','c684cce9-5590-4d66-b82a-77a541e552ff',8601000,'2020-08-19 22:37:06','2020-08-19 23:52:17'),(10,'9001386553398','152d206a-4266-42ce-9c0e-b1f82a4aca76',99775000,'2020-08-20 00:03:54','2020-08-20 00:21:21'),(11,'9001085187009','61bf1283-2c08-4e7c-9e0f-4efe39be6e68',8375000,'2020-08-20 00:05:21','2020-08-20 00:21:21');
/*!40000 ALTER TABLE `PaymentAccounts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-29 23:12:56