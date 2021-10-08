<?php

namespace App\Form;

// use App\Entity\TennisMatch;
// use App\Entity\TennisPlayer;
// use App\Form\TennisPlayerType;
// use Symfony\Component\Form\AbstractType;
// use Symfony\Component\Form\FormBuilderInterface;
// use Symfony\Bridge\Doctrine\Form\Type\EntityType;
// use Symfony\Component\OptionsResolver\OptionsResolver;
// use Symfony\Component\Form\Extension\Core\Type\TextType;
// use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
// use Symfony\Component\Form\Extension\Core\Type\CollectionType;

// class ResultsType extends AbstractType
// {
//     public function buildForm(FormBuilderInterface $builder, array $options)
//     {
        //$builder
        //JE COMMENTE L'ID PAKE CA MARCHE PAS ET JE COMPRENDS PAS L'ERREUR...Et je le mets dans un input hidden dans le template
        // ->add('id', EntityType::class, [
        //     'class' => TennisMatch::class,
        //     'choice_label' => function (TennisMatch $tennisMatch) {
        //         return $tennisMatch->getRound();
        //     }
        // ])
        // ->add('winner', EntityType::class, [
        //     'class' => TennisPlayer::class,
        //     'choice_label' => function (TennisPlayer $tennisPlayer) {
        //         return $tennisPlayer->getFirstName() . ' ' . $tennisPlayer->getFamilyName();
        //     }
        // ])
        // ->add('setsNumber', ChoiceType::class, [
        //     'choices' => [
        //         "3" => "3",
        //         "4" => "4",
        //         "5" => "5"
        //     ]
        // ])
        // ->add('result', TextType::class, [
        //     'attr' => ['placeholder' => 'Put the match score result']
        // ]);

        //LA JE TESTE LE COLLECTION TYPE ....mais sans succès...
        // $builder
        //     ->add(
        //         'winner',
        //         CollectionType::class,
        //         array(
        //             'entry_type' => TennisPlayerType::class,
        //             'entry_options' => function (TennisPlayer $tennisPlayer) {
        //                 return $tennisPlayer->getFirstName() . ' ' . $tennisPlayer->getFamilyName();
        //             }
        //         )
        //     );
//     }

//     public function configureOptions(OptionsResolver $resolver)
//     {
//         // $resolver->setDefaults(array(
//         //     'data_class' => TennisMatch::class,
//         // ));
//     }
// }
