<?php

namespace App\Command;

use DateTime;
use App\Entity\DeadLine;
use App\Repository\UserRepository;
use Symfony\Component\Mime\Address;
use App\Repository\DeadLineRepository;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ReminderBetEmailCommand extends Command
{
    protected static $defaultName = 'reminder-bet-email';
    protected $mailer;
    protected $deadLineRepository;
    protected $userRepository;

    public function __construct(MailerInterface $mailer, DeadLineRepository $deadLineRepository, UserRepository $userRepository)
    {
        parent::__construct(null); //pas compris à quoi ca sert, mais faut ca
        $this->mailer = $mailer;
        $this->deadLineRepository = $deadLineRepository;
        $this->userRepository = $userRepository;
    }

    protected function configure()
    {
        $this->setDescription('Reminder for bets by mail');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        //PI, ce traitement va être lancé toutes les heures

        //1. Voir en base s'il y a au moins une deadline de renseignée. Si non, on sort.
        $deadLineArray = $this->deadLineRepository->findAll();

        if ($deadLineArray) {
            //2. Si oui, aller sur la dernière deadline insérée, et récupérer sa valeur
            $latestDeadLine = new DeadLine;
            $round = "";

            if ($deadLineArray[3]) {
                $latestDeadLine = $deadLineArray[3];
            } elseif ($deadLineArray[2]) {
                $latestDeadLine = $deadLineArray[2];
            } elseif ($deadLineArray[1]) {
                $latestDeadLine = $deadLineArray[1];
            } elseif ($deadLineArray[0]) {
                $latestDeadLine = $deadLineArray[0];
            }
        }

        //3. La comparer à la "current date"
        $currentDateTime = new DateTime();
        $deadLineDateTime = $latestDeadLine->getDeadLine();
        $interval = $currentDateTime->diff($deadLineDateTime);
        $interval->format('%H');

        //3.1. Si l'écart est entre 3h et 4h => Mail de relance pour parier pour "le bon round"
        if ($interval > 3 && $interval <= 4) {
            $usersArray = $this->userRepository->findAll();

            foreach ($usersArray as $key => $user) {
                $email = new TemplatedEmail();
                $email->from(new Address("admin@friends-bet.fr", "Friends Bets Information"))
                    ->to($user->getEmail())
                    ->htmlTemplate("/emails/reminderBet.html.twig")
                    ->context([
                        'round' => 'fourthround'
                    ])
                    ->subject("Go bet on the fourthround !");
                $this->mailer->send($email);
            }
        }

        //3.2 Si l'écart est entre 30 et 90 minutes (si possible 60 minutes ce serait bien) => Mail de dernière relance pour parier pour "le bon round"

        return Command::SUCCESS; //pas sûr que utile
    }
}
