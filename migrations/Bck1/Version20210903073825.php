<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210903073825 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        // EA - J'ai viré des INDEX dans la table tennis_match
        $this->addSql('CREATE TABLE tennis_match (id INT AUTO_INCREMENT NOT NULL, player_one_id INT NOT NULL, player_two_id INT NOT NULL, round VARCHAR(255) NOT NULL, winner_id INT DEFAULT NULL, sets_number INT DEFAULT NULL, result VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE tennis_match ADD CONSTRAINT FK_7510D177649A58CD FOREIGN KEY (player_one_id) REFERENCES tennis_player (id)');
        $this->addSql('ALTER TABLE tennis_match ADD CONSTRAINT FK_7510D177FC6BF02 FOREIGN KEY (player_two_id) REFERENCES tennis_player (id)');
        $this->addSql('ALTER TABLE tennis_match ADD CONSTRAINT FK_7510D1775DFCD4B8 FOREIGN KEY (winner_id) REFERENCES tennis_player (id)');
        $this->addSql('CREATE TABLE bet (id INT AUTO_INCREMENT NOT NULL, id_match_id INT NOT NULL, user_id_id INT NOT NULL, winner VARCHAR(255) NOT NULL, sets_number INT NOT NULL, points_number INT NULL, show_down VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE bet ADD CONSTRAINT FK_FBF0EC9B7A654043 FOREIGN KEY (id_match_id) REFERENCES tennis_match (id)');
        $this->addSql('ALTER TABLE bet ADD CONSTRAINT FK_FBF0EC9B9D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bet DROP FOREIGN KEY FK_FBF0EC9B7A654043');
        $this->addSql('DROP TABLE bet');
        $this->addSql('DROP TABLE tennis_match');
    }
}
