<?php
// create_location.php <name> <capacity> <manager> <companyId> 
require_once "bootstrap.php";

$newLocationName = $argv[1];
$newLocationCapacity = $argv[2];
$newLocationManager = $argv[3];
$newLocationCompany = $entityManager->find("Company", (int)$argv[4]);

$location = new Location();
$location->setName($newLocationName);
$location->setCapacity($newLocationCapacity);
$location->setManager($newLocationManager);
$location->setCompanyId($newLocationCompany);

$entityManager->persist($location);
$entityManager->flush();

echo "Created Location with ID " . $location->getId() . "\n";
