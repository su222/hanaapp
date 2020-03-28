var TEMP_PRE_FORMID;



/***************************************************************************************************
 * gfn_OpenWindowByFormId 해당 프로그램을 활성화
 *
 * @param formId		폼ID
***************************************************************************************************/

function gfn_OpenWindowByFormId(formId)
{
	var oForms = global.AllWindows[formId];
	if(oForms != null)
	{
		oForms[0].SetFocus();
		if(TEMP_PRE_FORMID != formId){
			gfn_commMsg("", "");	//화면 바뀔때마다 메세지 초기화	
		}
	}
	TEMP_PRE_FORMID = formId;
}


/***************************************************************************************************
 * gfn_CloseWindowByFormId 해당 프로그램을  종료
 *
 * @param formId		폼ID
***************************************************************************************************/
function gfn_CloseWindowByFormId(formId)
{
	var oForms = global.AllWindows[formId];
	if(oForms != null)
	{
		// 먼저 저장하고 닫기
		oForms[0].Close();
		if(TEMP_PRE_FORMID == formId){
			//gfn_commMsg("", "");	//화면 바뀔때마다 메세지 초기화	
		}		
	}
}


/***************************************************************************************************
 * gfn_FormOpenChk 열린 프로그램인지 체크
 *
 * @param sUrl		오픈할 폼 Url
 * ex) gfn_FormOpenChk("main::test.xml");
***************************************************************************************************/
function gfn_FormOpenChk(sUrl)
{
	if(sUrl == "") return false;

	for(i=0; i<global.windows.count; i++){
		
		if(sUrl == global.windows[i].id){
			
			return true;
		}
	}
				
	return false;

}
 
/***************************************************************************************************
 * 팝업 또는 상세화면 호출하는 함수
 * 위치 및 크기가 지정된 Modal Dialog로 띄우도록 되어있다.
 *
 * @param  obj			폼 object
 * @param  pUrl			요청할 URL
 * @param  param		파라미터
 * @param  [pModalFg]	창을 Modal로 띄울지 여부(Default: true)
 * @param  [pOpt] 		오픈 스타일 (Default : title=true status=false)
 * @param  [pLeft] 		Screen 기준의 창 왼쪽 좌표
 * @param  [pTop]		Screen 기준의 창 위쪽 좌표
 * @return  none
***************************************************************************************************/
function gfn_openPopup(obj, pUrl, param, pModalFg, pOpt, pLeft, pTop)
{
	if(ToLower(substr(pUrl,pUrl.length-3,pUrl.length)) != "xml"){
		pUrl = pUrl + ".xml";
	}

	var strOpenStyle = "title=false status=true Scroll=false Resize=false";
	if(length(pOpt) > 0)	strOpenStyle += pOpt;
	
	if( pModalFg == false ){
		if (pLeft != null && pLeft != '' && pTop != null && pTop != '') {
			return obj.Open(pUrl, param, -1, -1, strOpenStyle, pLeft, pTop);
		} else {
			return obj.Open(pUrl, param, -1, -1, strOpenStyle);
		}
	} 
	else {
		if (pLeft != null && pLeft != '' && pTop != null && pTop != '') {
			return obj.Dialog(pUrl, param, -1, -1, strOpenStyle, pLeft, pTop);
		} else {
			return obj.Dialog(pUrl, param, -1, -1, strOpenStyle);
		}
	}
}

