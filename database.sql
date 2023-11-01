-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 13 oct. 2023 à 11:19
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ets-alma`
--

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `titre` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `titre`) VALUES
(9, 'fedfgergr'),
(10, 'efefefg'),
(11, 'efegfeg'),
(12, 'egegeg'),
(13, 'grgrg');

-- --------------------------------------------------------

--
-- Structure de la table `immobiliers`
--

CREATE TABLE `immobiliers` (
  `id` int(11) NOT NULL,
  `titre` text NOT NULL,
  `prix` text NOT NULL,
  `description` text NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `immobiliers`
--

INSERT INTO `immobiliers` (`id`, `titre`, `prix`, `description`, `image`) VALUES
(1, 'CHARGEUR', '12000', 'effezkhurkhrklhrkhg', 'image-1697167792704-428434929.jpg'),
(3, 'ege', '200000000', 'reyttryhjyt', 'image-1697186224953-951387394.jpg'),
(4, 'TERRAIN', '42', 'treytrtrtrt', 'image-1697186259132-521592561.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `titre` text NOT NULL,
  `prix` text NOT NULL,
  `description` text NOT NULL,
  `category` text NOT NULL,
  `subcategory` text NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id`, `titre`, `prix`, `description`, `category`, `subcategory`, `image`) VALUES
(1, 'tobie', '13', 'BIEN', 'egegeg', 'zdzd', 'image-1697166024974-994103764.jpg'),
(3, 'tobie', '37', 'efe', 'category', 'subcategory', 'image-1697166949104-513549005.jpg'),
(4, 'fvr', 'rr', 'rgrg', 'fedfgergr', 'ege', 'image-1697166971451-696986227.jpg'),
(5, 'tobie', 'dvdv', 'zzzzfe', 'efefefg', 'zdzd', 'image-1697192555461-360735967.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `subcategory`
--

CREATE TABLE `subcategory` (
  `id` int(11) NOT NULL,
  `titre` text NOT NULL,
  `category` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `subcategory`
--

INSERT INTO `subcategory` (`id`, `titre`, `category`) VALUES
(2, 'ege', 'efefefg'),
(3, 'zdzd', 'efegfeg');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `immobiliers`
--
ALTER TABLE `immobiliers`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `subcategory`
--
ALTER TABLE `subcategory`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `immobiliers`
--
ALTER TABLE `immobiliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
