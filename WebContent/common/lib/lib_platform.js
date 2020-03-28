//var COMM_X = 995;	//������ �Ǵ� WorkArea ���� �ȼ�
//var COMM_Y = 574;	//������ �Ǵ� WorkArea ���� �ȼ�
//var FORM_X = 955;	//Div�ȿ� ǥ���Ǵ� ������
//var FORM_Y = 514;	//Div�ȿ� ǥ���Ǵ� ������

var COMM_X = 1280;	//������ �Ǵ� WorkArea ���� �ȼ�
var COMM_Y = 1024;	//������ �Ǵ� WorkArea ���� �ȼ�
var FORM_X = 900;	//Div�ȿ� ǥ���Ǵ� ������
var FORM_Y = 500;	//Div�ȿ� ǥ���Ǵ� ������

//var COMM_X = 0;	//������ �Ǵ� WorkArea ���� �ȼ�
//var COMM_Y = 0;	//������ �Ǵ� WorkArea ���� �ȼ�
//var FORM_X = 0;	//Div�ȿ� ǥ���Ǵ� ������
//var FORM_Y = 0;	//Div�ȿ� ǥ���Ǵ� ������


// �޺���ư�� �⺻��
var COMBO_SEL = "--����--";
var COMBO_ALL = "��ü";
var COMBO_BLANK = " ";






/***************************************************************************************************
 * �����ư ���� 
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
//* �Լ�����     : ȸ��⺻���� 
//* �Լ�����     : 
//* parameter    : 
//* return value : ����
//* ���         :
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
//* �Լ�����     : ���ڵ� ����  
//* �Լ�����     : 
//* parameter    : 
//* return value : ����
//* ���         :
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
//* �Լ�����     : ����Ŭ���� ����ϴ� ��¥ �Լ�  
//* �Լ�����     : 
//* parameter    :  strDateType: TODAY, FIRSTDAY, LASTDAY
//*                 intCount: ���ҳ�¥
//*                 dateFormat: ����Ŭ ����


//* return value : ����
//* ���         :
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
//* �Լ�����     : PICOSPEC ��ȸ �Լ� 
//* �Լ�����     : 
//* parameter    : 
//* return value : ����
//* ���         :
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
//* �Լ�����     : �����ñ� �������� üũ �Լ�
//* �Լ�����     : 
//* parameter    : 
//* return value : ����
//* ���         :
//*-----------------------------------------------------------------------------------------------
function gfn_get_calc_gbn(COM_ID, BRCH_ID)
{
	
	// GDS_PICOSPEC_BAS �� �ֱ� 
	gfn_get_picospec(COM_ID, BRCH_ID);
	
	return GDS_PICOSPEC_BAS.GetColumn(0,"CALC_GBN");
}



/***************************************************************************************************
 * ����� ���� ��������  
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
 * ��밡���� ȸ�� üũ 
 *
 * @param  FORM_ID  �޴�ID
 * @param  sel_flag  S: �������缱��, M: �������缱�� 
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
	
	// ���� ���õ� ȸ����  loop�� ���鼭 ������ ���ٸ� ����. 
	for(var i = GDS_CMPNY_BAS.rowcount; i >= 0; i--)
	{
		if(gds_auth_list.FindRow("MNG_COM_ID",GDS_CMPNY_BAS.GetColumn(i,"COM_ID")) < 0)
		{
			GDS_CMPNY_BAS.DeleteRow(i);
		}
	}
	
	// ���� ���ϼ����ε� ��Ƽ���� �ִٸ� ���δ� CLEAR�Ѵ�.
	// �ֳĸ� ��� ȸ�縦 �����ؾ� ���� �𸣱� �����̴�.
	if(sel_flag == "S" && GDS_CMPNY_BAS.rowcount > 1)
	{
		GDS_CMPNY_BAS.ClearData();
	}
}

/***************************************************************************************************
 * ��밡���� ���� üũ 
 *
 * @param  FORM_ID  �޴�ID
 * @param  sel_flag  S: �������缱��, M: �������缱�� 
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
	
	// ���� ���õ� ������  loop�� ���鼭 ������ ���ٸ� ����. 
	for(var i = GDS_BRCH_BAS.rowcount; i >= 0; i--)
	{
		if(GDS_AUTH_LST.FindRow("MNG_BRCH_ID",GDS_BRCH_BAS.GetColumn(i,"BRCH_ID")) < 0)
		{
			GDS_BRCH_BAS.DeleteRow(i);
		}
	}
	
	// ���� ���ϼ����ε� ��Ƽ���� �ִٸ� ���δ� CLEAR�Ѵ�.
	// �ֳĸ� ��� ȸ�縦 �����ؾ� ���� �𸣱� �����̴�.
	if(sel_flag == "S" && GDS_BRCH_BAS.rowcount > 1)
	{
		GDS_BRCH_BAS.ClearData();
	}

}


/***************************************************************************************************
 * ��밡���� ���� �޺� ����� 
 *
 * @param  pCombo  �޺�ID
 * @param  FORM_ID  �޴�ID
 * @param  sel_flag  S: �������缱��, M: �������缱�� 
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

	
	// �⺻���� ������ �߰� 
	if(length(pFirstSel) > 0){
		GDS_AUTH_LST.InsertRow(0);
		GDS_AUTH_LST.SetColumn(0, "MNG_BRCH_ID", "");
		GDS_AUTH_LST.SetColumn(0, "MNG_BRCH_NM", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// ���ð��� ������ ���� �ƴϸ� ù°��
	if(pValue != ""){
		
		pCombo.Value = pValue;
	}	
	else{
		pCombo.index = 0;
	}
		
	// �۷ι� �����ͼ��� 1���̸� �װ��� �����Ѵ�.
	if(GDS_BRCH_BAS.rowcount == 1)
	{
		pCombo.Value = GDS_BRCH_BAS.GetColumn(GDS_BRCH_BAS.currow,"BRCH_ID");
	}
		
}






/***************************************************************************************************
 * �����ڵ� �޺��� Dataset�� ����
 *
 * @param  pCombo  Combo ������Ʈ
 * @param  pComCd  �����ڵ�
 * @param  [pFirstSel] ù�׸����� �� ���� ����
 *         'COMBO_ALL': ��ü 
 *         'COMBO_SEL' :�����ϼ���
 * @param  pDsName ������ DataSet�̸�
 * @return  none
***************************************************************************************************/





