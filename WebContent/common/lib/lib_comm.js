/***************************************************************************************************
 * �ڵ��   : lib_comm
 * ���ϼ��� : �����ڵ�
 * ���糯¥ : 2011.03.22
 * ������   : ������
 * History  : 
***************************************************************************************************/



/*===============================================================
//= ��� : ��ü�˻������� ����� ��) ��*�� =>  ��_��
//= �μ� : 
//= 
//= ���� : 
//===============================================================*/
function gfnFullSearchStr(strValue)
{
	
	
	return Replace(strValue,"*","_");

}



/*===============================================================
//= ��� : ���ó�¥��������
//= �μ� : 
//= 
//= ���� : 
//===============================================================*/
function gfnGetToday(strFormat)
{
	var strToday =  Today();
	var yy = strToday.substr(0,4);
	var mm = strToday.substr(4,2);
	var dd = strToday.substr(6,2);
	
	return yy + strFormat + mm + strFormat + dd;

}

/*===============================================================
//= ��� : �����ϰ�������
//= �μ� : 
//= 
//= ���� : 
//===============================================================*/
function gfnGetFirstday(strFormat)
{
	var strToday =  Today();
	var yy = strToday.substr(0,4);
	var mm = strToday.substr(4,2);
	var dd = '01';
	
	return yy + strFormat + mm + strFormat + dd;

}




/*===============================================================
//= ��� : �Է¹��� from���κ��� �Է�to������ ��������ȯ�ϱ�
//= �μ� : rMonth-- ��ȯ�� ������Ʈ, fMonth ~����, tMonth~����
//= 
//= ���� : �Ѱ�����
//===============================================================*/
function gfnCalcMonth(fMonth,tMonth)
{
  var iMonth   = 0; //���� ������
  var iYear    = 0; //���� �⵵
  var rMonth   = 0; //��ȯ�� ������

  if(parseInt(fMonth) <= parseInt(tMonth)){
  	  iYear =  parseInt(tMonth.substr(0,4))- parseInt(fMonth.substr(0,4)) ;
  	  iMonth = parseInt(toNumber(tMonth.substr(4,2)))- parseInt(toNumber(fMonth.substr(4,2)));
  	 // alert(tMonth.substring(4,6) + ":::" +fMonth.substring(4,6))
  	  rMonth = (12 * iYear) + iMonth + 1;
  	  return rMonth;
   }else {
 	  return 0;
   }
}

/*===============================================================
= ��� : �Է¹��� from���κ��� �Է�to������ �ϼ� ��ȯ�ϱ�
= �μ� : rMonth-- ��ȯ�� ������Ʈ, fMonth ~����, tMonth~����
= 
= ���� : ���ϼ�
===============================================================*/
function gfnCalcDay(fdate,tdate)
{
  var iMonth    = 0; //���� ������
  var iYear     = 0; //���� �⵵
  var iday      = 0; //���� �ϼ�
  var iMonthday = 0; //���� ���� �ϼ�
  var rMonth    = 0; //��ȯ�� ������

  if(parseInt(fdate) <= parseInt(tdate)){
    
  	 iYear  = parseInt(tdate.substr(0,4)) - parseInt(fdate.substr(0,4)) ;
  	 iMonth = parseInt(toNumber(tdate.substr(4,2))) - parseInt(toNumber(fdate.substr(4,2)));
  	 
  	 //iday   = parseInt(toNumber(tdate.substr(6,2))) - parseInt(toNumber(fdate.substr(6,2)));
  	 // alert(tMonth.substring(4,6) + ":::" +fMonth.substring(4,6))
  	 
  	 if ( iMonth > 1 )
  	 {
    	 for( i=1 ;i < iMonth; i++)
    	 {
  	      iMonthday += gfnMonthLastDay( toNumber(fdate.substr(4,2)) + i );
  	   }
  	 }
  	 
  	 if( iMonth == 0 )
  	 {
    	 iday  =  parseInt(toNumber(tdate.substr(6,2))) - parseInt(toNumber(fdate.substr(6,2)));
  	 } else
  	 {
  	   iday  = gfnMonthLastDay( toNumber(fdate.substr(4,2))) - parseInt(toNumber(fdate.substr(6,2)));
  	   iday  = iday + parseInt(toNumber(tdate.substr(6,2)));
  	 }
  	 
  	 rMonth = (365 * iYear) + iMonthday + iday + 1;
  	  
  	 return rMonth;
  	  
   }else {
 	   return 0;
   }
}

function gfnMonthLastDay(fmonth)
{
  if ( fmonth == 1 )
    return 31;  
  if ( fmonth == 2 )
    return 29;  
  if ( fmonth == 3 )
    return 31;  
  if ( fmonth == 4 )
    return 30;  
  if ( fmonth == 5 )
    return 31;  
  if ( fmonth == 6 )
    return 30;  
  if ( fmonth == 7 )
    return 31;  
  if ( fmonth == 8 )
    return 31;  
  if ( fmonth == 9 )
    return 30;  
  if ( fmonth == 10 )
    return 31;  
  if ( fmonth == 11 )
    return 30;  
  if ( fmonth == 12 )
    return 31;
}


/***************************************************************************************************
 * �ֹι�ȣ null üũ �ϱ� :
 * @param  str 	string
 * 
 * @return  String
***************************************************************************************************/
function gfn_isNullSsn(str)
{
	var str_ssn = "";
	
	if(str == null || str == "" || str.length == 0) return true;
	
	// ��¥������ �⺻������ �����ϰ�� ____-__-__ �̵ȴ�. 
	// �̰��� Trim ó���Ѵ�.
	
	
	str_ssn = Replace(str,"-","");
	str_ssn = Replace(str_ssn,"_","");
	
	
	if(str_ssn == "")
	{
		return true;
	}
	else
	{
		
		return false;
	}
	
}


/***************************************************************************************************
 *  üũ�ڽ����� 0, 1 ���� Y, N ���� �ٲٱ�
 * @param  str 	string
 * 
 * @return  String
***************************************************************************************************/
function gfn_CheckYn(objIn)
{
	if(objIn == null) return "";
	
	if(objIn.Value == "1")
	{
		return "Y";
	}
	else
	{
		return "N";
	}
}

