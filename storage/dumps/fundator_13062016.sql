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
-- Table structure for table `confirms`
--

DROP TABLE IF EXISTS `confirms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confirms` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `confirmable_id` int(11) NOT NULL,
  `confirmable_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `confirm_status` tinyint(1) NOT NULL DEFAULT '0',
  `confirm_time` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confirms`
--

LOCK TABLES `confirms` WRITE;
/*!40000 ALTER TABLE `confirms` DISABLE KEYS */;
INSERT INTO `confirms` VALUES (1,0,'',0,0,0,NULL,'2016-04-11 08:34:34','2016-04-11 08:34:34'),(2,0,'',0,0,0,NULL,'2016-04-11 08:50:01','2016-04-11 08:50:01'),(3,0,'',0,0,0,NULL,'2016-04-11 10:57:21','2016-04-11 10:57:21'),(4,0,'',0,0,0,NULL,'2016-04-11 11:02:15','2016-04-11 11:02:15'),(5,0,'',0,0,0,NULL,'2016-04-11 11:04:13','2016-04-11 11:04:13'),(6,0,'',0,0,0,NULL,'2016-04-11 11:05:52','2016-04-11 11:05:52'),(7,0,'',0,0,0,NULL,'2016-04-11 11:10:04','2016-04-11 11:10:04'),(8,0,'',0,0,0,NULL,'2016-04-11 11:12:38','2016-04-11 11:12:38'),(9,9,'Fundator\\ProjectExpertise',1,1,0,NULL,'2016-04-11 11:14:37','2016-04-11 11:14:37'),(10,10,'Fundator\\ProjectExpertise',1,1,0,NULL,'2016-04-11 11:22:36','2016-04-11 11:22:36'),(11,11,'Fundator\\ProjectExpertise',1,1,0,NULL,'2016-04-11 11:27:54','2016-04-11 11:27:54'),(12,12,'Fundator\\ProjectExpertise',2,1,0,NULL,'2016-04-11 11:29:18','2016-04-11 11:29:18'),(13,0,'',0,0,0,NULL,'2016-04-11 15:34:09','2016-04-11 15:34:09'),(14,0,'',0,0,0,NULL,'2016-04-11 15:35:22','2016-04-11 15:35:22'),(15,0,'',0,0,0,NULL,'2016-04-13 06:09:19','2016-04-13 06:09:19'),(16,0,'',0,0,0,NULL,'2016-04-14 15:21:53','2016-04-14 15:21:53'),(17,0,'',0,0,0,NULL,'2016-04-15 06:02:08','2016-04-15 06:02:08'),(18,0,'',0,0,0,NULL,'2016-04-15 13:24:03','2016-04-15 13:24:03'),(19,0,'',0,0,0,NULL,'2016-04-15 14:45:42','2016-04-15 14:45:42'),(20,0,'',0,0,0,NULL,'2016-04-16 11:10:07','2016-04-16 11:10:07'),(21,0,'',0,0,0,NULL,'2016-04-16 15:10:09','2016-04-16 15:10:09'),(22,0,'',0,0,0,NULL,'2016-04-19 04:23:52','2016-04-19 04:23:52'),(23,23,'Fundator\\ProjectExpertise',2,1,0,NULL,'2016-04-20 06:07:52','2016-04-20 06:07:52'),(24,24,'Fundator\\ProjectExpertise',2,1,0,NULL,'2016-04-21 07:44:48','2016-04-21 07:44:48'),(25,25,'Fundator\\ProjectExpertise',2,1,0,NULL,'2016-04-21 07:45:23','2016-04-21 07:45:23'),(26,26,'Fundator\\ProjectExpertise',2,1,1,'2016-04-25 03:32:05','2016-04-24 11:37:18','2016-04-25 07:32:05'),(27,27,'Fundator\\ProjectExpertise',2,1,0,NULL,'2016-04-26 09:10:01','2016-04-26 09:10:01'),(28,28,'Fundator\\ProjectExpertise',1,1,0,NULL,'2016-05-09 07:52:34','2016-05-09 07:52:34'),(29,29,'Fundator\\ProjectExpertise',1,1,1,'2016-05-10 07:56:13','2016-05-10 11:42:18','2016-05-10 11:56:13'),(30,30,'Fundator\\ProjectExpertise',2,1,0,NULL,'2016-05-10 14:08:12','2016-05-10 14:08:13'),(31,31,'Fundator\\ProjectExpertise',1,1,0,NULL,'2016-05-15 10:43:49','2016-05-15 10:43:49'),(32,32,'Fundator\\ProjectExpertise',1,1,1,'2016-05-15 08:17:08','2016-05-15 12:16:51','2016-05-15 12:17:08'),(33,33,'Fundator\\ProjectExpertise',2,1,0,NULL,'2016-05-17 14:58:14','2016-05-17 14:58:14'),(34,34,'Fundator\\ProjectExpertise',2,1,0,NULL,'2016-05-17 14:58:35','2016-05-17 14:58:35'),(35,35,'Fundator\\ProjectExpertise',2,1,0,NULL,'2016-05-20 14:31:41','2016-05-20 14:31:41'),(36,36,'Fundator\\ProjectExpertise',76,1,0,NULL,'2016-05-21 12:45:46','2016-05-21 12:45:46'),(37,37,'Fundator\\ProjectExpertise',76,1,0,NULL,'2016-05-22 14:50:04','2016-05-22 14:50:04'),(38,38,'Fundator\\ProjectExpertise',76,1,0,NULL,'2016-05-22 14:53:04','2016-05-22 14:53:04');
/*!40000 ALTER TABLE `confirms` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contest_jury`
--

LOCK TABLES `contest_jury` WRITE;
/*!40000 ALTER TABLE `contest_jury` DISABLE KEYS */;
INSERT INTO `contest_jury` VALUES (1,1,2),(2,2,2),(3,3,2),(4,4,2),(5,2,1),(6,5,3),(7,5,1),(8,5,2),(9,5,15),(10,1,35);
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
-- Table structure for table `contestant_applications`
--

DROP TABLE IF EXISTS `contestant_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contestant_applications` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `contest_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contestant_applications`
--

LOCK TABLES `contestant_applications` WRITE;
/*!40000 ALTER TABLE `contestant_applications` DISABLE KEYS */;
INSERT INTO `contestant_applications` VALUES (7,1,1,1,'2016-03-31 08:54:36','2016-03-31 08:54:50'),(13,100,3,1,'2016-05-29 14:45:27','2016-05-29 15:17:48'),(14,100,5,1,'2016-05-29 16:00:39','2016-05-29 16:03:20'),(17,60,1,1,'2016-06-12 13:50:21','2016-06-12 13:50:42');
/*!40000 ALTER TABLE `contestant_applications` ENABLE KEYS */;
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
  `rules` longtext COLLATE utf8_unicode_ci NOT NULL,
  `start_time` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `budget` double(8,2) NOT NULL,
  `visible` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contests`
--

LOCK TABLES `contests` WRITE;
/*!40000 ALTER TABLE `contests` DISABLE KEYS */;
INSERT INTO `contests` VALUES (1,0,'nSmE3yNFw2L07Pj82EAGQKGB0lsvQs91.jpg','Connected outdoor umbrella','<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, mollitia repellat animi! Maxime magnam dignissimos voluptas mollitia in, dolores illum perspiciatis, officia fuga iure, numquam error vel repellat facilis cumque.</p>\n\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, mollitia repellat animi! Maxime magnam dignissimos voluptas mollitia in, dolores illum perspiciatis, officia fuga iure, numquam error vel repellat facilis cumque.</p>\n\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, mollitia repellat animi! Maxime magnam dignissimos voluptas mollitia in, dolores illum perspiciatis, officia fuga iure, numquam error vel repellat facilis cumque.</p>\n\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, mollitia repellat animi! Maxime magnam dignissimos voluptas mollitia in, dolores illum perspiciatis, officia fuga iure, numquam error vel repellat facilis cumque.</p>\n\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, mollitia repellat animi! Maxime magnam dignissimos voluptas mollitia in, dolores illum perspiciatis, officia fuga iure, numquam error vel repellat facilis cumque.</p>\n','<table border=\"1\" cellpadding=\"0\" cellspacing=\"0\">\n	<tbody>\n		<tr>\n			<td style=\"vertical-align:bottom\">1- Contest timing</td>\n			<td style=\"vertical-align:bottom\">The &quot;name of contest&quot; Contest (the &quot;Contest&quot;) begins 12:00 a.m. Eastern Time (&quot;ET&quot;) on March 31, 2015 and ends at 11:59 p.m. ET on June 10, 2015 (the &quot;Contest Period&quot;). The Contest Period consists of an Entry Period (the &quot;Entry Period&quot;) which begins 12:00 a.m. ET on March 31, 2015 and ends at 11:59 p.m. ET on May 12, 2015 and a Judging Period (the&quot;Judging Period&quot;) which begins 12:00 a.m. ET on May 20, 2015 and ends at 11:59 p.m. ET on May 26, 2015.</td>\n		</tr>\n		<tr>\n			<td style=\"vertical-align:bottom\">2- Eligibility</td>\n			<td style=\"vertical-align:bottom\">Contest is open only to everyone having legal age in their country of residence. (&quot;Entrant&quot;). Entrant must comply with any requirements of the Official Rules and Material Guide lines in order for the Entrant to receive a prize. The term Winner applies only to the Entrant.</td>\n		</tr>\n		<tr>\n			<td style=\"vertical-align:bottom\">3. How to Enter the Contest:</td>\n			<td style=\"vertical-align:bottom\">During the Entry Period, you may access the Contest at http://www.fundator/contest (the &quot;Site&quot;). Once on the Site, complete the on-screen registration form. Registration information provided and all material submitted shall collectively be referred to as the &quot;Entry&quot; or &quot;Entry Material. &quot;Your Entry must adhere to the Entry Material Guidelines and the Official Rules. Entries must be complete to be eligible. You will be required to submit the release form as part of the Entry. Limit one Entry per Entrant. If additional entries are submitted from Entrant only the first entry will be eligible. &quot;The Site&quot; will review Entry and Entry Material to ensure compliance with the Official Rules.Entry will be posted online immediately after submission.<br />\n			<br />\n			Entry Material Guidelines:<br />\n			<br />\n			&middot; Each material of the Entry can be of any form and be submitted in one of the following formats: JPG, PNG, AVI, MOV, WMV, MP4, MPEG, 3GP, and 3G2; must be under 20MB.<br />\n			<br />\n			&middot; Videos may include humans, animals or inanimate objects. If a video contains a person or an animal, person or animal must be depicted in a safe manner where the person and animal appears unharmed.<br />\n			<br />\n			&middot; Entry must not have been submitted previously in a contest of any kind or previously exhibited or displayed publicly (i.e., disclosed beyond your immediate circle of friends and family) through any means.<br />\n			<br />\n			&middot; Entry must not include any representation of celebrities, athletes, musicians, or any other public or private figure, include any anti-social, political or religious groups or charitable organizations, any commercial solicitation or promotional materials or name, address, phone number, or URL address. Entry must not contain advertisements, personal solicitations or commercial solicitations.<br />\n			<br />\n			&middot; Entry must not contain material that promotes bigotry, racism, hatred or harm against any group or individual or promotes discrimination based on race, sex, religion, nationality, disability, sexual orientation or age.<br />\n			<br />\n			&middot; Any Entry or portion thereof that is, in Fundator&#39;s And Jury sole discretion, indecent, inappropriate, hateful, tortuous, slanderous, libelous, obscene, profane, lewd, defamatory, contains any third-party materials, or otherwise violates or infringes (or may infringe) any copyright, trademark, logo, or mark that identifies a brand or other proprietary right of any person living or deceased (including but not limited to rights of privacy or publicity or portrayal in a false light) or entity or make reference to any commercial/corporate advertising (including but not limited to corporate logos, brand names, slogans, political, or religious statements), or is otherwise objectionable, will not be considered and will disqualify Entrant.<br />\n			<br />\n			&middot; Entries must be in keeping with Fundaror&rsquo;s image as determined by Fundator, in its sole discretion, or Entry will be disqualified from the Contest. Entry must not disparage persons or organizations associated with, or competitors of, Sponsor.<br />\n			<br />\n			&middot; Entry must adhere to the Entry Material Guidelines and the entire Official Rules of the Contest. All material submitted becomes property of Fundator and will not be returned. Fundator does not guarantee that Entrant will have any recourse through Frto edit or delete any Entry Material that is submitted.<br />\n			<br />\n			&middot; Use of any automated or computer system to participate is prohibited and will result in disqualification. Normal Internet access and usage charges imposed by your online service may apply. All Entries received will be reviewed and approved for compliance with the Official Rules by Sponsor.</td>\n		</tr>\n		<tr>\n			<td style=\"vertical-align:bottom\">4. Online Voting:</td>\n			<td style=\"vertical-align:bottom\">All approved Entries will be posted on the Site and will be subject to voting by visitors to the Site during the Voting Period, which begins at 12:00 a.m. ET on March 31, 2015 and ends at 11:59 p.m. on May 19, 2015. Visitors will have the opportunity to visit the Site each day during the Voting Period and vote for their favorite Entry. Limit one (1) vote per Entry, per person, per day. The use of robotic or automatic devices for voting is prohibited and Sponsor reserves the right to nullify all such votes and to disqualify the responsible individual from voting. Any attempt by any person to vote more than the number of times authorized herein, using any third party proxy voting services, incentives not sponsored by Sponsor, using multiple names or e-mail addresses and/or any other fraudulent mechanism(s), including robotic, automatic, programmed or similar methods, shall give Sponsor, in its sole discretion, the right to disqualify Entrant from Contest. All Entrants and the votes each Entrant receives are subject to verification by Contest Administrator, and must meet all eligibility requirements before Entrant may be confirmed as a winner of any prize.</td>\n		</tr>\n		<tr>\n			<td style=\"vertical-align:bottom\">5. Judging to Determine the Winners:</td>\n			<td style=\"vertical-align:bottom\">The first, second and third place winners will be determined by Fundator-selected panel of judges (&quot;Judges&quot;) based on the following criteria: Creativity of idea ( 25%); Design (25%); Ability to manufacture (25%); Market potential (25%). All eligible Entries will be judged from 12:01 a.m. ET on May 20, 2016 through 11:59 p.m. ET on May 26,2016. In the event of a tie, Entries will be re-judged based on the same criteria listed above and a winner will be determined by Fundator in its sole discretion. Entrants agree to the Official Rules and to the decisions of the Judges, which shall be final and binding in all respects. Winner will be notified by email/mail on or about May 29, 2016.</td>\n		</tr>\n		<tr>\n			<td style=\"vertical-align:bottom\">6. Prizes and Approximate Retail Values (&quot;ARV&rsquo;s&quot;):</td>\n			<td style=\"vertical-align:bottom\">First Place prize - $500.00 USD, Second Place prize - $350.00 USD, Third Place prize - $150.00 USD, awarded in the form of a gift card. All federal, state, and local taxes are solely the responsibility of Winner. No transfer or substitution for any prizes will be permitted, except at the sole discretion of Sponsor due to prize unavailability for any reason, and, in such circumstance, an alternate prize/prize component of equal value will be awarded and Sponsor&rsquo;s obligation to Winner will be fulfilled, and no other additional compensation will be provided.</td>\n		</tr>\n		<tr>\n			<td style=\"vertical-align:bottom\">7. Winner Notification:</td>\n			<td style=\"vertical-align:bottom\">Each potential Winner will be notified by email after the judging has been completed. Winners will be required to execute and return an Affidavit of Eligibility within seven (7) days of notification in order to receive the prize. If prize or prize notification is returned as non-deliverable, or if the potential Winner fails to return the required verification documents within the required document return period, an alternate potential Winner will be determined, time permitting.</td>\n		</tr>\n		<tr>\n			<td style=\"vertical-align:bottom\">8. General Rules:</td>\n			<td style=\"vertical-align:bottom\">All federal, state, and local taxes are the sole responsibility of Winner. Acceptance of prize constitutes permission to use Winner&rsquo;s name, likeness and Entry Material for promotional and advertising purposes, in any and all media, without further compensation, except where prohibited by law. By participating in the Contest, Entrants agree to be bound by the Official Rules and the decisions of Fundator. All Entries will be declared made by the authorized account holder of thee-mail address submitted at the time of Entry. &quot;Authorized account holder&quot; is defined as the natural person who is assigned to an e-mail address by an Internet access provider, online service provider, or other organization (e.g., business, educational institution, etc.) that is responsible for assigning e-mail addresses for the domain associated with the submitted e-mail address. Fundator and its agencies are not responsible for technical, hardware, software or telephone malfunctions of any kind, lost or unavailable network connections, or failed, incorrect, incomplete, inaccurate, garbled or delayed electronic communications caused by the user or by any of the equipment or programming associated with or utilized in Contest or by any human error which may occur. Fundator reserves the right to cancel Contest if any aspect of Contest becomes technically corrupted, and select Winners based on votes received prior to cancellation. Fundator reserves the right at its sole discretion to disqualify any individual that tampers or attempts to tamper with the Entry process or the operation of the Contest or Contest Site; violates the Official Rules; or acts in an unsportsmanlike or disruptive manner, or with intent to annoy, abuse, threaten or harass any other person. Fundator and its agencies and respective affiliates, officers, directors, agents, and employees will have no liability or responsibility for any claim arising in connection with participation in Contest or the awarding of prize. Winner assumes all liability for any injury or damage caused, or claimed to be caused, by participation in Contest or use or redemption of prize. In the event there is a discrepancy or inconsistency between disclosures or other statements contained in any promotional materials and the terms and conditions of the Official Rules, the Official Rules shall prevail, govern and control. None of the material that you submit shall be subject to any obligation of confidentiality on the part of Fundator and its third-party service providers and agents or their respective directors, officers and employees.</td>\n		</tr>\n		<tr>\n			<td style=\"vertical-align:bottom\">9. Release and Grant of Rights:</td>\n			<td style=\"vertical-align:bottom\">By entering, each Entrant agrees to release and hold harmless Fundator and its respective subsidiaries, affiliates, suppliers, distributors, advertising/promotion agencies, and prize suppliers from and against any claim or cause of action, including, but not limited to, personal injury, death, or damage to or loss of property, arising out of participation in the Contest or receipt or use or misuse of any prize. Each Entrant, grants to Sponsor, its parent companies, affiliates, brands, subsidiaries, successors, licensees and agents and those they may designate from time to time (all of the foregoing, the &quot;Licensed Entities&quot;) a non- exclusive, worldwide, perpetual, irrevocable, fully paid-up, royalty-free, fully sub-licensable and transferable right and license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, transmit, display, and perform such Entry Material, in whole or in part, in any media, format or technology, whether now known or here after discovered, and in any manner including all promotional, advertising, marketing, publicity, and commercial uses and ancillary uses thereof, with out any further notice or payment to or permission needed from you (except where prohibited by law). Without limitation of the foregoing, submission of any Entry Material constitutes Entrant&rsquo;s agreement that Fundator is permitted (but are not obligated) to display Entry Material online for public viewing and/or comment (whether on Licensed Entities&rsquo; web pages or on third party web pages), to incorporate Entry Material in online and offline promotional advertising, marketing, and/or other commercial materials, and to reproduce, adapt and distribute Entry Material in all media whether now known or later developed.<br />\n			<br />\n			By submitting an Entry, Entrant hereby releases and discharges, on behalf of itself and its successors, assigns and representatives, Fundator and each of its respective officers, directors and employees from any and all claims, suits, actions, demands, liabilities and damages of any kind whatsoever arising out of or in connection with the use of such Entry, including, without limitation, any and all claims for copyright infringement, invasion of privacy, violation of the right of publicity and persona, and/or defamation. Without limitation of the foregoing, in no event will Entrant be entitled to, and waives any right to, enjoin, restrain or interfere with (i) use of such Entry Material as permitted here under or (ii) the exploitation of any of Sponsor&rsquo;s rights here under. Entrant understands that Sponsor is relying upon the foregoing representations and warranties, grants of rights and licenses, and releases in permitting it to submit Entry Material. Entrant acknowledges that it may not terminate or rescind the grants of rights and licenses and/or the releases contained herein. Contest and the Official Rules shall be exclusively governed by and construed in accordance with the laws of the state of Virginia, without regard to conflicts of law provisions. Entrants submit to exclusive personal jurisdiction in Virginia and agree that any dispute shall be brought in the state and federal courts in Virginia.</td>\n		</tr>\n		<tr>\n			<td style=\"vertical-align:bottom\">10. Winner:</td>\n			<td style=\"vertical-align:bottom\">For a list of winners, available after June 10,2015, visit http://www.fundator.co/contest_name/Winner</td>\n		</tr>\n		<tr>\n			<td style=\"vertical-align:bottom\">11. Privacy:</td>\n			<td style=\"vertical-align:bottom\">Information collected from Entrants is subject to Fundador&#39;s Privacy Policy located at: http://www.fundator.co/privacy-policy</td>\n		</tr>\n	</tbody>\n</table>\n','2016-06-01 00:00:00',180,12000.00,1),(2,0,'','Pets Collar design contest','<p>Spoiling cat cat and dog in bringing them a useful, tasteful and beautigful collar is the main theme of this contest.</p>\n\n<p>&nbsp;</p>\n','','2016-02-22 00:00:00',180,3000.00,0),(3,0,'mQIoaNyiKnGGbBuFAHKksPZptilRDUSL.jpg','Cat and Dog Connected Devices','<p>General description :</p>\n\n<p>The main idea is to develop full range of connected device that can be useful for pets for leisure ,</p>\n\n<p>for owner comfort or health pet control.</p>\n\n<p>Those devices should be able to be interactive with the targeted animal so to improve the usage of</p>\n\n<p>the device and should be also interactive with the owner that can take some information and control</p>\n\n<p>the device with their smartphone.</p>\n\n<p>Technologies :</p>\n\n<p>Interacting with the PET</p>\n\n<p>the system will lay on RF system embedded on a wearable device on the pet</p>\n\n<p>Each device will embed a RF module to detect the PET</p>\n\n<p>This RF module will be the &ldquo;key&rdquo; for the device</p>\n\n<p>1. To recognize the right pet</p>\n\n<p>2. To active required function depending on the situation.</p>\n\n<p>To permit several field of application, and keep also a good power consumption factor the electronic</p>\n\n<p>parts will integrate almost two different technologies :</p>\n\n<p>A/ integrate passive emitting RF device.</p>\n\n<p>This technological choice give also small weight and easy waterproof</p>\n\n<p>characteristics.</p>\n\n<p>Those technologies are known as RFID devices. The principle is working on the</p>\n\n<p>radio coupling between powered emitter (reader) and the passive receiver(Tag).</p>\n\n<p>As the distance between Reader and Tag is short enough to radio-transfer energy to</p>\n\n<p>the tag the one wake up and send back it&#39;s information to the reader.</p>\n\n<p>In those RFID devices we have to consider 3 great &ldquo;family&rdquo; of RFID characterized</p>\n\n<p>by their wave length, performance and price.</p>\n\n<p>Considering the need for distance and cost, the good compromise seem to be 125Khz</p>\n\n<p>EM class device which can give around 15 cm reading distance.</p>\n\n<p>In this technology the basic tag is cheap and is able to emit a single but unique ID</p>\n\n<p>code, this give the ability to detect the right pet using the right device.</p>\n\n<p>B/ Integrate active emitting RF device.</p>\n\n<p>This technological choice give longer distance detection but is power con summing</p>\n\n<p>on batteries.</p>\n\n<p>Due to this main consideration, the system should have a duty cycle to be powered</p>\n\n<p>off majority of time and wake-up to send a beacon&rdquo; in few ms then go back sleeping</p>\n\n<p>mode, this mode can be combined with activities sensor to increase/decrease the</p>\n\n<p>cycle so to let the beacon mode in long sleep period when the pet has no activity</p>\n\n<p>(sleeping).</p>\n\n<p>Interacting with the owner</p>\n\n<p>The device would be remotely connectable trough Bluetooth of WiFi such to program and/or</p>\n\n<p>control the device.</p>\n\n<p>To facilitate usage and customer&#39;s experience, the device will embed the relevant module and a</p>\n\n<p>mini web service to be accessible without installing any special apps on the smartphone</p>\n','<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, mollitia repellat animi! Maxime magnam dignissimos voluptas mollitia in, dolores illum perspiciatis, officia fuga iure, numquam error vel repellat facilis cumque.</p>\n\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, mollitia repellat animi! Maxime magnam dignissimos voluptas mollitia in, dolores illum perspiciatis, officia fuga iure, numquam error vel repellat facilis cumque.</p>\n\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, mollitia repellat animi! Maxime magnam dignissimos voluptas mollitia in, dolores illum perspiciatis, officia fuga iure, numquam error vel repellat facilis cumque.</p>\n\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, mollitia repellat animi! Maxime magnam dignissimos voluptas mollitia in, dolores illum perspiciatis, officia fuga iure, numquam error vel repellat facilis cumque.</p>\n\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, mollitia repellat animi! Maxime magnam dignissimos voluptas mollitia in, dolores illum perspiciatis, officia fuga iure, numquam error vel repellat facilis cumque.</p>\n','2016-03-04 00:00:00',180,198000.00,1),(5,0,'2pjbXwJ6a1l2Nj1BTRBlFD0SPAVOrseI.jpg','Wearables for pets','<p>Let&#39;s bring the best of technology to our favorite pets. This contest will choose the best pet devices using our collar.</p>\n\n<p>Specifiations:</p>\n\n<p>All ideas will be using</p>\n\n<p>1- food: devices creation about all devices that can be unlock, or&nbsp;</p>\n\n<p>2- toys</p>\n\n<p>3- hygiene</p>\n','','2016-05-24 00:00:00',30,0.00,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creators`
--

