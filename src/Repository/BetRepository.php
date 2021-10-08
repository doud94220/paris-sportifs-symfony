<?php

namespace App\Repository;

use App\Entity\Bet;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Bet|null find($id, $lockMode = null, $lockVersion = null)
 * @method Bet|null findOneBy(array $criteria, array $orderBy = null)
 * @method Bet[]    findAll()
 * @method Bet[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BetRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Bet::class);
    }

    public function findByRound($round) //Fonction fait maison !!!
    {
        return $this->createQueryBuilder('b')
            ->join('b.idMatch', 'm')
            ->where('m.round = :val')
            ->setParameter('val', $round)
            ->orderBy('b.userId', 'ASC')
            ->getQuery()
            ->getResult();
    }

    public function findTotalPointsByUser() //Fonction fait maison encore !!!
    {
        return $this->createQueryBuilder('b')
            ->select('u.nickName', 'SUM(b.pointsNumber) as points')
            ->join('b.userId', 'u')
            ->groupBy('u.id')
            ->orderBy('points', 'DESC')
            ->getQuery()
            ->getResult();

        /*
        select user_id_id, sum(points_number) as points
        from bet
        group by user_id_id
        order by sum(points_number)
        */
    }

    public function findByRoundAndByUser($round, $userId) //Fonction maison 3 !!!
    {
        return $this->createQueryBuilder('b')
            ->join('b.idMatch', 'm')
            ->where('m.round = :val')
            ->setParameter('val', $round)
            ->join('b.userId', 'u')
            ->andWhere('u.id = :val2')
            ->setParameter('val2', $userId)
            ->getQuery()
            ->getResult();

        /*
            select *
            from bet
            where id_match_id in (31,32)
            group by user_id_id

            select user_id_id, sum(points_number)
            from bet
            where id_match_id in (31,32)
            group by user_id_i

        */
    }

    // /**
    //  * @return Bet[] Returns an array of Bet objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Bet
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
