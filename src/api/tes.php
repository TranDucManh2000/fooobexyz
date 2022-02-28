<?php
$dbhost="localhost:90";
$dbuser="root";
$dbpass="";
$dbname="users"
$conn = mysqli_connect(
    $dbhost,$dbuser,$dbpass,$dbname
);
if($conn){
    mysqli_query(
        $conn,"SET NAMES 'utf8'"
    );
}else{
    echo "dcm kn that bai".mysqli_connect_error();
}
?>