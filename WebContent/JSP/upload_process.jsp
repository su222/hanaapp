
<%@ page language="java" contentType="text/html; charset=euc-kr" %>
<%@ page import="java.util.*,java.io.*"%>
<%@ page import="com.oreilly.servlet.*,com.oreilly.servlet.multipart.*"%>
<% 
	String fileName = "";

	response.setContentType("text/html; charset=KSC5601");
		
	String upPath2  = request.getParameter("upPath");
	System.out.println("upPath2 : "+upPath2);
	
	String tmpPath = upPath2.replace("\"","");
	
	System.out.println("tmpPath : "+tmpPath);

	File file = null;
	int limit = 0;

	String arrOrgFile  = "";
	String arrSaveFile = "";
	String arrSize     = "";
	String savePath    = "";
	String sizeLimit   = "";
	
	try
	{	 	 
		//savePath = "C:\\";
		//savePath = "/jeus/webapps/ftp_upload_data/";
		savePath = tmpPath;
		
		//savePath = "C:\\"; // 테스트용
		//savePath = "/jeus/webapps/ftp_upload_data/";
		
		sizeLimit      = "";
		String tmpName = "";
		long fileSize  = 0;
		
		System.out.println("savePath : "+savePath);
		
		if(savePath == null || savePath.equals("")){
			throw new Exception("파일 저장 경로가 없습니다.");
		}
		
		// 기본 제한크기 100 
		if(sizeLimit == null || sizeLimit.equals("")){
			sizeLimit = "100";
		}
		
		limit = Integer.parseInt(sizeLimit)  * 1024 * 1024;
		
		MultipartRequest req = new MultipartRequest(request, savePath, limit, "KSC5601", new DefaultFileRenamePolicy());		
		
		// 첨부파일 찾기 (input type='file' 인 모든것을 찾아온다.)
		Enumeration upfiles = req.getFileNames();		
		//System.out.println("upfiles.nextElement().toString() : "+upfiles.nextElement().toString());
		
		fileName = req.getParameter("fileName");
		System.out.println("fileName : "+fileName);
		
		//String fileName2 = req.getFile(tmpName);
		
		int row = 0;
		
		while(upfiles.hasMoreElements())
		{
			tmpName = upfiles.nextElement().toString();
			file = req.getFile(tmpName);
			
			System.out.println("file : "+file);
			
			if(file != null){
				fileSize = file.length();
			}
			
			if(req.getFilesystemName(tmpName) != null){
				if(row == 0){
					arrOrgFile += "'"+req.getFilesystemName(tmpName)+"'";
					arrSaveFile += "'"+req.getOriginalFileName(tmpName)+"'";
					arrSize += String.valueOf(fileSize);
				}else{
					arrOrgFile += ",'"+req.getFilesystemName(tmpName)+"'";
					arrSaveFile += ",'"+req.getOriginalFileName(tmpName)+"'";
					arrSize += "," + String.valueOf(fileSize);
				}
				row++;
			}
		}
	}
	catch(IOException ex){
		// multipart/form-data 에러는 걍 지나치자.
		// 한페이지에 처리하기위해서 
		if(ex.getMessage().indexOf("multipart/form-data") != -1){
			// 초기화 
		}
		else if(ex.getMessage().indexOf("exceeds limit") != -1){
			System.out.println("파일크기가 제한크기 을/를 초과했습니다.");
		}
		else{
			System.out.println(ex.getMessage());
		}		
	}	
	catch(Exception ex){	
		//System.out.println("에러="+ex.getMessage());
		ex.printStackTrace();
	}
	 
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

	function init()
	{
		//alert(frmHidden.fileName.value);
	}

</SCRIPT>

</HEAD>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onLoad="init()">
	<form name="frmHidden" width=0 height=0>
		<input type="hidden" name="fileName" value='<%=file%>'>
	</form>
	<br/><br/>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<font><b>[ 파일을 첨부하였습니다 ]</b></font>
</BODY>
</HTML>
