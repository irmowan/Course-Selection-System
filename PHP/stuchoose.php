<?php
	session_start();
	header("Content-Type: text/html; charset=UTF-8");

	$classid = $_POST['chooseclass'];
	$username = $_POST['username'];
  	if ($classid == "")
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
	mysql_select_db('dbta');
	mysql_query("set names utf8");
	
	$search = "SELECT sid FROM sc WHERE (sid='{$username}' and cid='{$classid}')";
	$searchresult = mysql_query($search);
	$row = mysql_fetch_row($searchresult);
	if ($row[0]!=""){
		echo "已存在元组";
		mysql_close($dbconn);
		return;
	}
	$insert = "INSERT INTO sc(sid,cid) VALUES ('{$username}','{$classid}')";
	$retval = mysql_query($insert);
	if (! $retval)
	{
		echo "插入失败";
	}
	else
	{
	    echo "插入成功";		
	}
	mysql_close($dbconn);
?>