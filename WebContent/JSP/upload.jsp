
<%@ page language="java" contentType="text/html; charset=euc-kr" %>

<% 
	String upPath  = request.getParameter("upPath");
	System.out.println("upPath : "+upPath);
%>	

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD>
<TITLE> ���Ͼ��ε� </TITLE>
<META NAME="Generator" CONTENT="EditPlus">
<META NAME="Author" CONTENT="">
<META NAME="Keywords" CONTENT="">
<META NAME="Description" CONTENT="">
<link href="/css/style.css" rel="stylesheet" type="text/css">
<SCRIPT LANGUAGE="JavaScript">

	function Check()
	{
		//alert(<%=upPath%>);
		
		if(frmUpload.upFile.value == ""){
			alert('÷���� ������ ���� �����ϼ���.');
			return false;
		}else{

			frmUpload.fileName.value = frmUpload.upFile.value;
		
		}
		
		//if(!confirm("[ "+frmUpload.upPath.value+" ]�� ������ ÷���Ͻðڽ��ϱ�?")){
		if(!confirm("������ ÷���Ͻðڽ��ϱ�?")){
			return false;
		}else{
			return true;
		}
	}
	
	function init()
	{
		//frmUpload.upPath.value = <%=upPath%>; // ����Ʈ �ּ�
	}
	
</SCRIPT>

</HEAD>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onLoad="init()">
	<form enctype="multipart/form-data" name="frmUpload" method="post" action='upload_process.jsp?upPath=<%=upPath%>' onSubmit="return Check()">
	<input type="hidden" name="fileName">
		<!-- 
		<br/>
		&nbsp;<font color="blue">[ ������ ��� ]</font>
		<br/>
		&nbsp;<input type="text" name="upPath" size=35 readonly>
		<br/><br/>		 
		&nbsp;<font color="blue">[ ������ ���� ]</font>
		-->
		<br/><br/>
		&nbsp;<input type="file" name="upFile" size=30 >
		<input type='submit' name='btn_upfile' value="÷���ϱ�" class="">
		<br><br>
	1. [ã�ƺ���] Ŭ�� -> ���� ���� <br>
	2. [÷���ϱ�] Ŭ�� -> ���� ����
	</form>

</BODY>
</HTML>
