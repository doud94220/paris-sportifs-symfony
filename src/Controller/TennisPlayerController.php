<?php

namespace App\Controller;

use App\Repository\TennisPlayerRepository;
use App\Repository\UserRepository;
use DateTime;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Routing\Annotation\Route;

class TennisPlayerController extends AbstractController
{
    /**
     * @Route("/tennis-players", name="show_all_tennis_players")
     */
    public function show_all(TennisPlayerRepository $tennisPlayerRepository)
    {
        $tennisPlayers = $tennisPlayerRepository->findAllPlayersOrderedByLastName();

        return $this->render('/player/show_players.html.twig', [
            'tennisPlayers' => $tennisPlayers
        ]);
    }

    /**
     * @Route("/player/{id}", name="show_one_player")
     */
    public function show_one($id, TennisPlayerRepository $tennisPlayerRepository, MailerInterface $mailer, UserRepository $userRepository)
    {
        //Test mailllllllllllllllllllllllllll - Ca marche nikel !
        // $usersArray = $userRepository->findAll();

        // foreach ($usersArray as $key => $user) {
        //     $email = new TemplatedEmail();
        //     $email->from(new Address("doud@paris.fr", "Mail d'information pour les paris"))
        //         ->to($user->getEmail())
        //         ->htmlTemplate("/emails/testMail.html.twig")
        //         ->context([
        //             'idPlayer' => $id
        //         ])
        //         ->subject("test doud");
        //     $mailer->send($email);
        // }
        //Fin test mailllllllllllllllllllllllllllllllllllllllllll

        $tennisPlayer = $tennisPlayerRepository->find($id);

        return $this->render('/player/show_one_player.html.twig', [
            'tennisPlayer' => $tennisPlayer
        ]);
    }
}
