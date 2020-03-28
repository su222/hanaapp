//var COMM_X = 995;	//기준이 되는 WorkArea 가로 픽셀
//var COMM_Y = 574;	//기준이 되는 WorkArea 세로 픽셀
//var FORM_X = 955;	//Div안에 표현되는 폼영역
//var FORM_Y = 514;	//Div안에 표현되는 폼영역

var COMM_X = 1280;	//기준이 되는 WorkArea 가로 픽셀
var COMM_Y = 1024;	//기준이 되는 WorkArea 세로 픽셀
var FORM_X = 900;	//Div안에 표현되는 폼영역
var FORM_Y = 500;	//Div안에 표현되는 폼영역

//var COMM_X = 0;	//기준이 되는 WorkArea 가로 픽셀
//var COMM_Y = 0;	//기준이 되는 WorkArea 세로 픽셀
//var FORM_X = 0;	//Div안에 표현되는 폼영역
//var FORM_Y = 0;	//Div안에 표현되는 폼영역


// 콤보버튼의 기본값
var COMBO_SEL = "--선택--";
var COMBO_ALL = "전체";
var COMBO_BLANK = " ";






/***************************************************************************************************
 * 공통버튼 조정 
 *
 * @param  
 * @param   
 * @return  none
***************************************************************************************************/
function gfn_set_cbutton(strObj)
{
	
	gds_function.ClearData();
	
	
	var arrBtn = split(strObj, " ");
	var arrFun;
	
	for(var i=0; i<arrBtn.length; i++)
	{
		arrFun = split(arrBtn[i], ":");
		
		gds_function.AddRow();
		
		gds_function.SetColumn(i, "BTN_ID", (1000 + i));
		gds_function.SetColumn(i, "BTN_NM", arrFun[0]);
		gds_function.SetColumn(i, "EVENT_NM", arrFun[1]);
	}
	
	parent.fn_commBtnAdd();	
}



//*------------------------------------------------------------------------------------------------
//* 함수설명     : 회사기본정보 
//* 함수유형     : 
//* parameter    : 
//* return value : 없음
//* 비고         :
//*-----------------------------------------------------------------------------------------------
function fn_brch_info()
{

	GDS_BRCH_BAS.ClearData();
	
	
	svcID			= "COMM.selectBrchInfo";
	url   			= "service::common/select_mi.do";
	inDatasets  	= "";
	outDatasets 	= "GDS_BRCH_BAS=cc.CCBrchDAO.selectBrchOne"
							;	

	argument    	= " _sqlName=cc.CCBrchDAO.selectBrchOne"
							+ " S_BRCH_ID=" + quote(GDS_USER_INFO.BRCH_ID);
												
	
	callbackFunc 	= "gfn_callback";

	gfn_showProgressWindow(true);
	gfn_Transaction(svcID, url, inDatasets, outDatasets, argument, callbackFunc);	 	
	

}



//*------------------------------------------------------------------------------------------------
//* 함수설명     : 바코드 정보  
//* 함수유형     : 
//* parameter    : 
//* return value : 없음
//* 비고         :
//*-----------------------------------------------------------------------------------------------
function gfn_barcode_info()
{

	GDS_BARCODE.ClearData();
	
	
	svcID			= "COMM.selectBarCode";
	url   			= "service::common/select_mi.do";
	inDatasets  	= "";
	outDatasets 	= "GDS_BARCODE=ac.ACAffairDAO.selectBarCode"
							;	

	argument    	= " _sqlName=ac.ACAffairDAO.selectBarCode"
							;
												
	
	callbackFunc 	= "gfn_common_callback";

	gfn_showProgressWindow(true);
	gfn_SyncTransaction(svcID, url, inDatasets, outDatasets, argument, callbackFunc);	 	
	
	return GDS_BARCODE.GetColumn(0,"BAR_CODE");
}


//*------------------------------------------------------------------------------------------------
//* 함수설명     : 오라클에서 계산하는 날짜 함수  
//* 함수유형     : 
//* parameter    :  strDateType: TODAY, FIRSTDAY, LASTDAY
//*                 intCount: 더할날짜
//*                 dateFormat: 오라클 포맷


//* return value : 없음
//* 비고         :
//*-----------------------------------------------------------------------------------------------
function gfn_get_date(strDateType, intCount, dateFormat)
{

	
	svcID			= "COMM.selectDateType";
	url   			= "service::common/select_mi.do";
	inDatasets  	= "";
	outDatasets 	= "GDS_DATE_TYPE=cc.CCCommonDAO.selectDateVal";
	argument    	= " _sqlName=cc.CCCommonDAO.selectDateVal"
					+ " DATE_TYPE=" + quote(strDateType)		
					+ " CNT=" + quote(intCount)
					+ " DATE_FORMAT=" + quote(dateFormat)
					;
	
	callbackFunc 	= "fn_date_callback";

	gfn_SyncTransaction(svcID, url, inDatasets, outDatasets, argument, callbackFunc);	 
		
}




//*------------------------------------------------------------------------------------------------
//* 함수설명     : PICOSPEC 조회 함수 
//* 함수유형     : 
//* parameter    : 
//* return value : 없음
//* 비고         :
//*-----------------------------------------------------------------------------------------------
function gfn_get_picospec(COM_ID, BRCH_ID)
{
	
	svcID			= "COMM.selectPicoSpec";
	url   			= "service::common/select_mi.do";
	inDatasets  	= "";
	outDatasets 	= "GDS_PICOSPEC_BAS=id.IDPicoSpecDAO.selectPicoSpecInfo";
	argument    	= " _sqlName=id.IDPicoSpecDAO.selectPicoSpecInfo"
					+ " COM_ID=" + quote(COM_ID)		
					+ " BRCH_ID=" + quote(BRCH_ID)
					;
	
	callbackFunc 	= "fn_auth_callback";

	gfn_SyncTransaction(svcID, url, inDatasets, outDatasets, argument, callbackFunc);	 
		
}


//*------------------------------------------------------------------------------------------------
//* 함수설명     : 관리시기 적용유무 체크 함수
//* 함수유형     : 
//* parameter    : 
//* return value : 없음
//* 비고         :
//*-----------------------------------------------------------------------------------------------
function gfn_get_calc_gbn(COM_ID, BRCH_ID)
{
	
	// GDS_PICOSPEC_BAS 에 넣기 
	gfn_get_picospec(COM_ID, BRCH_ID);
	
	return GDS_PICOSPEC_BAS.GetColumn(0,"CALC_GBN");
}



/***************************************************************************************************
 * 사용자 권한 가져오기  
 *

***************************************************************************************************/
function gfn_user_auth(brch_id, usr_id)
{
	svcID			= "AUTH.searchUsrPms";
	url   			= "service::common/select_mi.do";
	inDatasets  	= "";
	outDatasets 	= "GDS_USER_PMS=cc.CCUserDAO.searchUsrPms";
	argument    	= " _sqlName=cc.CCUserDAO.searchUsrPms"
					+ " S_BRCH_ID=" + quote(brch_id)		
					+ " S_USR_ID=" + quote(usr_id);
							
	
	callbackFunc 	= "fn_auth_callback";

	gfn_SyncTransaction(svcID, url, inDatasets, outDatasets, argument, callbackFunc);	
	
	return GDS_USER_PMS.GetColumn(0,"PMS_GBN");

}



/***************************************************************************************************
 * 사용가능한 회사 체크 
 *
 * @param  FORM_ID  메뉴ID
 * @param  sel_flag  S: 단일지사선택, M: 여러지사선택 
 * @return  none
***************************************************************************************************/
function gfn_cmpny_auth(FORM_ID, sel_flag)
{
	svcID			= "AUTH.searchCmpnyList";
	url   			= "service::common/select_mi.do";
	inDatasets  	= "";
	outDatasets 	= "GDS_AUTH_LST=cc.CCAuthDAO.selectAuthCmpnyLst";
	argument    	= " _sqlName=cc.CCAuthDAO.selectAuthCmpnyLst"
					+ " USR_ID=" + quote(GDS_USER_INFO.USR_ID)		
					+ " FORM_ID=" + quote(FORM_ID)	
					+ " AUTH_USE=" + quote(gds_system.BRCH_AUTH_USE);
							
	
	callbackFunc 	= "fn_auth_callback";

	gfn_SyncTransaction(svcID, url, inDatasets, outDatasets, argument, callbackFunc);	
	
	// 현재 선택된 회사의  loop를 돌면서 권한이 없다면 뺀다. 
	for(var i = GDS_CMPNY_BAS.rowcount; i >= 0; i--)
	{
		if(gds_auth_list.FindRow("MNG_COM_ID",GDS_CMPNY_BAS.GetColumn(i,"COM_ID")) < 0)
		{
			GDS_CMPNY_BAS.DeleteRow(i);
		}
	}
	
	// 만약 단일선택인데 멀티행이 있다면 전부다 CLEAR한다.
	// 왜냐면 어느 회사를 선택해야 될지 모르기 때문이다.
	if(sel_flag == "S" && GDS_CMPNY_BAS.rowcount > 1)
	{
		GDS_CMPNY_BAS.ClearData();
	}
}

/***************************************************************************************************
 * 사용가능한 지사 체크 
 *
 * @param  FORM_ID  메뉴ID
 * @param  sel_flag  S: 단일지사선택, M: 여러지사선택 
 * @return  none
***************************************************************************************************/
function gfn_brch_auth(FORM_ID, sel_flag)
{

	GDS_AUTH_LST.ClearData();
	
	
	svcID			= "AUTH.selectAuthBrchLst";
	url   			= "service::common/select_mi.do";
	inDatasets  	= "";
	outDatasets 	= "GDS_AUTH_LST=cc.CCAuthDAO.selectAuthBrchLst";
	argument    	= " _sqlName=cc.CCAuthDAO.selectAuthBrchLst"
					+ " USR_ID=" + quote(GDS_USER_INFO.USR_ID)		
					+ " FORM_ID=" + quote(FORM_ID)	
					+ " AUTH_USE=" + quote(gds_system.BRCH_AUTH_USE);
							
	
	callbackFunc 	= "fn_auth_callback";

	gfn_SyncTransaction(svcID, url, inDatasets, outDatasets, argument, callbackFunc);	 
	
	// 현재 선택된 지사의  loop를 돌면서 권한이 없다면 뺀다. 
	for(var i = GDS_BRCH_BAS.rowcount; i >= 0; i--)
	{
		if(GDS_AUTH_LST.FindRow("MNG_BRCH_ID",GDS_BRCH_BAS.GetColumn(i,"BRCH_ID")) < 0)
		{
			GDS_BRCH_BAS.DeleteRow(i);
		}
	}
	
	// 만약 단일선택인데 멀티행이 있다면 전부다 CLEAR한다.
	// 왜냐면 어느 회사를 선택해야 될지 모르기 때문이다.
	if(sel_flag == "S" && GDS_BRCH_BAS.rowcount > 1)
	{
		GDS_BRCH_BAS.ClearData();
	}

}