/***************************************************************************************************
 * 팝업 또는 상세화면 호출하는 함수
 * 위치 및 크기가 지정된 Modal Dialog로 띄우도록 되어있다.
 *
 * @param  obj			폼 object
 * @param  pUrl			요청할 URL
 * @param  param		파라미터
 * @param  [pModalFg]	창을 Modal로 띄울지 여부(Default: true)
 * @param  [pOpt] 		오픈 스타일 (Default : title=true status=false)
 * @param  [pLeft] 		Screen 기준의 창 왼쪽 좌표
 * @param  [pTop]		Screen 기준의 창 위쪽 좌표
 * @return  none
***************************************************************************************************/
function gfn_openPopupSize(obj, pUrl, param, pModalFg, pOpt, pLeft, pTop)
{
	if(ToLower(substr(pUrl,pUrl.length-3,pUrl.length)) != "xml"){
		pUrl = pUrl + ".xml";
	}

	var strOpenStyle = "title=false status=true Scroll=true Resize=true";
	if(length(pOpt) > 0)	strOpenStyle += pOpt;
	
	if( pModalFg == false ){
		if (pLeft != null && pLeft != '' && pTop != null && pTop != '') {
			return obj.Open(pUrl, param, -1, -1, strOpenStyle, pLeft, pTop);
		} else {
			return obj.Open(pUrl, param, -1, -1, strOpenStyle);
		}
	} 
	else {
		if (pLeft != null && pLeft != '' && pTop != null && pTop != '') {
			return obj.Dialog(pUrl, param, -1, -1, strOpenStyle, pLeft, pTop);
		} else {
			return obj.Dialog(pUrl, param, -1, -1, strOpenStyle);
		}
	}
}



/**
*	1. 함수명   : gfn_GetZipCodeInfo
*	2. 파라미터 : tZip1    - 우편번호 앞번호
*	              tZip2    - 우편번호 뒷번호
*	              tAddress - 주소
*	3. 함수설명 : 동 또는 면명으로 우편번호 및 동이상 정보를 조회한다.
*   4. 리턴값   : 우편 번호 및 주소
*    
*/
function gfn_GetZipCodeInfo(tZip1, tZip2, tAddress)
{
	var tParam = "Zip1='" + tZip1 + "' Zip2='" + tzip2 + "' Address='" + tAddress;
    gfn_CmnPopup("TestView::zipcode.xml", tParam, "modaless", "400, 445, -1, -1");	// zipcode.xml는 임시값이다.
}

/**
*	1. 함수명   : gfn_CmnPopup 
*	2. 파라미터 : p_url      - 팝업주소
*	              p_params   - 파라미터값
*	              p_modal_yn - modal 유무 (modal일 경우에는 팝업창을 닫기 전에는 부모창에 영향을 미칠 수 없다.)
*	              p_size     - 팝업창 크기
*	3. 함수설명 : 팝업창을 띄우는 함수
*   4. 리턴값   : 없음
*    
*/
function gfn_CmnPopup(p_url, p_params, p_modal_yn, p_size)
{
	// 화면 스타일
	var strOpenStyle = "Title=true AutoSize=false Scroll=true Resize=true";
	
	// 팝업 크기    
	var arrSize;
	
	switch(toUpper(trim(p_size)))
	{
		case "FULL"   : arrSize = split(trim("870,600"), ","); break;
		case "MIDDLE" : arrSize = split(trim("870,520"), ","); break;
		case "SMALL"  : arrSize = split(trim("700,480"), ","); break;
		default  	  : arrSize = split(trim(p_size), ",");
	}

	if(arrSize.length < 3){
		arrSize[2] = -1;
		arrSize[3] = -1;
	}
	
	// Modal/Modaless 구분
	if(toUpper(p_modal_yn) == "MODALESS"){
	    
		return Open(p_url, p_params, arrSize[0], arrSize[1], strOpenStyle, arrSize[2], arrSize[3]);
		
	}else if(toUpper(p_modal_yn) == "MODAL" || toUpper(p_modal_yn) == ""){
	
		return Dialog(p_url, p_params, arrSize[0], arrSize[1], strOpenStyle,  arrSize[2], arrSize[3]);
		
	}
	
}


var gfv_CalendarDateFg;
var gfv_CalendarValue;
var gfv_CalendarNaviFq = true;

/**
*	1. 함수명   : gfn_SetCalendarDate
*	2. 파라미터 : obj        - 버튼 객체
*	              calType    - 날짜 타입 (D:일, M:월, W:주)
*	              maskObject - 선택된 날짜를 입력하는 창 객체
*	3. 함수설명 : 날짜나 월을 입력할 때 쓰이는 함수
*   4. 리턴값   : 날짜나 월
*    
*/
function gfn_SetCalendarDate(obj, calType, maskObject)
{
	var strCode = calType;
	var strUrl;
	var objCal;

	var nrtn = gfn_Calendar(obj,'','',strCode,"");
	
	if(nrtn.trim().length() > 0){
		maskObject.value = nrtn;
	}
}

