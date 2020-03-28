<%@ page contentType="text/html;charset=utf-8" 
%><%@ page import="com.oreilly.servlet.*,
				   com.oreilly.servlet.multipart.*,
                   com.oreilly.servlet.MultipartRequest,
                   com.oreilly.servlet.multipart.DefaultFileRenamePolicy,
                   java.util.*,
                   java.io.*, 
                   javax.servlet.*,
                   com.tobesoft.platform.*,
                   com.tobesoft.platform.data.*" 

%><%
String realFolder = "";
String saveFolder = "upload";
String encType = "euc-kr";
int sizeLimit = 10 * 1024 * 1024 ; // 5메가까지 제한 넘어서면 예외발생

ServletContext context = getServletContext();
realFolder = context.getRealPath(saveFolder);
System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>"+realFolder);
String rtn=null;
 try{

	MultipartRequest multi = new MultipartRequest(request, realFolder, sizeLimit,  encType, new DefaultFileRenamePolicy());
	
	String form_val = multi.getParameter("userName");
	//System.out.println(form_val);
	
	/////////////////////////////////////////////
	// SaveXML()로 넘어온 폼변수 String을 데이터셋으로 받는 로직  
	String xmldata =  multi.getParameter("xmldata");

  Reader in = new StringReader(xmldata);
  
  PlatformRequest req = new PlatformRequest(in, "UTF-8");   //인코딩 방식 설정
  
  req.setContentType(PlatformConstants.CONTENT_TYPE_XML);
  // 데이타 읽기와 분석
  req.readData(true);
    
  //VariableList vl = req.getVariableList();
  DatasetList dl = req.getDatasetList();
	
	//System.out.println("xmldata-------------->"+xmldata);
	//System.out.println(dl.size());
	Dataset ds = dl.getDataset("Dataset0");

	ds.printDataset();
	/////////////////////////////////////////////
	
	
	// 파일 처리
	Enumeration files = multi.getFileNames();
	 String filesName;
	 String saveFiles;
	 String origFiles;
	
	 while(files.hasMoreElements()){
	    filesName = (String)files.nextElement();
	    saveFiles = (String)multi.getFilesystemName(filesName);
	    origFiles = (String)multi.getOriginalFileName(filesName);
	    //f = multi.getFile(filesName);
	    System.out.println("filesName: "+filesName);
	    System.out.println("saveFiles: "+saveFiles);
	    System.out.println("origFiles: "+origFiles);
	    System.out.println("---------------------");
	    
	 }	
	out.println("결과값을 던질때 : 한글 테스트 dkfaskdfkasdkfaksdf");
	rtn = "SUCC";
	
 	}catch(IOException ioe){
	 System.out.println(ioe);
	 rtn = "FAIL";
	 response.setStatus(500);
	}catch(Exception ex){
	 System.out.println(ex);
	 rtn = "FAIL";
	 response.setStatus(501);
	}
	System.out.println("rtn---------------------"+rtn);
	
%>
