<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210902155205 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        // $this->addSql('ALTER TABLE bet DROP INDEX FK_FBF0EC9B9D86650F, ADD UNIQUE INDEX UNIQ_FBF0EC9B9D86650F (user_id_id)');
        // $this->addSql('ALTER TABLE bet DROP INDEX FK_FBF0EC9B7A654043, ADD UNIQUE INDEX UNIQ_FBF0EC9B7A654043 (id_match_id)');
        //$this->addSql('ALTER TABLE bet CHANGE points_number points_number INT NOT NULL');
        $this->addSql('ALTER TABLE tennis_match ADD winner_id INT DEFAULT NULL, ADD sets_number INT DEFAULT NULL, ADD result VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE tennis_match ADD CONSTRAINT FK_7510D1775DFCD4B8 FOREIGN KEY (winner_id) REFERENCES tennis_player (id)');
        //$this->addSql('CREATE UNIQUE INDEX UNIQ_7510D1775DFCD4B8 ON tennis_match (winner_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bet DROP INDEX UNIQ_FBF0EC9B7A654043, ADD INDEX FK_FBF0EC9B7A654043 (id_match_id)');
        $this->addSql('ALTER TABLE bet DROP INDEX UNIQ_FBF0EC9B9D86650F, ADD INDEX FK_FBF0EC9B9D86650F (user_id_id)');
        $this->addSql('ALTER TABLE bet CHANGE points_number points_number INT DEFAULT NULL');
        $this->addSql('ALTER TABLE tennis_match DROP FOREIGN KEY FK_7510D1775DFCD4B8');
        $this->addSql('DROP INDEX UNIQ_7510D1775DFCD4B8 ON tennis_match');
        $this->addSql('ALTER TABLE tennis_match DROP winner_id, DROP sets_number, DROP result');
    }
}
