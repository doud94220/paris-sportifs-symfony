<?php

namespace App\Form;

use App\Entity\DeadLine;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;

class DeadLineType extends AbstractType
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
            ->add('deadLine', DateTimeType::class, [
                'label' => 'Dead Line : ',
                'widget' => 'single_text'
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => DeadLine::class
        ]);
    }
}
