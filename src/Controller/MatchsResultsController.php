<?php

namespace App\Controller;

use App\Repository\TennisMatchRepository;
use App\Repository\TennisPlayerRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MatchsResultsController extends AbstractController
{
    /**
     * @Route("matchs-results-root", name="matchs_results_root")
     */
    public function root()
    {
        return $this->render('/match/index.html.twig');
    }

    /**
     * @Route("/matchs-results-show/{round}", name="matchs_results_show")
     */
    public function show($round, TennisMatchRepository $tennisMatchRepository, TennisPlayerRepository $tennisPlayerRepository)
    {
        $tennisMatchs = $tennisMatchRepository->findBy(array('round' => $round));

        if (!$tennisMatchs) //Matchs are not even know
        {
            return $this->render('match/matchs_results_not_known.html.twig', [
                'message' => "Come back later to see matchs results on the $round. The players show down is not even known !"
            ]);
        } else {
            if ($tennisMatchs[0]->getWinner() === null) //matchs results are not available yet (for the round)
            {
                return $this->render('match/matchs_results_not_known.html.twig', [
                    'message' => "Come back later to see matchs results on the $round. The matchs are not finished."
                ]);
            } else //show matchs results for the round
            {
                $arrayAllRoundResults = [];

                //Create an array with results data to show in the twig view
                foreach ($tennisMatchs as $key => $tennisMatch) {
                    $oneMatchResult = [];
                    $firstTennismanFullName = $tennisMatch->getPlayerOne()->getFirstName() . ' ' . $tennisMatch->getPlayerOne()->getFamilyName();
                    $secondTennismanFullName = $tennisMatch->getPlayerTwo()->getFirstName() . ' ' . $tennisMatch->getPlayerTwo()->getFamilyName();
                    $showDown = $firstTennismanFullName . ' VS ' . $secondTennismanFullName;
                    $winnerFullName = $tennisMatch->getWinner()->getFirstName() . ' ' . $tennisMatch->getWinner()->getFamilyName();
                    $winnerPicture = $tennisMatch->getWinner()->getPicture();
                    $result = $tennisMatch->getResult();
                    array_push($oneMatchResult, $showDown, $winnerFullName, $winnerPicture, $result);
                    array_push($arrayAllRoundResults, $oneMatchResult);
                }

                return $this->render('match/matchs_results.html.twig', [
                    'round' => $round,
                    'allRoundResults' => $arrayAllRoundResults
                ]);
            }
        }
    }

    //La fonction not_known, c'est pour tester mon responsive

    /**
     * @Route("/matchs-results-not_known/{round}", name="matchs_results_not_known")
     */
    public function not_known($round)
    {
        return $this->render('match/matchs_results_not_known.html.twig', [
            'message' => "Come back later to see matchs results on the $round. The players show down is not even known !"
        ]);
    }
}
