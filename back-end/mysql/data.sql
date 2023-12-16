CREATE DATABASE IF NOT EXISTS yuccanleadfaq;
USE yuccanleadfaq;


-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 05, 2023 at 10:04 AM
-- Server version: 8.0.31
-- PHP Version: 8.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `yuccanleadfaq`
--

-- --------------------------------------------------------

--
-- Table structure for table `authentication_myuser`
--

CREATE TABLE `authentication_myuser` (
  `id` bigint NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `authentication_myuser`
--

INSERT INTO `authentication_myuser` (`id`, `password`, `last_login`, `email`, `is_active`, `is_admin`) VALUES
(1, 'pbkdf2_sha256$600000$cxFr1N716wOOw5q4sLYgxa$7k9yszOS5EhyjVU6HkutJq+8H1T9b0drUAykNrwdjyY=', '2023-04-29 09:52:36.636233', 'admin@admin.com', 1, 1),
(18, 'pbkdf2_sha256$600000$2BhalrPfJp9NSPwWn0wMyg$yVw9Dis4w6km/c52hj4ylC+yGTV7JUzQK6zcjK+B0sU=', NULL, 'amineammar20@icloud.com', 0, 0),
(19, 'pbkdf2_sha256$600000$diki98DqZbnTwnkvbY8xA5$z7Eu1CvoMK0HkJqOZYlis2e1mZydeIGo+UY6F04EmPM=', NULL, 'amineammar20@icloud.comf', 0, 0),
(20, 'pbkdf2_sha256$600000$ZhIXatMrEj80tP3XVl7NFh$SLUl4mkgwb3J0tosj9YXT2wSdNfysH2wTLegCEov9F4=', NULL, 'amineammar20@icloud.fr', 0, 0),
(21, 'pbkdf2_sha256$600000$8lz8eQ2VW5UpuHg90HVzz3$DBLw4eQKg5M1W5v65UBtg32KLfkHAhMt600V30QsBtI=', NULL, 'client@icloud.com', 0, 0),
(22, 'pbkdf2_sha256$600000$iecGEqrZrthTXYsv0CrHlE$dgLuZXr8VfYbw6qbwYRW9BerUNnC1T3VYHRrFeb8pnM=', NULL, 'client@icloud.fr', 0, 0),
(23, 'pbkdf2_sha256$600000$yrKLfbgiQZ0Nuchl7Qfaop$vBofYxhbKifxWdQuieW8/XOLIFgqueVxH+Qy57bWqeU=', NULL, 'amineammar20@icloud.de', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `authtoken_token`
--

CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `authtoken_token`
--

INSERT INTO `authtoken_token` (`key`, `created`, `user_id`) VALUES
('145544c64bb92046589ce7944bb583a2da441ecf', '2023-05-02 11:58:28.962791', 23),
('57ccf0b4fbdbf7e227a5f67699f853eaa24839ba', '2023-05-01 18:38:02.031841', 19),
('5e3f4ab2821ed32167e68eea4001e6fbb52b5434', '2023-05-01 00:56:58.040076', 18),
('b85ca329af77de6641bf4327d0e03a8493972162', '2023-05-01 18:39:27.253104', 21),
('d627e0d8055659e3c895a6cb0bb36ac920503d2c', '2023-04-29 10:59:56.995463', 1),
('e20d28e7f1deed4dcf95bde8b01c95dfa290a09a', '2023-05-01 18:41:32.334593', 22),
('f7f39bbaa7f9e75fc38ceed8bf2efa59328307f4', '2023-05-01 18:38:22.786721', 20);

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add my user', 1, 'add_myuser'),
(2, 'Can change my user', 1, 'change_myuser'),
(3, 'Can delete my user', 1, 'delete_myuser'),
(4, 'Can view my user', 1, 'view_myuser'),
(5, 'Can add log entry', 2, 'add_logentry'),
(6, 'Can change log entry', 2, 'change_logentry'),
(7, 'Can delete log entry', 2, 'delete_logentry'),
(8, 'Can view log entry', 2, 'view_logentry'),
(9, 'Can add permission', 3, 'add_permission'),
(10, 'Can change permission', 3, 'change_permission'),
(11, 'Can delete permission', 3, 'delete_permission'),
(12, 'Can view permission', 3, 'view_permission'),
(13, 'Can add group', 4, 'add_group'),
(14, 'Can change group', 4, 'change_group'),
(15, 'Can delete group', 4, 'delete_group'),
(16, 'Can view group', 4, 'view_group'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add Token', 7, 'add_token'),
(26, 'Can change Token', 7, 'change_token'),
(27, 'Can delete Token', 7, 'delete_token'),
(28, 'Can view Token', 7, 'view_token'),
(29, 'Can add token', 8, 'add_tokenproxy'),
(30, 'Can change token', 8, 'change_tokenproxy'),
(31, 'Can delete token', 8, 'delete_tokenproxy'),
(32, 'Can view token', 8, 'view_tokenproxy'),
(33, 'Can add question', 9, 'add_question'),
(34, 'Can change question', 9, 'change_question'),
(35, 'Can delete question', 9, 'delete_question'),
(36, 'Can view question', 9, 'view_question'),
(37, 'Can add answer', 10, 'add_answer'),
(38, 'Can change answer', 10, 'change_answer'),
(39, 'Can delete answer', 10, 'delete_answer'),
(40, 'Can view answer', 10, 'view_answer');

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint UNSIGNED NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(2, 'admin', 'logentry'),
(4, 'auth', 'group'),
(3, 'auth', 'permission'),
(1, 'authentication', 'myuser'),
(7, 'authtoken', 'token'),
(8, 'authtoken', 'tokenproxy'),
(5, 'contenttypes', 'contenttype'),
(10, 'questions', 'answer'),
(9, 'questions', 'question'),
(6, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2023-04-29 09:47:32.482254'),
(2, 'authentication', '0001_initial', '2023-04-29 09:47:32.503137'),
(3, 'admin', '0001_initial', '2023-04-29 09:47:32.584896'),
(4, 'admin', '0002_logentry_remove_auto_add', '2023-04-29 09:47:32.590323'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2023-04-29 09:47:32.597274'),
(6, 'contenttypes', '0002_remove_content_type_name', '2023-04-29 09:47:32.652882'),
(7, 'auth', '0001_initial', '2023-04-29 09:47:32.793596'),
(8, 'auth', '0002_alter_permission_name_max_length', '2023-04-29 09:47:32.830822'),
(9, 'auth', '0003_alter_user_email_max_length', '2023-04-29 09:47:32.837205'),
(10, 'auth', '0004_alter_user_username_opts', '2023-04-29 09:47:32.845673'),
(11, 'auth', '0005_alter_user_last_login_null', '2023-04-29 09:47:32.852672'),
(12, 'auth', '0006_require_contenttypes_0002', '2023-04-29 09:47:32.856518'),
(13, 'auth', '0007_alter_validators_add_error_messages', '2023-04-29 09:47:32.863138'),
(14, 'auth', '0008_alter_user_username_max_length', '2023-04-29 09:47:32.869983'),
(15, 'auth', '0009_alter_user_last_name_max_length', '2023-04-29 09:47:32.878249'),
(16, 'auth', '0010_alter_group_name_max_length', '2023-04-29 09:47:32.895126'),
(17, 'auth', '0011_update_proxy_permissions', '2023-04-29 09:47:32.903214'),
(18, 'auth', '0012_alter_user_first_name_max_length', '2023-04-29 09:47:32.911294'),
(19, 'authentication', '0002_myuser_is_staff', '2023-04-29 09:47:32.939701'),
(20, 'sessions', '0001_initial', '2023-04-29 09:47:32.964023'),
(21, 'authentication', '0003_remove_myuser_is_staff', '2023-04-29 09:48:16.700234'),
(22, 'authentication', '0004_alter_myuser_is_active_alter_myuser_is_admin', '2023-04-29 10:59:47.797449'),
(23, 'authtoken', '0001_initial', '2023-04-29 10:59:47.842139'),
(24, 'authtoken', '0002_auto_20160226_1747', '2023-04-29 10:59:47.860518'),
(25, 'authtoken', '0003_tokenproxy', '2023-04-29 10:59:47.865422'),
(26, 'authentication', '0005_alter_myuser_is_admin', '2023-04-29 18:06:32.497578'),
(28, 'questions', '0001_initial', '2023-04-29 18:30:03.958473'),
(29, 'questions', '0002_remove_question_answer_question_user_and_more', '2023-04-29 18:30:04.171863');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('dy23h4lrpdlilmxgden95o9gircpvt0h', '.eJxVjMsOwiAUBf-FtSG8Hy7d9xvIhQtSNZCUdmX8d9ukC93OzDlvEmBba9hGXsKM5Eo4ufyyCOmZ2yHwAe3eaeptXeZIj4SedtCpY37dzvbvoMKo-zrKxIX2mXFQTHjLii1WO--8xlQA0Rm1I9BoFHqZhQFtEHnMRjNpkXy-2fo36g:1pshFs:e4lQ6xwoDUetI1W_yaIf_UHvV75fsh7gRr1f5aWhyTQ', '2023-05-13 09:52:36.638676');

-- --------------------------------------------------------

--
-- Table structure for table `questions_answer`
--

CREATE TABLE `questions_answer` (
  `id` bigint NOT NULL,
  `answer` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `question_id` bigint NOT NULL,
  `user_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `questions_answer`
--

INSERT INTO `questions_answer` (`id`, `answer`, `created_at`, `updated_at`, `question_id`, `user_id`) VALUES
(13, 'Pour effectuer un don à une organisation caritative via Yuccan Lead, il vous suffit de suivre les étapes suivantes : sélectionnez l\'organisation de votre choix dans la liste des partenaires caritatifs de l\'application, choisissez le montant que vous souhaitez donner, et validez votre don. Vous pourrez ainsi faire un geste solidaire tout en bénéficiant des avantages du parrainage digital.', '2023-05-01 01:06:05.500247', '2023-05-01 01:06:05.500282', 7, 1),
(14, 'Yuccan Lead vous permet de faire un don à une organisation caritative de votre choix en quelques clics. Pour cela, rendez-vous sur l\'onglet \"Parrainage solidaire\" de l\'application, choisissez l\'organisation à laquelle vous souhaitez faire un don, et indiquez le montant que vous souhaitez donner. Yuccan Lead se chargera ensuite de transférer votre don à l\'organisation choisie.', '2023-05-01 01:06:20.642008', '2023-05-01 01:06:20.642040', 7, 1),
(15, 'Pour effectuer un don à une organisation caritative via Yuccan Lead, vous devez tout d\'abord vous assurer que l\'organisation en question est partenaire de l\'application. Si c\'est le cas, rendez-vous sur l\'onglet \"Parrainage solidaire\", sélectionnez l\'organisation de votre choix, et indiquez le montant de votre don. Vous pourrez alors choisir de recevoir votre récompense en argent ou de la transformer en don solidaire.', '2023-05-01 01:06:31.416187', '2023-05-01 01:06:31.416218', 7, 1),
(16, 'Si vous avez gagné des récompenses monétaires sur Yuccan Lead grâce à votre participation à des programmes de parrainage, vous pouvez également choisir de transformer ces récompenses en dons à des organisations caritatives.', '2023-05-01 18:14:01.406737', '2023-05-01 18:14:01.406833', 7, 1),
(17, 'Pour convertir vos récompenses en dons pour le parrainage solidaire sur Yuccan Lead, vous devez suivre ces étapes :\nOuvrez l\'application mobile Yuccan Lead.\nCliquez sur l\'onglet \"Récompenses\" en bas de l\'écran d\'accueil.\nSélectionnez la récompense que vous souhaitez convertir en don.\nCliquez sur l\'option \"Convertir en don\".\nSélectionnez l\'organisation caritative de votre choix dans la liste proposée.\nChoisissez le montant que vous souhaitez donner.\nConfirmez votre choix en cliquant sur le bouton \"Confirmer\".', '2023-05-01 18:20:23.153651', '2023-05-01 18:20:23.153691', 19, 1);

-- --------------------------------------------------------

--
-- Table structure for table `questions_question`
--

CREATE TABLE `questions_question` (
  `id` bigint NOT NULL,
  `question` varchar(255) NOT NULL,
  `title` longtext NOT NULL,
  `subject` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `questions_question`
--

INSERT INTO `questions_question` (`id`, `question`, `title`, `subject`, `created_at`, `updated_at`, `user_id`) VALUES
(3, 'Est-ce que le parrainage est imposable ?\n', 'parrainage', 'service', '2023-04-29 20:03:25.387550', '2023-04-29 20:03:25.387585', 1),
(4, 'Pourquoi récompenser en cash plutôt qu’avec un chèque cadeaux ?\n', 'parrainage', 'service', '2023-04-29 20:04:38.595490', '2023-04-29 20:04:38.595521', 1),
(5, 'Quels types de professionnels sont référencés sur l\'application ?', 'parrainage', 'service', '2023-04-29 20:08:10.330387', '2023-04-29 20:08:10.330491', 1),
(7, 'Comment puis-je effectuer un don à une organisation caritative via Yuccan Lead ?', 'parrainage', 'service', '2023-04-29 20:09:08.426523', '2023-05-01 18:11:21.404272', 1),
(19, 'Comment puis-je convertir mes récompenses en dons pour le parrainage solidaire sur Yuccan Lead ?', 'titre expthrthr', 'assistance', '2023-05-01 18:16:14.736655', '2023-05-02 16:55:41.356492', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authentication_myuser`
--
ALTER TABLE `authentication_myuser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `authtoken_token`
--
ALTER TABLE `authtoken_token`
  ADD PRIMARY KEY (`key`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_authentication_myuser_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `questions_answer`
--
ALTER TABLE `questions_answer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questions_answer_question_id_45884d67_fk_questions_question_id` (`question_id`),
  ADD KEY `questions_answer_user_id_b3ad5f22_fk_authentication_myuser_id` (`user_id`);

--
-- Indexes for table `questions_question`
--
ALTER TABLE `questions_question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questions_question_user_id_e2ae6bb3_fk_authentication_myuser_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authentication_myuser`
--
ALTER TABLE `authentication_myuser`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `questions_answer`
--
ALTER TABLE `questions_answer`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `questions_question`
--
ALTER TABLE `questions_question`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `authtoken_token`
--
ALTER TABLE `authtoken_token`
  ADD CONSTRAINT `authtoken_token_user_id_35299eff_fk_authentication_myuser_id` FOREIGN KEY (`user_id`) REFERENCES `authentication_myuser` (`id`);

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`);
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_authentication_myuser_id` FOREIGN KEY (`user_id`) REFERENCES `authentication_myuser` (`id`);

--
-- Constraints for table `questions_answer`
--
ALTER TABLE `questions_answer`
  ADD CONSTRAINT `questions_answer_question_id_45884d67_fk_questions_question_id` FOREIGN KEY (`question_id`) REFERENCES `questions_question` (`id`);
  ADD CONSTRAINT `questions_answer_user_id_b3ad5f22_fk_authentication_myuser_id` FOREIGN KEY (`user_id`) REFERENCES `authentication_myuser` (`id`);

--
-- Constraints for table `questions_question`
--
ALTER TABLE `questions_question`
  ADD CONSTRAINT `questions_question_user_id_e2ae6bb3_fk_authentication_myuser_id` FOREIGN KEY (`user_id`) REFERENCES `authentication_myuser` (`id`);