/***************************************************************************************************
 * 사용가능한 지사 콤보 만들기 
 *
 * @param  pCombo  콤보ID
 * @param  FORM_ID  메뉴ID
 * @param  sel_flag  S: 단일지사선택, M: 여러지사선택 
 * @return  none
***************************************************************************************************/
function gfn_brch_auth_combo(pCombo, FORM_ID, sel_flag, pValue, pFirstSel)
{

	GDS_AUTH_LST.ClearData();
	
	
	svcID			= "AUTH.selectAuthBrchLst";
	url   			= "service::common/select_mi.do";
	inDatasets  	= "";
	outDatasets 	= "GDS_AUTH_LST=cc.CCAuthDAO.selectAuthBrchCombo";
	argument    	= " _sqlName=cc.CCAuthDAO.selectAuthBrchCombo"
					+ " USR_ID=" + quote(GDS_USER_INFO.USR_ID)		
					+ " FORM_ID=" + quote(FORM_ID)	
					+ " AUTH_USE=" + quote(gds_system.BRCH_AUTH_USE);
							
	
	callbackFunc 	= "fn_auth_callback";

	gfn_SyncTransaction(svcID, url, inDatasets, outDatasets, argument, callbackFunc);	
	 
	pCombo.InnerDataset = "GDS_AUTH_LST";
	
	pCombo.CodeColumn="MNG_BRCH_ID";
	pCombo.DataColumn="MNG_BRCH_NM";	

	
	// 기본값이 있으면 추가 
	if(length(pFirstSel) > 0){
		GDS_AUTH_LST.InsertRow(0);
		GDS_AUTH_LST.SetColumn(0, "MNG_BRCH_ID", "");
		GDS_AUTH_LST.SetColumn(0, "MNG_BRCH_NM", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// 선택값이 있으면 선택 아니면 첫째행
	if(pValue != ""){
		
		pCombo.Value = pValue;
	}	
	else{
		pCombo.index = 0;
	}
		
	// 글로벌 데이터셋이 1개이면 그것을 선택한다.
	if(GDS_BRCH_BAS.rowcount == 1)
	{
		pCombo.Value = GDS_BRCH_BAS.GetColumn(GDS_BRCH_BAS.currow,"BRCH_ID");
	}
		
}






/***************************************************************************************************
 * 공통코드 콤보용 Dataset을 생성
 *
 * @param  pCombo  Combo 컴포넌트
 * @param  pComCd  공통코드
 * @param  [pFirstSel] 첫항목으로 들어갈 값을 설정
 *         'COMBO_ALL': 전체 
 *         'COMBO_SEL' :선택하세요
 * @param  pDsName 생성될 DataSet이름
 * @return  none
***************************************************************************************************/





// TFramework에서 사용하는 공통변수 
var logTrace;
var resultCode;
var resultMessage;
var popupyn;
var naviyn;
var FnOnSize;

/***************************************************************************************************
 * DataSet의 특정 컬럼을 배열로 만들어주는 함수
 *
 * @param  pDataSet			DataSet
 * @param  pColid			column id
***************************************************************************************************/
function gfn_getDSArray(pDataSet, pColid)
{
	if(pDataSet == null) return null;
	
	var arrVal = Array();
	
	for(var i=0;i<pDataSet.rowcount;i++)
	{
		arrVal[i] = pDataSet.GetColumn(i,pColid);
	}
	
	return arrVal;
}

/***************************************************************************************************
 * DataSet의 특정 컬럼을 문자열로 만들어주는 함수
 *
 * @param  pDataSet			DataSet
 * @param  pColid			column id
 * @param  pJoinStr			연결문자 
***************************************************************************************************/
function gfn_getDSString(pDataSet, pColid, pJoinStr)
{
	if(pDataSet == null) return null;
	
	var strVal = "";
	
	for(var i=0;i<pDataSet.rowcount;i++)
	{
		if(strVal == "")
		{
			strVal = pDataSet.GetColumn(i,pColid);
		}
		else
		{
			strVal = strVal + (pJoinStr + pDataSet.GetColumn(i,pColid));
		}
		
	}
	
	return strVal;
}



/***************************************************************************************************
 * Excel로 저장하는 함수 
 *
 * @param  pGrid			Grid
***************************************************************************************************/
function gfn_exportExcel(pGrid, pExcelName)
{
	pGrid.ExportExcelEx(pExcelName);
}


/***************************************************************************************************
 * 저장시의 필수 입력조건 컨포넌트 UserData = '필수입력명' 으로 체크한다.
***************************************************************************************************/
function gfn_requiredFieldCheck(obj, pMessage) 
{

	if(obj == null) return false;
	
	if(length(obj.Value) == 0)
	{
		var rtn = gfn_popup_message("modal", "error", "필수항목을 입력하십시요", "확인");
		obj.setFocus();
		return false;
	}
	return true;
}




/***************************************************************************************************
 * 공통 callback
 *
 * @param  none
 * @return  none
***************************************************************************************************/
function gfn_callback(svcID, errorCode, errorMsg)
{
	gfn_showProgressWindow(false);

//	alert(svcID+','+errorCode+','+errorMsg +','+resultCode+','+resultMessage);

	
//	alert(resultCode);


	// 정상일경우
	if( resultCode == 0 ) 
	{
		fn_callback(svcID, errorCode, errorMsg);
	}
	else 
	{
		gfn_popup_message("modal", "error", resultMessage, "오류/경고");	// 오류팝업
		
		fn_callback(svcID, '-1', resultMessage);
	}
}


/***************************************************************************************************
 * gfn_dsToString : dataset을 string으로 변환해서 넘김 
 * @param pDataSet		dataset
 * @return  string
***************************************************************************************************/
function gfn_dsToString(pDataSet)
{		
	var col_header = "";
	var col_body = "";
	
	for(var i=0;i<pDataSet.rowcount;i++){
		for(var j=0;j<pDataSet.colcount;j++){
			
			if(i == 0) {
				col_header += pDataSet.GetColID(j) + ",";
			}
			
			col_body += pDataSet.GetColumn(i,pDataSet.GetColID(j)) + ",";
		}
		
		col_body += "\n";
			
	}
	
	return (col_header + "\n" + col_body);	
}



/***************************************************************************************************
 * gfn_Transaction : 공통 Transaction 함수 
 * @param pSvcID		서비스 ID
 * @param pURL			URL
 * @param pInDs			input Dataset
 * @param pOutDs		Output Dataset
 * @param pArg			파라메터
 * @param [pCallBack]		콜백함수
***************************************************************************************************/
function gfn_Transaction(pSvcID, pURL, pInDs, pOutDs, param, pCallBack)
{		
	Transaction(pSvcID, pURL, pInDs, pOutDs, param, pCallBack);
}

/***************************************************************************************************
 * gfn_Transaction : 공통 Sync Transaction 함수 
 * @param pSvcID		서비스 ID
 * @param pURL			URL
 * @param pInDs			input Dataset
 * @param pOutDs		Output Dataset
 * @param pArg			파라메터
 * @param [pCallBack]		콜백함수
***************************************************************************************************/
function gfn_SyncTransaction(pSvcID, pURL, pInDs, pOutDs, param, pCallBack)
{		
	Http.Sync = true;
	Transaction(pSvcID, pURL, pInDs, pOutDs, param, pCallBack);
	Http.Sync = false;
}


/***************************************************************************************************
 * global 공통코드 값이 없으면 채워넣기 
 *
 * @param  
 * @return  none
***************************************************************************************************/
function gfn_initCodeDataSet(){

	gfn_fillCodeDataSet();

}
/***************************************************************************************************
 * insa global 공통코드 값이 없으면 채워넣기 
 *
 * @param  
 * @return  none
***************************************************************************************************/
function gfn_insa_initCodeDataSet(){

	gfn_insafillCodeDataSet();

}

/***************************************************************************************************
 * global dataset의 값을 채워넣기 
 *
 * @param  pCombo  Combo 컴포넌트
 * @param  pComCd  공통코드
 * @param  [pFirstSel] 첫항목으로 들어갈 값을 설정
 *         'COMBO_ALL': 전체 
 *         'COMBO_SEL' :선택하세요
 * @param  pDsName 생성될 DataSet이름
 * @param  pFilterStr 필터값
 * @return  none
***************************************************************************************************/
function gfn_makeCodeDataSet(pComCd, pFirstSel, pDsName,  pFilterStr){
	
	var objDs;
	 
	gfn_initCodeDataSet();
	
	objDs = object(pDsName);
	
	if(objDs != null)
	{
		objDs.ClearData();
	}
	else
	{
		Create("Dataset",pDsName);
		objDs = object(pDsName);
	}
	
	objDs.AddColumn("DTL_CD","STRING", 256);
	objDs.AddColumn("DTL_NM","STRING", 256);
	objDs.AddColumn("TXT_VAL1","STRING", 256);
	objDs.AddColumn("TXT_VAL2","STRING", 256);
	objDs.AddColumn("TXT_VAL3","STRING", 256);
	objDs.AddColumn("NUM_VAL1","STRING", 256);
	objDs.AddColumn("NUM_VAL2","STRING", 256);
	objDs.AddColumn("NUM_VAL3","STRING", 256);
	
	
 	if(length(pFilterStr) > 0)
 	{
		gds_code.Filter("MST_CD="+quote(pComCd) +" && "+pFilterStr);
 	}
 	else
 	{
 		gds_code.Filter("MST_CD="+quote(pComCd));
 	}
 		
	objDs.CopyF(gds_code);
	
	gds_code.UnFilter();
	
	if(length(pFirstSel) > 0){
		objDs.InsertRow(0);
		objDs.SetColumn(0, "DTL_CD", "");
		objDs.SetColumn(0, "DTL_NM", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
}




/***************************************************************************************************
 * 코드명 가져오기 
 *
 * @param  pCombo  Combo 컴포넌트
 * @param  pComCd  공통코드
 * @param  [pFirstSel] 첫항목으로 들어갈 값을 설정
 *         'COMBO_ALL': 전체 
 *         'COMBO_SEL' :선택하세요
 * @param  pDsName 생성될 DataSet이름
 * @param  pFilterStr 필터값
 * @return  none
***************************************************************************************************/
function gfn_getCodeName(pMstCd, pDtlCd){
	
	var strNm;
	
	gds_code.UnFilter();
	gds_code.Filter("MST_CD="+quote(pMstCd) +" && DTL_CD="+quote(pDtlCd));

	strNm = gds_code.GetColumn(0,"DTL_NM");
	
	gds_code.UnFilter();
	
	return strNm;
}




/***************************************************************************************************
 * 년도 콤보
 *
 * @param  pCombo  Combo 컴포넌트
 * @param  pValue  선택될값
 * @param  [pFirstSel] 첫항목으로 들어갈 값을 설정
 *         'COMBO_ALL': 전체 
 *         'COMBO_SEL' :선택하세요
 * @return  none
***************************************************************************************************/
function gfn_yearCombo(pCombo, pValue, pFirstSel){ 
 	var objDs;
 	var ds_name="ds_yyyy_" + pCombo.id;
 	
 	if(pDsName != null){
		ds_name=pDsName;
 	}
 	
 	if(gfn_isEmpty(pCombo.InnerDataset)){
 		Create("Dataset",ds_name);
 		objDs = object(ds_name);
 		objDs.AddColumn("yyyy_cd","STRING", 256);
		objDs.AddColumn("yyyy_nm","STRING", 256);
		pCombo.CodeColumn="yyyy_cd";
		pCombo.DataColumn="yyyy_nm";
		pCombo.InnerDataset = ds_name;
 	}
 	else {
 		objDs = object(pCombo.InnerDataset);
 		objDs = object(ds_name);
		objDs.ClearData();
		pCombo.CodeColumn="yyyy_cd";
		pCombo.DataColumn="yyyy_nm";
 	}
 	
 	var tRow = "";
 	
 	// 1900 ~ 2100 년까지 뿌려주기
 	for(var i=2100;i>1900;i--)
 	{
		tRow = objDs.AddRow();
		objDs.SetColumn(tRow,"yyyy_cd",i);
		objDs.SetColumn(tRow,"yyyy_nm",i+" 년");
 	}
 	
	
	
	// 기본값이 있으면 추가 
	if(length(pFirstSel) > 0){
		objDs.InsertRow(0);
		objDs.SetColumn(0, "yyyy_cd", "");
		objDs.SetColumn(0, "yyyy_nm", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// 선택값이 있으면 선택 아니면 첫째행
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
	
}

/***************************************************************************************************
 * 월 콤보
 *
 * @param  pCombo  Combo 컴포넌트
 * @param  pValue  선택될값
 * @param  [pFirstSel] 첫항목으로 들어갈 값을 설정
 *         'COMBO_ALL': 전체 
 *         'COMBO_SEL' :선택하세요
 * @return  none
***************************************************************************************************/
function gfn_monthCombo(pCombo, pValue, pFirstSel){ 
 	var objDs;
 	var ds_name="ds_mm_" + pCombo.id;
 	
 	if(pDsName != null){
		ds_name=pDsName;
 	}
 	
 	if(gfn_isEmpty(pCombo.InnerDataset)){
 		Create("Dataset",ds_name);
 		objDs = object(ds_name);
 		objDs.AddColumn("mm_cd","STRING", 256);
		objDs.AddColumn("mm_nm","STRING", 256);
		pCombo.CodeColumn="mm_cd";
		pCombo.DataColumn="mm_nm";
		pCombo.InnerDataset = ds_name;
 	}
 	else {
 		objDs = object(pCombo.InnerDataset);
 		objDs = object(ds_name);
		objDs.ClearData();
		pCombo.CodeColumn="mm_cd";
		pCombo.DataColumn="mm_nm";
 	}
 	
 	var tRow = "";
 	
 	// 1~ 12 월까지 뿌려주기
 	for(var i=1;i<=12;i++)
 	{
		tRow = objDs.AddRow();
		if(i<=9)
			objDs.SetColumn(tRow,"mm_cd","0"+i);
		else
			objDs.SetColumn(tRow,"mm_cd",i);
		objDs.SetColumn(tRow,"mm_nm",i+" 월");
 	}
 	
	
	
	// 기본값이 있으면 추가 
	if(length(pFirstSel) > 0){
		objDs.InsertRow(0);
		objDs.SetColumn(0, "mm_cd", "");
		objDs.SetColumn(0, "mm_nm", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// 선택값이 있으면 선택 아니면 첫째행
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
	
}

/***************************************************************************************************
 * 일 콤보
 *
 * @param  pCombo  Combo 컴포넌트
 * @param  pValue  선택될값
 * @param  [pFirstSel] 첫항목으로 들어갈 값을 설정
 *         'COMBO_ALL': 전체 
 *         'COMBO_SEL' :선택하세요
 * @return  none
***************************************************************************************************/
function gfn_dayCombo(pCombo, pValue, pFirstSel){ 
 	var objDs;
 	var ds_name="ds_dd_" + pCombo.id;
 	
 	if(pDsName != null){
		ds_name=pDsName;
 	}
 	
 	if(gfn_isEmpty(pCombo.InnerDataset)){
 		Create("Dataset",ds_name);
 		objDs = object(ds_name);
 		objDs.AddColumn("dd_cd","STRING", 256);
		objDs.AddColumn("dd_nm","STRING", 256);
		pCombo.CodeColumn="dd_cd";
		pCombo.DataColumn="dd_nm";
		pCombo.InnerDataset = ds_name;
 	}
 	else {
 		objDs = object(pCombo.InnerDataset);
 		objDs = object(ds_name);
		objDs.ClearData();
		pCombo.CodeColumn="dd_cd";
		pCombo.DataColumn="dd_nm";
 	}
 	
 	var tRow = "";
 	
 	// 1~ 31까지 뿌려주기
 	for(var i=1;i<=31;i++)
 	{
		tRow = objDs.AddRow();
		if(i<=9)
			objDs.SetColumn(tRow,"mm_cd","0"+i);
		else
			objDs.SetColumn(tRow,"mm_cd",i);
		objDs.SetColumn(tRow,"mm_nm",i+" 일");
 	}
 	
	// 말일옵션을 99로 넣는다.
	tRow = objDs.AddRow();
	objDs.SetColumn(tRow,"mm_cd",'99');
	objDs.SetColumn(tRow,"mm_nm","말일");
	
	
	// 기본값이 있으면 추가 
	if(length(pFirstSel) > 0)
	{
		objDs.InsertRow(0);
		objDs.SetColumn(0, "mm_cd", "");
		objDs.SetColumn(0, "mm_nm", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// 선택값이 있으면 선택 아니면 첫째행
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
	
}

/***************************************************************************************************
 * 시 콤보
 *
 * @param  pCombo  Combo 컴포넌트
 * @param  pValue  선택될값
 * @param  [pFirstSel] 첫항목으로 들어갈 값을 설정
 *         'COMBO_ALL': 전체 
 *         'COMBO_SEL' :선택하세요
 * @return  none
***************************************************************************************************/
function gfn_hourCombo(pCombo, pValue, pFirstSel){ 
 	var objDs;
 	var ds_name="ds_hh_" + pCombo.id;
 	
 	if(pDsName != null){
		ds_name=pDsName;
 	}
 	
 	if(gfn_isEmpty(pCombo.InnerDataset)){
 		Create("Dataset",ds_name);
 		objDs = object(ds_name);
 		objDs.AddColumn("hh_cd","STRING", 256);
		objDs.AddColumn("hh_nm","STRING", 256);
		pCombo.CodeColumn="hh_cd";
		pCombo.DataColumn="hh_nm";
		pCombo.InnerDataset = ds_name;
 	}
 	else {
 		objDs = object(pCombo.InnerDataset);
 		objDs = object(ds_name);
		objDs.ClearData();
		pCombo.CodeColumn="hh_cd";
		pCombo.DataColumn="hh_nm";
 	}
 	
 	var tRow = "";
 	
 	// 1~ 24 시까지 뿌려주기
 	for(var i=1;i<=24;i++)
 	{
		tRow = objDs.AddRow();
		if(i<=9)
			objDs.SetColumn(tRow,"hh_cd","0"+i);
		else
			objDs.SetColumn(tRow,"hh_cd",i);
		objDs.SetColumn(tRow,"hh_nm",i+"시");
 	}
 	
	
	
	// 기본값이 있으면 추가 
	if(length(pFirstSel) > 0){
		objDs.InsertRow(0);
		objDs.SetColumn(0, "hh_cd", "");
		objDs.SetColumn(0, "hh_nm", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// 선택값이 있으면 선택 아니면 첫째행
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
	
}

/***************************************************************************************************
 * 분 콤보
 *
 * @param  pCombo  Combo 컴포넌트
 * @param  pValue  선택될값
 * @param  [pFirstSel] 첫항목으로 들어갈 값을 설정
 *         'COMBO_ALL': 전체 
 *         'COMBO_SEL' :선택하세요
 * @return  none
***************************************************************************************************/
function gfn_minuteCombo(pCombo, pTerm, pValue, pFirstSel){ 
 	var objDs;
 	var ds_name="ds_mi_" + pCombo.id;
 	
 	if(pDsName != null){
		ds_name=pDsName;
 	}
 	
 	if(gfn_isEmpty(pCombo.InnerDataset)){
 		Create("Dataset",ds_name);
 		objDs = object(ds_name);
 		objDs.AddColumn("mi_cd","STRING", 256);
		objDs.AddColumn("mi_nm","STRING", 256);
		pCombo.CodeColumn="mi_cd";
		pCombo.DataColumn="mi_nm";
		pCombo.InnerDataset = ds_name;
 	}
 	else {
 		objDs = object(pCombo.InnerDataset);
 		objDs = object(ds_name);
		objDs.ClearData();
		pCombo.CodeColumn="mi_cd";
		pCombo.DataColumn="mi_nm";
 	}

   var tRow = "";
 	
 	// 0 ~ 60 분까지 뿌려주기
 	for(var i=1;i<=60;i++)
 	{
		if(i%pTerm == 0)
		{
			
			tRow = objDs.AddRow();
			if(i<=9)
				objDs.SetColumn(tRow,"mi_cd","0"+i);
			else
				objDs.SetColumn(tRow,"mi_cd",i);
			objDs.SetColumn(tRow,"mi_nm",i+"분");
		}
 	}
 	
	
	
	// 기본값이 있으면 추가 
	if(length(pFirstSel) > 0){
		objDs.InsertRow(0);
		objDs.SetColumn(0, "mi_cd", "");
		objDs.SetColumn(0, "mi_nm", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// 선택값이 있으면 선택 아니면 첫째행
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
	
}

/***************************************************************************************************
 * 기간(~년) 콤보
 *
 * @param  pCombo  Combo 컴포넌트
 * @param  pValue  선택될값
 * @param  [pFirstSel] 첫항목으로 들어갈 값을 설정
 *         'COMBO_ALL': 전체 
 *         'COMBO_SEL' :선택하세요
 * @return  none
***************************************************************************************************/
function gfn_YearTermCombo(pCombo, pValue, pFirstSel){ 
 	var objDs;
 	var ds_name="ds_trm_" + pCombo.id;
 	
 	if(pDsName != null){
		ds_name=pDsName;
 	}
 	
 	if(gfn_isEmpty(pCombo.InnerDataset)){
 		Create("Dataset",ds_name);
 		objDs = object(ds_name);
 		objDs.AddColumn("trm_cd","STRING", 256);
		objDs.AddColumn("trm_nm","STRING", 256);
		pCombo.CodeColumn="trm_cd";
		pCombo.DataColumn="trm_nm";
		pCombo.InnerDataset = ds_name;
 	}
 	else {
 		objDs = object(pCombo.InnerDataset);
 		objDs = object(ds_name);
		objDs.ClearData();
		pCombo.CodeColumn="trm_cd";
		pCombo.DataColumn="trm_nm";
 	}
 	
 	var tRow = "";
 	
 	// 1~ 10 년까지 뿌려주기
 	for(var i=1;i<=10;i++)
 	{
		tRow = objDs.AddRow();
		objDs.SetColumn(tRow,"trm_cd",i);
		objDs.SetColumn(tRow,"trm_nm",i+" 년");
 	}
 	
	
	
	// 기본값이 있으면 추가 
	if(length(pFirstSel) > 0){
		objDs.InsertRow(0);
		objDs.SetColumn(0, "trm_cd", "");
		objDs.SetColumn(0, "trm_nm", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// 선택값이 있으면 선택 아니면 첫째행
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
	
}


/***************************************************************************************************
 * 단선개소 콤보
 *
 * @param  pCombo  Combo 컴포넌트
 * @param  pValue  선택될값
 * @param  [pFirstSel] 첫항목으로 들어갈 값을 설정
 *         'COMBO_ALL': 전체 
 *         'COMBO_SEL' :선택하세요
 * @return  none
***************************************************************************************************/
function gfn_snpCombo(pCombo, pValue, pFirstSel){ 
 	var objDs;
 	var ds_name="ds_snp_" + pCombo.id;
 	
 	if(pDsName != null){
		ds_name=pDsName;
 	}
 	
 	if(gfn_isEmpty(pCombo.InnerDataset)){
 		Create("Dataset",ds_name);
 		objDs = object(ds_name);
 		objDs.AddColumn("snp_cd","STRING", 256);
		objDs.AddColumn("snp_nm","STRING", 256);
		pCombo.CodeColumn="snp_cd";
		pCombo.DataColumn="snp_nm";
		pCombo.InnerDataset = ds_name;
 	}
 	else {
 		objDs = object(pCombo.InnerDataset);
 		objDs = object(ds_name);
		objDs.ClearData();
		pCombo.CodeColumn="snp_cd";
		pCombo.DataColumn="snp_nm";
 	}
 	
 	var tRow = "";
 	
 	// 1~ 10 개소 뿌려주기
 	for(var i=1;i<=10;i++)
 	{
		tRow = objDs.AddRow();
		objDs.SetColumn(tRow,"snp_cd",i);
		objDs.SetColumn(tRow,"snp_nm",i);
 	}
 	
	
	
	// 기본값이 있으면 추가 
	if(length(pFirstSel) > 0){
		objDs.InsertRow(0);
		objDs.SetColumn(0, "snp_cd", "");
		objDs.SetColumn(0, "snp_nm", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// 선택값이 있으면 선택 아니면 첫째행
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
	
}

/***************************************************************************************************
 * 공통코드 콤보
 *
 * @param  pCombo  Combo 컴포넌트
 * @param  pComCd  공통코드
 * @param  pValue  선택될값
 * @param  [pFirstSel] 첫항목으로 들어갈 값을 설정
 *         'COMBO_ALL': 전체 
 *         'COMBO_SEL' :선택하세요
 * @param  pDsName  dataset 명
 * @param  pFilterStr filter시 사용될 조건식 
 * @return  none
***************************************************************************************************/
function gfn_comCodeCombo(pCombo, pComCd, pValue, pFirstSel, pDsName,  pFilterStr){ 
 	var objDs;
 	var ds_name="ds_code_" + pCombo.id;
 	
 	gfn_initCodeDataSet();
 	
 	if(pDsName != null){
		ds_name=pDsName;
 	}
 	
 	if(gfn_isEmpty(pCombo.InnerDataset)){
 		Create("Dataset",ds_name);
 		objDs = object(ds_name);
 		objDs.AddColumn("DTL_CD","STRING", 256);
		objDs.AddColumn("DTL_NM","STRING", 256);
		objDs.AddColumn("SORT_NO","INT", 5);
		pCombo.CodeColumn="DTL_CD";
		pCombo.DataColumn="DTL_NM";
		pCombo.InnerDataset = ds_name;
 	}
 	else {
 		objDs = object(pCombo.InnerDataset);
 		objDs = object(ds_name);
		objDs.ClearData();
		pCombo.CodeColumn="DTL_CD";
		pCombo.DataColumn="DTL_NM";
 	}
 	if(length(pFilterStr) > 0)
 	{
		gds_code.Filter("MST_CD="+quote(pComCd) +" and "+pFilterStr);
 	}
 	else
 	{
 		gds_code.Filter("MST_CD="+quote(pComCd));
 	}
	
	objDs.CopyF(gds_code);
	objDs.Sort("SORT_NO",true);
	
	// 기본값이 있으면 추가 
	if(length(pFirstSel) > 0){
		objDs.InsertRow(0);
		objDs.SetColumn(0, "DTL_CD", "");
		objDs.SetColumn(0, "DTL_NM", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// 선택값이 있으면 선택 아니면 첫째행
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
	
	gds_code.UnFilter();
}


/***************************************************************************************************
 * 공통코드 + DataSet 콤보
 *
 * @param  pCombo  Combo 컴포넌트
 * @param  pDsName  입력 DataSet 명
 * @param  pValue  선택될값
 * @param  [pFirstSel] 첫항목으로 들어갈 값을 설정
 *         'COMBO_ALL': 전체 
 *         'COMBO_SEL' :선택하세요
 * @param  pFilterStr filter시 사용될 조건식 
 * @return  none
***************************************************************************************************/
function gfn_comCodeDSCombo(pCombo, pDsName, pValue, pFirstSel, pFilterStr)
{ 
    var objDs;
    
    if(pDsName == "")
    {
		return;
    }
    
    gfn_initCodeDataSet();
    
    objDs = object(pDsName);
    
    pCombo.CodeColumn="DTL_CD";
	pCombo.DataColumn="DTL_NM";
	pCombo.InnerDataset = pDsName;

 	
 	if(length(pFilterStr) > 0){
		objDs.Filter(pFilterStr);
 	}
 	
 	// 기본값이 있으면 추가 
	if(length(pFirstSel) > 0){
		objDs.InsertRow(0);
		objDs.SetColumn(0, "DTL_CD", "");
		objDs.SetColumn(0, "DTL_NM", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// 선택값이 있으면 선택 아니면 첫째행
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
}


/***************************************************************************************************
 * DataSet 콤보
 *
 * @param  pCombo  Combo 컴포넌트
 * @param  pDsName  입력 DataSet 명
 * @param  codeCol  codeColumn 명
 * @param  dataCol  dataColumn 명
 * @param  pValue  선택될값
 * @param  [pFirstSel] 첫항목으로 들어갈 값을 설정
 *         'COMBO_ALL': 전체 
 *         'COMBO_SEL' :선택하세요
 * @param  pFilterStr filter시 사용될 조건식 
 * @return  none
***************************************************************************************************/
function gfn_DSCombo(pCombo, pDsName, codeCol, dataCol,  pValue, pFirstSel, pFilterStr)
{ 
    var objDs;
    
    if(pDsName == "")
    {
		return;
    }
    
    gfn_initCodeDataSet();
    
    objDs = object(pDsName);
    
    pCombo.CodeColumn=codeCol;
	pCombo.DataColumn=dataCol;
	pCombo.InnerDataset = pDsName;

 	if(length(pFilterStr) > 0){
		objDs.Filter(pFilterStr);
 	}
	
	// 기본값이 있으면 추가 
	if(length(pFirstSel) > 0){
		objDs.InsertRow(0);
		objDs.SetColumn(0, codeCol, "");
		objDs.SetColumn(0, dataCol, decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// 선택값이 있으면 선택 아니면 첫째행
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
	
}






/***************************************************************************************************
공통코드 + DataSet 라디오출력
pRadio : 라디오 박스 Object 
pComCd : 공통 그룹 코드 String
pDsName : 공통 코드로 만들 DataSet 명 String
pBindDataset : Bind할 DataSet 명 String
pColumn   : Bind할 Column 명 String 
***************************************************************************************************/
function gfn_comCodeDSRadio(pRadio, pValue, pDsName, pColumn){ 

    var objDs;
    
    if(pDsName == "")
    {
		return;
    }
    
    gfn_initCodeDataSet();
    
    objDs = object(pDsName);
    
    pRadio.CodeColumn="DTL_CD";
	pRadio.DataColumn="DTL_NM";
	pRadio.InnerDataset = pDsName;

	if(pColumn !=null){
		pRadio.Column = pColumn;
	}
 	
	if(pValue != "") 
	{
		pRadio.Value = pValue;
	}	
}

/***************************************************************************************************
공통 코드를 라디오출력
pRadio : 라디오 박스 Object 
pComCd : 공통 그룹 코드 String
pDsName : 공통 코드로 만들 DataSet 명 String
pBindDataset : Bind할 DataSet 명 String
pColumn   : Bind할 Column 명 String 
***************************************************************************************************/
function gfn_comCodeRadio(pRadio, pComCd, pValue, pDsName,pBindDataset,pColumn){ 
	var objDs;
	var ds_name="ds_cmcd_" + pRadio.id;
	
	gfn_initCodeDataSet();
	
	if(pDsName != null){
		ds_name=pDsName;
	}
	if(pBindDataset !=null){
		pRadio.BindDataset = pBindDataset;
	}
	if(pColumn !=null){
		pRadio.Column = pColumn;
	}
	if(gfn_isEmpty(pRadio.InnerDataset)){
		Create("Dataset",ds_name);
		objDs = object(ds_name); 
		pRadio.InnerDataset = ds_name; 
		pRadio.CodeColumn="DTL_CD";
		pRadio.DataColumn="DTL_NM";
	}
	else {
		objDs = object(pRadio.InnerDataset);
		objDs = object(ds_name);
		objDs.ClearData();
		pRadio.CodeColumn="DTL_CD";
		pRadio.DataColumn="DTL_NM";
	}
	gds_code.Filter("MST_CD="+quote(pComCd));
	objDs.CopyF(gds_code);
	
	if(pValue != "") {
		pRadio.Value = pValue;
	}
}


/***************************************************************************************************
 * DataSet radio List
 *
 * @param  pRadio  Radio 컴포넌트
 * @param  pDsName  입력 DataSet 명
 * @param  codeCol  codeColumn 명
 * @param  dataCol  dataColumn 명
 * @param  pValue  선택될값
 * @param  [pFirstSel] 첫항목으로 들어갈 값을 설정
 *         'Radio_ALL': 전체 
 *         'Radio_SEL' :선택하세요
 * @param  pFilterStr filter시 사용될 조건식 
 * @return  none
***************************************************************************************************/
function gfn_DSRadio(pRadio, pValue, pDsName, codeCol, dataCol,  pColumn)
{ 
    var objDs;
    
    if(pDsName == "")
    {
		return;
    }
    
    gfn_initCodeDataSet();
    
    objDs = object(pDsName);
    
    pRadio.CodeColumn=codeCol;
	pRadio.DataColumn=dataCol;
	pRadio.InnerDataset = pDsName;

	if(pColumn !=null){
		pRadio.Column = pColumn;
	}

	// 선택값이 있으면 선택 아니면 첫째행
	if(pValue != ""){
		pRadio.Value = pValue;
	}
	
}


/***************************************************************************************************
	1. 함수명   : gfn_SetCmnCheckBox
	2. 파라미터 : chkName      -  체크박스명
			 	  pComCd       -  공통코드
			 	  pValue      -  선택값
			 	  onClickFunction        -  onClick 이벤트 함수  
			 	  p_left       -  left 
			 	  p_top      -  top 
			 	  p_width     -  width 
			 	  positionFlag        -  수평, 수직 배치 설정 (row or col)
	3. 함수설명 : 공통 체크박스 리스트 
    4. 리턴값   : 없다.
  
***************************************************************************************************/
function gfn_SetCmnCheckBox(chkName, pComCd, pValue,  onClickFunction, p_left, p_top, p_width, positionFlag)
{
 	var objDs, objId, flag ;
 	var ds_name="ds_code_" + chkName;
	var obj = Components["checkbox"];

	gfn_initCodeDataSet();
	
	Create("Dataset",ds_name);
	objDs = object(ds_name);
	objDs.AddColumn("DTL_CD","STRING", 256);
	objDs.AddColumn("DTL_NM","STRING", 256);
	objDs.AddColumn("SORT_NO","INT", 5);

	gds_code.Filter("MST_CD="+quote(pComCd));

	objDs.CopyF(gds_code);
	objDs.Sort("SORT_NO",true);
	
	for(var i = 0; i < objDs.GetRowCount(); i ++){
		
        flag = true;
		objId = chkName+"_"+i;
		
		for(var j=0;j<objDs.count;j++)	{
			if(objId == obj[j].id){
				flag = false;
				break;
			}
		}
		
		if(flag){
			if(positionFlag == "row"){
				Create("checkbox", objId, "left="+(i*p_width+p_left)+" top="+p_top+" width="+p_width+" height=20 value="+objDs.GetColumn(i, "DTL_CD") + " text=" + objDs.GetColumn(i, "DTL_NM") + " OnClick="+onClickFunction);
			}else{
				Create("checkbox", objId, "left="+p_left+" top="+(i*20+p_top)+" width="+p_width+" height=20 value="+objDs.GetColumn(i, "DTL_CD") + " text=" + objDs.GetColumn(i, "DTL_NM") + " OnClick="+onClickFunction);
			}
		}
	}
	
	gds_code.UnFilter();
}










/**
*	1. 함수명   : gfn_SaveExcelContents
*	2. 파라미터 : fileDialogId - FileDialog 아이디
*	              gridId       - 그리드 아이디
*	              filePath     - 파일을 저장할 위치
*	              fileName     - 저장할 파일 이름
*	              excelName    - 엑셀 시트 이름
*	              excelOpen    - 저장 후에 엑셀 파일 열기 여부 (true or false)
*	3. 함수설명 : 그리드의 내용을 엑셀로 저장하는 함수
*   4. 리턴값   : 없음
*    
*/
function gfn_SaveExcelContents(fileDialogId, gridId, filePath, fileName, excelName, excelOpen)
{
	fileDialogId.FileName = fileName;
	fileDialogId.FilePath = filePath;
	
	if(!fileDialogId.Open(""))
	{
		return;   
	}
	
	var ExportObject1;
			
	ExportObject1 = CreateExportObject();
	ExportObject1.ExportType		= "Excel";
	ExportObject1.ExportFileName	= fileDialogId.FilePath + "\\" + fileDialogId.FileName;
	ExportObject1.ActiveSheetName   = excelName;
	
	// ExportObject1.ExportSinglePivotColHead = false;
	ExportObject1.MakeEmptyFileWhenNotExist = true;			
	ExportObject1.AddExportGrid(excelName + "!" + "A1", gridId, true, false);
		
	if(excelOpen == false){
		ExportObject1.Export(1, 0);  //progressbar, excel Running
	}else{
		ExportObject1.Export(1, 1);  //progressbar, excel Running
	}
	
	ExportObject1.save();
	
	if(excelOpen == false){
		ExportObject1.CloseWorkBook();    //엑셀닫기
	}
	
	ExportObject1.Close();
	ExportObject1 = null;
}




var resultCode;
var resultMessage;

/**
*	1. 함수명   : gfn_showProgressWindow
*	2. 파라미터 : visibleFlag - 보이는 유무
			 	  formID      - 폼 아이디	
*	3. 함수설명 : 프로그래스 팝업창
*   4. 리턴값   : 없다.
*   
*/ 
var _showProgressWindow_currentComponent = null; //* 트랜젝션 발생 컴포넌트.

function gfn_showProgressWindow(visibleFlag, formID)
{
	
	// 이창이 뜨므로 포커싱을 잃어버린다.
	// 그래서 비활성화 
	
	/*
	//trace(formID);
	var iLeft;
	var iTop;
	var progressObj;
	if (visibleFlag) _showProgressWindow_currentComponent = GetCurrentComponent();
	
	if (formID != null) {
		progressObj = Object("Progress");
		iTop = (formID.height - 144) / 2;
		iLeft = (formID.width - 400) / 2;
		if(IsValidObject(progressObj))
			formID.Create("Div", "Progress", 'width="400" height="170" Url="sys_common::wait.xml" visible="false"');		
		progressObj = formID.Progress;
	} else {
		progressObj = Find("Progress");
		if (progressObj != null && progressObj.GetForm() != this) progressObj = null;
		iTop = (height - 144) / 2;
		iLeft = (width - 400) / 2;
		if (progressObj == null)
			progressObj = Create("Div", "Progress", 'width="400" height="170" Url="sys_common::wait.xml" visible="false"');
	}
	
	progressObj.Left = iLeft;
	progressObj.Top = iTop;
	progressObj.Url = "sys_common::wait.xml";
	progressObj.Visible = visibleFlag;
		
	if (visibleFlag) progressObj.SetFocus();
	else if (!gfn_isEmpty(_showProgressWindow_currentComponent)) _showProgressWindow_currentComponent.SetFocus();
	*/
}



/**
*	1. 함수명   : gfn_showProgressDeviceWindow
*	2. 파라미터 : visibleFlag - 보이는 유무
			 	  formID      - 폼 아이디	
*	3. 함수설명 : 장비와 통신 프로그래스 팝업창
*   4. 리턴값   : 없다.
*   
*/ 
var _showProgressDeviceWindow_currentComponent = null; //* 트랜젝션 발생 컴포넌트.

function gfn_showProgressDeviceWindow(visibleFlag, formID)
{
	//trace(formID);
	var iLeft;
	var iTop;
	var progressObj;
	if (visibleFlag) _showProgressDeviceWindow_currentComponent = GetCurrentComponent();
	
	if (formID != null) {
		progressObj = Object("ProgressDevice");
		iTop = (formID.height - 144) / 2;
		iLeft = (formID.width - 400) / 2;
		if(IsValidObject(progressObj))
			formID.Create("Div", "ProgressDevice", 'width="400" height="170" Url="common::waitDevice.xml" visible="false"');
		progressObj = formID.Progress;
	} else {
		progressObj = Find("ProgressDevice");
		if (progressObj != null && progressObj.GetForm() != this) progressObj = null;
		iTop = (height - 144) / 2;
		iLeft = (width - 400) / 2;
		if (progressObj == null)
			progressObj = Create("Div", "ProgressDevice", 'width="400" height="170" Url="common::waitDevice.xml" visible="false"');
	}
	
	progressObj.Left = iLeft;
	progressObj.Top = iTop;
	progressObj.Url = "common::waitDevice.xml";
	progressObj.Visible = visibleFlag;
	
	if(progressObj == null) gfn_showProgressDeviceWindow(visibleFlag);
		
	if (visibleFlag) progressObj.SetFocus();
	else if (!gfn_isEmpty(_showProgressDeviceWindow_currentComponent)) _showProgressDeviceWindow_currentComponent.SetFocus();
}



/**
*	1. 함수명   : gfn_GetFtpFile
*	2. 파라미터 : filepath     - 리모트 파일의 경로(루트 기준의 경로)
*	              filename     - 리모트 파일의 파일명
*	              savefilepath - 로컬의 파일의 경로
*	              savefilename - 로컬의 파일명
*	              ftp_ip       - FTP IP
*	              ftp_id       - FTP 계정
*	              ftp_pass     - FTP 패스워드
*	              ftp_port     - FTP 포트
*	3. 함수설명 : FTP의 파일 다운로드
*   4. 리턴값   : 없음
*   
*/ 
function gfn_GetFtpFile(filepath, filename, savefilepath, savefilename, ftp_ip, ftp_id, ftp_pass, ftp_port)
{
	if((filepath == null) || (filepath == '')){
		alert("리모트 파일의 경로를 입력해주세요.");
		return;
	}else if((filename == null) || (filename == '')){
		alert("리모트 파일의 파일명을 입력해주세요.");
		return;
	}else if((savefilepath == null) || (savefilepath == '')){
		alert("로컬의 파일의 경로를 입력해주세요.");
		return;
	}else if((savefilename == null) || (savefilename == '')){
		alert("로컬의 파일명을 입력해주세요.");
		return;
	}else if((ftp_ip == null) || (ftp_ip == '')){
		alert("FTP IP를 입력해주세요.");
		return;
	}else if((ftp_id == null) || (ftp_id == '')){
		alert("FTP 계정을 입력해주세요.");
		return;
	}else if((ftp_pass == null) || (ftp_pass == '')){
		alert("FTP 패스워드를 입력해주세요.");
		return;
	}else if((ftp_port == null) || (ftp_port == '')){
		alert("FTP 포트를 입력해주세요.");
		return;
	}
	
	var ret ;
	var strAttr = 'Height="1" Left="1" Width="1" ';	

	if (Find("Ftp") == NULL && !IsValidObject("CommonFtp")) {
		Create("Ftp", "CommonFtp", strAttr);
	}
	if (Find("File") == NULL && !IsValidObject("CommonLocalFile")) {
		Create("File", "CommonLocalFile", strAttr);
	}

	//* FTP Connect
	ret = CommonFtp.Open(ftp_ip, ftp_id, ftp_pass, ftp_port);

	if(ret < 0) {
		alert(" FTP 연결 실패.");
		return;
	}
	
	//* FTP 디렉토리 이동
	ret = CommonFtp.ChangeDir(filepath);
	
	if(ret < 0) {
		Trace("디렉토리 이동시 에러 발생!");
		return;
	}

	Trace("filename : " + filename + " , Path : "+savefilepath + "\\" + savefilename);
	
	//* FTP 파일 다운로드
	ret = CommonFtp.GetFile(filename, savefilepath + "\\" + savefilename);
	
	Trace("ret [" + ret + "]");
	
	if (ret < 0) {
		alert("Get File실패");
		return;
	}
		alert("File 가져오기 성공");
	Trace("ret [" + ret + "]");
	CommonFtp.Close();

	return ret;
}


 /**
*	1. 함수명   : gfn_DeleteFtpFile
*	2. 파라미터 : savefilepath - 리모트 파일의 경로(루트 기준의 경로)
*	              savefilename - 리모트 파일의 파일명
*	              ftp_ip       - FTP IP
*	              ftp_id       - FTP 계정
*	              ftp_pass     - FTP 패스워드
*	              ftp_port     - FTP 포트
*	3. 함수설명 :  FTP의 파일을 삭제
*   4. 리턴값   : 없음
*   
*/ 
function gfn_DeleteFtpFile(savefilepath, savefilename, ftp_ip, ftp_id, ftp_pass, ftp_port)
{
	if((savefilepath == null) || (savefilepath == '')){
		alert("리모트 파일의 경로를 입력해주세요.");
		return;
	}else if((savefilename == null) || (savefilename == '')){
		alert("리모트 파일명을 입력해주세요.");
		return;
	}else if((ftp_ip == null) || (ftp_ip == '')){
		alert("FTP IP를 입력해주세요.");
		return;
	}else if((ftp_id == null) || (ftp_id == '')){
		alert("FTP 계정을 입력해주세요.");
		return;
	}else if((ftp_pass == null) || (ftp_pass == '')){
		alert("FTP 패스워드를 입력해주세요.");
		return;
	}else if((ftp_port == null) || (ftp_port == '')){
		alert("FTP 포트를 입력해주세요.");
		return;
	}

	var file_size;
	var ret ;
	var strAttr = 'Height="1" Left="1" Width="1" ';

	if (Find("Ftp") == NULL) {
		Create("Ftp", "CommonFtp", strAttr);
	}
	
	trace("ftp 연결");
	
	//* FTP Connect - DB서버 FTP 위치
	ret = CommonFtp.Open(ftp_ip, ftp_id, ftp_pass, ftp_port);
	
	if (ret < 0) {
		alert(" FTP 연결 실패.");
		return -1;
	}

	//* FTP 디렉토리 이동
	ret = CommonFtp.ChangeDir(savefilepath);

	if (ret < 0) {
		Trace("디렉토리 이동시 에러가 나서 디렉토리를 생성함");
		CommonFtp.MakeDir(savefilepath);
		CommonFtp.ChangeDir(savefilepath);
	}
	
	trace("savefilename : "+savefilename);
	
	//* 파일의 존재 여부를 확인
	ret = CommonFtp.ExistFile(savefilename);
	
	if (ret < 0) {
		CommonFtp.Close();
		alert("File이 존재하지 않아 삭제를 할수 없습니다.");
		return -1;
	}
	//* 파일을 삭제 함
	ret = CommonFtp.RemoveFile(CommonFtp.GetCurrentDir() + "/" + savefilename);
	
	if(ret < 0){
		CommonFtp.Close();
		alert("File 삭제 실패");
		return -1;
	
	}else{
		alert("File 삭제 성공");
		CommonFtp.Close();
		return ret;
	}
}


/**
*	1. 함수명   : gfn_UploadFtpFile
*	2. 파라미터 : filefullname - 저장할 파일의 경로까지 포함한 전체 이름
*	              ftpSavepath  - 리모트 파일의 경로(루트 기준의 경로) 
*	              savefilename - 리모트 파일의 파일명
*	              ftp_ip       - FTP IP
*	              ftp_id       - FTP 계정
*	              ftp_pass     - FTP 패스워드
*	              ftp_port     - FTP 포트
*	3. 함수설명 : FTP의 파일 업로드
*   4. 리턴값   : 없음
*   
*/ 
function gfn_UploadFtpFile(filefullname, ftpSavepath, savefilename, ftp_ip, ftp_id, ftp_pass, ftp_port)
{

	var ret ;
	var strAttr = 'Height="1" Left="1" Width="1" ';
	
	if (Find("Ftp") == NULL) {	
		Create("Ftp", "CommonFtp", strAttr); 		
	} 
	 
	//Trace("ftp 연결");
	// FTP Connect
	ret = CommonFtp.Open(ftp_ip, ftp_id, ftp_pass, ftp_port);
	
	//Trace("FTP 업로드 - ret [ "+ret+" ]");
	
	if(ret < 0){
		alert(" FTP 연결 실패.");
		return 1;
	}	
	
	// FTP 디렉토리 이동
	ret = CommonFtp.ChangeDir(ftpSavepath);
	if( ret < 0 ){
		Trace("ftpSavepath : "+ftpSavepath);
		Trace("디렉토리 이동시 에러가 나서 디렉토리를 생성함");
		CommonFtp.MakeDir(ftpSavepath);
		CommonFtp.ChangeDir(ftpSavepath);
	}
	
	// FTP 팡일 업로드
	ret = CommonFtp.PutFile(filefullname, savefilename);		
	if(ret < 0){
		alert("업로드 실패");
		return 1;
	}
	
	CommonFtp.Close();
	
	return ret;
}


//var target_url = "http://localhost:8088/TKS/";
//var target_url = "http://59.12.238.168:8088/TKS/";

var upload_packetSize   = 4096000; //1048576;
var download_packetSize = 1048576;


/**
*	1. 함수명   : gfn_UploadFtpFile
*	2. 파라미터 : httpfileObj  - 저장할 파일의 경로까지 포함한 전체 이름
*	              filefullname - 리모트 파일의 경로(루트 기준의 경로) 
*	              filename     - 리모트 파일의 파일명
*	              nRow         - ataset Row Position 
*	              strCol       - Column ID (Progress 설정)
*	              objState     - rogress 표시 Grid
*	3. 함수설명 : Result/Message/file Size	
*   4. 리턴값   : 없음
*   
*/ 
function gfn_ftpFileUpload(httpfileObj, filefullname, filename, nRow, strCol, objState)
{
	/*
	trace("httpfileObj : " + httpfileObj);
	trace("filefullname  : " + filefullname);
	trace("filename : " + filename);	
	trace("nRow      : " + nRow);
	trace("strCol    : " + strCol);
	trace("objState  : " + objState);
	*/
	
	var rtn_arr = Array(3);
	rtn_arr[0] = "FAIL";

	if(length(filefullname) < 7){
		rtn_arr[1] = "Not Found Seleced File!";
		return rtn_arr;
	}
	
	if(length(filename) < 1){
		rtn_arr[1] = "Not Found CookieParam!";
		return rtn_arr;
	} 

	var write_size;
	var tot_write_size;
	var file_size;

	//remote_url =  target_url + "fileUpload.jsp";
	
	file_size = httpfileObj.GetFileSizeLocal(filefullname);
	
	//httpfileObj.CookieParam = filename;
	httpFileObj.CookieParam = UrlEncode(filename);

	remote_url = target_url + "uploadFiles2.jsp?path="+filefullname;

	trace("remote_url : " + remote_url);
	trace("filefullname   : " + filefullname);
	trace("remote_url : " + remote_url);
	//trace("httpfileObj.CookieParam : " + httpfileObj.CookieParam);	
	
	ret = httpfileObj.OpenFile(remote_url, filefullname, "PUT");
	
	//trace("ret : [ " + ret + " ]");
	
	if(ret < 0){
		rtn_arr[0] = "FAIL";
		rtn_arr[1] = "OpenFile Failed :: " + httpfileObj.ErrorMsg;
		return rtn_arr;
	}

	if(IsValidObject(objState)){
		
		var objDs = objState.BindDataset;
		var readpercent;
		object(objDs).SetColumn(nRow, "filesize", round(file_size/1024));

		while(1)
		{
			write_size = httpfileObj.WriteFile(upload_packetSize);

			trace(write_size);
			
			tot_write_size += write_size;
			readpercent = truncate((tot_write_size / file_size) * 100,1);
			object(objDs).SetColumn(nRow, strCol, readpercent);
			object(objDs).SetColumn(nRow, "progsize",round(tot_write_size/1024));
			
			if(write_size < upload_packetSize){
				break;
			}
		}
		
	}else{
		while(1)
		{
			write_size = httpfileObj.WriteFile(upload_packetSize);	
			if(write_size < upload_packetSize){
				break;
			}
		}
	}
	
	httpfileObj.CloseFile();

	if (isExistVar("objState",true)){
		if ( write_size == -1 )	{
			rtn_arr[0] = "FAIL";
			rtn_arr[1] = httpfileObj.ErrorMsg;
			return rtn_arr;
		}
	}
	
	var rtn_val = httpfileObj.CookieParam;

	var str_sp = split2(rtn_val,";","=");
	var tmp_a;
	
	for (var i = 0 ; i < str_sp.length() ; i++)
	{
		tmp_a = str_sp[i];
		if ( tmp_a[0].pos("FileParam") > -1 )
		{
			rtn_arr[0] = left(tmp_a[1],4);
			rtn_arr[1] = right(tmp_a[1], length(tmp_a[1]) -6);
		}	
	}	
	return rtn_arr;
}

function gfn_ftpFileUploadDlr(httpfileObj, filefullname, dlrname, filename, nRow, strCol, objState)
{
	/*
	trace("httpfileObj : " + httpfileObj);
	trace("filefullname  : " + filefullname);
	trace("filename : " + filename);	
	trace("nRow      : " + nRow);
	trace("strCol    : " + strCol);
	trace("objState  : " + objState);
	*/
	
	var rtn_arr = Array(3);
	rtn_arr[0] = "FAIL";

	if(length(filefullname) < 7){
		rtn_arr[1] = "Not Found Seleced File!";
		return rtn_arr;
	}
	
	if(length(filename) < 1){
		rtn_arr[1] = "Not Found CookieParam!";
		return rtn_arr;
	} 

	var write_size;
	var tot_write_size;
	var file_size;

	//remote_url =  target_url + "fileUpload.jsp";
	
	file_size = httpfileObj.GetFileSizeLocal(filefullname);
	
	//httpfileObj.CookieParam = filename;
	httpFileObj.CookieParam = UrlEncode(filename);

	//remote_url = target_url + "uploadFiles2.jsp?path="+filefullname+"&dirname="+dlrname;
	remote_url = target_url + "uploadFiles2.jsp?dirname="+dlrname+"&path="+filefullname;


	//trace("httpfileObj.CookieParam : " + httpfileObj.CookieParam);	
	
	ret = httpfileObj.OpenFile(remote_url, filefullname, "PUT");
	
	//trace("ret : [ " + ret + " ]");
	
	if(ret < 0){
		rtn_arr[0] = "FAIL";
		rtn_arr[1] = "OpenFile Failed :: " + httpfileObj.ErrorMsg;
		return rtn_arr;
	}

	if(IsValidObject(objState)){
		
		var objDs = objState.BindDataset;
		var readpercent;
		object(objDs).SetColumn(nRow, "filesize", round(file_size/1024));

		while(1)
		{
			write_size = httpfileObj.WriteFile(upload_packetSize);

			trace(write_size);
			
			tot_write_size += write_size;
			readpercent = truncate((tot_write_size / file_size) * 100,1);
			object(objDs).SetColumn(nRow, strCol, readpercent);
			object(objDs).SetColumn(nRow, "progsize",round(tot_write_size/1024));
			
			if(write_size < upload_packetSize){
				break;
			}
		}
		
	}else{
		while(1)
		{
			write_size = httpfileObj.WriteFile(upload_packetSize);	
			if(write_size < upload_packetSize){
				break;
			}
		}
	}
	
	httpfileObj.CloseFile();

	if (isExistVar("objState",true)){
		if ( write_size == -1 )	{
			rtn_arr[0] = "FAIL";
			rtn_arr[1] = httpfileObj.ErrorMsg;
			return rtn_arr;
		}
	}
	
	var rtn_val = httpfileObj.CookieParam;

	var str_sp = split2(rtn_val,";","=");
	var tmp_a;
	
	for (var i = 0 ; i < str_sp.length() ; i++)
	{
		tmp_a = str_sp[i];
		if ( tmp_a[0].pos("FileParam") > -1 )
		{
			rtn_arr[0] = left(tmp_a[1],4);
			rtn_arr[1] = right(tmp_a[1], length(tmp_a[1]) -6);
		}	
	}	
	return rtn_arr;
}

/*====================================================================
= 기능 : File Read
= 인수 : 			file Path
				 str_cookie		Cookie (parameter)
				 str_size			File Size
				 nRow					Dataset Row Position
				 strCol				Column ID (progress 설정)
				 objState			progress 설정 Grid
= Return : Result/Message/file Size				 
=====================================================================*/
function gfn_FileRead(httpfileObj,file_url, str_cookie, str_size, nRow, strCol, objState)
{

	trace("file_url::"+file_url);
	trace("str_cookie::"+str_cookie);
	trace("str_size::"+str_size);
	  
	var rtn_arr = Array(2);
	rtn_arr[0] = "FAIL";

	if (length(quote(file_url)) < 7) {
		rtn_arr[1] = "Not Found Seleced File!";
		return rtn_arr;
	}
	
	if (length(quote(str_cookie)) < 1){
		rtn_arr[1] = "Not Found CookieParam!";
		return rtn_arr;
	}

	if (length(quote(str_size)) < 1 || str_size == 0){
		rtn_arr[1] = "Not Found File Size!";
		return rtn_arr;
	}

	remote_url =  target_url + "fileDownload.jsp";
	
	var read_size;
	var tot_read_size;
	var file_size;

	//HttpFile0.SessionParam = SMSESSION;
	//httpfileObj.CookieParam = str_cookie;
	httpFileObj.CookieParam = UrlEncode(str_cookie);
	
	file_size = str_size;
	//trace("remote_url::"+remote_url);
	//trace("file_url::"+file_url);
	ret = httpfileObj.OpenFile(remote_url, file_url, "GET");
	
	if( ret < 0 ) {
		rtn_arr[0] = "FAIL";
		rtn_arr[1] = "OpenFile Fail ::" + httpfileObj.ErrorMsg;
		return rtn_arr;
	}
	
	tot_read_size = 0;	

	if (IsValidObject(objState)){
		var objDs = objState.BindDataset;
		var readpercent;

		while(1) {
			read_size = httpfileObj.ReadFile(download_packetSize);
			//trace(read_size);
			tot_read_size += read_size;
			
			readpercent = truncate((toNumber(tot_read_size) / toNumber(file_size)) * 100,1);
			
			object(objDs).SetColumn(nRow, strCol, readpercent); 
			
			if( (read_size == 0) || ( read_size == -1) ) break;
		}
		
	} else {
		while(1) {
			read_size = httpfileObj.ReadFile(download_packetSize);
			if( (read_size == 0) || ( read_size == -1) ) break;
		}
	}
	
	httpfileObj.CloseFile();
	
	if(read_size == -1){
		rtn_arr[0] = "FAIL";
		rtn_arr[1] = httpfileObj.ErrorMsg;
		return rtn_arr;
	}
	
	var rtn_val = httpfileObj.CookieParam;
	var str_sp  = split2(rtn_val,";","=");
	var tmp_a;
	
	for(var i = 0 ; i < str_sp.length() ; i++)
	{
		tmp_a = str_sp[i];
		if (tmp_a[0].pos("FileParam") > -1)
		{
			rtn_arr[0] = left(tmp_a[1],4);
			rtn_arr[1] = right(tmp_a[1], length(tmp_a[1]) -6);
		}	
	}	
	
	return rtn_arr;
}


 /**
*	1. 함수명   : gfn_loadExcelFile
*	2. 파라미터 : pObjDs     - xcel을 로드할 Dataset Component
*	              pHeaderFg  - 첫 로우가 헤더인지 여부를 true/false로 전달, default - false
*	3. 함수설명 : Excel파일을 그리드에 로드한다.
*                 주의! 엑셀내용이 데이터셋에 순서대로 들어간다.
*   4. 리턴값   : 없음
* 
*/ 
function gfn_loadExcelFile(pObjDs, pHeaderFg)
{
	var objFileDialog = Find("_fd_excel");
	
	if(isValid(objFileDialog) == false){
		Create("FileDialog", "_fd_excel", "Bottom='284' Filter='All(*.*)|*.*|' Height='24' Left='659' Right='683' TabOrder='37' Top='260' Width='24'");
	}
	
	if(!_fd_excel.Open()){
		return false;
	}
	
	var result = ext_ExcelImportByIndex( _fd_excel.FilePath + "\\" + _fd_excel.FileName, 0, pObjDs.id, 1, 1, 0, iif(pHeaderFg, 2,1));

	if(pObjDs.rowcount < 1){
		//alert("내용이 없습니다.");
		gfn_popup_message("modal", "confirm", "Excel 파일 로드에 성공하였습니다.", "");
		return;
	}

	if(result == 0){
		//alert("Excel 파일 로드에 성공하였습니다.");
		gfn_popup_message("modal", "confirm", "Excel 파일 로드에 성공하였습니다.", "");
	}else{
		//alert("Excel 파일 로드에 실패하였습니다.");
		gfn_popup_message("modal", "confirm", "Excel 파일 로드에 실패하였습니다.", "");
	}
	
	return _fd_excel.FileName;
}

/**
*	1. 함수명   : gfn_loadExampleExcelForm
*	2. 파라미터 : objFile - FTP 객체
*	              fileNm  - FTP로 불러올 파일 이름
*	3. 함수설명 : 엑셀양식 같은 파일을 FTP로 불러온다.
*   4. 리턴값   : 없음
* 
*/ 
function gfn_loadExampleExcelForm(objFile,fileNm)
{
	objFile.Type = "Save";
	
	objFile.FileName = fileNm;
	
	if (!objFile.Open("")){
		return;
	}
	
	var tmpFullName = objFile.FilePath + "\\" + objFile.FileName;
	
	var filepath     = "/";
	var filename     = fileNm;
	var savefilepath = objFile.FilePath;
	var savefilename = fileNm;
	var ftp_ip       = "213.175.94.230"; // 테스트용 ftp
	var ftp_id       = "user1";
	var ftp_pass     = "123qwe";
	var ftp_port     = "21";
	
	gfn_GetFtpFile(filepath, filename, savefilepath, savefilename, ftp_ip, ftp_id, ftp_pass, ftp_port);
}



/***************************************************************************************************
 * 좌측메뉴의 skin image 셋팅 
 *
 * @param  skinImg  
 * @param   obj  
 * @return  none
 * @비고    차후 테마같은것을 사용할때 이미지 ID를 등록후 일괄 변경하면 된다.
            현재는 사용안함
***************************************************************************************************/
function gfn_frameImageSet(skinImg, obj)
{
	
	/*
	for(var i=0; i<obj.Components.count; i++)
	{
		var objType = obj.Components[i].GetType();
		var objImgId = ""; 		
		if(obj.Components[i].IsComposite()){
			gfn_frameImageSet(skinImg, obj.Components[i]);
		}
		else if(objType == "Image" || objType == "Button"){
			objImgId = obj.Components[i].id;

			if(skinImg == "A"){
				obj.Components[i].imageID = replace(obj.Components[i].imageID,"B_","A_");
			}
			else if(skinImg == "B"){
				obj.Components[i].imageID = replace(obj.Components[i].imageID,"A_","B_");
			}
		}
	}
	*/	
}


/***************************************************************************************************
 * Split에 등록된 컴포넌트의 Resize를 처리한다.
 * @param splHorz 	Split Horizontal
 * @param splVert 	Split Vertical
 * @param obj 		이벤트가 발생한 폼
 * @param nCx 		넓이
 * @param nCy 		높이
 * @param nState 	Normal, Restore, Maxmize
***************************************************************************************************/
function gfn_SplitOnSize(splHorz, splVert, obj, nCx, nCy, nState) 
{

	
	var isRedraw = false;
	obj.splHorz.Redraw = false;
	obj.splVert.Redraw = false;

	if( obj.splHorz != null ) {
		obj.splHorz.UserData = nCx -  splHorz.Width;
//		obj.splHorz.Left = nCx - splHorz.Width;
		obj.splHorz.Left = nCx;
	}
	 else
	 {
		trace("splHorz is null");
	 }

	if( obj.splVert != null ) {
		obj.splVert.UserData = nCy - splVert.Height;
//		obj.splVert.Top = nCy - splVert.Height;
		obj.splVert.Top = nCy;
	}
	else
	{
		trace("splVert is null");
	}

	obj.splHorz.Redraw = true;
	obj.splVert.Redraw = true;
	obj.ResizeScroll();
	if( isRedraw ) {
		obj.ResizeScroll();
	}
}

/***************************************************************************************************
 * gfn_FormOpenWindow 메뉴이외의 다른 폼에서 MDI 창을 띄운다.
 *
 * @param sUrl		오픈할 폼 Url
 * @param sArg		Argument
 * @param sTitle	폼 타이틀명
 * ex) gfn_FormOpenWindow("main::test.xml", "테스트폼", "test='1234'");
***************************************************************************************************/
function gfn_FormOpenWindow(sUrl, sTitle, sArg)
{
	
	/*
	if(sUrl == "") return;
	
	var sMenuId;
	var oForm;
	var param = "";	
	var nRow = gds_Menu.FindRow("formUrl",sURL);
	var rtnHandle;
	if(nRow > -1){
		if(length(sTitle) == 0)		sTitle = gds_Menu.GetColumn(nRow,"ServiceName");
			
		sMenuId = gds_Menu.GetColumn(nRow,"ServiceId");
		trace("sMenuIdsMenuIdsMenuId:"+sMenuId);
		oForm = global.AllWindows[sMenuId];		
		gds_function.Filter("ParentServiceId="+quote(sMenuId));
	}
	else{
		for(i=0; i<global.windows.count; i++){
			if(sUrl == global.windows[i].id){
				//alert(sTitle+" 메뉴가 이미 열려 있습니다!");
				
				oForm[0].setFocus();
				rtnHandle = oForm[0].GetHandle();
				return rtnHandle;
			}
		}			
		sMenuId = sUrl;		
	}

	if(oForm != null){
		oForm[0].setFocus();
		//alert(sTitle+" 메뉴가 이미 열려 있습니다!");
		rtnHandle = oForm[0].GetHandle();
		return rtnHandle;
	}
	if(g_maxForm > 0 && gds_openForm.rowcount >= g_maxForm){
		var msg  = "최대 오픈 가능한 프로그램 :" + g_maxForm + " 개 \n\n";
			msg += "오픈된 프로그램 :" + gds_openForm.rowcount + " 개 \n\n";
			msg += "최대 오픈 화면 설정을 해주시기 바랍니다.";
		gfn_commMsgForm("alert", msg, "", "확인");
		return;
	}

	param  = "ARG_URL="     + sUrl;
	param += " ARG_MENUID=" + quote(sMenuId);
	param += " ARG_TITLE="  + quote(sTitle);
	param += " ARG_TYPE="   + quote("F");
	param += " " + sArg;
	trace("params:::"+param);
	trace("sMenuId:::"+sMenuId);
	*/
	
	rtnHandle = NewWindow(sMenuId, "main::commForm.xml", param, 820,574,"OpenStyle=Max");
	return rtnHandle;
}


/***************************************************************************************************
 * gfn_MenuOpenWindow 메뉴에서 MDI 창을 띄운다.
 *
 * @param sMenuId	메뉴ID
 * @param oDs		Binding Dataset
 * @param sArg	    Argument
 *
***************************************************************************************************/
function gfn_MenuOpenWindow(sMenuId, oDs, sArg){

	var param = "";

	if(oDs == null) oDs = gds_Menu;
	
	// 열려진 창이 있으면 해당창에 포커스 
	var oForm = global.AllWindows[sMenuID];
	if(oForm != null){
		oForm[0].setFocus();
	}
	else{
	
		if(g_maxForm > 0 && ToNumber(gds_openForm.rowcount) >= ToNumber(g_maxForm))
		{
			var msg  = "최대 오픈 가능한 프로그램 :" + g_maxForm + " 개 \n\n";
			    msg += "오픈된 프로그램 :" + gds_openForm.rowcount + " 개 \n\n";
			    msg += "최대 오픈 화면 설정을 해주시기 바랍니다.";
			
			gfn_Popup_Message("modal", "confirm", msg, "확인");
			
			return;
		}

		var nRow = oDs.FindRow("MENU_ID",sMenuId);
		var sUrl = trim(oDs.GetColumn(nRow,"MENU_URL"));
		var sTitle = oDs.GetColumn(nRow,"MENU_NM");
		var param = "";

		if(length(sUrl) == 0) return;		
		//gds_function.Filter("ParentServiceId="+quote(sMenuId));

		param  = "ARG_URL="     + quote(sUrl);
		param += " ARG_MENUID=" + quote(sMenuId);
		param += " ARG_TITLE="  + quote(sTitle);
		param += " ARG_TYPE="   + quote("M");
		param += " " + sArg;
		
		
		NewWindow(sMenuId,"main::commForm.xml",param, 995,574,"OpenStyle=Max");	
	}

}


/***************************************************************************************************
 * gfn_MenuOpenWindow2 메뉴에서 MDI 창을 띄운다.
 *
 * @param sMenuId	메뉴ID
 * @param oDs		Binding Dataset
 * @param sArg	    Argument
 * 참고) 해당 메뉴는 commonForm을 띄우지 않고 url의 창을 직접 띄운다.
***************************************************************************************************/
function gfn_MenuOpenWindow2(sMenuId, oDs, sArg){

	var param = "";

	if(oDs == null) oDs = gds_Menu;
	
	// 열려진 창이 있으면 해당창에 포커스 
	var oForm = global.AllWindows[sMenuID];
	if(oForm != null){
		oForm[0].setFocus();
	}
	else{
	
		if(g_maxForm > 0 && ToNumber(gds_openForm.rowcount) >= ToNumber(g_maxForm))
		{
			var msg  = "최대 오픈 가능한 프로그램 :" + g_maxForm + " 개 \n\n";
			    msg += "오픈된 프로그램 :" + gds_openForm.rowcount + " 개 \n\n";
			    msg += "최대 오픈 화면 설정을 해주시기 바랍니다.";
			
			gfn_Popup_Message("modal", "confirm", msg, "확인");
			
			return;
		}

		var nRow = oDs.FindRow("MENU_ID",sMenuId);
		var sUrl = trim(oDs.GetColumn(nRow,"MENU_URL"));
		var sTitle = oDs.GetColumn(nRow,"MENU_NM");
		var param = "";

		if(length(sUrl) == 0) return;		
		//gds_function.Filter("ParentServiceId="+quote(sMenuId));

		param  = "ARG_URL="     + quote(sUrl);
		param += " ARG_MENUID=" + quote(sMenuId);
		param += " ARG_TITLE="  + quote(sTitle);
		param += " ARG_TYPE="   + quote("M");
		//param += " " + sArg;
		
		
		NewWindow(sMenuId,"main::Portal.xml",param, 1050,760,"OpenStyle=Max");	
	}

}





/***************************************************************************************************
 * 하단프레임에 메시지 등록
 * @param  pMsgCd 등록된 메시지 코드
 * ex) gfn_commMsg(CO_MSG_CHK_0020);
***************************************************************************************************/
function gfn_commMsg(pMsgCd, pBindInfo) {
	//DocBottom.st_commMsg.text = gfn_getMessage(pMsgCd, pBindInfo);

	//DocBottom.TXT_MSG.text = "";
}


/***************************************************************************************************
 * 하단프레임에 메시지 등록2
 * @param  pMsgCd 등록된 메시지 코드
 * ex) gfn_commMsg(CO_MSG_CHK_0020);
***************************************************************************************************/
function gfn_setMsg(pMsgTxt) {
	
	if(length(DocBottom.TXT_MSG.text) > 0)
	{
		DocBottom.TXT_MSG.text = pMsgTxt + chr(13) + chr(10) + DocBottom.TXT_MSG.text;
	}
	else
	{
		DocBottom.TXT_MSG.text = pMsgTxt;
	}

	//DocBottom.st_commMsg.text = "";
}


/***************************************************************************************************
 * 폼에서 리사이즈할 comonent를 정의
 * @param obj 		이벤트가 발생한 폼
 * @param sResize 	리사이즈할 component 
 ex) gfn_SetResize(this, "Shape0:H:R Button1:W:M grd_main:A:R");
***************************************************************************************************/
function gfn_SetResize(obj, sResize)
{		
	var sHorzContents = "";
	var sVertContents = "";
	var sHorzTmp = "";
	var sVertTmp = "";
//	obj.Create("split","splHorz","BKColor='red'  Direct='HORZ' Height='66' Left='955' Top='448' Visible='false' Width='2'");
//	obj.Create("split","splVert","BKColor='blue' Direct='VERT' Height='2' Left='905' Top='514' Visible='false' Width='50'");
	obj.Create("split","splHorz","BKColor='red'  Direct='HORZ' Height='66' Left='1240' Top='500' Visible='false' Width='2'");
	obj.Create("split","splVert","BKColor='blue' Direct='VERT' Height='2' Left='960' Top='660' Visible='false' Width='50'");
	
	if(length(sResize) > 0){
		var arrResize = split(sResize, " ");
		for(var i=0; i<arrResize.length; i++){
			
			var arrComp = split(arrResize[i], ":");
			oComp = arrComp[0];
			
			if(oComp == null) continue;
			
			if(arrComp[1] == "H"){
				sHorzTmp += "		<Bind BindType="+quote(decode(arrComp[2],'R','Resize','Move'))+" CompID="+quote(arrComp[0])+"/>";
			
			}
			else if(arrComp[1] == "W"){
				sVertTmp += "		<Bind BindType="+quote(decode(arrComp[2],'R','Resize','Move'))+" CompID="+quote(arrComp[0])+"/>";
			}
			else{
				sHorzTmp += "		<Bind BindType="+quote(decode(arrComp[2],'R','Resize','Move'))+" CompID="+quote(arrComp[0])+"/>";
				sVertTmp += "		<Bind BindType="+quote(decode(arrComp[2],'R','Resize','Move'))+" CompID="+quote(arrComp[0])+"/>";
			}
		}
	
	}
	else{
		var compObj;
		var compData;
		for(var i=0;i<obj.Components.count();i++){	
			compObj = obj.Components[i];
			if(compObj == null) continue;
			compData = gfn_getUserData(compObj, true);
			if(left(compData,1) == "H" || left(compData,1) == "W" || left(compData,1) == "A"){
				
				var arrComp = split2(compData, " ", ":");
				for(var a=0; a<length(arrComp); a++){
					if(arrComp[a][0] == "H"){
						sHorzTmp += "		<Bind BindType="+quote(decode(arrComp[a][1],'R','Resize','Move'))+" CompID="+quote(compObj.id)+"/>";
					
					}
					else if(arrComp[a][0] == "W"){
						sVertTmp += "		<Bind BindType="+quote(decode(arrComp[a][1],'R','Resize','Move'))+" CompID="+quote(compObj.id)+"/>";
					}
					else{
						sHorzTmp += "		<Bind BindType="+quote(decode(arrComp[a][1],'R','Resize','Move'))+" CompID="+quote(compObj.id)+"/>";
						sVertTmp += "		<Bind BindType="+quote(decode(arrComp[a][1],'R','Resize','Move'))+" CompID="+quote(compObj.id)+"/>";
					}					
				}
/*				
				if(arrComp[0] == "H"){
					sHorzTmp += "		<Bind BindType="+quote(decode(arrComp[1],'R','Resize','Move'))+" CompID="+quote(compObj.id)+"/>";
				
				}
				else if(arrComp[0] == "W"){
					sVertTmp += "		<Bind BindType="+quote(decode(arrComp[1],'R','Resize','Move'))+" CompID="+quote(compObj.id)+"/>";
				}
				else{
					sHorzTmp += "		<Bind BindType="+quote(decode(arrComp[1],'R','Resize','Move'))+" CompID="+quote(compObj.id)+"/>";
					sVertTmp += "		<Bind BindType="+quote(decode(arrComp[1],'R','Resize','Move'))+" CompID="+quote(compObj.id)+"/>";
				}
*/
			}
		}
	}

	sHorzContents = "<Contents><LeftOrTop>";
	sHorzContents += sHorzTmp;
	sHorzContents += "</LeftOrTop><RightOrBottom></RightOrBottom></Contents>";
	sVertContents = "<Contents><LeftOrTop>";
	sVertContents += sVertTmp;
	sVertContents += "</LeftOrTop><RightOrBottom></RightOrBottom></Contents>";
	
	obj.splHorz.Contents = sHorzContents;
	obj.splVert.Contents = sVertContents;

	gfn_OnSize(obj, g_nX, g_nY);
	obj.OnSize = "gfn_OnSize";	
//	obj.OnKeyDown = "gfn_formOnKeyDown";
}




function gfn_OnSize(obj,nCx,nCy,nState) 
{
	
	/*
	if(nCx < FORM_X || nCy < FORM_Y)
	{
		trace("gfn_OnSize 제한크기:" + FORM_X + "/" + FORM_Y +" 보다 작음. 크기변경 불가!");
		return;
	}
	*/
		
	gfn_SplitOnSize(obj.splHorz, obj.splVert, obj, nCx, nCy, nState);
}


/***************************************************************************************************
 * Enter를 Tab으로 전환하는 공통함수 Form의 OnKeyDown에 적용
 *
 * @return  none
***************************************************************************************************/
function gfn_formOnKeyDown(obj,objSenderObj,nChar,bShift,bControl,bAlt,nLLParam,nHLParam) {
	
	
	if ( nChar == 13 )	{
		if ( ToUpperCase(objSenderObj.GetType()) == "TEXTAREA" )
			return;
		if ( ToUpperCase(objSenderObj.GetType()) == "BUTTON" ) {
		   objSenderObj.click();
//		   return;
		}
		var tmpObj;
		if ( ToUpperCase(obj.GetNextComponent(true).GetType()) == "TAB" ) {
			tmpObj = obj.GetNextComponent(true);
			tmpObj = tmpObj.GetItem(tmpObj.TabIndex);
			obj = tmpObj;
			obj.setFocus();
		} else if ( ToUpperCase(objSenderObj.GetType()) == "TAB" ) {
			tmpObj = objSenderObj.GetItem(objSenderObj.TabIndex);
			tmpObj.setFocus();
		} else if ( ( ToUpperCase(objSenderObj.GetType()) == "GRID" ) &&
				  ( objSenderObj.Editable ) ) {
			var ret = objSenderObj.MoveToNextCell();
			if ( !ret )	{
				obj.GetNextComponent(true).setFocus();
			}
		} else {
			obj.GetNextComponent(true).setFocus();
		}
	} 
	else if(nChar == 27 || nChar == 113 || nChar == 114 || nChar == 115 || nChar == 116 || 
		nChar == 117 || nChar == 118 || nChar == 119 || nChar == 120 || 
		nChar == 121 || nChar == 122 || nChar == 123){
		var tempFunctionName = matchFunction(nChar);
		/*
		if(nChar == 27){
			this.close();
			return;
		}
		*/
		if(divApp.IsExistFunc(tempFunctionName)) {
			CallScript("divApp." + tempFunctionName + "()");
		}		
	}
//	else if( nChar == 27 ) {
//		close();
//	}
}


//이벤트 이름에서 인덱스랑 F(X)키 눌른거랑 비교해서 넘기기
function matchFunction(selectIndex){
	var caseIndex = selectIndex - 111;		//ex) F2 -> 113-111 = 2
	var currentFuntions = GetTopWindow().gv_cuurentFunctions;
	//trace("currentFuntions:"+currentFuntions.SaveXML());
	for(i=0; i<currentFuntions.rowcount; i++){
		var tempEvent = substr(currentFuntions.GetColumn(i, "serviceName"), 
								0, 
								IndexOf(currentFuntions.GetColumn(i, "serviceName"), "::"));
		if(IndexOf(tempEvent, toString(caseIndex)) > -1){
			return currentFuntions.GetColumn(i, "eventName");
		}
	}
	return null;
}
