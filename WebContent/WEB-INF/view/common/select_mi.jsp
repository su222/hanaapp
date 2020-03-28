<%@page import="co.vo.miplaform.ComMiplatformVO"%><%@page import="com.tobesoft.platform.data.DatasetList"%><%@page import="org.apache.poi.hssf.record.chart.DataLabelExtensionRecord"%><%@page import="com.tobesoft.platform.data.VariableList"%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %><%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %><%@ page import="com.tobesoft.platform.*" %><%
 
out.clearBuffer();

PlatformResponse pRes = new PlatformResponse(response, PlatformRequest.XML, "utf-8");

ComMiplatformVO comMiplatformVO = (ComMiplatformVO) request.getAttribute("comMiplatformVO");

pRes.sendData(comMiplatformVO.getVl(), comMiplatformVO.getDl());

//pRes.sendData(vl, dl);



%>