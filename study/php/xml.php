<?php
header('Content-type:text/xml;charset=utf8');
$xml="<?xml version='1.0' encoding='UTF-8'?>
<students>
	<stu>
		<name>hi</name>
		<age>23</age>
		<job>PHP</job>
		<phone>13523476467</phone>
	</stu>
</students>";
	echo $xml;
?>