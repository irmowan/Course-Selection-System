<?php
	session_start();
	header("Content-Type: text/html; charset=UTF-8");

	$depart = $_POST['depart'];
	$day = $_POST['day'];
	$start = $_POST['start'];
	$time = $_POST['time'];
	$ctname = $_POST['ctname'];
	$cname = $_POST['cname'];
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

	$search = "SELECT DISTINCT course.cid, course.cname, teacher.tname, teacher.major FROM course, teacher, ctime, cteacher WHERE 
	(course.cid = cteacher.cid and course.cid = ctime.cid and cteacher.tid = teacher.tid";
	if ($depart != "")
		$search .= " and course.major = '{$depart}'";
	if ($day != "")
	    $search .= " and ctime.cid = course.cid and ctime.day = '{$day}'";
	if ($time != 0 && $start != 0)
		$search .= " and ctime.starttime  = '{$start}' ctime.durtime = '{$time}'";
	if ($ctname != "")
		$search .= " and teacher.tname like '%{$ctname}%'";
	if ($cname != "")
		$search .= " and course.cname like '%{$cname}%'";
	$search .= " ) order by course.cid";

	$searchresult = mysql_query($search);

    $aday = array("星期一","星期二","星期三","星期四","星期五","星期六","星期天");
    $atime = array("第一节","第二节","第三节","第四节","第五节","第六节","第七节","第八节","第九节","第十节","第十一节","第十二节","第十三节");
	
	$text = "<div style=\"height:600px; overflow:scroll;\"><table cellspacing=\"0\" width=\"920px\" class = \"hovertable\"><tr><th>课程代码</th><th>课程名称</th><th>开课教师</th><th>开课院系</th>
	<th>开课时间</th></tr>";
	while ($searchresult && $row = mysql_fetch_row($searchresult)){
		$text .= "<tr onmouseover = \"this.style.backgroundColor='#ffff66';\"
		 onmouseout = \"this.style.backgroundColor='#c6d5ef';\"><td align = \"middle\" style=\"white-space: nowrap\">";
		$text .= $row[0];
		$text .= "</td><td align = \"middle\" style=\"white-space: nowrap\">";
		$text .= $row[1];
		$text .= "</td><td align = \"middle\" style=\"white-space: nowrap\">";
		$text .= $row[2];
		$text .= "</td><td align = \"middle\"  style=\"white-space: nowrap\">";
		$text .= $row[3];
		$text .= "</td><td align = \"middle\" >";

		$searchtime = "SELECT day, starttime, durtime FROM ctime WHERE (ctime.cid = '{$row[0]}')";
        $result = mysql_query($searchtime);
        while ($r = mysql_fetch_row($result)){
        	$text .= $aday[$r[0]-1]."(".$atime[$r[1]-1]."-".$atime[$r[1]+$r[2]-2].") ";
        }

		$text .= "</td></tr>";
	}
	$text .= "</table>";
	$text .= "</div>";
	echo($text);

	mysql_close($dbconn);
?>