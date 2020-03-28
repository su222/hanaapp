
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
		
		//savePath = "C:\\"; // �׽�Ʈ��
		//savePath = "/jeus/webapps/ftp_upload_data/";
		
		sizeLimit      = "";
		String tmpName = "";
		long fileSize  = 0;
		
		System.out.println("savePath : "+savePath);
		
		if(savePath == null || savePath.equals("")){
			throw new Exception("���� ���� ��ΰ� �����ϴ�.");
		}
		
		// �⺻ ����ũ�� 100 
		if(sizeLimit == null || sizeLimit.equals("")){
			sizeLimit = "100";
		}
		
		limit = Integer.parseInt(sizeLimit)  * 1024 * 1024;
		
		MultipartRequest req = new MultipartRequest(request, savePath, limit, "KSC5601", new DefaultFileRenamePolicy());		
		
		// ÷������ ã�� (input type='file' �� ������ ã�ƿ´�.)
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
		// multipart/form-data ������ �� ����ġ��.
		// ���������� ó���ϱ����ؼ� 
		if(ex.getMessage().indexOf("multipart/form-data") != -1){
			// �ʱ�ȭ 
		}
		else if(ex.getMessage().indexOf("exceeds limit") != -1){
			System.out.println("����ũ�Ⱑ ����ũ�� ��/�� �ʰ��߽��ϴ�.");
		}
		else{
			System.out.println(ex.getMessage());
		}		
	}	
	catch(Exception ex){	
		//System.out.println("����="+ex.getMessage());
		ex.printStackTrace();
	}
	 
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
	<font><b>[ ������ ÷���Ͽ����ϴ� ]</b></font>
</BODY>
</HTML>
