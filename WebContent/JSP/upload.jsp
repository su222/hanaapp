
<%@ page language="java" contentType="text/html; charset=euc-kr" %>

<% 
	String upPath  = request.getParameter("upPath");
	System.out.println("upPath : "+upPath);
%>	

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD>
<TITLE> 파일업로드 </TITLE>
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
			alert('첨부할 파일을 먼저 선택하세요.');
			return false;
		}else{

			frmUpload.fileName.value = frmUpload.upFile.value;
		
		}
		
		//if(!confirm("[ "+frmUpload.upPath.value+" ]에 파일을 첨부하시겠습니까?")){
		if(!confirm("파일을 첨부하시겠습니까?")){
			return false;
		}else{
			return true;
		}
	}
	
	function init()
	{
		//frmUpload.upPath.value = <%=upPath%>; // 디폴트 주소
	}
	
</SCRIPT>

</HEAD>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onLoad="init()">
	<form enctype="multipart/form-data" name="frmUpload" method="post" action='upload_process.jsp?upPath=<%=upPath%>' onSubmit="return Check()">
	<input type="hidden" name="fileName">
		<!-- 
		<br/>
		&nbsp;<font color="blue">[ 저장할 경로 ]</font>
		<br/>
		&nbsp;<input type="text" name="upPath" size=35 readonly>
		<br/><br/>		 
		&nbsp;<font color="blue">[ 저장할 파일 ]</font>
		-->
		<br/><br/>
		&nbsp;<input type="file" name="upFile" size=30 >
		<input type='submit' name='btn_upfile' value="첨부하기" class="">
		<br><br>
	1. [찾아보기] 클릭 -> 파일 선택 <br>
	2. [첨부하기] 클릭 -> 파일 저장
	</form>

</BODY>
</HTML>
