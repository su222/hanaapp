<%@page import="java.io.FileNotFoundException"%>
<%@ page language="java" contentType="text/html; charset=euc-kr" %>
<%@ page import="java.io.File"%>
<%@ page import="java.io.FileInputStream"%>
<%@ page import="java.io.FileOutputStream"%>
<%@ page import="java.nio.channels.FileChannel"%>
<%@ page import="java.io.IOException"%>
<%

System.out.println("OKKKKKKKKKKKKKKKKKKK");
// 소스파일
//String src_file = "C:\\workspace\\thisapp\\WebContent\\test\\2010100.jpg";
String src_file = request.getParameter("SrcFile");
// 타켓파일
//String dst_file = "C:\\workspace\\thisapp\\WebContent\\test\\201055550_11.jpg";
String dst_file = request.getParameter("DestFile");

System.out.println("src_file=" + src_file);
System.out.println("dst_file=" + dst_file);

// 파일객체 생성 
File sourceFile = null; 

//스트림, 채널 선언  
FileInputStream inputStream = null;  
FileOutputStream outputStream = null;  
FileChannel fcin = null;  
FileChannel fcout = null; 
	
try 
{   
	sourceFile = new File( src_file ); 
	
	//스트림 생성   
	inputStream = new FileInputStream(sourceFile);   
	outputStream = new FileOutputStream(dst_file);   
	//채널 생성   
	fcin = inputStream.getChannel();  
	fcout = outputStream.getChannel();      
	//채널을 통한 스트림 전송   
	long size = fcin.size();   
	fcin.transferTo(0, size, fcout); 
}
catch (Exception e) 
{   
	e.printStackTrace();
}
finally 
{   
	//자원 해제   
	try
	{    
		fcout.close();   
	}
	catch(IOException ioe){}
	try
	{   
		fcin.close();   
	}
	catch(IOException ioe){}
	try
	{    
		outputStream.close();   
	}
	catch(IOException ioe){}
	try
	{    
		inputStream.close();   
	}
	catch(IOException ioe){}
 }
	
%>
