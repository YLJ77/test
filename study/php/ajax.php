<?php
	$key = $_GET['key'];
	$con = mysql_connect('localhost','root','');
	mysql_select_db('html5');
	$sql = "select name from students where name like '%{$key}%'";
	$result = mysql_query($sql);
	$arr = array();
	while($row = mysql_fetch_row($result)) {
		$arr[] = $row[0];
	}
	echo json_encode($arr);

	mysql_free_result($result);
	mysql_close($con);
	
?>