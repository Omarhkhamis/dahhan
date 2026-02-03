-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 14, 2026 at 12:09 PM
-- Server version: 10.6.23-MariaDB-cll-lve
-- PHP Version: 8.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dahhan_landing_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer_msgs`
--

CREATE TABLE `customer_msgs` (
  `eid` int(10) UNSIGNED NOT NULL,
  `cname` varchar(75) DEFAULT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `email` varchar(75) DEFAULT NULL,
  `title` varchar(75) DEFAULT NULL,
  `msg_text` varchar(1000) DEFAULT NULL,
  `dt_create` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

-- --------------------------------------------------------

--
-- Table structure for table `ms_pages`
--

CREATE TABLE `ms_pages` (
  `pid` int(10) UNSIGNED NOT NULL,
  `internal_name` varchar(45) DEFAULT NULL,
  `ar_page_name` varchar(75) DEFAULT NULL,
  `en_page_name` varchar(75) DEFAULT NULL,
  `icon` varchar(75) DEFAULT NULL,
  `is_multi_pages` tinyint(1) DEFAULT 0,
  `page_order` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

--
-- Dumping data for table `ms_pages`
--

INSERT INTO `ms_pages` (`pid`, `internal_name`, `ar_page_name`, `en_page_name`, `icon`, `is_multi_pages`, `page_order`) VALUES
(1, 'home_page', 'الصفحة الرئيسية', 'Home page', 'home.png', 0, 1),
(2, 'website_configs', 'الإعدادات', 'Configurations', 'config.png', 0, 10);

-- --------------------------------------------------------

--
-- Table structure for table `ms_paragraphs`
--

CREATE TABLE `ms_paragraphs` (
  `pid` int(10) UNSIGNED NOT NULL,
  `fk_page_id` int(11) DEFAULT NULL,
  `internal_name` varchar(45) DEFAULT NULL,
  `ar_para_name` varchar(150) DEFAULT NULL,
  `en_para_name` varchar(150) DEFAULT NULL,
  `order_in_page` int(11) DEFAULT NULL,
  `is_pattern` tinyint(1) DEFAULT 0,
  `sp_page` varchar(75) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

--
-- Dumping data for table `ms_paragraphs`
--

INSERT INTO `ms_paragraphs` (`pid`, `fk_page_id`, `internal_name`, `ar_para_name`, `en_para_name`, `order_in_page`, `is_pattern`, `sp_page`) VALUES
(1, 2, 'web_configs', 'إعدادات الموقع', 'Configs', 1, 0, ''),
(2, 1, 'mp_top_photo', 'الصورة العلوية', '', 1, 0, ''),
(3, 1, 'contact_us', 'تواصل معنا لنساعدك', '', 2, 0, ''),
(4, 1, 'endless_smiles', 'ابتسامات لا تنسى', '', 3, 0, ''),
(5, 1, 'draw_smile_jnry', 'رحلة رسم الابتسامة', '', 4, 0, ''),
(6, 1, 'dont_leave', 'لاتغادر قبل استشاراتنا', '', 5, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `ms_sub_paragraphs`
--

CREATE TABLE `ms_sub_paragraphs` (
  `spid` int(10) UNSIGNED NOT NULL,
  `fk_para_id` int(11) DEFAULT NULL,
  `internal_name` varchar(45) DEFAULT NULL,
  `ar_sub_para_name` varchar(150) DEFAULT NULL,
  `en_sub_para_name` varchar(150) DEFAULT NULL,
  `spType` int(11) DEFAULT NULL,
  `max_size` int(11) DEFAULT NULL,
  `param1` varchar(45) DEFAULT NULL,
  `order_in_page` int(11) DEFAULT NULL,
  `repeat_group_intrnl_name` varchar(45) DEFAULT NULL,
  `repeat_group_view_name` varchar(150) DEFAULT NULL,
  `is_pattern` int(11) DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

--
-- Dumping data for table `ms_sub_paragraphs`
--

INSERT INTO `ms_sub_paragraphs` (`spid`, `fk_para_id`, `internal_name`, `ar_sub_para_name`, `en_sub_para_name`, `spType`, `max_size`, `param1`, `order_in_page`, `repeat_group_intrnl_name`, `repeat_group_view_name`, `is_pattern`) VALUES
(1, 1, 'cfgs_wpass', 'كلمة السر لتسجيل الدخول', 'Login password', 0, 40, 'en_text', 1, '', '', 0),
(3, 2, 'mp_top_photo_line1_ar', 'السطر الأول بالعربي', '', 0, 100, 'ar_text', 2, '', '', 0),
(4, 2, 'mp_top_photo_line1_en', 'السطر الأول بالإنكليزي', '', 0, 100, 'en_text', 3, '', '', 0),
(5, 2, 'mp_top_photo_line2_ar', 'السطر الثاني بالعربي', '', 0, 100, 'ar_text', 4, '', '', 0),
(6, 2, 'mp_top_photo_line2_en', 'السطر الثاني بالإنكليزي', '', 0, 100, 'en_text', 5, '', '', 0),
(8, 3, 'cu_text_ar', 'النص بالعربي', '', 1, 1000, 'ar_text,4', 2, '', '', 0),
(9, 3, 'cu_text_en', 'النص بالإنكليزي', '', 1, 1000, 'en_text,4', 3, '', '', 0),
(10, 3, 'cu_logo1', 'أيقونة 1', '', 2, 1000000, 'image/*', 4, '', '', 0),
(11, 3, 'cu_logo1_name_ar', 'اسم الأيقونة 1 بالعربي', '', 0, 100, 'ar_text', 5, '', '', 0),
(12, 3, 'cu_logo1_name_en', 'اسم الأيقونة 1 بالإنكليزي', '', 0, 100, 'en_text', 6, '', '', 0),
(13, 3, 'cu_logo2', 'أيقونة 2', '', 2, 1000000, 'image/*', 7, '', '', 0),
(14, 3, 'cu_logo2_name_ar', 'اسم الأيقونة 2 بالعربي', '', 0, 100, 'ar_text', 8, '', '', 0),
(15, 3, 'cu_logo2_name_en', 'اسم الأيقونة 2 بالإنكليزي', '', 0, 100, 'en_text', 9, '', '', 0),
(16, 4, 'es_text_ar', 'النص بالعربي', '', 1, 3000, 'ar_text,3', 1, 'es_photo_0001IUSKO', 'الفقرة', 0),
(17, 4, 'es_text_en', 'النص بالإنكليزي', '', 1, 3000, 'en_text,4', 2, 'es_photo_0001IUSKO', 'الفقرة', 0),
(18, 4, 'es_photo_before', 'الصورة قبل', '', 2, 3000000, 'image/*', 3, 'es_photo_0001IUSKO', 'الفقرة', 0),
(19, 5, 'dsj_photo1', 'الصورة 1', '', 2, 3000000, 'image/*', 1, '', '', 0),
(20, 5, 'dsj_photo1_text_ar', 'نص الصورة 1 بالعربي', '', 0, 200, 'ar_text', 2, '', '', 0),
(21, 5, 'dsj_photo1_text_en', 'نص الصورة 1 بالإنكليزي', '', 0, 200, 'en_text', 3, '', '', 0),
(22, 5, 'dsj_photo2', 'الصورة 2', '', 2, 3000000, 'image/*', 4, '', '', 0),
(23, 5, 'dsj_photo2_text_ar', 'نص الصورة 2 بالعربي', '', 0, 200, 'ar_text', 5, '', '', 0),
(24, 5, 'dsj_photo2_text_en', 'نص الصورة 2 بالإنكليزي', '', 0, 200, 'en_text', 6, '', '', 0),
(25, 5, 'dsj_photo3', 'الصورة 3', '', 2, 3000000, 'image/*', 7, '', '', 0),
(26, 5, 'dsj_photo3_text_ar', 'نص الصورة 3 بالعربي', '', 0, 200, 'ar_text', 8, '', '', 0),
(27, 5, 'dsj_photo3_text_en', 'نص الصورة 3 بالإنكليزي', '', 0, 200, 'en_text', 9, '', '', 0),
(28, 5, 'dsj_photo4', 'الصورة 4', '', 2, 3000000, 'image/*', 10, '', '', 0),
(29, 5, 'dsj_photo4_text_ar', 'نص الصورة 4 بالعربي', '', 0, 200, 'ar_text', 11, '', '', 0),
(30, 5, 'dsj_photo4_text_en', 'نص الصورة 4 بالإنكليزي', '', 0, 200, 'en_text', 12, '', '', 0),
(31, 5, 'dsj_photo5', 'الصورة 5', '', 2, 3000000, 'image/*', 13, '', '', 0),
(32, 5, 'dsj_photo5_text_ar', 'نص الصورة 5 بالعربي', '', 0, 200, 'ar_text', 14, '', '', 0),
(33, 5, 'dsj_photo5_text_en', 'نص الصورة 5 بالإنكليزي', '', 0, 200, 'en_text', 15, '', '', 0),
(35, 6, 'dl_side_photo', 'الصورة الجانبية المدورة', '', 2, 3000000, 'image/*', 2, '', '', 0),
(36, 6, 'dl_text_ar', 'النص بالعربي', '', 1, 1000, 'ar_text,3', 3, '', '', 0),
(37, 6, 'dl_text_en', 'النص بالإنكليزي', '', 1, 1000, 'en_text,3', 4, '', '', 0),
(38, 4, 'es_photo_after', 'الصورة بعد', '', 2, 3000000, 'image/*', 4, 'es_photo_0001IUSKO', 'الفقرة', 0),
(49, 4, 'es_photo_before_SBXB1', 'الصورة قبل', '', 2, 3000000, 'image/*', 3, 'es_photo_0002BG5U9', 'الفقرة', 0),
(41, 1, 'cfgs_whatsapp', 'رقم الواتس أب', '', 0, 30, 'en_text', 2, '', '', 0),
(50, 4, 'es_photo_after_E1L97', 'الصورة بعد', '', 2, 3000000, 'image/*', 4, 'es_photo_0002BG5U9', 'الفقرة', 0),
(48, 4, 'es_text_en_GRNP0', 'النص بالإنكليزي', '', 1, 3000, 'en_text,4', 2, 'es_photo_0002BG5U9', 'الفقرة', 0),
(47, 4, 'es_text_ar_B368N', 'النص بالعربي', '', 1, 3000, 'ar_text,3', 1, 'es_photo_0002BG5U9', 'الفقرة', 0),
(51, 4, 'es_text_ar_EKWEF', 'النص بالعربي', '', 1, 3000, 'ar_text,3', 1, 'es_photo_0003Z1E7E', 'الفقرة', 0),
(52, 4, 'es_text_en_7RH70', 'النص بالإنكليزي', '', 1, 3000, 'en_text,4', 2, 'es_photo_0003Z1E7E', 'الفقرة', 0),
(53, 4, 'es_photo_before_25BP7', 'الصورة قبل', '', 2, 3000000, 'image/*', 3, 'es_photo_0003Z1E7E', 'الفقرة', 0),
(54, 4, 'es_photo_after_P4OS2', 'الصورة بعد', '', 2, 3000000, 'image/*', 4, 'es_photo_0003Z1E7E', 'الفقرة', 0),
(55, 4, 'es_text_ar_A6U21', 'النص بالعربي', '', 1, 3000, 'ar_text,3', 1, 'es_photo_0004B4S5T', 'الفقرة', 0),
(56, 4, 'es_text_en_UYVP8', 'النص بالإنكليزي', '', 1, 3000, 'en_text,4', 2, 'es_photo_0004B4S5T', 'الفقرة', 0),
(57, 4, 'es_photo_before_A3M68', 'الصورة قبل', '', 2, 3000000, 'image/*', 3, 'es_photo_0004B4S5T', 'الفقرة', 0),
(58, 4, 'es_photo_after_7Y555', 'الصورة بعد', '', 2, 3000000, 'image/*', 4, 'es_photo_0004B4S5T', 'الفقرة', 0),
(59, 4, 'es_text_ar_IAG0S', 'النص بالعربي', '', 1, 3000, 'ar_text,3', 1, 'es_photo_0005J11DX', 'الفقرة', 0),
(60, 4, 'es_text_en_F8748', 'النص بالإنكليزي', '', 1, 3000, 'en_text,4', 2, 'es_photo_0005J11DX', 'الفقرة', 0),
(61, 4, 'es_photo_before_F9ANV', 'الصورة قبل', '', 2, 3000000, 'image/*', 3, 'es_photo_0005J11DX', 'الفقرة', 0),
(62, 4, 'es_photo_after_Z57DA', 'الصورة بعد', '', 2, 3000000, 'image/*', 4, 'es_photo_0005J11DX', 'الفقرة', 0),
(68, 1, 'cfgs_whats_msg_en', 'رسالة الواتس أب بالإنكليزي', '', 0, 500, 'en_text', 4, '', '', 0),
(67, 1, 'cfgs_whats_msg_ar', 'رسالة الواتس أب بالعربي', '', 0, 500, 'ar_text', 3, '', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `ms_sub_para_elements`
--

CREATE TABLE `ms_sub_para_elements` (
  `eid` int(10) UNSIGNED NOT NULL,
  `fk_sub_para_id` int(11) DEFAULT NULL,
  `contents` varchar(5000) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

--
-- Dumping data for table `ms_sub_para_elements`
--

INSERT INTO `ms_sub_para_elements` (`eid`, `fk_sub_para_id`, `contents`) VALUES
(1, 1, '123qwe'),
(3, 3, 'أفضل خيار لزراعة الأسنان في إسطنبول'),
(4, 4, 'Best choice for dental implant in Istanbul'),
(5, 5, 'احصل على ابتسامة هوليود التي تستحقها '),
(6, 6, 'Get the Hollywood smile you deserve'),
(8, 8, 'رحلة استعادة ثقتك بنفسك\r\nمع زراعة الأسنان المبتكرة وابتسامة هوليود المميزة \r\nمع دهان دنت في إسطنبول.'),
(9, 9, 'A journey to regain your self-confidence\r\nWith innovative dental implants and a distinctive Hollywood smile\r\nWith Dr. Dahan Dent in Istanbul.'),
(10, 10, '../../images/cu_logo1/cu_logo1_F4PJ4.png'),
(11, 11, 'زراعة الاسنان'),
(12, 12, 'Dental implants'),
(13, 13, '../../images/cu_logo2/cu_logo2_QKMAO.png'),
(14, 14, 'هوليود سمايل'),
(15, 15, 'Hollywood Smile'),
(16, 16, 'لم أكن أتخيل يومًا أن بإمكاني الحصول على إبتسامة هوليوود الرائعة حتى قابلت الدكتور محمد دهان.\r\n بفضله تمكنت من استعادة ثقتي بنفسي والحصول على إبتسامة لا تصدق. لقد كان الفريق في المركز احترافي ومهني جدًا،\r\n وقدم لي الرعاية والاهتمام اللازمين. أنا سعيد جدًا بالنتائج وأشعر بفخر كبير عندما ابتسم الآن. \r\nشكرًا للدكتور محمد دهان وفريقه الرائع!'),
(17, 17, 'I never imagined that I could have a wonderful Hollywood smile until I met Dr. Mohammed Dahan. Thanks to him, I regained my self-confidence and got an incredible smile. The team at the center was very professional and competent, providing me with the necessary care and attention. I am extremely happy with the results and feel great pride when I smile now. Thanks to Dr. Mohammed Dahan and his amazing team!'),
(18, 18, '../../images/es_photo_before/es_photo_before_IDDR8.jpg'),
(19, 19, '../../images/dsj_photo1/dsj_photo1_PR987.png'),
(20, 20, 'استشارة وحجز موعد'),
(21, 21, 'Appointment'),
(22, 22, '../../images/dsj_photo2/dsj_photo2_FYFEO.png'),
(23, 23, 'المواصلات مؤمنة'),
(24, 24, 'VIP transport'),
(25, 25, '../../images/dsj_photo3/dsj_photo3_REB0K.png'),
(26, 26, 'حجز فندق'),
(27, 27, 'Hotel booking'),
(28, 28, '../../images/dsj_photo4/dsj_photo4_TCV1B.png'),
(29, 29, 'زيارة العيادة'),
(30, 30, 'Clinic visit'),
(31, 31, '../../images/dsj_photo5/dsj_photo5_5QUI1.png'),
(32, 32, 'ابتسامة'),
(33, 33, 'Beautiful smile'),
(35, 35, '../../images/dl_side_photo/dl_side_photo_F9YEL.png'),
(36, 36, 'ابتسامة هوليوود ليست حكرًا على المشاهير، بل يمكن أن تكون لك أيضًا. دعنا نساعدك في استعادة ثقتك ومنحك اسنان جميلة وصحية. اتصل بنا الآن واحصل على إبتسامة تستحقها.'),
(37, 37, 'The Hollywood smile is not exclusive to celebrities; it can be yours too. Let us help you regain your confidence and give you beautiful and healthy teeth. Contact us now and get the smile you deserve.\r\n\r\n'),
(38, 38, '../../images/es_photo_after/es_photo_after_0DXL9.jpg'),
(41, 41, '0538 281 07 41'),
(51, 51, 'زراعة الأسنان بيوم واحد: تجربة سريعة ونتائج مذهلة\r\nاحصل على زراعة 16 زرعة 8 لكل فك خلال زيارة واحدة\r\nفي افضل مركز زراعة اسنان في اسطنبول \r\nفي مركز دهان دنت يمكنك تركيب اسنان موقتة في يوم واحد فقط'),
(50, 50, '../../images/es_photo_after_E1L97/es_photo_after_E1L97_3V9UN.jpg'),
(49, 49, '../../images/es_photo_before_SBXB1/es_photo_before_SBXB1_84GQB.jpg'),
(48, 48, 'I would like to express my deep gratitude to Dr. Mohammed Dahan and his fantastic team at Dahan Dent Center. I had been suffering from dental problems for a long time and was unsatisfied with my smile. But now my life has completely changed thanks to Dr. Mohammed. I have achieved an elegant and beautiful Hollywood smile, and I feel confident and happy now.'),
(47, 47, 'أود أن أعبر عن امتناني العميق للدكتور محمد دهان وفريقه الرائع في مركز دهان دنت. لقد كنت أعاني من مشاكل في الأسنان لفترة طويلة وكنت غير راضٍية عن ابتسامتي. لكن الان تغيرت حياتي تمامًا بفضل الدكتور محمد. لقد حصلت على ابتسامة هوليوود الأنيقة والجميلة، وأشعر بالثقة والسعادة الآن.'),
(52, 52, 'Same-day dental implant: Fast experience and amazing results. Get 16 implants, 8 for each jaw, in a single visit at the best dental implant center in Istanbul, Dahan Dent Center. You can have temporary teeth placed in just one day.'),
(53, 53, '../../images/es_photo_before_25BP7/es_photo_before_25BP7_5FLLH.jpg'),
(54, 54, '../../images/es_photo_after_P4OS2/es_photo_after_P4OS2_BT97K.jpg'),
(55, 55, 'السيد خالد من أمريكا \r\nتم قلع كامل اسنان الفكين و زراعة 8 زرعات لكل فك\r\nالتعويض تم عن كامل الاسنان باستخدام تلبيس زركونيوم\r\nبأيدي افضل طبيب اسنان في اسطنبول الدكتور محمد دهان'),
(56, 56, 'Mr. Khaled from America had all his teeth extracted and received 8 implants for each jaw. The full dental restoration was done using zirconium veneers by the best dentist in Istanbul, Dr. Mohammed Dahan.'),
(57, 57, '../../images/es_photo_before_A3M68/es_photo_before_A3M68_RAWGJ.jpg'),
(58, 58, '../../images/es_photo_after_7Y555/es_photo_after_7Y555_G6SWP.jpg'),
(59, 59, 'منذ اللحظة التي دخلت فيها العيادة، شعرت بالترحاب والاحترافية التي تمتاز بها فرقكم. استمعت بشدة إلى شرحكم المفصّل حول عملية تبييض الأسنان والنتائج المتوقعة. لقد حصلت بالفعل على النتائج المبهرة التي توقعتها وأكثر.'),
(60, 60, 'From the moment I entered the clinic, I felt welcomed and impressed by the professionalism of your team. I greatly appreciated your detailed explanation of the teeth whitening process and the expected results. I have already achieved the amazing results I anticipated, and even more.'),
(61, 61, '../../images/es_photo_before_F9ANV/es_photo_before_F9ANV_09G3F.jpg'),
(62, 62, '../../images/es_photo_after_Z57DA/es_photo_after_Z57DA_X2M1Z.jpg'),
(67, 67, 'تواصل معنا واحصل على اسـتشارة مجانية و حسم 10٪؜ على الزراعة أو ابتسامة هوليود'),
(68, 68, 'Contact us and get a free consultation and a 10% discount on dental implants or the Hollywood smile.');

-- --------------------------------------------------------

--
-- Table structure for table `subscribe_emails`
--

CREATE TABLE `subscribe_emails` (
  `eid` int(10) UNSIGNED NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `dt_create` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer_msgs`
