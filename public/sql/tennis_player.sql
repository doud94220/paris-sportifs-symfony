DROP TABLE IF EXISTS `tennis_player`;
CREATE TABLE IF NOT EXISTS `tennis_player` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `family_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `picture` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `flag` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` int(11) NOT NULL,
  `atp_ranking` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tennis_player` (`id`, `family_name`, `first_name`, `picture`, `country`, `flag`, `age`, `atp_ranking`) VALUES
(1, 'DJOKOVIC', 'Novak', 'img/Djokovic.png', 'Serbia', 'img/SerbiaFlag.svg', 34, 1),
(2, 'NADAL', 'Rafael', 'img/Nadal.png', 'Spain', 'img/SpainFlag.svg', 35, 5),
(3, 'FEDERER', 'Roger', 'img/Federer.png', 'Switzerland', 'img/Swiss.svg', 40, 9),
(4, 'MEDVEDEV', 'Daniil', 'img/Medvedev.png', 'Russia', 'img/RussianFlag.png', 25, 2),
(5, 'TSITSIPAS', 'Stefanos', 'img/Tsitsipas.png', 'Greece', 'img/GreeceFlag.svg', 23, 3),
(6, 'ZVEREV', 'Alexander', 'img/Zverev.png', 'Germany', 'img/GermanyFlag.svg', 24, 4),
(7, 'THIEM', 'Dominic', 'img/Thiem.png', 'Austria', 'img/AustriaFlag.svg', 27, 6),
(8, 'RUBLEV', 'Andrey', 'img/Rublev.png', 'Russia', 'img/RussianFlag.png', 23, 7),
(9, 'BERRETTINI', 'Matteo', 'img/Berrettini.png', 'Italy', 'img/ItaliaFlag.svg', 25, 8),
(10, 'SHAPOVALOV', 'Denis', 'img/Shapovalov.png', 'Canada', 'img/CanadaFlag.svg', 22, 10),
(11, 'RUUD', 'Casper', 'img/Ruud.png', 'Norway', 'img/NorwayFlag.svg', 22, 11),
(12, 'CARRENO BUSTA', 'Pablo', 'img/CarrenoBusta.png', 'Spain', 'img/SpainFlag.svg', 30, 12),
(13, 'HURKACZ', 'Hubert', 'img/Hurkacz.png', 'Poland', 'img/PolandFlag.svg', 24, 13),
(14, 'SCHWARTZMAN', 'Diego', 'img/Schwartzman.png', 'Argentina', 'img/ArgentinaFlag.svg', 29, 14),
(15, 'AUGER-ALIASSIME', 'Felix', 'img/AugerAliassime.png', 'Canada', 'img/CanadaFlag.svg', 21, 15),
(16, 'SINNER', 'Jannik', 'img/Sinner.png', 'Italy', 'img/ItaliaFlag.svg', 20, 16);
COMMIT;
