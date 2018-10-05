<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/related_var/backend/dbclient.php';

$countryStr = "";
if (isset($_GET['country'])) {
    $countryStr = $_GET['country'];
} else {
    echo "param not present. should throw exception";
}

$db = new DbClient();
$res = $db->getAllRegionStringsByCountry($countryStr);
echo json_encode($res);


function getRegions($country)
{
    $db = new DbClient();
    $res = $db->getAllRegionStringsByCountry($country);
    sort($res);
    return $res;
}

//Dummy function used for offline testing
function getRegionsStub($country)
{
    return array("Kentriki Makedonia", "Thraki", "Peloponisos", "Kriti");
}
