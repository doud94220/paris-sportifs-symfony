<?php

namespace App\Controller;

use \DateTime;
use \DateInterval;
use App\Entity\Bet;
use App\Entity\User;
use App\Form\BetType;
use App\Entity\TennisMatch;
use App\Entity\TennisPlayer;
use App\Repository\BetRepository;
use App\Repository\DeadLineRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\TennisMatchRepository;
use App\Repository\TennisPlayerRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BetController extends AbstractController
{
    /**
     * @Route("/bet-root", name="bet_root")
     */
    public function root()
    {
        return $this->render('bet/index.html.twig');
    }

    /**
     * @Route("/lets_bet/{round}", name="bet_lets_bet")
     */
    public function lets_bet($round, TennisMatchRepository $tennisMatchRepository, BetRepository $betRepository, Security $security, TennisPlayerRepository $tennisPlayerRepository, Request $request, EntityManagerInterface $em, DeadLineRepository $deadLineRepository)
    {
        /** @var User */
        $user = $security->getUser();
        $userId = $user->getId();

        //Check in database if matchs are ready to be bet on the round passed in argument :
        $tennisMatchs = $tennisMatchRepository->findBy(array('round' => $round));
        //dd($tennisMatchs); //Y'a que les ids des joueurs mais ca suffit pour l'instant

        //If no, tell the user to come back later
        if (!$tennisMatchs) {
            return $this->render('bet/showdowns_not_known.html.twig', [
                'message' => "Come back later to bet on the $round. The Showdowns are not even known."
            ]);
        }
        //If yes, check if the bets have been registered for that round and that user :
        else {
            $idTennisMatchForTestingBet = $tennisMatchs[0]->getId();

            $bets = $betRepository->findBy(['idMatch' => $idTennisMatchForTestingBet, 'userId' => $userId]);

            //If yes, show all the bets (for that user and that round)
            if ($bets) {
                $allBets = $betRepository->findByRoundAndByUser($round, $userId);

                //Go search tennis show-down and set in $allBets
                foreach ($allBets as $arrayKey => $bet) {
                    $idMatch = $bet->getIdMatch();
                    $match = $tennisMatchRepository->find($idMatch);
                    $playerOneName = $match->getPlayerOne()->getFirstName() . ' ' . $match->getPlayerOne()->getFamilyName();
                    $playerTwoName = $match->getPlayerTwo()->getFirstName() . ' ' . $match->getPlayerTwo()->getFamilyName();
                    $matchShowDown = $playerOneName . " VS " . $playerTwoName;
                    $bet->setShowDown($matchShowDown);
                }
                //dd($allBets);
                return $this->render('bet/user_bets.html.twig', [
                    'round' => $round,
                    'bets' => $allBets
                ]);
            } else //If no, invite the user to bet :
            {
                /*
                Pour historique, je ne m'en sors pas avec un BetType et le formulaire idoine....
                C'est compliqué d'afficher un formulaire qui boucle sur une liste de 'TennisMatch' pour afficher
                 le formulaire destiné à contenir les 'Bet' du joueur...
                Je repère que je peux me passer d'un objet $form dans mon controller, et récupérer les données soumises dans
                 le formulaire à partir de l'objet $request.
                Et donc j'exploite ce filon, même si ce n'est peut-être pas très académique.
                */

                //If bets form hasn't been submitted
                if (empty($request->request->all())) {

                    //Get the dead line (on datetime format) in database
                    $currentRoundDeadLineArray = $deadLineRepository->findBy(array('round' => $round));
                    $currentDeadLineDateTimeFormat = $currentRoundDeadLineArray[0]->getDeadLine();

                    //Get the current datetime
                    $currentDateTime = new DateTime;
                    $currentDateTime->format('Y-m-d H:i');

                    //Add 2 hours because there is a gap of 2 hours with the symfony server
                    $interval = new DateInterval('PT2H');
                    $currentDateTime->add($interval);

                    //Check if it still time to bet
                    if ($currentDateTime < $currentDeadLineDateTimeFormat) {
                        return $this->render('bet/bets_invitation.html.twig', [
                            'round' => $round,
                            'userId' => $userId,
                            'tennisMatchs' => $tennisMatchs
                        ]);
                    } else {
                        return $this->render('bet/dead_line_outdated.html.twig', [
                            'message' => "The dead line for the $round is outdated..."
                        ]);
                    }
                } else //We handle the request's data (because the bets form has been submited)
                {
                    $dataForm = $request->request->all();
                    $i = 1;
                    $tempoTennisMatch = new TennisMatch;
                    $tempoWinner = new TennisPlayer;

                    foreach ($dataForm as $key => $value) {

                        if ($i == 1) {
                            $tempoTennisMatch = $tennisMatchRepository->find($value);
                        }

                        //Pas de if == 2 parce que le user on l'a dejà en début de function grâce au composant $security

                        if ($i == 3) {
                            $tempoWinnerId = $value;
                            $tempoWinner = $tennisPlayerRepository->find($tempoWinnerId);
                        }

                        if ($i == 4) {
                            $bet = new Bet; //Si on instancie le Bet en amont du foreach, on aura 1 ligne en BDD au lieu de 8 (pour les huitièmes de finale)...bizarre...
                            $bet->setIdMatch($tempoTennisMatch);
                            $bet->setUserId($user);
                            $bet->setWinnerId($tempoWinner);
                            $bet->setSetsNumber(intval($value));
                            $em->persist($bet);
                            $em->flush();

                            $i = 0; //On redescend $i à 0 pour que sa valeur soit 1 au prochain tout de boucle
                        }

                        $i++;
                    }

                    $this->addFlash('success', "Vos paris ont bien été enregistrés");
                    return $this->redirectToRoute('homepage');
                }
            }
        }
    }

    //Je crée les 2fonctions dessous pour tester mon reponsive

    /**
     * @Route("/bet_deadline_outdated/{round}", name="bet_deadline_outdated")
     */
    public function deadline_outdated($round)
    {
        return $this->render('bet/dead_line_outdated.html.twig', [
            'message' => "The dead line for the $round is outdated..."
        ]);
    }

    /**
     * @Route("/bet_showdowns_not_known/{round}", name="bet_showdowns_not_known")
     */
    public function showdowns_not_known($round)
    {
        return $this->render('bet/showdowns_not_known.html.twig', [
            'message' => "Come back later to bet on the $round. The Showdowns are not even known."
        ]);
    }

    /**
     * @Route("/bet_validation", name="bet_validation")
     */
    // ------------------- PAS UTILISE A PRIORI -------------------
    // public function validation()
    // {
    //     return $this->render('bet/bet_validation.html.twig');
    // }
}
