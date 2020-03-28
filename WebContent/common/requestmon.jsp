<%@ page session="false" contentType="text/html; charset=EUC-KR" %>

<%! java.text.SimpleDateFormat df = 
      new java.text.SimpleDateFormat("yyyyMMdd/HH:mm:ss"); %>

<html>
<head>
<script>
var interval =<%=request.getParameter("intv")%>;
var timer;
var status = true;

function reloading(){
		if(interval == null || interval == ""){
			interval = 2000;
		}
		timer=	window.setInterval("document.location.reload()", interval);
	}


function pause(){
	window.clearInterval(timer);
	document.all.Resume.disabled = false;
	document.all.Pause.disabled = true;
}

function resume(){
	reloading();
	document.all.Resume.disabled = true;
	document.all.Pause.disabled = false;
}

</script>

</head>
<title>Inticube Jedi Framework Request Monitor</title>
<body onload="reloading()">
<h4>Inticube Jedi 2.0.1.5 Framework Request Monitor </h4>
<% java.util.Date now = new java.util.Date(); %>
CurrentTime: <%= df.format(now) %>&nbsp;<br><BR>
<INPUT TYPE="BUTTON" name="Pause" onClick="pause()" value="Pause">
<INPUT TYPE="button" name="Resume" onClick="resume()" disabled=true value="Resume"><br><br> 

<pre>
<%= "CALL TIME\t\tELASPED\tIP ADDRESS\t\tURI" %>
-------------------------------------------------------------------------------
<% String ip =java.net.InetAddress.getLocalHost().getHostAddress();
   org.jdf.requestmon.ServiceTrace trace = org.jdf.requestmon.ServiceTrace.getInstance();
   java.util.Hashtable list = trace.getActiveList();
   java.util.Enumeration _enum = ((java.util.Hashtable)list.clone()).elements();
   while(_enum.hasMoreElements()){
      org.jdf.requestmon.TraceObject obj = (org.jdf.requestmon.TraceObject)_enum.nextElement();

%><%= 
df.format(new java.util.Date(obj.getStartTime())) %><%=
"\t" + (now.getTime()-obj.getStartTime())%><%=
"\t"+obj.getRemoteAddr()+ " \t" + obj.getURI() %>
<%
   }
%>-------------------------------------------------------------------------------
</pre>
<br>
NOTE: This page is referenced  WonYoung Lee's requestmon.jsp <br>
Lee sewoo  rainmkr@inticube.com
</body>
</html>
