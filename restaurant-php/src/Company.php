<?php

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
require_once('Menu.php');
require_once('Location.php');

/**
 * @ORM\Entity
 * @ORM\Table(name="companies")
 */

class Company
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private $id;
    
    /**
     * One company has many menus. This is the inverse side.
     * @ORM\OneToMany(targetEntity="Menu", mappedBy="company")
     */
    private $menus;

    /**
     * One company has many locations. This is the inverse side.
     * @ORM\OneToMany(targetEntity="Location", mappedBy="company")
     */
    private $locations;

    /**
     * @ORM\Column(type="string")
     */
    private $name;

    /**
     * @ORM\Column(type="string")
     */
    private $logoUrl;

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

    public function getLogoUrl(): string
    {
        return $this->logoUrl;
    }
    public function setLogoUrl(string $logoUrl): void
    {
        $this->logoUrl = $logoUrl;
    }

    public function __construct()
    {
        $this->menus = new ArrayCollection();
        $this->locations = new ArrayCollection();
    }

    public function getMenus()
    {
        return $this->menus;
    }

    public function getLocations()
    {
        return $this->locations;
    }
}