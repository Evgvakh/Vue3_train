<?php

header("Access-Control-Allow-Origin: *");
try {
    $pdo = new PDO("mysql:host=localhost; dbname=blog_voyages", 'root', '');
} catch (PDOException $e) {
    die("Erreur : " . $e->getMessage());
}

$limit = 2;
$offset = 0;

if(isset($_GET['limit'])) {
    $limit = $_GET['limit'];
}

if(isset($_GET['offset'])) {
    $offset = $_GET['offset'] * $limit;
}

$sql = "SELECT * FROM `articles` LIMIT :int OFFSET :offset";

$req = $pdo->prepare($sql);
$req->bindParam("int", $limit, PDO::PARAM_INT);
$req->bindParam("offset", $offset, PDO::PARAM_INT);
$req->execute();
$res = $req->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($res);
?>