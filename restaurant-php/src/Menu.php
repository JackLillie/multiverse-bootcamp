<?php

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="menus")
 */

class Menu
{

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private $id;

    /**
     * Many menus have one company. This is the owning side.
     * @ORM\ManyToOne(targetEntity="Company", inversedBy="menus")
     * @ORM\JoinColumn(name="companyId", referencedColumnName="id")
     */
    private $companyId;

    /**
     * @ORM\Column(type="string")
     */
    private $title;

    public function getId(): int
    {
        return $this->id;
    }


    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }


}