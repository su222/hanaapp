var TEMP_PRE_FORMID;



/***************************************************************************************************
 * gfn_OpenWindowByFormId �ش� ���α׷��� Ȱ��ȭ
 *
 * @param formId		��ID
***************************************************************************************************/

function gfn_OpenWindowByFormId(formId)
{
	var oForms = global.AllWindows[formId];
	if(oForms != null)
	{
		oForms[0].SetFocus();
		if(TEMP_PRE_FORMID != formId){
			gfn_commMsg("", "");	//ȭ�� �ٲ𶧸��� �޼��� �ʱ�ȭ	
		}
	}
	TEMP_PRE_FORMID = formId;
}


/***************************************************************************************************
 * gfn_CloseWindowByFormId �ش� ���α׷���  ����
 *
 * @param formId		��ID
***************************************************************************************************/
function gfn_CloseWindowByFormId(formId)
{
	var oForms = global.AllWindows[formId];
	if(oForms != null)
	{
		// ���� �����ϰ� �ݱ�
		oForms[0].Close();
		if(TEMP_PRE_FORMID == formId){
			//gfn_commMsg("", "");	//ȭ�� �ٲ𶧸��� �޼��� �ʱ�ȭ	
		}		
	}
}


/***************************************************************************************************
 * gfn_FormOpenChk ���� ���α׷����� üũ
 *
 * @param sUrl		������ �� Url
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
 * �˾� �Ǵ� ��ȭ�� ȣ���ϴ� �Լ�
 * ��ġ �� ũ�Ⱑ ������ Modal Dialog�� ��쵵�� �Ǿ��ִ�.
 *
 * @param  obj			�� object
 * @param  pUrl			��û�� URL
 * @param  param		�Ķ����
 * @param  [pModalFg]	â�� Modal�� ����� ����(Default: true)
 * @param  [pOpt] 		���� ��Ÿ�� (Default : title=true status=false)
 * @param  [pLeft] 		Screen ������ â ���� ��ǥ
 * @param  [pTop]		Screen ������ â ���� ��ǥ
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
 * �˾� �Ǵ� ��ȭ�� ȣ���ϴ� �Լ�
 * ��ġ �� ũ�Ⱑ ������ Modal Dialog�� ��쵵�� �Ǿ��ִ�.
 *
 * @param  obj			�� object
 * @param  pUrl			��û�� URL
 * @param  param		�Ķ����
 * @param  [pModalFg]	â�� Modal�� ����� ����(Default: true)
 * @param  [pOpt] 		���� ��Ÿ�� (Default : title=true status=false)
 * @param  [pLeft] 		Screen ������ â ���� ��ǥ
 * @param  [pTop]		Screen ������ â ���� ��ǥ
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
*	1. �Լ���   : gfn_GetZipCodeInfo
*	2. �Ķ���� : tZip1    - �����ȣ �չ�ȣ
*	              tZip2    - �����ȣ �޹�ȣ
*	              tAddress - �ּ�
*	3. �Լ����� : �� �Ǵ� ������� �����ȣ �� ���̻� ������ ��ȸ�Ѵ�.
*   4. ���ϰ�   : ���� ��ȣ �� �ּ�
*    
*/
function gfn_GetZipCodeInfo(tZip1, tZip2, tAddress)
{
	var tParam = "Zip1='" + tZip1 + "' Zip2='" + tzip2 + "' Address='" + tAddress;
    gfn_CmnPopup("TestView::zipcode.xml", tParam, "modaless", "400, 445, -1, -1");	// zipcode.xml�� �ӽð��̴�.
}

