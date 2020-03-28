/***************************************************************************************************
 * 코드명   : lib_comm
 * 파일설명 : 공통코드
 * 만든날짜 : 2011.03.22
 * 만든이   : 강동수
 * History  : 
***************************************************************************************************/



/*===============================================================
//= 기능 : 전체검색용으로 만들기 예) 서*우 =>  서_우
//= 인수 : 
//= 
//= 리턴 : 
//===============================================================*/
function gfnFullSearchStr(strValue)
{
	
	
	return Replace(strValue,"*","_");

}



/*===============================================================
//= 기능 : 오늘날짜가져오기
//= 인수 : 
//= 
//= 리턴 : 
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
//= 기능 : 시작일가져오기
//= 인수 : 
//= 
//= 리턴 : 
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
//= 기능 : 입력받은 from월로부터 입력to월까지 개월수반환하기
//= 인수 : rMonth-- 반환할 오브젝트, fMonth ~부터, tMonth~까지
//= 
//= 리턴 : 총개월수
//===============================================================*/
function gfnCalcMonth(fMonth,tMonth)
{
  var iMonth   = 0; //계산된 개월수
  var iYear    = 0; //계산된 년도
  var rMonth   = 0; //반환할 개월수

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
= 기능 : 입력받은 from월로부터 입력to월까지 일수 반환하기
= 인수 : rMonth-- 반환할 오브젝트, fMonth ~부터, tMonth~까지
= 
= 리턴 : 총일수
===============================================================*/
function gfnCalcDay(fdate,tdate)
{
  var iMonth    = 0; //계산된 개월수
  var iYear     = 0; //계산된 년도
  var iday      = 0; //계산된 일수
  var iMonthday = 0; //계산된 월의 일수
  var rMonth    = 0; //반환할 개월수

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
 * 주민번호 null 체크 하기 :
 * @param  str 	string
 * 
 * @return  String
***************************************************************************************************/
function gfn_isNullSsn(str)
{
	var str_ssn = "";
	
	if(str == null || str == "" || str.length == 0) return true;
	
	// 날짜형식은 기본적으로 공백일경우 ____-__-__ 이된다. 
	// 이것을 Trim 처리한다.
	
	
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
 *  체크박스등의 0, 1 으로 Y, N 으로 바꾸기
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
 *  문자열 0, 1 으로 Y, N 으로 바꾸기
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
 * 날짜문자열 quote 하기 :
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
 * 날짜문자열 null 쳌, 하기 :
 * @param  str 	string
 * 
 * @return  String
***************************************************************************************************/
function gfn_isNullDate(str)
{
	var str_date = "";
	
	if(str == null || str == "" || str.length == 0) return true;
	
	// 날짜형식은 기본적으로 공백일경우 ____-__-__ 이된다. 
	// 이것을 Trim 처리한다.
	
	
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
= 기능 : 입력받은 from월로부터 입력to월까지 "x 년 x 개월 x일" 반환하기
= 인수 : rMonth-- 반환할 오브젝트, fMonth ~부터, tMonth~까지
= 
= 리턴 : from 이 to보다 작을경우: x 년 x 개월 x일
=        from 이 to보다 클 경우: false
===============================================================*/
function gfn_CalcDate(fdate,tdate)
{
	var totalDay = "";
	var rYear = "";
	var rMonth = "";
	var rDay = "";
	
	if(parseInt(fdate) <= parseInt(tdate)){
	
		var totalDay = ParseDateTime(tdate) - ParseDateTime(fdate); 	//총일수
		var rYear = toInteger(totalDay / 365);
		var rMonth = toInteger((totalDay % 365)/30);
		var rDay = (toInteger(totalDay % 365) % 30);
	
		return rYear + "년 " + rMonth + "개월 " + rDay + "일";
		
	}else{
		
		return false;
	}

}

/*****************************************************************************
* 1. 함 수 명 : IsSaupno( saupno )
* 2. 파라미터 : saupno : 사업자 등록번호('-'는 뺄것)
* 3. 리 턴 값 : 성공 : true 
				실패 : false
* 4. 설    명 : saupno에 해당하는 사업자등록번호를 validation한다.
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
//* 함수설명     : 전화번호 컨버젼(***-****-****)
//* 함수유형     : 
//* parameter    : sVal: 입력 스트링
//* return value : 컨버전된 전화번호형식
//*-----------------------------------------------------------------------------------------------


/*해당 전화번호 컨버전을 한다.*/
function gfn_SetTelFormat(sVal , Option) {
/*

지역 번호 지역 번호 지역 번호 지역 번호 
서울 02 경기 031 인천 032 강원 033 
충남 041 대전 042 충북 043 부산 051 
울산 052 대구 053 경북 054 경남 055 
전남 061 광주 062 전북 063 제주 064 
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
 		
		gfn_popup_message("modal", "error", "형식에 맞지않는 번호입니다.", "확인");
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
			//서울만 국번이 2자리
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
//* 함수설명     : 입력값이 숫자인지 확인 (전화번호 경우 '-' 허용)
//* 함수유형     : 
//* parameter    : sVal: 입력 스트링
//* return value : 0(적합), -1(부적합) => 적합이면 숫자값
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
//* 함수설명     : 입력값이 숫자인지 확인
//* 함수유형     : 
//* parameter    : sVal: 입력 스트링
//* return value : 0(적합), -1(부적합) => 적합이면 숫자값
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
//* 함수설명     : 입력값이 특수문자인지 확인 
//* 함수유형     : 
//* parameter    : value: 입력 스트링
//* return value : 
//*-----------------------------------------------------------------------------------------------
function gfn_IsChar(value) {

	var chkstr = "'^*#"; //이곳에 특수문자를 넣어주시면 됩니다.
		
	for (var i = 0; i < length(value); i++) {
			
		if (indexof(chkstr,substr(value,i,1)) >= 0) {
			
			return false;
		}
	}
	return true;
} 

//*------------------------------------------------------------------------------------------------
//* 함수설명     : 직원정보조회
//* 함수유형     : 
//* parameter    : sCOM_ID, sCorp_cd, sEno: 사번
//* 함수설명     : ds_empInfo 데이터셋을 생성하여 직원정보를 가져온다.
//* return value : 
//*
//*-----------------------------------------------------------------------------------------------

function gfn_getEmpInfo(pCmpnyCd, pCorpCd, pEno)
{
 	var objDs;
	var p_COM_ID = pCmpnyCd;
	var p_copr_cd = pCorpCd;
	var p_eno = pEno;
	
	// 1. 글로벌 데이터셋 초기화
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
	
	// 2. 직원정보 검색 트렌젝션
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
 * 공백체크
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
 * 공백체크
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
*	1. 함수명   : gfn_AddComboData
*	2. 파라미터 : Index     - 콤보박스 인덱스
*	              ds        - 데이터셋 아이디
*	              colName   - 값을 넣을 컬럼명
*	              codevalue - 집어넣을 값 
*	              name      - 이름을 넣을 컬럼명 
*	              namevalue - 추가될 이름
*	3. 함수설명 : 콤보박스에 값을 추가한다.
*   4. 리턴값   : 없다.
*   
*/ 
function gfn_AddComboData(index, dataSetId, colName, codevalue, name, namevalue)
{
	dataSetId.InsertRow(index);
	dataSetId.SetColumn(index, colName, codevalue);
	dataSetId.SetColumn(index, name, namevalue);
}


 /**
*	1. 함수명   : gfn_GetNowDate
*	2. 파라미터 : 없다.
*	3. 함수설명 : 날짜를 구해온다. (예) 2000-01-01
*   4. 리턴값   : 없다.
*   
*/ 
function gfn_GetNowDateTime()
{
	var tStrDate = getDate();
	tStrDate = substr(tStrDate,0,14);
	return tStrDate;
}


/**
*	1. 함수명   : gfn_checkValues
*	2. 파라미터 : obj       - 체크할 컴포넌트
			 	  obj_name  - 컴포넌트 이름
*	3. 함수설명 : 에디트창 등에 값이 있는지 체크한다.
*   4. 리턴값   : 없다.
*   
*/ 
function gfn_CheckValues(obj, obj_name)
{
	if(length(obj.value) == 0) {
		alert("'" + obj_name + "'을 입력해주세요.");
		//gfn_popup_message("modal", "confirm",  "'" + obj_name + "'을 입력해주세요.", "");
		obj.SetFocus();
		obj.Setsel();
		return false;
	}else{
		return true;
	}			
}


/**
*	1. 함수명   : gfn_fillGdsInsaCommMst
*	2. 파라미터 : 
*	3. 함수설명 : gds_insa_mst Dataset이 없을경우 DataSet 채우기
*   4. 리턴값   : 없다.
*   
*/ 
function gfn_fillGdsInsaCommMst()
{
	
	// 데이타셋의 값이 없으면 가져온다. 
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
*	1. 함수명   : gfn_fillGdsInsaCommBas
*	2. 파라미터 : 
*	3. 함수설명 : gds_insa_bas Dataset이 없을경우 DataSet 채우기
*   4. 리턴값   : 없다.
*   
*/ 
function gfn_fillGdsInsaCommBas()
{
	
	// 데이타셋의 값이 없으면 가져온다. 
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
*	1. 함수명   : gfn_fillGdsInsaCommSub
*	2. 파라미터 : 
*	3. 함수설명 : gds_insa_sub Dataset이 없을경우 DataSet 채우기
*   4. 리턴값   : 없다.
*   
*/ 
function gfn_fillGdsInsaCommSub()
{
	// 데이타셋의 값이 없으면 가져온다.
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
*	1. 함수명   : gfn_insaCommComp
*	2. 파라미터 : pCompCd  회사 코드
				  pBigCd   대공통 코드
				  pInsaCd  인사공통 코드
				  pLegCd    레가시 소공통 코드
				  pCodeCol  codeColumn 명 
				  pDataCol  dataColumn 명 
				  pValue    선택될값  
				  pFirstData 첫항목으로 들어갈 값을 글자			 	  
*	3. 함수설명 : 회사포함 인사공통 코드 콤보
*   4. 리턴값   : 없다.
*   
*/ 
function gfn_insaCommComp(pCombo, pCompCd, pBigCd, pInsaCd, pLegCd, pCodeCol, pDataCol, pValue, pFirstData)
{ 
	//alert('pCombo : '+pCombo+', pCompCd : '+pCompCd+', pBigCd : '+pBigCd+', pInsaCd : '+pInsaCd+', pLegCd : '+pLegCd+', pDataCol : '+pDataCol+', pCodeCol : '+pCodeCol+', pValue : '+pValue+', pFirstSel : '+pFirstSel+', pFirstData : '+pFirstData);

	gds_insa_sub.Filter("COM_ID=="+quote(pCompCd)+" && MST_CD == "+quote(pBigCd)+" && INSA_COMM_CD == "+quote(pInsaCd)+" && LEG_DTL_CD == "+quote(pLegCd));

    pCombo.CodeColumn   = pCodeCol;
	pCombo.DataColumn   = pDataCol;
	pCombo.InnerDataset = "gds_insa_sub";

	// 기본값이 있으면 추가 
	if(length(pFirstData) > 0){
		gds_insa_sub.InsertRow(0);
		gds_insa_sub.SetColumn(0, pCodeCol, "");
		gds_insa_sub.SetColumn(0, pDataCol, pFirstData);
	}
	
	// 선택값이 있으면 선택 아니면 첫째행
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
}


/**
*	1. 함수명   : gfn_insaCommNoComp
*	2. 파라미터 : pBigCd   대공통 코드
				  pInsaCd  인사공통 코드
				  pCodeCol  codeColumn 명 
				  pDataCol  dataColumn 명 
				  pValue    선택될값  
				  pFirstData 첫항목으로 들어갈 값을 글자			 	  
*	3. 함수설명 : 회사미포함 인사공통 코드 콤보
*   4. 리턴값   : 없다.
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
	
	// 기본값이 있으면 추가 
	if(length(pFirstData) > 0){
		gds_insa_bas.InsertRow(0);
		gds_insa_bas.SetColumn(0, pCodeCol, "");
		gds_insa_bas.SetColumn(0, pDataCol, pFirstData);
	}

	// 선택값이 있으면 선택 아니면 첫째행
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
	
}


/**
*	1. 함수명   : gfn_getDeptName
*	2. 파라미터 : arrData   대공통 코드		 	  
*	3. 함수설명 : FCOMM_ALL_PLA_NM 함수로 리턴받은 값을 "|" split 해서 배열로 나누어서 리턴한다.
*   4. 리턴값   : 없다.
*   
*/ 
function gfn_getDeptName(arrData)
{
	var deptNmArr = arrData.split("|");
	return deptNmArr;
}
/*===============================================================
= 기능 : 법인등록번호 체크
= 인수 : 
= 
= 리턴 : true(적합), false(부적합)
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
= 기능 : 주민등록번호 적함성 여부 체크 함수
= 인수 : val1-주민번호앞6자리 val2-주민번호뒤7자리
= 
= 리턴 : 1(적합), -1(부적합)
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
		gfn_popup_message("modal", "ico_alert", "잘못된 주민번호입니다.", "확인");
		return false;
	}
	if ( (tmp1 < "01") || (tmp1 > "12") ){
		gfn_popup_message("modal", "ico_alert", "잘못된 주민번호입니다.", "확인");
		return false;
	}
	if ( (tmp2 < "01") || (tmp2 > "31") ){
		gfn_popup_message("modal", "ico_alert", "잘못된 주민번호입니다.", "확인");
		return false;
	}
	if ( (tmp3 < "1" ) || (tmp3 > "4" ) ){
		gfn_popup_message("modal", "ico_alert", "잘못된 주민번호입니다.", "확인");
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
		gfn_popup_message("modal", "ico_alert", "잘못된 주민번호입니다.", "확인");
		return false;
	}
}


// 주민번호 형식 check (앞 6자리)
function gfn_DoCheckProResnoLength( szProResno ) {
	//var nResno = parseInt( szProResno ).toString();
			
	if( szProResno.length == 6 ) {
    	return 0;
    } else {
    	return -1;	
    }
		
}	

// 주민번호 형식 check (뒤 7자리)
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
= 기능 : 주민등록번호 적함성 여부 체크 함수(그리드용)
= 인수 : val1-주민번호앞6자리 val2-주민번호뒤7자리
= 
= 리턴 : 1(적합), -1(부적합)
===============================================================*/

function gfn_grd_chkJumin(Obj)
{
/*
	var ret1;
	if ( Length(Obj.value) != 10 && Length(Obj.value) != 13 )
	{
		alert("실명번호는 주민등록번호 13자 또는 사업자번호 10자로 입력하여 주십시오.");
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
//주민번호 체크(상세옵션)
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
        alert("주민등록번호를 올바르게 입력하여 주십시오.");
        return 0;
    }*/
}

/*===============================================================
= 기능 : 날짜 여부를 확인한다.(년월일)
= 인수 : sYmd 입력스트링(YYYYMMDD)
=
= 리턴 : 0(적합), -1(부적합) => 적합이면 날짜값
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
  	
	
    // 숫자 확인
    if(gfn_IsTelNumber(sYmd) == -1)
    {
    	gfn_popup_message("modal", "ico_alert", "날짜는 숫자만 입력하세요.", "확인");
    	return -1;
  	}
  
    var iYear = ToNumber(sYmd.substr(0,4));  // 년도 입력(YYYY)
	var iMonth = ToNumber(sYmd.substr(4,2));   //월입력(MM)
	var iDay = ToNumber(sYmd.substr(6,2));     //일자입력(DD)
		
  	// 길이 확인
  	if(length(sYmd) == 8) {
		  
		if((iMonth < 1) ||(iMonth >12)){
		
			//alert(iMonth+"월의 입력이 잘못 되었습니다.!!!",DATE_CHECK_TITLE,MM_ERROR);
			gfn_popup_message("modal", "ico_alert", "월의 입력이 잘못되었습니다.", "확인");
			return "";
		}
			
		// 날짜의 존재 여부를 확인
		if(GetDay(sYmd) < 0 )
		{
			gfn_popup_message("modal", "ico_alert", "해당일자는 존재하지 않습니다.", "확인");
			return "";
		}
			
			return 0;
  	
  	} else if(length(sYmd) == 6){
		
		if((iMonth < 1) ||(iMonth >12)){
		
		//alert(iMonth+"월의 입력이 잘못 되었습니다.!!!",DATE_CHECK_TITLE,MM_ERROR);
		gfn_popup_message("modal", "ico_alert", "월의 입력이 잘못되었습니다.", "확인");
		return -1;
		}
		return 0;
		
  	}
  	
  	/*else{
	    //alert("일자를 모두 입력하십시오.!!!","날짜 체크 오류",MM_ERROR);
	    gfn_popup_message("modal", "ico_alert", "잘못된 날짜형식입니다.", "확인");
    	return -1;
  	}*/
}


/*===============================================================
= 기능 : 입력받은 from월로부터 입력to월까지 개월수반환하기
= 인수 : rMonth-- 반환할 오브젝트, fMonth ~부터, tMonth~까지
= 
= 리턴 : 총개월수
===============================================================*/
function gfn_CalcMonth(fMonth,tMonth)
{
  var iMonth   = 0; //계산된 개월수
  var iYear    = 0; //계산된 년도
  var rMonth   = 0; //반환할 개월수

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
= 기능 : 입력받은 from월로부터 입력to월까지 일수 반환하기
= 인수 : rMonth-- 반환할 오브젝트, fMonth ~부터, tMonth~까지
= 
= 리턴 : 총일수
===============================================================*/
function gfn_CalcDay(fdate,tdate)
{
  var iMonth    = 0; //계산된 개월수
  var iYear     = 0; //계산된 년도
  var iday      = 0; //계산된 일수
  var iMonthday = 0; //계산된 월의 일수
  var rMonth    = 0; //반환할 개월수

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
* FUNCTION 기능설명 : 문자형 숫자에 콤마 붙이기
* @return : 예) 123456.163) => 123,456.163
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
* FUNCTION 기능설명 : 문자형 숫자의 콤마 없애기
* @return : 예) 123,456.16 => 123456.16
******************************************************/
function gfn_UnformatNumer(sNum) { 

	while(sNum.indexOf(",") > -1) 
	{
		sNum = sNum.replace(",", "");
	}
		return sNum;
}



/**
*	1. 함수명   : gfn_transaction
*	2. 파라미터 : strSvcID  
*			 	  strURL
*			 	  strInDatasets
*			 	  strOutDatasets
*			 	  strArgument
*			 	  strCallbackFunc
*	3. 함수설명 : 글로벌 트랜잭션 함수
*   4. 리턴값   : 없다.
*   

function gfn_transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArgument, strCallbackFunc)
{

	transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArgument, strCallbackFunc);

}
*/ 


/**
*	1. 함수명   : gfn_SetCmnCommbo
*	2. 파라미터 : cbObj     - 콤보 객체
*			 	  gdsObj    - 데이터셋 객체
*			 	  codevalue - 콤보 값
*			 	  namevalue - 콤보 이름
*			 	  totFlag   - 전체 표시 유무
*			 	  rowIndex  - 선택된 인덱스
*	3. 함수설명 : 공통 콤보
*   4. 리턴값   : 없다.
*   

function gfn_SetCmnCommbo(cbObj, gdsObj, codevalue, namevalue, totFlag, rowIndex)
{
	cbObj.InnerDataset = gdsObj; // 테스트 글로벌 데이터셋
	cbObj.DataColumn   = namevalue; // 컬럼명
	
	if(totFlag == true){
		gfn_AddComboData(0, gds_test_code, codevalue, "0", namevalue, "[전체]");
	}
	
	cbObj.Index = rowIndex;
}
*/ 


/**
*	1. 함수명   : gfn_SetCmnRadio
*	2. 파라미터 : rdObj    - 라디오 객체
*			 	  gdsObj   - 데이터셋 객체
*			 	  dtCol    - 컬럼명
*			 	  cdCol    - 컬럼값
*			 	  rowIndex - 체크된 라디오 인덱스
*	3. 함수설명 : 공통 라디오
*   4. 리턴값   : 없다.
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
*	1. 함수명   : gfn_SetCmnCheckBox
*	2. 파라미터 : gdsObj       -  데이터셋 객체
*			 	  chkName      -  체크박스명
*			 	  fnName       -  체크박스에 연동된 함수명(원 클릭)
*			 	  bkColor      -  배경색
*			 	  p_top        -  top 
*			 	  p_left       -  left 
*			 	  p_width      -  width 
*			 	  p_height     -  height 
*			 	  p_gab        -  체크박스간 띄울 간격
*			 	  positionFlag -  수평, 수직 배치 설정 (row or col)
*			 	  p_value      -  체크 유무 (true or fasle)
*	3. 함수설명 : 공통 라디오
*   4. 리턴값   : 없다.
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