LOCK TABLES `creators` WRITE;
/*!40000 ALTER TABLE `creators` DISABLE KEYS */;
INSERT INTO `creators` VALUES (1,1),(2,2),(3,17),(4,29),(5,35),(6,57),(7,74),(8,76),(9,78),(10,92),(11,100),(12,102),(13,105);
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
  `thumbnail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `marked_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entries`
--

LOCK TABLES `entries` WRITE;
/*!40000 ALTER TABLE `entries` DISABLE KEYS */;
INSERT INTO `entries` VALUES (1,1,1,'','Entry #1 : Thistle Wisent','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,1,1,'','Entry #1 : Thistle Wisent','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,2,1,'','Entry #1 : Tulip Ithomiid','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(4,2,1,'','Entry #1 : Tulip Ithomiid','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(5,3,1,'','Entry #1 : Iris Oystercatcher','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(6,3,1,'','Entry #1 : Iris Oystercatcher','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(7,4,1,'','Entry #1 : Poppy Acipenser','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(8,4,1,'','Entry #1 : Poppy Acipenser','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(9,1,1,'','Udit\'s Entry','<p>This entry will improve a little bit my bottle</p><p>design and logo</p>','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(10,1,1,'uploads/static-qr-code-without-logojpg-32344.jpg','Udit\'s Entry','<p>This entry will improve a little bit my bottle</p><p>design and logo</p>','2016-04-26 09:48:37','2016-04-26 13:48:37','0000-00-00 00:00:00'),(11,1,1,'uploads/screen-shot-2016-06-10-at-30005-pmpng-21682.png','Kapil\'s Entry','<p>This entry will improve a little bit my bottle</p><p>design and logo</p><p><br/></p><h1>hfhfk</h1><h5><i>hfhkfhkfkfkh</i></h5>','2016-06-12 10:51:59','2016-06-12 14:51:59','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entry_files`
--

DROP TABLE IF EXISTS `entry_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entry_files` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) NOT NULL,
  `file_id` int(11) NOT NULL,
  `caption` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entry_files`
--

LOCK TABLES `entry_files` WRITE;
/*!40000 ALTER TABLE `entry_files` DISABLE KEYS */;
INSERT INTO `entry_files` VALUES (1,9,5,'the bag to put my pavillion'),(2,9,19,'my new pavillon'),(3,10,29,'Sample PDF File 1'),(4,10,30,'My QR Code'),(5,10,31,'Tall Image'),(6,10,0,'This is the sample documentation with a long title'),(7,11,58,''),(8,11,59,''),(9,11,60,'');
/*!40000 ALTER TABLE `entry_files` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entry_ratings`
--

