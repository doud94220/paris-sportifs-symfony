<?php

namespace App\Form;

use App\Entity\TennisPlayer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TennisPlayerType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('winner', EntityType::class, [
                'class' => TennisPlayer::class,
                'choice_label' => function (TennisPlayer $tennisPlayer) {
                    return $tennisPlayer->getFirstName() . ' ' . $tennisPlayer->getFamilyName();
                }
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => TennisPlayer::class,
        ]);
    }
}
