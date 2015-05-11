<?php
	session_start();
	header("Content-Type: text/html; charset=UTF-8");

	$username = $_POST['username'];

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
	$search = "SELECT distinct course.cid, course.cname from course, cteacher where (cteacher.tid = '{$username}' and course.cid = cteacher.cid) ";
	$searchresult = mysql_query($search);
	$text = "<option value=\"\">...</option>";
	while ($searchresult && $row = mysql_fetch_row($searchresult)) {
		$text .= "<option value=\"{$row[0]}\">";
		$text .= "{$row[0]}, {$row[1]}"."</option>";
	}
	echo($text);
	mysql_close($dbconn);
?>