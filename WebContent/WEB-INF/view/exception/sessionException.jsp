<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"     uri="http://java.sun.com/jsp/jstl/core" %>
<c:url var="ndsLoginURL" value="/cm/ndsLogin.do">
    <c:param name="returnURL" value="${returnURL}" />
    <c:if test='${!empty relevantMenu}'>
    <c:param name="relevantMenu" value="${relevantMenu}" />
    </c:if>
</c:url>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<title>NICE Data</title>
<script type="text/javascript">
	if (opener && !opener.closed) {
		window.close();
		opener.goNDSMain("<c:out value='${ndsLoginURL}' escapeXml='false' />");
	} else {
		if (parent.document.getElementById("frameDialog")) {
			window.parent.$.frameDialog.close();
			alert("로그인 후 이용해 주세요.");
			parent.location.href = "<c:out value='${ndsLoginURL}' escapeXml='false' />";
		} else {
			alert("로그인 후 이용해 주세요.");
			location.href = "<c:out value='${ndsLoginURL}' escapeXml='false' />";
		}
	}
</script>
</head>
<body>
</body>
</html>