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
	$searchinfo = "SELECT teacher.tid, teacher.tname, teacher.prof, teacher.major, teacher.age, teacher.sex FROM teacher WHERE (teacher.tid = '{$username}' )";
	$searchresult = mysql_query($searchinfo);
	$row = mysql_fetch_row($searchresult);
	$text = "<p>我的信息:</p>";
	$text .= "<table class = \"hovertable\">";
	$text .= "<tr><th>教师ID</th><th>教师姓名</th><th>教师职称</th><th>所在院系</th></tr>";
	$text .= "<tr><td align = \"middle\">".$row[0];
	$text .= "</td><td align = \"middle\">".$row[1];
	$text .= "</td><td align = \"middle\">".$row[2];
	$text .= "</td><td align = \"middle\" style=\"white-space: nowrap\" >".$row[3];
	$text .= "</td></tr></table>";

	$text .= "<p>我的课程:</p>";
	$searchcourse  = "SELECT distinct course.cid, course.cname, course.num from course, sc, cteacher where (course.cid = cteacher.cid and cteacher.tid = '{$username}')";
	$searchresult = mysql_query($searchcourse);
	$text .= "<table class = \"hovertable\">";
	$text .= "<tr><th>课程代码</th> <th>课程名称</th><th>选课人数</th></tr>";
	while ($searchresult && $row = mysql_fetch_row($searchresult)) {
		$searchnum = "SELECT count(sc.sid) from sc where (sc.cid = '{$row[0]}')";
		$numresult = mysql_query($searchnum);
		$numans = mysql_fetch_row($numresult);
		$text .= "<tr><td align = \"middle\" style=\"white-space: nowrap\">".$row[0]."</td>";
		$text .= "<td align = \"middle\"  style=\"white-space: nowrap\">".$row[1]."</td>";
		$text .= "<td align = \"middle\" style=\"white-space: nowrap\">".$numans[0]." / ".$row[2]."</td></tr>";		
	}
	$text .= "</table>";
	echo($text);
	mysql_close($dbconn);

?>