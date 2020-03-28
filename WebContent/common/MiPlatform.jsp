<%@ page language="java" contentType="text/html;charset=euc-kr" %><%@ page buffer="16kb"%><%@ page import="tsis.waf.TGlobals " %><%@ page import="tsis.waf.controller.TRequest" %><%@ page import="tsis.waf.controller.TResponse" %><%@ page import="tsis.waf.object.vo.TValueObject" %><%@ page import="tsis.waf.util.TRequestUtils" %><%@ page import="tsis.waf.front.adaptor.MiPlatformParser" %><%
	TRequest tRequest = TRequestUtils.getTRequest(request, response);
	TResponse tResponse = TRequestUtils.getTResponse(request, response);

	long startTime = System.currentTimeMillis();
	MiPlatformParser.sendResponse(tResponse);
	String endTime = (System.currentTimeMillis()-startTime)/1000.0 + " sec";
%>