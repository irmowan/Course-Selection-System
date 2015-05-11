<?php
	session_start();
	header("Content-Type: text/html; charset=UTF-8");

	$username = $_POST['username'];
	$password = $_POST['password'];
  	if ($username == "")
    	return;
	$host = '127.0.0.1';
	$user = 'root';
	$pswd = '1995331@@';
	$dbconn = mysql_connect($host,$user,$pswd);
	if (!$dbconn) 
	{
		echo "err_conn";
		return;
	}
	$password = md5($password);
	mysql_select_db('dbta');
	mysql_query("set names utf8");
	$query = "SELECT password, level FROM account WHERE id = '{$username}'";
	$SQL = mysql_query($query);
	$row = mysql_fetch_row($SQL);

	$type = array("学生","老师","教务员");
	if ($row[0] == "")
	{
		echo "用户名错误";
		mysql_close($dbconn);
		return;
	}
	if($row[0] == $password)
	{
		$text = "登录成功";
		$text .= $type[$row[1]];
		echo($text);
	}
	else
	{
		echo "密码错误";
	}
	mysql_close($dbconn);
?>