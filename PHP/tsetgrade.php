<?php
	session_start();
	header("Content-Type: text/html; charset=UTF-8");

	$username = $_POST['username'];
	$sid = $_POST['sid'];
	$cid = $_POST['cid'];
	$grade = $_POST['grade'];

	$host = '127.0.0.1';
	$user = 'root';
	$pswd = '1995331@@';
	$dbconn = mysql_connect($host,$user,$pswd);

	if (!$dbconn) 
	{
		echo "err_conn";
		return;
	}
	mysql_select_db('dbta');
	mysql_query("set names utf8");
	$update = "UPDATE sc set sc.grade = '{$grade}' where (sc.sid = '{$sid}' and sc.cid = '{$cid}')";
	$result = mysql_query($update);
	if (!$result) 
		echo("更新失败");
	else 
		echo("更新成功");
	mysql_close($dbconn);

?>