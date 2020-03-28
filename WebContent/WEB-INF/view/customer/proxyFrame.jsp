<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%!
String getDefaultStr(String src, String defaultStr) {
	if (src == null || src.length() < 1) {
		if (defaultStr == null) { return ""; }
		return defaultStr;
	}
	return src;
}
%>
<%
	String error_cd			= getDefaultStr(request.getParameter("error_cd"), "");
	String error_msg		= getDefaultStr(request.getParameter("error_msg"), "");
	String TID				= getDefaultStr(request.getParameter("TID"), "");
	
	String KVP_PGID			= getDefaultStr(request.getParameter("KVP_PGID"), "");
	String KVP_NOINT		= getDefaultStr(request.getParameter("KVP_NOINT"), "");
	String KVP_QUOTA		= getDefaultStr(request.getParameter("KVP_QUOTA"), "");
	String KVP_CARDCODE		= getDefaultStr(request.getParameter("KVP_CARDCODE"), "");
	String KVP_SESSIONKEY	= getDefaultStr(request.getParameter("KVP_SESSIONKEY"), "");
	String KVP_ENCDATA		= getDefaultStr(request.getParameter("KVP_ENCDATA"), "");
	
	String eci				= getDefaultStr(request.getParameter("eci"), "");
	String xid				= getDefaultStr(request.getParameter("xid"), "");
	String cavv				= getDefaultStr(request.getParameter("cavv"), "");
	String cardno			= getDefaultStr(request.getParameter("cardno"), "");
	String joinCode			= getDefaultStr(request.getParameter("joinCode"), "");
	String realPan			= getDefaultStr(request.getParameter("realPan"), "");
	
	String hd_pi			= getDefaultStr(request.getParameter("hd_pi"), "");
	
%>
<html>
<body>
<form name="errorMgr" method="post">
	<input type=hidden name=error_cd value="<%= error_cd %>">
	<input type=hidden name=error_msg value="<%= error_msg %>">
</form>
<form name="tranMgr" method="post">
	<input type="hidden" name="error_cd" value="0">
	<input type="hidden" name="error_msg" value="Success">
	<input type="hidden" name="TID"				value="<%=TID%>"/>
	
	<input type="hidden" name="KVP_PGID" value="<%= KVP_PGID %>">
	<input type="hidden" name="KVP_NOINT" value="<%= KVP_NOINT %>">
	<input type="hidden" name="KVP_QUOTA" value="<%= KVP_QUOTA %>">
	<input type="hidden" name="KVP_CARDCODE" value="<%= KVP_CARDCODE %>">
	<input type="hidden" name="KVP_SESSIONKEY" value="<%= KVP_SESSIONKEY %>">
	<input type="hidden" name="KVP_ENCDATA" value="<%= KVP_ENCDATA %>">

	<input type="hidden" name="eci" value="<%= eci %>">
	<input type="hidden" name="xid" value="<%= xid %>">
	<input type="hidden" name="cavv" value="<%= cavv %>">
	<input type="hidden" name="cardno" value="<%= cardno %>">
	<input type="hidden" name="joinCode" value="<%= joinCode %>">
	<input type="hidden" name="realPan" value="<%= realPan %>">
	
	<input type="hidden" name="hd_pi"           value="<%=hd_pi%>">

</form>
<script type="text/javascript">
if('<%= error_cd %>' == '0') {
	parent.parent.MnGetInfo(document.tranMgr);
	parent.parent.MnDisableItem(false);
} else {
	parent.parent.MnGetInfo(document.errorMgr);
	parent.parent.MnDisableItem(false);
}
</script>
</body>
</html>
