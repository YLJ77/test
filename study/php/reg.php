<?php
	header('Content-Type:text/html;charset=utf8');
	include 'mydb.php';
	if(isset($_POST)) {
		foreach ($_POST as $key => $value) {
			$$key = $value;
		}

		/*$con = mysql_connect('localhost','root','');
		mysql_select_db('html5');
		$sql = "insert into students(name,job,phone) values('{$name}','{$job}','{$phone}')";
		mysql_query($sql);*/
		if(/*mysql_affected_rows()>0*/ regUser($name,$job,$phone)) {
			echo "<script>alert('注册成功！');</script>";
		} else {
			echo "<script>alert('注册失败！');</script>";
		}
	}
?>