// TFramework���� ����ϴ� ���뺯�� 
var logTrace;
var resultCode;
var resultMessage;
var popupyn;
var naviyn;
var FnOnSize;

/***************************************************************************************************
 * DataSet�� Ư�� �÷��� �迭�� ������ִ� �Լ�
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
 * DataSet�� Ư�� �÷��� ���ڿ��� ������ִ� �Լ�
 *
 * @param  pDataSet			DataSet
 * @param  pColid			column id
 * @param  pJoinStr			���Ṯ�� 
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
 * Excel�� �����ϴ� �Լ� 
 *
 * @param  pGrid			Grid
***************************************************************************************************/
function gfn_exportExcel(pGrid, pExcelName)
{
	pGrid.ExportExcelEx(pExcelName);
}


/***************************************************************************************************
 * ������� �ʼ� �Է����� ������Ʈ UserData = '�ʼ��Է¸�' ���� üũ�Ѵ�.
***************************************************************************************************/
function gfn_requiredFieldCheck(obj, pMessage) 
{

	if(obj == null) return false;
	
	if(length(obj.Value) == 0)
	{
		var rtn = gfn_popup_message("modal", "error", "�ʼ��׸��� �Է��Ͻʽÿ�", "Ȯ��");
		obj.setFocus();
		return false;
	}
	return true;
}




/***************************************************************************************************
 * ���� callback
 *
 * @param  none
 * @return  none
***************************************************************************************************/
function gfn_callback(svcID, errorCode, errorMsg)
{
	gfn_showProgressWindow(false);

//	alert(svcID+','+errorCode+','+errorMsg +','+resultCode+','+resultMessage);

	
//	alert(resultCode);


	// �����ϰ��
	if( resultCode == 0 ) 
	{
		fn_callback(svcID, errorCode, errorMsg);
	}
	else 
	{
		gfn_popup_message("modal", "error", resultMessage, "����/���");	// �����˾�
		
		fn_callback(svcID, '-1', resultMessage);
	}
}


/***************************************************************************************************
 * gfn_dsToString : dataset�� string���� ��ȯ�ؼ� �ѱ� 
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
 * gfn_Transaction : ���� Transaction �Լ� 
 * @param pSvcID		���� ID
 * @param pURL			URL
 * @param pInDs			input Dataset
 * @param pOutDs		Output Dataset
 * @param pArg			�Ķ����
 * @param [pCallBack]		�ݹ��Լ�
***************************************************************************************************/
function gfn_Transaction(pSvcID, pURL, pInDs, pOutDs, param, pCallBack)
{		
	Transaction(pSvcID, pURL, pInDs, pOutDs, param, pCallBack);
}

/***************************************************************************************************
 * gfn_Transaction : ���� Sync Transaction �Լ� 
 * @param pSvcID		���� ID
 * @param pURL			URL
 * @param pInDs			input Dataset
 * @param pOutDs		Output Dataset
 * @param pArg			�Ķ����
 * @param [pCallBack]		�ݹ��Լ�
***************************************************************************************************/
function gfn_SyncTransaction(pSvcID, pURL, pInDs, pOutDs, param, pCallBack)
{		
	Http.Sync = true;
	Transaction(pSvcID, pURL, pInDs, pOutDs, param, pCallBack);
	Http.Sync = false;
}


/***************************************************************************************************
 * global �����ڵ� ���� ������ ä���ֱ� 
 *
 * @param  
 * @return  none
***************************************************************************************************/
function gfn_initCodeDataSet(){

	gfn_fillCodeDataSet();

}
/***************************************************************************************************
 * insa global �����ڵ� ���� ������ ä���ֱ� 
 *
 * @param  
 * @return  none
***************************************************************************************************/
function gfn_insa_initCodeDataSet(){

	gfn_insafillCodeDataSet();

}

