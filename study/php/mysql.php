<?php
	$con = mysql_connect('localhost','root','');
	if($con) echo $con;

	mysql_select_db('html5');
	$sql = 'select * from students';
	$result = mysql_query($sql);
	echo "<table border='1'>";
	/*$fields = mysql_list_fields('html5','students');
	//1-1
	echo "<tr>";
	for($i=0;$i < mysql_num_fields($fields);$i++) {
		$field = mysql_field_name($fields, $i);
		echo "<td>{$field}</td>";
	}	
	echo "</tr>";*/
	//2-1
	/*while ($row = mysql_fetch_row($result)) {
		echo "<tr>";
		foreach ($row as $value) echo "<td>{$value}</td>";
		echo "</tr>";
	}*/
	$count = mysql_num_rows($result);
	$column = mysql_num_fields($result);
	//1-2
	echo "<tr>";
	for($i=0;$i < $column;$i++) echo "<td>".mysql_field_name($result, $i)."</td>";
	echo "</tr>";
    //2-2
	for($i =0; $i < $count; $i++) {
		echo "<tr>";
		for($j=0; $j < $column; $j++) {
			$cell = mysql_result($result, $i, $j);
			echo "<td>{$cell}</td>";
		}
	}
	echo "</table>";

	//add
	/*$sql2 = "insert into students(name,job,phone) values('guy','Pathon','13512849321')";
	$bool = mysql_query($sql2);
	if($bool){
		echo 'add success at'.mysql_insert_id();
	} else {
		echo 'error';
	}*/


	//update
	/*$sql3 = "update students set name='amazing', job='css' where ID = 7";
	mysql_query($sql3);
	if(mysql_affected_rows()>0) {
		echo 'modify success';
	} else {
		echo 'modify failed';
	}*/

	//del
	/*$sql4 = 'delete from students where ID = 7';
	if(mysql_query($sql4)) {
		echo 'delete success';
	} else {
		echo 'delete failed';
	}*/


	mysql_free_result($result);
	mysql_close($con);
?>