// Calendar  
var Gv_CalendarPopDivURL = "Templet::fm_Cal_Day.xml";
var Gv_CalendarPopDivX;
var Gv_CalendarPopDivY;
var Gv_CalendarPopDivW;
var Gv_CalendarPopDivH;
var Gv_rtnDate        = "";	// Selected Date Return Value
var Gv_rtnDFlag       = "";	// Check Flag (return falg)
var Gv_CalendarPopRow = -1;
var Go_Calendar       = null;


function gfn_IsPopDivCalendar(obj)
{
	var oForm = obj.getForm();
	if(oForm.IsExistVar("CHK_MAKE_CALENDAR2")){
		return true;
	}else{
        return false;
	}
}


function gfn_CreatePopDivCalendar(obj)
{
	var oForm = obj.getForm();
	oForm.Create("PopupDiv", "PopDiv_Calendar", "URL=" +  quote(Gv_CalendarPopDivURL)
			+ ' Border="None" Color="white" Height="196" Width="179"');
	
	oForm.AddVariable("CHK_MAKE_CALENDAR2", true);

	gfv_CalendarDateFg = "D"; 
	gfv_CalendarValue  = ""; 
}


/**
*	1. 함수명   : gfn_PopupGridCalendar
*	2. 파라미터 : objGrd
*		 	      nRow
*		 	      nCell
*		 	      chkFlg
*	3. 함수설명 : 달력 호출
*   4. 리턴값   : 날짜 데이터
*   
*/ 
function gfn_PopupGridCalendar(objGrd, nRow, nCell, chkFlg)
{	
	Gv_objGrid = objGrd;
	var oForm  = objGrd.getForm();
	
	if(chkFlg){
		Gv_rtnDFlag = true;
	}else{
		Gv_rtnDFlag = false;
	}
	
	var objBDs   = Gv_objGrid.BindDataset;
	Gv_objBindDs = oForm.object(objBDS).id;
	
	Gv_grdRow   = nRow;
	Gv_grdColId = Gv_objGrid.GetCellProp("Body", nCell, "ColId");
	
	var str_val = oForm.object(Gv_objBindDs).GetColumn(nRow, Gv_grdColId);
	
	if(length(str_val) == 0){
		str_val = today();
	}

	var arr_val =  Gv_objGrid.GetCellRect(nRow,nCell);	
	var div_x   = oForm.ClientToScreenX(objGrd, arr_val[0]);
	var div_y   = oForm.ClientToScreenY(objGrd, arr_val[1]);
	var div_w   = arr_val[2] - arr_val[0];
	var div_h   = arr_val[3] - arr_val[1];
	
	if(gfn_IsPopDivCalendar(objGrd) == false){
	
		Gv_rtnDate = str_val;
		Gv_CalendarPopDivX = div_x;
		Gv_CalendarPopDivY = div_y;
		Gv_CalendarPopDivW = div_w;
		Gv_CalendarPopDivH = div_h;
		Gv_CalendarPopRow  = nRow;
		
		var tmp = gfn_CreatePopDivCalendar(objGrd);
		
	}else{
	
		if( length(str_val) > 0 ){
			var sYear = mid(str_val,0,4);
			var sMonth = mid(str_val,4,2);
			var sDay = mid(str_val,6,2);
			//oForm.PopDiv_Calendar.Show_cal(sYear,sMonth,sDay,true);	
		}else{
			//PopDiv_Calendar.Show_cal("0","0","0",true);	
		}
		
		if(div_x < 0){
			div_x = 0;
		}
		
		var ret = oForm.PopDiv_Calendar.TrackPopup(div_x, div_y,div_w,div_h);
		
		if(ret.length() > 0){
			Gv_rtnDate = ret;
			oForm.object(Gv_objBindDs).SetColumn(nRow, Gv_grdColId,ret);
		}
		
	}

	if(Gv_rtnDFlag){
		return Gv_rtnDate;
	}else{
		return;
	}
}		


