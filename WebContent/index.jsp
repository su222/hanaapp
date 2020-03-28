<%@ page contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ page import="java.net.InetAddress"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%  
	String ip = request.getServerName();
	int port  = request.getServerPort();
	String context = request.getContextPath();
	String path = "http://" + ip + ":" + port + "" + context;	

	String param1  = request.getParameter("param1");	// 메인 url의 파라미터
	String serverName = request.getServerName();
	String hostName   = InetAddress.getLocalHost().getHostName();
	String hostAddr   = InetAddress.getLocalHost().getHostAddress();
	
%>
<HTML>
<HEAD>
<TITLE>MiPlatform Install</TITLE>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
<link rel="stylesheet" href="./common/images/css/style.css" type="text/css">
<SCRIPT LANGUAGE="JavaScript" src="./common/script/miInstall.js"></SCRIPT> 
<SCRIPT LANGUAGE="vbscript">
	
	Function  Check_Module
	  	
	  	On Error Resume Next
	  	
	   	Err.number = 0
	   	chkMsg= document.MiInstaller.Version
	  	if  Err.number = 438 Then	
			Check_Module = "false"
	  	Else
	        Check_Module = "true"
	  	End If
	  	
	End Function 

</SCRIPT>

<SCRIPT LANGUAGE="JavaScript">

var GcurIndx = 0;
var Gtotcnt = 0;

var TotalVersionFileCnt;
var TotalItemCnt;
var progressColor = "red";	// set to progress bar color
var pg_cell_At = 0,pg1_cell_At = 0; 
var IsError = false;
var proMsg, procMsg;

var proMsg, procMsg;;
var TotalVersionFileCnt;
var TotalItemCnt;
var flagDISTRIBUTE;
var cur_version_file;
//var component_path = "%UserApp%TobeSoft\\MiPlatform320U\\Component\\";
var Server_Path = window.location.href;
Server_Path = Server_Path.substring(0, Server_Path.lastIndexOf("/")) + "/";	
var processWidth = 590;

//var IsRun = false; //321두번실행하는 버그땜시 추가

function fn_OnLoad()
{
//MiInstaller사용시
//Object tag에서 Param으로 Version과 Key입력
//		alert("이미 설치가 된 사용자는 반드시 아래의 내용대로 처리하세요.");
	//if ( Check_Module() == "true" )
	//{
		
		MiInstaller.Key = "<spring:eval expression="@propertyConfigurer.getProperty('context.name')" />";
		MiInstaller.Launch = true;	
		MiInstaller.Retry = 1;
		MiInstaller.Timeout = 300;
		MiInstaller.OnlyOne = true;
		
		MiInstaller.ComponentPath = "%UserApp%TobeSoft\\MiPlatform320U\\Component";
		MiInstaller.StartXml  = "<%=path%><spring:eval expression="@propertyConfigurer.getProperty('start.url')" />";
		MiInstaller.Resource = "%component%resource.xml";	
		MiInstaller.StartImage  = "%component%next_start.gif";
		
		
		MiInstaller.Width = 1260;
		MiInstaller.Height = 910;

		//MiInstaller.NotLaunchForErr = "true";
		var mode = checkOS();

		MiInstaller.UpdateURL = "<%=path%><spring:eval expression="@propertyConfigurer.getProperty('update.url')" />";

		var Bcnt = MiInstaller.ExistVersionUpCnt(); 
		
	
		if ( Bcnt )
		{
			MiInstaller.StartDownload();
		} else {
			fn_run();
		}

	//}

}