/***************************************************************************************************
 * global dataset�� ���� ä���ֱ� 
 *
 * @param  pCombo  Combo ������Ʈ
 * @param  pComCd  �����ڵ�
 * @param  [pFirstSel] ù�׸����� �� ���� ����
 *         'COMBO_ALL': ��ü 
 *         'COMBO_SEL' :�����ϼ���
 * @param  pDsName ������ DataSet�̸�
 * @param  pFilterStr ���Ͱ�
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
 * �ڵ�� �������� 
 *
 * @param  pCombo  Combo ������Ʈ
 * @param  pComCd  �����ڵ�
 * @param  [pFirstSel] ù�׸����� �� ���� ����
 *         'COMBO_ALL': ��ü 
 *         'COMBO_SEL' :�����ϼ���
 * @param  pDsName ������ DataSet�̸�
 * @param  pFilterStr ���Ͱ�
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
 * �⵵ �޺�
 *
 * @param  pCombo  Combo ������Ʈ
 * @param  pValue  ���õɰ�
 * @param  [pFirstSel] ù�׸����� �� ���� ����
 *         'COMBO_ALL': ��ü 
 *         'COMBO_SEL' :�����ϼ���
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
 	
 	// 1900 ~ 2100 ����� �ѷ��ֱ�
 	for(var i=2100;i>1900;i--)
 	{
		tRow = objDs.AddRow();
		objDs.SetColumn(tRow,"yyyy_cd",i);
		objDs.SetColumn(tRow,"yyyy_nm",i+" ��");
 	}
 	
	
	
	// �⺻���� ������ �߰� 
	if(length(pFirstSel) > 0){
		objDs.InsertRow(0);
		objDs.SetColumn(0, "yyyy_cd", "");
		objDs.SetColumn(0, "yyyy_nm", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// ���ð��� ������ ���� �ƴϸ� ù°��
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
	
}

/***************************************************************************************************
 * �� �޺�
 *
 * @param  pCombo  Combo ������Ʈ
 * @param  pValue  ���õɰ�
 * @param  [pFirstSel] ù�׸����� �� ���� ����
 *         'COMBO_ALL': ��ü 
 *         'COMBO_SEL' :�����ϼ���
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
 	
 	// 1~ 12 ������ �ѷ��ֱ�
 	for(var i=1;i<=12;i++)
 	{
		tRow = objDs.AddRow();
		if(i<=9)
			objDs.SetColumn(tRow,"mm_cd","0"+i);
		else
			objDs.SetColumn(tRow,"mm_cd",i);
		objDs.SetColumn(tRow,"mm_nm",i+" ��");
 	}
 	
	
	
	// �⺻���� ������ �߰� 
	if(length(pFirstSel) > 0){
		objDs.InsertRow(0);
		objDs.SetColumn(0, "mm_cd", "");
		objDs.SetColumn(0, "mm_nm", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// ���ð��� ������ ���� �ƴϸ� ù°��
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
	
}

/***************************************************************************************************
 * �� �޺�
 *
 * @param  pCombo  Combo ������Ʈ
 * @param  pValue  ���õɰ�
 * @param  [pFirstSel] ù�׸����� �� ���� ����
 *         'COMBO_ALL': ��ü 
 *         'COMBO_SEL' :�����ϼ���
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
 	
 	// 1~ 31���� �ѷ��ֱ�
 	for(var i=1;i<=31;i++)
 	{
		tRow = objDs.AddRow();
		if(i<=9)
			objDs.SetColumn(tRow,"mm_cd","0"+i);
		else
			objDs.SetColumn(tRow,"mm_cd",i);
		objDs.SetColumn(tRow,"mm_nm",i+" ��");
 	}
 	
	// ���Ͽɼ��� 99�� �ִ´�.
	tRow = objDs.AddRow();
	objDs.SetColumn(tRow,"mm_cd",'99');
	objDs.SetColumn(tRow,"mm_nm","����");
	
	
	// �⺻���� ������ �߰� 
	if(length(pFirstSel) > 0)
	{
		objDs.InsertRow(0);
		objDs.SetColumn(0, "mm_cd", "");
		objDs.SetColumn(0, "mm_nm", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// ���ð��� ������ ���� �ƴϸ� ù°��
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
	
}

/***************************************************************************************************
 * �� �޺�
 *
 * @param  pCombo  Combo ������Ʈ
 * @param  pValue  ���õɰ�
 * @param  [pFirstSel] ù�׸����� �� ���� ����
 *         'COMBO_ALL': ��ü 
 *         'COMBO_SEL' :�����ϼ���
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
 	
 	// 1~ 24 �ñ��� �ѷ��ֱ�
 	for(var i=1;i<=24;i++)
 	{
		tRow = objDs.AddRow();
		if(i<=9)
			objDs.SetColumn(tRow,"hh_cd","0"+i);
		else
			objDs.SetColumn(tRow,"hh_cd",i);
		objDs.SetColumn(tRow,"hh_nm",i+"��");
 	}
 	
	
	
	// �⺻���� ������ �߰� 
	if(length(pFirstSel) > 0){
		objDs.InsertRow(0);
		objDs.SetColumn(0, "hh_cd", "");
		objDs.SetColumn(0, "hh_nm", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// ���ð��� ������ ���� �ƴϸ� ù°��
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
	
}

/***************************************************************************************************
 * �� �޺�
 *
 * @param  pCombo  Combo ������Ʈ
 * @param  pValue  ���õɰ�
 * @param  [pFirstSel] ù�׸����� �� ���� ����
 *         'COMBO_ALL': ��ü 
 *         'COMBO_SEL' :�����ϼ���
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
 	
 	// 0 ~ 60 �б��� �ѷ��ֱ�
 	for(var i=1;i<=60;i++)
 	{
		if(i%pTerm == 0)
		{
			
			tRow = objDs.AddRow();
			if(i<=9)
				objDs.SetColumn(tRow,"mi_cd","0"+i);
			else
				objDs.SetColumn(tRow,"mi_cd",i);
			objDs.SetColumn(tRow,"mi_nm",i+"��");
		}
 	}
 	
	
	
	// �⺻���� ������ �߰� 
	if(length(pFirstSel) > 0){
		objDs.InsertRow(0);
		objDs.SetColumn(0, "mi_cd", "");
		objDs.SetColumn(0, "mi_nm", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// ���ð��� ������ ���� �ƴϸ� ù°��
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
	
}

/***************************************************************************************************
 * �Ⱓ(~��) �޺�
 *
 * @param  pCombo  Combo ������Ʈ
 * @param  pValue  ���õɰ�
 * @param  [pFirstSel] ù�׸����� �� ���� ����
 *         'COMBO_ALL': ��ü 
 *         'COMBO_SEL' :�����ϼ���
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
 	
 	// 1~ 10 ����� �ѷ��ֱ�
 	for(var i=1;i<=10;i++)
 	{
		tRow = objDs.AddRow();
		objDs.SetColumn(tRow,"trm_cd",i);
		objDs.SetColumn(tRow,"trm_nm",i+" ��");
 	}
 	
	
	
	// �⺻���� ������ �߰� 
	if(length(pFirstSel) > 0){
		objDs.InsertRow(0);
		objDs.SetColumn(0, "trm_cd", "");
		objDs.SetColumn(0, "trm_nm", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// ���ð��� ������ ���� �ƴϸ� ù°��
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
	
}


/***************************************************************************************************
 * �ܼ����� �޺�
 *
 * @param  pCombo  Combo ������Ʈ
 * @param  pValue  ���õɰ�
 * @param  [pFirstSel] ù�׸����� �� ���� ����
 *         'COMBO_ALL': ��ü 
 *         'COMBO_SEL' :�����ϼ���
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
 	
 	// 1~ 10 ���� �ѷ��ֱ�
 	for(var i=1;i<=10;i++)
 	{
		tRow = objDs.AddRow();
		objDs.SetColumn(tRow,"snp_cd",i);
		objDs.SetColumn(tRow,"snp_nm",i);
 	}
 	
	
	
	// �⺻���� ������ �߰� 
	if(length(pFirstSel) > 0){
		objDs.InsertRow(0);
		objDs.SetColumn(0, "snp_cd", "");
		objDs.SetColumn(0, "snp_nm", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// ���ð��� ������ ���� �ƴϸ� ù°��
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
	
}

/***************************************************************************************************
 * �����ڵ� �޺�
 *
 * @param  pCombo  Combo ������Ʈ
 * @param  pComCd  �����ڵ�
 * @param  pValue  ���õɰ�
 * @param  [pFirstSel] ù�׸����� �� ���� ����
 *         'COMBO_ALL': ��ü 
 *         'COMBO_SEL' :�����ϼ���
 * @param  pDsName  dataset ��
 * @param  pFilterStr filter�� ���� ���ǽ� 
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
	
	// �⺻���� ������ �߰� 
	if(length(pFirstSel) > 0){
		objDs.InsertRow(0);
		objDs.SetColumn(0, "DTL_CD", "");
		objDs.SetColumn(0, "DTL_NM", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// ���ð��� ������ ���� �ƴϸ� ù°��
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
	
	gds_code.UnFilter();
}


/***************************************************************************************************
 * �����ڵ� + DataSet �޺�
 *
 * @param  pCombo  Combo ������Ʈ
 * @param  pDsName  �Է� DataSet ��
 * @param  pValue  ���õɰ�
 * @param  [pFirstSel] ù�׸����� �� ���� ����
 *         'COMBO_ALL': ��ü 
 *         'COMBO_SEL' :�����ϼ���
 * @param  pFilterStr filter�� ���� ���ǽ� 
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
 	
 	// �⺻���� ������ �߰� 
	if(length(pFirstSel) > 0){
		objDs.InsertRow(0);
		objDs.SetColumn(0, "DTL_CD", "");
		objDs.SetColumn(0, "DTL_NM", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// ���ð��� ������ ���� �ƴϸ� ù°��
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
}


/***************************************************************************************************
 * DataSet �޺�
 *
 * @param  pCombo  Combo ������Ʈ
 * @param  pDsName  �Է� DataSet ��
 * @param  codeCol  codeColumn ��
 * @param  dataCol  dataColumn ��
 * @param  pValue  ���õɰ�
 * @param  [pFirstSel] ù�׸����� �� ���� ����
 *         'COMBO_ALL': ��ü 
 *         'COMBO_SEL' :�����ϼ���
 * @param  pFilterStr filter�� ���� ���ǽ� 
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
	
	// �⺻���� ������ �߰� 
	if(length(pFirstSel) > 0){
		objDs.InsertRow(0);
		objDs.SetColumn(0, codeCol, "");
		objDs.SetColumn(0, dataCol, decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
	}
	
	// ���ð��� ������ ���� �ƴϸ� ù°��
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
	
}






/***************************************************************************************************
�����ڵ� + DataSet �������
pRadio : ���� �ڽ� Object 
pComCd : ���� �׷� �ڵ� String
pDsName : ���� �ڵ�� ���� DataSet �� String
pBindDataset : Bind�� DataSet �� String
pColumn   : Bind�� Column �� String 
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
���� �ڵ带 �������
pRadio : ���� �ڽ� Object 
pComCd : ���� �׷� �ڵ� String
pDsName : ���� �ڵ�� ���� DataSet �� String
pBindDataset : Bind�� DataSet �� String
pColumn   : Bind�� Column �� String 
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
 * @param  pRadio  Radio ������Ʈ
 * @param  pDsName  �Է� DataSet ��
 * @param  codeCol  codeColumn ��
 * @param  dataCol  dataColumn ��
 * @param  pValue  ���õɰ�
 * @param  [pFirstSel] ù�׸����� �� ���� ����
 *         'Radio_ALL': ��ü 
 *         'Radio_SEL' :�����ϼ���
 * @param  pFilterStr filter�� ���� ���ǽ� 
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

	// ���ð��� ������ ���� �ƴϸ� ù°��
	if(pValue != ""){
		pRadio.Value = pValue;
	}
	
}


/***************************************************************************************************
	1. �Լ���   : gfn_SetCmnCheckBox
	2. �Ķ���� : chkName      -  üũ�ڽ���
			 	  pComCd       -  �����ڵ�
			 	  pValue      -  ���ð�
			 	  onClickFunction        -  onClick �̺�Ʈ �Լ�  
			 	  p_left       -  left 
			 	  p_top      -  top 
			 	  p_width     -  width 
			 	  positionFlag        -  ����, ���� ��ġ ���� (row or col)
	3. �Լ����� : ���� üũ�ڽ� ����Ʈ 
    4. ���ϰ�   : ����.
  
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
*	1. �Լ���   : gfn_SaveExcelContents
*	2. �Ķ���� : fileDialogId - FileDialog ���̵�
*	              gridId       - �׸��� ���̵�
*	              filePath     - ������ ������ ��ġ
*	              fileName     - ������ ���� �̸�
*	              excelName    - ���� ��Ʈ �̸�
*	              excelOpen    - ���� �Ŀ� ���� ���� ���� ���� (true or false)
*	3. �Լ����� : �׸����� ������ ������ �����ϴ� �Լ�
*   4. ���ϰ�   : ����
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
		ExportObject1.CloseWorkBook();    //�����ݱ�
	}
	
	ExportObject1.Close();
	ExportObject1 = null;
}




var resultCode;
var resultMessage;

/**
*	1. �Լ���   : gfn_showProgressWindow
*	2. �Ķ���� : visibleFlag - ���̴� ����
			 	  formID      - �� ���̵�	
*	3. �Լ����� : ���α׷��� �˾�â
*   4. ���ϰ�   : ����.
*   
*/ 
var _showProgressWindow_currentComponent = null; //* Ʈ������ �߻� ������Ʈ.

