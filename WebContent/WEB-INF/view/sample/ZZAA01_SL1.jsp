<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn"     uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt"    uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="auth"   uri="/WEB-INF/tlds/tags-auth" %>
<%@ taglib prefix="code"   uri="/WEB-INF/tlds/tags-code" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>NICE Data</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta http-equiv="imagetoolbar" content="no" />
<meta name="robots"      content="noindex,nofollow" />
<meta name="subject"     content="NICE Data 세무회계서비스" />
<meta name="description" content="NICE Data 세무회계서비스 - 전표조회" />
<meta name="copyright"   content="copyrights 2012 NICE Data" />
<meta name="author"      content="NICE Data" />
<meta name="language"    content="ko" />

<script type="text/javascript" src="<c:url value='/js/jquery-ui.datepicker-nicedata.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/jquery.maskedinput-1.3.min.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/jquery.meio.mask-1.1.3.min.js' />"></script><%-- 자산원장 popup --%>
<script type="text/javascript" src="<c:url value='/js/jquery.validate-1.8.1.min.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/json_sans_eval.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/json2.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/json_parse.js' />"></script>
<script type="text/javascript">
<!--
// -->
</script>
</head>

<body>
<textarea rows=10 style=width:90%>
	<c:out value='${json_data}' />
</textarea>
</body>
</html>