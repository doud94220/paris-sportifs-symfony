<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('firstName', TextType::class, [
                'label' => 'Prénom :',
                'attr' => ['placeholder' => 'Renseignez votre prénom']
            ])
            ->add('lastName', TextType::class, [
                'label' => 'Nom de famille :',
                'attr' => ['placeholder' => 'Renseignez votre nom de famille']
            ])
            ->add('nickName', TextType::class, [
                'label' => 'Surnom :',
                'attr' => ['placeholder' => 'Renseignez votre petit surnom !']
            ])
            ->add('email', EmailType::class, [
                'label' => 'Email :',
                'attr' => [
                    'placeholder' => 'Tapez votre email (il sera votre identifiant)',
                    'size' => 35
                ]
            ])
            ->add('password', PasswordType::class, [
                'label' => 'Mot de passe :',
                'attr' => ['placeholder' => 'Tapez votre mot de passe']
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