/**
*	1. 함수명   : gfn_PopupGridCalendarM
*	2. 파라미터 : objGrd
*		 	      nRow
*		 	      nCell
*		 	      chkFlg
*	3. 함수설명 : 달력 호출
*   4. 리턴값   : 날짜 데이터
*   
*/ 
function gfn_PopupGridCalendarM(objGrd, nRow, nCell, chkFlg)
{
	Gv_objGrid = objGrd;
	
	var oForm = objGrd.getForm();
	
	if(chkFlg){
		Gv_rtnDFlag = true;
	}else{
		Gv_rtnDFlag = false;
	}
	
	var objBDs =  Gv_objGrid.BindDataset;
	Gv_objBindDs = oForm.object(objBDS).id;
	
	Gv_grdRow = nRow;
	Gv_grdColId =  Gv_objGrid.GetCellProp("Body",nCell, "ColId");
	
	var str_val = oForm.object(Gv_objBindDs).GetColumn(nRow, Gv_grdColId);
	
	if(length(str_val) == 0){
		str_val = today();
	}
	
	var arr_val =  Gv_objGrid.GetCellRect(nRow,nCell);	
	var div_x = oForm.ClientToScreenX(objGrd, arr_val[0]);
	var div_y = oForm.ClientToScreenY(objGrd, arr_val[1]);
	var div_w = arr_val[2] - arr_val[0];
	var div_h = arr_val[3] - arr_val[1];
	
	if(gfn_IsPopDivCalendarM(objGrd) == false){ 
		Gv_rtnDate = str_val;
		Gv_CalendarPopDivX = div_x ;
		Gv_CalendarPopDivY = div_y;
		Gv_CalendarPopDivW = div_w;
		Gv_CalendarPopDivH = div_h;
		Gv_CalendarPopRow = nRow;
		var oForm = objGrd.getForm();
		oForm.Create("PopupDiv", "PopDiv_CalendarM", "URL="+quote("comm::CalendarMonth.xml")
			         +' Border="Flat" BorderColor="#d0d0d0" Height="160" Width="180"');
		oForm.AddVariable("CHK_MAKE_CALENDAR2M", true);
	}else{
		if(length(str_val) > 0){
			var sYear = mid(str_val,0,4);
			var sMonth = mid(str_val,4,2);
			var sDay = mid(str_val,6,2);
		}	

		if(div_x < 0){
			div_x = 0;
		}
		
		var ret = oForm.PopDiv_CalendarM.TrackPopup(div_x, div_y,div_w,div_h);
		
		if(ret.length() > 0){
			Gv_rtnDate = ret;
			oForm.object(Gv_objBindDs).SetColumn(nRow, Gv_grdColId,ret);
		}
	}

	if ( Gv_rtnDFlag ) return Gv_rtnDate;
	else return;
}		


function gfn_IsPopDivCalendarM(obj)
{
	var oForm = obj.getForm();
	if(oForm.IsExistVar("CHK_MAKE_CALENDAR2M"))
	{
		return true;
	}
	else{
        return false;
	}
}


/**
*	1. 함수명   : gfn_OnUserPopup
*	2. 파라미터 : obj
*		 	      strText
*		 	      ,nX
*		 	      nY
*	3. 함수설명 : 달력 호출
*   4. 리턴값   : 날짜 데이터
*   
*/ 
function gfn_OnUserPopup(obj,strText,nX,nY)
{

	var oForm = obj.GetForm();
	if(length(strText) > 0){
		var sYear  = mid(strText,0,4);
		var sMonth = mid(strText,4,2);
		var sDay   = mid(strText,6,2);
		oForm.PopDiv_Calendar.Show_cal(sYear,sMonth,sDay,true, obj);	
	}else{
		oForm.PopDiv_Calendar.Show_cal("0","0","0",true, obj);		
	}
	
	nX = oForm.ClientToScreenX(obj, 0);
	nY = oForm.ClientToScreenY(obj, 0);

	var ret;
	if ( nX < 0 ) nX = 0;
	
	ret = oForm.PopDiv_Calendar.TrackPopup(nX, nY, obj.Width, obj.Height);
	
	return ret;

}


