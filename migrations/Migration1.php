<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Migration1 extends AbstractMigration
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

    $this->addSql('ALTER TABLE `bet`
        ADD CONSTRAINT `FK_FBF0EC9B7A654043` FOREIGN KEY (`id_match_id`) REFERENCES `tennis_match` (`id`),
        ADD CONSTRAINT `FK_FBF0EC9B9D86650F` FOREIGN KEY (`user_id_id`) REFERENCES `user` (`id`),
        ADD CONSTRAINT `FK_FBF0EC9BFC53D4E9` FOREIGN KEY (`winner_id_id`) REFERENCES `tennis_player` (`id`)');

    $this->addSql('ALTER TABLE `tennis_match`
        ADD CONSTRAINT `FK_7510D1775DFCD4B8` FOREIGN KEY (`winner_id`) REFERENCES `tennis_player` (`id`),
        ADD CONSTRAINT `FK_7510D177649A58CD` FOREIGN KEY (`player_one_id`) REFERENCES `tennis_player` (`id`),
        ADD CONSTRAINT `FK_7510D177FC6BF02` FOREIGN KEY (`player_two_id`) REFERENCES `tennis_player` (`id`)');

    $this->addSql("INSERT INTO `tennis_player` (`id`, `family_name`, `first_name`, `picture`, `country`, `flag`, `age`, `atp_ranking`) VALUES
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
        (16, 'SINNER', 'Jannik', 'img/Sinner.png', 'Italy', 'img/ItaliaFlag.svg', 20, 16)");
  }

  public function down(Schema $schema): void {}
}