/***************************************************************************************************
 *  ���ڿ� 0, 1 ���� Y, N ���� �ٲٱ�
 * @param  str 	string
 * 
 * @return  String
***************************************************************************************************/
function gfn_StrYn(strIn)
{
	if(strIn == null) return "";
	
	if(strIn == "1")
	{
		return "Y";
	}
	else
	{
		return "N";
	}
}



/***************************************************************************************************
 * ��¥���ڿ� quote �ϱ� :
 * @param  str 	string
 * 
 * @return  String
***************************************************************************************************/
function gfn_DateQuote(str)
{
	if(str == null || str == "" || str.length == 0) return "";
	
	str = Replace(str,"-","");
	str = Replace(str,"_","");
	
	return quote(str);
	
}


/***************************************************************************************************
 * ��¥���ڿ� null �n, �ϱ� :
 * @param  str 	string
 * 
 * @return  String
***************************************************************************************************/
function gfn_isNullDate(str)
{
	var str_date = "";
	
	if(str == null || str == "" || str.length == 0) return true;
	
	// ��¥������ �⺻������ �����ϰ�� ____-__-__ �̵ȴ�. 
	// �̰��� Trim ó���Ѵ�.
	
	
	str_date = Replace(str,"-","");
	str_date = Replace(str_date,"_","");
	
	if(str_date == "")
	{
		return true;
	}
	else
	{
		
		return false;
	}
	
}


/*===============================================================
= ��� : �Է¹��� from���κ��� �Է�to������ "x �� x ���� x��" ��ȯ�ϱ�
= �μ� : rMonth-- ��ȯ�� ������Ʈ, fMonth ~����, tMonth~����
= 
= ���� : from �� to���� �������: x �� x ���� x��
=        from �� to���� Ŭ ���: false
===============================================================*/
function gfn_CalcDate(fdate,tdate)
{
	var totalDay = "";
	var rYear = "";
	var rMonth = "";
	var rDay = "";
	
	if(parseInt(fdate) <= parseInt(tdate)){
	
		var totalDay = ParseDateTime(tdate) - ParseDateTime(fdate); 	//���ϼ�
		var rYear = toInteger(totalDay / 365);
		var rMonth = toInteger((totalDay % 365)/30);
		var rDay = (toInteger(totalDay % 365) % 30);
	
		return rYear + "�� " + rMonth + "���� " + rDay + "��";
		
	}else{
		
		return false;
	}

}

/*****************************************************************************
* 1. �� �� �� : IsSaupno( saupno )
* 2. �Ķ���� : saupno : ����� ��Ϲ�ȣ('-'�� ����)
* 3. �� �� �� : ���� : true 
				���� : false
* 4. ��    �� : saupno�� �ش��ϴ� ����ڵ�Ϲ�ȣ�� validation�Ѵ�.
*****************************************************************************/
function gfn_IsSaupno( saupno )
{
	var				temp;

	if( Length(saupno) != 10 )
	{
		return false;
	}
	if( gfn_IsNumber( saupno ) == false )
	{
		return false;
	}
	temp = ToInteger(ToInteger(saupno[8])*5/10);
	if( ToInteger(saupno[9]) !=
		(( 10 - (((ToInteger(saupno[0])*1)%10 ) +
				((ToInteger(saupno[1])*3)%10 ) +
				((ToInteger(saupno[2])*7)%10 ) +
				((ToInteger(saupno[3])*1)%10 ) +
				((ToInteger(saupno[4])*3)%10 ) +
				((ToInteger(saupno[5])*7)%10 ) +
				((ToInteger(saupno[6])*1)%10 ) +
				((ToInteger(saupno[7])*3)%10 ) +
				temp +
				((ToInteger(saupno[8])*5)%10 ))%10)%10) )
	{
		return false;
	}

	return true;
}




//*------------------------------------------------------------------------------------------------
//* �Լ�����     : ��ȭ��ȣ ������(***-****-****)
//* �Լ�����     : 
//* parameter    : sVal: �Է� ��Ʈ��
//* return value : �������� ��ȭ��ȣ����
//*-----------------------------------------------------------------------------------------------


/*�ش� ��ȭ��ȣ �������� �Ѵ�.*/
function gfn_SetTelFormat(sVal , Option) {
/*

���� ��ȣ ���� ��ȣ ���� ��ȣ ���� ��ȣ 
���� 02 ��� 031 ��õ 032 ���� 033 
�泲 041 ���� 042 ��� 043 �λ� 051 
��� 052 �뱸 053 ��� 054 �泲 055 
���� 061 ���� 062 ���� 063 ���� 064 
*/
	
 	var s_length;
 	var seoul_YN = false;
 	var telNO;
 	
 	for(i=0; i <trim(sVal).length; i++){
 	
		
		if(substr(sval, i, 1) != "-"){
		
			TelNo = TelNo + substr(sval,i,1);
			
		}
	}
 	
 	s_length = Trim(TelNo).length();
 	
 	if(s_length < 9 || s_length > 11){
 		
		gfn_popup_message("modal", "error", "���Ŀ� �����ʴ� ��ȣ�Դϴ�.", "Ȯ��");
		return "";
		
	}else{
 	
		//trace(s_length +": "+seoul_YN );
		if(Option == "mobile") {
			if(s_length == "10") {
				
				TelNO = substr(TelNo, 0, 3) + "-" + substr(TelNo, 3, 3)+"-"+ substr(TelNo, 6);
			} else {
				TelNO = substr(TelNo, 0, 3) + "-" + substr(TelNo, 3, 4)+"-"+ substr(TelNo, 7);
			}
		} else {	
			
			if(TelNo.substr(0, 2) == "02") seoul_YN = true ;
			//���︸ ������ 2�ڸ�
			if(seoul_YN) {
				if(s_length == 10) {
					TelNO = substr(TelNo, 0, 2) + "-" + substr(TelNo, 2, 4)+"-"+ substr(TelNo, 6);
				} else if( s_length == 9) {
					TelNO = substr(TelNo, 0, 2) + "-" + substr(TelNo, 2, 3)+"-"+ substr(TelNo, 5);
				}
			} else {
				if(s_length == 11) {
					 TelNO = substr(TelNo, 0, 3) + "-" +substr(TelNo, 3, 4)+"-"+ substr(TelNo, 7);
				} else  if(s_length == 10) {
					TelNO = substr(TelNo, 0, 3) + "-" +substr(TelNo, 3, 3)+"-"+ substr(TelNo, 6);
				}
			}
		}
	}
	return TelNO;
}




