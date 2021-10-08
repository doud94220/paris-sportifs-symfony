<?php

namespace App\Form;

use App\Entity\TennisMatch;
use App\Entity\TennisPlayer;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class TennisMatchType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('round', ChoiceType::class, [
                'label' => 'Tour/Etape du tournoi : ',
                'choices' => [
                    // JE COMMENTE EN DESSSOUS, PAKE PAS FACILE DE GERER LE CAS OU VALEUR = NULL
                    //"---SelectRound---" => null,
                    "FourthRound" => "FourthRound",
                    "QuarterFinals" => "QuarterFinals",
                    "SemiFinals" => "SemiFinals",
                    "Final" => "Final"
                ]
            ])
            ->add('playerOne', EntityType::class, [
                'label' => 'PlayerOne : ',
                'placeholder' => '---SelectPlayerOne---',
                'class' => TennisPlayer::class,
                'choice_label' => function (TennisPlayer $tennisPlayer) {
                    return $tennisPlayer->getFirstName() . ' ' . $tennisPlayer->getFamilyName();
                }
            ])
            ->add('playerTwo', EntityType::class, [
                'label' => 'PlayerTwo : ',
                'placeholder' => '---SelectPlayerTwo---',
                'class' => TennisPlayer::class,
                'choice_label' => function (TennisPlayer $tennisPlayer) {
                    return $tennisPlayer->getFirstName() . ' ' . $tennisPlayer->getFamilyName();
                }
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => TennisMatch::class,
        ]);
    }
}
