<?php
	function regUser($name,$job,$phone) {
		$con = mysql_connect('localhost','root','');
		mysql_select_db('html5');
		$sql = "insert into students(name,job,phone) values('{$name}','{$job}','{$phone}')";
		mysql_query($sql);
		mysql_close($con);
		return mysql_affected_rows();
	}
?>