//*------------------------------------------------------------------------------------------------
//* �Լ�����     : �Է°��� �������� Ȯ�� (��ȭ��ȣ ��� '-' ���)
//* �Լ�����     : 
//* parameter    : sVal: �Է� ��Ʈ��
//* return value : 0(����), -1(������) => �����̸� ���ڰ�
//*-----------------------------------------------------------------------------------------------

function gfn_IsTelNumber(sVal)
{
  
  	var i, iBit;
  	
  	var ll_str_len;
  	
  	ll_str_len = length(sVal);  //.length();

  	for(i=0; i<ll_str_len; i++)
  	{
	    	 
	    	var iBit = substr(sVal,i,1);
		
			if(iBit !='-'){
	    		    	 
				if((iBit < 0 ) || (9 < iBit))
				{
					return -1;
				} 
			}
  	}
 
  	return 0;
}


//*------------------------------------------------------------------------------------------------
//* �Լ�����     : �Է°��� �������� Ȯ��
//* �Լ�����     : 
//* parameter    : sVal: �Է� ��Ʈ��
//* return value : 0(����), -1(������) => �����̸� ���ڰ�
//*-----------------------------------------------------------------------------------------------

function gfn_IsNumber(sVal)
{
  
  	var i, iBit;
  	
  	var ll_str_len;
  	
  	ll_str_len = length(sVal);  //.length();

  	for(i=0; i<ll_str_len; i++)
  	{
	    	 
	    	var iBit = substr(sVal,i,1);
		
				if((iBit < 0 ) || (9 < iBit))
				{
					return -1;
				} 
	}
 
  	return 0;
}

//*------------------------------------------------------------------------------------------------
//* �Լ�����     : �Է°��� Ư���������� Ȯ�� 
//* �Լ�����     : 
//* parameter    : value: �Է� ��Ʈ��
//* return value : 
//*-----------------------------------------------------------------------------------------------
function gfn_IsChar(value) {

	var chkstr = "'^*#"; //�̰��� Ư�����ڸ� �־��ֽø� �˴ϴ�.
		
	for (var i = 0; i < length(value); i++) {
			
		if (indexof(chkstr,substr(value,i,1)) >= 0) {
			
			return false;
		}
	}
	return true;
} 

//*------------------------------------------------------------------------------------------------
//* �Լ�����     : ����������ȸ
//* �Լ�����     : 
//* parameter    : sCOM_ID, sCorp_cd, sEno: ���
//* �Լ�����     : ds_empInfo �����ͼ��� �����Ͽ� ���������� �����´�.
//* return value : 
//*
//*-----------------------------------------------------------------------------------------------

function gfn_getEmpInfo(pCmpnyCd, pCorpCd, pEno)
{
 	var objDs;
	var p_COM_ID = pCmpnyCd;
	var p_copr_cd = pCorpCd;
	var p_eno = pEno;
	
	// 1. �۷ι� �����ͼ� �ʱ�ȭ
	gds_emp_info.ClearData();
/*
	pDsName = "ds_empInfo";
	
	Create("Dataset",pDsName);
	objDs = object(pDsName);

 	objDs.AddColumn("COM_ID","STRING", 256);
 	objDs.AddColumn("COM_NM","STRING", 256);
	objDs.AddColumn("corp_cd","STRING", 256);
	objDs.AddColumn("corp_nm","STRING", 256);
	objDs.AddColumn("eno","STRING", 256);
	objDs.AddColumn("ssn","STRING", 256);
	objDs.AddColumn("vw_pla_cd","STRING", 256);
	objDs.AddColumn("vw_pla_nm1","STRING", 256);
	objDs.AddColumn("vw_pla_nm2","STRING", 256);
	objDs.AddColumn("vw_pla_nm3","STRING", 256);
	objDs.AddColumn("vw_pla_nm4","STRING", 256);
	objDs.AddColumn("vw_pla_nm5","STRING", 256);
	objDs.AddColumn("tr_pla_cd","STRING", 256);
	objDs.AddColumn("tr_pla_nm1","STRING", 256);
	objDs.AddColumn("tr_pla_nm2","STRING", 256);
	objDs.AddColumn("tr_pla_nm3","STRING", 256);
	objDs.AddColumn("tr_pla_nm4","STRING", 256);
	objDs.AddColumn("tr_pla_nm5","STRING", 256);
	objDs.AddColumn("psit_cd","STRING", 256);
	objDs.AddColumn("psit_nm","STRING", 256);
	objDs.AddColumn("dty_cd","STRING", 256);
	objDs.AddColumn("dty_nm","STRING", 256);
	objDs.AddColumn("cur_ecmp_ymd","STRING", 256);
	objDs.AddColumn("retr_ymd","STRING", 256);
	objDs.AddColumn("kor_nm","STRING", 256);
	objDs.AddColumn("cur_pst_no","STRING", 256);
	objDs.AddColumn("cur_pst_seq","STRING", 256);
	objDs.AddColumn("cur_addr1","STRING", 256);
	objDs.AddColumn("cur_addr2","STRING", 256);
	objDs.AddColumn("hp_tel1","STRING", 256);
	objDs.AddColumn("mary_yn","STRING", 256);

	*/
	
	// 2. �������� �˻� Ʈ������
	svcID			= "Common.searchEmpInfo";
	url   			= "service::Common.searchEmpInfo.do";
	inDatasets  	= "";
	outDatasets 	= "gds_emp_info=Common.searchEmpInfo";
	argument    	= " _sqlName=Common.searchEmpInfo"
					+ " p_COM_ID=" + quote(p_COM_ID)
					+ " p_eno=" + quote(p_eno)
					;
	callbackFunc 	= "gfn_callback";
			
	gfn_Transaction(svcID, url, inDatasets, outDatasets, argument, callbackFunc);	
	
	
}

