<%@ page contentType="application; charset=MS949"%>
<%@ page language="java" import="java.util.*,java.io.*" %>
<%
//String filename     = "MDAC_TYP.zip";
//String filepath     = "C:\\TEMP\\";
String filegubun    = "";

int intTemp = 0;

try{
   String filename    = request.getParameter("filename");
   String filepath   = request.getParameter("filepath");

    filepath = filepath + filename;

    File   file = new File(filepath);

byte b[] = new byte[4096];

response.setHeader("Content-Disposition", "attachment;filename=" + filename + ";");

    if (file.isFile()){
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
}catch (Exception e){
}finally{
}
%>