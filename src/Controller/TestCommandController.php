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
            dd("Pas de deadline !"); //Si on enlève ca, ca plante parce que y'a pas de return
        }

        //3. La comparer à la "current date"
        $currentDateTime = new DateTime();
        $interval = new DateInterval('PT1H');
        $currentDateTime->add($interval);

        $deadLineDateTime = $latestDeadLine->getDeadLine();
        $interval = $currentDateTime->diff($deadLineDateTime);

        if ($interval->invert == false) { //Si la deadline n'est pas passée
            $daysGap = $interval->d;
            $hoursGap = $interval->h;

            //3.1. Si l'écart est de 4h et x minutes => Mail de relance pour parier pour "le bon round"
            if ($daysGap == 0 && $hoursGap == 4) {
                $usersArray = $userRepository->findAll();

                foreach ($usersArray as $key => $user) {
                    $email = new TemplatedEmail();
                    $email->from(new Address("admin@friends-bet.fr", "Friends Bets Reminder"))
                        ->to($user->getEmail())
                        ->htmlTemplate("/emails/reminderBet.html.twig")
                        ->context([
                            'round' => $round
                        ])
                        ->subject("Reminder for betting on the " . $round . " !");
                    $mailer->send($email);
                }
                dd("Relance pour parier pour le " . $round);
            }
            //3.2 Si l'écart est inférieur à 1 heure (0h et x minutes) => Mail de dernière relance pour parier pour "le bon round"
            elseif ($daysGap == 0 && $hoursGap == 0) {
                $usersArray = $userRepository->findAll();

                foreach ($usersArray as $key => $user) {
                    $email = new TemplatedEmail();
                    $email->from(new Address("admin@friends-bet.fr", "Friends Bets Last Reminder"))
                        ->to($user->getEmail())
                        ->htmlTemplate("/emails/lastReminderBet.html.twig")
                        ->context([
                            'round' => $round
                        ])
                        ->subject("Last reminder for betting on the " . $round . " !");
                    $mailer->send($email);
                }
                dd("Dernière relance pour parier pour le " . $round);
            }
        }

        dd("Pas de relance à faire sur la dernière deadine en base"); //Si on enlève ca, ca plante parce que y'a pas de return
    }
}
