<?php
// create_location.php <name>
require_once "bootstrap.php";

$newLocationName = $argv[1];
$newLocationCapacity = $argv[2];
$newLocationManager = $argv[3];

$location = new Location();
$location->setName($newLocationName);
$location->setCapacity($newLocationCapacity);
$location->setManager($newLocationManager);

$entityManager->persist($location);
$entityManager->flush();

echo "Created Location with ID " . $location->getId() . "\n";
