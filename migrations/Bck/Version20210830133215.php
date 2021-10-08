<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210830133215 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_FBF0EC9B9D86650F ON bet');
        $this->addSql('DROP INDEX UNIQ_FBF0EC9B7A654043 ON bet');
        $this->addSql('ALTER TABLE bet ADD show_down VARCHAR(255) DEFAULT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_FBF0EC9B9D86650F ON bet (user_id_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_FBF0EC9B7A654043 ON bet (id_match_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_FBF0EC9B7A654043 ON bet');
        $this->addSql('DROP INDEX UNIQ_FBF0EC9B9D86650F ON bet');
        $this->addSql('ALTER TABLE bet DROP show_down');
        $this->addSql('CREATE INDEX UNIQ_FBF0EC9B7A654043 ON bet (id_match_id)');
        $this->addSql('CREATE INDEX UNIQ_FBF0EC9B9D86650F ON bet (user_id_id)');
    }
}