/**
*	1. 함수명   : gfn_FormLoadEventProc
*	2. 파라미터 : obj
*	3. 함수설명 : 
*   4. 리턴값   : 
*   
*/ 
function gfn_FormLoadEventProc(obj)
{
	for(var i = 0 ; i < obj.Components.Count ; i++)
	{
		if ((obj.Components[i].GetType() == "Dataset") ||
			(obj.Components[i].GetType() == "File") ||	
			(obj.Components[i].GetType() == "FileDialog") ||	
			(obj.Components[i].GetType() == "PopupDiv") 
		   )	
			continue;
		
		gfn_EventLink(obj.Components[i]);
		
		if(obj.Components[i].IsComposite()){
			Gfn_SubFormEventProc(obj.Components[i]);
		}
	}
}


function Gfn_SubFormEventProc(obj)
{
	for(var i = 0 ; i < obj.Components.Count ; i++)
	{
		if((obj.Components[i].GetType() == "Dataset") ||
		   (obj.Components[i].GetType() == "File") ||	
		   (obj.Components[i].GetType() == "FileDialog") ||	
		   (obj.Components[i].GetType() == "PopupDiv") 
		   )
			continue;
			
		gfn_EventLink(obj.Components[i]);
		if(obj.Components[i].IsComposite()){
			Gfn_SubFormEventProc(obj.Components[i]);
		}
	}
}


function gfn_EventLink(obj)
{
	switch(toUpper(obj.GetType()))
	{
		case "CALENDAR2" :
		case "CALENDAREX" :
		case "CALENDAREX2" :
			
		if(obj.UseUserEvent == true)
		{
			if(gfn_IsPopDivCalendar(obj) == false)
			{
				Go_Calendar = null;
				Gv_CalendarPopRow = -1;
				gfn_CreatePopDivCalendar(obj);
			}
		}
		obj.OnUserPopup = "gfn_OnUserPopup";
		break;
	}
}


/**
*	1. 함수명   : gfn_Calendar
*	2. 파라미터 : obj   - 버튼 객체
*	              nX    - X 좌료
*	              nY    - Y 좌표
*	              strGb - 날짜 타입 (D:일, M:월, W:주)
*	              posFg - 위치 플레그
*	3. 함수설명 : 날짜나 월을 입력할 때 알맞는 화면을 표시한다.
*   4. 리턴값   : 없음
*    
*/
function gfn_Calendar(obj,nX,nY,strGb,strDate,posFg)
{
	var strUrl;
	var objCal;
	
	switch(strGb)
	{
		case "W" :
			strUrl =  "Templet::fm_Cal_Week.xml";
			Create("PopupDiv", "PopDiv_CalendarW", 'Border="None" Color="white" Height="196" Width="179"');
			objCal = PopDiv_CalendarW;
			break;
		case "WAB" :
			strUrl =  "Templet::fm_Cal_WeekAB.xml";
			Create("PopupDiv", "PopDiv_CalendarWAB", 'Border="None" Color="white" Height="196" Width="179"');
			objCal = PopDiv_CalendarWAB;
			break;			
		case "D" :
			strUrl =  "Templet::fm_Cal_Day.xml";
			Create("PopupDiv", "PopDiv_CalendarD", 'Border="None" Color="white" Height="196" Width="179"');
			objCal = PopDiv_CalendarD;
			break;
		case "M" :
			strUrl =  "Templet::fm_cal_Month.xml";
			Create("PopupDiv", "PopDiv_CalendarM", 'Border="None" Color="white" Height="168" Width="179"');
			objCal = PopDiv_CalendarM;
			break;
		case "Q" :
			strUrl =  "Templet::fm_Cal_Quarter.xml";
			Create("PopupDiv", "PopDiv_CalendarQ", 'Border="None" Color="white" Height="91" Width="179"');
			objCal = PopDiv_CalendarQ;
			break;
		case "H" :
			strUrl =  "Templet::fm_Cal_HalfYear.xml";
			Create("PopupDiv", "PopDiv_CalendarH", 'Border="None" Color="white" Height="91" Width="179"');
			objCal = PopDiv_CalendarH;
			break;
		default:
	}
	
	objCal.Url = strUrl;
	
	gfv_CalendarDateFg = strGb;
	gfv_CalendarValue  = strDate;
	
	if(posFg != true){
		nX = ClientToScreenX(obj,nX);
		nY = ClientToScreenY(obj,nY);
	}
	
	var rtn = objCal.TrackPopup(nX,nY);

	Destroy(objCal.id);
	return rtn;
}

