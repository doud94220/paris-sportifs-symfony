<?php

namespace App\Controller;

use App\Repository\BetRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Query\ResultSetMapping;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class RankingController extends AbstractController
{
    /**
     * @Route("ranking", name ="show_ranking")
     */
    public function show(BetRepository $betRepository, EntityManagerInterface $em)
    {
        $usersAndPointsArray = $betRepository->findTotalPointsByUser();

        return $this->render('ranking.html.twig', [
            'usersPoints' => $usersAndPointsArray
        ]);
    }
}
