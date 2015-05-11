function Tologin() {
    window.location.href="index.html";
}

function register(flag)
{
    document.getElementById("registerresult").innerHTML = "&nbsp;";
    var username;
    var password;
    var password2;
    var myname;
    var level;
    var sex;
    var age;
    var department;
    if (flag == "click")
    {
        username = document.getElementById('usname').value;
        password = document.getElementById('pswd').value;
        password2 = document.getElementById('pswd2').value;
        myname = document.getElementById('myname').value;
        level = document.getElementById('type').value;
        sex = document.getElementById('sex').value;
        age = document.getElementById('age').value;
        department = document.getElementById('department').value;

        var patternpassword = /^[0-9a-zA-Z]+$/;
        if (username == "" || password == "" || password2 == "") {
            document.getElementById("registerresult").innerHTML = "*用户名和密码不能为空！";
            document.getElementById('pswd').focus();
            document.getElementById('pswd').select();
            return;
        }
        if (password.length < 6 || password.length > 20) {
            document.getElementById("registerresult").innerHTML = "*密码长度在6-20位之间！";
            document.getElementById("pswd").focus();
            document.getElementById("pswd").select();
            return;
        }
        if (patternpassword.test(password) == false) {
            document.getElementById("registerresult").innerHTML = "*密码必须由数字或字母组成！";
            document.getElementById("pswd").focus();
            document.getElementById("pswd").select();
            return;
        }
        if (password2 != password) {
            document.getElementById("registerresult").innerHTML = "*密码不一致！";
            document.getElementById("pswd2").focus();
            document.getElementById("pswd2").select();
            return;
        }
        if (name = "") {
            document.getElementById("registerresult").innerHTML = "*姓名不能为空！";
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

    var parameters = "username=" + username + "&password=" + password + "&level=" + level + "&myname=" + myname + "&sex=" + sex + "&age=" + age + "&department=" + department;
    var url = "php/register.php";
    xmlHttp.onreadystatechange = stateChanged;
    xmlHttp.open("POST", url, true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;");
    xmlHttp.send(parameters);

    function stateChanged()
    {
        if ((xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") && xmlHttp.status == 200)
        {
            var text = xmlHttp.responseText;
            alert(text);
            if (text == "err_conn")
            {
            	alert("系统正忙，请稍后再试！");
            	return;
            }
            else if (text == "用户名已存在")
            {
                alert("用户名已存在");
            	document.getElementById("loginresult").innerHTML = "*用户名已存在";
            	document.getElementById("usname").focus();
            	document.getElementById("usname").select();
            }
            else if (text.match(/注册成功/))
            {
            	//document.getElementById('usname').value = "";
            	//document.getElementById('pswd').value = "";
                alert("注册成功");
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