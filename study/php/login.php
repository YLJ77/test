<?php
	header('Content-type:text/html;charset=utf8');
	$str = 'beautiful day';
	echo substr($str,strpos($str, ' '));

?>