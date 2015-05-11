function getParam(){
    C1=window.location.href.split("?")[1];
    C2=C1.split("=")[1];
    return C2;
}

function GetXmlHttpObject()
{
    var xmlHttp = null;
    try
    {
        // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    }
    catch (e)
    {
        //Internet Explorer
        try
        {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e)
        {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}

function submit(flag){
	var classid;
	var username;
	username = getParam();

	if (flag == 'choose'){
		classid = document.getElementById('chooseclass').value;
		var parameters = "chooseclass=" + classid + "&username=" + username;
		var url = "php/stuchoose.php";
        var xmlHttp = GetXmlHttpObject();
        if (xmlHttp == null)
        {
            alert("Browser does not support HTTP Request")
            return;
        }
		xmlHttp.onreadystatechange = stateChanged;
		xmlHttp.open("POST",url,true);
		xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded;");
		xmlHttp.send(parameters);
	}

    if (flag == 'drop'){
        classid = document.getElementById('dropclass').value;
        var parameters = "dropclass=" + classid + "&username=" + username;
        var url = "php/studrop.php";
        var xmlHttp = GetXmlHttpObject();
        if (xmlHttp == null)
        {
            alert("Browser does not support HTTP Request")
            return;
        }
        xmlHttp.onreadystatechange = stateChanged;
        xmlHttp.open("POST",url,true);
        xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded;");
        xmlHttp.send(parameters);
    }
	function stateChanged()
    {
        if ((xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") && xmlHttp.status == 200)
        {
            var text = xmlHttp.responseText;
            if (text == "err_conn"){
            	alert("系统正忙，请稍后再试！");
            	return;
            }
            if (text == "已存在元组"){
                document.getElementById("chooseresult").innerHTML = "*课程冲突";                
            }
            if (text == "插入失败"){
            	document.getElementById("chooseresult").innerHTML = "*选课失败";
            }
            if (text == "插入成功"){
            	alert("选课成功");
            }
            if (text == "删除失败"){
                document.getElementById("dropresult").innerHTML = "*退课失败";
            }
            if (text == "删除成功"){
                alert("退课成功");
            }
            if (text == "不存在元组"){
                document.getElementById("dropresult").innerHTML = "*未选择此课";                
            }
        }
    }
}
function searchcourse(){
    var username = getParam();
    var parameters = "username=" + username;
    var url = "php/stucourse.php";
    var xmlHttp = GetXmlHttpObject();
    if (xmlHttp == null)
    {
        alert("Browser does not support HTTP Request")
        return;
    }
    xmlHttp.onreadystatechange = stateChanged;
    xmlHttp.open("POST",url,true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded;");
    xmlHttp.send(parameters);
    function stateChanged()
    {
        if ((xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") && xmlHttp.status == 200)
        {
            var text = xmlHttp.responseText;   
            document.getElementById("course").innerHTML = text;
        }
    }
}
function search(){
    var username = getParam();
    var depart = document.getElementById('department').value;
    var day = document.getElementById('courseday').value;
    var start = document.getElementById('cstart').value;  
    var end = document.getElementById('cend').value; 
    var ctname = document.getElementById('ctname').value;
    var cname = document.getElementById('cname').value;
    var time = 0;
    if (start != 0 && end != 0 && end > start)
        time = end - start + 1;
    var parameters = "depart="+depart+"&day="+day+"&start="+start+"&time="+time+"&ctname="+ctname+"&username="+username + "&cname=" + cname;
    var url = "php/stusearch.php";
    var xmlHttp = GetXmlHttpObject();
    if (xmlHttp == null)
    {
        alert("Browser does not support HTTP Request")
        return;
    }
    xmlHttp.onreadystatechange = stateChanged;
    xmlHttp.open("POST",url,true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded;");
    xmlHttp.send(parameters);   
    function stateChanged()
    {
        if ((xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") && xmlHttp.status == 200)
        {
            var text = xmlHttp.responseText;   
            document.getElementById("searchresult").innerHTML = text;
        }
    }  
}
function hidchoice(){
    document.getElementById("chooseclass").value="";
    document.getElementById("dropclass").value="";
    document.getElementById("chooseresult").innerHTML="";
    document.getElementById("dropresult").innerHTML="";
    document.getElementById("choose").style.display = "none";
    document.getElementById("drop").style.display = "none";
    document.getElementById("coursetable").style.display = "none";
    document.getElementById("coursepool").style.display = "none";
}
function allcourse(){
    hidchoice();
    document.getElementById("coursepool").style.display = "block";
}
function showchoice(){
    hidchoice();
    document.getElementById("choose").style.display = "block";
}
function showdrop(){
    hidchoice();
    document.getElementById("drop").style.display = "block";
}
function showcourse(){
    hidchoice();
    searchcourse();
    document.getElementById("coursetable").style.display = "block";
}