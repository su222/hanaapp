<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="org.springframework.web.HttpSessionRequiredException" %>
<%@ page import="co.hanaapp.exception.*"%>
<%@ taglib prefix="c"     uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String ex_Message = (String)request.getAttribute("ex_Message");
	java.lang.Exception exception = (Exception)request.getAttribute("exception");

	if(exception instanceof ServiceException ) {
		// 업무 메세지
		//ServiceException se = (ServiceException)request.getAttribute("exception");%>
		<script>
			if(opener == undefined){
				alert("<c:out value="${ex_Message}"/>");
			}else if(!opener.closed){
		 		alert("<c:out value="${ex_Message}"/>");
		 		window.close();
		 	}
		</script>
		
<%	}else if(exception instanceof HttpSessionRequiredException ) {%>
		<!-- 로그인 처리 -->
		<c:import url="/WEB-INF/view/exception/sessionException.jsp" />
<%	}else if(exception instanceof Exception){%>
		<%=ex_Message%>
<%	} %>