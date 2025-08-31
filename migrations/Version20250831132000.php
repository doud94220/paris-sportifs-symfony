<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version202531081021 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE IF NOT EXISTS `doctrine_migration_versions` (
            `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
            `executed_at` datetime DEFAULT NULL,
            `execution_time` int(11) DEFAULT NULL,
            PRIMARY KEY (`version`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci');

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
                    SET `id`='14',`family_name`='BUBLIK',`first_name`='Alexander',`picture`='img/Bublik.png',`country`='Kazakhstan',`flag`='img/Kazakhstan.png',`age`=29,`atp_ranking`=24
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
