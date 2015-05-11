<?php
	session_start();
	header("Content-Type: text/html; charset=UTF-8");
	$text = "<table class = \"hovertable\"><tr><th></th><th>星期一</th><th>星期二</th><th>星期三</th><th>星期四</th><th>星期五</th><th>星期六</th><th>星期日</th></tr>";

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

	$search = "SELECT course.cid, course.cname FROM sc, course WHERE (sc.cid = course.cid and sc.sid='{$username}')";
	$searchresult = mysql_query($search);

	$course = array(
		array("","","","","","","",""),
		array("","","","","","","",""),
		array("","","","","","","",""),
		array("","","","","","","",""),
		array("","","","","","","",""),
		array("","","","","","","",""),
		array("","","","","","","",""),
		array("","","","","","","",""),
		array("","","","","","","",""),
		array("","","","","","","",""),
		array("","","","","","","",""),
		array("","","","","","","",""),
		array("","","","","","","","")
		);

	while ($row = mysql_fetch_row($searchresult)){
		$st = "SELECT ctime.day, ctime.starttime, ctime.durtime FROM ctime WHERE 
		(ctime.cid = '{$row[0]}')";
		$result = mysql_query($st);
		while ($r = mysql_fetch_row($result)){
			$y = $r[0]-1;
			$x = $r[1]-1;
			$time = $r[2];
			for ($i = 0; $i < $time; $i++){
				$course[$x][$y] = $row[1];
				$x = $x+1;
			}
		}
	}
	mysql_close($dbconn);

	for ($i = 0; $i < 13; $i++){
		$text .= "<tr>";
		$text .= "<td align=\"middle\">";
		$text .= $i + 1;
		$text .= "</td>";
		for ($j = 0; $j < 7; $j++)
		{
			$text .= "<td align=\"middle\" onmouseover = \"this.style.backgroundColor='rgb(0,185,242)';\"
		 onmouseout = \"this.style.backgroundColor='#c6d5ef';\">";
			$text .= $course[$i][$j];
			$text .= "</td>";
		}
		$text .= "</tr>";
	}
	$text .= "</table>"; 
	echo($text);
?>