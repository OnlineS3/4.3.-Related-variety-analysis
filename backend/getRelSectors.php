<?php
include $_SERVER['DOCUMENT_ROOT'] . '/related_var/backend/dbclient.php';


$postRequestBody = file_get_contents('php://input'); //format ["sector1","sector2",..]
$sectorsArray = json_decode($postRequestBody);

$db = new DbClient();
echo json_encode($db->getRelativeSectorsOfSectors($sectorsArray));
