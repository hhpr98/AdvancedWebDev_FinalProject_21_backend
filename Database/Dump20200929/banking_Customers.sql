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
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS `Customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Customers` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phonenumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customers`
--

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
INSERT INTO `Customers` VALUES ('1084aebc-01da-415a-b56a-4e745cba7332','Nguyễn Hữu Hòa','nguyenhuuhoa1998@gmail.com','0353133147','Tân Bình, HCM','$2b$10$XWv3m1LnUL.JVInT/STd5ecUpbKMbfKd03mKRJ3sBTFKdFmbtNRki','2020-07-26 16:33:36','2020-07-26 16:33:36'),('152d206a-4266-42ce-9c0e-b1f82a4aca76','Nguyễn Văn A','hoaan2302@gmail.com','0792310011','Nhơn Trạch, Đồng Nai','$2b$10$AJo4peSO88PYo.von3dmdOGt4q559igmyVCpStDp5sRrFz0MPQSFG','2020-08-20 00:03:54','2020-08-20 00:03:54'),('2ee66ce3-b235-4538-8317-800e34f46b27','Nguyễn Minh Thuận','pse88180@cuoly.com','362144307','Đà Nẵng','$2b$10$CnHZb996aAzGGJOJyhD1FeK/dB0kVu1flf1a6dLM92rBDpJ2HfAb.','2020-07-31 13:28:00','2020-07-31 13:28:00'),('61bf1283-2c08-4e7c-9e0f-4efe39be6e68','Nguyễn Vĩ Nhân','tzp44303@eoopy.com','0394856696','Tân Phú,HCM','$2b$10$ZivYc.t8PQJxqQbl3jVu6O7AeS/C6YRQmwPNi7WXwZrjyyNAwU2L2','2020-08-20 00:05:21','2020-08-20 00:05:21'),('671f032a-9b1d-480e-9948-09f7ab71a379','Nguyễn Huy Hoàng','kac67631@cuoly.com','0371832267','Lô 3/4c Hoàng Huy Giáp, Tân Phú','$2b$10$zO8Y9vtHCyyrdAypwe1fy.AdadQ6V6EcbdpCm2krpk.vBDI5xd7iG','2020-08-18 20:49:42','2020-08-18 20:49:42'),('71ebbaa7-0deb-4f37-a5ed-642c68709c0d','Lân Nguyễn','lannguyen10a1@gmail.com','0354855567','137 Cao Bá Quát, P12, Gò Vấp, TpHCM','$2b$10$YzqKtN0O2PY3fssbKheO9OB3gM6EYe.7/8bls.xEsFec8LAvjjwKW','2020-08-05 16:01:39','2020-08-19 23:08:18'),('8626706e-4823-4ebd-92a3-e2b291334cd5','Thu Phương','anhoapham1612210@gmail.com','0792310002','Nhơn Trạch, Đồng Nai','$2b$10$BmOYzBZXcOuqdWGg.NntLeGohM8JmWAlr/Xw6r7xiD4HVeTgwgM9.','2020-08-19 22:00:46','2020-08-19 22:00:46'),('93a9c08a-50e5-4044-93e6-4ebb7c584012','Phạm Ân Hòa','anhoapham2302@gmail.com','0345867785','Quận 2,HCM','$2b$10$BNN3p3vk23AYD2xH75rzO.zrGr9UtjxGcTJfjZv.5VYAGyP2jwTcu','2020-07-26 16:33:12','2020-07-26 16:33:12'),('a497ef92-4bac-450d-886d-30fd6521e362','Cao Vĩnh Phát','hui07230@eoopy.com','0367594956','137 Phạm Văn Đồng, Tân Bình, HCM','$2b$10$QuJmmHtBZLAkv9hx/1bGZ.txFRouYsXdfjLRQaayJNEwwkYcp9uy6','2020-08-19 20:48:08','2020-08-19 21:01:55'),('c684cce9-5590-4d66-b82a-77a541e552ff','Hòa 2','1612209@student.hcmus.edu.vn','0982327118','191 Đồng Đen, Tân Bình, P11, HCM','$2b$10$GVSy4IYOeXjOjGsXJMY8CejoLQLn3L3pFwcny8xOjYxwgl2Kz7i3y','2020-08-19 22:37:06','2020-08-19 22:37:06'),('e8a633bb-378e-4518-84a1-25d5196d1331','Phạm Hachito','hoaan31071998@gmail.com','0792310001','Nhơn Trạch, Đồng Nai','$2b$10$sSH3dncGXma.eBqve3SQOudOFKA88aaEIPskUOMhzxIb0KW2vnwiS','2020-08-19 20:50:34','2020-08-19 20:52:29');
/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-29 23:12:47
