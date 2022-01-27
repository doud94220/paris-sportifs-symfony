<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use Symfony\Component\Mime\Address;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserCreationController extends AbstractController
{
    protected $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    /**
     * @Route("/user-creation", name="user_creation")
     */
    public function creation(Request $request, EntityManagerInterface $em, MailerInterface $mailer)
    {
        $user = new User;
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $hash = $this->encoder->encodePassword($user, $user->getPassword());
            $oldPassword = $user->getPassword();
            $user->setPassword($hash);
            $user->setAdmin(0);
            $em->persist($user);
            $em->flush();

            $this->addFlash('success', 'Votre compte a bien été créé ! Vous allez recevoir un email de confirmation.');

            //Mail de confirmation de création de compte avec les identifiants
            $email = new TemplatedEmail();
            $email->from(new Address("doud75@gmail.fr", "Account Creation"))
                ->to($user->getEmail())
                ->htmlTemplate("/emails/confirmationAccountCreation.html.twig")
                ->context([
                    'emailAddress' => $user->getEmail(),
                    'password' => $oldPassword
                ])
                ->subject("Confirmation Account Creation");

            try {
                //throw new Exception("test mail KO");
                $mailer->send($email);
            } catch (Exception $e) {
                $this->addFlash('warning', "L'envoi de l'email a échoué, veuillez contacter l'administrateur du site en lui précisant l'erreur suivante : " . $e->getMessage());
            }

            return $this->redirectToRoute('homepage');
        }

        return $this->render('user-creation.html.twig', [
            'formView' => $form->createView()
        ]);
    }
}
