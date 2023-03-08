<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

var_dump($_POST);

if(isset($_POST['title'])) {
    $title = $_POST['title'];
}

if(isset($_POST['content'])) {
    $content = $_POST['content'];
}

if(isset($_POST['img'])) {
    $img = $_POST['img'];
}

if(isset($_POST['id_user'])) {
    $id_user = $_POST['id_user'];
}

if(isset($_POST['id_category'])) {
    $id_cat = $_POST['id_category'];
}

if(isset($_POST['date'])) {
    $date = $_POST['date'];
}

try {
    $pdo = new PDO("mysql:host=localhost; dbname=blog_voyages", 'root', '');
} catch (PDOException $e) {
    die("Erreur : " . $e->getMessage());
}

$sql = "INSERT INTO articles (titre, contenu, img, id_category, id_user, date) VALUES (:title, :content, :img, :id_cat, :id_user, :date)";
$req = $pdo->prepare($sql);
$req->execute(array('title' => $title, 'content' => $content, 'img' => $img, 'id_cat' => $id_cat, 'id_user' => $id_user, 'date' => $date));        

?>