--
ALTER TABLE `customer_msgs`
  ADD PRIMARY KEY (`eid`),
  ADD UNIQUE KEY `eid_UNIQUE` (`eid`);

--
-- Indexes for table `ms_pages`
--
ALTER TABLE `ms_pages`
  ADD PRIMARY KEY (`pid`),
  ADD UNIQUE KEY `pid_UNIQUE` (`pid`),
  ADD UNIQUE KEY `internal_name_UNIQUE` (`internal_name`);

--
-- Indexes for table `ms_paragraphs`
--
ALTER TABLE `ms_paragraphs`
  ADD PRIMARY KEY (`pid`),
  ADD UNIQUE KEY `pid_UNIQUE` (`pid`),
  ADD UNIQUE KEY `internal_name_UNIQUE` (`internal_name`),
  ADD KEY `IDX_FK_PAGE_ID` (`fk_page_id`);

--
-- Indexes for table `ms_sub_paragraphs`
--
ALTER TABLE `ms_sub_paragraphs`
  ADD PRIMARY KEY (`spid`),
  ADD UNIQUE KEY `spid_UNIQUE` (`spid`),
  ADD UNIQUE KEY `internal_name_UNIQUE` (`internal_name`),
  ADD KEY `IDX_FK_PARA_ID` (`fk_para_id`);

--
-- Indexes for table `ms_sub_para_elements`
--
ALTER TABLE `ms_sub_para_elements`
  ADD PRIMARY KEY (`eid`),
  ADD UNIQUE KEY `eid_UNIQUE` (`eid`),
  ADD KEY `IDX_FK_SUB_PARA_ID` (`fk_sub_para_id`);

--
-- Indexes for table `subscribe_emails`
--
ALTER TABLE `subscribe_emails`
  ADD PRIMARY KEY (`eid`),
  ADD UNIQUE KEY `eid_UNIQUE` (`eid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer_msgs`
--
ALTER TABLE `customer_msgs`
  MODIFY `eid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ms_pages`
--
ALTER TABLE `ms_pages`
  MODIFY `pid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ms_paragraphs`
--
ALTER TABLE `ms_paragraphs`
  MODIFY `pid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ms_sub_paragraphs`
--
ALTER TABLE `ms_sub_paragraphs`
  MODIFY `spid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `ms_sub_para_elements`
--
ALTER TABLE `ms_sub_para_elements`
  MODIFY `eid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `subscribe_emails`
--
ALTER TABLE `subscribe_emails`
  MODIFY `eid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
