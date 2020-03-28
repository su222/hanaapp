<%@ page import="java.io.IOException"%>
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.net.*"%>
<%@ page import="javax.servlet.http.Cookie"%>
<%@ page import="javax.servlet.*" %>
<%@ page import="javax.servlet.http.*" %>
<%
	String _cookie = null;
	String filename;
    Cookie theCookie = null;
    Cookie cookies[] = request.getCookies();
    
    if (cookies != null) {
	    for(int i=0, n=cookies.length; i < n; i++) {

	    	theCookie = cookies[i];
	    	if (theCookie.getName().equals("FileParam")) {
		        try {            
		        	//_cookie = java.net.URLDecoder.decode(new String(theCookie.getValue().toString().getBytes("utf-8"), "utf-8"));
		        	//_cookie = new String(theCookie.getValue().toString().getBytes("8859_1"),"EUC-KR");
		        			       
		        	//_cookie = theCookie.getValue();
		        	//_cookie = java.net.URLDecoder.decode(_cookie);
		        	_cookie = URLDecoder.decode(new String(theCookie.getValue().toString().getBytes("8859_1"),"KSC5601"), "EUC-KR");
		        	System.out.println("_cookie :: " + URLDecoder.decode(new String(theCookie.getValue().toString().getBytes("8859_1"),"KSC5601"), "EUC-KR"));
		        	//filename = URLEncoder.encode(_cookie,"UTF-8").replaceAll("\\+", "%20");
		        	//_cookie = filename;
		        	//System.out.println("filename :: " + filename);		        	
		        } catch (NumberFormatException ignored) {
		        	_cookie = null;
		        }
	        	break;
	      	}
	    }
    }
    
    int len;
    	
	// FileRead 처리 (_cookie로 전달됨) 
	String filePath = request.getParameter("savepath");
	   
	File   file = new File(filePath);

System.out.println("_cookie --->[" + filePath + "]");

	byte b[] = new byte[4096];
	
    theCookie = null;
    String retval = "";
	int bFile;
	
	if (file.isFile()){
    	retval = "SUCC::";
    	bFile = 1;
	} else {
    	retval = "FAIL::File Not Found!!";
    	bFile = 0;
	}
    theCookie = new Cookie ("FileParam", retval);
    response.addCookie(theCookie);	
    if ( bFile == 1 )
    {	
		response.setContentType("application/octet-stream");
		out.clearBuffer();

		BufferedInputStream fin = new BufferedInputStream(new FileInputStream(file));
		BufferedOutputStream outs = new BufferedOutputStream(response.getOutputStream());
		int read = 0;
		try {
			while ((read = fin.read(b)) != -1){
	  			outs.write(b,0,read);
		}
		outs.close();
		fin.close();
		} catch (Exception e) {
		} finally {
			if(outs!=null) outs.close();
			if(fin!=null) fin.close();
		}
	}	
%>