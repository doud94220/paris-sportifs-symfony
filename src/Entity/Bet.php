<?php

namespace App\Entity;

use App\Repository\BetRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=BetRepository::class)
 */
class Bet
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=TennisMatch::class, inversedBy="bet", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $idMatch;

    /**
     * @ORM\Column(type="integer")
     */
    private $setsNumber;

    /**
     * @ORM\OneToOne(targetEntity=User::class, inversedBy="bet", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $userId;

    /**
     * @ORM\Column(type="integer")
     */
    private $pointsNumber;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $showDown;

    /**
     * @ORM\ManyToOne(targetEntity=TennisPlayer::class, inversedBy="bets")
     */
    private $winnerId;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdMatch(): ?TennisMatch
    {
        return $this->idMatch;
    }

    public function setIdMatch(TennisMatch $idMatch): self
    {
        $this->idMatch = $idMatch;

        return $this;
    }

    //TEST KO
    // public function getIdMatch(): ?int
    // {
    //     return $this->idMatch;
    // }

    // public function setIdMatch(int $idMatch): self
    // {
    //     $this->idMatch = $idMatch;

    //     return $this;
    // }

    public function getSetsNumber(): ?int
    {
        return $this->setsNumber;
    }

    public function setSetsNumber(int $setsNumber): self
    {
        $this->setsNumber = $setsNumber;

        return $this;
    }

    public function getUserId(): ?User
    {
        return $this->userId;
    }

    public function setUserId(User $userId): self
    {
        $this->userId = $userId;

        return $this;
    }

    //TEST KO
    // public function getUserId(): ?int
    // {
    //     return $this->userId;
    // }

    // public function setUserId(int $userId): self
    // {
    //     $this->userId = $userId;

    //     return $this;
    // }

    public function getPointsNumber(): ?int
    {
        return $this->pointsNumber;
    }

    public function setPointsNumber(int $pointsNumber): self
    {
        $this->pointsNumber = $pointsNumber;

        return $this;
    }

    public function getShowDown(): ?string
    {
        return $this->showDown;
    }

    public function setShowDown(?string $showDown): self
    {
        $this->showDown = $showDown;

        return $this;
    }

    public function getWinnerId(): ?TennisPlayer
    {
        return $this->winnerId;
    }

    public function setWinnerId(?TennisPlayer $winnerId): self
    {
        $this->winnerId = $winnerId;

        return $this;
    }
}
