<?php

namespace App\Entity;

use App\Repository\TennisMatchRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TennisMatchRepository::class)
 */
class TennisMatch
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $round;

    /**
     * @ORM\OneToOne(targetEntity=TennisPlayer::class, inversedBy="tennisMatch", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $playerOne;

    /**
     * @ORM\OneToOne(targetEntity=TennisPlayer::class, inversedBy="tennisMatch", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $playerTwo;

    /**
     * @ORM\OneToOne(targetEntity=Bet::class, mappedBy="idMatch", cascade={"persist", "remove"})
     */
    private $bet;

    /**
     * @ORM\OneToOne(targetEntity=TennisPlayer::class, cascade={"persist", "remove"})
     */
    private $winner;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $setsNumber;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $result;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRound(): ?string
    {
        return $this->round;
    }

    public function setRound(string $round): self
    {
        $this->round = $round;

        return $this;
    }

    public function getPlayerOne(): ?TennisPlayer
    {
        return $this->playerOne;
    }

    public function setPlayerOne(TennisPlayer $playerOne): self
    {
        $this->playerOne = $playerOne;

        return $this;
    }

    public function getPlayerTwo(): ?TennisPlayer
    {
        return $this->playerTwo;
    }

    public function setPlayerTwo(TennisPlayer $playerTwo): self
    {
        $this->playerTwo = $playerTwo;

        return $this;
    }

    public function getBet(): ?Bet
    {
        return $this->bet;
    }

    public function setBet(Bet $bet): self
    {
        // set the owning side of the relation if necessary
        if ($bet->getIdMatch() !== $this) {
            $bet->setIdMatch($this);
        }

        $this->bet = $bet;

        return $this;
    }

    public function getWinner(): ?TennisPlayer
    {
        return $this->winner;
    }

    public function setWinner(?TennisPlayer $winner): self
    {
        $this->winner = $winner;

        return $this;
    }

    public function getSetsNumber(): ?int
    {
        return $this->setsNumber;
    }

    public function setSetsNumber(?int $setsNumber): self
    {
        $this->setsNumber = $setsNumber;

        return $this;
    }

    public function getResult(): ?string
    {
        return $this->result;
    }

    public function setResult(?string $result): self
    {
        $this->result = $result;

        return $this;
    }
}
