<%@ page contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="java.net.InetAddress"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%  
	String regs_no  = request.getParameter("regs_no");	// 메인 url의 파라미터
	
	System.out.println("regs_no="+regs_no);
	
%>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="ko" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>    

    <meta http-equiv="Content-Type" content="text/html; charset=euc-kr"/>

    <title>국내등기/소포(우편)조회</title>

    <link href="http://service.epost.go.kr/postal/cssnew/common.css" rel="stylesheet" type="text/css" />        
    <link href="http://service.epost.go.kr/postal/cssnew/iservice.css" rel="stylesheet" type="text/css" /> 

    <script type="text/javascript" language="javascript" src="/postal/jscripts/n_common.js" ></script>
    <!-- 키보드 해킹 방지 프로그램 설치 -->
    <script type="text/javascript" language="javascript" src="http://www.epost.go.kr/comm/easykeytec/easykeytec.js"></script>   
    <script type="text/javascript" language="javascript">
    //<![CDATA[        
    
        self.resizeTo(467,400);    
        
  


        function onlynumber() {
            if((event.keyCode<48)||(event.keyCode>57))
                event.returnValue=false;
        }
         
        function submitchk() {
            //alert("죄송합니다.\n\n시스템 점검으로 인해 현재 서비스가 중단되었습니다.\n\n금일 14시 이후에 서비스가 재개됩니다.");
            return true;
        }

        function go1(e){                            // 검색처리 화면링크
            //alert("네트워크 장애로 인해 금일 18시까지 등기소포배달조회 서비스가 일시 중단됩니다.\n\n이용에 불편을 드려 죄송합니다.");
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

        //서비스 중지안내
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
        <h1><img src="http://service.epost.go.kr/imgnew/iservice/trace/svis01_titTrace02.gif" width="240" height="25" alt="국내등기 / 소포우편(택배)조회" /></h1>

        <div id="searchPost">
            <div class="searchPost-t">
                <div class="searchPost-b">
                    <form name="trace" method="post" action="http://service.epost.go.kr/iservice/trace/Trace_ok.jsp" onsubmit="return go1(event);">
                    	<input type="hidden" name="target" value="" />
                        <fieldset>
                            <legend>등기번호로 검색</legend>
                            <label for="sid1"><img src="http://service.epost.go.kr/imgnew/iservice/trace/svis01_imgTrace01.gif" width="118" height="19" alt="등기번호(13자리)" /></label>
                            <input type="text" id="sid1" name="sid1" size="13" maxlength="13" value='<%=regs_no%>'/>
                            <span><input type="image" src="http://service.epost.go.kr/imgnew/iservice/trace/svis01_btTraceSearch.gif" alt="조회" /></span>
                            <p>(등기번호 13자리를 입력하시면 조회가 가능합니다.)</p>
                        </fieldset>
                    </form>

                    <p class="textSearchUse">등기번호 13자리를 입력하시면 조회가 가능합니다.<br />입력이 완료되면 조회 버튼을 클릭하거나 엔터키를 치세요. <br />조회서비스는 1년미만의 우편물만 가능합니다.<br />등기/소포(택배)관련 문의전화 : 우체국콜센터(1588-1300번) </p>

                    <!--p class="textSearchUse">홈페이지에서 등기소포(택배)조회 페이지에 직접 링크를 걸고자<br />하실 경우 &quot;<span>http://service.epost.go.kr/trace.RetrieveRegiPrclDe<br />liv.postal?sid1=등기번호</span>&quot; 형태로 링크를 걸어 주시면 직접 조회가<br />가능합니다.<br />예) http://service.epost.go.kr/trace.RetrieveRegiPrclDeliv.<br />postal?sid1=1234567890123 </p  -->

                    <p class="textSearchUse2">인터넷 종적 정보제공은 우편물배달 여부를 신속히 알려주는<br />것이 목적이며, 각종 이해관계의 증거자료로 사용하기 위해서는<br />배달증명 서비스를 이용하시기 바랍니다.</p>
                </div>
            </div>
        </div>
    
    </div>
</body>

</html>




