<%@ page contentType="text/html; charset=euc-kr" %>
<%@ page isErrorPage="true" %>
<%@ page import="java.io.*"%>
<%@ page import="com.tobesoft.platform.*"%>
<%@ page import="com.tobesoft.platform.data.*"%>
<%

	PlatformData outMixml = new PlatformData();
	VariableList vars = new VariableList();
	DatasetList datasets = new DatasetList();
	outMixml.setVariableList(vars);
	outMixml.setDatasetList(datasets);
	

	// 에러메시지로 로그인 모달 띄운다.
	vars.addVariable("Error", "true");
	vars.addVariable("ResultCode", "LoginError");
	vars.addVariable("ResultMessage", "try login..!!");

	PlatformResponse res = new PlatformResponse(response, PlatformResponse.ZLIB_COMP);
	res.sendData(outMixml);

%>