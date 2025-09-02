<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250902092233 extends AbstractMigration
{
  public function getDescription(): string
  {
    return '';
  }

  public function up(Schema $schema): void
  {
    $this->addSql('CREATE TABLE IF NOT EXISTS `bet` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `id_match_id` int(11) NOT NULL,
            `user_id_id` int(11) NOT NULL,
            `sets_number` int(11) NOT NULL,
            `points_number` int(11) DEFAULT NULL,
            `show_down` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
            `winner_id_id` int(11) DEFAULT NULL,
            PRIMARY KEY (`id`),
            KEY `FK_FBF0EC9B7A654043` (`id_match_id`),
            KEY `FK_FBF0EC9B9D86650F` (`user_id_id`),
            KEY `FK_FBF0EC9BFC53D4E9` (`winner_id_id`)
          ) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');

    $this->addSql('CREATE TABLE IF NOT EXISTS `dead_line` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `round` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
            `dead_line` datetime DEFAULT NULL,
            PRIMARY KEY (`id`)
          ) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');

    $this->addSql('CREATE TABLE IF NOT EXISTS `doctrine_migration_versions` (
            `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
            `executed_at` datetime DEFAULT NULL,
            `execution_time` int(11) DEFAULT NULL,
            PRIMARY KEY (`version`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci');

    $this->addSql('CREATE TABLE IF NOT EXISTS `doctrine_migration_versions` (
            `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
            `executed_at` datetime DEFAULT NULL,
            `execution_time` int(11) DEFAULT NULL,
            PRIMARY KEY (`version`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci');

    $this->addSql('CREATE TABLE IF NOT EXISTS `tennis_match` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `player_one_id` int(11) NOT NULL,
            `player_two_id` int(11) NOT NULL,
            `round` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
            `winner_id` int(11) DEFAULT NULL,
            `sets_number` int(11) DEFAULT NULL,
            `result` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
            PRIMARY KEY (`id`),
            KEY `FK_7510D177649A58CD` (`player_one_id`),
            KEY `FK_7510D177FC6BF02` (`player_two_id`),
            KEY `FK_7510D1775DFCD4B8` (`winner_id`)
          ) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');

    $this->addSql('CREATE TABLE IF NOT EXISTS `tennis_player` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `family_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
            `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
            `picture` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
            `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
            `flag` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
            `age` int(11) NOT NULL,
            `atp_ranking` int(11) NOT NULL,
            PRIMARY KEY (`id`)
          ) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');

    $this->addSql('CREATE TABLE IF NOT EXISTS `user` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
            `roles` json NOT NULL,
            `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
            `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
            `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
            `nick_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
            `admin` tinyint(1) NOT NULL,
            PRIMARY KEY (`id`),
            UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`)
          ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');

    // $this->addSql('ALTER TABLE `bet`
    //     ADD CONSTRAINT `FK_FBF0EC9B7A654043` FOREIGN KEY (`id_match_id`) REFERENCES `tennis_match` (`id`),
    //     ADD CONSTRAINT `FK_FBF0EC9B9D86650F` FOREIGN KEY (`user_id_id`) REFERENCES `user` (`id`),
    //     ADD CONSTRAINT `FK_FBF0EC9BFC53D4E9` FOREIGN KEY (`winner_id_id`) REFERENCES `tennis_player` (`id`)');

    // $this->addSql('ALTER TABLE `tennis_match`
    //     ADD CONSTRAINT `FK_7510D1775DFCD4B8` FOREIGN KEY (`winner_id`) REFERENCES `tennis_player` (`id`),
    //     ADD CONSTRAINT `FK_7510D177649A58CD` FOREIGN KEY (`player_one_id`) REFERENCES `tennis_player` (`id`),
    //     ADD CONSTRAINT `FK_7510D177FC6BF02` FOREIGN KEY (`player_two_id`) REFERENCES `tennis_player` (`id`)');

    // $this->addSql("INSERT INTO `tennis_player` (`id`, `family_name`, `first_name`, `picture`, `country`, `flag`, `age`, `atp_ranking`) VALUES
    // (1, 'DJOKOVIC', 'Novak', 'img/Djokovic.png', 'Serbia', 'img/SerbiaFlag.svg', 34, 1),
    // (2, 'NADAL', 'Rafael', 'img/Nadal.png', 'Spain', 'img/SpainFlag.svg', 35, 5),
    // (3, 'FEDERER', 'Roger', 'img/Federer.png', 'Switzerland', 'img/Swiss.svg', 40, 9),
    // (4, 'MEDVEDEV', 'Daniil', 'img/Medvedev.png', 'Russia', 'img/RussianFlag.png', 25, 2),
    // (5, 'TSITSIPAS', 'Stefanos', 'img/Tsitsipas.png', 'Greece', 'img/GreeceFlag.svg', 23, 3),
    // (6, 'ZVEREV', 'Alexander', 'img/Zverev.png', 'Germany', 'img/GermanyFlag.svg', 24, 4),
    // (7, 'THIEM', 'Dominic', 'img/Thiem.png', 'Austria', 'img/AustriaFlag.svg', 27, 6),
    // (8, 'RUBLEV', 'Andrey', 'img/Rublev.png', 'Russia', 'img/RussianFlag.png', 23, 7),
    // (9, 'BERRETTINI', 'Matteo', 'img/Berrettini.png', 'Italy', 'img/ItaliaFlag.svg', 25, 8),
    // (10, 'SHAPOVALOV', 'Denis', 'img/Shapovalov.png', 'Canada', 'img/CanadaFlag.svg', 22, 10),
    // (11, 'RUUD', 'Casper', 'img/Ruud.png', 'Norway', 'img/NorwayFlag.svg', 22, 11),
    // (12, 'CARRENO BUSTA', 'Pablo', 'img/CarrenoBusta.png', 'Spain', 'img/SpainFlag.svg', 30, 12),
    // (13, 'HURKACZ', 'Hubert', 'img/Hurkacz.png', 'Poland', 'img/PolandFlag.svg', 24, 13),
    // (14, 'SCHWARTZMAN', 'Diego', 'img/Schwartzman.png', 'Argentina', 'img/ArgentinaFlag.svg', 29, 14),
    // (15, 'AUGER-ALIASSIME', 'Felix', 'img/AugerAliassime.png', 'Canada', 'img/CanadaFlag.svg', 21, 15),
    // (16, 'SINNER', 'Jannik', 'img/Sinner.png', 'Italy', 'img/ItaliaFlag.svg', 20, 16)");

    //Update Tennis Players
    $this->addSql("UPDATE `tennis_player`
                    SET `id`='1',`family_name`='DJOKOVIC',`first_name`='Novak',`picture`='img/Djokovic.png',`country`='Serbia',`flag`='img/SerbiaFlag.svg',`age`=38,`atp_ranking`=7
                    WHERE `id` = 1");
    $this->addSql("UPDATE `tennis_player`
                    SET `id`='2',`family_name`='ALCARAZ',`first_name`='Carlos',`picture`='img/Alcaraz.png',`country`='Spain',`flag`='img/SpainFlag.svg',`age`=22,`atp_ranking`=2
                    WHERE `id` = 2");
    $this->addSql("UPDATE `tennis_player`
                    SET `id`='3',`family_name`='RINDERKNECH',`first_name`='Arthur',`picture`='img/Rinderknech.png',`country`='France',`flag`='img/FranceFlag.png',`age`=30,`atp_ranking`=82
                    WHERE `id` = 3");
    $this->addSql("UPDATE `tennis_player`
                    SET `id`='4',`family_name`='LEHECKA',`first_name`='Jiri',`picture`='img/Lehecka.png',`country`='Czechia',`flag`='img/CzechiaFlag.png',`age`=23,`atp_ranking`=21
                    WHERE `id` = 4");
    $this->addSql("UPDATE `tennis_player`
                    SET `id`='5',`family_name`='MANNARINO',`first_name`='Adrian',`picture`='img/Mannarino.png',`country`='France',`flag`='img/FranceFlag.png',`age`=37,`atp_ranking`=77
                    WHERE `id` = 5");
    $this->addSql("UPDATE `tennis_player`
                    SET `id`='6',`family_name`='FRITZ',`first_name`='Taylor',`picture`='img/Fritz.png',`country`='USA',`flag`='img/UsaFlag.png',`age`=27,`atp_ranking`=4
                    WHERE `id` = 6");
    $this->addSql("UPDATE `tennis_player`
                    SET `id`='7',`family_name`='MACHAC',`first_name`='Thomas',`picture`='img/Machac.png',`country`='Czechia',`flag`='img/CzechiaFlag.png',`age`=24,`atp_ranking`=22
                    WHERE `id` = 7");
    $this->addSql("UPDATE `tennis_player`
                    SET `id`='8',`family_name`='RUBLEV',`first_name`='Andrey',`picture`='img/Rublev.png',`country`='Russia',`flag`='img/RussiaFlag.png',`age`=23,`atp_ranking`=7
                    WHERE `id` = 8");
    $this->addSql("UPDATE `tennis_player`
                    SET `id`='9',`family_name`='STRUFF',`first_name`='Jan-Lennard',`picture`='img/Struff.png',`country`='Germany',`flag`='img/GermanyFlag.png',`age`=35,`atp_ranking`=144
                    WHERE `id` = 9");
    $this->addSql("UPDATE `tennis_player`
                    SET `id`='10',`family_name`='DE MINAUR',`first_name`='Alex',`picture`='img/DeMinaur.png',`country`='Australia',`flag`='img/AustraliaFlag.png',`age`=26,`atp_ranking`=8
                    WHERE `id` = 10");
    $this->addSql("UPDATE `tennis_player`
                    SET `id`='11',`family_name`='RIEDI',`first_name`='Leandro',`picture`='img/Riedi.png',`country`='Switzerland',`flag`='img/SwissFlag.svg',`age`=23,`atp_ranking`=435
                    WHERE `id` = 11");
    $this->addSql("UPDATE `tennis_player`
                    SET `id`='12',`family_name`='MUNAR',`first_name`='Jaume',`picture`='img/Munar.png',`country`='Spain',`flag`='img/SpainFlag.svg',`age`=28,`atp_ranking`=44
                    WHERE `id` = 12");
    $this->addSql("UPDATE `tennis_player`
                    SET `id`='13',`family_name`='MUSETTI',`first_name`='Lorenzo',`picture`='img/Musetti.png',`country`='Italia',`flag`='img/ItaliaFlag.svg',`age`=23,`atp_ranking`=10
                    WHERE `id` = 13");
    $this->addSql("UPDATE `tennis_player`
                    SET `id`='14',`family_name`='BUBLIK',`first_name`='Alexander',`picture`='img/Bublik.png',`country`='Kazakhstan',`flag`='img/KazakhstanFlag.png',`age`=29,`atp_ranking`=24
                    WHERE `id` = 14");
    $this->addSql("UPDATE `tennis_player`
                    SET `id`='15',`family_name`='AUGER-ALIASSIME',`first_name`='Felix',`picture`='img/AugerAliassime.png',`country`='Canada',`flag`='img/CanadaFlag.svg',`age`=27,`atp_ranking`=25
                    WHERE `id` = 15");
    $this->addSql("UPDATE `tennis_player`
                    SET `id`='16',`family_name`='SINNER',`first_name`='Jannik',`picture`='img/Sinner.png',`country`='Italy',`flag`='img/ItaliaFlag.svg',`age`=24,`atp_ranking`=1
                    WHERE `id` = 16");
  }

  public function down(Schema $schema): void {}
}