/***************************************************************************************************
 * ����üũ
 * @param  str 	string
 * ex) gfn_IsEmpty('aaa');
 * @return  boolean
***************************************************************************************************/
function gfn_IsEmpty(str)
{
	if(str == null || str == "" || str.length == 0)
		return true;
	else
		return false;
}

/***************************************************************************************************
 * ����üũ
 * @param  str 	string
 * ex) gfn_IsEmpty('aaa');
 * @return  string
***************************************************************************************************/
function gfn_toStr(str)
{
	if(str == null || str == "" || str.length == 0)
		return "";
	else
		return str;
}


/**
*	1. �Լ���   : gfn_AddComboData
*	2. �Ķ���� : Index     - �޺��ڽ� �ε���
*	              ds        - �����ͼ� ���̵�
*	              colName   - ���� ���� �÷���
*	              codevalue - ������� �� 
*	              name      - �̸��� ���� �÷��� 
*	              namevalue - �߰��� �̸�
*	3. �Լ����� : �޺��ڽ��� ���� �߰��Ѵ�.
*   4. ���ϰ�   : ����.
*   
*/ 
function gfn_AddComboData(index, dataSetId, colName, codevalue, name, namevalue)
{
	dataSetId.InsertRow(index);
	dataSetId.SetColumn(index, colName, codevalue);
	dataSetId.SetColumn(index, name, namevalue);
}


 /**
*	1. �Լ���   : gfn_GetNowDate
*	2. �Ķ���� : ����.
*	3. �Լ����� : ��¥�� ���ؿ´�. (��) 2000-01-01
*   4. ���ϰ�   : ����.
*   
*/ 
function gfn_GetNowDateTime()
{
	var tStrDate = getDate();
	tStrDate = substr(tStrDate,0,14);
	return tStrDate;
}


/**
*	1. �Լ���   : gfn_checkValues
*	2. �Ķ���� : obj       - üũ�� ������Ʈ
			 	  obj_name  - ������Ʈ �̸�
*	3. �Լ����� : ����Ʈâ � ���� �ִ��� üũ�Ѵ�.
*   4. ���ϰ�   : ����.
*   
*/ 
function gfn_CheckValues(obj, obj_name)
{
	if(length(obj.value) == 0) {
		alert("'" + obj_name + "'�� �Է����ּ���.");
		//gfn_popup_message("modal", "confirm",  "'" + obj_name + "'�� �Է����ּ���.", "");
		obj.SetFocus();
		obj.Setsel();
		return false;
	}else{
		return true;
	}			
}


/**
*	1. �Լ���   : gfn_fillGdsInsaCommMst
*	2. �Ķ���� : 
*	3. �Լ����� : gds_insa_mst Dataset�� ������� DataSet ä���
*   4. ���ϰ�   : ����.
*   
*/ 
function gfn_fillGdsInsaCommMst()
{
	
	// ����Ÿ���� ���� ������ �����´�. 
	if(gds_insa_mst.rowcount = 0)
	{
		var svcID			= "grobal.selectInsaCommCodeMst";
		var url   			= "service::grobal.selectInsaCommCodeMst.do";
		var inDatasets  	= "";
		var outDatasets 	= "gds_insa_mst=grobal.selectInsaCommCodeMst";
		var argument    	= " _sqlName=grobal.selectInsaCommCodeMst"
							;
		var callbackFunc 	= "gfn_callback";
	
		gfn_SyncTransaction(svcID, url, inDatasets, outDatasets, argument, callbackFunc);	
	
	}
}


/**
*	1. �Լ���   : gfn_fillGdsInsaCommBas
*	2. �Ķ���� : 
*	3. �Լ����� : gds_insa_bas Dataset�� ������� DataSet ä���
*   4. ���ϰ�   : ����.
*   
*/ 
function gfn_fillGdsInsaCommBas()
{
	
	// ����Ÿ���� ���� ������ �����´�. 
	if(gds_insa_bas.rowcount = 0)
	{
		var svcID			= "grobal.selectInsaCommCodeBas";
		var url   			= "service::grobal.selectInsaCommCodeBas.do";
		var inDatasets  	= "";
		var outDatasets 	= "gds_insa_bas=grobal.selectInsaCommCodeBas";
		var argument    	= " _sqlName=grobal.selectInsaCommCodeBas"
							;
		var callbackFunc 	= "fn_InsaComm_callback";
	
		gfn_SyncTransaction(svcID, url, inDatasets, outDatasets, argument, callbackFunc);	
	
	}
}


/**
*	1. �Լ���   : gfn_fillGdsInsaCommSub
*	2. �Ķ���� : 
*	3. �Լ����� : gds_insa_sub Dataset�� ������� DataSet ä���
*   4. ���ϰ�   : ����.
*   
*/ 
function gfn_fillGdsInsaCommSub()
{
	// ����Ÿ���� ���� ������ �����´�.
	if(gds_insa_sub.rowcount = 0)
	{
		var svcID			= "grobal.selectInsaCommCodeSub";
		var url   			= "service::grobal.selectInsaCommCodeBas.do";
		var inDatasets  	= "";
		var outDatasets 	= "gds_insa_sub=grobal.selectInsaCommCodeSub";
		var argument    	= " _sqlName=grobal.selectInsaCommCodeSub"
							;
		var callbackFunc 	= "gfn_callback";
		
		gfn_SyncTransaction(svcID, url, inDatasets, outDatasets, argument, callbackFunc);	
		
	}
}