LOCK TABLES `entry_ratings` WRITE;
/*!40000 ALTER TABLE `entry_ratings` DISABLE KEYS */;
INSERT INTO `entry_ratings` VALUES (1,1,3,6.50,5.30,5.10,6.00,'2016-02-22 08:52:12','2016-04-03 06:12:34'),(2,1,4,2.00,3.00,1.00,5.00,'2016-02-22 08:52:12','2016-03-31 06:12:00'),(3,1,5,9.00,3.00,9.00,8.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(4,2,3,7.00,10.00,9.00,5.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(5,2,4,3.00,2.00,1.00,3.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(6,2,5,5.00,8.00,10.00,3.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(7,3,3,2.00,4.00,2.00,4.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(8,3,4,1.00,3.00,4.00,10.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(9,3,5,7.00,3.00,7.00,10.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(10,4,3,5.00,2.00,5.00,4.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(11,4,4,4.00,4.00,1.00,1.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(12,4,5,3.00,10.00,6.00,6.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(13,5,3,2.00,6.00,8.00,6.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(14,5,4,4.00,8.00,8.00,5.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(15,5,5,2.00,10.00,8.00,2.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(16,6,3,2.00,2.00,1.00,8.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(17,6,4,4.00,8.00,7.00,9.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(18,6,5,9.00,2.00,2.00,3.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(19,7,3,6.00,3.00,3.00,8.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(20,7,4,2.00,9.00,4.00,3.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(21,7,5,4.00,2.00,9.00,8.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(22,8,3,10.00,6.00,2.00,1.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(23,8,4,6.00,9.00,3.00,7.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(24,8,5,10.00,4.00,5.00,4.00,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(25,5,2,5.00,5.20,7.80,7.30,'2016-02-27 17:14:15','2016-06-09 08:10:46'),(26,2,1,10.00,7.60,10.00,10.00,'2016-02-28 04:38:39','2016-04-30 21:08:42'),(27,4,2,7.00,6.00,8.00,9.00,'2016-02-28 07:26:22','2016-02-28 07:26:22'),(28,3,2,2.00,4.00,6.00,9.00,'2016-02-28 07:26:42','2016-02-28 07:26:42'),(29,2,28,8.00,8.00,5.00,6.00,'2016-02-28 20:14:22','2016-02-28 20:14:22'),(30,2,2,5.00,5.00,4.00,4.00,'2016-03-01 19:40:06','2016-03-06 18:20:42'),(31,1,2,6.60,6.40,8.60,8.10,'2016-03-02 03:57:30','2016-05-10 15:54:49'),(32,6,2,5.00,6.20,4.30,7.90,'2016-03-03 11:39:32','2016-06-10 08:16:48'),(33,6,1,3.00,5.60,10.00,10.00,'2016-03-12 05:29:38','2016-04-30 16:02:08'),(34,5,1,5.00,4.20,10.00,7.70,'2016-03-15 09:38:32','2016-04-24 13:54:54'),(35,5,1,0.00,0.00,0.00,4.00,'2016-03-15 09:44:16','2016-03-25 17:25:09'),(36,5,2,2.00,6.00,10.00,10.00,'2016-03-15 09:44:41','2016-03-15 09:44:41'),(37,5,35,0.00,0.00,0.00,4.00,'2016-03-16 10:12:52','2016-03-16 10:12:52'),(38,1,35,14.00,0.00,48.00,0.00,'2016-03-18 11:13:25','2016-03-18 11:13:25'),(39,2,35,0.00,0.00,0.00,0.00,'2016-03-19 14:35:42','2016-03-19 14:35:42'),(40,1,1,4.00,8.80,5.90,4.50,'2016-03-24 06:15:03','2016-04-30 16:37:21'),(41,0,0,8.70,1.50,8.60,0.90,'2016-04-02 21:15:34','2016-04-02 21:15:34'),(42,0,0,4.50,8.90,2.40,6.50,'2016-04-02 21:31:04','2016-04-02 21:31:04'),(43,0,0,8.80,3.00,0.00,0.00,'2016-04-03 05:05:32','2016-04-03 05:05:32'),(44,0,0,0.00,3.20,0.00,0.00,'2016-04-03 05:11:35','2016-04-03 05:11:35'),(45,0,0,0.00,0.00,5.90,0.00,'2016-04-03 05:12:08','2016-04-03 05:12:08'),(46,9,0,5.10,0.00,0.00,0.00,'2016-04-03 06:09:53','2016-04-03 06:09:53'),(47,9,0,3.80,0.00,0.00,0.00,'2016-04-03 06:10:23','2016-04-03 06:10:23'),(48,9,1,7.20,5.30,5.10,6.70,'2016-04-03 06:12:06','2016-05-27 23:32:31'),(49,9,2,6.30,6.80,4.80,5.80,'2016-04-03 13:09:51','2016-05-25 10:42:22'),(50,9,2,4.00,5.00,3.00,2.00,'2016-04-03 13:51:55','2016-04-03 13:51:55'),(51,10,1,5.50,0.00,4.40,4.90,'2016-04-27 19:18:09','2016-04-27 19:18:09'),(52,10,35,5.10,7.90,9.10,4.90,'2016-04-28 08:20:12','2016-04-28 12:44:54'),(53,5,39,0.00,7.30,2.70,0.00,'2016-05-03 19:58:55','2016-05-03 19:58:55'),(54,10,2,9.00,8.00,9.00,10.00,'2016-05-09 17:42:34','2016-05-09 17:42:34'),(55,10,60,4.20,8.80,2.80,10.00,'2016-05-23 11:21:41','2016-05-23 11:21:55'),(56,2,60,4.30,6.60,7.50,4.10,'2016-05-23 11:22:34','2016-05-23 11:34:26'),(57,10,100,7.10,6.00,0.00,0.00,'2016-05-29 23:27:46','2016-05-29 23:27:53');
/*!40000 ALTER TABLE `entry_ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expert_expertise`
--

DROP TABLE IF EXISTS `expert_expertise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expert_expertise` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `expert_id` int(11) NOT NULL,
  `expertise_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expert_expertise`
--

LOCK TABLES `expert_expertise` WRITE;
/*!40000 ALTER TABLE `expert_expertise` DISABLE KEYS */;
INSERT INTO `expert_expertise` VALUES (1,3,2),(2,3,4),(3,4,8),(4,5,9),(5,6,10),(6,6,11),(7,7,12),(8,7,13),(9,7,14),(10,8,15),(11,8,16),(12,8,17),(13,9,18),(14,9,19),(15,9,20),(16,10,21),(17,10,22),(18,10,23),(19,11,24);
/*!40000 ALTER TABLE `expert_expertise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expert_skills`
--

DROP TABLE IF EXISTS `expert_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expert_skills` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `expert_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expert_skills`
--

LOCK TABLES `expert_skills` WRITE;
/*!40000 ALTER TABLE `expert_skills` DISABLE KEYS */;
/*!40000 ALTER TABLE `expert_skills` ENABLE KEYS */;
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
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expertise`
--

LOCK TABLES `expertise` WRITE;
/*!40000 ALTER TABLE `expertise` DISABLE KEYS */;
INSERT INTO `expertise` VALUES (1,3,'Intellectual property','',1),(2,6,'Write a contract for my investors','',1),(3,6,'Write a contract for my partners','',1),(4,6,'Write an NDA for my freelancers','',1),(5,7,'Banner & Flyers','',1),(6,7,'Billboards','',0),(7,8,'Frontpage Marketing','',0),(8,11,'machining','',0),(9,12,'machining','',0),(10,13,'machining','',0),(12,15,'machining','',0),(13,16,'huge turnover','',0),(14,17,'design of excel graphs','',0),(15,18,'Electronics','',0),(16,19,'3D design','',0),(17,20,'IOT','',0),(18,21,'Electronics','',0),(19,22,'3D design','',0),(20,23,'IOT','',0),(22,25,'3D design','',0),(24,27,'Protect legally a concept or a design in Europe or part of Europe','',1),(25,8,'Prepare a short 2 min movie to present powerball use to end user','',0);
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
  `background_color` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `icon` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expertise_categories`
--

LOCK TABLES `expertise_categories` WRITE;
/*!40000 ALTER TABLE `expertise_categories` DISABLE KEYS */;
INSERT INTO `expertise_categories` VALUES (3,NULL,'LEGAL & LAWS','All things related to contract, legal protection, ...','#cfcbcb','fs9d2SNte2FWDh03CvDn.png',1),(4,NULL,'PRODUCT IDENTITY & COMMUNICATION','all things related to Product & Communication activities',NULL,NULL,1),(7,4,'Create texts and contents to support communication','Write texts and descriptions to define well product for users and support communication','#56ebee','',1),(8,4,'Create video communication support','All tasks and expertise related to video contents and video communication for the product','#56ebee','',1),(9,NULL,'MANUFACTURING','All skills necessary to the direct manufacturing of the products (prototype and fabrication)',NULL,NULL,1),(10,NULL,'SALES DEV. & MARKET KNOWLEDGE','All skills related sales development and sales management',NULL,NULL,1),(16,30,'Define user\'s functions of product','Describe and Write product user function to support future sales strategy and communication','#3fe473','',1),(27,3,'Write a contract','All tasks related to specific contracts and legal documents writing and review','#cfcbcb','',1),(28,NULL,'APP & WEBSITE CREATION','','#4b068a','',1),(29,NULL,'CROWDFUNDING','',NULL,NULL,1),(30,NULL,'CONCEPTION AND PRODUCT DESIGN','','#3fe473','',1),(31,3,'Manage copyright & IP laws','All about brand, product name and logo intellectual property rights and protection','#cfcbcb','',1),(32,4,'Create communication campaign','Create and manage communication and advertisement campaign to present product to his target users. Define communication channels, medias and social networks','#56ebee','',1),(33,4,'Other communication support expertise','All other communication support creation and related tasks','#56ebee','',1),(34,10,'Prepare a market review','Analyse market situation and product sales potential, Define product target users and target market',NULL,NULL,1),(35,10,'Develop sales and sales channels','All tasks and expertise to develop sales turnover with the product',NULL,NULL,1),(36,10,'Prepare sales administration documents','All tasks related to prepare product sales admin, i.e invoicing and sales documents preparation',NULL,NULL,1),(37,28,'Create and set up a website','All tasks related to creation and setup of a website to promote  and sell product','#4b068a','',1),(38,28,'Create and setup an App','All tasks and expertise related to APP creation and set up to support product sales','#4b068a','',1),(39,28,'Other computing activities','All other special expertise related to IT, computer, data management and programming','#4b068a','',1),(40,29,'Organise a crowdfunding campaign','All tasks and expertise needed to prepare a crowdfunding campaign on major platforms',NULL,NULL,1),(41,29,'Perform other crowdfunding related tasks','all other tasks and expertise useful to prepare and support crowdfunding',NULL,NULL,1),(42,30,'Prepare industrial design & product conception','Product and product components design, including packaging design','#3fe473','',1),(43,30,'Prepare detailed functional designs (parts, subassemblies)','Product functional optimisation and technical designs like PCB, tooling and others technical components','#3fe473','',1),(44,30,'Prepare technical drawing','Perform and provide technical drawings to support fabrication: mechanical, electrical, logical...etc',NULL,NULL,1),(45,9,'Manufacture mechanical parts and subassemblies','Manufacturing processes definition and production of all mechanical parts of the product',NULL,NULL,1),(47,NULL,'PURCHASE & LOGISTICS','All expertise related to purchase, material management and logistics',NULL,NULL,1),(48,47,'Identify and select suppliers','All tasks related to supplier and vendor identification, evaluation and selection in order to supply all parts and components needed to manufacture the product','#f9f548','',1),(49,47,'Organise delivery to customer','All tasks related to transportation, delivery, warehousing and inventory management','#f9f548','',1),(50,3,'Manage other legal issues','Any legal related expertise not linked to IP or Contract','#cfcbcb','',1),(51,10,'Perform other sales and marketing tasks','Any other tasks and expertise not related to market study or sales channels development',NULL,NULL,1),(52,9,'Manufacture electrical & electronical subassemblies','Manufacturing of all electrical or electronical subassemblies',NULL,NULL,1),(53,9,'Check quality of parts and subassemblies ','All expertise and tasks related to parts and product quality control',NULL,NULL,1),(54,30,'Prepare quality control documents','Definition of quality control points, quality criteria level and control methods ','#3fe473','',1),(55,47,'Perform other tasks related to purchase or logistics','All tasks related to material management, not including supplier selection or delivery related tasks ','#f9f548','',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expertise_skills`
--

LOCK TABLES `expertise_skills` WRITE;
/*!40000 ALTER TABLE `expertise_skills` DISABLE KEYS */;
INSERT INTO `expertise_skills` VALUES (1,2,1),(2,2,3),(3,2,2),(4,3,1),(5,3,2),(6,4,1),(7,5,1),(8,5,3),(9,24,22),(10,24,23);
/*!40000 ALTER TABLE `expertise_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experts`
--

DROP TABLE IF EXISTS `experts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `experts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `super_expert` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experts`
--

LOCK TABLES `experts` WRITE;
/*!40000 ALTER TABLE `experts` DISABLE KEYS */;
INSERT INTO `experts` VALUES (1,2,1),(2,1,0),(3,0,0),(4,0,0),(5,0,0),(6,0,0),(7,0,0),(8,0,0),(9,0,0),(10,0,0),(11,0,0);
/*!40000 ALTER TABLE `experts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facebook_profiles`
--

DROP TABLE IF EXISTS `facebook_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facebook_profiles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `facebook_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `facebook_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `thumbnail_url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `profile_url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `website` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `birthday` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `currency` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `gender` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `summary` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `bio` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facebook_profiles`
--

LOCK TABLES `facebook_profiles` WRITE;
/*!40000 ALTER TABLE `facebook_profiles` DISABLE KEYS */;
INSERT INTO `facebook_profiles` VALUES (2,2,'10153687758201704','EAAMzB7TtsVABAHq3PX15ZCRuQILTYsvyNKU06R7jfYDGYYvZCExpsz80yzWhUYQkTAIqJ6oORLTpiLhqnqU6uvHyGFznBPzHUTqoQZCyiPatlUep8YjyM4ZB09LkgcLO7VrV74ZCYbdlFtl2ZBIHd4xmGC9ONd3WYZD','https://scontent.xx.fbcdn.net/hprofile-xpa1/v/t1.0-1/s200x200/12418111_10153586736201704_5932314499271215481_n.jpg?oh=b0e0c270fa74fe318505f94881f14b0c&oe=57B13133','benjamin@komprom.com','Benjamin','Vignon','','','','CNY','male','','','2016-04-26 12:36:34','2016-05-11 10:00:09'),(3,78,'1179927652060229','EAAMzB7TtsVABALyAjC7HpKbee6DzMVFo9YWuZCPFeG2ZCkLOkzmamGPzVbe2jaMl1qKTyz3mdtK3c750hMKGyuio2S53zkjuABFCHma2HZBcv1JAY3GZCZAGQHZAW0c5kbz6k64hkYXEFJ0Qo3fx95nXXNZCCicnbgZD','https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/10477050_784926514893680_8012398393418793232_n.jpg?oh=3503b954db9dcc57e7bc893694043d1a&oe=57DC59EF','ponetaikin@gmail.com','Vasil','Ponetaikin','','','','USD','male','','','2016-05-23 00:32:57','2016-05-23 00:32:57'),(4,92,'1088771167857097','EAAMzB7TtsVABAPgPn5bUmq0y7tHCoV2BJHx3K96LxX69n5wTcDglHx7PkqGiAhBNonA4WReNQU1TIXUiQVmpiZBlvjQGydGugYpky8NtLA4AY12ZBGizXNg2Awez37z001daTLhsWxpNdICpNgDFgTcoOQXAYZD','https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/13118931_1072930222774525_8774477996826096532_n.jpg?oh=f7d4fa68198876504c0e303a45e59238&oe=57C8E1F9','tiwariankur77@gmail.com','Ankur','Tiwari','','','','INR','male','','','2016-05-30 16:43:24','2016-05-30 16:43:24'),(5,74,'1035889583150097','EAAMzB7TtsVABAAb70alqYSVPq5EIj2cLca6O5YgtZCzAhuN5gcHa7KsmItQkBmdrinF43CK0cdFWZBZA4ScVeInMzR9k6PCFx39iQR9PRJiKktkkf2FsJXWZAwBRld46FXIhTrGp29TYFvPHcZB7b38LxEYQzhuQZD','https://scontent.xx.fbcdn.net/v/t1.0-1/s200x200/13087300_1077684968970558_8150719390571502977_n.jpg?oh=03d023b761cd5961f432c2048e0ef6ad&oe=57C4EAA3','kkarda77@gmail.com','Kapil','Karda','','','','INR','male','','','2016-06-01 13:48:33','2016-06-03 08:30:42'),(6,101,'10208401479502638','EAAMzB7TtsVABAAuLhpcDDCFCaAT4XcSYRZC8uXlKMWvZBkrAZAXl0tCZAYh6ZAMdfsbSZCLNHYi6xndZCWltl01c23aWNGcZA3JIsfl9afNOYidxnZCUXZApGI8BipeGzwRANjpTG2OWzdqDNcz6ZClbeeqadZBinuciQsEZD','https://scontent.xx.fbcdn.net/v/t1.0-1/s200x200/162755_1768208053070_4355917_n.jpg?oh=304f8a96ecd42ee99fcde2797e21430a&oe=57DC86F1','udit.cp@gmail.com','Udit','Virwani','','','','CNY','male','','','2016-06-05 13:02:59','2016-06-11 11:52:57');
/*!40000 ALTER TABLE `facebook_profiles` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (1,'thumbnail_2.png','thumbnail-2png-68511.png','png',0,'uploads/thumbnail-2png-68511.png','2016-03-05 16:02:25','2016-03-05 16:02:25'),(2,'Screen Shot 2016-03-03 at 1.15.03 PM.png','screen-shot-2016-03-03-at-11503-pmpng-92598.png','png',0,'uploads/screen-shot-2016-03-03-at-11503-pmpng-92598.png','2016-03-06 12:21:33','2016-03-06 12:21:33'),(3,'Screen Shot 2016-03-04 at 1.54.34 PM.png','screen-shot-2016-03-04-at-15434-pmpng-52251.png','png',0,'uploads/screen-shot-2016-03-04-at-15434-pmpng-52251.png','2016-03-06 12:21:36','2016-03-06 12:21:36'),(4,'thumbnail_2.png','thumbnail-2png-39680.png','png',0,'uploads/thumbnail-2png-39680.png','2016-03-06 17:12:51','2016-03-06 17:12:51'),(5,'KPPMT02-A.jpg','kppmt02-ajpg-85035.jpg','jpg',0,'uploads/kppmt02-ajpg-85035.jpg','2016-04-01 09:19:48','2016-04-01 09:19:48'),(6,'thumbnail_1.png','thumbnail-1png-49605.png','png',0,'uploads/thumbnail-1png-49605.png','2016-04-03 04:47:48','2016-04-03 04:47:48'),(7,'thumbnail_1.png','thumbnail-1png-73349.png','png',0,'uploads/thumbnail-1png-73349.png','2016-04-03 06:26:49','2016-04-03 06:26:49'),(8,'thumbnail_1.png','thumbnail-1png-12512.png','png',0,'uploads/thumbnail-1png-12512.png','2016-04-03 06:34:29','2016-04-03 06:34:29'),(9,'thumbnail_1.png','thumbnail-1png-75875.png','png',0,'uploads/thumbnail-1png-75875.png','2016-04-03 06:35:30','2016-04-03 06:35:30'),(10,'thumbnail_2.png','thumbnail-2png-25225.png','png',0,'uploads/thumbnail-2png-25225.png','2016-04-03 11:54:13','2016-04-03 11:54:13'),(11,'KPAPA155-A.jpg','kpapa155-ajpg-95602.jpg','jpg',0,'uploads/kpapa155-ajpg-95602.jpg','2016-04-05 03:09:23','2016-04-05 03:09:23'),(12,'KPAPA155-A.jpg','kpapa155-ajpg-64239.jpg','jpg',0,'uploads/kpapa155-ajpg-64239.jpg','2016-04-05 03:11:05','2016-04-05 03:11:05'),(13,'IMG_2692.JPG','img-2692jpg-42744.JPG','JPG',0,'uploads/img-2692jpg-42744.JPG','2016-04-05 06:26:31','2016-04-05 06:26:31'),(14,'IMG_2692.JPG','img-2692jpg-54502.JPG','JPG',0,'uploads/img-2692jpg-54502.JPG','2016-04-05 06:48:59','2016-04-05 06:48:59'),(15,'IMG_2692.JPG','img-2692jpg-77429.JPG','JPG',0,'uploads/img-2692jpg-77429.JPG','2016-04-05 06:56:54','2016-04-05 06:56:54'),(16,'thumbnail_2.png','thumbnail-2png-36908.png','png',0,'uploads/thumbnail-2png-36908.png','2016-04-05 08:06:49','2016-04-05 08:06:49'),(17,'thumbnail_2.png','thumbnail-2png-91473.png','png',0,'uploads/thumbnail-2png-91473.png','2016-04-09 08:28:44','2016-04-09 08:28:44'),(18,'thumbnail_57.png','thumbnail-57png-81757.png','png',0,'uploads/thumbnail-57png-81757.png','2016-04-11 13:25:34','2016-04-11 13:25:34'),(19,'souris sans fil mini 2.jpg','souris-sans-fil-mini-2jpg-62642.jpg','jpg',0,'uploads/souris-sans-fil-mini-2jpg-62642.jpg','2016-04-14 05:37:55','2016-04-14 05:37:55'),(20,'14.pic.jpg','14picjpg-33928.jpg','jpg',0,'uploads/14picjpg-33928.jpg','2016-04-15 14:44:09','2016-04-15 14:44:09'),(21,'KPMAR39-S1-B.png','kpmar39-s1-bpng-57949.png','png',0,'uploads/kpmar39-s1-bpng-57949.png','2016-04-16 11:03:35','2016-04-16 11:03:35'),(22,'KPMAR39-S1-B.png','kpmar39-s1-bpng-66795.png','png',0,'uploads/kpmar39-s1-bpng-66795.png','2016-04-16 15:09:23','2016-04-16 15:09:23'),(23,'IMG_2899.JPG','img-2899jpg-31243.JPG','JPG',0,'uploads/img-2899jpg-31243.JPG','2016-04-19 04:22:59','2016-04-19 04:22:59'),(24,'thumbnail_2.png','thumbnail-2png-31243.png','png',0,'uploads/thumbnail-2png-31243.png','2016-04-22 13:10:56','2016-04-22 13:10:56'),(25,'thumbnail_2.png','thumbnail-2png-97126.png','png',0,'uploads/thumbnail-2png-97126.png','2016-04-23 10:34:34','2016-04-23 10:34:34'),(26,'14.pic.jpg','14picjpg-12875.jpg','jpg',0,'uploads/14picjpg-12875.jpg','2016-04-24 11:36:29','2016-04-24 11:36:29'),(27,'thumbnail_2.png','thumbnail-2png-43188.png','png',0,'uploads/thumbnail-2png-43188.png','2016-04-25 13:15:08','2016-04-25 13:15:08'),(28,'thumbnail_2.png','thumbnail-2png-95430.png','png',0,'uploads/thumbnail-2png-95430.png','2016-04-25 13:15:27','2016-04-25 13:15:27'),(29,'pdf-sample.pdf','pdf-samplepdf-56077.pdf','pdf',0,'uploads/pdf-samplepdf-56077.pdf','2016-04-26 13:47:33','2016-04-26 13:47:33'),(30,'static_qr_code_without_logo.jpg','static-qr-code-without-logojpg-32344.jpg','jpg',0,'uploads/static-qr-code-without-logojpg-32344.jpg','2016-04-26 13:48:21','2016-04-26 13:48:21'),(31,'wechat_1461658381.png','wechat-1461658381png-57900.png','png',0,'uploads/wechat-1461658381png-57900.png','2016-04-26 13:48:32','2016-04-26 13:48:32'),(32,'thumbnail_60.png','thumbnail-60png-52994.png','png',0,'uploads/thumbnail-60png-52994.png','2016-05-05 06:13:18','2016-05-05 06:13:18'),(33,'thumbnail_35.png','thumbnail-35png-16595.png','png',0,'uploads/thumbnail-35png-16595.png','2016-05-05 09:33:24','2016-05-05 09:33:24'),(34,'Screen Shot 2016-05-06 at 5.44.25 PM.png','screen-shot-2016-05-06-at-54425-pmpng-53159.png','png',0,'uploads/screen-shot-2016-05-06-at-54425-pmpng-53159.png','2016-05-09 07:50:31','2016-05-09 07:50:31'),(35,'Screen Shot 2016-05-06 at 4.45.05 PM.png','screen-shot-2016-05-06-at-44505-pmpng-43423.png','png',0,'uploads/screen-shot-2016-05-06-at-44505-pmpng-43423.png','2016-05-09 07:50:38','2016-05-09 07:50:38'),(36,'27fdZyFKkvVfIfjuyyWcFRpKVDxBoyU5.jpg','27fdzyfkkvvfifjuyywcfrpkvdxboyu5jpg-44221.jpg','jpg',0,'uploads/27fdzyfkkvvfifjuyywcfrpkvdxboyu5jpg-44221.jpg','2016-05-10 11:30:51','2016-05-10 11:30:51'),(37,'IMG_4315.JPG','img-4315jpg-70633.JPG','JPG',0,'uploads/img-4315jpg-70633.JPG','2016-05-12 15:17:52','2016-05-12 15:17:52'),(38,'Screen Shot 2016-05-14 at 12.46.31 PM.png','screen-shot-2016-05-14-at-124631-pmpng-95649.png','png',0,'uploads/screen-shot-2016-05-14-at-124631-pmpng-95649.png','2016-05-15 10:41:29','2016-05-15 10:41:29'),(39,'tedxceibxs-weixin.jpg','tedxceibxs-weixinjpg-95618.jpg','jpg',0,'uploads/tedxceibxs-weixinjpg-95618.jpg','2016-05-15 12:12:22','2016-05-15 12:12:22'),(40,'thumbnail_76.png','thumbnail-76png-64891.png','png',0,'uploads/thumbnail-76png-64891.png','2016-05-20 06:45:26','2016-05-20 06:45:26'),(41,'thumbnail_76.png','thumbnail-76png-64678.png','png',0,'uploads/thumbnail-76png-64678.png','2016-05-20 06:45:34','2016-05-20 06:45:34'),(42,'thumbnail_60.png','thumbnail-60png-43673.png','png',0,'uploads/thumbnail-60png-43673.png','2016-05-20 07:11:33','2016-05-20 07:11:33'),(43,'thumbnail_76.png','thumbnail-76png-41905.png','png',0,'uploads/thumbnail-76png-41905.png','2016-05-21 10:37:47','2016-05-21 10:37:47'),(44,'thumbnail_78.png','thumbnail-78png-47910.png','png',0,'uploads/thumbnail-78png-47910.png','2016-05-23 00:40:03','2016-05-23 00:40:03'),(45,'Screen Shot 2016-05-26 at 7.35.18 PM.png','screen-shot-2016-05-26-at-73518-pmpng-94850.png','png',0,'uploads/screen-shot-2016-05-26-at-73518-pmpng-94850.png','2016-05-27 07:46:35','2016-05-27 07:46:35'),(46,'thumbnail_100.png','thumbnail-100png-65695.png','png',0,'uploads/thumbnail-100png-65695.png','2016-05-29 23:30:21','2016-05-29 23:30:21'),(47,'thumbnail_77.png','thumbnail-77png-99515.png','png',0,'uploads/thumbnail-77png-99515.png','2016-06-01 10:04:52','2016-06-01 10:04:52'),(48,'thumbnail_105.png','thumbnail-105png-81282.png','png',0,'uploads/thumbnail-105png-81282.png','2016-06-08 07:52:45','2016-06-08 07:52:45'),(49,'afnew.png','afnewpng-68829.png','png',0,'uploads/afnewpng-68829.png','2016-06-08 08:47:27','2016-06-08 08:47:27'),(50,'afnew.png','afnewpng-42590.png','png',0,'uploads/afnewpng-42590.png','2016-06-08 08:50:38','2016-06-08 08:50:38'),(51,'afnew.png','afnewpng-60652.png','png',0,'uploads/afnewpng-60652.png','2016-06-08 08:59:33','2016-06-08 08:59:33'),(52,'thumbnail_106.png','thumbnail-106png-42164.png','png',0,'uploads/thumbnail-106png-42164.png','2016-06-08 11:20:41','2016-06-08 11:20:41'),(53,'thumbnail_106.png','thumbnail-106png-24940.png','png',0,'uploads/thumbnail-106png-24940.png','2016-06-08 11:20:43','2016-06-08 11:20:43'),(54,'thumbnail_106.png','thumbnail-106png-44500.png','png',0,'uploads/thumbnail-106png-44500.png','2016-06-08 11:20:45','2016-06-08 11:20:45'),(55,'thumbnail_106.png','thumbnail-106png-41332.png','png',0,'uploads/thumbnail-106png-41332.png','2016-06-08 11:20:46','2016-06-08 11:20:46'),(56,'thumbnail_106.png','thumbnail-106png-52468.png','png',0,'uploads/thumbnail-106png-52468.png','2016-06-08 11:20:48','2016-06-08 11:20:48'),(57,'thumbnail_106.png','thumbnail-106png-50431.png','png',0,'uploads/thumbnail-106png-50431.png','2016-06-08 11:20:50','2016-06-08 11:20:50'),(58,'Screen Shot 2016-06-10 at 3.00.05 PM.png','screen-shot-2016-06-10-at-30005-pmpng-21682.png','png',0,'uploads/screen-shot-2016-06-10-at-30005-pmpng-21682.png','2016-06-12 14:45:54','2016-06-12 14:45:54'),(59,'facepalm.png','facepalmpng-62855.png','png',0,'uploads/facepalmpng-62855.png','2016-06-12 14:45:59','2016-06-12 14:45:59'),(60,'SRS-Template-1.pdf','srs-template-1pdf-67838.pdf','pdf',0,'uploads/srs-template-1pdf-67838.pdf','2016-06-12 14:46:14','2016-06-12 14:46:14');
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
  `active` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investors`
--

LOCK TABLES `investors` WRITE;
/*!40000 ALTER TABLE `investors` DISABLE KEYS */;
INSERT INTO `investors` VALUES (1,3,'','','',0),(2,4,'','','',0),(3,5,'','','',0),(4,6,'','','',0),(5,7,'','','',0),(6,1,'10000','','',0),(7,18,'$5000','','dsdas',0),(8,61,'$100','good-return','gdfhdgfjhgkj',0),(9,74,'10000','great-teams','Waiting for creativity..',0),(10,100,'$5000','new-business','Why should I explain my self',0),(11,104,'$500','good-return','test',0);
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
-- Table structure for table `jury_applications`
--

DROP TABLE IF EXISTS `jury_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jury_applications` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `contest_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jury_applications`
--

LOCK TABLES `jury_applications` WRITE;
/*!40000 ALTER TABLE `jury_applications` DISABLE KEYS */;
INSERT INTO `jury_applications` VALUES (6,1,1,1,'2016-03-26 11:46:49','2016-06-12 15:15:08'),(9,3,1,1,'2016-05-26 14:41:16','2016-05-26 14:41:16'),(10,5,5,1,'2016-05-26 14:41:30','2016-05-26 14:41:30'),(14,100,1,0,'2016-05-29 07:58:28','2016-05-29 07:58:29'),(16,77,5,1,'2016-06-01 10:01:23','2016-06-08 07:37:07'),(17,77,3,1,'2016-06-01 10:02:22','2016-06-08 07:35:58');
/*!40000 ALTER TABLE `jury_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linkedin_profiles`
--

DROP TABLE IF EXISTS `linkedin_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `linkedin_profiles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `linkedin_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `linkedin_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `thumbnail_url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `position` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `industry` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `summary` text COLLATE utf8_unicode_ci NOT NULL,
  `specialties` longtext COLLATE utf8_unicode_ci NOT NULL,
  `profile_url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linkedin_profiles`
--

LOCK TABLES `linkedin_profiles` WRITE;
/*!40000 ALTER TABLE `linkedin_profiles` DISABLE KEYS */;
INSERT INTO `linkedin_profiles` VALUES (7,61,'x3vDMiGbhK','AQWLwjDj08Vtl9Mbc66YPMf_5XvzF98nOKPvJKrptL9jWQN34AkIaLEfdHj_eVIjCCCzp3s-pcGpmVSG_FkG6BoHXVAgxg7sFYWaFvyYa8YHHxWNPnSko8jNy-BeQSxsGu_uZTQssrb6L8xREc5NgX4O6wWUzfVKhnA83PF05YtqannvKD8','https://media.licdn.com/mpr/mprx/0_-jYcUcJw_9O3SRliRuHJpKhwklZ3eH_7YukcjizwkrK8eZiOZu6cxFUwFlZ8eJA1AJon984ID9xhIudOgmUIPiJFe9xTIub14mUqZG2o_cED3sy7N0Ds4nGRH_5lCurGlD0R0rxuHU4','chiragveerwani@gmail.com','chirag','veerwani','Lead Designer at Bhartiya Community Shanghai','Airlines/Aviation','cn','Shanghai Suburb, China','As a student I am finishing my A level exams and also learning Chinese Language in Shanghai, I have also worked as the Lead Designer for Bhartiya Community, I am also a 3D modelling enthusiast, and I have designed many 3D models such as Aircrafts and Cars, but I am looking for something more challenging in the future.','','https://www.linkedin.com/in/chirag-veerwani-287304108','2016-04-28 04:53:20','2016-04-28 04:53:20'),(14,2,'29srD-EHB3','AQVYAs1cAVF7hOOfr3rL3PfqOG-RtRUvDz34IcZX9zvBbkk4msuh8yugtt8GZNfHSs8Ix68YkhJMUzBJWWKCHCZjVb3thLblmDNQR2M_BrVafwpB-1W3jFlTKEFwt17TbwrQCAbGL6jB3kWnrRjtr1-Kp17S9wQeiU-SQrfZppugiYTN4vU','https://media.licdn.com/mpr/mprx/0_gPLYkPTuyI9mOKVc1qB3krciYul7pzUc0AA3krFxTW5YiluBAvztoKPlKGAlx-sRyKF8wBMLXiAD','benjamin@komprom.com','Benjamin','Vignon','Founder @ fundator','Outsourcing/Offshoring','cn','Shanghai City, China','','','','2016-05-13 10:01:56','2016-06-12 13:42:51'),(15,75,'Vla5gOcvRs','AQXi4rLDf5pn56LDywSImcYDqhxG28g6J8zrr-wztBnjZx4bU1AKza63CYkHE_dZe0SY4OPjBK3C9A1sYnoLWwBTxem07Sadt3nTtq0ecKO5_JvaGo2gn6Pr5lhyC9vkmxCB5bRdc1NuYVNpeUmHGsvZA0mgY-5I1vTuCpW7_8Ea5fIy2IQ','https://media.licdn.com/mpr/mprx/0_ZSvRnX7eaCY_WgEYsDLXnbVduTDmWORYsdTknbWvPkJxns2Oqw5c4FjUCfSKoJVtMmBLMhRdWVUM','franck@prodiges.com','Franck','Urwicz','Dirigeant','International Trade and Development','fr','Paris Area, France','','','https://www.linkedin.com/in/franck-urwicz-73994571','2016-05-18 17:05:15','2016-05-18 17:05:15'),(16,101,'o-Qk8q3XT9','AQV92yID1LthlHUTDkf_ONGyoGLPA88jM-6jZqmJdXs-tcmonI3085DfX-X2Gc853roeqB0Pva258yiJLqbTV8iYBEHLnBsMuUsLslb9w_Y3u_WZEK68sXoZ3kAvKi9yzwof-N87dv5Tv9xHoNuHICg9gvDrhTr1QJafC0KgJKzYhxYw324',NULL,'udit.cp@gmail.com','Udit','Virwani','Lead Developer at Digital Creative Asia','Information Technology and Services','cn','Shanghai City, China','','','https://www.linkedin.com/in/udit-virwani-0519146b','2016-05-31 05:28:24','2016-06-12 13:30:45'),(18,77,'Hjs_jOrQp1','AQUyNMSl5Ludbn-eU_g3ZgknDuqgbfGXskCkcvkjxQNXSxRIIcJURraS-FlPOZYKVqxFg2R92rvOF1ETD0l91gGKN3tPE7ETrR11d8f2AeMX2JWcEV3yWBKMXPCApbapfmI9td5SwMHi7FrVbUZR-vU2j3374DVRmMM2QD_VQUJN_T5Nvu0','https://media.licdn.com/mpr/mprx/0_mLnj-0Ui1PbEUPbKuk6m-yIu0KtXRPBKuTCC-gZlhvQzXc8rGiQAyj2xAO-VZNny76NijV6U9J3E','fr4vks@gmail.com','Francis','RIQUET','Looking for new challenges','Electrical and Electronic Manufacturing','cn','Shanghai City, China','After nearly 17 years at the head of the company I had created with an innovative patented project, I would like to  take on new challenges and share my experience and knowledge in an innovative tour company towards international markets.\n\nI have accumulated a wealth of technological and commercial development of international experience in many fields like industrial, military, medical, and commerce.\n\nCombining dual technological and commercial  training, my sense of commerce and negotiation, my taste for technology, my sense of listening to others added to my creativity have allowed me to develop strong business and a dozen patent directly or indirectly by my partner-clients.\n\n\nFlexible, energetic, with a strong sense of entrepreneurship, creative mind, ability to think out-of-the-box.\n\nAbility to analyze, plan, control, and deliver concurrent solutions to schedule and budget targets.\n \nA demonstrated ability to mentor  project delivery teams.\n\nPerceptive, collaborative and strongly customer-orientated with demonstrated ability to build strong relationships with clients and internal stakeholders to ensure successful project implementation.\n\nWith a strong leadership skills, and strong ability of ownership, I am self-motivated and able to work independently, Highly organized and efficient\n\nHandles stressful situations and deadline pressures well\nDemonstrated aptitude for problem-solving\n\nWith a leader temperament , a recognized charisma, I am looking for a project, a start-up that will tickle my curiosity and use my talents.','','https://www.linkedin.com/in/francis-riquet-a1977345','2016-06-01 10:13:03','2016-06-12 07:27:02'),(20,104,'BMGC2Q3Kqt','AQVl5pZ5tK9yCB-_NCdVGGSq-de-AHyX4TjykUDJFjR6N4EGrXnBNBRwUl54M2_bxoOKn4JWov6KM6GlB4jtS8u5rHPZiaaYqayWNgpaj3Mx2AD5jj-X34dSNV8zZ9qURxOflc4qRqb9oYx8eZ6dXq4ImzcKuDtYaDAiZF4upoGOv74yWOg','https://media.licdn.com/mpr/mprx/0_fxkuMYNeA8tVarOiTJ60Mj5QPhNw29OiTRK1MjkJuL8s1td__MN8cgrcgmqv7A0fayQtns9Tzxhd','kkarda77@gmail.com','Kapil','Karda','Co-Founder and CTO at Engineer Master Solutions Pvt. Ltd.','Computer Software','in','Indore Area, India','I have done my graduation from RGPV Bhopal. I am start my own startup name Engineer Master. Here we can develop mobile applications, web applications and web sites. In My life, I am facing many ups and downs but now i am the co-founder on an startup.','','https://www.linkedin.com/in/kapil-karda-7447ba51','2016-06-02 08:10:28','2016-06-03 08:45:19'),(21,60,'l3wv23Cl30','AQXsbirw2TQ1kp5OOxqJXJiakeaeploKYReudYllSM75d007tEQSr2q5X9r1x2Dzn65skMg6XhygN7NuhJ_2eRutGS_4l8qGJeJyUAty17MarfFOdy2DbRqgkN2jmTqEMxDkkuPTmzax94O8MsIvjdPnkPj8zDrgGQmj28gmscDqCFtOcN8','https://media.licdn.com/mpr/mprx/0_7ujWfo4IDY8NeUoboeLFbYsIWdgNHHoR8jwFoxpoD01zH4UU2sLHIaAoodOWw4eRLuWb34OEhmKvausV_04vFOPQ5mKqa20ch04E20Qwm75ZXVXwummXuwesLREXb2e6Wyy5wSvpo0G','jbantoine@163.com','Jean-Bernard','ANTOINE          安简兵','Trilingual Industrial Management - Manufacturing Optimization & International Technical Business Development','Mechanical or Industrial Engineering','us','Savannah, Georgia Area','Trilingual industrial manager - International business development and Manufacturing operations management. \n \nMy long term cross cultural experiences, including management of joint venture and post-acquisition entities, brought me to become a very resilient and result oriented manager. I speak and read fluently chinese, english and french.\nI am very familiar with the industrial and organizational performance optimization processes, as well as all the related change management issues, linked to overseas investments and global sourcing.\n\n* Technical Application experience - Market knowledge\n   - Mechanical parts fabrication, \n   - Machining, cold heading, wire drawing, punching and forming.\n   - Forging, Pressure or gravity Casting, Hollow and flat Glass processes\n   - Welding and pressure vessels manufacturing, Mechanical assemblies and electrical-mechanical integration\n   - Plastic injection manufacturing, \n   - Electrical protection, fuse and fuse-box\n   - Food science and food processing\n\n* Management Expertise: \n   - Creation and set-up of Industrial operation, Plant start, Production line set up.\n   - Manufacturing localization in low cost country, Product transfer.\n   - Industrial and business start-up and turnaround in China: Joint Venture, Acquisition, WOFE, new factories start-up\n   - P&L and general operations Management: productivity and quality improvements, production cost optimization\n   - Technical Sales turnover and business development in China, Distribution network development and supervision\n   - Industrial excellence ( 5S, lean), EHS and quality systems (ISO14000, ISO9000, ISO13485)\n   - Multicultural team-building\n   - Operation , system & Finance control \n   - Project management\n   - Manufacturing processes improvement & plant layout optimization.','','https://www.linkedin.com/in/jbantoine','2016-06-12 07:41:51','2016-06-12 13:49:45');
/*!40000 ALTER TABLE `linkedin_profiles` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,9,2,'Great idea imporved a bit though','2016-02-27 17:14:26','2016-02-27 17:14:26'),(2,7,2,'great ideas :-)','2016-02-28 07:25:47','2016-02-28 07:25:47'),(3,3,28,'yes you can do better','2016-02-28 20:14:30','2016-02-28 20:14:30'),(4,9,2,'you just need to improve the casing to get a better mark in design','2016-03-02 09:02:05','2016-03-02 09:02:05'),(5,11,2,'hi guy, good job, improve the design...','2016-03-03 11:39:56','2016-03-03 11:39:56'),(6,11,2,'gugyigi','2016-03-03 11:41:05','2016-03-03 11:41:05'),(7,11,2,'','2016-03-03 11:41:07','2016-03-03 11:41:07'),(8,11,1,'testing','2016-03-10 16:19:03','2016-03-10 16:19:03'),(9,9,1,'testing','2016-03-10 16:20:09','2016-03-10 16:20:09'),(10,9,1,'test','2016-03-10 16:35:49','2016-03-10 16:35:49'),(11,9,1,'test','2016-03-10 16:38:24','2016-03-10 16:38:24'),(12,9,1,'postman test','2016-03-10 16:39:42','2016-03-10 16:39:42'),(13,9,1,'postman test','2016-03-10 16:43:23','2016-03-10 16:43:23'),(14,9,1,'postman test','2016-03-10 17:23:58','2016-03-10 17:23:58'),(15,9,1,'postman test','2016-03-11 15:57:02','2016-03-11 15:57:02'),(16,9,1,'postman test','2016-03-11 16:02:37','2016-03-11 16:02:37'),(17,11,1,'good job!','2016-03-12 05:29:44','2016-03-12 05:29:44'),(18,11,1,'good job!','2016-03-12 05:30:05','2016-03-12 05:30:05'),(19,11,1,'send message test','2016-03-12 05:31:46','2016-03-12 05:31:46'),(20,11,2,'jfukgiylhoun','2016-03-14 06:39:21','2016-03-14 06:39:21'),(21,9,1,'postman test','2016-03-15 09:16:07','2016-03-15 09:16:07'),(22,11,1,'hii','2016-03-15 09:22:18','2016-03-15 09:22:18'),(23,9,1,'bew','2016-03-15 09:40:19','2016-03-15 09:40:19'),(24,9,1,'aawersome','2016-03-16 10:13:04','2016-03-16 10:13:04'),(25,9,1,'bews','2016-03-16 10:13:40','2016-03-16 10:13:40'),(26,1,1,'asdfadfas','2016-03-18 11:15:58','2016-03-18 11:15:58'),(27,1,1,'asdfafd','2016-03-18 11:16:01','2016-03-18 11:16:01'),(28,1,1,'sdfsdfasdf','2016-03-18 11:16:46','2016-03-18 11:16:46'),(29,1,1,'asdfasf','2016-03-18 11:33:17','2016-03-18 11:33:17'),(30,3,1,'sdfsdfsd','2016-03-18 14:59:37','2016-03-18 14:59:37'),(31,1,1,'hyyy','2016-03-22 09:25:07','2016-03-22 09:25:07'),(32,1,1,'hmjhmbm','2016-03-22 11:23:20','2016-03-22 11:23:20'),(33,1,1,'gjgj','2016-03-22 11:26:23','2016-03-22 11:26:23'),(34,1,1,'deg','2016-03-22 11:39:29','2016-03-22 11:39:29'),(35,1,1,'hdh','2016-03-22 11:47:40','2016-03-22 11:47:40'),(36,1,1,'gnjgf','2016-03-22 11:47:47','2016-03-22 11:47:47'),(37,1,1,'dgfsdgsd','2016-03-22 16:19:38','2016-03-22 16:19:38'),(38,1,1,'grshu','2016-03-23 11:28:43','2016-03-23 11:28:43'),(39,1,1,'vfvd','2016-03-23 11:28:48','2016-03-23 11:28:48'),(40,1,1,'fhi','2016-03-23 11:29:23','2016-03-23 11:29:23'),(41,1,1,'test','2016-03-29 07:59:41','2016-03-29 07:59:41'),(42,1,1,'test','2016-03-29 08:14:11','2016-03-29 08:14:11'),(43,9,1,'Test 3','2016-03-29 08:18:47','2016-03-29 08:18:47'),(44,9,1,'asdsadasdasdas','2016-03-29 10:22:23','2016-03-29 10:22:23'),(45,1,1,'Very hard to use the marks cursor','2016-03-30 07:35:34','2016-03-30 07:35:34'),(46,1,1,'Very hard to use the marks cursor','2016-03-30 07:35:53','2016-03-30 07:35:53'),(47,1,1,'Again> why 2ce written?','2016-03-30 09:21:19','2016-03-30 09:21:19'),(48,1,1,'hi','2016-03-31 07:37:29','2016-03-31 07:37:29'),(49,1,1,'hi','2016-03-31 07:37:29','2016-03-31 07:37:29'),(50,1,1,'hi','2016-03-31 07:37:29','2016-03-31 07:37:29'),(51,1,1,'hi','2016-03-31 07:37:29','2016-03-31 07:37:29'),(52,1,1,'hi','2016-03-31 07:37:31','2016-03-31 07:37:31'),(53,1,1,'hi','2016-03-31 07:37:34','2016-03-31 07:37:34'),(54,3,1,'working or not ?','2016-04-01 09:16:09','2016-04-01 09:16:09'),(55,17,1,'loulou cananard','2016-04-01 09:23:51','2016-04-01 09:23:51'),(56,11,1,'Good Entry !','2016-04-02 20:22:47','2016-04-02 20:22:47'),(57,17,1,'BrestTestYquem','2016-04-02 21:16:15','2016-04-02 21:16:15'),(58,1,1,'Bjj','2016-04-02 21:19:32','2016-04-02 21:19:32'),(59,17,1,'Test','2016-04-03 03:33:37','2016-04-03 03:33:37'),(60,17,1,'VhhhHhjjjkdjdjsjekkekrjrjrjrjjrbrjrjfjrjjrjwjsjjjwwhhwwhhwhwhwhhe','2016-04-03 03:34:36','2016-04-03 03:34:36'),(61,17,1,'Big buck bunny','2016-04-03 05:19:39','2016-04-03 05:19:39'),(62,9,1,'Would it be good to have the date on it?','2016-04-03 11:45:51','2016-04-03 11:45:51'),(63,17,1,'ok we can see an improvement in this entry but still a lot of work to do on it','2016-04-03 13:14:22','2016-04-03 13:14:22'),(64,9,2,'Need to impeove obevalfhud','2016-04-19 04:15:08','2016-04-19 04:15:08'),(65,9,2,'Pépé ... Mémé','2016-04-22 12:54:53','2016-04-22 12:54:53'),(66,9,2,'I like ur idea but u should umprove the design of the legs','2016-04-25 12:28:35','2016-04-25 12:28:35'),(67,9,2,'I like ur idea but u should umprove the design of the legs','2016-04-25 12:28:36','2016-04-25 12:28:36'),(68,9,2,'I like ur idea but u should umprove the design of the legs','2016-04-25 12:28:50','2016-04-25 12:28:50'),(69,9,2,'I like ur idea but u should umprove the design of the legs','2016-04-25 12:28:55','2016-04-25 12:28:55'),(70,9,2,'I like ur idea but u should umprove the design of the legs','2016-04-25 12:36:14','2016-04-25 12:36:14'),(71,19,1,'testing','2016-04-27 19:17:56','2016-04-27 19:17:56'),(72,9,2,'If u imporvethe se','2016-05-10 14:00:39','2016-05-10 14:00:39'),(73,32,1,'Hello','2016-05-15 12:56:00','2016-05-15 12:56:00'),(74,33,1,'HELLO','2016-05-15 13:55:18','2016-05-15 13:55:18'),(75,44,2,'not very','2016-05-20 14:33:13','2016-05-20 14:33:13'),(76,19,60,'Top good','2016-05-23 11:22:10','2016-05-23 11:22:10'),(77,19,100,'Totally agree !','2016-05-29 23:28:14','2016-05-29 23:28:14'),(78,57,1,'hi','2016-06-12 15:19:21','2016-06-12 15:19:21');
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
INSERT INTO `migrations` VALUES ('2014_02_10_145728_notification_categories',1),('2014_08_01_210813_create_notification_groups_table',1),('2014_08_01_211045_create_notification_category_notification_group_table',1),('2014_10_12_000000_create_users_table',1),('2014_10_12_100000_create_password_resets_table',1),('2014_10_28_175635_create_threads_table',1),('2014_10_28_175710_create_messages_table',1),('2014_10_28_180224_create_participants_table',1),('2014_11_03_154831_add_soft_deletes_to_participants_table',1),('2014_11_10_083449_add_nullable_to_last_read_in_participants_table',1),('2014_11_20_131739_alter_last_read_in_participants_table',1),('2014_12_04_124531_add_softdeletes_to_threads_table',1),('2015_05_05_212549_create_notifications_table',1),('2015_06_06_211555_add_expire_time_column_to_notification_table',1),('2015_06_06_211555_change_type_to_extra_in_notifications_table',1),('2015_06_07_211555_alter_category_name_to_unique',1),('2015_11_29_085515_create_contests_table',1),('2015_11_29_085723_create_entries_table',1),('2015_11_29_104254_entrust_setup_tables',1),('2015_12_05_182356_create_currencies_table',1),('2015_12_05_182514_create_files_table',1),('2015_12_05_183628_create_contestants_table',1),('2015_12_05_184840_create_prizes_table',1),('2015_12_13_023509_create_skills_table',1),('2015_12_13_024001_create_contest_skills_table',1),('2016_01_03_104135_create_creators_table',1),('2016_01_03_231443_create_investors_table',1),('2016_01_03_231534_create_judges_table',1),('2016_01_03_231555_create_super_experts_table',1),('2016_01_10_084058_create_entry_ratings_table',1),('2016_01_23_081341_create_contest_jury_table',1),('2016_02_06_025141_create_projects_table',1),('2016_02_06_042253_create_pages_table',1),('2016_02_06_083451_create_investments_table',1),('2016_02_08_052417_create_expertise_categories_table',1),('2016_02_08_052448_create_expertise_table',1),('2016_02_08_091558_create_expertise_skills_table',1),('2016_02_28_194022_create_entry_files_table',2),('2016_03_05_012534_create_experts_table',3),('2016_03_06_035914_create_expert_skills_table',3),('2016_03_10_085729_create_expert_expertise_table',3),('2016_02_03_10000_create_point_transactions_table',4),('2016_03_14_102730_create_jury_applications_table',5),('2016_03_15_222040_create_contestant_applications_table',5),('2016_03_20_010906_create_transactions_table',6),('2016_03_20_072836_create_share_listings_table',7),('2016_03_22_012333_create_share_bids_table',7),('2016_04_01_082356_enhance_projects_table',8),('2016_04_01_084625_create_confirms_table',9),('2016_04_06_091832_create_project_expertise_table',9),('2016_04_10_200334_create_project_expertise_bids_table',9),('2016_04_16_042250_create_table_linkedin_profiles',10),('2016_04_16_060058_create_facebook_profiles_table',10),('2015_04_13_020453_create_settings_table',11),('2015_12_15_020453_alter_settings_table',12),('2016_05_12_205934_create_project_investment_bids_table',14),('2016_05_05_221556_create_project_finances_table',15),('2016_05_17_233023_create_push_associations_table',16);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_categories`
--

LOCK TABLES `notification_categories` WRITE;
/*!40000 ALTER TABLE `notification_categories` DISABLE KEYS */;
INSERT INTO `notification_categories` VALUES (1,'user.created','Your account has been created!'),(2,'jury.invited','You have been invited to judge the contest - <a ui-sref=\"app.contestsingle({contestId: extra.contest.id})\">{extra.contest.name}</a>.'),(3,'jury.removed','You have been removed as a judge from the contest - <a ui-sref=\"app.contestsingle({contestId: extra.contest.id})\">{extra.contest.name}</a>.'),(4,'jury.entry.new','There is a new entry by {} under the contest {}'),(5,'jury.entry.revised','There is a revised entry by {} under the contest {}'),(6,'contestant.accepted','There is a new rating on your entry on {}'),(7,'contestant.rating','There is a new rating on your entry on {}'),(8,'project.approved','Your project has been approved!'),(9,'project.superExpertBid','{extra.superExpertName} has placed a bid on your project'),(10,'project.superExpertSelected','You have been selected as a super expert for ...');
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
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (38,1,NULL,1,NULL,8,'http://desk.fundator.co','{\"project\":{\"id\":\"31\",\"name\":\"OLED Mugs\"},\"user\":{\"id\":\"1\",\"name\":\"Udit\"},\"thumbnail\":\"0\",\"action\":\"app.create.details({projectId: 31})\"}',1,'2016-05-15 12:12:59','2016-05-27 23:35:04',NULL),(39,1,NULL,1,NULL,9,'http://desk.fundator.co','{\"project\":{\"id\":\"31\",\"name\":\"OLED Mugs\"},\"user\":{\"id\":\"1\",\"name\":\"Udit\"},\"superExpert\":{\"id\":\"2\",\"name\":\"Benjamin\"},\"superExpertName\":\"Benjamin\",\"thumbnail\":\"http:\\/\\/desk.fundator.co\\/uploads\\/thumbnail-2png-95430.png\",\"action\":\"app.create.superexpert({',1,'2016-05-15 12:12:59','2016-05-27 23:35:04',NULL),(40,2,NULL,2,NULL,10,'http://desk.fundator.co','{\"project\":{\"id\":\"31\",\"name\":\"OLED Mugs\"},\"user\":{\"id\":\"2\",\"name\":\"Benjamin\"},\"thumbnail\":0,\"action\":null}',1,'2016-05-15 12:14:06','2016-05-23 09:04:55',NULL),(41,74,NULL,74,NULL,1,'http://desk.fundator.co','{\"icon\":\"signup\",\"action\":null}',0,'2016-05-18 08:13:50','2016-05-18 08:13:50',NULL),(42,74,NULL,74,NULL,1,'http://desk.fundator.co','{\"icon\":\"signup\",\"action\":null}',0,'2016-05-18 08:24:18','2016-05-18 08:24:18',NULL),(43,74,NULL,74,NULL,1,'http://desk.fundator.co','{\"icon\":\"signup\",\"action\":null}',0,'2016-05-18 08:30:28','2016-05-18 08:30:28',NULL),(44,1,NULL,1,NULL,1,'http://desk.fundator.co','{\"icon\":\"signup\",\"action\":null}',1,'2016-05-20 06:47:14','2016-05-27 23:35:04',NULL),(45,76,NULL,76,NULL,1,'http://desk.fundator.co','{\"icon\":\"signup\",\"action\":null}',0,'2016-05-20 06:47:20','2016-05-20 06:47:20',NULL),(46,60,NULL,60,NULL,1,'http://desk.fundator.co','{\"icon\":\"signup\",\"action\":null}',0,'2016-05-20 07:12:51','2016-05-20 07:12:51',NULL),(47,77,NULL,77,NULL,1,'http://desk.fundator.co','{\"icon\":\"signup\",\"action\":null}',0,'2016-05-20 11:32:26','2016-05-20 11:32:26',NULL),(48,2,NULL,2,NULL,8,'http://desk.fundator.co','{\"project\":{\"id\":\"33\",\"name\":\"beer connected mug\"},\"user\":{\"id\":\"2\",\"name\":\"Benjamin\"},\"thumbnail\":\"0\",\"action\":\"app.create.details({projectId: 33})\"}',1,'2016-05-20 14:30:29','2016-05-23 09:04:55',NULL),(49,2,NULL,2,NULL,9,'http://desk.fundator.co','{\"project\":{\"id\":\"33\",\"name\":\"beer connected mug\"},\"user\":{\"id\":\"2\",\"name\":\"Benjamin\"},\"superExpert\":{\"id\":\"2\",\"name\":\"Benjamin\"},\"superExpertName\":\"Benjamin\",\"thumbnail\":\"http:\\/\\/desk.fundator.co\\/uploads\\/thumbnail-2png-95430.png\",\"action\":\"app.create.',1,'2016-05-20 14:30:29','2016-05-23 09:04:55',NULL),(50,2,NULL,2,NULL,10,'http://desk.fundator.co','{\"project\":{\"id\":\"33\",\"name\":\"beer connected mug\"},\"user\":{\"id\":\"2\",\"name\":\"Benjamin\"},\"thumbnail\":0,\"action\":null}',1,'2016-05-20 14:31:02','2016-05-23 09:04:55',NULL),(51,76,NULL,76,NULL,8,'http://desk.fundator.co','{\"project\":{\"id\":\"34\",\"name\":\"Speederball\"},\"user\":{\"id\":\"76\",\"name\":\"Andre\"},\"thumbnail\":\"0\",\"action\":\"app.create.details({projectId: 34})\"}',0,'2016-05-21 10:25:01','2016-05-21 10:25:01',NULL),(52,76,NULL,76,NULL,9,'http://desk.fundator.co','{\"project\":{\"id\":\"34\",\"name\":\"Speederball\"},\"user\":{\"id\":\"76\",\"name\":\"Andre\"},\"superExpert\":{\"id\":\"2\",\"name\":\"Benjamin\"},\"superExpertName\":\"Benjamin\",\"thumbnail\":\"http:\\/\\/desk.fundator.co\\/uploads\\/thumbnail-2png-95430.png\",\"action\":\"app.create.superexpe',0,'2016-05-21 10:25:02','2016-05-21 10:25:02',NULL),(53,2,NULL,2,NULL,10,'http://desk.fundator.co','{\"project\":{\"id\":\"34\",\"name\":\"Speederball\"},\"user\":{\"id\":\"2\",\"name\":\"Benjamin\"},\"thumbnail\":0,\"action\":null}',1,'2016-05-21 10:25:45','2016-05-23 09:04:55',NULL),(54,1,NULL,1,NULL,1,'http://desk.fundator.co','{\"icon\":\"signup\",\"action\":null}',1,'2016-05-21 13:10:22','2016-05-27 23:35:04',NULL),(55,78,NULL,78,NULL,1,'http://desk.fundator.co','{\"icon\":\"signup\",\"action\":null}',0,'2016-05-23 00:40:57','2016-05-23 00:40:57',NULL),(56,74,NULL,74,NULL,1,'http://desk.fundator.co','{\"icon\":\"signup\",\"action\":null}',0,'2016-05-23 10:30:13','2016-05-23 10:30:13',NULL),(57,92,NULL,92,NULL,1,'http://fundator.co','{\"icon\":\"signup\",\"action\":null}',0,'2016-05-26 08:09:53','2016-05-26 08:09:53',NULL),(58,1,NULL,1,NULL,1,'http://desk.fundator.co','{\"icon\":\"signup\",\"action\":null}',1,'2016-05-27 06:16:59','2016-05-27 23:35:04',NULL),(59,100,NULL,100,NULL,1,'http://desk.fundator.co','{\"icon\":\"signup\",\"action\":null}',1,'2016-05-28 19:12:40','2016-05-28 20:07:18',NULL),(60,100,NULL,100,NULL,1,'http://desk.fundator.co','{\"icon\":\"signup\",\"action\":null}',1,'2016-05-28 19:58:46','2016-05-28 20:07:18',NULL),(61,104,NULL,104,NULL,1,'http://desk.fundator.co','{\"icon\":\"signup\",\"action\":null}',0,'2016-06-03 09:03:20','2016-06-03 09:03:20',NULL),(62,77,NULL,77,NULL,2,'http://desk.fundator.co','{\"contest\":{\"id\":\"3\",\"name\":\"Cat and Dog Connected Devices\"},\"user\":{\"id\":\"77\",\"name\":\"Francis\"},\"thumbnail\":\"mQIoaNyiKnGGbBuFAHKksPZptilRDUSL.jpg\",\"action\":\"app.contest({contestId: 3})\"}',0,'2016-06-08 07:35:58','2016-06-08 07:35:58',NULL),(63,60,NULL,60,NULL,2,'http://desk.fundator.co','{\"contest\":{\"id\":\"1\",\"name\":\"Connected outdoor umbrella\"},\"user\":{\"id\":\"60\",\"name\":\"Jean-Bernard\"},\"thumbnail\":\"nSmE3yNFw2L07Pj82EAGQKGB0lsvQs91.jpg\",\"action\":\"app.contest({contestId: 1})\"}',0,'2016-06-08 07:36:08','2016-06-08 07:36:08',NULL),(64,60,NULL,60,NULL,2,'http://desk.fundator.co','{\"contest\":{\"id\":\"3\",\"name\":\"Cat and Dog Connected Devices\"},\"user\":{\"id\":\"60\",\"name\":\"Jean-Bernard\"},\"thumbnail\":\"mQIoaNyiKnGGbBuFAHKksPZptilRDUSL.jpg\",\"action\":\"app.contest({contestId: 3})\"}',0,'2016-06-08 07:36:17','2016-06-08 07:36:17',NULL),(65,77,NULL,77,NULL,2,'http://desk.fundator.co','{\"contest\":{\"id\":\"5\",\"name\":\"Wearables for pets\"},\"user\":{\"id\":\"77\",\"name\":\"Francis\"},\"thumbnail\":\"2pjbXwJ6a1l2Nj1BTRBlFD0SPAVOrseI.jpg\",\"action\":\"app.contest({contestId: 5})\"}',0,'2016-06-08 07:37:07','2016-06-08 07:37:07',NULL),(66,105,NULL,105,NULL,1,'http://desk.fundator.co','{\"icon\":\"signup\",\"action\":null}',0,'2016-06-08 08:04:57','2016-06-08 08:04:57',NULL),(67,1,NULL,1,NULL,8,'http://desk.fundator.co','{\"project\":{\"id\":\"40\",\"name\":\"Afterfeed\"},\"user\":{\"id\":\"1\",\"name\":\"Kapil\"},\"thumbnail\":\"0\",\"action\":\"app.create.details({projectId: 40})\"}',0,'2016-06-08 09:02:36','2016-06-08 09:02:36',NULL),(68,1,NULL,1,NULL,9,'http://desk.fundator.co','{\"project\":{\"id\":\"40\",\"name\":\"Afterfeed\"},\"user\":{\"id\":\"1\",\"name\":\"Kapil\"},\"superExpert\":{\"id\":\"2\",\"name\":\"Benjamin\"},\"superExpertName\":\"Benjamin\",\"thumbnail\":\"http:\\/\\/desk.fundator.co\\/uploads\\/thumbnail-2png-95430.png\",\"action\":\"app.create.superexpert(',0,'2016-06-08 09:02:36','2016-06-08 09:02:36',NULL),(69,2,NULL,2,NULL,10,'http://desk.fundator.co','{\"project\":{\"id\":\"40\",\"name\":\"Afterfeed\"},\"user\":{\"id\":\"2\",\"name\":\"Benjamin\"},\"thumbnail\":0,\"action\":null}',0,'2016-06-08 09:15:28','2016-06-08 09:15:28',NULL),(70,2,NULL,2,NULL,2,'http://desk.fundator.co','{\"contest\":{\"id\":\"1\",\"name\":\"Connected outdoor umbrella\"},\"user\":{\"id\":\"2\",\"name\":\"Benjamin\"},\"thumbnail\":\"nSmE3yNFw2L07Pj82EAGQKGB0lsvQs91.jpg\",\"action\":\"app.contest({contestId: 1})\"}',0,'2016-06-10 14:45:11','2016-06-10 14:45:11',NULL);
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
  CONSTRAINT `notifications_categories_in_groups_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `notification_categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `notifications_categories_in_groups_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `notification_groups` (`id`) ON DELETE CASCADE
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES (4,'Are you a creator','Are-you-a-creator','<h1>Are You a Creator ?</h1>\n\n<p>Each of us has ideas, forged from our own experiences and routines. And each of us is creating in his every day life. Creation happen all the time, for different reasons and with different purposes:</p>\n\n<p>- Inventors: your hobby is to invent and make new object in your garage</p>\n\n<p>- Improvers: you are a tinker always fixing or modifining things around you</p>\n\n<p>- Entrepreneurs: you are creating or running a business based on an innovative idea</p>\n\n<p>- Managers: you can bring various people together and coordinate them to achieve complicated tasks together to create&nbsp;</p>\n\n<p>- Businessmen: you support creation and innovation by investing money and experienceto find appropriate sales and distribution channels</p>\n\n<p>&nbsp;</p>\n\n<p><strong>WE ARE ALL CREATORS, but we are not all makers !</strong></p>\n\n<p>Everyone has potential to innovate, but to actually produce an item that can be sold for a profit, so many expertise are needed. &nbsp;Time can not buy the skills and means that are usually requiered to bring an idea to life:</p>\n\n<p>- Creative skills to bring up an idea that has the right amount of innovation, usefulness and realism.</p>\n\n<p>- Technical skills in many various expertises: Design, Manufacturing, Logistic, Project management, Legal, Marketing, Sales.</p>\n\n<p>- Financial skills to bring the money needed to grow a business, and also the financial expertise to manage it.</p>\n\n<p>&nbsp;</p>\n\n<p><strong>FUNDATOR IS THE COMMUNITY OF MAKERS</strong></p>\n\n<p><strong>FUNDATOR</strong> was launched to help us connect personal innovation and imagination with the resources that can carry your idea from concept to reality.</p>\n\n<p><em>Your journey starts here to bring your creation to life.</em></p>\n\n<p>&nbsp;</p>\n'),(5,'?? creators','??-creators',''),(6,'Creator in 6 Steps','creators-in-6-steps','<p>1- PREPARE YOUR PROJECT &amp; GET NECESSARY RESSOURCES</p>\n\n<p>@ Fundator, preparing your projects requires 6 steps that you make online.</p>\n\n<p>STEP 1 &gt; DEFINE YOUR PRODUCT IDEA</p>\n\n<p>Here you define the big lines of your projects. (products ideas, product market, market price,...)</p>\n\n<p>STEP 2 &gt; FIND YOUR SUPEREXPERT</p>\n\n<p>In Fundator, making a product is a team work. You first job is to team up with a &quot;superexpert&quot; that will help you to go through all steps of the preparation of your project (step 2 to step 6) &nbsp;and guarantee to all the team players (experts and investors) that the project will go as planned.</p>\n\n<p>STEP 3 &gt; MAKE THE LIST OF TASKS NECESSARY TO COMPLETE YOUR PRODUCTS</p>\n\n<p>Here is usually where creator prefers to leave the Superexpert do the job he is paid for. That means breaking down the project into tasks or unit of work to choose from predefined lists ( TECHNICAL, LEGAL, MANUFACURING, MARKETING, SALES, LOGISTICS).</p>\n\n<p>See more (link)</p>\n\n<p>STEP 4 &gt; SELECT EACH TASK-EXPERT FOR EACH TASKS.</p>\n\n<p>We have a pool of experts for each tasks that will propose to work with you for a fee. Superexpert and creators jointly choose the one who matchs best the expertise required.</p>\n\n<p>STEP 5 &gt; BUILD UP YOUR PROJECT&#39;S FINANCIALS</p>\n\n<p>Project success rely on who teams up with you, so you need to secure talent and partners by showing a clear business plan to define well how you will share future success.</p>\n\n<p>STEP 6 &gt; SELECT INVESTORS</p>\n\n<p>A pool of investors is ready to analyse your project and to chose to support it if it is a match.</p>\n\n<p>&nbsp;</p>\n\n<p>2- MAKE YOUR FIRST PRODUCT &amp; MAKE IT VISIBLE</p>\n\n<p>Great ! At that step, you&#39;ve got your team and you are ready to make your first prototype. It is going to take one to two months to get it, and there is much work to do !</p>\n\n<p>During this step, along with a set of prototype you will also get:</p>\n\n<p>- all necessary drawings to allow fabrication (Mechanical, Electrical, ...).</p>\n\n<p>- all legal and IP issues taken care of and under control to ensure there will be no issues later on.</p>\n\n<p>- all suppliers identified, assessed and validated in term of quality and production capacity</p>\n\n<p>- communication strategy and supports are defined and ready to be used</p>\n\n<p>- all sales channel and sales targets identified</p>\n\n<p>Suprexpert is now responsible to manage project and report to you and investors progress against planning.</p>\n\n<p>&nbsp;</p>\n\n<p>3- SELL YOUR PRODUCTS AND PAYBACK YOUR INVESTORS.</p>\n\n<p>Now is time to make some business !&nbsp;All what has been carefully build in previous steps is now going to bring your creation into our world.</p>\n\n<p>Making money and repaying your investors are now your goals.</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>FAQ CREATOR:</p>\n\n<p>Q: Can i make a draft project on fundator?</p>\n\n<p>Q: what kind of products are accepted on Fundator?</p>\n\n<p>All consumers good that followed our guidelines in our ToS (link)</p>\n\n<p>Q: How do i get a superexpert onboard</p>\n\n<p>Q: How and how much is paid the superexpert?</p>\n\n<p>Q: How should i assess the superexpert level.</p>\n\n<p>A: At Fundator, we</p>\n\n<p>Q: Who paid for expert fees?&nbsp;</p>\n\n<p>Q: how much is the cost for each task experts</p>\n\n<p>Q: how to choose the expert for each tasks?</p>\n\n<p>Q: if creators and superexpert can&#39;t agree on designating an expert , who got the last word?</p>\n\n<p>Q: what financial structure is possible ?</p>\n\n<p>Q: How to investor chose me ?</p>\n\n<p>Q: How do I select investors ?&nbsp;</p>\n'),(7,'FAQ on Creators','faq-on-creators','<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam in odit atque sequi enim est, asperiores, repellendus illo dignissimos, molestias perferendis exercitationem nihil quidem voluptates harum consequatur quasi velit! Iure?</p>\n\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam in odit atque sequi enim est, asperiores, repellendus illo dignissimos, molestias perferendis exercitationem nihil quidem voluptates harum consequatur quasi velit! Iure?</p>\n\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam in odit atque sequi enim est, asperiores, repellendus illo dignissimos, molestias perferendis exercitationem nihil quidem voluptates harum consequatur quasi velit! Iure?</p>\n'),(8,'FAQ on Experts','faq-on-experts','<p>FAQ - Expert:</p>\n\n<p>Q: As an expert, how do I get paid for my work ?</p>\n\n<p>&nbsp; A: Directly to your registered bank account through Fundator payment platform. Payment is 40% before job start, then the rest will be paid at completion of the task.</p>\n\n<p>Q: How much is paid an expert in fundator ?</p>\n\n<p>&nbsp; A: Gig fees can go from&nbsp;sero to few thousands USD&nbsp;according to complexity of the tasks considered.</p>\n\n<p>Q: What is a superexpert ?</p>\n\n<p>&nbsp; A: All projects will be supervised by a&nbsp;Superexpert that will&nbsp;manage the project through the whole development process.&nbsp;&nbsp;Superexpert is a senior expert, he has proven&nbsp;technical skills related to product to develop, and&nbsp;industrial experience and a project management experience.</p>\n\n<p>Q: How superexpert is selected ?</p>\n\n<p>&nbsp; A:&nbsp;Product developpement project are proposed to superexpert with related expertise. If superexpert is interested in&nbsp;a project, he then propose to work for the Creator for a fee. Creator finally select the superexpert he likes best.</p>\n\n<p>Q: How to become a superexpert ?</p>\n\n<p>&nbsp; A: After several successful gigs, an Expert that have necessary project management skills can apply to Fundator to be a Superexpert.</p>\n'),(9,'Expert in 3 steps','Expert-in-3-steps','<p><strong>Being part of the awesome pool of&nbsp;expert at Fundator is a 3 steps process.</strong></p>\n\n<p>1- REGISTER AS AN EXPERT:</p>\n\n<p>Once you have been through all the potentiality of fundator, and you know that you want to get gigs, just register as an expert. You can click <em>REGISTER AS EXPERT.</em></p>\n\n<p>2- BROWSE FOR GIGS &amp; PROPOSE YOUR SERVICES:</p>\n\n<p>&nbsp;</p>\n\n<p>3- PROVIDE A SERVICE &amp; GET PAID:</p>\n'),(10,'Are you an Expert','Are-you-an-expert','<h1>Are You an Expert ?</h1>\n\n<p>Product creation or improvement is a lengthy process that requires many kinds of specialised knowledge.</p>\n\n<p>Internet allows the &quot;crowdourcing&quot; of such knowledges and expertises. Simply put, you have more chance to find a very specific knowledge in a large pool of people than in a small one. Fundator bring together as many expertise as possible to create and manufacture innovative consumer goods and awsome everyday life products.</p>\n\n<p>You can be a seasoned professional working in a&nbsp;workshop,&nbsp;a young IT freelancer used to crowdsourcing gigs, or a mom&nbsp;with spare time when kids are in school...&nbsp;you all have your place in Fundator !</p>\n\n<p><strong>What expertise is needed to develop innovative products:</strong></p>\n\n<p>- Design: Functional or artistic design for products, but also packagings, advertisements and communication supports.</p>\n\n<p>- Legal: Intellectual Property (IP), Contract and other legal issues to manage during product development and sales.</p>\n\n<p>- Technical: All kind of engineering expertise to produce technical drawing, define mechanical processing methods, select material, design and validate electrical and electronic structures and components.</p>\n\n<p>- Operation, logistic and purchase: manufacturing experience and abilities with various material and systems, products and components flow and stock management, transportation and import-export knowledges, purchase and procurement experience with all kind of suppliers and factories around the world.</p>\n\n<p>- Marketing: from defining communication strategies to producing various marketing analyse tools or communication support either in traditional or web environments.</p>\n\n<p>- Sales: from sales strategies to beeing able to identify target customers or sales network construction to motivate and retain distributors and sales partners everywhere there is an opportunity.</p>\n\n<p>So many expertises are needed, if you have one of the above, then you landed in the right place !</p>\n\n<p><strong>Why&nbsp;would I want to be an expert for Fundator ?</strong></p>\n\n<p>Beeing an Expert with Fundator brings many rewarding benefits:</p>\n\n<p>-&nbsp;An income in your pocket: Expert propose his expertise at a price. For each task you achieve in a satisfactory manner, you will get paid. This come on top of your current income through Fundator platform with minimum efforts.</p>\n\n<p>- A visibility of your skills: the more tasks you achieve, and the more visibility you get on the platform. It will attract Creators and Project managers, and bring more income sources.</p>\n\n<p>- A recognition in your network: Recognition of your competence in your network builds up your CV for more opportunities.</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n'),(11,'Are you an Investor','Are-you-an-investor','<h1>Are you an investor ?</h1>\n\n<p>Fundator is a marketplace to connect investors who want to invest in products.&nbsp;Investors bring the money that allow creative and innovative ideas to become products that strive on the market. &nbsp;</p>\n\n<p>Consider the opportunity created when the principles of crowdfunding and crowdsourcing come together to drive innovation and production. As an investor, you are key to this process.</p>\n\n<p>&nbsp;</p>\n\n<p><strong>What are the benefits of beeing an investor in Fundator ?</strong><br />\n- Get a potential higher than market return on investment (on average between 25% to 40% yearly return)</p>\n\n<p>- Risk leverage through the possibility of multiple and various product investments.</p>\n\n<p>- Full transparence of project management, ressources allocation and direct access to team players</p>\n\n<p>- Start to invest from as low as USD 10</p>\n\n<p>&nbsp;</p>\n\n<p><strong>Additionnal benefits for active investors&nbsp;</strong></p>\n\n<p>Business owners or C level managers in marketing, sales and purchasing functions are finding great benefits in the use of Fundator:</p>\n\n<p>- Priority in selling new great products on their markets</p>\n\n<p>- Beeing part of a huge network of makers that leverage development of their own products</p>\n\n<p>- Tailor made products to your specific market or sales targets</p>\n\n<p>&nbsp;</p>\n\n<h3><br />\n&nbsp;</h3>\n'),(12,'Investors in 3 steps','investors-in-3-steps','<p><strong>Being part of the awesome pool of investor at Fundator is a 3 steps process.</strong></p>\n\n<p>1- REGISTER AS AN INVESTOR</p>\n\n<p>Once you have been through all the potentiality of fundator, and you know that you want to invest in product, just register as an investor. You can click <em>REGISTER AS INVESTOR</em></p>\n\n<p>2- BROWSE &amp; FUND A PROJECT</p>\n\n<p>FUNDATOR bring to investors potentially successful innovative consumer goods on their markets. Possible range of products is wide, from Fast moving consumer goods, high tech products, fashion items, innovative household products...&nbsp;</p>\n\n<p>&nbsp; - Your investor experience and expertise lead you to&nbsp;identify a project that has the good balance of innovation, feasibility and sales potential. Once you find such kind of project and bid on the minimum and maximum amount you want to invest in, you become eligible to get a share of the total investment.</p>\n\n<p>&nbsp; - Creator then review your proposal, and probably discuss it with you. If he finds the proposal acceptable and fitted to his need, then the creator will add you as an investor in his project.&nbsp;Expect few weeks to a month to get final approval on an investment proposal as some investment can be oversubscribed.</p>\n\n<p>&nbsp; - It is now time to pay the promised funds, but relax, all can be done securely online through Fundator&#39;s platform.</p>\n\n<p>3- FOLLOW UP PROGRESS &amp; GET YOUR RETURN&nbsp;</p>\n\n<p>Fundator dashboard enables you to follow updates on project timeline and tasks. You follow project progress continuously, and you are encouraged to provide support and insights to the creator and superexpert through our discussion box both on your desktop access or mobile APP.&nbsp;Fundator promotes frequent communication between stakeholders of a project, and all project members are reachable at all time.</p>\n\n<p>All project members work to complete project as fas as possible and according to planned schedule. Project duration can be very variable, between few weeks to a year according to the scope of the project.</p>\n\n<p>Project is completed once the target product has been manufatured and sold up to the point that gross margin can repay all of investors in priority. Then creator will repay his investors along with the promised return on investment.&nbsp;</p>\n\n<p>---</p>\n\n<p>&nbsp;</p>\n'),(13,'?? Investors','??-investors','<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam in odit atque sequi enim est, asperiores, repellendus illo dignissimos, molestias perferendis exercitationem nihil quidem voluptates harum consequatur quasi velit! Iure?</p>\n\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam in odit atque sequi enim est, asperiores, repellendus illo dignissimos, molestias perferendis exercitationem nihil quidem voluptates harum consequatur quasi velit! Iure?</p>\n\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam in odit atque sequi enim est, asperiores, repellendus illo dignissimos, molestias perferendis exercitationem nihil quidem voluptates harum consequatur quasi velit! Iure?</p>\n'),(14,'FAQ on Investors','faq-on-investors','<h3>Frequently Asked Questions on INVESTORS:</h3>\n\n<p>Q: What are the risks of investing in products ?</p>\n\n<p>&nbsp; A: Return can be very high, Risk are high too. You need to do your own due diligence on the feasibility of the project, the strength of the concept, abd the ability of the team to carry out the mission. If the project goes wrong, you can lose all your investment.</p>\n\n<p>Q: How do I select the most suitable project for me ?&nbsp;How do I make sure that my investment will bring a return ?</p>\n\n<p>&nbsp; A: Only your expertise and knowledge of the product and application considered can tell you what is the potential of success. Fundator provides you with a clear description of the project, the introduction of the team working on it , a mini sales business plan and possibility to discuss with the leaders of the project. We call it the <em>Fundator Make-it-Great Plan</em>, please see an example <strong>here</strong>.</p>\n\n<p>Q: what kind of return can an investor get through fundator ? &nbsp; &nbsp;</p>\n\n<p>&nbsp; A: Investment in products brings 25% to 40% yearly return in case of success. For example, USD10.000 invested today can bring between nothing and USD4.000 after 12 months.</p>\n\n<p>Q: How do I get principal and return paid ?&nbsp;</p>\n\n<p>&nbsp; A: Through Fundator platform, once margin from product sales is credited to the project account</p>\n\n<p>Q: how to pay the amount agreed with creator to invest in his project ? How is it secured ?</p>\n\n<p>&nbsp; A: With credit card through paypal...</p>\n\n<p>Q: Do all projects get assigned experts and funding? How are expert selected ? How to make sure this is the right team ?</p>\n\n<p>&nbsp; A: Superexpert propose his services for a fee to creator that select him if he has the necessary skills and experience to lead the project. It is Creator responsibility to provide confidence to his investor in the success of the project by chosing the right ressources and team.</p>\n\n<p>Q: As an investor, can I get out of a project before completion ? What happen if I do not agree with Creator and superexpert project management ?</p>\n\n<p>&nbsp; A:</p>\n\n<p>Q: If I do not find project that I like, can I propose product developments themes to fundator ? where and how to propose ?</p>\n\n<p>&nbsp; A:</p>\n');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participants`
--

LOCK TABLES `participants` WRITE;
/*!40000 ALTER TABLE `participants` DISABLE KEYS */;
INSERT INTO `participants` VALUES (1,2,1,'2016-02-22 08:52:12','2016-02-22 08:52:12','2016-02-22 08:52:12',NULL),(2,18,2,'2016-04-01 09:21:12','2016-04-01 09:21:12','2016-04-01 09:21:12',NULL),(3,18,35,'2016-04-01 09:21:12','2016-04-01 09:21:12','2016-04-01 09:21:12',NULL),(4,58,9,'2016-06-12 14:51:59','2016-06-12 14:51:59','2016-06-12 14:51:59',NULL);
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
INSERT INTO `password_resets` VALUES ('benjamin@komprom.com','543187fb071981a6fe36366f4ccf8219220bc49e4cf202bc3b7df35ccb4184d4','2016-04-25 10:16:45'),('udit.cp@gmail.com','f0835ba2a227143f48094c5a5842a5df3eeac6e494e3dc7e1d772babeb01d06c','2016-05-31 21:58:17');
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
INSERT INTO `permissions` VALUES (1,'judge','Can Judge ?','This permission is given to a user who can judge a contest','2016-02-22 08:52:11','2016-02-22 08:52:11');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `point_transactions`
--

DROP TABLE IF EXISTS `point_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `point_transactions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `message` text COLLATE utf8_unicode_ci NOT NULL,
  `pointable_id` int(10) unsigned NOT NULL,
  `pointable_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `amount` double NOT NULL,
  `current` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `point_transactions_pointable_id_pointable_type_index` (`pointable_id`,`pointable_type`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `point_transactions`
--

LOCK TABLES `point_transactions` WRITE;
/*!40000 ALTER TABLE `point_transactions` DISABLE KEYS */;
INSERT INTO `point_transactions` VALUES (1,'',0,'',1000,0,'2016-04-30 23:39:55','2016-04-30 23:39:55');
/*!40000 ALTER TABLE `point_transactions` ENABLE KEYS */;
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
-- Table structure for table `project_expertise`
--

DROP TABLE IF EXISTS `project_expertise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_expertise` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `expertise_id` int(11) NOT NULL,
  `selected_bid_id` int(11) DEFAULT NULL,
  `task` longtext COLLATE utf8_unicode_ci NOT NULL,
  `budget` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lead_time` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `start_date` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_expertise`
--

LOCK TABLES `project_expertise` WRITE;
/*!40000 ALTER TABLE `project_expertise` DISABLE KEYS */;
INSERT INTO `project_expertise` VALUES (28,20,5,NULL,'Make a banner and a flyer for my first campaign','100','2','2016-05-09 16:00:00','2016-05-09 07:52:34','2016-05-09 07:52:34'),(29,26,3,1,'Please do this','100','10','2016-05-03 16:00:00','2016-05-10 11:42:18','2016-05-10 11:56:03'),(30,5,3,NULL,'dfwefwef','1000','10','2016-05-17 16:00:00','2016-05-10 14:08:12','2016-05-10 14:08:13'),(31,30,6,NULL,'Create a billboard','500','10','2016-05-10 16:00:00','2016-05-15 10:43:49','2016-05-15 10:43:49'),(32,31,7,4,'Please make a website for me','1500','20','2016-05-10 16:00:00','2016-05-15 12:16:51','2016-05-15 12:56:45'),(33,1,3,NULL,'write a contract','1000','10','2016-05-17 16:00:00','2016-05-17 14:58:14','2016-05-17 14:58:14'),(34,1,5,NULL,'do banner s','500','15','2016-05-18 16:00:00','2016-05-17 14:58:35','2016-05-17 14:58:35'),(35,33,3,5,'yguigboutvouy','500','15','2016-05-24 16:00:00','2016-05-20 14:31:41','2016-05-20 14:36:30'),(36,34,24,NULL,'Protect a brand \nFile a design patent\nfor France first and all European countries later','2000','40','2016-05-31 16:00:00','2016-05-21 12:45:46','2016-05-21 12:45:46'),(37,34,5,NULL,'Design a PDF flyer to present powerball to distributor','50','30','2016-05-31 16:00:00','2016-05-22 14:50:04','2016-05-22 14:50:04'),(38,34,25,NULL,'prepare a short 2 min movie to present powerball use, fun and nice movie','250','60','2016-05-15 16:00:00','2016-05-22 14:53:04','2016-05-22 14:53:04');
/*!40000 ALTER TABLE `project_expertise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_expertise_bids`
--

DROP TABLE IF EXISTS `project_expertise_bids`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_expertise_bids` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_expertise_id` int(11) NOT NULL,
  `expert_id` int(11) NOT NULL,
  `bid_amount` double(8,2) NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_expertise_bids`
--

LOCK TABLES `project_expertise_bids` WRITE;
/*!40000 ALTER TABLE `project_expertise_bids` DISABLE KEYS */;
INSERT INTO `project_expertise_bids` VALUES (1,29,2,20.00,'Bid Description','2016-05-10 11:51:58','2016-05-10 11:51:58'),(2,30,1,450.00,'my limitation will be to go up to a certain level of','2016-05-10 14:39:27','2016-05-10 14:39:27'),(3,28,1,120.00,'i will do that but i think lead time should be longer','2016-05-11 09:02:59','2016-05-11 09:02:59'),(4,32,2,1200.00,'My best bid','2016-05-15 12:56:24','2016-05-15 12:56:24'),(5,35,1,600.00,'jgcjyvuyg','2016-05-20 14:34:17','2016-05-20 14:34:17');
/*!40000 ALTER TABLE `project_expertise_bids` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_finances`
--

DROP TABLE IF EXISTS `project_finances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_finances` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `fob_manufacturing_cost` double(8,2) NOT NULL,
  `fob_factory_price` double(8,2) NOT NULL,
  `fob_selling_price` double(8,2) NOT NULL,
  `gross_margin` double(8,2) NOT NULL,
  `base_budget` double(8,2) NOT NULL,
  `adjustment_margin` double(8,2) NOT NULL,
  `self_funding_amount` double(8,2) NOT NULL,
  `funding_amount` double(8,2) NOT NULL,
  `payable_intrest` int(11) NOT NULL,
  `payback_month` int(11) NOT NULL,
  `payback_duration` int(11) NOT NULL,
  `payback_duration_extended` int(11) NOT NULL,
  `investors_min` int(11) NOT NULL,
  `investors_max` int(11) NOT NULL,
  `investors_type` int(11) NOT NULL,
  `investors_message_creator` text COLLATE utf8_unicode_ci NOT NULL,
  `investors_message_se` text COLLATE utf8_unicode_ci NOT NULL,
  `mini_plan` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_finances`
--

LOCK TABLES `project_finances` WRITE;
/*!40000 ALTER TABLE `project_finances` DISABLE KEYS */;
INSERT INTO `project_finances` VALUES (1,31,120.00,0.00,150.00,0.00,1200.00,25.00,200.00,1300.00,26,0,8,4,6,20,0,'','','[[{\"sold\":0,\"monthlyGross\":0,\"cummulativeGross\":0,\"cummulativeReturn\":0,\"actualReturn\":0},{\"sold\":0,\"monthlyGross\":0,\"cummulativeGross\":0,\"cummulativeReturn\":0,\"actualReturn\":0},{\"sold\":0,\"monthlyGross\":0,\"cummulativeGross\":0,\"cummulativeReturn\":0,\"actualReturn\":0},{\"sold\":\"30\",\"monthlyGross\":900,\"cummulativeGross\":900,\"cummulativeReturn\":293.3333333333333,\"actualReturn\":293.3333333333333},{\"sold\":\"50\",\"monthlyGross\":1500,\"cummulativeGross\":2400,\"cummulativeReturn\":586.6666666666666,\"actualReturn\":293.3333333333333},{\"sold\":\"300\",\"monthlyGross\":9000,\"cummulativeGross\":11400,\"cummulativeReturn\":880,\"actualReturn\":293.3333333333333},{\"sold\":\"200\",\"monthlyGross\":6000,\"cummulativeGross\":17400,\"cummulativeReturn\":1173.3333333333333,\"actualReturn\":293.3333333333333},{\"sold\":\"400\",\"monthlyGross\":12000,\"cummulativeGross\":29400,\"cummulativeReturn\":1466.6666666666665,\"actualReturn\":293.3333333333333}]]','2016-05-15 12:57:10','2016-05-15 13:36:38'),(2,33,56.00,0.00,80.00,0.00,600.00,27.00,100.00,662.00,24,0,17,5,1,11,0,'iygiukgo8yu','uhih','[[{\"sold\":0,\"monthlyGross\":0,\"cummulativeGross\":0,\"cummulativeReturn\":0,\"actualReturn\":0},{\"sold\":0,\"monthlyGross\":0,\"cummulativeGross\":0,\"cummulativeReturn\":0,\"actualReturn\":0},{\"sold\":0,\"monthlyGross\":0,\"cummulativeGross\":0,\"cummulativeReturn\":0,\"actualReturn\":0},{\"sold\":0,\"monthlyGross\":0,\"cummulativeGross\":0,\"cummulativeReturn\":0,\"actualReturn\":0},{\"sold\":0,\"monthlyGross\":0,\"cummulativeGross\":0,\"cummulativeReturn\":0,\"actualReturn\":0},{\"sold\":0,\"monthlyGross\":0,\"cummulativeGross\":0,\"cummulativeReturn\":0,\"actualReturn\":0},{\"sold\":0,\"monthlyGross\":0,\"cummulativeGross\":0,\"cummulativeReturn\":0,\"actualReturn\":0},{\"sold\":0,\"monthlyGross\":0,\"cummulativeGross\":0,\"cummulativeReturn\":0,\"actualReturn\":0},{\"sold\":0,\"monthlyGross\":0,\"cummulativeGross\":0,\"cummulativeReturn\":0,\"actualReturn\":0},{\"sold\":0,\"monthlyGross\":0,\"cummulativeGross\":0,\"cummulativeReturn\":0,\"actualReturn\":0},{\"sold\":0,\"monthlyGross\":0,\"cummulativeGross\":0,\"cummulativeReturn\":0,\"actualReturn\":0},{\"sold\":0,\"monthlyGross\":0,\"cummulativeGross\":0,\"cummulativeReturn\":0,\"actualReturn\":0}],[{\"sold\":0,\"monthlyGross\":0,\"cummulativeGross\":0,\"cummulativeReturn\":0,\"actualReturn\":0},{\"sold\":0,\"monthlyGross\":0,\"cummulativeGross\":0,\"cummulativeReturn\":0,\"actualReturn\":0},{\"sold\":0,\"monthlyGross\":0,\"cummulativeGross\":0,\"cummulativeReturn\":0,\"actualReturn\":0},{\"sold\":0,\"monthlyGross\":0,\"cummulativeGross\":0,\"cummulativeReturn\":0,\"actualReturn\":0},{\"sold\":0,\"monthlyGross\":0,\"cummulativeGross\":0,\"cummulativeReturn\":0,\"actualReturn\":0}]]','2016-05-20 14:37:19','2016-05-20 14:39:03');
/*!40000 ALTER TABLE `project_finances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_investment_bids`
--

DROP TABLE IF EXISTS `project_investment_bids`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_investment_bids` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `investor_id` int(11) NOT NULL,
  `bid_amount_min` double(8,2) NOT NULL,
  `bid_amount_max` double(8,2) NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_investment_bids`
--

LOCK TABLES `project_investment_bids` WRITE;
/*!40000 ALTER TABLE `project_investment_bids` DISABLE KEYS */;
INSERT INTO `project_investment_bids` VALUES (1,31,6,200.00,1300.00,'I can help you to sell it in Italy','select','2016-05-15 13:53:20','2016-05-15 13:54:13');
/*!40000 ALTER TABLE `project_investment_bids` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `creator_id` int(11) NOT NULL,
  `draft` tinyint(1) NOT NULL DEFAULT '1',
  `state` float NOT NULL DEFAULT '0',
  `thumbnail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `start_time` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` mediumtext COLLATE utf8_unicode_ci,
  `market` mediumtext COLLATE utf8_unicode_ci,
  `geography` text COLLATE utf8_unicode_ci,
  `price` double(8,2) DEFAULT NULL,
  `language` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `display` tinyint(1) NOT NULL,
  `product_category_id` int(11) DEFAULT NULL,
  `innovation_category_id` int(11) DEFAULT NULL,
  `super_expert_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,2,1,0.9,'','2016-02-22 00:00:00',365,'Fundator','Lorem Ipsum','<p>eurpe</p>','wherever',0.00,'Enlgih',0,NULL,NULL,1,'0000-00-00 00:00:00','2016-05-17 14:57:37'),(2,1,1,4,'','2016-04-02 02:20:55',60,'Project Name','<p>New project description </p><p><br/></p>','<p>Market description</p>','wherever',1000.00,'dsd',0,NULL,NULL,1,'2016-04-02 06:20:55','2016-04-11 11:33:57'),(5,2,1,2.9,'','2016-04-04 00:00:00',60,'Boule magique','<p>elle fait des glaces de boules</p>','<p>France pour ceux qui aiment les boules</p>','wherever',56.00,'hhh',0,NULL,NULL,1,'2016-04-04 09:35:46','2016-05-12 14:49:07'),(10,6,1,3,'0','2016-04-11 09:26:39',60,'connected plush','<p>plush that will record something</p>','<p>all european market</p>','wherever',30.00,'english',1,NULL,NULL,NULL,'2016-04-11 13:26:39','2016-04-16 15:09:34'),(14,6,1,3,'0','2016-04-15 09:16:22',60,'chinese teacher robot','<p>chinese teacher robot gives free lessons</p>','<p>education</p>','wherever',0.00,'english',0,NULL,NULL,NULL,'2016-04-15 13:16:22','2016-04-15 13:20:38'),(18,2,1,3,'0','2016-04-19 00:00:00',60,'connected umbrella','<p>itfv8yuivi7tub98yoi</p>','<p>usa</p>','wherever',0.00,'english',1,NULL,NULL,NULL,'2016-04-19 04:21:58','2016-05-14 15:30:27'),(19,2,1,0.9,'0','2016-04-25 08:23:12',60,'Playfu; chair for kids','<p>a chair that  makes kids happy</p>','<p>all countries where you have kids</p>','wherever',39.00,'english',0,NULL,NULL,NULL,'2016-04-25 12:23:12','2016-04-25 12:25:49'),(20,1,1,3,'0','2016-05-09 03:48:20',60,'My first project','<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod<br/>tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,<br/>quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo<br/>consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse<br/>cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non<br/>proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br/></p>','<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod<br/>tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,<br/>quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo<br/>consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse<br/>cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non<br/>proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br/></p>','countries',10000.00,'English',0,NULL,NULL,1,'2016-05-09 07:48:20','2016-05-09 07:52:52'),(26,1,1,4.1,'0','2016-05-10 07:29:55',60,'Connected Umbrella','<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod<br/>tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,<br/>quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo<br/>consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse<br/>cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non<br/>proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br/></p>','<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod<br/>tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,<br/>quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo<br/>consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse<br/>cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non<br/>proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br/></p>','wherever',100.00,'English',0,NULL,NULL,1,'2016-05-10 11:29:55','2016-05-14 15:30:09'),(30,1,1,3,'0','2016-05-15 06:30:36',60,'My First Brief','<blockquote><p>Project descriptionsd</p></blockquote>','<p>dsa</p>','wherever',123.00,'English',0,NULL,NULL,1,'2016-05-15 10:30:36','2016-05-15 10:44:08'),(31,1,0,5.9,'0','2016-05-15 00:00:00',60,'OLED Mugs','<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod<br/>tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,<br/>quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo<br/>consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse<br/>cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non<br/>proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br/></p>','<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod<br/>tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,<br/>quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo<br/>consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse<br/>cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non<br/>proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br/></p>','wherever',100.00,'English',1,NULL,NULL,1,'2016-05-15 12:11:20','2016-05-15 13:58:35'),(32,2,1,0,'0','2016-05-19 02:41:18',60,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,'2016-05-19 06:41:18','2016-05-19 06:41:18'),(33,2,1,5,'0','2016-05-20 10:28:00',60,'beer connected mug','<p>hhibliygliygliyg</p>','<p>iyguogiygiy</p>','wherever',59.00,'en',0,NULL,NULL,1,'2016-05-20 14:28:00','2016-05-20 14:39:36'),(34,8,1,3,'0','2016-05-21 06:14:56',60,'Speederball','<p>Toy that can be played with 2 players.</p>','<p>Worldwide</p><p>Dedicated to outdoor activities</p><p><br/></p>','wherever',19.00,'en',0,NULL,NULL,1,'2016-05-21 10:14:56','2016-05-22 14:55:27'),(35,10,1,0.9,'0','2016-05-30 12:42:08',60,'Test','<p>Test project</p>','<p>Just a test project</p>','wherever',120.00,'English',0,NULL,NULL,NULL,'2016-05-30 16:42:08','2016-05-30 16:42:43'),(36,13,1,0,'0','2016-06-08 04:07:24',60,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,'2016-06-08 08:07:24','2016-06-08 08:07:24'),(37,11,1,0,'0','2016-06-08 04:08:37',60,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,'2016-06-08 08:08:37','2016-06-08 08:08:37'),(38,1,1,0,'0','2016-06-08 04:45:50',60,'Afterfeed','<p>I have a charticle platform www.afterfeed.com, I need funding for this IDEA.</p>',NULL,'wherever',999999.99,'English',0,NULL,NULL,NULL,'2016-06-08 08:45:50','2016-06-08 08:46:57'),(39,1,1,0,'0','2016-06-08 04:58:04',60,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,'2016-06-08 08:58:04','2016-06-08 08:58:04'),(40,1,1,2,'0','2016-06-08 04:58:44',60,'Afterfeed','<p>Its a charticle Platform, user can earn money while writing stories.</p>',NULL,'wherever',999999.99,'English',0,NULL,NULL,1,'2016-06-08 08:58:44','2016-06-08 09:15:28'),(41,12,1,0,'0','2016-06-09 17:45:52',60,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,'2016-06-09 21:45:52','2016-06-09 21:45:52');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `push_associations`
--

DROP TABLE IF EXISTS `push_associations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `push_associations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `push_associations`
--

LOCK TABLES `push_associations` WRITE;
/*!40000 ALTER TABLE `push_associations` DISABLE KEYS */;
INSERT INTO `push_associations` VALUES (34,104,'undefined','undefined','2016-06-08 07:59:03','2016-06-08 07:59:03'),(35,1,'undefined','undefined','2016-06-08 10:31:00','2016-06-08 10:31:00'),(36,2,'undefined','undefined','2016-06-09 08:09:59','2016-06-09 08:09:59'),(37,1,'ios','13sdadsad','2016-06-09 16:09:52','2016-06-09 16:09:52'),(38,100,'ios','13sdadsad','2016-06-10 10:52:58','2016-06-10 10:52:58'),(39,77,'undefined','undefined','2016-06-12 07:27:03','2016-06-12 07:27:03'),(40,60,'undefined','undefined','2016-06-12 07:41:51','2016-06-12 07:41:51'),(41,101,'iOS','60a22a0a9afee37786c3c62af3c1407c62274e730dd57aecadac10ce0e0d8845','2016-06-12 09:57:17','2016-06-12 09:57:17'),(42,101,'undefined','undefined','2016-06-12 13:30:47','2016-06-12 13:30:47');
/*!40000 ALTER TABLE `push_associations` ENABLE KEYS */;
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
INSERT INTO `role_user` VALUES (1,1),(2,1),(17,1),(28,1),(29,1),(57,1),(60,1),(76,1),(78,1),(92,1),(100,1),(102,1),(105,1),(1,2),(2,2),(28,2),(60,2),(1,4),(2,4),(3,4),(4,4),(5,4),(6,4),(7,4),(28,4),(60,4),(61,4),(100,4);
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
INSERT INTO `roles` VALUES (1,'creator','Creator','User is the creator of projects on the website','2016-02-22 08:52:11','2016-02-22 08:52:11'),(2,'expert','Expert','User is the expert who will work on the projects','2016-02-22 08:52:11','2016-02-22 08:52:11'),(3,'super_expert','Super Expert','Super experts manage all projects while working with creators on each step','2016-02-22 08:52:11','2016-02-22 08:52:11'),(4,'investor','Investor','','2016-02-22 08:52:11','2016-02-22 08:52:11');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `setting_key` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `setting_value` text COLLATE utf8_unicode_ci,
  UNIQUE KEY `key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES ('share_value','s:4:\"0.72\";');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `share_bids`
--

DROP TABLE IF EXISTS `share_bids`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `share_bids` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `share_listing_id` int(11) NOT NULL,
  `num_shares` int(11) NOT NULL,
  `bid_amount` double(8,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share_bids`
--

LOCK TABLES `share_bids` WRITE;
/*!40000 ALTER TABLE `share_bids` DISABLE KEYS */;
INSERT INTO `share_bids` VALUES (22,2,1,800,0.95,'2016-05-15 14:24:21','2016-05-15 14:24:21'),(23,2,1,250,0.96,'2016-05-15 14:24:32','2016-05-15 14:24:32'),(24,100,1,0,0.00,'2016-05-29 23:31:16','2016-05-29 23:31:16'),(25,2,1,3000,3.45,'2016-05-30 13:19:34','2016-05-30 13:19:34'),(26,60,1,200,2.00,'2016-06-07 10:02:13','2016-06-07 10:02:13'),(27,60,1,500,1.00,'2016-06-12 07:43:00','2016-06-12 07:43:00');
/*!40000 ALTER TABLE `share_bids` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `share_listings`
--

DROP TABLE IF EXISTS `share_listings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `share_listings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `start_date` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `num_shares` int(11) NOT NULL,
  `reserve_amount` double(8,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share_listings`
--

LOCK TABLES `share_listings` WRITE;
/*!40000 ALTER TABLE `share_listings` DISABLE KEYS */;
INSERT INTO `share_listings` VALUES (1,0,'Shares Auction : Round 2','2016-07-01 00:00:00',26,1000,0.75,'2016-03-25 04:59:34','2016-05-30 05:42:14');
/*!40000 ALTER TABLE `share_listings` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'Communication',''),(2,'Relationship Management',''),(3,'Marketing and Sales',''),(4,'Project Management',''),(5,'Problem-Solving',''),(6,'Ruby ',''),(7,'ASP.NET',''),(8,'AJAX',''),(9,'Objective-C',''),(10,'PHP',''),(11,'Python',''),(12,'Perl ',''),(13,'C',''),(14,'C#',''),(15,'XML',''),(16,'C++',''),(17,'JavaScript',''),(18,'HTML',''),(19,'Java',''),(20,'SQL ',''),(21,'Translation',''),(22,'laywer',''),(23,'brand protection','');
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
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `threads`
--

LOCK TABLES `threads` WRITE;
/*!40000 ALTER TABLE `threads` DISABLE KEYS */;
INSERT INTO `threads` VALUES (1,'#1 Entry #1 : Thistle Wisent','2016-02-22 08:52:12','2016-04-02 21:19:32',NULL),(2,'#1 Entry #1 : Thistle Wisent','2016-02-22 08:52:12','2016-02-22 08:52:12',NULL),(3,'#2 Entry #1 : Thistle Wisent','2016-02-22 08:52:12','2016-04-01 09:16:09',NULL),(4,'#2 Entry #1 : Thistle Wisent','2016-02-22 08:52:12','2016-02-22 08:52:12',NULL),(5,'#3 Entry #1 : Tulip Ithomiid','2016-02-22 08:52:12','2016-02-22 08:52:12',NULL),(6,'#3 Entry #1 : Tulip Ithomiid','2016-02-22 08:52:12','2016-02-22 08:52:12',NULL),(7,'#4 Entry #1 : Tulip Ithomiid','2016-02-22 08:52:12','2016-02-28 07:25:47',NULL),(8,'#4 Entry #1 : Tulip Ithomiid','2016-02-22 08:52:12','2016-02-22 08:52:12',NULL),(9,'#5 Entry #1 : Iris Oystercatcher','2016-02-22 08:52:12','2016-05-10 14:00:39',NULL),(10,'#5 Entry #1 : Iris Oystercatcher','2016-02-22 08:52:12','2016-02-22 08:52:12',NULL),(11,'#6 Entry #1 : Iris Oystercatcher','2016-02-22 08:52:12','2016-04-02 20:22:47',NULL),(12,'#6 Entry #1 : Iris Oystercatcher','2016-02-22 08:52:12','2016-02-22 08:52:12',NULL),(13,'#7 Entry #1 : Poppy Acipenser','2016-02-22 08:52:12','2016-02-22 08:52:12',NULL),(14,'#7 Entry #1 : Poppy Acipenser','2016-02-22 08:52:12','2016-02-22 08:52:12',NULL),(15,'#8 Entry #1 : Poppy Acipenser','2016-02-22 08:52:12','2016-02-22 08:52:12',NULL),(16,'#8 Entry #1 : Poppy Acipenser','2016-02-22 08:52:12','2016-02-22 08:52:12',NULL),(17,'#9 Udit\'s Entry','2016-04-01 09:21:12','2016-04-03 13:14:22',NULL),(18,'#9 Udit\'s Entry','2016-04-01 09:21:12','2016-04-01 09:21:12',NULL),(19,'#10 Udit\'s Entry','2016-04-26 13:48:37','2016-05-29 23:28:14',NULL),(20,'#10 Udit\'s Entry','2016-04-26 13:48:37','2016-04-26 13:48:37',NULL),(21,'Discussion with expert :  on 9','2016-05-09 04:32:54','2016-05-09 04:32:54',NULL),(22,'Discussion with expert :  on 29','2016-05-10 11:51:45','2016-05-10 11:51:45',NULL),(23,'Discussion with expert :  on 30','2016-05-10 14:38:28','2016-05-10 14:38:28',NULL),(24,'Discussion with expert :  on 28','2016-05-11 09:00:54','2016-05-11 09:00:54',NULL),(25,'Public board for project : 20','2016-05-15 09:38:43','2016-05-15 09:38:43',NULL),(26,'Public board for project : 5','2016-05-15 09:38:43','2016-05-15 09:38:43',NULL),(27,'Public board for project : 30','2016-05-15 10:30:36','2016-05-15 10:30:36',NULL),(28,'Public board for project : ','2016-05-15 10:42:26','2016-05-15 10:42:26',NULL),(29,'Public board for project : 28','2016-05-15 10:43:56','2016-05-15 10:43:56',NULL),(30,'Public board for project : 31','2016-05-15 12:11:20','2016-05-15 12:11:20',NULL),(31,'Public board for project : 26','2016-05-15 12:47:36','2016-05-15 12:47:36',NULL),(32,'Discussion with expert :  on 32','2016-05-15 12:55:24','2016-05-15 12:56:00',NULL),(33,'Discussion with investor : 6 on 31','2016-05-15 13:53:20','2016-05-15 13:55:18',NULL),(34,'Public board for project : 1','2016-05-17 14:57:03','2016-05-17 14:57:03',NULL),(35,'Public board for project : 3','2016-05-17 15:05:09','2016-05-17 15:05:09',NULL),(36,'Public board for project : 13','2016-05-17 15:05:33','2016-05-17 15:05:33',NULL),(37,'Public board for project : 16','2016-05-17 15:05:45','2016-05-17 15:05:45',NULL),(38,'Public board for project : 15','2016-05-17 15:05:58','2016-05-17 15:05:58',NULL),(39,'Public board for project : 8','2016-05-17 15:08:14','2016-05-17 15:08:14',NULL),(40,'Public board for project : 12','2016-05-17 15:08:34','2016-05-17 15:08:34',NULL),(41,'Public board for project : 27','2016-05-17 15:09:06','2016-05-17 15:09:06',NULL),(42,'Public board for project : 32','2016-05-19 06:41:18','2016-05-19 06:41:18',NULL),(43,'Public board for project : 33','2016-05-20 14:28:00','2016-05-20 14:28:00',NULL),(44,'Discussion with expert :  on 35','2016-05-20 14:32:35','2016-05-20 14:33:13',NULL),(45,'Public board for project : 34','2016-05-21 10:14:56','2016-05-21 10:14:56',NULL),(46,'Public board for project : 2','2016-05-27 07:51:16','2016-05-27 07:51:16',NULL),(47,'Discussion with expert :  on 31','2016-05-27 10:20:57','2016-05-27 10:20:57',NULL),(48,'Discussion with expert :  on 36','2016-05-27 10:26:28','2016-05-27 10:26:28',NULL),(49,'Public board for project : 35','2016-05-30 16:42:08','2016-05-30 16:42:08',NULL),(50,'Public board for project : 36','2016-06-08 08:07:24','2016-06-08 08:07:24',NULL),(51,'Public board for project : 37','2016-06-08 08:08:37','2016-06-08 08:08:37',NULL),(52,'Public board for project : 38','2016-06-08 08:45:50','2016-06-08 08:45:50',NULL),(53,'Public board for project : 39','2016-06-08 08:58:04','2016-06-08 08:58:04',NULL),(54,'Public board for project : 40','2016-06-08 08:58:44','2016-06-08 08:58:44',NULL),(55,'Public board for project : 41','2016-06-09 21:45:52','2016-06-09 21:45:52',NULL),(56,'Public board for project : 19','2016-06-10 15:44:38','2016-06-10 15:44:38',NULL),(57,'#11 Kapil\'s Entry','2016-06-12 14:51:59','2016-06-12 15:19:21',NULL),(58,'#11 Kapil\'s Entry','2016-06-12 14:51:59','2016-06-12 14:51:59',NULL);
/*!40000 ALTER TABLE `threads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message` text COLLATE utf8_unicode_ci NOT NULL,
  `amount` double NOT NULL,
  `current` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,2,'<p>Initial Deposit</p>\n',500,500,'2016-03-20 08:17:42','2016-03-20 08:17:42'),(2,1,'<p>Testing</p>\n',100,100,'2016-03-20 08:20:51','2016-03-20 08:20:51'),(3,1,'<p>deduct fees</p>\n',-5,95,'2016-03-20 08:21:03','2016-03-20 08:21:03'),(4,2,'<p>2nd deposit</p>\n',1000,1500,'2016-03-20 10:29:48','2016-03-20 10:29:48'),(5,1,'<p>My Money</p>\n',1000,1095,'2016-05-15 14:20:12','2016-05-15 14:20:12'),(6,1,'<p>Deposit&nbsp;</p>\n',50,1145,'2016-06-12 14:28:47','2016-06-12 14:28:47');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
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
  `thumbnail_image_url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `needs_reset` tinyint(1) NOT NULL,
  `registered` tinyint(1) NOT NULL,
  `facebook` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `linkedin` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `google` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `twitter` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `dob` date NOT NULL,
  `age_gate` tinyint(1) NOT NULL,
  `country_origin` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `country_residence` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `contact_number` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `contact_number_country_code` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `contact_time` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `confirmed` tinyint(1) NOT NULL DEFAULT '0',
  `phone_verified` tinyint(1) NOT NULL,
  `confirmation_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bio` longtext COLLATE utf8_unicode_ci NOT NULL,
  `position` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,0,NULL,'Kapil','Karda','investor','kkarda77@gmail.com','$2y$10$.lW353aZL58JnTEVo4J64uaEBa2XPtelrekh9xCkL9ekTrxze/B9m',0,1,NULL,'BMGC2Q3Kqt',NULL,NULL,'','0000-00-00',1,'Array','Array','9981101934','91','9-6',1,1,NULL,'','Co-Founder and CTO at Engineer Master Solutions Pvt. Ltd.',NULL,'2016-06-02 08:10:28','2016-06-13 13:17:01'),(2,28,NULL,'Benjamin','Vignon','creator','benjamin@komprom.com','$2y$10$v0O9trTwT/NDw5MBNdJ/jOfu3kb6l.1LEJ17TXrbSJsJPkZij7Q1.',0,1,'10153687758201704','29srD-EHB3',NULL,NULL,'','0000-00-00',0,'China','China','18616767542','86','9-6',1,1,NULL,'\"I love new products, find new technology to  create new features giving people new experience \"','',NULL,'2016-02-22 08:52:11','2016-06-12 13:54:47'),(3,0,NULL,'Christophe Brissiaud','','investor','christophe@fundator.co','$2y$10$Sdek0rwC6fI6xvSExisbWuu74m/ywdsx.4w209L6D.kvV8jp.tAsy',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',1,0,NULL,'','',NULL,'2016-02-22 08:52:11','2016-02-22 08:52:11'),(4,0,NULL,'Laura C.','Wilton','investor','LauraCWilton@teleworm.us','$2y$10$ZbNV7KQiy7nEO.0jg98coe85E57YV49HtIoXeyERfr.pKTcIS1PMm',0,1,NULL,NULL,NULL,NULL,'female','0000-00-00',1,'us','us','+1-510-489-3184','','9-6',1,0,NULL,'','',NULL,'2016-02-22 08:52:11','2016-02-22 08:52:11'),(5,0,NULL,'Kristy R.','Black','investor','KristyRBlack@armyspy.com','$2y$10$ZbNV7KQiy7nEO.0jg98coe85E57YV49HtIoXeyERfr.pKTcIS1PMm',0,1,NULL,NULL,NULL,NULL,'female','0000-00-00',1,'france','france','+33 03.54.10.61.10','','9-6',1,0,NULL,'','',NULL,'2016-02-22 08:52:11','2016-02-22 08:52:11'),(6,0,NULL,'Marcus R.','Didomenico','investor','MarcusRDidomenico@dayrep.com','$2y$10$ZbNV7KQiy7nEO.0jg98coe85E57YV49HtIoXeyERfr.pKTcIS1PMm',0,1,NULL,NULL,NULL,NULL,'female','0000-00-00',1,'france','france','+33 03.54.10.61.10','','9-6',1,0,NULL,'','',NULL,'2016-02-22 08:52:11','2016-02-22 08:52:11'),(7,0,NULL,'Rosalie L.','Silva','investor','RosalieLSilva@jourrapide.com','$2y$10$ZbNV7KQiy7nEO.0jg98coe85E57YV49HtIoXeyERfr.pKTcIS1PMm',0,1,NULL,NULL,NULL,NULL,'female','0000-00-00',1,'france','france','+33 03.54.10.61.10','','9-6',1,0,NULL,'','',NULL,'2016-02-22 08:52:12','2016-02-22 08:52:12'),(8,0,NULL,'Bb','','','bennie@fundator.co','$2y$10$ZDsHjegU1mLXgFJQJOPRGubcHuf1t/D4BWQW25JVaslIXa5GHyetS',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',1,0,'Tzc7KqJBkg8mpDeeywU4DyWZlDVxVG','','',NULL,'2016-02-24 06:44:20','2016-02-24 06:44:20'),(14,0,NULL,'5ive Technology','','','5iveinfotech@gmail.com','',0,1,NULL,'vT8uGVoJrc',NULL,NULL,'','0000-00-00',0,'','','','','',1,0,NULL,'','',NULL,'2016-02-26 14:48:46','2016-02-26 14:48:46'),(15,0,NULL,'Vivek Jain','','','vvkjain0@gmail.com','$2y$10$Syaw35b1/1mQg/yDI1KO/OGN5NKL8J70v.qmf.rim9g46ZG5FLVW.',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',1,0,NULL,'','',NULL,'2016-02-26 15:09:24','2016-02-26 15:10:51'),(17,0,NULL,'shubham','ojha','creator','shubhamojha042@gmail.com','$2y$10$TGgYtoD5qTVplDTG6iYkyux8spAs0QjPrHWgVbguQ1fckYwSSvY3S',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',1,'India','India','8085818377','','9-6',1,0,'9I35X0C6UHG3CrPi1eAQnMtWgs0eCh','','',NULL,'2016-02-27 16:42:26','2016-02-29 18:33:39'),(28,0,NULL,'Benjamin','Vignon','expert','','',0,1,'10153687758201704',NULL,NULL,NULL,'','0000-00-00',1,'China','China','3333333333','','9-6',1,0,NULL,'','',NULL,'2016-02-28 20:07:31','2016-02-28 20:11:51'),(29,0,NULL,'Tatjana','Solevic','creator','plus.arhs@gmail.com','$2y$10$67Y.KB/zK4idck751jZBgeZghd0PS/tHcz5m/9tO1oXC0Crfwf9eC',0,1,NULL,NULL,'117560662984293416699',NULL,'','0000-00-00',1,'Croatia','Serbia and Montenegro','00381644330195','','6-9',1,0,NULL,'','',NULL,'2016-02-28 21:40:27','2016-05-27 19:51:56'),(38,0,NULL,'Kapil','','','kkardaji@gmail.com','$2y$10$r1O.dBg/Ok/ylxxqGZ7YXu5sGv431Wmlq7SKSOz3Bejwyrjibvxlu',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',1,0,NULL,'','',NULL,'2016-03-15 10:43:19','2016-03-15 10:44:08'),(40,0,NULL,'Kapil Karda','','','kkarda@gmail.com','$2y$10$SxvUYQ1Y3pSKE3/Zedej1uf.WuwlNq6zMZJKfZd3CO0kidiC914Ia',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',1,0,'UJT3obHmLf9JcX3iGiWiUi8twNQ9a2','','',NULL,'2016-03-15 16:37:01','2016-03-15 16:37:01'),(41,0,NULL,'Kapil','','','kkardanewmain@gmail.com','$2y$10$6/6szJkyL84vDb1H4bY7geCc7XM8OWnhdGsQgtw/WBv0qoh1rcsYW',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',1,0,'0b1skoZBbLfn8M4LIAyQHh1pbB6Yw9','','',NULL,'2016-03-16 10:17:08','2016-03-16 10:17:08'),(42,0,NULL,'cedric','','','cedric.tfc@gmail.com','$2y$10$528jeffuTSl9MZAT6M6Sluu2wJZJoQPcAbRlp0dssTyXVrMjfC1je',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',1,0,NULL,'','',NULL,'2016-03-16 11:41:08','2016-03-16 11:41:27'),(44,0,NULL,'sudarshan','','','sudarshan@gmail.com','$2y$10$dNCbu4c2SYXC9ZO/DXCtOeTZ9BoVXklum93nLr5GaBbJRXG.klJwC',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',1,0,'XNOPeGI55BzDhSDyNIvCNyc48byjop','','',NULL,'2016-03-22 11:27:13','2016-03-22 11:27:14'),(50,0,NULL,'Fly','Flyerson','','flyflyerson@gmail.com','',0,1,NULL,NULL,'116216154224981479863',NULL,'','0000-00-00',0,'','','','','',1,0,NULL,'','',NULL,'2016-03-30 17:02:00','2016-03-30 17:02:00'),(51,0,NULL,'Julien Pace','','investor','pacejulien@hotmail.com','$2y$10$inMFyGqXvBTTYE8NzPVaj.EzC5F3L/ip0WVGN91M9kMQ7yVmuMDqG',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',1,0,NULL,'','',NULL,'2016-04-07 09:32:51','2016-04-11 13:23:41'),(57,18,NULL,'Benjamin','Vi','creator','benjamin.vignon@konaxis.com','$2y$10$MaUy6SJgx7/jp2z0qiCmMOChp6PQNpHJ3cHqY/JmeM.fc47J32cB2',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',1,'China','China','333333','','6-9',1,0,NULL,'\"I am one of the best creator of all times\"','',NULL,'2016-04-11 12:40:50','2016-04-11 13:25:49'),(59,0,NULL,'Udit Virwani','','','coder364@gmail.com','$2y$10$CnmEN2olebTWZJSgTOu2/urDz4leT14Dppshc/BHDJ4NKC.n7LcuK',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',1,0,'lZpXIZ0hY8EHDf1hMD2Dd95YXpe04G','','',NULL,'2016-04-12 15:20:13','2016-04-12 15:20:13'),(60,42,NULL,'Jean-Bernard','ANTOINE','expert','jbantoine@163.com','$2y$10$iK9f855uEfSJlBNxeTrOl.nqf9wFO4W2mjUZTmnmg.FcY.de0Pde2',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',1,'Array','Array','15901695273','86','9-6',1,1,'uA6FGBCgBsPzTM3jHt6HODYpjw8Yex','','',NULL,'2016-04-26 13:52:52','2016-06-06 16:05:40'),(61,0,NULL,'Chirag','Veerwani','investor','chiragveerwani@gmail.com','',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',1,'Array','Array','13127873661','','6-9',1,0,NULL,'','Lead Designer at Bhartiya Community Shanghai',NULL,'2016-04-28 04:53:20','2016-04-28 04:54:52'),(62,0,NULL,'Kapil Karda','','','kkkarda@gmail.com','$2y$10$OwCBS6GFuw/GuUZSmBxCy.u6LiELt7GpqGuvniVZzmIF/vL5dm98q',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',1,0,'fpnujje637wRYOAQXVyRM5D5yZd3QX','','',NULL,'2016-05-12 14:06:50','2016-05-12 14:06:50'),(63,0,NULL,'','','','kkarda1@gmail.com','$2y$10$NuIClzJqCjNnuMRmtgD4QusK4HvhGFa5WO./KhOQf8jUACOiZz/UW',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',1,0,'Law9VBPb3HIQs0cB2TCLBCofOiQ75n','','',NULL,'2016-05-13 09:50:01','2016-05-13 09:50:01'),(64,0,NULL,'','','','newkarda@gmail.com','$2y$10$.fxwgCBGwl7R3V5p.Rw4sOODHbPMfCEJhOWJ8U0pQo.4zRHKvJgcK',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','91-9981101934','','',1,0,'KYJqkLmNIAxFu0GDxSJuBSXYMfrR9b','','',NULL,'2016-05-13 10:51:35','2016-05-13 10:51:35'),(65,0,NULL,'','','','newonekarda@gmail.com','$2y$10$aOiWZ2gkwlVC4REzUAkroOaujWa8EfzBfHMBzSEtwq.BInk4Giqq6',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','91-9981101934','','',1,0,'9mf4kpuzFB6UL0j1cxY9xPgt9Mdx9O','','',NULL,'2016-05-13 10:52:21','2016-05-13 10:52:21'),(66,0,NULL,'','','','kkardanewji@gmail.com','$2y$10$JfWJuJedA.FOaSz6Rrmsfu/hXmFUe3RG7B/XfL08q0GdMv0LPdA5G',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','91-9981101934','','',1,0,'VU5rk7iWdgc66HShnfpOfEbs4kuhas','','',NULL,'2016-05-13 10:59:37','2016-05-13 10:59:37'),(67,0,NULL,'','','','cakshaychouhan@gmail.com','$2y$10$/Xq4wbIS3NcHvQ7Ta7I9suGnB.EXUA7LX9L2CMA3t3wDaipRI3Ygy',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','91-8085305205','','',1,0,'tYx4E47c6hwV526rwMYNzo8Pw2RWoI','','',NULL,'2016-05-13 11:11:07','2016-05-13 11:11:07'),(68,0,NULL,'Chris','','','purchaser@purchasinchina.com','$2y$10$aGRx4L4f9dV/QAZNgXckuO4lyv98nkGvIbneQMdREJZZJ4BMOQtEW',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',1,0,'FIgBbBlw3zGTWIkL0KgjPLRRvBZWVN','','',NULL,'2016-05-15 21:53:58','2016-05-15 21:53:58'),(69,0,NULL,'','','','akshaychouhan7860@gmail.com','$2y$10$Jb1I7CUBv53YHM/lalWxCOlepTkEqNIs3C2BrUgj2PtT.P/NehalK',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','91-8085305205','','',1,0,'mls6trqkVZnMwBZuPug8eCRfG5IkSB','','',NULL,'2016-05-16 08:46:41','2016-05-16 08:46:41'),(71,0,NULL,'','','','newkardaji@gmail.com','$2y$10$WTNMx1fT5AxW4XO8xWlpN.XcfUPoHrce7UzTWQJeo9KzRZHxy6lz.',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',1,0,'NmGimkhfnwFT6x1wQUOA4MwVaa7lP3','','',NULL,'2016-05-17 08:04:11','2016-05-17 08:04:11'),(72,0,NULL,'Kapil Karda','','','newkarda123@gmail.com','$2y$10$0IDCGOFfzs9MBzCj0Dx4MO7Nvrjg1vLiG1gyitNUcOLB4A6cgzTQa',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',1,0,'1PXt6yEWnFUBrbARKQ1WaGxfoBx2IX','','',NULL,'2016-05-17 17:10:26','2016-05-17 17:10:26'),(73,0,NULL,'Kapil Karda','','','kardakapil@gmail.com','$2y$10$7KeOVCFK2Y7d.W22ShOQ4eD3uryJjNyDh2e/jsOzJpNSNkpv2vnaS',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',1,0,'ZqOhZGZ4jG5TmzwHsxQBtXepW3NELY','','',NULL,'2016-05-18 08:01:16','2016-05-18 08:01:16'),(75,0,NULL,'Franck Urwicz','','','franck@prodiges.com','',0,1,NULL,'Vla5gOcvRs',NULL,NULL,'','0000-00-00',0,'','','','','',1,0,NULL,'','Dirigeant',NULL,'2016-05-18 17:05:15','2016-05-18 17:05:15'),(76,43,NULL,'Andre','Chaudy','creator','andre@komprom.com','$2y$10$KFGJ5F1.Dx8hCRQ6CBYV2O5yZTw0M9PREEFpZ7v.EFqRf02Yztu16',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',1,'Array','Array','1111111111','','6-9',1,0,'CcAEaoE29GZzhuCyMlN7z9qGVZRi4M','','',NULL,'2016-05-20 06:27:27','2016-05-21 10:37:47'),(77,47,NULL,'Francis','RIQUET','expert','fr4vks@gmail.com','$2y$10$yNey.imJXnyxihldWydPZ.n5mJuRhNNuurc3etz54LNmvo2etsvCC',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',1,'Array','Array','18516308084','','9-6',1,0,'R34ksYw7d6kZf5zesbO72gXPbNcqvj','','',NULL,'2016-05-20 11:19:32','2016-06-01 10:04:52'),(78,44,NULL,'Vasyl','Ponietaikin','creator','ponetaikin@gmail.com','',0,1,'1179927652060229',NULL,NULL,NULL,'','0000-00-00',1,'Array','Array','665183000','380','6-9',1,0,NULL,'','',NULL,'2016-05-23 00:32:57','2016-05-23 01:05:02'),(79,0,NULL,'','','','coder365@gmail.com','$2y$10$GVrB5m3vnrgv.ESmdukOweELwlTgLH3W7kjcKbjsKBM3y92G/QVh.',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',0,0,'8YyhlLLrCXKOSPvtSREwMCOhHfJQ4r','','',NULL,'2016-05-23 08:53:37','2016-05-23 08:53:37'),(80,0,NULL,'','','','coder366@gmail.com','$2y$10$ivd6XCyJ4RmfmQZ9HX.iyuz21lTECcajzo8Kd8F5XoljWSEUCbXxO',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',0,0,'SjK8CBJ0RClgjfTp2HqTwdRl6Lq7T5','','',NULL,'2016-05-23 08:55:58','2016-05-23 08:55:58'),(81,0,NULL,'','','','coder367@gmail.com','$2y$10$/CPT.JN6NjbYjOepS36Qm.6U67xp/LXmNIA58ogtWqEaLh3DEu76u',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',0,0,'DMIbbqRMpEreIV5d7emg3VUItR4iH9','','',NULL,'2016-05-23 09:00:08','2016-05-23 09:00:09'),(82,0,NULL,'','','','kardakapil123@gmail.com','$2y$10$ONF9bNAPtnsCd4aks1GafOW59SlaOibJHId/KILjG23RLl/BpO1sy',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',0,0,'cXASgDsfe9aRVWaA7tkPtXG55aa48p','','',NULL,'2016-05-23 10:24:12','2016-05-23 10:24:12'),(83,0,NULL,'','','','kkardanew1234@gmail.com','$2y$10$3f19ebsEy9ZbTV/r0CSlM.0RyNkJX1ThDOr1mKha5L94CSe5S2sL.',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',0,0,'gE9OigpxnwlwT3sqWbHlmnUmyggZ73','','',NULL,'2016-05-24 08:09:36','2016-05-24 08:09:36'),(84,0,NULL,'','','','test@eskaytech.com','$2y$10$a5qM4cf5lqmjgebOZaLePOFl0xJSOf69uTeoJmBzxnzaShOifVPci',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',0,0,'wMRKAzzpUbEU97YDH6iwoZw9bqANIQ','','',NULL,'2016-05-25 03:47:09','2016-05-25 03:47:09'),(92,0,NULL,'Ankur','Tiwari','creator','tiwariankur77@gmail.com','$2y$10$opJC48ft3.p.eUVa7r8kHuP2TiKxxzRh9x3m6N3eUzYnoiOs9zw0K',0,1,'1088771167857097',NULL,NULL,NULL,'','0000-00-00',1,'Array','Array','9826423503','91','9-6',1,0,NULL,'','',NULL,'2016-05-26 07:59:12','2016-05-30 16:43:24'),(94,0,NULL,'','','','bennie@komprom.com','$2y$10$2SDVjCKXMeFThr8gqK4nOe4gvHaOCTyEC3uyDRd9qZeE2GLuTexUi',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',0,0,'w8HwJBzAkoljESzRnRU3z8J6Vmbqic','','',NULL,'2016-05-27 07:31:02','2016-05-27 07:31:02'),(95,0,NULL,'','','','uddyydyd@eskaytech.com','$2y$10$XBBMivgmiAbWPiQiOsryYOGg4HFGpDexmw/NXps3y.2v4T/D3zilq',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',0,0,'OMSiHGk9s3cEI07Qu6r65vHBLlU2HE','','',NULL,'2016-05-27 08:07:17','2016-05-27 08:07:17'),(96,0,NULL,'','','','udutshsh@eskaytech.com','$2y$10$/SZOj6Wum0goPhZjQjgb9./uLZLHCJYBbgV8vBGcjU.IC0zfsrM5W',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',0,0,'Gfeu12RUfuZk5lvTIlJW8xBXPAUGZP','','',NULL,'2016-05-27 08:09:16','2016-05-27 08:09:16'),(100,46,NULL,'Udit','Virwani','investor','udit@eskaytech.com','$2y$10$kb1mRTVb4BdPwIkJntyfw.WacFxWN/.uBV5hUJko1PV35.ovGQ4d6',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',1,'Array','Array','18217096217','86','6-9',1,1,NULL,'','',NULL,'2016-05-28 15:32:57','2016-06-12 13:36:22'),(101,0,NULL,'Udit Virwani','','','udit.cp@gmail.com','',0,1,NULL,'o-Qk8q3XT9',NULL,NULL,'','0000-00-00',0,'','','','','',1,0,NULL,'','Lead Developer at Digital Creative Asia',NULL,'2016-05-31 05:28:23','2016-05-31 05:28:23'),(102,0,NULL,'','','investor','lyutakova@gmail.com','$2y$10$iPRlkaom4rVrl9nGK7Vd8OumU4oYbuTMgm9RowPai2ccV8PnPHQTa',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',1,1,NULL,'','',NULL,'2016-05-31 09:59:53','2016-05-31 12:19:26'),(103,0,NULL,'','','','flyflyerson2@gmail.com','$2y$10$ZL5pi6pK5jb4SGv.RgqxEOtnlv5IsWobDh335ag7B52oz.EMG.L7y',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',0,0,'n7ruvh2Z09UYlaCiJLLf9ARNCial61','','',NULL,'2016-06-01 05:07:18','2016-06-01 05:07:18'),(105,48,NULL,'Eline','Zhang','creator','cashier01@komprom.com','$2y$10$tZ0p/uNUE2gBdsodQLxNP.ImXqXz/X5be5gVfGtfj2YleL2vlURee',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'Array','Array','18616767542','','9-6',1,0,NULL,'','',NULL,'2016-06-08 07:48:30','2016-06-08 08:10:08'),(106,57,NULL,'benjamin@fundator.co','','','benjamin@fundator.co','$2y$10$08dtjoF0W0QDK/V70tGD6eiXKAlOHZrdnO3m/W9GoAhFmp93uBC02',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',1,0,NULL,'','',NULL,'2016-06-08 11:15:34','2016-06-08 11:20:50'),(107,0,NULL,'anna','','','lyutakova@rambler.ru','$2y$10$PHgJahTllS49TM15z1FatOClGx0aQfhLsvdEpGG74eBqfnrsovxUW',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',0,0,'uNLQfkD6eZ9NCz1BRi2NCd1UUGLxYJ','','',NULL,'2016-06-09 21:47:41','2016-06-09 21:47:41'),(108,0,NULL,'test123','','','tanya-ponomarenko@rambler.ru','$2y$10$3hFqxyrZx4xepNQAH4DuzubjfitFSsqeHIre7RbBJriWujK21OXYe',0,1,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',1,0,NULL,'','',NULL,'2016-06-09 21:56:05','2016-06-09 21:56:32'),(109,0,NULL,'','','','uditvirwani@gmail.com','$2y$10$t6Ph/TBQfsswReUIK/f6mOZGtbVdYBj5z0mXYE0cctuWojZ04S9Ca',0,0,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',0,0,'5glwaPsRqixo7kZTwgg80d2TnEn5a2','','',NULL,'2016-06-12 13:35:31','2016-06-12 13:35:31'),(110,0,NULL,'','','','j1@komprom.com','$2y$10$ve0UMP89kDsSiS5.2a4DFuzPfBBQWS..qFSZFU0usqO68zVqJVBSW',0,0,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',0,0,'j5srIq8OT4sD4nXPXFfL73ln0zHXJE','','',NULL,'2016-06-12 13:53:51','2016-06-12 13:53:51'),(111,0,NULL,'','','','emsindia@gmail.com','$2y$10$PzMJQjzpDxhfgwBLkhRODeZGXAn1NcJEqmkasl3JHNn8jR7QX1AF.',0,0,NULL,NULL,NULL,NULL,'','0000-00-00',0,'','','','','',0,0,'sot2frEogHr1SbA94rw1DboOZeK5dM','','',NULL,'2016-06-13 13:16:33','2016-06-13 13:16:33');
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

-- Dump completed on 2016-06-13  5:19:27
