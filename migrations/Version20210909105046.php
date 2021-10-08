<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210909105046 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        //$this->addSql('ALTER TABLE bet DROP INDEX FK_FBF0EC9B9D86650F, ADD UNIQUE INDEX UNIQ_FBF0EC9B9D86650F (user_id_id)');
        //$this->addSql('ALTER TABLE bet DROP INDEX FK_FBF0EC9B7A654043, ADD UNIQUE INDEX UNIQ_FBF0EC9B7A654043 (id_match_id)');
        $this->addSql('ALTER TABLE bet ADD winner_id_id INT DEFAULT NULL, DROP winner');
        $this->addSql('ALTER TABLE bet ADD CONSTRAINT FK_FBF0EC9BFC53D4E9 FOREIGN KEY (winner_id_id) REFERENCES tennis_player (id)');
        //$this->addSql('CREATE INDEX IDX_FBF0EC9BFC53D4E9 ON bet (winner_id_id)');
        //$this->addSql('ALTER TABLE tennis_match DROP INDEX FK_7510D177FC6BF02, ADD UNIQUE INDEX UNIQ_7510D177FC6BF02 (player_two_id)');
        //$this->addSql('ALTER TABLE tennis_match DROP INDEX FK_7510D177649A58CD, ADD UNIQUE INDEX UNIQ_7510D177649A58CD (player_one_id)');
        //$this->addSql('ALTER TABLE tennis_match DROP INDEX FK_7510D1775DFCD4B8, ADD UNIQUE INDEX UNIQ_7510D1775DFCD4B8 (winner_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        // $this->addSql('ALTER TABLE bet DROP INDEX UNIQ_FBF0EC9B7A654043, ADD INDEX FK_FBF0EC9B7A654043 (id_match_id)');
        // $this->addSql('ALTER TABLE bet DROP INDEX UNIQ_FBF0EC9B9D86650F, ADD INDEX FK_FBF0EC9B9D86650F (user_id_id)');
        // $this->addSql('ALTER TABLE bet DROP FOREIGN KEY FK_FBF0EC9BFC53D4E9');
        // $this->addSql('DROP INDEX IDX_FBF0EC9BFC53D4E9 ON bet');
        // $this->addSql('ALTER TABLE bet ADD winner VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, DROP winner_id_id, CHANGE points_number points_number INT DEFAULT NULL');
        // $this->addSql('ALTER TABLE tennis_match DROP INDEX UNIQ_7510D177649A58CD, ADD INDEX FK_7510D177649A58CD (player_one_id)');
        // $this->addSql('ALTER TABLE tennis_match DROP INDEX UNIQ_7510D177FC6BF02, ADD INDEX FK_7510D177FC6BF02 (player_two_id)');
        // $this->addSql('ALTER TABLE tennis_match DROP INDEX UNIQ_7510D1775DFCD4B8, ADD INDEX FK_7510D1775DFCD4B8 (winner_id)');
    }
}
