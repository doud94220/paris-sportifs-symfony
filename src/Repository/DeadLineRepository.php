<?php

namespace App\Repository;

use App\Entity\DeadLine;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method DeadLine|null find($id, $lockMode = null, $lockVersion = null)
 * @method DeadLine|null findOneBy(array $criteria, array $orderBy = null)
 * @method DeadLine[]    findAll()
 * @method DeadLine[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DeadLineRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DeadLine::class);
    }

    // /**
    //  * @return DeadLine[] Returns an array of DeadLine objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?DeadLine
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
