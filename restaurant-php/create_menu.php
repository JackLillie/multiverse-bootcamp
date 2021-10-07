<?php
// create_menu.php <title> <companyId> 
require_once "bootstrap.php";


$newMenuTitle = $argv[1];
$newMenuCompany = $entityManager->find("Company", (int)$argv[2]);

$menu = new Menu();
$menu->setTitle($newMenuTitle);
$menu->setCompanyId($newMenuCompany);

$entityManager->persist($menu);
$entityManager->flush();

echo "Created Menu with ID " . $menu->getId() . "\n";
