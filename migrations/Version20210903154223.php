<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210903154223 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE dead_line (id INT AUTO_INCREMENT NOT NULL, round VARCHAR(255) NOT NULL, dead_line DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        // $this->addSql('ALTER TABLE bet DROP INDEX FK_FBF0EC9B9D86650F, ADD UNIQUE INDEX UNIQ_FBF0EC9B9D86650F (user_id_id)'); //???
        // $this->addSql('ALTER TABLE bet DROP INDEX FK_FBF0EC9B7A654043, ADD UNIQUE INDEX UNIQ_FBF0EC9B7A654043 (id_match_id)'); //???
        // $this->addSql('ALTER TABLE bet CHANGE points_number points_number INT NOT NULL'); //???
        // $this->addSql('ALTER TABLE tennis_match DROP INDEX FK_7510D177FC6BF02, ADD UNIQUE INDEX UNIQ_7510D177FC6BF02 (player_two_id)'); //???
        // $this->addSql('ALTER TABLE tennis_match DROP INDEX FK_7510D177649A58CD, ADD UNIQUE INDEX UNIQ_7510D177649A58CD (player_one_id)'); //???
        // $this->addSql('ALTER TABLE tennis_match DROP INDEX FK_7510D1775DFCD4B8, ADD UNIQUE INDEX UNIQ_7510D1775DFCD4B8 (winner_id)'); //???
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE dead_line');
        // $this->addSql('ALTER TABLE bet DROP INDEX UNIQ_FBF0EC9B7A654043, ADD INDEX FK_FBF0EC9B7A654043 (id_match_id)');
        // $this->addSql('ALTER TABLE bet DROP INDEX UNIQ_FBF0EC9B9D86650F, ADD INDEX FK_FBF0EC9B9D86650F (user_id_id)');
        // $this->addSql('ALTER TABLE bet CHANGE points_number points_number INT DEFAULT NULL');
        // $this->addSql('ALTER TABLE tennis_match DROP INDEX UNIQ_7510D177649A58CD, ADD INDEX FK_7510D177649A58CD (player_one_id)');
        // $this->addSql('ALTER TABLE tennis_match DROP INDEX UNIQ_7510D177FC6BF02, ADD INDEX FK_7510D177FC6BF02 (player_two_id)');
        // $this->addSql('ALTER TABLE tennis_match DROP INDEX UNIQ_7510D1775DFCD4B8, ADD INDEX FK_7510D1775DFCD4B8 (winner_id)');
    }
}