/**
*	1. �Լ���   : gfn_insaCommComp
*	2. �Ķ���� : pCompCd  ȸ�� �ڵ�
				  pBigCd   ����� �ڵ�
				  pInsaCd  �λ���� �ڵ�
				  pLegCd    ������ �Ұ��� �ڵ�
				  pCodeCol  codeColumn �� 
				  pDataCol  dataColumn �� 
				  pValue    ���õɰ�  
				  pFirstData ù�׸����� �� ���� ����			 	  
*	3. �Լ����� : ȸ������ �λ���� �ڵ� �޺�
*   4. ���ϰ�   : ����.
*   
*/ 
function gfn_insaCommComp(pCombo, pCompCd, pBigCd, pInsaCd, pLegCd, pCodeCol, pDataCol, pValue, pFirstData)
{ 
	//alert('pCombo : '+pCombo+', pCompCd : '+pCompCd+', pBigCd : '+pBigCd+', pInsaCd : '+pInsaCd+', pLegCd : '+pLegCd+', pDataCol : '+pDataCol+', pCodeCol : '+pCodeCol+', pValue : '+pValue+', pFirstSel : '+pFirstSel+', pFirstData : '+pFirstData);

	gds_insa_sub.Filter("COM_ID=="+quote(pCompCd)+" && MST_CD == "+quote(pBigCd)+" && INSA_COMM_CD == "+quote(pInsaCd)+" && LEG_DTL_CD == "+quote(pLegCd));

    pCombo.CodeColumn   = pCodeCol;
	pCombo.DataColumn   = pDataCol;
	pCombo.InnerDataset = "gds_insa_sub";

	// �⺻���� ������ �߰� 
	if(length(pFirstData) > 0){
		gds_insa_sub.InsertRow(0);
		gds_insa_sub.SetColumn(0, pCodeCol, "");
		gds_insa_sub.SetColumn(0, pDataCol, pFirstData);
	}
	
	// ���ð��� ������ ���� �ƴϸ� ù°��
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
}


/**
*	1. �Լ���   : gfn_insaCommNoComp
*	2. �Ķ���� : pBigCd   ����� �ڵ�
				  pInsaCd  �λ���� �ڵ�
				  pCodeCol  codeColumn �� 
				  pDataCol  dataColumn �� 
				  pValue    ���õɰ�  
				  pFirstData ù�׸����� �� ���� ����			 	  
*	3. �Լ����� : ȸ������� �λ���� �ڵ� �޺�
*   4. ���ϰ�   : ����.
*   
*/ 
function gfn_insaCommNoComp(pCombo, pBigCd, pInsaCd, pCodeCol, pDataCol, pValue, pFirstData)
{ 
	//alert(pCombo+', '+pBigCd+', '+pInsaCd+', '+pCodeCol+', '+pDataCol+', '+pValue+', '+pFirstSel+', '+pFirstData);

	gds_insa_bas.Filter("MST_CD == "+quote(pBigCd)+" && INSA_COMM_CD == "+quote(pInsaCd));

    //objDs = object(gds_insa_sub);
    
    pCombo.CodeColumn   = pCodeCol;
	pCombo.DataColumn   = pDataCol;
	pCombo.InnerDataset = "gds_insa_bas";
	
	// �⺻���� ������ �߰� 
	if(length(pFirstData) > 0){
		gds_insa_bas.InsertRow(0);
		gds_insa_bas.SetColumn(0, pCodeCol, "");
		gds_insa_bas.SetColumn(0, pDataCol, pFirstData);
	}

	// ���ð��� ������ ���� �ƴϸ� ù°��
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
	
}


/**
*	1. �Լ���   : gfn_getDeptName
*	2. �Ķ���� : arrData   ����� �ڵ�		 	  
*	3. �Լ����� : FCOMM_ALL_PLA_NM �Լ��� ���Ϲ��� ���� "|" split �ؼ� �迭�� ����� �����Ѵ�.
*   4. ���ϰ�   : ����.
*   
*/ 
function gfn_getDeptName(arrData)
{
	var deptNmArr = arrData.split("|");
	return deptNmArr;
}
/*===============================================================
= ��� : ���ε�Ϲ�ȣ üũ
= �μ� : 
= 
= ���� : true(����), false(������)
===============================================================*/

function gfn_CheckCorpNo(vndr_reg_no)
{
 var strVndr_Reg_No,No_Chk;
 
 strVndr_Reg_No = replace(vndr_reg_no, " ", "");
 strVndr_Reg_No = replace(strVndr_Reg_No, "-", "");
 strVndr_Reg_No = replace(strVndr_Reg_No, "/", "");
 
 if (length(strVndr_Reg_No) != 13){
  return false;
 }
 else{
  No_Chk = No_Chk + toNumber(mid( strVndr_Reg_No, 0, 1 )) * 1;
  No_Chk = No_Chk + toNumber(mid( strVndr_Reg_No, 1, 1 )) * 2;
  No_Chk = No_Chk + toNumber(mid( strVndr_Reg_No, 2, 1 )) * 1;
  No_Chk = No_Chk + toNumber(mid( strVndr_Reg_No, 3, 1 )) * 2;
  No_Chk = No_Chk + toNumber(mid( strVndr_Reg_No, 4, 1 )) * 1;
  No_Chk = No_Chk + toNumber(mid( strVndr_Reg_No, 5, 1 )) * 2;
  No_Chk = No_Chk + toNumber(mid( strVndr_Reg_No, 6, 1 )) * 1;
  No_Chk = No_Chk + toNumber(mid( strVndr_Reg_No, 7, 1 )) * 2;
  No_Chk = No_Chk + toNumber(mid( strVndr_Reg_No, 8, 1 )) * 1;
  No_Chk = No_Chk + toNumber(mid( strVndr_Reg_No, 9, 1 )) * 2;
  No_Chk = No_Chk + toNumber(mid( strVndr_Reg_No, 10, 1 )) * 1;
  No_Chk = No_Chk + toNumber(mid( strVndr_Reg_No, 11, 1 )) * 2;
  
  No_Chk = No_Chk % 10;
  No_Chk = 10 - No_Chk;
  
  if (No_Chk > 9){
   No_Chk = 0;
  }
  
  if (toNumber(No_Chk) == toNumber(mid(strVndr_Reg_No, 12, 1))){
   return true;
  }
  else{
   return false;
  }
 }
}

