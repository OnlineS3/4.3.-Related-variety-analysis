<?php
include $_SERVER['DOCUMENT_ROOT'] . '/related_var/backend/dbclient.php';

$regionStr = "";
if (isset($_GET['region'])) {
    $regionStr = $_GET['region'];
} else {
    echo "param not present. should throw exception";
}

$db = new DbClient();
$res = $db->findByRegionString($regionStr);
echo json_encode($res);
