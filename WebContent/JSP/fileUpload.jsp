<%@ page import="java.io.*"%>
<%@ page import="javax.servlet.http.Cookie"%>
<%@ page import="javax.servlet.*" %>
<%@ page import="javax.servlet.http.*" %>
<%@ page import="co.util.FileUtil" %>

<%
    	String _cookie = null;
    	Cookie theCookie = null;
    	Cookie cookies[] = request.getCookies();
    	if (cookies != null) {
		    for(int i=0, n=cookies.length; i < n; i++) {
		    	theCookie = cookies[i];
		    	if (theCookie.getName().equals("FileParam")) {
			        try {
			        	_cookie = theCookie.getValue().toString();
			        } catch (NumberFormatException ignored) {
			        	_cookie = null;
			        }
			        	break;
		      	}
		    }
    	}

		String rtn_val = "";
		String dst_Path = request.getParameter("savepath");
		
		
		
		System.out.println("dst_Path="+dst_Path);
		
		//dst_Path = request.getRealPath(dst_Path);
		
        int len = request.getContentLength();
    	InputStream _istream = request.getInputStream();
		String filePath = dst_Path;
		
		OutputStream s = new FileOutputStream(dst_Path);
		
		
		/*
		int ch = -1;
		
		while ((ch = _istream.read()) != -1) {
			s.write(ch);
		}
		*/
		
		byte[] buffer = new byte[8192];
		int size = buffer.length;
		
		while (true) {
			int n = _istream.read(buffer);
			
			
			if (n <= 0) {
				break;
			}
			
			
			
			s.write(buffer, 0, n);
		}
		
		s.close();
		
		
		// 파일을 실제 WAS 로 옮기자
		// 걍 가상디렉토리로 사용함 
		//FileUtil file_util = new FileUtil();
		
		
		//file_util.copy(dst_Path, "D:\\workspace\\hanaapp\\WebContent\\mrd\\10007.mrd");
		
		
		
    	theCookie = null;
    	rtn_val = "SUCC::" ;
    	
    	theCookie = new Cookie ("FileParam", rtn_val);
    	response.setContentType("text/html");
    	response.addCookie(theCookie);

    	
    	
    	
%>