/**
*	1. 함수명   : gfn_info_message
*	2. 파라미터 : p_message  - 전달 메시지
*	              p_title    - 팝업창 타이블 
*	3. 함수설명 : 업무별 페이지 안내
*   4. 리턴값   : 없음
*    
*/
function gfn_info_message(p_message, p_title,urlObj)
{
	urlObj.Url = "";
	urlObj.UserData = "";
	
	urlObj.Url = "COMMON::CMC20T01.xml";
	urlObj.UserData = p_message + "|" + p_title;
}

/**
*	1. 함수명   : gfn_popup_message
*	2. 파라미터 : p_modal_yn - 모달 구분
*	              p_type     - 팝업창 타입 - info, error, confirm
*	              p_message  - 전달 메시지
*	              p_title    - 팝업창 타이블 (기재하지 않으면 디폴트로 정보, 확인, 에러 메시지로 표시)
*	3. 함수설명 : 정보, 확인, 에러 팝업창을 띄운다.
*   4. 리턴값   : 없음
*    
*/
function gfn_Popup_Message(p_modal_yn, p_type, p_message, p_title)
{
	// 화면 스타일
	var strOpenStyle = "Title=false AutoSize=false Scroll=false Resize=false";
	
	// 팝업 크기    
	var arrSize;
	
	var url = "COMM::POPUP_MESSAGE.xml";
	var p_params = "p_type="+p_type+" p_message="+quote(p_message)+" p_title="+quote(p_title);

	
	// Modal/Modaless 구분
	if(toUpper(p_modal_yn) == "MODALESS"){
	    
		return Open(url, p_params, "400", "260", strOpenStyle, "-1", "-1");
		
	}else if(toUpper(p_modal_yn) == "MODAL" || toUpper(p_modal_yn) == ""){
	
		return Dialog(url, p_params, "400", "260", strOpenStyle,  "-1", "-1");
		
	}
}
	

/**
*	1. 함수명   : gfn_error_message
*	2. 파라미터 : p_message  - 전달 메시지
*	3. 함수설명 : 트랜잭션 에러 등의 에러 메시지를 위한 팝업화면 (콜백시에 콜백함수에서 errorMsg 등을 받아온다.)
*   4. 리턴값   : 없음
*    
*/
function gfn_Error_Message(p_message)
{
	gfn_popup_message("modal", "error", p_message, "Error Message");
}


/**
*	1. 함수명   : gfn_PopupGridView
*	2. 파라미터 : p_obj    -  
*                 p_url    -  
*                 p_row    -  
*                 p_cell   - 
*                 p_width  - 
*                 p_height - 
*	3. 함수설명 : 그리드 창에서 팝업화면을 불러 올 경우
*   4. 리턴값   : 없음
*    
*/
function gfn_PopupGridView(p_obj, p_url, p_row, p_cell, p_width, p_height)
{
	var tmpParam = "p_obj=" + p_obj +" p_nRow=" + p_row +" p_nCell=" + p_cell;
	gfn_CmnPopup(p_url, tmpParam, "MODAL", p_height+", "+p_width+", -1, -1");
}


