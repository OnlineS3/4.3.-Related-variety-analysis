<?php
include $_SERVER['DOCUMENT_ROOT'] . '/related_var/backend/dbclient.php';


$db = new DbClient();
$res = $db->getAllCountries();
echo json_encode($res);
