<?php
	foreach ($_GET as $key => $value) $$key = $value;
	
	$con = mysql_connect('localhost','root','');
	mysql_select_db('html5');

	if (isset($time)) {
		$time = $time/1000;
		$sql2 = "select msg from chat where unix_timestamp(time) > {$time}";

		$result = mysql_query($sql2);
		$arr = array();

		// $arr[] = '1111';
		while($row = mysql_fetch_assoc($result)) {
			$arr[] = $row['msg'];
		}

		$jsonStr = json_encode($arr);
		echo $jsonStr;
		mysql_free_result($result);
	}

	mysql_close($con);
?>