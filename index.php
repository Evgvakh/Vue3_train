
<?php 

session_start();
setcookie('AAAA', 'AAAAAAA');
$_SESSION['user'] = 'Igor';

require('dist/index.html') ?>
