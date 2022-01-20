<?php

namespace App\Controller;

use DateTime;
use DateInterval;
use App\Entity\DeadLine;
use App\Repository\UserRepository;
use Symfony\Component\Mime\Address;
use App\Repository\DeadLineRepository;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class TestCommandController extends AbstractController
{
    /**
     * @Route("/testReminderEmailCommand", name="test-reminder-email-command")
     */
    public function TestReminderBetEmailCommand(MailerInterface $mailer, DeadLineRepository $deadLineRepository, UserRepository $userRepository)
    {
        //1. Voir en base s'il y a au moins une deadline de renseignée. Si non, on sort.
        $deadLineArray = $deadLineRepository->findAll();

        //dd($deadLineArray);

        $round = "";
        $latestDeadLine = new DeadLine;

        if (isset($deadLineArray)) {
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
        }

        dd($latestDeadLine);

        //3. La comparer à la "current date"
        $currentDateTime = new DateTime();
        $interval = new DateInterval('PT1H');
        $currentDateTime->add($interval);
        //dd($currentDateTime);

        $deadLineDateTime = $latestDeadLine->getDeadLine();
        $interval = $currentDateTime->diff($deadLineDateTime);
        //dd($interval);
        $gap = $interval->format('%h');
        //dd($gap);

        //3.1. Si l'écart est entre 3h et 4h => Mail de relance pour parier pour "le bon round"
        if ($gap == 3) {
            $usersArray = $userRepository->findAll();

            foreach ($usersArray as $key => $user) {
                $email = new TemplatedEmail();
                $email->from(new Address("admin@friends-bet.fr", "Friends Bets Information"))
                    ->to($user->getEmail())
                    ->htmlTemplate("/emails/reminderBet.html.twig")
                    ->context([
                        'round' => $round
                    ])
                    ->subject("Reminder for betting on the " . $round . " !");
                $mailer->send($email);
            }
        }

        dd("fin du programme");

        //3.2 Si l'écart est entre 30 et 90 minutes (si possible 60 minutes ce serait bien) => Mail de dernière relance pour parier pour "le bon round"
        // ON VERRA DEMAIN
    }
}