/*===============================================================
= ��� : �ֹε�Ϲ�ȣ ���Լ� ���� üũ �Լ�
= �μ� : val1-�ֹι�ȣ��6�ڸ� val2-�ֹι�ȣ��7�ڸ�
= 
= ���� : 1(����), -1(������)
===============================================================*/
// 
function gfn_CheckJumin(strJumin) {
/*
	var ssn;
	var val1, val2;
	var tmp1, tmp2, tmp3;
	var t1, t2, t3, t4, t5, t6, t7;
	//alert(obj.value);
	/*for(i=0; i <trim(value).length; i++){
 	
		if(substr(value, i, 1) != "-"){
		
			ssn = ssn + substr(value,i,1);
			
		}
	}
	*/
	/*
	if(length(strJumin) == 0){
	
		return false;
		
	}
	
	val1 = substr(strJumin, 0, 6);
	val2 = substr(strJumin, 6, 7);
	
	tmp1 = val1.substr( 2, 2 );
	tmp2 = val1.substr( 4 );
    tmp3 = val2.substr( 0, 1 );
           
	if( gfn_DoCheckProResnoLength( val1 ) == -1 || gfn_DoCheckPreResnoLength( val2 ) == -1){
		gfn_popup_message("modal", "ico_alert", "�߸��� �ֹι�ȣ�Դϴ�.", "Ȯ��");
		return false;
	}
	if ( (tmp1 < "01") || (tmp1 > "12") ){
		gfn_popup_message("modal", "ico_alert", "�߸��� �ֹι�ȣ�Դϴ�.", "Ȯ��");
		return false;
	}
	if ( (tmp2 < "01") || (tmp2 > "31") ){
		gfn_popup_message("modal", "ico_alert", "�߸��� �ֹι�ȣ�Դϴ�.", "Ȯ��");
		return false;
	}
	if ( (tmp3 < "1" ) || (tmp3 > "4" ) ){
		gfn_popup_message("modal", "ico_alert", "�߸��� �ֹι�ȣ�Դϴ�.", "Ȯ��");
		return false;
	}
	//alert('tmp1:'+tmp1+'tmp2:'+tmp2+'tmp3:'+tmp3);
	t1  = val1.substr( 0, 1 );
	t2  = val1.substr( 1, 1 );
	t3  = val1.substr( 2, 1 );
	t4  = val1.substr( 3, 1 );
	t5  = val1.substr( 4, 1 );
	t6  = val1.substr( 5, 1 );
	t11 = val2.substr( 0, 1 );
	t12 = val2.substr( 1, 1 );
	t13 = val2.substr( 2, 1 );
	t14 = val2.substr( 3, 1 );
	t15 = val2.substr( 4, 1 );
	t16 = val2.substr( 5, 1 );
	t17 = val2.substr( 6, 1 );
	//alert('t1:'+t1+'t2:'+t2+'t3:'+t3+'t4:'+t4+'t5:'+t5+'t6:'+t6+'t11:'+t11+'t12:'+t12+'t13:'+t13+'t14:'+t14+'t15:'+t15+'t16:'+t16+'t17:'+t17);
	//var tot = t1  * 2 + t2  * 3 + t3  * 4 + t4  * 5 + t5  * 6 + t6  * 7;
	//tot    += t11 * 8 + t12 * 9 + t13 * 2 + t14 * 3 + t15 * 4 + t16 * 5 ;
		
	//var result = tot % 11;
	//result = ( 11 - result ) % 10;
		
	var tot = tointeger(t1)  * 2 + tointeger(t2)  * 3 + tointeger(t3)  * 4 + tointeger(t4)  * 5 + tointeger(t5)  * 6 + tointeger(t6)  * 7;
	tot    += tointeger(t11) * 8 + tointeger(t12) * 9 + tointeger(t13) * 2 + tointeger(t14) * 3 + tointeger(t15) * 4 + tointeger(t16) * 5 ;
			
	var result = tointeger(tot) % 11;
	result = ( 11 - tointeger(result) ) % 10;
		
	if (result == t17) {
		return true;
		//return substr(ssn,0,6) + "-" + substr(ssn,6,7);
	} else {
		gfn_popup_message("modal", "ico_alert", "�߸��� �ֹι�ȣ�Դϴ�.", "Ȯ��");
		return false;
	}
}


// �ֹι�ȣ ���� check (�� 6�ڸ�)
function gfn_DoCheckProResnoLength( szProResno ) {
	//var nResno = parseInt( szProResno ).toString();
			
	if( szProResno.length == 6 ) {
    	return 0;
    } else {
    	return -1;	
    }
		
}	

// �ֹι�ȣ ���� check (�� 7�ڸ�)
function gfn_DoCheckPreResnoLength( szPreResno ) {
	//var nResno = parseInt( szPreResno ).toString();
			
	if( szPreResno.length == 7 ) {
		return 0;
	} else {
		return -1;	
	}
	*/
} 

/*===============================================================
= ��� : �ֹε�Ϲ�ȣ ���Լ� ���� üũ �Լ�(�׸����)
= �μ� : val1-�ֹι�ȣ��6�ڸ� val2-�ֹι�ȣ��7�ڸ�
= 
= ���� : 1(����), -1(������)
===============================================================*/

function gfn_grd_chkJumin(Obj)
{
/*
	var ret1;
	if ( Length(Obj.value) != 10 && Length(Obj.value) != 13 )
	{
		alert("�Ǹ��ȣ�� �ֹε�Ϲ�ȣ 13�� �Ǵ� ����ڹ�ȣ 10�ڷ� �Է��Ͽ� �ֽʽÿ�.");
		Obj.SetFocus();
		return false;
	}

	if ( Length(Obj.text) == 13 )
	{

		ret1 = G_Chk_resno(Obj.value);
		if ( ret1 == 0 ) {
			Obj.SetFocus();
			return false;
		}
	}
	return true;
}
//�ֹι�ȣ üũ(�󼼿ɼ�)
function G_Chk_resno(j_no)
{
    var num = 0;
    var num7 = 0;
    var num13 = 0;
    var totalnum = 0;
    var chknum = 0;
    num7 = parseInt(j_no.substr(6,1)) ;
    num  = parseInt(j_no.substr(0,1))   * 2 +
          parseInt(j_no.substr(1,1))   * 3 +
          parseInt(j_no.substr(2,1))   * 4 +
          parseInt(j_no.substr(3,1))   * 5 +
          parseInt(j_no.substr(4,1))   * 6 +
          parseInt(j_no.substr(5,1))   * 7 +
          parseInt(j_no.substr(6,1))   * 8 +
          parseInt(j_no.substr(7,1))   * 9 +
          parseInt(j_no.substr(8,1))   * 2 +
          parseInt(j_no.substr(9,1))  * 3 +
          parseInt(j_no.substr(10,1)) * 4 +
          parseInt(j_no.substr(11,1)) * 5;
    num13 = parseInt(j_no.substr(12,1));

    totalnum = num % 11;

    chknum   = 11 - totalnum;

    if ( chknum >= 10 ) chknum = chknum - 10;

    if ( (num13 == chknum) && ( num7 == 1 || num7 == 2 ) )
        return 1;
    else
    {
		if(num7 > 4) return 1;
		else if(j_no.substr(10,3) == "001") return 1;
        alert("�ֹε�Ϲ�ȣ�� �ùٸ��� �Է��Ͽ� �ֽʽÿ�.");
        return 0;
    }*/
}

