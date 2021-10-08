<?php

namespace App\Repository;

use App\Entity\TennisMatch;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TennisMatch|null find($id, $lockMode = null, $lockVersion = null)
 * @method TennisMatch|null findOneBy(array $criteria, array $orderBy = null)
 * @method TennisMatch[]    findAll()
 * @method TennisMatch[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TennisMatchRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TennisMatch::class);
    }

    // /**
    //  * @return TennisMatch[] Returns an array of TennisMatch objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?TennisMatch
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
