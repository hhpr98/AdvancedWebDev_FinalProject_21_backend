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
-- Table structure for table `Employees`
--

DROP TABLE IF EXISTS `Employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Employees` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ruleAccess` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employees`
--

LOCK TABLES `Employees` WRITE;
/*!40000 ALTER TABLE `Employees` DISABLE KEYS */;
INSERT INTO `Employees` VALUES ('1333223d-6fc5-4e54-9635-b8a54bf04f27','Ân Hòa','anhoapham2302@monca.me','$2b$10$piGy2Sxzxd0CmNXeEcPSWO.KX6EXuOGb7h9mVVcayys66A2AkXlOy',1,'2020-08-19 20:29:39','2020-08-19 20:29:39'),('204bd4b8-e47f-415a-8763-f58b1ef850dd','admin','admin@monca.me','$2b$10$ZEdVi9uz45t3d1p.BmRXf.g9KZfIgwndZJH0rYJVcFDt9QV1Eg3wO',0,'2020-07-26 16:28:57','2020-07-26 16:28:57'),('342914a7-3fa9-406f-a103-e40d564e5403','admin1','admin1@monca.me','$2b$10$rk4Dtp5kUDq3QipUlTulZuB2RoVrk8py6diOy0zmcU.7ucySj1U56',0,'2020-07-26 16:29:17','2020-07-26 16:29:17'),('947fb189-43e3-4352-83b3-68cef0f8cbbd','Lân Nguyễn','lannguyenit598@monca.me','$2b$10$zDlEJAdhI/Xi4RzpmJDgf.mI2X7WTeM1B0UotBbIa1o6EsJqUpcOe',1,'2020-08-19 20:24:59','2020-08-19 20:24:59'),('b405c667-d8fe-4dca-8908-df08264d115a','Nguyễn Hồng Kông','1703@monca.me','$2b$10$24sAU01VQHWk37qteVwPMOXXjBkC/XROaO.bzmeCToIvK3/H34fqi',1,'2020-07-26 16:58:25','2020-08-18 22:51:53'),('f010f2fe-157b-4174-a8a9-eb2002fbb1b7','Nguyễn Thành Công','1704@monca.me','$2b$10$I9DSk4/HyQrcXp8XhEvn.u7GIkzMyTeeItqcdvLM8wl3YqHbIFQN2',1,'2020-07-26 16:58:58','2020-07-26 16:58:58');
/*!40000 ALTER TABLE `Employees` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-29 23:12:49