/*===============================================================
= ��� : ��¥ ���θ� Ȯ���Ѵ�.(�����)
= �μ� : sYmd �Է½�Ʈ��(YYYYMMDD)
=
= ���� : 0(����), -1(������) => �����̸� ��¥��
===============================================================*/
function gfn_IsDateYMD(ymd)
{

	for(i=0; i <trim(ymd).length; i++){
 	
		if(substr(ymd, i, 1) != "-" || substr(ymd, i, 1) != "_"){
		
			symd = symd + substr(ymd,i,1);
			
		}
	}
	
  	if(  length(sYmd) < 1)
  	{
    	return -1;
  	}
  	
	
    // ���� Ȯ��
    if(gfn_IsTelNumber(sYmd) == -1)
    {
    	gfn_popup_message("modal", "ico_alert", "��¥�� ���ڸ� �Է��ϼ���.", "Ȯ��");
    	return -1;
  	}
  
    var iYear = ToNumber(sYmd.substr(0,4));  // �⵵ �Է�(YYYY)
	var iMonth = ToNumber(sYmd.substr(4,2));   //���Է�(MM)
	var iDay = ToNumber(sYmd.substr(6,2));     //�����Է�(DD)
		
  	// ���� Ȯ��
  	if(length(sYmd) == 8) {
		  
		if((iMonth < 1) ||(iMonth >12)){
		
			//alert(iMonth+"���� �Է��� �߸� �Ǿ����ϴ�.!!!",DATE_CHECK_TITLE,MM_ERROR);
			gfn_popup_message("modal", "ico_alert", "���� �Է��� �߸��Ǿ����ϴ�.", "Ȯ��");
			return "";
		}
			
		// ��¥�� ���� ���θ� Ȯ��
		if(GetDay(sYmd) < 0 )
		{
			gfn_popup_message("modal", "ico_alert", "�ش����ڴ� �������� �ʽ��ϴ�.", "Ȯ��");
			return "";
		}
			
			return 0;
  	
  	} else if(length(sYmd) == 6){
		
		if((iMonth < 1) ||(iMonth >12)){
		
		//alert(iMonth+"���� �Է��� �߸� �Ǿ����ϴ�.!!!",DATE_CHECK_TITLE,MM_ERROR);
		gfn_popup_message("modal", "ico_alert", "���� �Է��� �߸��Ǿ����ϴ�.", "Ȯ��");
		return -1;
		}
		return 0;
		
  	}
  	
  	/*else{
	    //alert("���ڸ� ��� �Է��Ͻʽÿ�.!!!","��¥ üũ ����",MM_ERROR);
	    gfn_popup_message("modal", "ico_alert", "�߸��� ��¥�����Դϴ�.", "Ȯ��");
    	return -1;
  	}*/
}


/*===============================================================
= ��� : �Է¹��� from���κ��� �Է�to������ ��������ȯ�ϱ�
= �μ� : rMonth-- ��ȯ�� ������Ʈ, fMonth ~����, tMonth~����
= 
= ���� : �Ѱ�����
===============================================================*/
function gfn_CalcMonth(fMonth,tMonth)
{
  var iMonth   = 0; //���� ������
  var iYear    = 0; //���� �⵵
  var rMonth   = 0; //��ȯ�� ������

  if(parseInt(fMonth) <= parseInt(tMonth)){
  	  iYear =  parseInt(tMonth.substr(0,4))- parseInt(fMonth.substr(0,4)) ;
  	  iMonth = parseInt(toNumber(tMonth.substr(4,2)))- parseInt(toNumber(fMonth.substr(4,2)));
  	 // alert(tMonth.substring(4,6) + ":::" +fMonth.substring(4,6))
  	  rMonth = (12 * iYear) + iMonth + 1;
  	  return rMonth;
   }else {
 	  return 0;
   }
}

/*===============================================================
= ��� : �Է¹��� from���κ��� �Է�to������ �ϼ� ��ȯ�ϱ�
= �μ� : rMonth-- ��ȯ�� ������Ʈ, fMonth ~����, tMonth~����
= 
= ���� : ���ϼ�
===============================================================*/
function gfn_CalcDay(fdate,tdate)
{
  var iMonth    = 0; //���� ������
  var iYear     = 0; //���� �⵵
  var iday      = 0; //���� �ϼ�
  var iMonthday = 0; //���� ���� �ϼ�
  var rMonth    = 0; //��ȯ�� ������

  if(parseInt(fdate) <= parseInt(tdate)){
    
  	 iYear  = parseInt(tdate.substr(0,4)) - parseInt(fdate.substr(0,4)) ;
  	 iMonth = parseInt(toNumber(tdate.substr(4,2))) - parseInt(toNumber(fdate.substr(4,2)));
  	 
  	 //iday   = parseInt(toNumber(tdate.substr(6,2))) - parseInt(toNumber(fdate.substr(6,2)));
  	 // alert(tMonth.substring(4,6) + ":::" +fMonth.substring(4,6))
  	 
  	 if ( iMonth > 1 )
  	 {
    	 for( i=1 ;i < iMonth; i++)
    	 {
  	      iMonthday += gfn_MonthLastDay( toNumber(fdate.substr(4,2)) + i );
  	   }
  	 }
  	 
  	 if( iMonth == 0 )
  	 {
    	 iday  =  parseInt(toNumber(tdate.substr(6,2))) - parseInt(toNumber(fdate.substr(6,2)));
  	 } else
  	 {
  	   iday  = gfn_MonthLastDay( toNumber(fdate.substr(4,2))) - parseInt(toNumber(fdate.substr(6,2)));
  	   iday  = iday + parseInt(toNumber(tdate.substr(6,2)));
  	 }
  	 
  	 rMonth = (365 * iYear) + iMonthday + iday + 1;
  	  
  	 return rMonth;
  	  
   }else {
 	   return false;
   }
}

