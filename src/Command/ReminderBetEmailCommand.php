<?php

namespace App\Command;

use DateTime;
use DateInterval;
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
        //1. Voir en base s'il y a au moins une deadline de renseignée. Si non, on sort.
        $deadLineArray = $this->deadLineRepository->findAll();
        $round = "";
        $latestDeadLine = new DeadLine;

        if (count($deadLineArray) > 0) {
            //2. Si oui, aller sur la dernière deadline insérée, et récupérer sa valeur
            if (isset($deadLineArray[3])) {
                $latestDeadLine = $deadLineArray[3];
            } elseif (isset($deadLineArray[2])) {
                $latestDeadLine = $deadLineArray[2];
            } elseif (isset($deadLineArray[1])) {
                $latestDeadLine = $deadLineArray[1];
            } elseif (isset($deadLineArray[0])) {
                $latestDeadLine = $deadLineArray[0];
            }

            $round = $latestDeadLine->getRound();
        } else {
            return Command::SUCCESS;
        }

        //3. La comparer à la "current date"
        $currentDateTime = new DateTime();
        // dd($currentDateTime);

        // -----------  J'ai défini la date et l'heure dans le fichier .ini : date.timezone = Europe/Paris -----------
        // if ($_ENV['APP_ENV'] === 'prod') {
        //     $currentDateTime->modify('+2 hours');
        // } elseif ($_ENV['APP_ENV'] === 'dev') {
        //     $currentDateTime->modify('+1 hours');
        // }

        // ----------- Là je rajoutais 1h avant.... -----------
        // $interval = new DateInterval('PT1H');
        //dd($interval);
        // $currentDateTime->add($interval);
        // dd($currentDateTime);

        $deadLineDateTime = $latestDeadLine->getDeadLine();
        $deadLineTimeStringFormat = $deadLineDateTime->format('Y-m-d H:i');
        $interval = $currentDateTime->diff($deadLineDateTime);
        ($interval);

        if ($interval->invert == false) { //Si la deadline n'est pas passée
            $daysGap = $interval->d;
            $hoursGap = $interval->h;

            //3.1. Si l'écart est de 2h et x minutes => Mail de relance pour parier pour "le bon round"
            if ($daysGap == 0 && $hoursGap == 2) {
                $usersArray = $this->userRepository->findAll();

                foreach ($usersArray as $key => $user) {
                    $email = new TemplatedEmail();
                    $email->from(new Address("admin@friends-bet.fr", "Friends Bets Reminder"))
                        ->to($user->getEmail())
                        ->htmlTemplate("/emails/reminderBet.html.twig")
                        ->context([
                            'round' => $round,
                            'deadline' => $deadLineTimeStringFormat
                        ])
                        ->subject("Reminder for betting on the " . $round . " !");
                    $this->mailer->send($email);
                }
            }
            //3.2 Si l'écart est inférieur à 1 heure (0h et x minutes) => Mail de dernière relance pour parier pour "le bon round"
            elseif ($daysGap == 0 && $hoursGap == 0) {
                $usersArray = $this->userRepository->findAll();

                foreach ($usersArray as $key => $user) {
                    $email = new TemplatedEmail();
                    $email->from(new Address("admin@friends-bet.fr", "Friends Bets Last Reminder"))
                        ->to($user->getEmail())
                        ->htmlTemplate("/emails/lastReminderBet.html.twig")
                        ->context([
                            'round' => $round,
                            'deadline' => $deadLineTimeStringFormat
                        ])
                        ->subject("Last reminder for betting on the " . $round . " !");
                    $this->mailer->send($email);
                }
            }
        }

        return Command::SUCCESS;
    }
}
