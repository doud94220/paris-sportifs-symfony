<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="homepage")
     */
    public function homepage()
    {
        return $this->render('home.html.twig');
    }

    /**
     * @Route("/test-mail", name="home_test_mail")
     */
    public function testTemplateMails()
    {
        return $this->render('/emails/confirmationAccountCreation.html.twig', [
            'emailAddress' => "aaa@aaa.fr",
            'password' => "the_password"
        ]);
    }
}
