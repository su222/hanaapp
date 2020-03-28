<%@ page contentType="text/html; charset=utf-8" %><%@ page isErrorPage="true" %><%@ page import="java.io.*"%><%@ page import="com.tobesoft.platform.*"%><%@ page import="com.tobesoft.platform.data.*"%><%
	Throwable t = exception;
	t.printStackTrace();
	String message = t.getMessage();
	
	if (exception instanceof ServletException) {
		ServletException e = (ServletException)exception;
		if(e.getRootCause() == null) t = e;
		else t = e.getRootCause();
	}

	ByteArrayOutputStream baos = new ByteArrayOutputStream();
	PrintStream trace = new PrintStream(baos, true);
	t.printStackTrace(trace);
	String logTrace = baos.toString();

	if (message == null || "".equals(message.trim())) {
		message = "no message";
	}

	if (logTrace == null || "".equals(logTrace.trim())) {
		logTrace = "no trace";
	}

	PlatformData outMixml = new PlatformData();
	VariableList vars = new VariableList();
	DatasetList datasets = new DatasetList();
	outMixml.setVariableList(vars);
	outMixml.setDatasetList(datasets);
	
	vars.addVariable("Error", "true");
	vars.addVariable("ResultCode", "UnknownError");
	vars.addVariable("ResultMessage", message);
	vars.addVariable("LogTrace", logTrace);

	PlatformResponse res = new PlatformResponse(response, PlatformResponse.ZLIB_COMP);
	res.sendData(outMixml);

%>