<?php
// create_company.php <name>
require_once "bootstrap.php";

$newCompanyName = $argv[1];
$newCompanyLogoUrl = $argv[2];

$company = new Company();
$company->setName($newCompanyName);
$company->setLogoUrl($newCompanyLogoUrl);

$entityManager->persist($company);
$entityManager->flush();

echo "Created Company with ID " . $company->getId() . "\n";