/**
*	1. 함수명   : gfn_SetPopupGridDataForOnLoadCompleted
*	2. 파라미터 : p_objs -  그리드 객체
*                 p_Cell -  해당 컬럼
*                 p_Row  -  해당 로우
*	3. 함수설명 : 그리드 창에서 팝업화면을 불러 올 경우
*   4. 리턴값   : 없음
*    
*/
function gfn_SetPopupGridDataForOnLoadCompleted(p_objs, p_Cell, p_Row)
{
	Gv_objGrid   = parent.object(p_objs);
	var oForm    = parent.object(p_objs).getForm();
	var objBDs   = Gv_objGrid.BindDataset;
	
	Gv_objBindDs = oForm.object(objBDS).id;
	Gv_grdRow    = p_Row;
	Gv_grdColId  = Gv_objGrid.GetCellProp("Body", p_Cell, "ColId");
	
	// 부모폼의 해당 리스트의 값을 가져온다.
	var tmpParam = oForm.object(Gv_objBindDs).GetColumn(p_Row, Gv_grdColId, '');
	
	return tmpParam;
}



/**
*	1. 함수명   : gfn_SetPopupGridDataOne
*	2. 파라미터 : p_objs  -  그리드 객체
*                 p_Cell  -  해당 컬럼
*                 p_Row   -  해당 로우
*                 insData -  그리드에 입력될 값
*	3. 함수설명 : 부모창의 그리드에 값을 한 건만 보낼 경우
*   4. 리턴값   : 없음
*    
*/
function gfn_SetPopupGridDataOne(p_objs, p_Cell, p_Row, insData)
{
	Gv_objGrid   = parent.object(p_objs);
	var oForm    = parent.object(p_objs).getForm();
	var objBDs   = Gv_objGrid.BindDataset;
	
	Gv_objBindDs = oForm.object(objBDS).id;
	Gv_grdRow    = p_Row;
	Gv_grdColId  = Gv_objGrid.GetCellProp("Body", p_Cell, "ColId");
	
	// 그리드에 값을 넣어준다.
	oForm.object(Gv_objBindDs).SetColumn(p_Row, Gv_grdColId, insData);
}


/**
*	1. 함수명   : gfn_SetPopupGridDataMulti
*	2. 파라미터 : p_objs  -  그리드 객체
*                 p_Row1  -  부모창 그리드의 row 값
*                 p_Row2  -  현제항 그리드의 row 값
*                 dsObj   -  데이터셋 객체
*                 arrData -  값을 받을 부모창의 컬럼순서와 값을 보낼 현제창의 컬럼명의 배열 
*                            두 값을 콤마(,)와 슬러시(/)로 서로 매치시킨다. (예 - 3,code_type/5,code01/6,code02) 
*	3. 함수설명 : 부모창의 그리드에 값을 여러 건을 보낼 경우
*   4. 리턴값   : 없음
* 
*/
function gfn_SetPopupGridDataMulti(p_objs, p_Row1, p_Row2, dsObj, arrData)
{
	Gv_objGrid   = parent.object(p_objs);
	var oForm    = parent.object(p_objs).getForm();
	var objBDs   = Gv_objGrid.BindDataset;
	
	Gv_objBindDs = oForm.object(objBDS).id;
	Gv_grdRow    = p_Row1;

	var tmpArr1 = arrData.split("/");

	for(var i=0; i<tmpArr1.length; i++)
	{
		var tmpArr2 = tmpArr1[i].split(",");
		
		//trace("tmpArr2[0] : "+tmpArr2[0]+" / tmpArr2[1] : "+tmpArr2[1]);
		
		Gv_grdColId = Gv_objGrid.GetCellProp("Body", tmpArr2[0], "ColId");
		oForm.object(Gv_objBindDs).SetColumn(p_Row1, Gv_grdColId, dsObj.GetColumn(p_Row2,tmpArr2[1]));
	}
}


function gfn_Popup_ExcelForm(p_message)
{
	// 화면 스타일
	var strOpenStyle = "Title=true AutoSize=false Scroll=false Resize=false";
	
	// 팝업 크기    
	var arrSize;
	
	var url = "COMM::EXCEL_FORM.xml";
	var p_params = "p_message="+quote(p_message);

	
	return Dialog(url, p_params, "760", "152", strOpenStyle,  "-1", "-1");
}