function page_link()
{

	// 단축 아이콘 만들기
	// UBKImage : 250 * 300
	
	//BYTE가 256을 넘으면 안됨..
	// 256을 넘을 경우 MiInstaller의 property를 이용할것

	var strCommand = '-V 3.2 -D Win32U -R FALSE -K hanaapp -L TRUE -LE TRUE -BI "%MIPLATFORM%hana.ico" ';
  
	
	// 3.2.2 버젼용 단축아이콘
	MiInstaller.MakeShortCut("MU",strCommand,"하나민원","%MIPLATFORM%hana.ico","desktop");
	
	// 3.2.1 버젼용 단축 아이콘
	//MiInstaller.MakeShortCut("%system%MiUpdater321.exe",strCommand,"Yoon","%SYSTEM%icon_next.ico","");

	
	// MakeShortCut 바로가기를 만드는 함수
	// strExeName: 바로가기를 만들 실행 파일 이름
	// strCommand: 바로가기를 만들 때 필요한 Command 정보
	// strShortcutName: 바로가기 파일 이름
	// strIConPath: 변경하려는 Icon 경로를 %alias%형태로 입력할 수 있습니다.
	// strPos: Startmenu-시작 / Desktop-바탕화면(Default)

	// Alias 참고
	// %MiPlatform%
	// %Component%
	// %system%
	// %Window%
	// %ProgramFiles%

} 

function fn_run()
{
//	if ( IsRun || IsError ) return ; //321두번실행하는 버그땜시 추가
	
//	IsRun = true;
	
	//단축 아이콘 생성
	page_link();
	
	
	MiInstaller.run();
	if (/MSIE/.test(navigator.userAgent)) { 
		if(navigator.appVersion.indexOf("MSIE 7.0")>=0) {
			window.open('about:blank','_self').close();
		} else { 
			window.opener = self; 
			self.close(); 
		}                       
	} 



}


function progress_clear(obj) {
	obj.width = 0;
	if ( obj.id == "progress" ) pg_cell_At = 0;
	else pg1_cell_At = 0;		
}

function progress_update(obj,cur_cnt) {
	if ( obj.id == "progress" ) obj.width = cur_cnt;
	else obj.width = cur_cnt;
}


</SCRIPT>


<SCRIPT LANGUAGE=javascript FOR=MiInstaller EVENT=OnProgress(ItemName,prgress,progressMax,StatusText)>
	if(ItemName != ""){
		
		if(progressMax > 0 && prgress > 0){
			
			var before_At = pg_cell_At;
	        pg_cell_At = parseInt((((GcurIndx-1)/Gtotcnt)*processWidth)+(((1/Gtotcnt)*processWidth)*(prgress/progressMax)));
		    
	        if(pg_cell_At > processWidth){
		    	pg_cell_At = processWidth;
		    }
	        
			progress.width = pg_cell_At;
		}
	}
</SCRIPT>

<SCRIPT language=JavaScript for=MiInstaller event=OnConfirm(ItemName)>
{
	var a;
	a = "OnConfirm=>"
	a += "Item=" + ItemName;	
}
</SCRIPT>

<SCRIPT language=JavaScript for=MiInstaller event=OnStartDownLoad(VersionFileName,DownFileName,Type,TotalCnt,CurIndex)>
{
	if (Type == 1) { //*EVENTCONFIG
		//progress_clear(progress);
		//progress_clear(progress1);
	} else if (Type == 2) {
		progress.width = 0;
		Distproc.width = 0;
		tot_item.innerHTML = "&nbsp;" + CurIndex + "/" + TotalCnt;		
		//tot_ditem.innerHTML = "&nbsp;";
	} else if (Type == 3) { //*EVENTDOWNLOAD
		GcurIndx = CurIndex;
		Gtotcnt = TotalCnt;
		tot_item.innerHTML = "&nbsp;" + CurIndex + "/" + TotalCnt;		
		
		var tpos = DownFileName.lastIndexOf("/") + 1;
		var Fname = DownFileName.substr(tpos,DownFileName.length - tpos);

		item_nm.innerHTML = "&nbsp;" + Fname;
	
		if (prc_msg != "" && prc_msg != null && prc_msg != "undefined") prc_msg.innerHTML = "&nbsp;파일 다운로드 중....";
	} else if (Type == 4) { //*EVENTDISTRIBUTE
		//tot_ditem.innerHTML = "&nbsp;" + CurIndex + "/" + TotalCnt;		
		
		var tpos = DownFileName.lastIndexOf("/") + 1;
		var Fname = DownFileName.substr(tpos, DownFileName.length - tpos);

		item_nm.innerHTML = "&nbsp;" + Fname;
	
		if (prc_msg != "" && prc_msg != null && prc_msg != "undefined") prc_msg.innerHTML = "&nbsp;실제 경로 배포 중....";
	}	
}
</SCRIPT>
 
