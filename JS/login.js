function Toregister() {
    window.location.href="register.html";
}
function showUser(flag)
{
    document.getElementById("loginresult").innerHTML = "&nbsp;";
    var username;
    var password;
    if (flag == "click")
    {
        username = document.getElementById('usname').value;
        password = document.getElementById('pswd').value;
        var patternpassword = /^[0-9a-zA-Z]+$/;
        if (username == "" || password == "")
        {
            document.getElementById("loginresult").innerHTML = "*用户名和密码不能为空！";
            document.getElementById('pswd').focus();
            document.getElementById('pswd').select();
            return;
        }
        if (password.length < 6 || password.length > 20)
        {
            document.getElementById("loginresult").innerHTML = "*密码长度在6-20位之间！";
            document.getElementById("pswd").focus();
            document.getElementById("pswd").select();
            return;
        }
        if (patternpassword.test(password) == false)
        {
            document.getElementById("loginresult").innerHTML = "*密码必须由数字或字母组成！";
            document.getElementById("pswd").focus();
            document.getElementById("pswd").select();
            return;
        }
    }
    else if(flag == "auto")
    {
        username = "";
        password = "";
    }
    var xmlHttp = GetXmlHttpObject();
    if (xmlHttp == null)
    {
        alert("Browser does not support HTTP Request");
        return;
    }
    var parameters = "username=" + username + "&password=" + password;
    var url = "php/login.php";
    xmlHttp.onreadystatechange = stateChanged;
    xmlHttp.open("POST", url, true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;");
    xmlHttp.send(parameters);

    function stateChanged()
    {
        if ((xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") && xmlHttp.status == 200)
        {

            var text = xmlHttp.responseText;

            if (text == "err_conn")
            {
            	alert("系统正忙，请稍后再试！");
            	return;
            }
            else if (text == "密码错误")
            {
            	document.getElementById("loginresult").innerHTML = "*密码错误";
            	document.getElementById("pswd").focus();
            	document.getElementById("pswd").select();
            }
            else if (text == "用户名错误")
            {

            	document.getElementById("loginresult").innerHTML = "*无此用户";
            	document.getElementById("usname").focus();
            	document.getElementById("usname").select();
            }
            else if (text.match(/登录成功/))
            {
            	document.getElementById('usname').value = "";
            	document.getElementById('pswd').value = "";
                if (text.match(/学生/))
                    window.location.href="student.html?username="+username;
                else if (text.match(/老师/))
                    window.location.href="teacher.html?username="+username;
                else if (text.match(/教务员/)) 
                    window.location.href="admin.html?username="+username;
            }
        }
    }
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