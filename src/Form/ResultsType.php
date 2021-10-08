<?php

namespace App\Form;

use App\Entity\TennisMatch;
use App\Entity\TennisPlayer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class ResultsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('winner', EntityType::class, [
                'class' => TennisPlayer::class,
                'choice_label' => function (TennisPlayer $tennisPlayer) {
                    return $tennisPlayer->getFirstName() . ' ' . $tennisPlayer->getFamilyName();
                }
            ])
            ->add('setsNumber', ChoiceType::class, [
                'choices' => [
                    "3" => "3",
                    "4" => "4",
                    "5" => "5"
                ]
            ])
            ->add('result', TextType::class, [
                'attr' => ['placeholder' => 'Put the match score result']
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => TennisMatch::class
        ]);
    }
}
