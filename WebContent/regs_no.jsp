<%@ page contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="java.net.InetAddress"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%  
	String regs_no  = request.getParameter("regs_no");	// ���� url�� �Ķ����
	
	System.out.println("regs_no="+regs_no);
	
%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="ko" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>    

    <meta http-equiv="Content-Type" content="text/html; charset=euc-kr"/>

    <title>�������/����(����)��ȸ</title>

    <link href="http://service.epost.go.kr/postal/cssnew/common.css" rel="stylesheet" type="text/css" />        
    <link href="http://service.epost.go.kr/postal/cssnew/iservice.css" rel="stylesheet" type="text/css" /> 

    <script type="text/javascript" language="javascript" src="/postal/jscripts/n_common.js" ></script>
    <!-- Ű���� ��ŷ ���� ���α׷� ��ġ -->
    <script type="text/javascript" language="javascript" src="http://www.epost.go.kr/comm/easykeytec/easykeytec.js"></script>   
    <script type="text/javascript" language="javascript">
    //<![CDATA[        
    
        self.resizeTo(467,400);    
        
  


        function onlynumber() {
            if((event.keyCode<48)||(event.keyCode>57))
                event.returnValue=false;
        }
         
        function submitchk() {
            //alert("�˼��մϴ�.\n\n�ý��� �������� ���� ���� ���񽺰� �ߴܵǾ����ϴ�.\n\n���� 14�� ���Ŀ� ���񽺰� �簳�˴ϴ�.");
            return true;
        }

        function go1(e){                            // �˻�ó�� ȭ�鸵ũ
            //alert("��Ʈ��ũ ��ַ� ���� ���� 18�ñ��� �����������ȸ ���񽺰� �Ͻ� �ߴܵ˴ϴ�.\n\n�̿뿡 ������ ��� �˼��մϴ�.");
            //return ;
			 var ff = document.trace.sid1;
		   
			
			document.trace.action = "http://service.epost.go.kr/iservice/trace/Trace_ok.jsp";
			document.trace.submit();

			return false;
		
        }

        function noticePop()
        {
            var cookieval = GetCookie("Pop0531");
            if (cookieval != "Y")
                window.open("ServiceStop.html","STOP","location=0,toolbar=no,width=381,height=440,scrollbars=0,directories=no,status=no,resizable=no,menubar=no,left=100,top=100");
        }

        //���� �����ȳ�
        //self.location = "stop3.htm";


        function Go_WhiteDayEvent() {
            opener.top.main.location = "http://mall.epost.go.kr/index.jsp?cFrameURL=/malle/whiteday.jsp";
        }

        function Go_ePostMart() {
            //opener.top.main.location = "http://mall.epost.go.kr/index.jsp?cFrameURL=/malle/open_mart.jsp";
            //window.open("http://mall.epost.go.kr/index.jsp?cFrameURL=/malle/open_mart.jsp","","");
            
            window.open("http://mall.epost.go.kr/index.jsp?cFrameURL=/mallt/EPF50C51.jsp","","");
            self.close();
        }

        function onPageLoad(){
            stop_message();
        }

        function stop_message(){
            
        }

		function go_search()
		{
			//document.trace.action = "http://service.epost.go.kr/iservice/trace/Trace_ok.jsp";
			//document.trace.submit();

		}

    
    //]]>
    </script>
    
    <style type="text/css">
        <!--
        body{
            background-color: #F6F3EA;    
        }
        -->
    </style>    
    
</head>

<body oncontextmenu="return false" onLoad="go_search()">
    <div id="traceSearch">
        <h1><img src="http://service.epost.go.kr/imgnew/iservice/trace/svis01_titTrace02.gif" width="240" height="25" alt="������� / ��������(�ù�)��ȸ" /></h1>

        <div id="searchPost">
            <div class="searchPost-t">
                <div class="searchPost-b">
                    <form name="trace" method="post" action="http://service.epost.go.kr/iservice/trace/Trace_ok.jsp" onsubmit="return go1(event);">
                    	<input type="hidden" name="target" value="" />
                        <fieldset>
                            <legend>����ȣ�� �˻�</legend>
                            <label for="sid1"><img src="http://service.epost.go.kr/imgnew/iservice/trace/svis01_imgTrace01.gif" width="118" height="19" alt="����ȣ(13�ڸ�)" /></label>
                            <input type="text" id="sid1" name="sid1" size="13" maxlength="13" value='<%=regs_no%>'/>
                            <span><input type="image" src="http://service.epost.go.kr/imgnew/iservice/trace/svis01_btTraceSearch.gif" alt="��ȸ" /></span>
                            <p>(����ȣ 13�ڸ��� �Է��Ͻø� ��ȸ�� �����մϴ�.)</p>
                        </fieldset>
                    </form>

                    <p class="textSearchUse">����ȣ 13�ڸ��� �Է��Ͻø� ��ȸ�� �����մϴ�.<br />�Է��� �Ϸ�Ǹ� ��ȸ ��ư�� Ŭ���ϰų� ����Ű�� ġ����. <br />��ȸ���񽺴� 1��̸��� ������ �����մϴ�.<br />���/����(�ù�)���� ������ȭ : ��ü���ݼ���(1588-1300��) </p>

                    <!--p class="textSearchUse">Ȩ���������� ������(�ù�)��ȸ �������� ���� ��ũ�� �ɰ���<br />�Ͻ� ��� &quot;<span>http://service.epost.go.kr/trace.RetrieveRegiPrclDe<br />liv.postal?sid1=����ȣ</span>&quot; ���·� ��ũ�� �ɾ� �ֽø� ���� ��ȸ��<br />�����մϴ�.<br />��) http://service.epost.go.kr/trace.RetrieveRegiPrclDeliv.<br />postal?sid1=1234567890123 </p  -->

                    <p class="textSearchUse2">���ͳ� ���� ���������� ������� ���θ� �ż��� �˷��ִ�<br />���� �����̸�, ���� ���ذ����� �����ڷ�� ����ϱ� ���ؼ���<br />������� ���񽺸� �̿��Ͻñ� �ٶ��ϴ�.</p>
                </div>
            </div>
        </div>
    
    </div>
</body>

</html>




