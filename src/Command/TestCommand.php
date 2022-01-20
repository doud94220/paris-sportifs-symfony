<?php

namespace App\Command;

use Symfony\Component\Mime\Address;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Mailer\MailerInterface;

class TestCommand extends Command
{
    protected static $defaultName = 'test';
    protected $mailer;

    public function __construct(MailerInterface $mailer)
    {
        parent::__construct(null); //pas compris à quoi ca sert, mais faut ca
        $this->mailer = $mailer;
    }

    protected function configure()
    {
        $this->setDescription('ma commande de test');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $email = new TemplatedEmail();

        $email->from(new Address("doud75@gmail.fr", "Confirmation Account Creation"))
            ->to('doud-test@outlook.fr')
            ->htmlTemplate("/emails/testCommand.html.twig")
            ->subject("Test Command Symfony");
        $this->mailer->send($email);

        return Command::SUCCESS; //pas sûr que utile
    }
}