/**
*	1. �Լ���   : gfn_CmnPopup 
*	2. �Ķ���� : p_url      - �˾��ּ�
*	              p_params   - �Ķ���Ͱ�
*	              p_modal_yn - modal ���� (modal�� ��쿡�� �˾�â�� �ݱ� ������ �θ�â�� ������ ��ĥ �� ����.)
*	              p_size     - �˾�â ũ��
*	3. �Լ����� : �˾�â�� ���� �Լ�
*   4. ���ϰ�   : ����
*    
*/
function gfn_CmnPopup(p_url, p_params, p_modal_yn, p_size)
{
	// ȭ�� ��Ÿ��
	var strOpenStyle = "Title=true AutoSize=false Scroll=true Resize=true";
	
	// �˾� ũ��    
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
	
	// Modal/Modaless ����
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
*	1. �Լ���   : gfn_SetCalendarDate
*	2. �Ķ���� : obj        - ��ư ��ü
*	              calType    - ��¥ Ÿ�� (D:��, M:��, W:��)
*	              maskObject - ���õ� ��¥�� �Է��ϴ� â ��ü
*	3. �Լ����� : ��¥�� ���� �Է��� �� ���̴� �Լ�
*   4. ���ϰ�   : ��¥�� ��
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
*	1. �Լ���   : gfn_PopupGridCalendar
*	2. �Ķ���� : objGrd
*		 	      nRow
*		 	      nCell
*		 	      chkFlg
*	3. �Լ����� : �޷� ȣ��
*   4. ���ϰ�   : ��¥ ������
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
*	1. �Լ���   : gfn_PopupGridCalendarM
*	2. �Ķ���� : objGrd
*		 	      nRow
*		 	      nCell
*		 	      chkFlg
*	3. �Լ����� : �޷� ȣ��
*   4. ���ϰ�   : ��¥ ������
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
*	1. �Լ���   : gfn_OnUserPopup
*	2. �Ķ���� : obj
*		 	      strText
*		 	      ,nX
*		 	      nY
*	3. �Լ����� : �޷� ȣ��
*   4. ���ϰ�   : ��¥ ������
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
*	1. �Լ���   : gfn_FormLoadEventProc
*	2. �Ķ���� : obj
*	3. �Լ����� : 
*   4. ���ϰ�   : 
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
*	1. �Լ���   : gfn_Calendar
*	2. �Ķ���� : obj   - ��ư ��ü
*	              nX    - X �·�
*	              nY    - Y ��ǥ
*	              strGb - ��¥ Ÿ�� (D:��, M:��, W:��)
*	              posFg - ��ġ �÷���
*	3. �Լ����� : ��¥�� ���� �Է��� �� �˸´� ȭ���� ǥ���Ѵ�.
*   4. ���ϰ�   : ����
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
*	1. �Լ���   : gfn_info_message
*	2. �Ķ���� : p_message  - ���� �޽���
*	              p_title    - �˾�â Ÿ�̺� 
*	3. �Լ����� : ������ ������ �ȳ�
*   4. ���ϰ�   : ����
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
*	1. �Լ���   : gfn_popup_message
*	2. �Ķ���� : p_modal_yn - ��� ����
*	              p_type     - �˾�â Ÿ�� - info, error, confirm
*	              p_message  - ���� �޽���
*	              p_title    - �˾�â Ÿ�̺� (�������� ������ ����Ʈ�� ����, Ȯ��, ���� �޽����� ǥ��)
*	3. �Լ����� : ����, Ȯ��, ���� �˾�â�� ����.
*   4. ���ϰ�   : ����
*    
*/
function gfn_Popup_Message(p_modal_yn, p_type, p_message, p_title)
{
	// ȭ�� ��Ÿ��
	var strOpenStyle = "Title=false AutoSize=false Scroll=false Resize=false";
	
	// �˾� ũ��    
	var arrSize;
	
	var url = "COMM::POPUP_MESSAGE.xml";
	var p_params = "p_type="+p_type+" p_message="+quote(p_message)+" p_title="+quote(p_title);

	
	// Modal/Modaless ����
	if(toUpper(p_modal_yn) == "MODALESS"){
	    
		return Open(url, p_params, "400", "260", strOpenStyle, "-1", "-1");
		
	}else if(toUpper(p_modal_yn) == "MODAL" || toUpper(p_modal_yn) == ""){
	
		return Dialog(url, p_params, "400", "260", strOpenStyle,  "-1", "-1");
		
	}
}
	

/**
*	1. �Լ���   : gfn_error_message
*	2. �Ķ���� : p_message  - ���� �޽���
*	3. �Լ����� : Ʈ����� ���� ���� ���� �޽����� ���� �˾�ȭ�� (�ݹ�ÿ� �ݹ��Լ����� errorMsg ���� �޾ƿ´�.)
*   4. ���ϰ�   : ����
*    
*/
function gfn_Error_Message(p_message)
{
	gfn_popup_message("modal", "error", p_message, "Error Message");
}


/**
*	1. �Լ���   : gfn_PopupGridView
*	2. �Ķ���� : p_obj    -  
*                 p_url    -  
*                 p_row    -  
*                 p_cell   - 
*                 p_width  - 
*                 p_height - 
*	3. �Լ����� : �׸��� â���� �˾�ȭ���� �ҷ� �� ���
*   4. ���ϰ�   : ����
*    
*/
function gfn_PopupGridView(p_obj, p_url, p_row, p_cell, p_width, p_height)
{
	var tmpParam = "p_obj=" + p_obj +" p_nRow=" + p_row +" p_nCell=" + p_cell;
	gfn_CmnPopup(p_url, tmpParam, "MODAL", p_height+", "+p_width+", -1, -1");
}


/**
*	1. �Լ���   : gfn_SetPopupGridDataForOnLoadCompleted
*	2. �Ķ���� : p_objs -  �׸��� ��ü
*                 p_Cell -  �ش� �÷�
*                 p_Row  -  �ش� �ο�
*	3. �Լ����� : �׸��� â���� �˾�ȭ���� �ҷ� �� ���
*   4. ���ϰ�   : ����
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
	
	// �θ����� �ش� ����Ʈ�� ���� �����´�.
	var tmpParam = oForm.object(Gv_objBindDs).GetColumn(p_Row, Gv_grdColId, '');
	
	return tmpParam;
}



/**
*	1. �Լ���   : gfn_SetPopupGridDataOne
*	2. �Ķ���� : p_objs  -  �׸��� ��ü
*                 p_Cell  -  �ش� �÷�
*                 p_Row   -  �ش� �ο�
*                 insData -  �׸��忡 �Էµ� ��
*	3. �Լ����� : �θ�â�� �׸��忡 ���� �� �Ǹ� ���� ���
*   4. ���ϰ�   : ����
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
	
	// �׸��忡 ���� �־��ش�.
	oForm.object(Gv_objBindDs).SetColumn(p_Row, Gv_grdColId, insData);
}


/**
*	1. �Լ���   : gfn_SetPopupGridDataMulti
*	2. �Ķ���� : p_objs  -  �׸��� ��ü
*                 p_Row1  -  �θ�â �׸����� row ��
*                 p_Row2  -  ������ �׸����� row ��
*                 dsObj   -  �����ͼ� ��ü
*                 arrData -  ���� ���� �θ�â�� �÷������� ���� ���� ����â�� �÷����� �迭 
*                            �� ���� �޸�(,)�� ������(/)�� ���� ��ġ��Ų��. (�� - 3,code_type/5,code01/6,code02) 
*	3. �Լ����� : �θ�â�� �׸��忡 ���� ���� ���� ���� ���
*   4. ���ϰ�   : ����
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
	// ȭ�� ��Ÿ��
	var strOpenStyle = "Title=true AutoSize=false Scroll=false Resize=false";
	
	// �˾� ũ��    
	var arrSize;
	
	var url = "COMM::EXCEL_FORM.xml";
	var p_params = "p_message="+quote(p_message);

	
	return Dialog(url, p_params, "760", "152", strOpenStyle,  "-1", "-1");
}