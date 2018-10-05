<?php
include $_SERVER['DOCUMENT_ROOT'] . '/related_var/backend/dbclient.php';

$nutsString = "";
if (isset($_GET['nuts'])) {
    $nutsString = $_GET['nuts'];
} else {
    echo "param not present. should throw exception";
}

$db = new DbClient();
$res = $db->getSectorsForNuts($nutsString);
echo json_encode($res);
