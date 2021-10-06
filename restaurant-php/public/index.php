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

if ($uri[1] === "companies") {
    switch ($requestMethod) {
        case 'GET':
            if ($id) {
                $companyResponse = $entityManager->find("Company", (int)$id);
                if ($companyResponse === null) {
                    header("HTTP/1.1 404 Not Found");
                    $response['body'] = "No company with id: " . $id;
                    break;
                }
                $company = (object) [
                    'id' => $companyResponse->getId(),
                    'name' => $companyResponse->getName(),
                    'logoUrl' => $companyResponse->getLogoUrl()
                ];
                $response['body'] = json_encode($company);
                header('HTTP/1.1 200 OK');
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
                $response['body'] = json_encode($companiesList);
            };
            break;
        case 'POST':
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
            }
        case 'DELETE':
            if ($id) {
                if (checkIdValid($id)) {
                    $company = $entityManager->find("Company", (int)$id);
                    if ($company === null) {
                        header('HTTP/1.1 404 Not Found');
                        $response['body'] = "No Company with ID " . $id . " was found.";
                        break;
                    }
                    $entityManager->remove($company);
                    $entityManager->flush();
                    $response['body'] = "Company with ID " . $id . " deleted.";
                }
            } else {
                header('HTTP/1.1 400 Bad Request');
                $response['body'] = "Please pass an id";
            }
    }
}

header('HTTP/1.1 400 Bad Request');
$response['body'] = "No endpoint '" . $uri[1] . "' found.";

echo $response['body'];
