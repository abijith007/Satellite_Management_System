-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2019 at 07:27 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `password`, `first_name`, `last_name`) VALUES
('abijith', 'password', 'abijith', 'Trichur Ramachandran');

-- --------------------------------------------------------

--
-- Table structure for table `launch_loc`
--

CREATE TABLE `launch_loc` (
  `LID` bigint(20) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `space_org` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `launch_loc`
--

INSERT INTO `launch_loc` (`LID`, `name`, `country`, `space_org`) VALUES
(1, 'Satish Dhawan Space Centre', 'India', 'ISRO'),
(2, 'Guiana Space Center', 'USA', 'NASA'),
(3, 'Cape Canaveral', 'USA', 'NASA'),
(4, 'Baikonur Cosmodrome', 'Russia', 'Roscosmos'),
(5, 'Vandenberg AFB', 'USA', NULL),
(6, 'Rocket Lab Launch Complex 1', 'New Zealand', 'Rocket Lab'),
(7, 'Cygnus', 'USA', 'NASA'),
(8, 'Dombarovsky Air Base', 'Russia', 'Roscosmos'),
(9, 'Plesetsk Cosmodrome', 'Russia', 'Roscosmos'),
(10, 'Vostochny Cosmodrome', 'Russia', 'Roscosmos'),
(11, 'Xichang Satellite Launch Center', 'China', 'CNSA'),
(12, 'Uchinoura Space Center', 'Japan', 'JAXA');

-- --------------------------------------------------------

--
-- Table structure for table `launch_sat`
--

CREATE TABLE `launch_sat` (
  `LID` bigint(20) DEFAULT NULL,
  `sid` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `launch_sat`
--

INSERT INTO `launch_sat` (`LID`, `sid`) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(3, 6),
(3, 7),
(4, 8),
(2, 9),
(3, 10),
(3, 11),
(3, 12),
(3, 13),
(3, 14),
(3, 15),
(3, 16),
(3, 17),
(3, 18),
(5, 19),
(2, 20),
(6, 21),
(6, 22),
(7, 23),
(7, 24),
(5, 25),
(8, 26),
(8, 27),
(5, 28),
(3, 29),
(3, 30),
(5, 31),
(5, 32),
(2, 33),
(5, 34),
(1, 35),
(1, 36),
(4, 37),
(9, 38),
(4, 39),
(10, 40),
(5, 41),
(2, 42),
(6, 43),
(11, 44),
(12, 45),
(5, 46),
(5, 47),
(1, 48),
(1, 49),
(1, 50);

-- --------------------------------------------------------

--
-- Table structure for table `manufacturing_org`
--

CREATE TABLE `manufacturing_org` (
  `MOID` bigint(20) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email_id` varchar(30) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `manufacturing_org`
--

INSERT INTO `manufacturing_org` (`MOID`, `name`, `email_id`, `phone`, `country`, `username`, `password`) VALUES
(1, 'Universitat Politècnica de Catalunya', NULL, NULL, 'Spain', NULL, NULL),
(2, 'University of Aalto', NULL, NULL, 'Finland', NULL, NULL),
(3, 'University of Aalborg', NULL, NULL, 'Denmark', NULL, NULL),
(4, 'Space Systems/Loral', NULL, NULL, 'USA', NULL, NULL),
(5, 'Boeing Satellite Systems', NULL, NULL, 'USA', NULL, NULL),
(6, 'Lockheed Martin', NULL, NULL, 'USA', NULL, NULL),
(7, 'Lockheed Martin Astro Space', NULL, NULL, 'USA', NULL, NULL),
(8, 'TRW Space and Electronics', NULL, NULL, 'USA', NULL, NULL),
(9, 'National Reconnaissance Laboratory (?)', 'nrl@gmail.com', '9611304829', 'USA', 'NRL', 'password'),
(10, 'Lockheed Martin Space Systems', NULL, NULL, 'USA', NULL, NULL),
(11, 'University of Southern California', NULL, NULL, 'USA', NULL, NULL),
(12, 'Aerospace Corporation', NULL, NULL, 'USA', NULL, NULL),
(13, 'EADS Astrium', NULL, NULL, 'France', NULL, NULL),
(14, 'Orbital Sciences Corp.', NULL, NULL, 'USA', NULL, NULL),
(15, 'German Aerospace Center (DLR)', NULL, NULL, 'Germany', NULL, NULL),
(16, 'TsSKB Progress', NULL, NULL, 'Russia', NULL, NULL),
(17, 'Samara State Aerospace University, SGAU', NULL, NULL, 'Russia', NULL, NULL),
(18, 'Samara State Aerospace University/TsSKB Progress', NULL, NULL, 'Russia', NULL, NULL),
(19, 'GomSpace ApS', NULL, NULL, 'Denmark', NULL, NULL),
(20, 'Orbital ATK', NULL, NULL, 'USA', NULL, NULL),
(21, 'NASA Glenn Research Center', NULL, NULL, 'USA', NULL, NULL),
(22, 'China Academy of Space Technology (CAST)', NULL, NULL, 'China', NULL, NULL),
(23, 'Astro Live Experiences', NULL, NULL, 'Japan', NULL, NULL),
(24, 'Al-Farabi Kazakh National University', NULL, NULL, 'Kazakhstan', NULL, NULL),
(25, 'US Air Force Institute of Technology', NULL, NULL, 'USA', NULL, NULL),
(26, 'Surrey Satellite Technology Ltd.', NULL, NULL, 'UK', NULL, NULL),
(27, 'Airbus Defense and Space', NULL, NULL, 'France', NULL, NULL),
(28, 'Kongsberg Seatex AS', NULL, NULL, 'Canada', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `manufacturing_sat`
--

CREATE TABLE `manufacturing_sat` (
  `MOID` bigint(20) DEFAULT NULL,
  `sid` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `manufacturing_sat`
--

INSERT INTO `manufacturing_sat` (`MOID`, `sid`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(5, 6),
(4, 7),
(6, 8),
(7, 9),
(8, 10),
(8, 11),
(9, 12),
(9, 13),
(9, 14),
(9, 15),
(10, 16),
(10, 17),
(10, 18),
(11, 19),
(27, 20),
(12, 21),
(12, 22),
(12, 23),
(12, 24),
(12, 25),
(12, 26),
(12, 27),
(12, 28),
(12, 29),
(12, 30),
(12, 31),
(12, 32),
(13, 33),
(14, 34),
(15, 35),
(28, 36),
(28, 37),
(16, 38),
(17, 39),
(18, 40),
(19, 41),
(20, 42),
(21, 43),
(22, 44),
(23, 45),
(24, 46),
(25, 47),
(27, 48),
(26, 49),
(26, 50);

-- --------------------------------------------------------

--
-- Table structure for table `owner_org`
--

CREATE TABLE `owner_org` (
  `OID` bigint(20) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email_id` varchar(30) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `owner_org`
--

INSERT INTO `owner_org` (`OID`, `name`, `email_id`, `phone`, `country`, `username`, `password`) VALUES
(1, 'Universitat Politècnica de Catalunya', NULL, NULL, 'Spain', NULL, NULL),
(2, 'University of Aalto', NULL, NULL, 'Finland', NULL, NULL),
(3, 'University of Aalborg', NULL, NULL, 'Denmark', NULL, NULL),
(4, 'Asia Broadcast Satellite Ltd.', NULL, NULL, 'Multinational', NULL, NULL),
(5, 'National Reconnaissance Office (NRO)', NULL, NULL, 'USA', NULL, NULL),
(6, 'US Air Force', NULL, NULL, 'USA', NULL, NULL),
(7, 'Department of Homeland Security', NULL, NULL, 'USA', NULL, NULL),
(8, 'European Space Agency (ESA)', NULL, NULL, 'ESA', 'ESA', 'password'),
(9, 'Aerospace Corporation', NULL, NULL, 'USA', NULL, NULL),
(10, 'EUTELSAT S.A.', NULL, NULL, 'Multinational', NULL, NULL),
(11, 'German Aerospace Center (DLR)', NULL, NULL, 'Germany', NULL, NULL),
(12, 'Norwegian Coastal Admnistration', NULL, NULL, 'Norway', NULL, NULL),
(13, 'Samara State Aerospace University, SGAU', NULL, NULL, 'Russia', NULL, NULL),
(14, 'AISTech', NULL, NULL, 'Spain', NULL, NULL),
(15, 'Al Yah Satellite Communications Co. (YAHSAT)', NULL, NULL, 'United Arab Emirates', NULL, NULL),
(16, 'NASA Glenn Research Center', NULL, NULL, 'USA', 'NASA', 'password'),
(17, 'Algerian Space Agency (ASAL)', NULL, NULL, 'Algeria', NULL, NULL),
(18, 'Astro Live Experiences', NULL, NULL, 'Japan', NULL, NULL),
(19, 'Al-Farabi Kazakh National University', NULL, NULL, 'Kazakhstan', NULL, NULL),
(20, 'US Air Force Institute of Technology', NULL, NULL, 'USA', NULL, NULL),
(21, 'Algerian Space Agency (ASAL)/UK Space Agency', NULL, NULL, 'Algeria', NULL, NULL),
(22, 'Center for Atmospheric Sciences', NULL, NULL, 'USA', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `owner_sat`
--

CREATE TABLE `owner_sat` (
  `OID` bigint(20) DEFAULT NULL,
  `sid` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `owner_sat`
--

INSERT INTO `owner_sat` (`OID`, `sid`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(4, 5),
(4, 6),
(4, 7),
(4, 8),
(4, 9),
(5, 10),
(5, 11),
(5, 12),
(5, 13),
(5, 14),
(5, 15),
(6, 16),
(6, 17),
(6, 18),
(7, 19),
(8, 20),
(9, 21),
(9, 22),
(9, 23),
(9, 24),
(9, 25),
(9, 26),
(9, 27),
(9, 28),
(9, 29),
(9, 30),
(9, 31),
(9, 32),
(10, 33),
(22, 34),
(11, 35),
(12, 36),
(12, 37),
(13, 38),
(13, 39),
(13, 40),
(14, 41),
(15, 42),
(16, 43),
(17, 44),
(18, 45),
(19, 46),
(20, 47),
(17, 48),
(17, 49),
(21, 50);

-- --------------------------------------------------------

--
-- Table structure for table `satellites`
--

CREATE TABLE `satellites` (
  `sid` bigint(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `purpose` varchar(50) DEFAULT NULL,
  `detailed_purpose` varchar(60) DEFAULT NULL,
  `class_of_orbit` varchar(3) DEFAULT NULL,
  `type_of_orbit` varchar(75) DEFAULT NULL,
  `longitude_of_GEO` double DEFAULT NULL,
  `perigee_km` double DEFAULT NULL,
  `apogee_km` double DEFAULT NULL,
  `eccentricity` double DEFAULT NULL,
  `inclination_deg` double DEFAULT NULL,
  `period_minutes` double DEFAULT NULL,
  `Launch_mass_kg` double DEFAULT NULL,
  `dry_mass_kg` double DEFAULT NULL,
  `power_W` double DEFAULT NULL,
  `launch_date` date DEFAULT NULL,
  `expected_lifetime_years` double DEFAULT NULL,
  `NORAD_number` bigint(20) DEFAULT NULL,
  `users` varchar(30) DEFAULT NULL,
  `launch_vehicle` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `satellites`
--

INSERT INTO `satellites` (`sid`, `name`, `purpose`, `detailed_purpose`, `class_of_orbit`, `type_of_orbit`, `longitude_of_GEO`, `perigee_km`, `apogee_km`, `eccentricity`, `inclination_deg`, `period_minutes`, `Launch_mass_kg`, `dry_mass_kg`, `power_W`, `launch_date`, `expected_lifetime_years`, `NORAD_number`, `users`, `launch_vehicle`) VALUES
(1, '3Cat-1', 'Technology Development', NULL, 'LEO', NULL, 0, 476, 500, 0.00174978127734033, 97.4, 95, 4, NULL, NULL, '2018-11-29', NULL, 43728, 'Civil', 'PSLV'),
(2, 'Aalto-1 ', 'Technology Development', NULL, 'LEO', NULL, 0, 497, 517, 0.0014541224371092, 97.45, 94.7, 4.5, NULL, 4.5, '2017-06-23', 2, 42775, 'Civil', 'PSLV'),
(3, 'AAUSat-4', 'Earth Observation', 'Automatic Identification System (AIS)', 'LEO', 'Sun-Synchronous', 0, 442, 687, 0.0176652967048814, 98.2, 95.9, 1, NULL, NULL, '2016-04-25', NULL, 41460, 'Civil', 'Soyuz 2.1a'),
(4, 'ABS-2 (Koreasat-8, ST-3)', 'Communications', NULL, 'GEO', NULL, 75, 35778, 35793, 0.000177912727876552, 0.08, 1436.03, 6330, NULL, 16000, '2014-02-06', 15, 39508, 'Commercial', 'Ariane 5 ECA'),
(5, 'ABS-2A', 'Communications', NULL, 'GEO', NULL, -75, 35700, 35700, 0, 0, 1436.1, 1800, NULL, NULL, '2016-06-15', 15, 41588, 'Commercial', 'Falcon 9'),
(6, 'ABS-3A ', 'Communications', NULL, 'GEO', NULL, -3, 35788, 35803, 0.000177870533967343, 0.1, 1436, 2000, NULL, NULL, '2015-03-02', 15, 40424, 'Commercial', 'Falcon 9'),
(7, 'ABS-4 (ABS-2i, MBSat, Mobile Broadcasting Satellite, Han Byul)', 'Communications', NULL, 'GEO', NULL, 75, 35780, 35793, 0.000154187373240188, 0.01, 1436.1, 4143, 1700, 7400, '2004-03-13', 12, 28184, 'Commercial', 'Atlas 3'),
(8, 'ABS-6 (ABS-1, LMI-1, Lockheed Martin-Intersputnik-1)', 'Communications', NULL, 'GEO', NULL, 159, 35777, 35794, 0.000201634424926759, 0.01, 1436.08, 2894, 1730, 6800, '1999-09-26', 15, 25924, 'Commercial', 'Proton'),
(9, 'ABS-7 (Koreasat 3, Mugungwha 3)', 'Communications', NULL, 'GEO', NULL, 116.18, 35780, 35791, 0.000130469333776138, 0.01, 1436.06, 3500, 1800, 4800, '1999-09-04', 15, 25894, 'Commercial', 'Ariane'),
(10, 'Advanced Orion 2 (Mentor, NROL 6, USA 139)', 'Earth Observation', 'Electronic Intelligence', 'GEO', NULL, -26, 35560, 36013, 0.00537283692906195, 7.72, 1436.14, 4500, NULL, NULL, '1998-05-09', NULL, 25336, 'Military', 'Titan IVA'),
(11, 'Advanced Orion 3 (Mentor, NROL 19, USA 171)', 'Earth Observation', 'Electronic Intelligence', 'GEO', NULL, 95.4, 35589, 35984, 0.00468492403306726, 3.2, 1436.1, 4500, NULL, NULL, '2003-09-09', NULL, 27937, 'Military', 'Titan IV'),
(12, 'Advanced Orion 4 (Mentor, NRO L-26, USA 202)', 'Earth Observation', 'Electronic Intelligence', 'GEO', NULL, 44, 35714, 35937, 0.00264246187389651, 2.89, 1438.8, 5000, NULL, NULL, '2009-01-18', NULL, 33490, 'Military', 'Delta 4 Heavy'),
(13, 'Advanced Orion 5 (Mentor, NRO L-32, USA 223)', 'Earth Observation', 'Electronic Intelligence', 'GEO', NULL, 100.9, 35500, 35500, 0, 0, 1436, 5000, NULL, NULL, '2010-11-21', NULL, 37232, 'Military', 'Delta 4 Heavy'),
(14, 'Advanced Orion 6 (Mentor, NRO L-15, USA 237)', 'Earth Observation', 'Electronic Intelligence', 'GEO', NULL, 60, 35771, 35805, 0.000403244935718013, 0, 1436.1, 5000, NULL, NULL, '2012-06-29', NULL, 38528, 'Military', 'Delta 4 Heavy'),
(15, 'Advanced Orion 7 (Mentor, NRO L-37, USA 268)', 'Earth Observation', 'Electronic Intelligence', 'GEO', NULL, 102.6, 35613, 35903, 0.00344189137865553, 7.51, 1437.19, 5000, NULL, NULL, '2016-06-11', NULL, 41584, 'Military', 'Delta 4 Heavy'),
(16, 'AEHF-2 (Advanced Extremely High Frequency satellite-2, USA 235)', 'Communications', NULL, 'GEO', NULL, -120, 35772, 35801, 0.000343956447997343, 2.34, 1436.1, 6169, NULL, NULL, '2012-05-03', 14, 38254, 'Military', 'Atlas 5'),
(17, 'AEHF-3 (Advanced Extremely High Frequency satellite-3, USA 246)', 'Communications', NULL, 'GEO', NULL, 152.1, 35700, 35803, 0.00122265351423857, 4.2, 1436.1, 6169, NULL, NULL, '2013-09-18', 14, 39256, 'Military', 'Atlas 5'),
(18, 'AEHF-4 (Advanced Extremely High Frequency satellite-4, USA 288)', 'Communications', NULL, 'GEO', NULL, 0, 35700, 35700, 0, 4, 1436.1, 6169, NULL, NULL, '2018-10-17', NULL, 43651, 'Military', 'Atlas 5'),
(19, 'Aeneas', 'Technology Development', NULL, 'LEO', 'Equatorial', 0, 480, 790, 0.0221270521056388, 0.02, 97.4, 3, NULL, NULL, '2012-09-13', NULL, 38760, 'Government', 'Atlas 5'),
(20, 'Aeolus', 'Earth Observation', 'Earth Science', 'LEO', NULL, 0, 314, 317, 0.00022436616558223, 96.7, 92.4, 1367, NULL, NULL, '2018-08-22', 3, 43600, 'Government', 'Vega'),
(21, 'Aerocube 11A (TOMSat Eagle Scout)', 'Technology Development', NULL, 'LEO', 'Polar', 0, 495, 511, 0.00116397497453805, 85.03, 94.6, 4, NULL, NULL, '2018-12-17', NULL, 43861, 'Commercial', 'Electron'),
(22, 'Aerocube 11B (TOMSat R3)', 'Technology Development', NULL, 'LEO', 'Polar', 0, 492, 511, 0.0013825220112057, 85.3, 94.6, 4, NULL, NULL, '2018-12-17', NULL, 43849, 'Commercial', 'Electron'),
(23, 'Aerocube 12A', 'Technology Development', NULL, 'LEO', 'Non-Polar Inclined', 0, 481, 487, 0.000437700612780858, 51.6, 94.2, 4, NULL, NULL, '2018-07-16', NULL, 43556, 'Commercial', 'Nanorack Deployer'),
(24, 'Aerocube 12B', 'Technology Development', NULL, 'LEO', 'Non-Polar Inclined', 0, 481, 487, 0.000437700612780858, 51.6, 94.2, 4, NULL, NULL, '2018-07-16', NULL, 43557, 'Commercial', 'Nanorack Deployer'),
(25, 'Aerocube 5C', 'Technology Development', NULL, 'LEO', 'Non-Polar Inclined', 0, 500, 802, 0.0215069078478849, 64.78, 97.74, 1.5, NULL, NULL, '2015-10-08', NULL, 40965, 'Commercial', 'Atlas 5'),
(26, 'Aerocube 6A', 'Technology Development', NULL, 'LEO', 'Sun-Synchronous', 0, 614, 700, 0.00611925430482425, 97.98, 97.88, 5, NULL, NULL, '2014-06-19', 3, 40045, 'Commercial', 'Dnepr'),
(27, 'Aerocube 6B', 'Technology Development', NULL, 'LEO', 'Sun-Synchronous', 0, 614, 700, 0.00611925430482425, 97.98, 97.88, 5, NULL, NULL, '2014-06-19', 3, 40046, 'Commercial', 'Dnepr'),
(28, 'Aerocube 7A', 'Technology Development', NULL, 'LEO', 'Non-Polar Inclined', 0, 500, 802, 0.0215069078478849, 64.6, 97.4, 2, NULL, NULL, '2015-10-08', NULL, 40966, 'Commercial', 'Atlas 5'),
(29, 'Aerocube 8A', 'Technology Development', NULL, 'LEO', 'Non-Polar Inclined', 0, 356, 700, 0.0249347636996231, 55, 95.19, 5, NULL, NULL, '2015-05-20', NULL, 40659, 'Commercial', 'Atlas 5'),
(30, 'Aerocube 8B', 'Technology Development', NULL, 'LEO', 'Non-Polar Inclined', 0, 356, 700, 0.0249347636996231, 55, 95.19, 5, NULL, NULL, '2015-05-20', NULL, 40660, 'Commercial', 'Atlas 5'),
(31, 'Aerocube 8C', 'Technology Development', NULL, 'LEO', 'Sun-Synchronous', 0, 573, 585, 0.000863433587566556, 98, 96.23, 2, NULL, NULL, '2016-11-11', NULL, 41851, 'Commercial', 'Atlas 5'),
(32, 'Aerocube 8D', 'Technology Development', NULL, 'LEO', 'Sun-Synchronous', 0, 572, 584, 0.000863557858376511, 98, 96.23, 2, NULL, NULL, '2016-11-11', NULL, 41852, 'Commercial', 'Atlas 5'),
(33, 'Afghansat-1 (Eutelsat 28B, Eutelsat 48B, Eutelsat W2M, Eutelsat 48D)', 'Communications', NULL, 'GEO', NULL, 48, 35764, 35808, 0.00052187114526995, 0.12, 1436.08, 3460, 1555, 7000, '2008-12-20', 15, 33460, 'Commercial', 'Ariane 5'),
(34, 'AIM (Aeronomy of Ice in Mesosphere)', 'Earth Observation', 'Earth Science', 'LEO', 'Sun-Synchronous', 0, 544, 552, 0.000578201792425557, 97.9, 96.2, 215, 197, 216, '2007-04-25', 2, 31304, 'Government', 'Pegasus XL'),
(35, 'AISat-1', 'Communications', 'Automatic Identification System (AIS)', 'LEO', 'Sun-Synchronous', 0, 643, 660, 0.00121056754254789, 98.25, 97.76, 14, NULL, NULL, '2014-06-30', NULL, 40054, 'Government', 'PSLV-CA'),
(36, 'AISSat-1 (Automatic Identification System Satellite-1)', 'Communications', 'Automatic Identification System (AIS)', 'LEO', 'Sun-Synchronous', 0, 615, 632, 0.00121541431329091, 98, 97.2, 6, NULL, NULL, '2010-07-12', 3, 36797, 'Government', 'PSLV'),
(37, 'AISSat-2 (Automatic Identification System Satellite-2)', 'Communications', 'Automatic Identification System (AIS)', 'LEO', 'Sun-Synchronous', 0, 625, 631, 0.000428693912546442, 98.4, 97.27, 6, NULL, NULL, '2014-07-08', 3, 40075, 'Government', 'Soyuz-2.1b'),
(38, 'AIST-1', 'Technology Development', NULL, 'LEO', 'Polar', 0, 599, 626, 0.00193340494092374, 82.4, 96.9, NULL, NULL, NULL, '2013-12-28', NULL, 39492, 'Civil', 'Soyuz 2,1v'),
(39, 'AIST-2', 'Technology Development', NULL, 'LEO', 'Non-Polar Inclined', 0, 558, 582, 0.00172910662824207, 64.88, 96.06, 53, NULL, NULL, '2013-04-19', 3, 39133, 'Civil', 'Soyuz 2.1a'),
(40, 'AIST-2D', 'Technology Development', NULL, 'LEO', 'Sun-Synchronous', 0, 471, 486, 0.00109513032050814, 97.28, 94.18, 531, NULL, NULL, '2016-04-27', NULL, 41465, 'Civil', 'Soyuz 2.1a'),
(41, 'AISTechSat-2', 'Earth Observation', 'Automatic Identification System (AIS)', 'LEO', 'Sun-Synchronous', 0, 574, 592, 0.00129440529267942, 97.8, 96.4, 2.6, NULL, NULL, '2018-12-03', NULL, 43768, 'Commercial', 'Falcon 9'),
(42, 'Al Yah-3', 'Communications', NULL, 'GEO', NULL, -20, 35777, 35796, 0.000225350776274121, 0, 1436, 3795, NULL, NULL, '2018-01-25', 15, 43174, 'Commercial', 'Ariane 5'),
(43, 'ALBus (Advanced Electrical Bus)', 'Technology Development', NULL, 'LEO', 'Polar', 0, 494, 511, 0.00123681338668607, 85.04, 94.6, 4, NULL, NULL, '2018-12-16', NULL, 43859, 'Government', 'Electron'),
(44, 'Alcomsat (Algerian Communications Satellite)', 'Communications', NULL, 'GEO', NULL, -24.8, 35744, 35798, 0.00064070620061223, 0.04, 1436.1, 5225, NULL, NULL, '2017-12-10', 15, 43039, 'Government', 'Long March 3B'),
(45, 'ALE-1 (Astro Live Experiences 1)', 'Technology Development', NULL, 'LEO', 'Sun-Synchronous', 0, 479, 512, 0.00240332095258903, 97.3, 94.5, 68, NULL, NULL, '2019-01-18', 2, 43938, 'Commercial', 'Epsilon'),
(46, 'Al-Farabi-2', 'Technology Development', NULL, 'LEO', 'Sun-Synchronous', 0, 573, 589, 0.00115091353762049, 97.7, 96.2, 4, NULL, NULL, '2018-12-03', NULL, 43805, 'Civil', 'Falcon 9'),
(47, 'ALiCE  (AFIT LEO iMESA CNT E)', 'Technology Development', NULL, 'LEO', 'Polar', 0, 443, 886, 0.0314876679223825, 120.3, 98, 5, NULL, NULL, '2013-12-06', NULL, 39467, 'Military', 'Atlas 5'),
(48, 'Alsat 2B', 'Earth Observation', 'Optical Imaging', 'LEO', 'Sun-Synchronous', 0, 646, 660, 0.00099672504627652, 98.2, 97.7, 117, NULL, NULL, '2016-09-26', 5, 41786, 'Government', 'PSLV'),
(49, 'Alsat-1B', 'Earth Observation', 'Optical Imaging', 'LEO', 'Sun-Synchronous', 0, 661, 704, 0.00304856433888692, 98.2, 98.4, 103, NULL, NULL, '2016-09-26', 5, 41785, 'Government', 'PSLV'),
(50, 'AlSat-1N', 'Technology Development', NULL, 'LEO', 'Sun-Synchronous', 0, 661, 698, 0.00262429959571601, 98.2, 98.3, 10, NULL, NULL, '2016-09-26', NULL, 41789, 'Government', 'PSLV');

-- --------------------------------------------------------

--
-- Table structure for table `user_account`
--

CREATE TABLE `user_account` (
  `uid` bigint(20) NOT NULL,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `email_id` varchar(30) DEFAULT NULL,
  `date_of_birth` date NOT NULL,
  `organisation` varchar(40) DEFAULT NULL,
  `address` varchar(50) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_account`
--

INSERT INTO `user_account` (`uid`, `first_name`, `last_name`, `email_id`, `date_of_birth`, `organisation`, `address`, `username`, `password`) VALUES
(1, 'Abijith', 'Trichur Ramachandran', ' trabijith@gmail.com', '0000-00-00', 'RVCE', 'L&T South CIty', 'abijith', 'password');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`);

--
-- Indexes for table `launch_loc`
--
ALTER TABLE `launch_loc`
  ADD PRIMARY KEY (`LID`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `launch_sat`
--
ALTER TABLE `launch_sat`
  ADD KEY `LID` (`LID`),
  ADD KEY `sid` (`sid`);

--
-- Indexes for table `manufacturing_org`
--
ALTER TABLE `manufacturing_org`
  ADD PRIMARY KEY (`MOID`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `email_id` (`email_id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `manufacturing_sat`
--
ALTER TABLE `manufacturing_sat`
  ADD KEY `MOID` (`MOID`),
  ADD KEY `sid` (`sid`);

--
-- Indexes for table `owner_org`
--
ALTER TABLE `owner_org`
  ADD PRIMARY KEY (`OID`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `email_id` (`email_id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `owner_sat`
--
ALTER TABLE `owner_sat`
  ADD KEY `OID` (`OID`),
  ADD KEY `sid` (`sid`);

--
-- Indexes for table `satellites`
--
ALTER TABLE `satellites`
  ADD PRIMARY KEY (`sid`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `NORAD_number` (`NORAD_number`);

--
-- Indexes for table `user_account`
--
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `email_id` (`email_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `launch_loc`
--
ALTER TABLE `launch_loc`
  MODIFY `LID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `manufacturing_org`
--
ALTER TABLE `manufacturing_org`
  MODIFY `MOID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `owner_org`
--
ALTER TABLE `owner_org`
  MODIFY `OID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `satellites`
--
ALTER TABLE `satellites`
  MODIFY `sid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `user_account`
--
ALTER TABLE `user_account`
  MODIFY `uid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `launch_sat`
--
ALTER TABLE `launch_sat`
  ADD CONSTRAINT `launch_sat_ibfk_1` FOREIGN KEY (`LID`) REFERENCES `launch_loc` (`LID`),
  ADD CONSTRAINT `launch_sat_ibfk_2` FOREIGN KEY (`sid`) REFERENCES `satellites` (`sid`);

--
-- Constraints for table `manufacturing_sat`
--
ALTER TABLE `manufacturing_sat`
  ADD CONSTRAINT `manufacturing_sat_ibfk_1` FOREIGN KEY (`MOID`) REFERENCES `manufacturing_org` (`MOID`),
  ADD CONSTRAINT `manufacturing_sat_ibfk_2` FOREIGN KEY (`sid`) REFERENCES `satellites` (`sid`);

--
-- Constraints for table `owner_sat`
--
ALTER TABLE `owner_sat`
  ADD CONSTRAINT `owner_sat_ibfk_1` FOREIGN KEY (`OID`) REFERENCES `owner_org` (`OID`),
  ADD CONSTRAINT `owner_sat_ibfk_2` FOREIGN KEY (`sid`) REFERENCES `satellites` (`sid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
