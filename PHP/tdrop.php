<?php
	session_start();
	header("Content-Type: text/html; charset=UTF-8");

	$sid = $_POST['sid'];
	$cid = $_POST['cid'];

	$host = '127.0.0.1';
	$user = 'root';
	$pswd = '1995331@@';
	$dbconn = mysql_connect($host,$user,$pswd);
	if (!$dbconn) {
		echo "err_conn";
		return;
	}
	mysql_select_db('dbta');
	mysql_query("set names utf8");

	$drop = "DELETE from sc where (sc.sid = '{$sid}' and sc.cid = '{$cid}')";
	$retval = mysql_query($drop);
	if (! $retval) {
		echo "退课失败";
	}
	else {
	    echo "退课成功";		
	}
	mysql_close($dbconn);
?>