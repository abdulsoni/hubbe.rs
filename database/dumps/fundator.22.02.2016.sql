-- MySQL dump 10.13  Distrib 5.5.46, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: fundator
-- ------------------------------------------------------
-- Server version	5.5.46-0ubuntu0.14.04.2

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
-- Table structure for table `contest_jury`
--

DROP TABLE IF EXISTS `contest_jury`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contest_jury` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contest_id` int(11) NOT NULL,
  `judge_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contest_jury`
--

LOCK TABLES `contest_jury` WRITE;
/*!40000 ALTER TABLE `contest_jury` DISABLE KEYS */;
INSERT INTO `contest_jury` VALUES (2,4,5),(3,4,7),(4,4,2),(5,4,3),(6,1,6),(7,1,4);
/*!40000 ALTER TABLE `contest_jury` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contest_skills`
--

DROP TABLE IF EXISTS `contest_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contest_skills` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contest_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contest_skills`
--

LOCK TABLES `contest_skills` WRITE;
/*!40000 ALTER TABLE `contest_skills` DISABLE KEYS */;
/*!40000 ALTER TABLE `contest_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contestants`
--

DROP TABLE IF EXISTS `contestants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contestants` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contest_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `entry_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contestants`
--

LOCK TABLES `contestants` WRITE;
/*!40000 ALTER TABLE `contestants` DISABLE KEYS */;
/*!40000 ALTER TABLE `contestants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contests`
--

DROP TABLE IF EXISTS `contests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contests` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL,
  `thumbnail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8_unicode_ci NOT NULL,
  `start_time` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `budget` double(8,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contests`
--

LOCK TABLES `contests` WRITE;
/*!40000 ALTER TABLE `contests` DISABLE KEYS */;
INSERT INTO `contests` VALUES (1,0,'','Thistle Wisent','Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','2016-02-09 00:00:00',60,12000.00),(2,0,'','Tulip Ithomiid','Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','2016-02-09 02:43:16',60,3000.00),(3,0,'','Iris Oystercatcher','Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','2016-02-09 02:43:16',60,198000.00),(4,0,'','Poppy Acipenser','Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','2016-02-09 00:00:00',60,50000.00);
/*!40000 ALTER TABLE `contests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `creators`
--

DROP TABLE IF EXISTS `creators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `creators` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creators`
--

LOCK TABLES `creators` WRITE;
/*!40000 ALTER TABLE `creators` DISABLE KEYS */;
INSERT INTO `creators` VALUES (1,1),(2,2);
/*!40000 ALTER TABLE `creators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currencies`
--

DROP TABLE IF EXISTS `currencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currencies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `symbol` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currencies`
--

LOCK TABLES `currencies` WRITE;
/*!40000 ALTER TABLE `currencies` DISABLE KEYS */;
/*!40000 ALTER TABLE `currencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entries`
--

DROP TABLE IF EXISTS `entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entries` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contest_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entries`
--

LOCK TABLES `entries` WRITE;
/*!40000 ALTER TABLE `entries` DISABLE KEYS */;
INSERT INTO `entries` VALUES (1,1,1,'Entry #1 : Thistle Wisent','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),(2,1,1,'Entry #1 : Thistle Wisent','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),(3,2,1,'Entry #1 : Tulip Ithomiid','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),(4,2,1,'Entry #1 : Tulip Ithomiid','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),(5,3,1,'Entry #1 : Iris Oystercatcher','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),(6,3,1,'Entry #1 : Iris Oystercatcher','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),(7,4,1,'Entry #1 : Poppy Acipenser','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),(8,4,1,'Entry #1 : Poppy Acipenser','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
/*!40000 ALTER TABLE `entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entry_ratings`
--

DROP TABLE IF EXISTS `entry_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entry_ratings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) NOT NULL,
  `judge_id` int(11) NOT NULL,
  `design` double(8,2) NOT NULL,
  `creativity` double(8,2) NOT NULL,
  `industrial` double(8,2) NOT NULL,
  `market` double(8,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entry_ratings`
--

LOCK TABLES `entry_ratings` WRITE;
/*!40000 ALTER TABLE `entry_ratings` DISABLE KEYS */;
INSERT INTO `entry_ratings` VALUES (1,1,3,10.00,6.00,6.00,8.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(2,1,4,10.00,1.00,4.00,3.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(3,1,5,7.00,1.00,7.00,5.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(4,2,3,5.00,4.00,1.00,4.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(5,2,4,9.00,2.00,9.00,2.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(6,2,5,2.00,4.00,2.00,3.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(7,3,3,10.00,2.00,1.00,5.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(8,3,4,9.00,9.00,6.00,9.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(9,3,5,5.00,2.00,6.00,5.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(10,4,3,2.00,10.00,8.00,9.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(11,4,4,1.00,4.00,3.00,5.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(12,4,5,7.00,4.00,9.00,6.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(13,5,3,5.00,8.00,8.00,7.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(14,5,4,2.00,9.00,9.00,1.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(15,5,5,10.00,10.00,6.00,9.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(16,6,3,9.00,1.00,7.00,4.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(17,6,4,2.00,3.00,8.00,4.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(18,6,5,3.00,5.00,2.00,3.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(19,7,3,9.00,4.00,7.00,6.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(20,7,4,8.00,6.00,1.00,3.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(21,7,5,3.00,8.00,9.00,4.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(22,8,3,7.00,7.00,5.00,7.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(23,8,4,7.00,1.00,5.00,5.00,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(24,8,5,2.00,1.00,8.00,4.00,'2016-02-09 07:43:16','2016-02-09 07:43:16');
/*!40000 ALTER TABLE `entry_ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expertise`
--

DROP TABLE IF EXISTS `expertise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expertise` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `expertise_category_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `visible` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expertise`
--

LOCK TABLES `expertise` WRITE;
/*!40000 ALTER TABLE `expertise` DISABLE KEYS */;
INSERT INTO `expertise` VALUES (1,3,'Intellectual property',1);
/*!40000 ALTER TABLE `expertise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expertise_categories`
--

DROP TABLE IF EXISTS `expertise_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expertise_categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expertise_categories`
--

LOCK TABLES `expertise_categories` WRITE;
/*!40000 ALTER TABLE `expertise_categories` DISABLE KEYS */;
INSERT INTO `expertise_categories` VALUES (1,NULL,'Manage a team',''),(2,1,'Manage a team of Front End developers',''),(3,NULL,'Legal Issues','Need for contracts in intellectual property, sales contract, buying contracts'),(4,3,'Intellectual propery','All things related to intellectual property');
/*!40000 ALTER TABLE `expertise_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expertise_skills`
--

DROP TABLE IF EXISTS `expertise_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expertise_skills` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `expertise_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expertise_skills`
--

LOCK TABLES `expertise_skills` WRITE;
/*!40000 ALTER TABLE `expertise_skills` DISABLE KEYS */;
/*!40000 ALTER TABLE `expertise_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `file_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `extension` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `file_size` int(11) NOT NULL,
  `file_url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investments`
--

DROP TABLE IF EXISTS `investments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `investments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `investor_id` int(11) NOT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `amount` double(8,2) DEFAULT NULL,
  `equity` double(8,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investments`
--

LOCK TABLES `investments` WRITE;
/*!40000 ALTER TABLE `investments` DISABLE KEYS */;
/*!40000 ALTER TABLE `investments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investors`
--

DROP TABLE IF EXISTS `investors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `investors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `investment_budget` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `investment_goal` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `investment_reason` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investors`
--

LOCK TABLES `investors` WRITE;
/*!40000 ALTER TABLE `investors` DISABLE KEYS */;
INSERT INTO `investors` VALUES (1,3,'','',''),(2,4,'','',''),(3,5,'','',''),(4,6,'','',''),(5,7,'','','');
/*!40000 ALTER TABLE `investors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `judges`
--

DROP TABLE IF EXISTS `judges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `judges` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `judges`
--

LOCK TABLES `judges` WRITE;
/*!40000 ALTER TABLE `judges` DISABLE KEYS */;
/*!40000 ALTER TABLE `judges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `thread_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `body` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,1,2,'hello great job','2016-02-11 11:59:19','2016-02-11 11:59:19'),(2,1,2,'hello great job','2016-02-11 11:59:19','2016-02-11 11:59:19');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES ('2014_02_10_145728_notification_categories',1),('2014_08_01_210813_create_notification_groups_table',1),('2014_08_01_211045_create_notification_category_notification_group_table',1),('2014_10_12_000000_create_users_table',1),('2014_10_12_100000_create_password_resets_table',1),('2014_10_28_175635_create_threads_table',1),('2014_10_28_175710_create_messages_table',1),('2014_10_28_180224_create_participants_table',1),('2014_11_03_154831_add_soft_deletes_to_participants_table',1),('2014_11_10_083449_add_nullable_to_last_read_in_participants_table',1),('2014_11_20_131739_alter_last_read_in_participants_table',1),('2014_12_04_124531_add_softdeletes_to_threads_table',1),('2015_05_05_212549_create_notifications_table',1),('2015_06_06_211555_add_expire_time_column_to_notification_table',1),('2015_06_06_211555_change_type_to_extra_in_notifications_table',1),('2015_06_07_211555_alter_category_name_to_unique',1),('2015_11_29_085515_create_contests_table',1),('2015_11_29_085723_create_entries_table',1),('2015_11_29_104254_entrust_setup_tables',1),('2015_12_05_182356_create_currencies_table',1),('2015_12_05_182514_create_files_table',1),('2015_12_05_183628_create_contestants_table',1),('2015_12_05_184840_create_prizes_table',1),('2015_12_13_023509_create_skills_table',1),('2015_12_13_024001_create_contest_skills_table',1),('2016_01_03_104135_create_creators_table',1),('2016_01_03_231443_create_investors_table',1),('2016_01_03_231534_create_judges_table',1),('2016_01_03_231555_create_super_experts_table',1),('2016_01_10_084058_create_entry_ratings_table',1),('2016_01_23_081341_create_contest_jury_table',1),('2016_02_06_025141_create_projects_table',1),('2016_02_06_042253_create_pages_table',1),('2016_02_06_083451_create_investments_table',1),('2016_02_08_052417_create_expertise_categories_table',1),('2016_02_08_052448_create_expertise_table',1),('2016_02_08_091558_create_expertise_skills_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_categories`
--

DROP TABLE IF EXISTS `notification_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification_categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `text` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `notification_categories_name_unique` (`name`),
  KEY `notification_categories_name_index` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_categories`
--

LOCK TABLES `notification_categories` WRITE;
/*!40000 ALTER TABLE `notification_categories` DISABLE KEYS */;
INSERT INTO `notification_categories` VALUES (1,'user.created','Your account has been created!'),(2,'jury.invited','You have been invited to judge the contest - <a ui-sref=\"app.contestsingle({contestId: extra.contest.id})\">{extra.contest.name}</a>.'),(3,'jury.removed','You have been removed as a judge from the contest - <a ui-sref=\"app.contestsingle({contestId: extra.contest.id})\">{extra.contest.name}</a>.'),(4,'jury.entry.new','There is a new entry by {} under the contest {}'),(5,'jury.entry.revised','There is a revised entry by {} under the contest {}'),(6,'contestant.accepted','There is a new rating on your entry on {}'),(7,'contestant.rating','There is a new rating on your entry on {}');
/*!40000 ALTER TABLE `notification_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_groups`
--

DROP TABLE IF EXISTS `notification_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `notification_groups_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_groups`
--

LOCK TABLES `notification_groups` WRITE;
/*!40000 ALTER TABLE `notification_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `from_id` bigint(20) unsigned NOT NULL,
  `from_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `to_id` bigint(20) unsigned NOT NULL,
  `to_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `extra` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `read` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `expire_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_from_id_index` (`from_id`),
  KEY `notifications_from_type_index` (`from_type`),
  KEY `notifications_to_id_index` (`to_id`),
  KEY `notifications_to_type_index` (`to_type`),
  KEY `notifications_category_id_index` (`category_id`),
  CONSTRAINT `notifications_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `notification_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,5,NULL,5,NULL,2,'http://fundator.co','{\"contest\":{\"id\":\"4\",\"name\":\"Poppy Acipenser\"},\"user\":{\"id\":\"5\",\"name\":\"Kristy R.\"}}',0,'2016-02-09 08:52:11','2016-02-09 08:52:11',NULL),(2,7,NULL,7,NULL,2,'http://fundator.co','{\"contest\":{\"id\":\"4\",\"name\":\"Poppy Acipenser\"},\"user\":{\"id\":\"7\",\"name\":\"Rosalie L.\"}}',0,'2016-02-09 08:52:11','2016-02-09 08:52:11',NULL),(4,6,NULL,6,NULL,2,'http://fundator.co','{\"contest\":{\"id\":\"1\",\"name\":\"Thistle Wisent\"},\"user\":{\"id\":\"6\",\"name\":\"Marcus R.\"}}',0,'2016-02-09 08:54:01','2016-02-09 08:54:01',NULL),(5,4,NULL,4,NULL,2,'http://fundator.co','{\"contest\":{\"id\":\"1\",\"name\":\"Thistle Wisent\"},\"user\":{\"id\":\"4\",\"name\":\"Laura C.\"}}',0,'2016-02-09 08:54:01','2016-02-09 08:54:01',NULL),(6,2,NULL,2,NULL,1,'http://fundator.co','{\"icon\":\"signup\",\"action\":null}',0,'2016-02-11 07:12:14','2016-02-11 07:12:14',NULL);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications_categories_in_groups`
--

DROP TABLE IF EXISTS `notifications_categories_in_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications_categories_in_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(10) unsigned NOT NULL,
  `group_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_categories_in_groups_category_id_index` (`category_id`),
  KEY `notifications_categories_in_groups_group_id_index` (`group_id`),
  CONSTRAINT `notifications_categories_in_groups_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `notification_groups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `notifications_categories_in_groups_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `notification_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications_categories_in_groups`
--

LOCK TABLES `notifications_categories_in_groups` WRITE;
/*!40000 ALTER TABLE `notifications_categories_in_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications_categories_in_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participants`
--

DROP TABLE IF EXISTS `participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `participants` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `thread_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `last_read` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participants`
--

LOCK TABLES `participants` WRITE;
/*!40000 ALTER TABLE `participants` DISABLE KEYS */;
INSERT INTO `participants` VALUES (1,2,1,'2016-02-09 07:43:16','2016-02-09 07:43:16','2016-02-09 07:43:16',NULL);
/*!40000 ALTER TABLE `participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_role`
--

DROP TABLE IF EXISTS `permission_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission_role` (
  `permission_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `permission_role_role_id_foreign` (`role_id`),
  CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_role`
--

LOCK TABLES `permission_role` WRITE;
/*!40000 ALTER TABLE `permission_role` DISABLE KEYS */;
INSERT INTO `permission_role` VALUES (1,3),(1,4);
/*!40000 ALTER TABLE `permission_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'judge','Can Judge ?','This permission is given to a user who can judge a contest','2016-02-09 07:43:15','2016-02-09 07:43:15');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prizes`
--

DROP TABLE IF EXISTS `prizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prizes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contest_id` int(11) NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `prize` double(8,2) NOT NULL,
  `currency` int(11) NOT NULL,
  `royalty` double(8,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prizes`
--

LOCK TABLES `prizes` WRITE;
/*!40000 ALTER TABLE `prizes` DISABLE KEYS */;
/*!40000 ALTER TABLE `prizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL,
  `thumbnail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `start_time` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` mediumtext COLLATE utf8_unicode_ci,
  `market` mediumtext COLLATE utf8_unicode_ci,
  `geography` text COLLATE utf8_unicode_ci,
  `display` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,0,'','2016-02-09 02:43:16',365,'Fundator','Lorem Ipsum',NULL,NULL,0);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_user`
--

DROP TABLE IF EXISTS `role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_user` (
  `user_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_user_role_id_foreign` (`role_id`),
  CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_user`
--

LOCK TABLES `role_user` WRITE;
/*!40000 ALTER TABLE `role_user` DISABLE KEYS */;
INSERT INTO `role_user` VALUES (1,1),(2,1),(3,4),(4,4),(5,4),(6,4),(7,4);
/*!40000 ALTER TABLE `role_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'creator','Creator','User is the creator of projects on the website','2016-02-09 07:43:15','2016-02-09 07:43:15'),(2,'expert','Expert','User is the expert who will work on the projects','2016-02-09 07:43:15','2016-02-09 07:43:15'),(3,'super_expert','Super Expert','Super experts manage all projects while working with creators on each step','2016-02-09 07:43:15','2016-02-09 07:43:15'),(4,'investor','Investor','','2016-02-09 07:43:15','2016-02-09 07:43:15');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skills` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'Communication',''),(2,'Relationship Management',''),(3,'Marketing and Sales',''),(4,'Project Management',''),(5,'Problem-Solving',''),(6,'Ruby ',''),(7,'ASP.NET',''),(8,'AJAX',''),(9,'Objective-C',''),(10,'PHP',''),(11,'Python',''),(12,'Perl ',''),(13,'C',''),(14,'C#',''),(15,'XML',''),(16,'C++',''),(17,'JavaScript',''),(18,'HTML',''),(19,'Java',''),(20,'SQL ',''),(21,'Protect the idea in Europe','');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `super_experts`
--

DROP TABLE IF EXISTS `super_experts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `super_experts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `super_experts`
--

LOCK TABLES `super_experts` WRITE;
/*!40000 ALTER TABLE `super_experts` DISABLE KEYS */;
/*!40000 ALTER TABLE `super_experts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `threads`
--

DROP TABLE IF EXISTS `threads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `threads` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `subject` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `threads`
--

LOCK TABLES `threads` WRITE;
/*!40000 ALTER TABLE `threads` DISABLE KEYS */;
INSERT INTO `threads` VALUES (1,'#1 Entry #1 : Thistle Wisent','2016-02-09 07:43:16','2016-02-11 11:59:19',NULL),(2,'#1 Entry #1 : Thistle Wisent','2016-02-09 07:43:16','2016-02-09 07:43:16',NULL),(3,'#2 Entry #1 : Thistle Wisent','2016-02-09 07:43:16','2016-02-09 07:43:16',NULL),(4,'#2 Entry #1 : Thistle Wisent','2016-02-09 07:43:16','2016-02-09 07:43:16',NULL),(5,'#3 Entry #1 : Tulip Ithomiid','2016-02-09 07:43:16','2016-02-09 07:43:16',NULL),(6,'#3 Entry #1 : Tulip Ithomiid','2016-02-09 07:43:16','2016-02-09 07:43:16',NULL),(7,'#4 Entry #1 : Tulip Ithomiid','2016-02-09 07:43:16','2016-02-09 07:43:16',NULL),(8,'#4 Entry #1 : Tulip Ithomiid','2016-02-09 07:43:16','2016-02-09 07:43:16',NULL),(9,'#5 Entry #1 : Iris Oystercatcher','2016-02-09 07:43:16','2016-02-09 07:43:16',NULL),(10,'#5 Entry #1 : Iris Oystercatcher','2016-02-09 07:43:16','2016-02-09 07:43:16',NULL),(11,'#6 Entry #1 : Iris Oystercatcher','2016-02-09 07:43:16','2016-02-09 07:43:16',NULL),(12,'#6 Entry #1 : Iris Oystercatcher','2016-02-09 07:43:16','2016-02-09 07:43:16',NULL),(13,'#7 Entry #1 : Poppy Acipenser','2016-02-09 07:43:16','2016-02-09 07:43:16',NULL),(14,'#7 Entry #1 : Poppy Acipenser','2016-02-09 07:43:16','2016-02-09 07:43:16',NULL),(15,'#8 Entry #1 : Poppy Acipenser','2016-02-09 07:43:16','2016-02-09 07:43:16',NULL),(16,'#8 Entry #1 : Poppy Acipenser','2016-02-09 07:43:16','2016-02-09 07:43:16',NULL);
/*!40000 ALTER TABLE `threads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `thumbnail_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `needs_reset` tinyint(1) NOT NULL,
  `registered` tinyint(1) NOT NULL,
  `linkedin` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `google` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `twitter` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `dob` date NOT NULL,
  `age_gate` tinyint(1) NOT NULL,
  `country_origin` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `country_residence` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `contact_number` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `contact_time` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,0,'Udit','','creator','udit@eskaytech.com','$2y$10$92ogrWlpyu0DUq/TgxwC/us4OAecZttsjkry3k3gWyD.fAi0G8GUi',0,0,NULL,NULL,NULL,'','0000-00-00',0,'','','','',NULL,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(2,0,'Benjamin','Vignon','creator','benjamin@komprom.com','$2y$10$UKqK0d.zoxLTmKR/4/XTMelwo74c9NB0XjdA4fRi0T/lKhCihhHqC',0,1,NULL,NULL,NULL,'','0000-00-00',1,'France','China','666666666','9-6',NULL,'2016-02-09 07:43:16','2016-02-11 07:12:15'),(3,0,'Christophe Brissiaud','','investor','christophe@fundator.co','$2y$10$Ycaqk.r/u0nLNU.DlaxnbOzti/ATTDvEPLSRuv3oGgB.ARBz/ZeQu',0,0,NULL,NULL,NULL,'','0000-00-00',0,'','','','',NULL,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(4,0,'Laura C.','Wilton','investor','LauraCWilton@teleworm.us','$2y$10$hgEw4TnzNsNGLcLS/iFRq..zE2mnCS6utA8nMkxx0iZqFU2WNGehW',0,0,NULL,NULL,NULL,'female','0000-00-00',1,'us','us','+1-510-489-3184','9-6',NULL,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(5,0,'Kristy R.','Black','investor','KristyRBlack@armyspy.com','$2y$10$OwfbNO6v5tilxNhXrcQOleyjwNJX2sSuZo1guinj.g785VeO.I/0y',0,0,NULL,NULL,NULL,'female','0000-00-00',1,'france','france','+33 03.54.10.61.10','9-6',NULL,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(6,0,'Marcus R.','Didomenico','investor','MarcusRDidomenico@dayrep.com','$2y$10$E29h9lsTXaWrfg4piNSPEeHB9isKVsgG9fWuOWVMLxBIOciwHI3qm',0,0,NULL,NULL,NULL,'female','0000-00-00',1,'france','france','+33 03.54.10.61.10','9-6',NULL,'2016-02-09 07:43:16','2016-02-09 07:43:16'),(7,0,'Rosalie L.','Silva','investor','RosalieLSilva@jourrapide.com','$2y$10$kCSsFe3RxE29FuDEK8q/B.X0ckbNmpLxsxLtB4C5TeLJ0wf14NQb6',0,0,NULL,NULL,NULL,'female','0000-00-00',1,'france','france','+33 03.54.10.61.10','9-6',NULL,'2016-02-09 07:43:16','2016-02-09 07:43:16');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-02-21 22:50:20
