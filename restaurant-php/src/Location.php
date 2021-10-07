<?php

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="locations")
 */

class Location
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private $id;

    /**
     * Many locations have one company. This is the owning side.
     * @ORM\ManyToOne(targetEntity="Company", inversedBy="locations")
     * @ORM\JoinColumn(name="companyId", referencedColumnName="id")
     */
    private $companyId;

    /**
     * @ORM\Column(type="string")
     */
    private $name;

    /**
     * @ORM\Column(type="integer")
     */
    private $capacity;

    /**
     * @ORM\Column(type="string")
     */
    private $manager;

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }


    public function getCapacity(): int
    {
        return $this->capacity;
    }

    public function setCapacity(int $capacity): void
    {
        $this->capacity = $capacity;
    }


    public function getManager(): string
    {
        return $this->manager;
    }

    public function setManager(string $manager): void
    {
        $this->manager = $manager;
    }

    public function getCompanyId(): object
    {
        return $this->companyId;
    }


    public function setCompanyId(object $companyId): void
    {
        $this->companyId = $companyId;
    }
}
