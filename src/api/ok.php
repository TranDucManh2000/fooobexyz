<?php
//1  goi file ket noi
include 'tes.php';
// 2 truy van sql 
$sql = "SELECT * FROM ok";
$query = mysqli_query($conn,$sql);
// 3 đếm số kq trả về của truy vấn 
$value_ro = mysqli_num_rows($query);
echo $value_ro
?>