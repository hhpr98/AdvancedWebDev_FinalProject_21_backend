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
-- Table structure for table `foreignbanks`
--

DROP TABLE IF EXISTS `foreignbanks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foreignbanks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bankingName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `bankingSortName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `urlInfo` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `urlTransaction` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `localSecretKey` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `foreignSecretKey` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `foreignPublicKey` varchar(1023) COLLATE utf8_unicode_ci NOT NULL,
  `localCompanyID` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `foreignCompanyID` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foreignbanks`
--

LOCK TABLES `foreignbanks` WRITE;
/*!40000 ALTER TABLE `foreignbanks` DISABLE KEYS */;
INSERT INTO `foreignbanks` VALUES (1,'Test Bank','TB','url','url','key','JaNdRgUjXn2r5u8x/A?D(G+KbPeShVmYp3s6v9y$B&E)H@McQfTjWnZr4t7w!z%C','-----BEGIN PUBLIC KEY-----MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHQ8dqBrWfMSIPnwPW3YMeCgZckjv5IxQV7rqVPIh/bM8c/mnHJo5gu9Mg2v87wLX8GORhSuu8BmW3tWnROGnyszVVJQJ9FImebJ6ATrEwlG1Mahu3xxJH1+xfxGmEt3uj3u4q2UjEILZ/qJ72EwqNBhfOnQw/TGW0TA/ozWzD5FAgMBAAE=-----END PUBLIC KEY-----','id','0bzrVuXCup2PRcAn0vAnS3FfQVuddNeY1/eZfdWX65g=',NULL,NULL),(2,'HD Bank','HDB','https://salty-meadow-17297.herokuapp.com/customer/query_information','https://salty-meadow-17297.herokuapp.com/customer/recharge','JaNdRgUjXn2r5u8x/A?D(G+KbPeShVmYp3s6v9y$B&E)H@McQfTjWnZr4t7w!z%C','hPZno63KBfZeIcvYLDwx','-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCTrlHb3adQstaRWJlqtsrIeFo57lSpE5FemvbIiBn0gGVMl+SveVm8Zj1JnpLfJngkfnsUgyJp1fLodhgtN581o7AdYGUQlx70kWw75WhSMbDAzH5qjpFNSlNNjC8rT5XyCE/YFJ6DuEloJgXoJvRnNXPxPWj4IelLJ84ZfAWI5QIDAQAB-----END PUBLIC KEY-----','7APW008iv5sSF1EWskRd','TttwVLKHvXRujyllDq',NULL,NULL),(3,'HK Bank','HKB','https://smartbankinghk.herokuapp.com/api/foreign-bank/info','https://smartbankinghk.herokuapp.com/api/foreign-bank/add-money','secretSign','JaNdRgUjXn2r5u8x/A?D(G+KbPeShVmYp3s6v9y$B&E)H@McQfTjWnZr4t7w!z%C','-----BEGIN PUBLIC KEY-----MIICITANBgkqhkiG9w0BAQEFAAOCAg4AMIICCQKCAgB5NqBS6gT/H+hEfpRZNKeeVO6AxT/hHtcrMmWG9NuVtT/hQltYYidru7o45y9Xw8fb9xNcF/kKRBBNQyp5g7Wajt7nn8SyR8T9/ftOO2VihQwMKh8U1Or3BBSvJmrxfHl6qNpTVN8zicnL8ZccbXAgvqFiF5e2WyemaXmRMvcCokznfOPqePLDqjpbTEotPSu7UJbmrGyjC0wit78e8ZfjXtngl+W6U9/eSRUIc1PBddM6zG8s4jv1FXfL2CC7DJ2g0/J6tyLHykzj/ohEp9CMJnJugz1Nod8/2KF+1rGiWO6UV4WW/BPaZ6vhJ5daLjQZSmm2iMFUyt/zAeHakYTQlkJzFu8MQXfaKRdBAH+NboIKmxvByO+siYeHb2vHQTBDcGGWPvkbgQFJdXy3MyxXfUjJPPQhm7nCIQSiHBuEbMQN0kj6SUvYkmpdVso1hylrV0+ItE5L8WGpnPbjho+j5mrMU0l/w2YjPjUz8EKer0Uy/wA31BMBZpjH3+QRTCQtkmnKC0nLUku3yYTEFdjyiYecRQZ9017OjDB08JwyxnGKdemuI2Eh5yvWEblXzifbCe+NfhDlXY3QLAnUbn+nHfaC6nn6rvDEktP7KWa8H+WYCMTP2oFmlG+FoQFBXCCQGiL9jBj5OrASBSTUy7d8VnZ6exs6i2lHKVKvJ+IYwQIDAQAB-----END PUBLIC KEY-----','7APW008iv5sSF1EWskRdYlyXCFbGJzG0Zseh0Tpj3Fm1AZ6ZMiRFmleIGhf6i7xTkXNDK9b1XgXdnkgA','e19d66c2ef51c9aed8d532bb11f08ed6',NULL,NULL),(4,'HL Bank','HLB',' https://i-banking.herokuapp.com/lh-bank/account-bank','https://i-banking.herokuapp.com/lh-bank/transfer-bank','(save_in_config.js)','JaNdRgUjXn2r5u8x/A?D(G+KbPeShVmYp3s6v9y$B&E)H@McQfTjWnZr4t7w!z%C','key','1e38d9e06cc73eed05c5eb4e1f13d8d4','6ae118690c0f241b1d5a98b4449d8a67',NULL,NULL);
/*!40000 ALTER TABLE `foreignbanks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-23 21:27:41
