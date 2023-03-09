<?php

header("Access-Control-Allow-Origin: *");
try {
    $pdo = new PDO("mysql:host=localhost; dbname=blog_voyages", 'root', '');
} catch (PDOException $e) {
    die("Erreur : " . $e->getMessage());
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];
}

$sql = "SELECT * FROM articles WHERE id = :id";

$req = $pdo->prepare($sql);
$req->bindParam("id", $id, PDO::PARAM_INT);
$req->execute();
$res = $req->fetchAll();

echo json_encode($res);
?>