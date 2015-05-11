<?php
	session_start();
	header("Content-Type: text/html; charset=UTF-8");

	$cid= $_POST['cid'];
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

	$search = "SELECT student.sid, student.sname, sc.grade from student, sc where (student.sid = sc.sid and sc.cid = '{$cid}')";
	$searchresult = mysql_query($search);
	$text = "<tr><th>学生学号</th><th>学生姓名</th><th>学生成绩</th><th>设置成绩</th><th>提交设置</th><th>强制退课</th></tr>";


	while ($searchresult && $row = mysql_fetch_row($searchresult)) {
		$text .= "<tr>";
		$text .= "<td align = \"middle\">".$row[0]."</td>";
		$text .= "<td align = \"middle\">".$row[1]."</td>";
		$text .= "<td align = \"middle\">";
		if ($row[2] == "") 
			$text .= "暂无成绩";
		else 
			$text .= $row[2];
		$text .= "</td>";
	
		$selectgrade = 
		"<select id = \"";
		$selectgrade .= $row[0];
		$selectgrade .= "\">
        	<option value = \"A\"> A </option>
	        <option value = \"A-\"> A- </option>
	        <option value = \"B+\"> B+ </option>
	        <option value = \"B\"> B </option>
	        <option value = \"B-\"> B- </option>
	        <option value = \"C+\"> C+ </option>
	        <option value = \"C\"> C </option>
	        <option value = \"C-\"> C- </option>
	        <option value = \"D\"> D </option>
	        <option value = \"D-\"> D- </option>
	        <option value = \"F\"> F </option>
	    </select>";

		$setgrade = "<button onclick = submit('setgrade','";
		$setgrade .= $cid;
		$setgrade .= "','{$row[0]}',document.getElementById(\"";
		$setgrade .= $row[0];
		$setgrade .= "\").value";
		$setgrade .= ")> 设置 </button>";

	    $drop = "<button onclick = submit('drop','";
	    $drop .= $cid;
	    $drop .= "','{$row[0]}',document.getElementById(\"";
	    $drop .= $row[0];
	    $drop .= "\").value";
	    $drop .= ")> 退课 </button>";

 		$text .= "<td align = \"middle\">".$selectgrade."</td>";
		$text .= "<td align = \"middle\">".$setgrade."</td>";	
		$text .= "<td align = \"middle\">".$drop."</td>";
	}
	$text .= "<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
	echo($text);
	mysql_close($dbconn);
?>