<!--ItemSize는 미지정 -->
<SCRIPT language=JavaScript for=MiInstaller event=OnEndDownLoad(VersionFileName,DownFileName,Type,TotalCnt,CurIndex)>
{
	
	if (Type == 1) { //*EVENTCONFIG
		if (!IsError) {
			TotalVersionFileCnt = TotalCnt;
			progress_update(progress,processWidth);
			progress_update(Distproc,processWidth);
			if (prc_msg != "" && prc_msg != null && prc_msg != "undefined") prc_msg.innerHTML = "&nbsp;설치 완료";
		
			fn_run();
			//history.back();
		}
	} else if (Type == 3) { //*EVENTDOWNLOAD
	    var before_At = pg_cell_At;
		pg_cell_At = parseInt(((CurIndex)/TotalCnt) * processWidth);
		progress_update(progress,pg_cell_At);
		
		if (IsError) {
			t_err.className = "show";
			reinstall.className = "show";
		}		
	
		if (prc_msg != "" && prc_msg != null && prc_msg != "undefined") prc_msg.innerHTML = "&nbsp;파일 다운로드 완료....";
	} else if (Type == 4) { //*EVENTDISTRIBUTE
	    var before_At = pg1_cell_At;
		pg1_cell_At = parseInt(((CurIndex)/TotalCnt) * processWidth);
		progress_update(Distproc,pg1_cell_At);
				
		if (IsError) {
			t_err.className = "show";
			reinstall.className = "show";
		}		
		
		if (prc_msg != "" && prc_msg != null && prc_msg != "undefined") prc_msg.innerHTML = "&nbsp;실제 경로 배포 완료";
	}
}
</SCRIPT>

<SCRIPT language=JavaScript for=MiInstaller event=OnError(ItemName,ErrorCode,ErrorMsg)>
{
	IsError = true;
	err_msg.innerHTML += '<font class="f2" color="red">' + ItemName + '&nbsp;다운&nbsp;실패&nbsp; -- ErrorCode:' + ErrorCode + ' ' + ErrorMsg + "<br>";
	t_err.className = "show";
	reinstall.className = "show";
	MiInstaller.stop();

}
</SCRIPT>





