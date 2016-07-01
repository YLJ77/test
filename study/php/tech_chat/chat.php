<?php
/*
**********************************************

	usage:	user.php?act=xxx&user=用户名&pass=密码
			act:
				add——注册用户
				login——登陆
	
	return:	{err: 0, msg: 文字描述信息}
			err:
				0	成功
				1	失败——具体原因参考msg
**********************************************
*/

//创建数据库之类的
$db=mysql_connect('localhost', 'root', '');

mysql_query("set names 'utf8'");
//mysql_query('CREATE DATABASE chat_edu');

mysql_select_db('html5');

/*$sql= <<< END
CREATE TABLE  `chat_edu`.`user` (
`ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`username` VARCHAR( 255 ) NOT NULL ,
`password` VARCHAR( 255 ) NOT NULL
) ENGINE = INNODB CHARACTER SET utf8 COLLATE utf8_general_ci
END;

mysql_query($sql);*/

	header("Access-Control-Allow-Origin:*");
	/*
	 *数据库链接配置
	 */
	$host = 'localhost';	//数据库链接地址
	$username = 'root';		//用户名
	$password = '';			//密码
	$db = 'html5';//数据库名
	
	$type = "get";
	function get($field){
		global $type;
		switch ($type){
		case "get":
			return $_GET[$field];	
		case 'post':
			return $_POST[$field];
		}
	}
	$action = get('action');
	//echo $action;
	
	$result = Array();
	
	switch ($action){
	case "send":
		doneSend();
		break;
	case "getMsg":
		doneGetMsg();
		break;
	}
	
	$msglist = Array();
	
	
	
	function doneSend(){
		global $result;
		$msg = get('msg');
		if (!isset($msg)){
			$result['reason'] = '没有msg字段';
			$result['ok'] = false;
			
		}else{
			if (connectsql()){
				addMsg($msg);
				deleteMsg();
			}else{
				$result['reason'] = '数据库链接失败';
				$result['ok'] = false;
			}
		}
		
		done();
	}

	function doneGetMsg(){
		global $result;
		
		$startid = get('startid');//起始id
		if (!isset($startid)){//查找所有
			$result['reason'] = 'ok';
			$result['ok'] = true;
			
			if (connectsql()){
				getAllMsg();
			}else{
				$result['reason'] = '数据库链接失败';
				$result['ok'] = false;
			}
			
		}else{//否则只获取指定id后的数据
			if (connectsql()){
				getAllMsg($startid);
			}else{
				$result['reason'] = '数据库链接失败';
				$result['ok'] = false;
			}
		}
		
		done();
	}
	
	$sql = Null;
	function connectsql(){
		global $sql;
		global $host;
		global $username;
		global $password;
		global $db;
		$sql = mysql_connect($host,$username,$password);
		mysql_select_db($db, $sql);
		if (!$sql)
		{
			return false;
		}else{
			return true;
		}
	}
	
	function addMsg($msg){
		global $sql;
		global $result;
		$msg = htmlspecialchars($msg);
		$time = time()*1000;
		$sqlcmd = "INSERT INTO  `html5`.`msglist` (
`id` ,
`con` ,
`time`
)
VALUES (
NULL ,  '$msg', 
$time
);";
		if(mysql_query($sqlcmd,$sql)){
			$result['reason'] = 'ok';
			$result['ok'] = true;
		}else{
			$result['reason'] = '数据库操作错误';
			$result['ok'] = false;
		}
	}
	
	function deleteMsg(){
		//return;
		global $sql;
		global $result;
		//echo "<br>"+time();
		$temp = (time()-10)*1000;
		$sqlcmd = "delete from msglist WHERE $temp > time";
		if(mysql_query($sqlcmd,$sql)){
			//echo $sqlcmd;
		}
		
	}
	
	function done(){
		global $result;
		echo json_encode($result);
	}
	
	function getAllMsg($startid=null){
		global $sql;
		global $result;
		//echo "<br>"+time();
		$temp = (time()-10)*1000;
		if (isset($startid)){
			$sqlcmd = "select * from msglist where id > ".$startid;
		}else{
			$sqlcmd = "select * from msglist";
		}
		//echo $sqlcmd;
		$result['data'] = Array();
		$query = mysql_query($sqlcmd,$sql);
		if ($query){
			while($row = mysql_fetch_array($query))
			{
				$result['data'][] = array(
					"id" => $row['id'],
					"con" => $row['con'],
					"time" => $row['time']-0
				);
				
			}
			
			$result['reason'] = 'ok';
			$result['ok'] = true;
		}else{
			$result['reason'] = '查询出错';
			$result['ok'] = false;
		}
	}
	
?>