function gfn_MonthLastDay(fmonth)
{
  if ( fmonth == 1 )
    return 31;  
  if ( fmonth == 2 )
    return 29;  
  if ( fmonth == 3 )
    return 31;  
  if ( fmonth == 4 )
    return 30;  
  if ( fmonth == 5 )
    return 31;  
  if ( fmonth == 6 )
    return 30;  
  if ( fmonth == 7 )
    return 31;  
  if ( fmonth == 8 )
    return 31;  
  if ( fmonth == 9 )
    return 30;  
  if ( fmonth == 10 )
    return 31;  
  if ( fmonth == 11 )
    return 30;  
  if ( fmonth == 12 )
    return 31;
}

/******************************************************
* FUNCTION ��ɼ��� : ������ ���ڿ� �޸� ���̱�
* @return : ��) 123456.163) => 123,456.163
******************************************************/
function gfn_FormatNumer(sNum) { 

	var iNum = gfn_UnformatNumer(sNum.toString());
	var sNum = iNum.split(".");

	for (var i=sNum[0].length-3; i>0; i-=3) 
		sNum[0] = substr(sNum[0],0,i) + ',' + substr(sNum[0],i); 

		if(sNum.length > 1) {
			return sNum[0] + '.' + sNum[1]; 
		}
		else {
			return sNum[0];
		}
}

/******************************************************
* FUNCTION ��ɼ��� : ������ ������ �޸� ���ֱ�
* @return : ��) 123,456.16 => 123456.16
******************************************************/
function gfn_UnformatNumer(sNum) { 

	while(sNum.indexOf(",") > -1) 
	{
		sNum = sNum.replace(",", "");
	}
		return sNum;
}



/**
*	1. �Լ���   : gfn_transaction
*	2. �Ķ���� : strSvcID  
*			 	  strURL
*			 	  strInDatasets
*			 	  strOutDatasets
*			 	  strArgument
*			 	  strCallbackFunc
*	3. �Լ����� : �۷ι� Ʈ����� �Լ�
*   4. ���ϰ�   : ����.
*   

function gfn_transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArgument, strCallbackFunc)
{

	transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArgument, strCallbackFunc);

}
*/ 


/**
*	1. �Լ���   : gfn_SetCmnCommbo
*	2. �Ķ���� : cbObj     - �޺� ��ü
*			 	  gdsObj    - �����ͼ� ��ü
*			 	  codevalue - �޺� ��
*			 	  namevalue - �޺� �̸�
*			 	  totFlag   - ��ü ǥ�� ����
*			 	  rowIndex  - ���õ� �ε���
*	3. �Լ����� : ���� �޺�
*   4. ���ϰ�   : ����.
*   

function gfn_SetCmnCommbo(cbObj, gdsObj, codevalue, namevalue, totFlag, rowIndex)
{
	cbObj.InnerDataset = gdsObj; // �׽�Ʈ �۷ι� �����ͼ�
	cbObj.DataColumn   = namevalue; // �÷���
	
	if(totFlag == true){
		gfn_AddComboData(0, gds_test_code, codevalue, "0", namevalue, "[��ü]");
	}
	
	cbObj.Index = rowIndex;
}
*/ 


/**
*	1. �Լ���   : gfn_SetCmnRadio
*	2. �Ķ���� : rdObj    - ���� ��ü
*			 	  gdsObj   - �����ͼ� ��ü
*			 	  dtCol    - �÷���
*			 	  cdCol    - �÷���
*			 	  rowIndex - üũ�� ���� �ε���
*	3. �Լ����� : ���� ����
*   4. ���ϰ�   : ����.
*   

function gfn_SetCmnRadio(rdObj, gdsObj, dtCol, cdCol, rowIndex)
{
	rdObj.InnerDataset = gdsObj;
	rdObj.DataColumn   = dtCol;
	rdObj.CodeColumn   = cdCol;
	rdObj.Index        = rowIndex;
}
*/ 


/**
*	1. �Լ���   : gfn_SetCmnCheckBox
*	2. �Ķ���� : gdsObj       -  �����ͼ� ��ü
*			 	  chkName      -  üũ�ڽ���
*			 	  fnName       -  üũ�ڽ��� ������ �Լ���(�� Ŭ��)
*			 	  bkColor      -  ����
*			 	  p_top        -  top 
*			 	  p_left       -  left 
*			 	  p_width      -  width 
*			 	  p_height     -  height 
*			 	  p_gab        -  üũ�ڽ��� ��� ����
*			 	  positionFlag -  ����, ���� ��ġ ���� (row or col)
*			 	  p_value      -  üũ ���� (true or fasle)
*	3. �Լ����� : ���� ����
*   4. ���ϰ�   : ����.
*   
 
function gfn_SetCmnCheckBox(gdsObj, chkName, fnName, bkColor, p_top, p_left, p_width, p_height, p_gab, positionFlag, p_value)
{
	var chkObj = Components["checkbox"];
	var objId;
	var flag;
	
	for(var i = 0; i < gdsObj.GetRowCount(); i ++)
	{
		flag = true;
		objId = chkName+i;
		
		for(var j=0;j<chkObj.count;j++)
		{
			if(objId == obj[j].id){
				flag = false;
				break;
			}
		}
		
		if(flag){
			if(positionFlag == "row"){
				Create("checkbox", objId, "left="+(i*p_gab+p_left)+" top="+p_top+" width="+p_width+" height="+p_height+" BkColor="+bkColor+" value="+gdsObj.GetColumn(i, "code_value") + " text=" + gdsObj.GetColumn(i, "code_name") + " OnClick="+fnName + " value="+p_value);
			}else{
				Create("checkbox", objId, "left="+p_left+" top="+(i*p_gab+p_top)+" width="+p_width+" height="+p_height+" BkColor="+bkColor+" value="+gdsObj.GetColumn(i, "code_value") + " text=" + gdsObj.GetColumn(i, "code_name") + " OnClick="+fnName + " value="+p_value);
			}
		}
	}
}
*/