<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '';

$db = new DbClient();
$res = $db->getAllCountryStrings();
echo json_encode($res);


function getCountries()
{
    $db = new DbClient();
    $res = $db->getAllCountryStrings();
    sort($res);
    return $res;
}

//Dummy function used for offline testing
function getCountriesStub()
{
    return array("Greece", "Italy", "Germany", "France");
}
