<?php
	session_start();
	header("Content-Type: text/html; charset=UTF-8");

	$username = $_POST['username'];
	$password = $_POST['password'];
	$level = $_POST['level'];
	$myname = $_POST['myname'];
	$sex = $_POST['sex'];
	$age = $_POST['age'];
	$department = $_POST['department'];

  	if ($username == "") return;
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
	$query = "select id from account where id = '{$username}'";
	$SQL = mysql_query($query);
	$row = mysql_fetch_row($SQL);

	$type = array("学生","老师");
	if ($row[0] == "")
	{
		//用户名可注册
		$insertaccount = "INSERT INTO account(id,password) values ('{$username}','{$password}') ";
		if (level == 0) {
			$insertlevel = "INSERT INTO student(sid, sname, age, sex, major) values ('{$username}','{$myname}','{$age}','{$sex}','{$department}')";
		}
		else if (level == 1) {
			$insertlevel = "INSERT INTO teacher(tid, tname, prof, major, age, sex) values ('{$username}','{$myname}', NULL, '{$department}','{$age}','{$sex}')";
		}
		else {
			$insertlevel = "INSERT INTO admin(aid, aname, age, sex) values ('{$username}', '{$myname}', '{$age}', '{$sex}')";
		}
		$retval1 = mysql_query($insertaccount);
		$retval2 = mysql_query($insertlevel);
		if (!$retval1 || !$retval2) {
			echo "注册失败";
		}
		else {
	    	echo "注册成功";		
		}
		mysql_close($dbconn);
		return;
	}
	else
	{
		echo "用户名已存在";
	}
	mysql_close($dbconn);
?>