<?php
foreach ($_GET as $key => $value) $$key = $value;
$con = mysql_connect('localhost','root','');
mysql_select_db('html5');
if(isset($msg)) {
	$sql = "insert into chat(msg) values('$msg')";
	mysql_query($sql);
} 
mysql_close($con);
?>