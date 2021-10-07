<?php
require "../bootstrap.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

// all of our endpoints start with /person
// everything else results in a 404 Not Found
if ($uri[1] !== 'companies' && $uri[1] !== 'locations' && $uri[1] !== 'menus') {
    header("HTTP/1.1 404 Not Found");
    exit();
}


$requestMethod = $_SERVER["REQUEST_METHOD"];

function checkIdValid($id)
{
    if (is_nan($id) || !is_int($id)) {
        header('HTTP/1.1 400 Bad Request');
        $response['body'] = "id must be an integer";
    } else if ($id < 1) {
        header('HTTP/1.1 400 Bad Request');
        $response['body'] = "id must be greated than 0";
    } else {
        return true;
    }
}

function isValidHttpUrl($url)
{
    if (filter_var($url, FILTER_VALIDATE_URL) === FALSE) {
        return false;
    } else {
        return true;
    }
}

// the user id is, of course, optional and must be a number:
$id = null;
if (isset($uri[2])) {
    $id = (int) $uri[2];
}

$argument = null;
if (isset($uri[3])) {
    $argument = $uri[3];
}



$response['body'] = "No endpoint '" . $uri[1] . "' found.";

//companies endpoint
if ($uri[1] === "companies") {
    if ($requestMethod === 'GET') {
        if ($id) {
            if (checkIdValid($id)) {
                if ($argument === null) {
                    // Get individual company
                    $companyResponse = $entityManager->find("Company", (int)$id);
                    if ($companyResponse === null) {
                        header("HTTP/1.1 404 Not Found");
                        $response['body'] = "No company with id: " . $id;
                    } else {
                        $company = (object) [
                            'id' => $companyResponse->getId(),
                            'name' => $companyResponse->getName(),
                            'logoUrl' => $companyResponse->getLogoUrl()
                        ];
                        $response['body'] = json_encode($company);
                        header('HTTP/1.1 200 OK');
                    }
                } else if ($argument === "menus") {
                    //Get all menus
                    $menus = $entityManager->getRepository('Menu', (int)$id)->findBy(
                        array('companyId' => $id)
                    );;
                    $menusList = array();

                    foreach ($menus as $menu) {
                        $menusList[] = array(
                            'id' => $menu->getId(),
                            'title' => $menu->getTitle(),
                        );
                    }
                    if (empty($menusList)) {
                        header('HTTP/1.1 404 Not Found');
                        $response['body'] = "No menus found with company id '" . $id . "'";
                    } else {
                        $response['body'] = json_encode($menusList);
                        header('HTTP/1.1 200 OK');
                    }
                } else if ($argument === "locations") {
                    //Get all locations
                    $locations = $entityManager->getRepository('Location', (int)$id)->findBy(
                        array('companyId' => $id)
                    );;
                    $locationsList = array();

                    foreach ($locations as $location) {
                        $locationsList[] = array(
                            'name' => $location->getName(),
                            'capacity' => $location->getcapacity(),
                            'manager' => $location->getManager(),
                        );
                    }
                    if (empty($locationsList)) {
                        header('HTTP/1.1 404 Not Found');
                        $response['body'] = "No locations found with company id '" . $id . "'";
                    } else {
                        $response['body'] = json_encode($locationsList);
                        header('HTTP/1.1 200 OK');
                    }
                } else {
                    header('HTTP/1.1 400 Bad Request');
                    $response['body'] = "Unknown argument '" . $argument . "'";
                }
            }
        } else {
            //Get All Companies
            $companies = $entityManager->getRepository("Company")->findAll();
            $companiesList = array();

            foreach ($companies as $company) {
                $companiesList[] = array(
                    'id' => $company->getId(),
                    'name' => $company->getName(),
                    'logoUrl' => $company->getLogoUrl()
                );
            }
            if (empty($companiesList)) {
                $response['body'] = "No companies found.";
                header("HTTP/1.1 404 Not Found");
            } else {
                $response['body'] = json_encode($companiesList);
            }
        };
    } else if ($requestMethod === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        if (
            !$data['name'] ||
            !$data['logoUrl'] ||
            !isValidHttpUrl($data['logoUrl'])
        ) {
            header('HTTP/1.1 400 Bad Request');
            $response['body'] = "Please pass a valid name and logoUrl";
        } else {
            $company = new Company();
            $company->setName($data['name']);
            $company->setLogoUrl($data['logoUrl']);

            $entityManager->persist($company);
            $entityManager->flush();

            $response['body'] = "Created Company with ID " . $company->getId();
            header("HTTP/1.1 200 OK");
        }
    } else if ($requestMethod === 'PUT') {
        if ($id) {
            $data = json_decode(file_get_contents('php://input'), true);
            if (checkIdValid($id)) {
                if (
                    !$data['name'] ||
                    !$data['logoUrl'] ||
                    !isValidHttpUrl($data['logoUrl'])
                ) {
                    header('HTTP/1.1 400 Bad Request');
                    $response['body'] = "Please pass a valid name and logoUrl";
                } else {
                    $company = $entityManager->find("Company", (int)$id);
                    if ($company === null) {
                        header('HTTP/1.1 404 Not Found');
                        $response['body'] = "No company found with id '" . $id . "'";
                    } else {
                        $company->setName($data['name']);
                        $company->setLogoUrl($data['logoUrl']);
                        $entityManager->flush();
                        header('HTTP/1.1 200 OK');
                        $response['body'] = "Company updated successfully";
                    }
                }
            } else {
                $response['body'] = "Please pass a valid id";
                header("HTTP/1.1 400 Bad Request");
            }
        } else {
            $response['body'] = "Please pass an id";
            header("HTTP/1.1 400 Bad Request");
        }
    } else if ($requestMethod === "DELETE") {
        if ($id) {
            if (checkIdValid($id)) {
                $company = $entityManager->find("Company", (int)$id);
                if ($company === null) {
                    header('HTTP/1.1 404 Not Found');
                    $response['body'] = "No Company with ID " . $id . " was found.";
                } else {
                    $entityManager->remove($company);
                    $entityManager->flush();
                    $response['body'] = "Company with ID " . $id . " deleted.";
                    header("HTTP/1.1 200 OK");
                }
            }
        } else {
            header('HTTP/1.1 400 Bad Request');
            $response['body'] = "Please pass an id";
        }
    }
}