function gfn_showProgressWindow(visibleFlag, formID)
{
	
	// ��â�� �߹Ƿ� ��Ŀ���� �Ҿ������.
	// �׷��� ��Ȱ��ȭ 
	
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
*	1. �Լ���   : gfn_showProgressDeviceWindow
*	2. �Ķ���� : visibleFlag - ���̴� ����
			 	  formID      - �� ���̵�	
*	3. �Լ����� : ���� ��� ���α׷��� �˾�â
*   4. ���ϰ�   : ����.
*   
*/ 
var _showProgressDeviceWindow_currentComponent = null; //* Ʈ������ �߻� ������Ʈ.

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
*	1. �Լ���   : gfn_GetFtpFile
*	2. �Ķ���� : filepath     - ����Ʈ ������ ���(��Ʈ ������ ���)
*	              filename     - ����Ʈ ������ ���ϸ�
*	              savefilepath - ������ ������ ���
*	              savefilename - ������ ���ϸ�
*	              ftp_ip       - FTP IP
*	              ftp_id       - FTP ����
*	              ftp_pass     - FTP �н�����
*	              ftp_port     - FTP ��Ʈ
*	3. �Լ����� : FTP�� ���� �ٿ�ε�
*   4. ���ϰ�   : ����
*   
*/ 
function gfn_GetFtpFile(filepath, filename, savefilepath, savefilename, ftp_ip, ftp_id, ftp_pass, ftp_port)
{
	if((filepath == null) || (filepath == '')){
		alert("����Ʈ ������ ��θ� �Է����ּ���.");
		return;
	}else if((filename == null) || (filename == '')){
		alert("����Ʈ ������ ���ϸ��� �Է����ּ���.");
		return;
	}else if((savefilepath == null) || (savefilepath == '')){
		alert("������ ������ ��θ� �Է����ּ���.");
		return;
	}else if((savefilename == null) || (savefilename == '')){
		alert("������ ���ϸ��� �Է����ּ���.");
		return;
	}else if((ftp_ip == null) || (ftp_ip == '')){
		alert("FTP IP�� �Է����ּ���.");
		return;
	}else if((ftp_id == null) || (ftp_id == '')){
		alert("FTP ������ �Է����ּ���.");
		return;
	}else if((ftp_pass == null) || (ftp_pass == '')){
		alert("FTP �н����带 �Է����ּ���.");
		return;
	}else if((ftp_port == null) || (ftp_port == '')){
		alert("FTP ��Ʈ�� �Է����ּ���.");
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
		alert(" FTP ���� ����.");
		return;
	}
	
	//* FTP ���丮 �̵�
	ret = CommonFtp.ChangeDir(filepath);
	
	if(ret < 0) {
		Trace("���丮 �̵��� ���� �߻�!");
		return;
	}

	Trace("filename : " + filename + " , Path : "+savefilepath + "\\" + savefilename);
	
	//* FTP ���� �ٿ�ε�
	ret = CommonFtp.GetFile(filename, savefilepath + "\\" + savefilename);
	
	Trace("ret [" + ret + "]");
	
	if (ret < 0) {
		alert("Get File����");
		return;
	}
		alert("File �������� ����");
	Trace("ret [" + ret + "]");
	CommonFtp.Close();

	return ret;
}


 /**
*	1. �Լ���   : gfn_DeleteFtpFile
*	2. �Ķ���� : savefilepath - ����Ʈ ������ ���(��Ʈ ������ ���)
*	              savefilename - ����Ʈ ������ ���ϸ�
*	              ftp_ip       - FTP IP
*	              ftp_id       - FTP ����
*	              ftp_pass     - FTP �н�����
*	              ftp_port     - FTP ��Ʈ
*	3. �Լ����� :  FTP�� ������ ����
*   4. ���ϰ�   : ����
*   
*/ 
function gfn_DeleteFtpFile(savefilepath, savefilename, ftp_ip, ftp_id, ftp_pass, ftp_port)
{
	if((savefilepath == null) || (savefilepath == '')){
		alert("����Ʈ ������ ��θ� �Է����ּ���.");
		return;
	}else if((savefilename == null) || (savefilename == '')){
		alert("����Ʈ ���ϸ��� �Է����ּ���.");
		return;
	}else if((ftp_ip == null) || (ftp_ip == '')){
		alert("FTP IP�� �Է����ּ���.");
		return;
	}else if((ftp_id == null) || (ftp_id == '')){
		alert("FTP ������ �Է����ּ���.");
		return;
	}else if((ftp_pass == null) || (ftp_pass == '')){
		alert("FTP �н����带 �Է����ּ���.");
		return;
	}else if((ftp_port == null) || (ftp_port == '')){
		alert("FTP ��Ʈ�� �Է����ּ���.");
		return;
	}

	var file_size;
	var ret ;
	var strAttr = 'Height="1" Left="1" Width="1" ';

	if (Find("Ftp") == NULL) {
		Create("Ftp", "CommonFtp", strAttr);
	}
	
	trace("ftp ����");
	
	//* FTP Connect - DB���� FTP ��ġ
	ret = CommonFtp.Open(ftp_ip, ftp_id, ftp_pass, ftp_port);
	
	if (ret < 0) {
		alert(" FTP ���� ����.");
		return -1;
	}

	//* FTP ���丮 �̵�
	ret = CommonFtp.ChangeDir(savefilepath);

	if (ret < 0) {
		Trace("���丮 �̵��� ������ ���� ���丮�� ������");
		CommonFtp.MakeDir(savefilepath);
		CommonFtp.ChangeDir(savefilepath);
	}
	
	trace("savefilename : "+savefilename);
	
	//* ������ ���� ���θ� Ȯ��
	ret = CommonFtp.ExistFile(savefilename);
	
	if (ret < 0) {
		CommonFtp.Close();
		alert("File�� �������� �ʾ� ������ �Ҽ� �����ϴ�.");
		return -1;
	}
	//* ������ ���� ��
	ret = CommonFtp.RemoveFile(CommonFtp.GetCurrentDir() + "/" + savefilename);
	
	if(ret < 0){
		CommonFtp.Close();
		alert("File ���� ����");
		return -1;
	
	}else{
		alert("File ���� ����");
		CommonFtp.Close();
		return ret;
	}
}


/**
*	1. �Լ���   : gfn_UploadFtpFile
*	2. �Ķ���� : filefullname - ������ ������ ��α��� ������ ��ü �̸�
*	              ftpSavepath  - ����Ʈ ������ ���(��Ʈ ������ ���) 
*	              savefilename - ����Ʈ ������ ���ϸ�
*	              ftp_ip       - FTP IP
*	              ftp_id       - FTP ����
*	              ftp_pass     - FTP �н�����
*	              ftp_port     - FTP ��Ʈ
*	3. �Լ����� : FTP�� ���� ���ε�
*   4. ���ϰ�   : ����
*   
*/ 
function gfn_UploadFtpFile(filefullname, ftpSavepath, savefilename, ftp_ip, ftp_id, ftp_pass, ftp_port)
{

	var ret ;
	var strAttr = 'Height="1" Left="1" Width="1" ';
	
	if (Find("Ftp") == NULL) {	
		Create("Ftp", "CommonFtp", strAttr); 		
	} 
	 
	//Trace("ftp ����");
	// FTP Connect
	ret = CommonFtp.Open(ftp_ip, ftp_id, ftp_pass, ftp_port);
	
	//Trace("FTP ���ε� - ret [ "+ret+" ]");
	
	if(ret < 0){
		alert(" FTP ���� ����.");
		return 1;
	}	
	
	// FTP ���丮 �̵�
	ret = CommonFtp.ChangeDir(ftpSavepath);
	if( ret < 0 ){
		Trace("ftpSavepath : "+ftpSavepath);
		Trace("���丮 �̵��� ������ ���� ���丮�� ������");
		CommonFtp.MakeDir(ftpSavepath);
		CommonFtp.ChangeDir(ftpSavepath);
	}
	
	// FTP ���� ���ε�
	ret = CommonFtp.PutFile(filefullname, savefilename);		
	if(ret < 0){
		alert("���ε� ����");
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
*	1. �Լ���   : gfn_UploadFtpFile
*	2. �Ķ���� : httpfileObj  - ������ ������ ��α��� ������ ��ü �̸�
*	              filefullname - ����Ʈ ������ ���(��Ʈ ������ ���) 
*	              filename     - ����Ʈ ������ ���ϸ�
*	              nRow         - ataset Row Position 
*	              strCol       - Column ID (Progress ����)
*	              objState     - rogress ǥ�� Grid
*	3. �Լ����� : Result/Message/file Size	
*   4. ���ϰ�   : ����
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
= ��� : File Read
= �μ� : 			file Path
				 str_cookie		Cookie (parameter)
				 str_size			File Size
				 nRow					Dataset Row Position
				 strCol				Column ID (progress ����)
				 objState			progress ���� Grid
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
*	1. �Լ���   : gfn_loadExcelFile
*	2. �Ķ���� : pObjDs     - xcel�� �ε��� Dataset Component
*	              pHeaderFg  - ù �ο찡 ������� ���θ� true/false�� ����, default - false
*	3. �Լ����� : Excel������ �׸��忡 �ε��Ѵ�.
*                 ����! ���������� �����ͼ¿� ������� ����.
*   4. ���ϰ�   : ����
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
		//alert("������ �����ϴ�.");
		gfn_popup_message("modal", "confirm", "Excel ���� �ε忡 �����Ͽ����ϴ�.", "");
		return;
	}

	if(result == 0){
		//alert("Excel ���� �ε忡 �����Ͽ����ϴ�.");
		gfn_popup_message("modal", "confirm", "Excel ���� �ε忡 �����Ͽ����ϴ�.", "");
	}else{
		//alert("Excel ���� �ε忡 �����Ͽ����ϴ�.");
		gfn_popup_message("modal", "confirm", "Excel ���� �ε忡 �����Ͽ����ϴ�.", "");
	}
	
	return _fd_excel.FileName;
}

/**
*	1. �Լ���   : gfn_loadExampleExcelForm
*	2. �Ķ���� : objFile - FTP ��ü
*	              fileNm  - FTP�� �ҷ��� ���� �̸�
*	3. �Լ����� : ������� ���� ������ FTP�� �ҷ��´�.
*   4. ���ϰ�   : ����
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
	var ftp_ip       = "213.175.94.230"; // �׽�Ʈ�� ftp
	var ftp_id       = "user1";
	var ftp_pass     = "123qwe";
	var ftp_port     = "21";
	
	gfn_GetFtpFile(filepath, filename, savefilepath, savefilename, ftp_ip, ftp_id, ftp_pass, ftp_port);
}



/***************************************************************************************************
 * �����޴��� skin image ���� 
 *
 * @param  skinImg  
 * @param   obj  
 * @return  none
 * @���    ���� �׸��������� ����Ҷ� �̹��� ID�� ����� �ϰ� �����ϸ� �ȴ�.
            ����� ������
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
 * Split�� ��ϵ� ������Ʈ�� Resize�� ó���Ѵ�.
 * @param splHorz 	Split Horizontal
 * @param splVert 	Split Vertical
 * @param obj 		�̺�Ʈ�� �߻��� ��
 * @param nCx 		����
 * @param nCy 		����
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
 * gfn_FormOpenWindow �޴��̿��� �ٸ� ������ MDI â�� ����.
 *
 * @param sUrl		������ �� Url
 * @param sArg		Argument
 * @param sTitle	�� Ÿ��Ʋ��
 * ex) gfn_FormOpenWindow("main::test.xml", "�׽�Ʈ��", "test='1234'");
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
				//alert(sTitle+" �޴��� �̹� ���� �ֽ��ϴ�!");
				
				oForm[0].setFocus();
				rtnHandle = oForm[0].GetHandle();
				return rtnHandle;
			}
		}			
		sMenuId = sUrl;		
	}

	if(oForm != null){
		oForm[0].setFocus();
		//alert(sTitle+" �޴��� �̹� ���� �ֽ��ϴ�!");
		rtnHandle = oForm[0].GetHandle();
		return rtnHandle;
	}
	if(g_maxForm > 0 && gds_openForm.rowcount >= g_maxForm){
		var msg  = "�ִ� ���� ������ ���α׷� :" + g_maxForm + " �� \n\n";
			msg += "���µ� ���α׷� :" + gds_openForm.rowcount + " �� \n\n";
			msg += "�ִ� ���� ȭ�� ������ ���ֽñ� �ٶ��ϴ�.";
		gfn_commMsgForm("alert", msg, "", "Ȯ��");
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
 * gfn_MenuOpenWindow �޴����� MDI â�� ����.
 *
 * @param sMenuId	�޴�ID
 * @param oDs		Binding Dataset
 * @param sArg	    Argument
 *
***************************************************************************************************/
function gfn_MenuOpenWindow(sMenuId, oDs, sArg){

	var param = "";

	if(oDs == null) oDs = gds_Menu;
	
	// ������ â�� ������ �ش�â�� ��Ŀ�� 
	var oForm = global.AllWindows[sMenuID];
	if(oForm != null){
		oForm[0].setFocus();
	}
	else{
	
		if(g_maxForm > 0 && ToNumber(gds_openForm.rowcount) >= ToNumber(g_maxForm))
		{
			var msg  = "�ִ� ���� ������ ���α׷� :" + g_maxForm + " �� \n\n";
			    msg += "���µ� ���α׷� :" + gds_openForm.rowcount + " �� \n\n";
			    msg += "�ִ� ���� ȭ�� ������ ���ֽñ� �ٶ��ϴ�.";
			
			gfn_Popup_Message("modal", "confirm", msg, "Ȯ��");
			
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
 * gfn_MenuOpenWindow2 �޴����� MDI â�� ����.
 *
 * @param sMenuId	�޴�ID
 * @param oDs		Binding Dataset
 * @param sArg	    Argument
 * ����) �ش� �޴��� commonForm�� ����� �ʰ� url�� â�� ���� ����.
***************************************************************************************************/
function gfn_MenuOpenWindow2(sMenuId, oDs, sArg){

	var param = "";

	if(oDs == null) oDs = gds_Menu;
	
	// ������ â�� ������ �ش�â�� ��Ŀ�� 
	var oForm = global.AllWindows[sMenuID];
	if(oForm != null){
		oForm[0].setFocus();
	}
	else{
	
		if(g_maxForm > 0 && ToNumber(gds_openForm.rowcount) >= ToNumber(g_maxForm))
		{
			var msg  = "�ִ� ���� ������ ���α׷� :" + g_maxForm + " �� \n\n";
			    msg += "���µ� ���α׷� :" + gds_openForm.rowcount + " �� \n\n";
			    msg += "�ִ� ���� ȭ�� ������ ���ֽñ� �ٶ��ϴ�.";
			
			gfn_Popup_Message("modal", "confirm", msg, "Ȯ��");
			
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
 * �ϴ������ӿ� �޽��� ���
 * @param  pMsgCd ��ϵ� �޽��� �ڵ�
 * ex) gfn_commMsg(CO_MSG_CHK_0020);
***************************************************************************************************/
function gfn_commMsg(pMsgCd, pBindInfo) {
	//DocBottom.st_commMsg.text = gfn_getMessage(pMsgCd, pBindInfo);

	//DocBottom.TXT_MSG.text = "";
}


/***************************************************************************************************
 * �ϴ������ӿ� �޽��� ���2
 * @param  pMsgCd ��ϵ� �޽��� �ڵ�
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
 * ������ ���������� comonent�� ����
 * @param obj 		�̺�Ʈ�� �߻��� ��
 * @param sResize 	���������� component 
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
		trace("gfn_OnSize ����ũ��:" + FORM_X + "/" + FORM_Y +" ���� ����. ũ�⺯�� �Ұ�!");
		return;
	}
	*/
		
	gfn_SplitOnSize(obj.splHorz, obj.splVert, obj, nCx, nCy, nState);
}


/***************************************************************************************************
 * Enter�� Tab���� ��ȯ�ϴ� �����Լ� Form�� OnKeyDown�� ����
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


//�̺�Ʈ �̸����� �ε����� F(X)Ű �����Ŷ� ���ؼ� �ѱ��
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
