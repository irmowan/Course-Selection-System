function getParam(){
    C1=window.location.href.split("?")[1];
    C2=C1.split("=")[1];
    return C2;
}

function GetXmlHttpObject() {
    var xmlHttp = null;
    try {
        // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    }
    catch (e) {
        //Internet Explorer
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}

function showinfo() {
    var username = getParam();
    var parameters = "username=" + username;
    var url = "php/tinfo.php";
    var xmlHttp = GetXmlHttpObject();
    if (xmlHttp == null) {
        alert("Browser does not support HTTP Request");
        return;
    }
    xmlHttp.onreadystatechange = stateChanged;
    xmlHttp.open("POST",url,true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded;");
    xmlHttp.send(parameters);

    function stateChanged() {
        if ((xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") && xmlHttp.status == 200) {
            var text = xmlHttp.responseText;  
            document.getElementById("info").innerHTML = text;
        }
    }
}

function searchcourse() {
    var username = getParam();
    var parameters = "username=" + username;
    var url = "php/tcourse.php";
    var xmlHttp = GetXmlHttpObject();
    if (xmlHttp == null) {
        alert("Browser does not support HTTP Request");
        return;
    }
    xmlHttp.onreadystatechange = stateChanged;
    xmlHttp.open("POST",url,true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded;");
    xmlHttp.send(parameters);
    function stateChanged() {
        if ((xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") && xmlHttp.status == 200) {
            var text = xmlHttp.responseText;   
            document.getElementById("course").innerHTML = text;
        }
    }
}

function showoption() {
    var username = getParam();
    var parameters = "username=" + username;
    var url = "php/toption.php";
    var xmlHttp = GetXmlHttpObject();
    if (xmlHttp == null) {
        alert("Browser does not support HTTP Request");
        return;
    }
    xmlHttp.onreadystatechange = stateChanged;
    xmlHttp.open("POST",url,true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded;");
    xmlHttp.send(parameters);
    function stateChanged() {
        if ((xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") && xmlHttp.status == 200) {
            var text = xmlHttp.responseText;   
            document.getElementById("courseoption").innerHTML = text;
        }
    }
}

function showdetail() {
    var username = getParam();

    var cid = document.getElementById("courseoption").value;
    if (cid == "") {
        document.getElementById("coursemana").style.display = "none";
        return;
    }
    var parameters = "username=" + username + "&cid=" + cid;
 
    var url = "php/tmanager.php";
    var xmlHttp = GetXmlHttpObject();
    if (xmlHttp == null) {
        alert("Browser does not support HTTP Request");
        return;
    }
    xmlHttp.onreadystatechange = stateChanged;
    xmlHttp.open("POST",url,true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded;");
    xmlHttp.send(parameters);
    function stateChanged() {
        if ((xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") && xmlHttp.status == 200) {
            var text = xmlHttp.responseText;
            document.getElementById("coursemana").innerHTML = text;
        }
    }
    document.getElementById("coursemana").style.display = "block";
}

function submit(flag, cid, sid, grade) {
    username = getParam();
    if (flag == 'setgrade'){
        var parameters = "&username=" + username + "&cid=" + cid + "&sid=" + sid + "&grade=" + grade;
        var url = "php/tsetgrade.php";
        var xmlHttp = GetXmlHttpObject();
        if (xmlHttp == null)
        {
            alert("Browser does not support HTTP Request");
            return;
        }
        xmlHttp.onreadystatechange = stateChanged;
        xmlHttp.open("POST",url,true);
        xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded;");
        xmlHttp.send(parameters);
    }

    if (flag == 'drop'){
        var parameters = "&username=" + username + "&cid=" + cid + "&sid=" + sid;
        var url = "php/tdrop.php";
        var xmlHttp = GetXmlHttpObject();
        if (xmlHttp == null)
        {
            alert("Browser does not support HTTP Request");
            return;
        }
        xmlHttp.onreadystatechange = stateChanged;
        xmlHttp.open("POST",url,true);
        xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded;");
        xmlHttp.send(parameters);
    }

        function stateChanged() {
        if ((xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") && xmlHttp.status == 200) {
            var text = xmlHttp.responseText; 
            alert(text);
        }
    }
}

function hidchoice() {
    document.getElementById("info").style.display = "none";
    document.getElementById("coursetable").style.display = "none";
    document.getElementById("mana").style.display = "none";
    document.getElementById("coursemana").style.display = "none";
}

function myinformation() {
    hidchoice();
    showinfo();
    document.getElementById("info").style.display = "block";
}

function mycourse() {
    hidchoice();
    searchcourse();
    document.getElementById("coursetable").style.display = "block";
}

function manacourse() {
    hidchoice();
    showoption();
    document.getElementById("mana").style.display = "block";
}