</HEAD>
<BODY leftmargin="0" topmargin="0" onload="fn_OnLoad()">
<br><br>
<center>
<table id="ins_tbl" align="center" border=0 width="600">
  <tr>
    <td><table width="637" border="0" align="center" cellpadding="0" cellspacing="0">
        <tr> 
          <td height="10"></td>
        </tr>
        <tr> 
          <td><img src="common/images/insu_down_listbg1.gif" width="637" height="11"></td>
        </tr>
        <tr> 
          <td height="37" bgcolor="#EEEEEE"> <table width="607" border="0" align="center" cellpadding="0" cellspacing="0">
              <tr> 
                <td height="15"></td>
              </tr>
              <tr> 
                <td><table width="590" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tr> 
                      <td width="10" rowspan="3"><img src="common/images/insu_down_img.gif" width="150" height="90"></td>
                      <td width="590" height="35"><img src="common/images/insu_down_title.gif" width="204" height="27"></td>
                    </tr>
                    <tr> 
                      <td height="45"><img src="common/images/insu_down_title2.gif" width="329" height="32"></td>
                    </tr>
                  </table></td>
              </tr>
              <tr> 
                <td>&nbsp;</td>
              </tr>
              <tr> 
                <td><table width="607" border="0" cellspacing="0" cellpadding="0">
                    <tr> 
                      <td width="12" height="12"><img src="common/images/insu_down_listbg_sub1.gif" width="12" height="12"></td>
                      <td width="583" height="12" bgcolor="#FFFFFF"></td>
                      <td width="12" height="12"><img src="common/images/insu_down_listbg_sub2.gif" width="12" height="12"></td>
                    </tr>
                    <tr> 
                      <td rowspan="5" bgcolor="#FFFFFF">&nbsp;</td>
                      <td bgcolor="#FFFFFF">
						<table width="570" border="0" align="center" cellpadding="0" cellspacing="0">
						<tr> 
                            <td width="10" valign="top"><img src="common/images/insu_down_list_icon1.gif" width="8" height="11"></td>
                            <td width="570">암호화 프로그램 설치여부를 묻는 보안경고창이 나타나면 반드시 
                              “<strong><font color="#FF7200">예</font></strong>”를 
                              선택하여주시기 바랍니다.<br>
                              “아니오”를 선택하시면 보안을 위해 사용이 제한됩니다.</td>
                        </tr>
                        </table></td>
                      <td rowspan="5" bgcolor="#FFFFFF">&nbsp;</td>
                    </tr>
                    <tr> 
                      <td bgcolor="#FFFFFF">&nbsp;</td>
                    </tr>
                   
                    <tr> 
						<td bgcolor="#FFFFFF">
						<table width="570" border="0" align="center" cellpadding="0" cellspacing="0">
						<tr> 
                            <td width="10" valign="top"><img src="common/images/insu_down_list_icon1.gif" width="8" height="11"></td>
                            <td width="570">프로그램 설치가 정상적이지 않을 경우에는 
                            <strong><a class="f2" href="./common/update/cab_files/MiPlatform_Updater322.exe"><font color="#FF7200">수동다운로드</font></a></strong>
                            
                            를 다운로드 해서 관리자로 실행하시거나 <strong><font color="#FF7200">문의하기</font></strong>를 
                              통해 질문<br>
                              하시면 신속히 답변을 드리겠습니다.</td>
                        </tr>
                        </table></td>
                    </tr>
                    <tr> 
                      <td width="12" height="12"><img src="common/images/insu_down_listbg_sub3.gif" width="12" height="12"></td>
                      <td bgcolor="#FFFFFF"></td>
                      <td width="12" height="12"><img src="common/images/insu_down_listbg_sub4.gif" width="12" height="12"></td>
                    </tr>
                  </table></td>
              </tr>
            </table></td>
        </tr>
        <tr> 
          <td><img src="common/images/insu_down_listbg2.gif" width="637" height="11"></td>
        </tr>
        <tr>
          <td height="5"></td>
        </tr>
      </table></td>
  </tr>
</table>
</center>
<table  id="ins_tbl" align="center" border=0 width="600" >
<tr>
	<td>
	<table >
		<tr>
			<td class="f2"> 파일다운로드 진행 상황</td><td id="comp_cnt" class="f2" align=left NOWRAP>&nbsp;</td>
		</tr>
	</table>
	</td>
</tr>
<tr>
<td colspan=2 valign="middle" WIDTH=<spring:eval expression="@propertyConfigurer.getProperty('process.width')" /> >
	<div  valign="middle" style="font-size:3px;padding:1px;border:1px GROOVE silver;">
	<IMG ID="progress" SRC='common/images/installbar.jpg' WIDTH=0% HEIGHT=10 >
	</div>
</td>
</tr>
<tr>
	<td>
	<table>
		<tr>
		<td class="f2" >파일설치 진행 상황</td><td id="tot_item" align=left class="f2" NOWRAP>&nbsp;</td>
		</tr>
	</table>
	</td>		
</tr>
<tr>
	<td colspan=2 valign="middle" WIDTH=<spring:eval expression="@propertyConfigurer.getProperty('process.width')" /> >
	<div  style="font-size:3px;padding:1px;border:1px GROOVE silver;">
	<IMG ID="Distproc" SRC='common/images/installbar.jpg' WIDTH=0% HEIGHT=10 >
	</div>
	</td>
</tr>
<tr>
	<td>
	<table>
		<tr>
			<td class="f2">대상파일</td><td id="item_nm" class="f2" align=left NOWRAP>&nbsp;</td>
		</tr>
	</table>
	</td>		
</tr>
<tr>
	<td id=prc_msg class="f2" >&nbsp;<td>
</tr>	
</table>
<table class="hide" id=t_err align=center>
	<tr>
		<td class="f2">설치시 에러가 발생한 항목</td>
	</tr>
	<tr>
		<td id=err_msg class="f2">&nbsp;</td>
	</tr>
</table>
<SCRIPT LANGUAGE="JavaScript">
CreateMiInstlr("MiInstaller","Win32U","3.2","HANA");	
</SCRIPT> 
</BODY>
</HTML>
