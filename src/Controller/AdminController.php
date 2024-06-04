<?php

namespace App\Controller;

use Exception;
use App\Entity\Bet;
use App\Entity\DeadLine;
use App\Form\ResultsType;
use App\Form\DeadLineType;
use App\Entity\TennisMatch;
use App\Form\TennisMatchType;
use App\Repository\BetRepository;
use App\Repository\UserRepository;
use Symfony\Component\Mime\Address;
use App\Repository\DeadLineRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\TennisMatchRepository;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AdminController extends AbstractController
{
    /**
     * @Route("/admin", name="admin_home")
     */
    public function home() //modif en carton 2
    {
        return $this->render('admin/index.html.twig');
    }

    /**
     * @Route("/admin/fourthround", name="admin_fourthround")
     */
    public function fourthround()
    {
        return $this->render('admin/fourthround.html.twig');
    }

    /**
     * @Route("/admin/fourthround-showdowns/{matchNumber}", name="admin_fourthround_showdowns")
     */
    public function fourthround_showdowns(Request $request, EntityManagerInterface $em, MailerInterface $mailer, UserRepository $userRepository, $matchNumber)
    {
        $tennisMatch = new TennisMatch;
        $form = $this->createForm(TennisMatchType::class, $tennisMatch);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($tennisMatch);
            $em->flush();
            $this->addFlash('success', 'The showdown has been registered !');

            $idNextMatch = $matchNumber + 1;

            if ($idNextMatch == 9) { //If it's the last fourthround showdown
                $usersArray = $userRepository->findAll();

                foreach ($usersArray as $key => $user) {
                    $email = new TemplatedEmail();
                    $email->from(new Address("admin@friends-bet.fr", "Friends Bets Information"))
                        ->to($user->getEmail())
                        ->htmlTemplate("/emails/inviteBet.html.twig")
                        ->context([
                            'round' => 'fourthround'
                        ])
                        ->subject("Go bet on the fourthround !");

                    try {
                        $mailer->send($email);
                    } catch (Exception $e) {
                        $this->addFlash('warning', "L'envoi de l'email a échoué : " . $e->getMessage());
                    }
                }

                return $this->redirectToRoute('admin_fourthround');
            } else {
                return $this->redirect('/admin/fourthround-showdowns/' . $idNextMatch);
            }
        }

        return $this->render('admin/fourthround_showdowns.html.twig', [
            'formView' => $form->createView()
        ]);
    }

    /**
     * @Route("/admin/fourthround-deadline", name="admin_fourthround_deadline")
     */
    public function fourthround_deadline(Request $request, EntityManagerInterface $em, DeadLineRepository $deadLineRepository)
    {
        $deadLine = new DeadLine;
        $form = $this->createForm(DeadLineType::class, $deadLine);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var DeadLine */
            $deadLine = $form->getData();

            /** @var DeadLine[] */
            $deadLineDatabase = $deadLineRepository->findByRound($deadLine->getRound());

            if (count($deadLineDatabase) > 0) {
                $deadLineDatabase[0]->setDeadLine($deadLine->getDeadLine());
                $deadLine = $deadLineDatabase[0];
            }

            $em->persist($deadLine);
            $em->flush();
            $this->addFlash('success', 'The deadline has been registered !');
            return $this->redirectToRoute('admin_fourthround');
        }

        return $this->render('admin/fourthround_deadline.html.twig', [
            'formView' => $form->createView()
        ]);
    }

    /**
     * @Route("/admin/fourthround-results/{matchNumber}", name="admin_fourthround_results")
     */
    public function fourthround_results(TennisMatchRepository $tennisMatchRepository, Request $request, EntityManagerInterface $em, $matchNumber)
    {
        $round = "FourthRound";
        $tennisMatchsArray = $tennisMatchRepository->findBy(array('round' => $round));

        if (!$tennisMatchsArray) //Showdowns are not even known
        {
            $this->addFlash('warning', 'The matchs showdowns have not been inserted !');
            return $this->redirectToRoute('admin_fourthround');
        } else {
            $idMatchInArray = $matchNumber - 1;
            $tennisMatch = $tennisMatchsArray[$idMatchInArray];
            $idMatch = $tennisMatch->getId();
            $form = $this->createForm(ResultsType::class, $tennisMatch);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                $em->persist($tennisMatch);
                $em->flush();
                $this->addFlash('success', 'The match result has been registered !');

                $idNextMatch = $matchNumber + 1;

                if ($idNextMatch == 9) {
                    $this->addFlash('success', 'All the fourthround results have been registered !');
                    return $this->redirectToRoute('admin_fourthround');
                } else {
                    /* J'arrive pas à faire fonctionner le redirectToRoute() avec un paramètre donc je fais un redirect() tout court */
                    return $this->redirect('/admin/fourthround-results/' . $idNextMatch);
                }
            } else {
                return $this->render('admin/fourthround_results.html.twig', [
                    'idMatch' => $idMatch,
                    'formView' => $form->createView()
                ]);
            }
        }
    }

    /**
     * @Route("/admin/fourthround-points-attribution", name="admin_fourthround_points_attribution")
     */
    public function fourthround_points_attribution(TennisMatchRepository $tennisMatchRepository, BetRepository $betRepository, EntityManagerInterface $em)
    {
        //1.Check that all fourthround matchs results have been registered
        $round = "FourthRound";
        $tennisMatchsArray = $tennisMatchRepository->findBy(array('round' => $round));
        //dump($tennisMatchsArray);

        if (!$tennisMatchsArray) //Showdowns are not even known
        {
            $this->addFlash('warning', 'The matchs showdowns have not even been inserted...');
            return $this->redirectToRoute('admin_fourthround');
        } else {
            foreach ($tennisMatchsArray as $key => $tennisMatch) {
                if ($tennisMatch->getResult() === null) {
                    $this->addFlash('warning', 'One match at least has no results...');
                    return $this->redirectToRoute('admin_fourthround');
                }
            }
        }

        //2. Rebuild the tennis matchs array
        $newTennisMatchsArray = [];

        foreach ($tennisMatchsArray as $key => $tennisMatch) {
            $idMatch = $tennisMatch->getId();
            $newTennisMatchsArray[$idMatch] = $tennisMatch;
        }

        //3.See the bets and attribute points for all bettors
        /** @var Bet[] */
        $betsFourthRoundArray = $betRepository->findByRound($round);

        foreach ($betsFourthRoundArray as $key => $bet) {
            $winnerIdBet = $bet->getWinnerId()->getId();
            $nbSetsBet = $bet->getSetsNumber();
            /** @var TennisMatch */
            $match = $newTennisMatchsArray[$bet->getIdMatch()->getId()];
            $winnerIdResult = $match->getWinner()->getId();
            $nbSetsResult = $match->getSetsNumber();
            $nbPointsToSetForThisRound = 0;

            if ($winnerIdBet == $winnerIdResult) {
                $nbPointsToSetForThisRound = 2;

                if ($nbSetsBet == $nbSetsResult) {
                    $nbPointsToSetForThisRound += 2;
                } elseif (abs($nbSetsBet - $nbSetsResult) == 1) {
                    $nbPointsToSetForThisRound += 1;
                }
            } elseif ($nbSetsResult == 5 && $nbSetsBet == 5) {
                $nbPointsToSetForThisRound = 2;
            }

            $bet->setPointsNumber($nbPointsToSetForThisRound);
            $em->persist($bet);
            $em->flush();
        }

        $this->addFlash('success', 'The points are attributed for the fourthround !');
        return $this->redirectToRoute('admin_home');
    }

    // ---------------------- EXPERIENCE EN DESSOUS - EN STANDBYE : --------------------
    // /**
    //  * @Route("admin_fourthround_all_results", name="admin_fourthround_all_results")
    //  */
    // public function fourthround_all_results(TennisMatchRepository $tennisMatchRepository)
    // {
    //     $round = "FourthRound";
    //     $tennisMatchsArray = $tennisMatchRepository->findBy(array('round' => $round));

    //     if (!$tennisMatchsArray) //Showdowns are not even known
    //     {
    //         $this->addFlash('warning', 'The matchs showdowns have not been inserted !');
    //         return $this->redirectToRoute('admin_fourthround');
    //     } else {
    //     }
    // }


    /**
     * @Route("/admin/quarterfinals", name="admin_quarterfinals")
     */
    public function quarterfinals()
    {
        return $this->render('admin/quarterfinals.html.twig');
    }

    /**
     * @Route("/admin/quarterfinals-showdowns/{matchNumber}", name="admin_quarterfinals_showdowns")
     */
    public function quarterfinals_showdowns(Request $request, EntityManagerInterface $em, MailerInterface $mailer, UserRepository $userRepository, $matchNumber)
    {
        $tennisMatch = new TennisMatch;
        $form = $this->createForm(TennisMatchType::class, $tennisMatch);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($tennisMatch);
            $em->flush();
            $this->addFlash('success', 'The showdown has been registered !');

            $idNextMatch = $matchNumber + 1;

            if ($idNextMatch == 5) { //If it's the last quarterfinals showdown
                $usersArray = $userRepository->findAll();

                foreach ($usersArray as $key => $user) {
                    $email = new TemplatedEmail();
                    $email->from(new Address("admin@friends-bet.fr", "Friends Bets Information"))
                        ->to($user->getEmail())
                        ->htmlTemplate("/emails/inviteBet.html.twig")
                        ->context([
                            'round' => 'quarterfinals'
                        ])
                        ->subject("Go bet on the quarterfinals !");

                    try {
                        $mailer->send($email);
                    } catch (Exception $e) {
                        $this->addFlash('warning', "L'envoi de l'email a échoué : " . $e->getMessage());
                    }
                }

                return $this->redirectToRoute('admin_quarterfinals');
            } else {
                return $this->redirect('/admin/quarterfinals-showdowns/' . $idNextMatch);
            }
        }

        return $this->render('admin/quarterfinals_showdowns.html.twig', [
            'formView' => $form->createView()
        ]);
    }

    /**
     * @Route("/admin/quarterfinals-deadline", name="admin_quarterfinals_deadline")
     */
    public function quarterfinals_deadline(Request $request, EntityManagerInterface $em, DeadLineRepository $deadLineRepository)
    {
        $deadLine = new DeadLine;
        $form = $this->createForm(DeadLineType::class, $deadLine);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var DeadLine */
            $deadLine = $form->getData();

            /** @var DeadLine[] */
            $deadLineDatabase = $deadLineRepository->findByRound($deadLine->getRound());

            if (count($deadLineDatabase) > 0) {
                $deadLineDatabase[0]->setDeadLine($deadLine->getDeadLine());
                $deadLine = $deadLineDatabase[0];
            }

            $em->persist($deadLine);
            $em->flush();
            $this->addFlash('success', 'The deadline has been registered !');
            return $this->redirectToRoute('admin_quarterfinals');
        }

        return $this->render('admin/quarterfinals_deadline.html.twig', [
            'formView' => $form->createView()
        ]);
    }

    /**
     * @Route("/admin/quarterfinals-results/{matchNumber}", name="admin_quarterfinals_results")
     */
    public function quarterfinals_results(TennisMatchRepository $tennisMatchRepository, Request $request, EntityManagerInterface $em, $matchNumber)
    {
        $round = "QuarterFinals";
        $tennisMatchsArray = $tennisMatchRepository->findBy(array('round' => $round));

        if (!$tennisMatchsArray) //Showdowns are not even known
        {
            $this->addFlash('warning', 'The matchs showdowns have not been inserted !');
            return $this->redirectToRoute('admin_quarterfinals');
        } else {
            $idMatchInArray = $matchNumber - 1;
            $tennisMatch = $tennisMatchsArray[$idMatchInArray];
            $idMatch = $tennisMatch->getId();
            $form = $this->createForm(ResultsType::class, $tennisMatch);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                $em->persist($tennisMatch);
                $em->flush();
                $this->addFlash('success', 'The match result has been registered !');

                $idNextMatch = $matchNumber + 1;

                if ($idNextMatch == 5) {
                    $this->addFlash('success', 'All the quarterfinals results have been registered !');
                    return $this->redirectToRoute('admin_quarterfinals');
                } else {
                    /* J'arrive pas à faire fonctionner le redirectToRoute() avec un paramètre donc je fais un redirect() tout court */
                    return $this->redirect('/admin/quarterfinals-results/' . $idNextMatch);
                }
            } else {
                return $this->render('admin/quarterfinals_results.html.twig', [
                    'idMatch' => $idMatch,
                    'formView' => $form->createView()
                ]);
            }
        }
    }

    /**
     * @Route("/admin/quarterfinals-points-attribution", name="admin_quarterfinals_points_attribution")
     */
    public function quarterfinals_points_attribution(TennisMatchRepository $tennisMatchRepository, BetRepository $betRepository, EntityManagerInterface $em)
    {
        //1.Check that all fourthround matchs results have been registered
        $round = "QuarterFinals";
        $tennisMatchsArray = $tennisMatchRepository->findBy(array('round' => $round));

        if (!$tennisMatchsArray) //Showdowns are not even known
        {
            $this->addFlash('warning', 'The matchs showdowns have not even been inserted...');
            return $this->redirectToRoute('admin_quarterfinals');
        } else {
            foreach ($tennisMatchsArray as $key => $tennisMatch) {
                if ($tennisMatch->getResult() === null) {
                    $this->addFlash('warning', 'One match at least has no results...');
                    return $this->redirectToRoute('admin_quarterfinals');
                }
            }
        }

        //2. Rebuild the tennis matchs array
        $newTennisMatchsArray = [];

        foreach ($tennisMatchsArray as $key => $tennisMatch) {
            $idMatch = $tennisMatch->getId();
            $newTennisMatchsArray[$idMatch] = $tennisMatch;
        }

        //3.See the bets and attribute points for all bettors
        /** @var Bet[] */
        $betsFourthRoundArray = $betRepository->findByRound($round);

        if ($betsFourthRoundArray[0]->getPointsNumber() !== null) {
            $this->addFlash('warning', 'The points has already been inserted ');
            return $this->redirectToRoute('admin_quarterfinals');
        }

        foreach ($betsFourthRoundArray as $key => $bet) {
            $winnerIdBet = $bet->getWinnerId()->getId();
            $nbSetsBet = $bet->getSetsNumber();
            /** @var TennisMatch */
            $match = $newTennisMatchsArray[$bet->getIdMatch()->getId()];
            $winnerIdResult = $match->getWinner()->getId();
            $nbSetsResult = $match->getSetsNumber();
            $nbPointsToSetForThisRound = 0;

            if ($winnerIdBet == $winnerIdResult) {
                $nbPointsToSetForThisRound = 2;

                if ($nbSetsBet == $nbSetsResult) {
                    $nbPointsToSetForThisRound += 2;
                } elseif (abs($nbSetsBet - $nbSetsResult) == 1) {
                    $nbPointsToSetForThisRound += 1;
                }
            } elseif ($nbSetsResult == 5 && $nbSetsBet == 5) {
                $nbPointsToSetForThisRound = 2;
            }

            $bet->setPointsNumber($nbPointsToSetForThisRound);
            $em->persist($bet);
            $em->flush();
        }

        $this->addFlash('success', 'The points are attributed for the Quarter Finals !');
        return $this->redirectToRoute('admin_home');
    }

    /**
     * @Route("/admin/semifinals", name="admin_semifinals")
     */
    public function semifinals(BetRepository $betRepository)
    {
        return $this->render('admin/semifinals.html.twig');
    }

    /**
     * @Route("/admin/semifinals-showdowns/{matchNumber}", name="admin_semifinals_showdowns")
     */
    public function semifinals_showdowns(Request $request, EntityManagerInterface $em, MailerInterface $mailer, UserRepository $userRepository, $matchNumber)
    {
        $tennisMatch = new TennisMatch;
        $form = $this->createForm(TennisMatchType::class, $tennisMatch);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($tennisMatch);
            $em->flush();
            $this->addFlash('success', 'The showdown has been registered !');

            $idNextMatch = $matchNumber + 1;

            if ($idNextMatch == 3) { //If it's the last semifinals showdown
                $usersArray = $userRepository->findAll();

                foreach ($usersArray as $key => $user) {
                    $email = new TemplatedEmail();
                    $email->from(new Address("admin@friends-bet.fr", "Friends Bets Information"))
                        ->to($user->getEmail())
                        ->htmlTemplate("/emails/inviteBet.html.twig")
                        ->context([
                            'round' => 'semifinals'
                        ])
                        ->subject("Go bet on the semifinals !");

                    try {
                        $mailer->send($email);
                    } catch (Exception $e) {
                        $this->addFlash('warning', "L'envoi de l'email a échoué : " . $e->getMessage());
                    }
                }

                return $this->redirectToRoute('admin_semifinals');
            } else {
                return $this->redirect('/admin/semifinals-showdowns/' . $idNextMatch);
            }
        }

        return $this->render('admin/semifinals_showdowns.html.twig', [
            'formView' => $form->createView()
        ]);
    }

    /**
     * @Route("/admin/semifinals-deadline", name="admin_semifinals_deadline")
     */
    public function semifinals_deadline(Request $request, EntityManagerInterface $em, DeadLineRepository $deadLineRepository)
    {
        $deadLine = new DeadLine;
        $form = $this->createForm(DeadLineType::class, $deadLine);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var DeadLine */
            $deadLine = $form->getData();

            /** @var DeadLine[] */
            $deadLineDatabase = $deadLineRepository->findByRound($deadLine->getRound());

            if (count($deadLineDatabase) > 0) {
                $deadLineDatabase[0]->setDeadLine($deadLine->getDeadLine());
                $deadLine = $deadLineDatabase[0];
            }

            $em->persist($deadLine);
            $em->flush();
            $this->addFlash('success', 'The deadline has been registered !');
            return $this->redirectToRoute('admin_semifinals');
        }

        return $this->render('admin/semifinals_deadline.html.twig', [
            'formView' => $form->createView()
        ]);
    }

    /**
     * @Route("/admin/semifinals-results/{matchNumber}", name="admin_semifinals_results")
     */
    public function semifinals_results(TennisMatchRepository $tennisMatchRepository, Request $request, EntityManagerInterface $em, $matchNumber)
    {
        $round = "SemiFinals";
        $tennisMatchsArray = $tennisMatchRepository->findBy(array('round' => $round));

        if (!$tennisMatchsArray) //Showdowns are not even known
        {
            $this->addFlash('warning', 'The matchs showdowns have not been inserted !');
            return $this->redirectToRoute('admin_semifinals');
        } else {
            $idMatchInArray = $matchNumber - 1;
            $tennisMatch = $tennisMatchsArray[$idMatchInArray];
            $idMatch = $tennisMatch->getId();
            $form = $this->createForm(ResultsType::class, $tennisMatch);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                $em->persist($tennisMatch);
                $em->flush();
                $this->addFlash('success', 'The match result has been registered !');

                $idNextMatch = $matchNumber + 1;

                if ($idNextMatch == 3) {
                    $this->addFlash('success', 'All the semifinals results have been registered !');
                    return $this->redirectToRoute('admin_semifinals');
                } else {
                    /* J'arrive pas à faire fonctionner le redirectToRoute() avec un paramètre donc je fais un redirect() tout court */
                    return $this->redirect('/admin/semifinals-results/' . $idNextMatch);
                }
            } else {
                return $this->render('admin/semifinals_results.html.twig', [
                    'idMatch' => $idMatch,
                    'formView' => $form->createView()
                ]);
            }
        }
    }

    /**
     * @Route("/admin/semifinals-points-attribution", name="admin_semifinals_points_attribution")
     */
    public function semifinals_points_attribution(TennisMatchRepository $tennisMatchRepository, BetRepository $betRepository, EntityManagerInterface $em)
    {
        //1.Check that all fourthround matchs results have been registered
        $round = "SemiFinals";
        $tennisMatchsArray = $tennisMatchRepository->findBy(array('round' => $round));

        if (!$tennisMatchsArray) //Showdowns are not even known
        {
            $this->addFlash('warning', 'The matchs showdowns have not even been inserted...');
            return $this->redirectToRoute('admin_semifinals');
        } else {
            foreach ($tennisMatchsArray as $key => $tennisMatch) {
                if ($tennisMatch->getResult() === null) {
                    $this->addFlash('warning', 'One match at least has no results...');
                    return $this->redirectToRoute('admin_semifinals');
                }
            }
        }

        //2. Rebuild the tennis matchs array
        $newTennisMatchsArray = [];

        foreach ($tennisMatchsArray as $key => $tennisMatch) {
            $idMatch = $tennisMatch->getId();
            $newTennisMatchsArray[$idMatch] = $tennisMatch;
        }

        //3.See the bets and attribute points for all bettors
        /** @var Bet[] */
        $betsFourthRoundArray = $betRepository->findByRound($round);

        if ($betsFourthRoundArray[0]->getPointsNumber() !== null) {
            $this->addFlash('warning', 'The points has already been inserted ');
            return $this->redirectToRoute('admin_semifinals');
        }

        foreach ($betsFourthRoundArray as $key => $bet) {
            $winnerIdBet = $bet->getWinnerId()->getId();
            $nbSetsBet = $bet->getSetsNumber();
            /** @var TennisMatch */
            $match = $newTennisMatchsArray[$bet->getIdMatch()->getId()];
            $winnerIdResult = $match->getWinner()->getId();
            $nbSetsResult = $match->getSetsNumber();
            $nbPointsToSetForThisRound = 0;

            if ($winnerIdBet == $winnerIdResult) {
                $nbPointsToSetForThisRound = 2;

                if ($nbSetsBet == $nbSetsResult) {
                    $nbPointsToSetForThisRound += 2;
                } elseif (abs($nbSetsBet - $nbSetsResult) == 1) {
                    $nbPointsToSetForThisRound += 1;
                }
            } elseif ($nbSetsResult == 5 && $nbSetsBet == 5) {
                $nbPointsToSetForThisRound = 2;
            }

            $bet->setPointsNumber($nbPointsToSetForThisRound);
            $em->persist($bet);
            $em->flush();
        }

        $this->addFlash('success', 'The points are attributed for the Semi Finals !');
        return $this->redirectToRoute('admin_home');
    }

    /**
     * @Route("/admin/final", name="admin_final")
     */
    public function final()
    {
        return $this->render('admin/final.html.twig');
    }

    /**
     * @Route("/admin/final-showdown", name="admin_final_showdown")
     */
    public function final_showdown(Request $request, EntityManagerInterface $em, MailerInterface $mailer, UserRepository $userRepository)
    {
        $tennisMatch = new TennisMatch;
        $form = $this->createForm(TennisMatchType::class, $tennisMatch);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($tennisMatch);
            $em->flush();
            $this->addFlash('success', 'The showdown has been registered !');

            $usersArray = $userRepository->findAll();

            foreach ($usersArray as $key => $user) {
                $email = new TemplatedEmail();
                $email->from(new Address("admin@friends-bet.fr", "Friends Bets Information"))
                    ->to($user->getEmail())
                    ->htmlTemplate("/emails/inviteBet.html.twig")
                    ->context([
                        'round' => 'final'
                    ])
                    ->subject("Go bet on the final !");

                try {
                    $mailer->send($email);
                } catch (Exception $e) {
                    $this->addFlash('warning', "L'envoi de l'email a échoué : " . $e->getMessage());
                }
            }

            return $this->redirectToRoute('admin_final');
        }

        return $this->render('admin/final_showdown.html.twig', [
            'formView' => $form->createView()
        ]);
    }

    /**
     * @Route("/admin/final-deadline", name="admin_final_deadline")
     */
    public function final_deadline(Request $request, EntityManagerInterface $em, DeadLineRepository $deadLineRepository)
    {
        $deadLine = new DeadLine;
        $form = $this->createForm(DeadLineType::class, $deadLine);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var DeadLine */
            $deadLine = $form->getData();

            /** @var DeadLine[] */
            $deadLineDatabase = $deadLineRepository->findByRound($deadLine->getRound());

            if (count($deadLineDatabase) > 0) {
                $deadLineDatabase[0]->setDeadLine($deadLine->getDeadLine());
                $deadLine = $deadLineDatabase[0];
            }

            $em->persist($deadLine);
            $em->flush();
            $this->addFlash('success', 'The deadline has been registered !');
            return $this->redirectToRoute('admin_final');
        }

        return $this->render('admin/final_deadline.html.twig', [
            'formView' => $form->createView()
        ]);
    }

    /**
     * @Route("/admin/final-result", name="admin_final_result")
     */
    public function final_result(TennisMatchRepository $tennisMatchRepository, Request $request, EntityManagerInterface $em)
    {
        $round = "Final";
        $tennisMatchsArray = $tennisMatchRepository->findBy(array('round' => $round));

        if (!$tennisMatchsArray) //Showdowns are not even known
        {
            $this->addFlash('warning', 'The final showdown has not been inserted !');
            return $this->redirectToRoute('admin_final');
        } else {
            $tennisMatch = $tennisMatchsArray[0];
            $idMatch = $tennisMatch->getId();
            $form = $this->createForm(ResultsType::class, $tennisMatch);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                $em->persist($tennisMatch);
                $em->flush();
                $this->addFlash('success', 'The match result has been registered !');
                return $this->redirectToRoute('admin_final');
            } else {
                return $this->render('admin/final_result.html.twig', [
                    'idMatch' => $idMatch,
                    'formView' => $form->createView()
                ]);
            }
        }
    }

    /**
     * @Route("/admin/final-points-attribution", name="admin_final_points_attribution")
     */
    public function final_points_attribution(TennisMatchRepository $tennisMatchRepository, BetRepository $betRepository, EntityManagerInterface $em)
    {
        //1.Check that all fourthround matchs results have been registered
        $round = "Final";
        $tennisMatchsArray = $tennisMatchRepository->findBy(array('round' => $round));

        if (!$tennisMatchsArray) //Showdowns are not even known
        {
            $this->addFlash('warning', 'The matchs showdowns have not even been inserted...');
            return $this->redirectToRoute('admin_final');
        } else {
            foreach ($tennisMatchsArray as $key => $tennisMatch) { // on pourrait ne pas faire un foreach, mais bon je laisse comme ça
                if ($tennisMatch->getResult() === null) {
                    $this->addFlash('warning', 'One match at least has no results...');
                    return $this->redirectToRoute('admin_final');
                }
            }
        }

        //2. Rebuild the tennis matchs array
        $newTennisMatchsArray = [];

        foreach ($tennisMatchsArray as $key => $tennisMatch) {
            $idMatch = $tennisMatch->getId();
            $newTennisMatchsArray[$idMatch] = $tennisMatch;
        }

        //3.See the bets and attribute points for all bettors
        /** @var Bet[] */
        $betsFourthRoundArray = $betRepository->findByRound($round);

        if ($betsFourthRoundArray[0]->getPointsNumber() !== null) {
            $this->addFlash('warning', 'The points has already been inserted ');
            return $this->redirectToRoute('admin_final');
        }

        foreach ($betsFourthRoundArray as $key => $bet) {
            $winnerIdBet = $bet->getWinnerId()->getId();
            $nbSetsBet = $bet->getSetsNumber();
            /** @var TennisMatch */
            $match = $newTennisMatchsArray[$bet->getIdMatch()->getId()];
            $winnerIdResult = $match->getWinner()->getId();
            $nbSetsResult = $match->getSetsNumber();
            $nbPointsToSetForThisRound = 0;

            if ($winnerIdBet == $winnerIdResult) {
                $nbPointsToSetForThisRound = 2;

                if ($nbSetsBet == $nbSetsResult) {
                    $nbPointsToSetForThisRound += 2;
                } elseif (abs($nbSetsBet - $nbSetsResult) == 1) {
                    $nbPointsToSetForThisRound += 1;
                }
            } elseif ($nbSetsResult == 5 && $nbSetsBet == 5) {
                $nbPointsToSetForThisRound = 2;
            }

            $bet->setPointsNumber($nbPointsToSetForThisRound);
            $em->persist($bet);
            $em->flush();
        }

        $this->addFlash('success', 'The points are attributed for the Final !');

        //Mettre à jour la table ranking ???

        return $this->redirectToRoute('admin_home');
    }
}