//menus endpoint
if ($uri[1] === "menus") {
    if ($requestMethod === 'GET') {
        if ($id) {
            if (checkIdValid($id)) {
                // Get individual menu
                $menuResponse = $entityManager->find("Menu", (int)$id);
                if ($menuResponse === null) {
                    header("HTTP/1.1 404 Not Found");
                    $response['body'] = "No menu with id: " . $id;
                } else {
                    $menu = (object) [
                        'id' => $menuResponse->getId(),
                        'title' => $menuResponse->getTitle(),
                        'companyId' => $menuResponse->getCompanyId()->getId()
                    ];
                    $response['body'] = json_encode($menu);
                    header('HTTP/1.1 200 OK');
                }
            }
        } else {
            $response['body'] = "Please pass an id";
            header("HTTP/1.1 400 Bad Request");
        }
    } else if ($requestMethod === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        if (
            !$data['title'] || !$data['companyId']
        ) {
            header('HTTP/1.1 400 Bad Request');
            $response['body'] = "Please pass a valid title and companyId";
        } else {
            $company = $entityManager->find("Company", (int)$data['companyId']);
            if ($company === null) {
                header('HTTP/1.1 404 Not Found');
                $response['body'] = "No company found with id '" . $id . "'";
            } else {
                $menu = new Menu();
                $menu->setTitle($data['title']);
                $menu->setCompanyId($company);

                $entityManager->persist($menu);
                $entityManager->flush();

                $response['body'] = "Created Menu with ID " . $menu->getId();
                header("HTTP/1.1 200 OK");
            }
        }
    } else if ($requestMethod === 'DELETE') {
        if ($id) {
            if (checkIdValid($id)) {
                $menu = $entityManager->find("Menu", (int)$id);
                if ($menu === null) {
                    header('HTTP/1.1 404 Not Found');
                    $response['body'] = "No Menu with ID " . $id . " was found.";
                } else {
                    $entityManager->remove($menu);
                    $entityManager->flush();
                    $response['body'] = "Menu with ID " . $id . " deleted.";
                    header("HTTP/1.1 200 OK");
                }
            }
        } else {
            header('HTTP/1.1 400 Bad Request');
            $response['body'] = "Please pass an id";
        }
    }
}

//locations endpoint
if ($uri[1] === "locations") {
    //Create locaton
    if ($requestMethod === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        if (
            !$data['name'] || !$data['capacity'] || !$data['manager'] || !$data['companyId']
        ) {
            header('HTTP/1.1 400 Bad Request');
            $response['body'] = "Please pass a valid name, capacity, manager, and companyId";
        } else {
            $company = $entityManager->find("Company", (int)$data['companyId']);
            if ($company === null) {
                header('HTTP/1.1 404 Not Found');
                $response['body'] = "No company found with id '" . $id . "'";
            } else {
                $location = new Location();
                $location->setName($data['name']);
                $location->setCapacity($data['capacity']);
                $location->setManager($data['manager']);
                $location->setCompanyId($company);

                $entityManager->persist($location);
                $entityManager->flush();

                $response['body'] = "Created Location with ID " . $location->getId();
                header("HTTP/1.1 200 OK");
            }
        }
    } else if ($requestMethod === 'DELETE') {
        if ($id) {
            if (checkIdValid($id)) {
                $location = $entityManager->find("Location", (int)$id);
                if ($location === null) {
                    header('HTTP/1.1 404 Not Found');
                    $response['body'] = "No Location with ID " . $id . " was found.";
                } else {
                    $entityManager->remove($location);
                    $entityManager->flush();
                    $response['body'] = "Location with ID " . $id . " deleted.";
                    header("HTTP/1.1 200 OK");
                }
            }
        } else {
            header('HTTP/1.1 400 Bad Request');
            $response['body'] = "Please pass an id";
        }
    }
}

echo $response['body'];
