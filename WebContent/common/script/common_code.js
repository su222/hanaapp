/**
 * 공통코드조회 공통함수
 *
 * 1. 바인드오브젝트가 콤보박스인 경우에는 데이터셋을 생성하고 자동으로 바인드함.(단, 콤보박스아이디는 cmb로 시작)
 * 2. 바인드오브젝트가 데이터셋인경우에 데이터셋이 있으면 데이터셋에 Copy하고 없으면 생성함.
 * 3. 기본적으로 생성하는 데이터셋의 명칭은 "ds_commcode_바인드오브젝트" 형태로 생성함.
 * 4. 하나의 폼에 cmb_test와 div.cmb_test의 객체가 있는 경우 div.cmb_test를 찾기 위해서는 div.combo_object 형태로 넘겨야함.
 *    gfn_initCommonCodes("div_srh.cmb_test=AFTR_DLNG_WAIT_TIME:X,ds_COMM_CALLBACK_ARSCD=COMM_CALLBACK_ARSCD");
 * 
 * 공통코드 데이터셋 레이아웃
 * CODETYPE : 영문코드유형
 * CODENAME : 코드명
 * CODEID : 코드값
 * PARENTTYPE : 상위영문코드유형
 * PARENTID : 상위코드값
 * ETC1 : 기타1
 * ETC2 : 기타2
 * ETC3 : 기타3
 * ETC4 : 기타4
 * ETC5 : 기타5
 * USEYN : 사용여부(Y,N)
 * DICORDER : 정렬순서
 * VIDTY_STRDM : 유효시작일자
 * VIDTY_FNSDM : 유효종료일자
 *
 * 타이틀유형사용방법(옵션(default:선택타이틀))
 * X : 타이틀 없음, O : 선택타이틀, A : 전체타이틀
 * 1. 콤보인경우에"::선택::" 항목을 기본으로 생성하고 데이터셋이면 생성하지 않음
 * 2. cmb_test 에 타이틀을 없애는 경우에 아래와 같은 형태로 사용하여 타이틀삭제
 *    gfn_initCommonCodes("div_srh.cmb_test=AFTR_DLNG_WAIT_TIME:X,ds_COMM_CALLBACK_ARSCD=COMM_CALLBACK_ARSCD");
 *
 * 필터사용방법(옵션-필터를 사용시에는 타이틀유형을 반드시 정의해야 함)
 * 1. 필터사용시에 데이터셋 레이아웃을 참조하여 작성하며 아래 예제와 같이 urlEncode('필터스크립트')로 사용한다.
 *    gfn_initCommonCodes("cmb_CMS_STTS_SKILL=CMS_STTS_SKILL:X:"+urlEncode('USEYN="Y"&&ETC2=3&&POS(CODENAME,""계약)>-1));
 *    (사용여부가 Y이고 ETC2가 3이고 코드명에 "계약" 단어가 들어가는 데이터)
 *
 * @param sCodeSets "바인드오브젝트=코드명,바인드오브젝트=코드명:타이틀유형:필터"의 형태로 작성(필수, (옵션:타이틀유형,필터))
 * @param sCallBack 콜백함수명(옵션(default:""))
 * @param sTrId 콜백함수 사용시 사용할 trId(옵션(default:gfn_initCommonCodes_getCodes)
 * @return
 */
function gfn_initCommonCodes(sCodeSets, sCallBack, sTrId)
{
	//* 코드셋 검증
	if(length(sCodeSets) == 0 ) {
		trace("공통코드 gfn_initCommonCodes함수에 sCodeSets 파라메터 내용이 없습니다.");
		return;
	}
	
	//* 공통코드 데이터 조회 파라메터 생성
	var sCodes = "'";
	var sOutDs = "";
	var arCodeSets = split(sCodeSets, ",");

	for (var i=0; i < length(arCodeSets); i++) {
		var sTemp = split(arCodeSets[i], "=");
		var sTempDsArgs = split(sTemp[1], ":");
		var sDsTemp = "ds_commcode_" + iif(indexOf(sTemp[0], ".") == -1, sTemp[0], replace(sTemp[0], ".", "_"));
		var sTempObjectName = sTemp[0];
		
		if (indexOf(sTemp[0], ".") > -1) {
			var arTempObjectSplit = split(sTemp[0], ".");
			sTempObjectName = arTempObjectSplit[length(arTempObjectSplit)-1];
		}
		
		if (indexOf(sTempObjectName, "cmb") == 0) {
			
			if (gfn_findObject(sDsTemp, "Dataset") == false) {
				Create("Dataset", sDsTemp);
			}

			var oComboObj;
			
			if (indexOf(sTemp[0], ".") != -1) {
				oComboObj = eval(sTemp[0]);
			
			} else {
				oComboObj = f_findObject(this, sTemp[0]);
			}
			
			if (oComboObj == null) {
				trace(sTemp[0] + " 객체를 찾을 수가 없습니다.");
				continue;
			}
			
			oComboObj.InnerDataset = sDsTemp;
			oComboObj.CodeColumn = "CODEID";		
			oComboObj.DataColumn = "CODENAME";
		
		} else {
			//* combo 가 아닌 경우 dataset 으로 데이터를 받아온다.
			sDsTemp = iif(indexOf(sTemp[0], ".") == -1, sTemp[0], replace(sTemp[0], ".", "_"));
			
			if (gfn_findObject(sDsTemp, "Dataset") == false) {
				var objTemp = object(sDsTemp);
				Create("Dataset", sDsTemp);
				
				objTemp.InnerDataset = sDsTemp;
				objTemp.CodeColumn = "CODEID";		
				objTemp.DataColumn = "CODENAME";
			}
		}
			
		sCodes += sTempDsArgs[0]+",";
		sOutDs += sDsTemp+"='"+sTempDsArgs[0]+"' ";
	}
	sCodes += "'";
	
	//* 공통코드 데이터 조회
	if (sCallBack == null) sCallBack = "";
	if (sTrId == null) sTrId = "codeutil_getcode";
	
	var bSync 	 = false;
	if (http.sync) bSync = true; //* 함수 이전의 sync 상태 확인.
	if (!bSync) http.Sync = true; //* sync 가 false 이면 sync 시작.
	Transaction(sTrId,
			    "service::codeutil.do",
				"",
				sOutDs,
				"cmd=getCodes codeType=" + sCodes,
				sCallBack);
	if (!bSync) http.Sync = false;
	
	//* 필터설정
	for (var i=0; i < length(arCodeSets); i++) {
		//trace(arCodeSets[i]);
		var sTemp = split(arCodeSets[i], "=");
		var sTempDsArgs = split(sTemp[1], ":");
		var sTempObjectName = sTemp[0];
		
		if (indexOf(sTemp[0], ".") > -1) {
			var arTempObjectSplit = split(sTemp[0], ".");
			sTempObjectName = arTempObjectSplit[length(arTempObjectSplit)-1];
		}
		var iCmbTxtIndex = indexOf(sTempObjectName,"cmb");
		var sObjNameReplaceUnderbar = iif(indexOf(sTemp[0], ".") == -1, sTemp[0], replace(sTemp[0], ".", "_"));
		var sDsTemp = "ds_commcode_" + sObjNameReplaceUnderbar;	
		var sFilter = "";

		if (iCmbTxtIndex != 0) {
			sDsTemp = sObjNameReplaceUnderbar;
		}
		var oDsTemp = eval(sDsTemp);

		//* 필터셋팅
		sFilter = "USEYN='Y'";
	
		if (sTempDsArgs[2] != null && sTempDsArgs[2] != "") {
			sFilter = urlDecode(sTempDsArgs[2]);
		}
		oDsTemp.Filter(sFilter);
		
		//* 콤보인경우에"::선택::" 항목을 기본으로 생성하고 데이터셋이면 생성하지 않음
		if (iCmbTxtIndex == 0 || sTempDsArgs[1] == "A" || sTempDsArgs[1] == "O") {

			if (sTempDsArgs[1] != "X") {
				var sTitle = iif(sTempDsArgs[1] == "A", "전체", ":: 선택 ::");
				oDsTemp.InsertRow(0);
				oDsTemp.SetColumn(0,"CODEID", "");
				oDsTemp.SetColumn(0,"CODENAME", sTitle);
				oDsTemp.SetColumn(0,"USEYN","Y");
				
				if (iCmbTxtIndex == 0) {
					var oComboObj;
					
					if (indexOf(sTemp[0], ".") != -1) {
						oComboObj = eval(sTemp[0]);
					
					} else {
						oComboObj = f_findObject(this, sTemp[0]);
					}
					oComboObj.index = 0;
				}
			}
		}
	}
}

/**
 * 공통코드데이터셋에 타이틀 항목 추가 메소드
 * 
 * 사용방법
 * 1. 데이터셋 또는 콤보오브젝트를 콤마로 구분된 값으로 셋팅하면 디폴트로 ":: 선택 ::" 항목추가
 * 2. 각 오브젝트의 끝에 "오브젝트명^타이틀"의 형태로 타이틀을 넣으면 타이틀 셋팅(옵션)
 * 3. 타이틀은 옵션으로 타이틀을 넣으면 설정한 타이틀로 셋팅되고 타이틀 셋팅 후 Select 처리
 * 
 * 예제
 *  선택타이틀을 넣는 경우
 *  gfn_setCommonCodeTitle("ds_COMM_SRVC_KIND");
 *  선택타이틀을 여러 데이터셋에 넣는 경우 
 *  gfn_setCommonCodeTitle("ds_COMM_SRVC_KIND,cmb_COMM_CALLBACK_ARSCD");
 *  여러 콤보오브젝트 및 데이터셋에 전체타이틀을 넣는 경우
 *  gfn_setCommonCodeTitle("cmb_COMM_SRVC_KIND^구분,ds_COMM_CALLBACK_ARSCD^구분");
 * 
 * @param oDateSet 공통코드데이터셋(필수:"데이터셋[^타이틀],콤보오브젝트[^타이틀],..." 형태로 입력(옵션:타이틀))
 * @return
 */
function gfn_setCommonCodeTitle(sCodesets)
{
/*
			var aDsTemps = array();
			if(indexOf(sDataset, ",") > -1)
			{
				aDsTemps[0] = sDataset;
			} else {
				aDsTemps = split(sDataset, ",");
			}
*/
	var arCodeSets = split(sCodeSets, ",");
	
	for (var i=0; i < length(arCodeSets); i++) {
		var sTemp = split(arCodeSets[i], "^");
		var sTempDs = sTemp[0];
		var sTempObjectName = sTemp[0];
		
		if(indexOf(sTemp[0], ".") > -1) {
			var arTempObjectSplit = split(sTemp[0], ".");
			sTempObjectName = arTempObjectSplit[length(arTempObjectSplit)-1];
		}
		var oComboObj;
		
		//* 콤보오브젝트이면 데이터셋을 찾아서 저장.
		if (indexOf(sTempObjectName ,"cmb") == 0) {
			//* 콤보오브젝트 검색.
			if (indexOf(sTemp[0], ".") != -1) {
				oComboObj = eval(sTemp[0]);
			
			} else {
				oComboObj = f_findObject(this, sTemp[0]);
			}
			
			//* 콤보오브젝트가 널이 아니면 데이터셋 검색.
			if (oComboObj != null) {
				sTempDs = oComboObj.InnerDataset;
			}
		}
		
		var oTempDs = f_findObject(this, sTempDs);

		if (oTempDs != false) {
			//* 타이틀 셋팅.
			var sTitle = sTemp[1];
			
			if (sTitle == null || sTitle == "") {
				sTitle = ":: 선택 ::";
			}		

			//* 타이틀이 없는 경우 첫로우 생성.
			var sOrgCodeId = oTempDs.getColumn(0, "CODEID");
			
			if (sOrgCodeId != null && sOrgCodeId != "" ) {
				oTempDs.InsertRow(0);
			}
			oTempDs.SetColumn(0,"CODEID", "");
			oTempDs.SetColumn(0,"CODENAME",sTitle);
			oTempDs.SetColumn(0,"USEYN","Y");
			
			//* 코드아이디가 넘어오는 경우 코드아이디셋팅
			/*
			if (sValue != null && sValue != "") {
				oDs.SetColumn(0,"CODEID",sValue);
			}
			*/
			
			// 타이틀 Select
			oComboObj.index = 0;
		}
	}
}


/**
 * 공통코드데이터셋에 코드추가 메소드
 * 
 * @param oCommonCodeDs 공통코드데이터셋(필수)
 * @param sCodeId 코드아이디(필수)
 * @param sCodeNm 코드명(필수)
 * @return
 */
function gfn_addCommonCodeField(oCommonCodeDs, sCodeId, sCodeNm)
{
	if (oCommonCodeDs.findRow("CODEID", sCodeId) == -1)	{
		var iRow = oCommonCodeDs.addRow();
		oCommonCodeDs.SetColumn(iRow,"CODENAME", sCodeNm);
		oCommonCodeDs.SetColumn(iRow,"CODEID", sCodeId);
		oCommonCodeDs.SetColumn(iRow,"USEYN","Y");
	}
	
}

/**
 * 하위공통코드조회 공통함수
 *
 * "바인드오브젝트=코드명"의 형태로 파라메터를 넘기면 바인드오브젝트가 콤보박스인 경우에 
 * "ds_commcode_바인드오브젝트" 형태로 데이터셋을 생성하고 자동으로 바인드하며
 * 바인드오브젝트가 데이터셋인 경우에 데이터셋이 있으면 데이터셋에 Copy하고 없으면 생성하여 바인드 함.
 * (단, 콤보박스아이디는 cmb로 시작)
 *
 * 공통코드 데이터셋 레이아웃
 * CODETYPE : 영문코드유형
 * CODENAME : 코드명
 * CODEID : 코드값
 * PARENTTYPE : 상위영문코드유형
 * PARENTID : 상위코드값
 * ETC1 : 기타1
 * ETC2 : 기타2
 * ETC3 : 기타3
 * ETC4 : 기타4
 * ETC5 : 기타5
 * USEYN : 사용여부(Y,N)
 * DIC_ORDER : 정렬순서
 * VIDTY_STRDM : 유효시작일자
 * VIDTY_FNSDM : 유효종료일자
 *
 * 타이틀유형사용방법(옵션(default:선택타이틀))
 * X : 타이틀 없음, O : 선택타이틀, A : 전체타이틀
 * @param sCodeSets "바인드오브젝트=코드명"의 형태로 작성(필수)
 * @param sParentCode 상위코드(필수)
 * @param bDefaultFilter 기본필터 적용시 USEYN 이 Y 인 데이터만 보여줌(옵션 : true, false (default:true))
 * @param sCallBack 콜백함수명(옵션(default:""))
 * @param sTrId 콜백함수 사용시 사용할 trId(옵션(default:gfn_initCommonCodes_getCodes)
 * @return
 */
function gfn_getChildCommonCodes(sCodeSets, sParentCode, sTitle, bDefaultFilter, sCallBack, sTrId)
{
	//* 코드셋 검증.
	if (length(sCodeSets) == 0 ) {
		trace("공통코드 gfn_getChildCommonCodes 함수에 sCodeSets 파라메터 내용이 없습니다.");
		return;
	}
	
	//* 공통코드 데이터 조회 파라메터 생성.
	var sCodes = "'";
	var sOutDs = "";

	var sTemp = split(sCodeSets, "=");
	var sDsTemp = "ds_commcode_"+sTemp[0];		
		
	if (indexOf(sTemp[0],"cmb") == 0) {	
		var iDs_temp = gfn_findObject(sDsTemp, "Dataset");
		
		if (iDs_temp == false) {
			Create("Dataset", sDsTemp);
		}	

		var oComboObj = f_findObject(this, sTemp[0]);
		oComboObj.InnerDataset = sDsTemp;
		oComboObj.CodeColumn = "CODEID";
		oComboObj.DataColumn = "CODENAME";
	
	} else {
		sDsTemp = sTemp[0];
		Create("Dataset", sDsTemp);
	}
	
	sCodes += sTemp[1]+"'";
	sOutDs += sDsTemp+"='"+sTemp[1]+"_"+sParentCode+"' ";

	//* 공통코드 데이터 조회
	if (sCallBack == null) sCallBack = "";
	if (sTrId == null) sTrId = "codeutil_getchildcode";
	
	var bSync 	 = false;
	if (http.sync) bSync = true;	//* 함수 이전의 sync 상태 확인.
	if (!bSync) http.Sync = true; //* sync 가 false 이면 sync 시작.
	
	Transaction(sTrId,
				"service::codeutil.do",
				"",
				sOutDs,
				"cmd=getChildCodes parentType=" + sCodes + " parentId=" + quote(sParentCode),
				sCallBack);
	if (!bSync) http.Sync = false;
	
	
	//* 필터설정
	if (bDefaultFilter == null) bDefaultFilter = true;
	if (bDefaultFilter) {
		var oDsTemp = eval(sDsTemp);
		//* 필터설정할 때 최상단에 기준표시.
		if (sTitle == 'X' || sTitle == 'x') {
			sTitle = "none";
		
		} else if (sTitle == 'O' || sTitle == 'o') {
			sTitle = ":: 선택 ::";
		
		} else if (sTitle == 'A' || sTitle == 'a') {
			sTitle = "전체";
		}
		
		if (sTitle != "none") {
			oDsTemp.InsertRow(0);
			oDsTemp.SetColumn(0,"CODEID", "");
			oDsTemp.SetColumn(0,"CODENAME", sTitle);
			oDsTemp.SetColumn(0,"USEYN","Y");
		}
		oDsTemp.Filter("USEYN='Y'");
	}

}

/**
 * gfn_getChildCode : 하위 코드를 구하여 상위 코드와 연결.
 * 
 * @param obj parent object
 * @param strCode parent object code value
 * @param nNewIndex parent object index
 * @param childObj child object
*/
function gfn_getChildCodes(obj, strCode, nNewIndex, childObj, sTitle)
{
	var ds_inner;
	var codeType;
	var obj_id;
	ds_inner = object(obj.innerDataSet);
	codeType = ds_inner.GetColumn(nNewIndex, "codetype");
	objId = childObj.id + "=";
	gfn_getChildCommonCodes(objId + codeType, strCode, sTitle);
	childObj.index=0;
}


/*******************************************************************************
* 콜센터 조직조회 콤보박스 공통함수
*
* 폼이 로드될 때 콤보아이디를 넘겨 초기화시키며 콤보아이디를 넘기면 해당하는
* 콤보박스에 데이터셋을 생성하여 바인딩한다.
* 데이터셋은 ds_dept_콤보명으로 생성되며 풀경로명인 경우에는 .(점)을 _(언더바)로 변경한다.
* (ds_dept_콤보명(예제:ds_dept_div_srh_cmb_center))
*  
* 상담원조직 데이터셋 레이아웃
* DEPT_CD : 부서코드
* DEPT_NAME : 부서명
* UPPER_DEPT : 상위부서코드
* DEPT_LEVEL : 부서레벨
* WORK_GROUP_CD : 그룹코드
* USE_YN : 사용여부
* SORT_NO : 정렬번호
* 
* 상담원 데이터셋 레이아웃
* USER_ID : 상담원아이디
* USER_NAME : 상담원명
* EMP_NO : 사원번호
* DEPT_CD : 부서코드
* USER_GRADE_CD : 유저등급코드
* JOB_LEVEL_CD : 직업등급코드
*
* @param sComboDept1 센터콤보명(필수(예제:"div_srh.cmb_center"))
* @param sComboDept2 팀콤보아이디(필수(예제:"div_srh.cmb_team"))
* @param sComboDept3 실콤보아이디(필수(예제:"div_srh.cmb_room"))
* @param sComboDept4 상담원(옵션(예제:"div_srh.cmb_user"))
* @return 없음
================================================================================
* 변경내역 : 
* YYYYMMDD 담당자명 변경내용(Why?,What?)
*******************************************************************************/
var iInitComboDeptGrpIndex = 0;
function gfn_initComboDept(sComboDept1, sComboDept2, sComboDept3, sComboDept4, svcId, callBack)
{	
	if(svcId == "")	svcId = "selectSelf";
	if(callBack == "")	callBack = "f_txComboCallback";
	
	var bIsInputValid = true;
	
	// 조직콤보아이디를 저장할 데이터셋 생성
	if(gfn_findObject("ds_dept_combo_ds_id", "Dataset") == false)
	{
		Create("Dataset", "ds_dept_combo_ds_id");
		var dsDeptComboDsId = Eval("ds_dept_combo_ds_id");
		dsDeptComboDsId.AddColumn("COMBO_DS_ID");
		dsDeptComboDsId.AddColumn("COMBO_ID");
		dsDeptComboDsId.AddColumn("COMBO_LEVEL");
		dsDeptComboDsId.AddColumn("COMBO_GRP_IDX");
		//trace("ds_dept_combo_ds_id load");
	}	

	// 글로벌에 있는 조직데이터셋을 못가져오는 경우 조회
	if(gfn_findObject("gds_dept", "Dataset") == false || (gds_dept.GetCount() < 1))
	{
		Create("Dataset", "gds_dept");

		var t_URL = "service::sqlservice.do"  ;
		var t_InDatasets = "" ;
		var t_OutDatasets = "gds_dept=com_cm1_SrhDeptList";
		var t_Argument = " _sqlName=com_cm1_SrhDeptList";
	
		http.sync = true;
		Transaction(svcId
				, t_URL
				, t_InDatasets
				, t_OutDatasets
				, t_Argument
				, callBack ) ;
		http.sync = false;
	}

	// 데이터셋 생성하고 바인딩 및 이벤트 처리
	var dsDeptComboDsId = Eval("ds_dept_combo_ds_id");
	var gds_dept_local = eval("gds_dept");
	//gfn_traceds(gds_dept_local);
	for(var i = 1; i < 5; i++)
	{
		var sComboObjTemp = Eval("sComboDept"+i);
		// 콤보오브젝트 검증
		if(!IsValid(Object(sComboObjTemp)))
		{	
			if(i < 4) trace("조직에 사용하는 콤보박스가 없습니다. 콤보박스를 확인하여 주십시요. 입력콤보아이디 : " + sComboObjTemp);
			continue;
		}
		var sObjNameReplaceUnderbar = iif(indexOf(sComboObjTemp, ".") == -1, sComboObjTemp, replace(sComboObjTemp, ".", "_"));
		//trace("sObjNameReplaceUnderbar:"+sObjNameReplaceUnderbar);
		
		// 데이터셋 생성
		var sLocalDataSetName = "ds_dept_"+sObjNameReplaceUnderbar;
		Create("Dataset", sLocalDataSetName);	
		var dsDeptTemp = Eval(sLocalDataSetName);
		
		// 콤보오브젝트에 바인딩
		var oComboObj = Eval(sComboObjTemp);
		oComboObj.InnerDataset = sLocalDataSetName;
		
		if(i < 4)
		{
			// 조직코드 데이터셋 복사
			gds_dept_local.Filter("DEPT_LEVEL="+i);
			dsDeptTemp.CopyF(gds_dept_local);
			
			// 조직코드 타이틀 생성
			dsDeptTemp.InsertRow(0);
			dsDeptTemp.SetColumn(0, "DEPT_CD", "");
			dsDeptTemp.SetColumn(0, "DEPT_LEVEL", i);
			dsDeptTemp.SetColumn(0, "DEPT_NAME", "전체");
			dsDeptTemp.SetColumn(0, "SORT_NO", 0);
			dsDeptTemp.SetColumn(0, "UPPER_DEPT", "");
			dsDeptTemp.SetColumn(0, "USE_YN", "Y");
			if(i > 1)
			{
				dsDeptTemp.Filter("UPPER_DEPT=''");
			}
			
			// 콤보오브젝트에 바인딩
			oComboObj.CodeColumn = "DEPT_CD";
			oComboObj.DataColumn = "DEPT_NAME";
			oComboObj.OnChanged = "f_setComboDept_OnChanged";
			
		}else{
			// 조직원 데이터셋 컬럼생성
			dsDeptTemp.addColumn("USER_ID");
			dsDeptTemp.addColumn("USER_NAME");
			dsDeptTemp.addColumn("DEPT_CD");
			dsDeptTemp.InsertRow(0);
			dsDeptTemp.SetColumn(0, "USER_ID", "");
			dsDeptTemp.SetColumn(0, "USER_NAME", "");
			dsDeptTemp.SetColumn(0, "USER_NAME", "전체");
			dsDeptTemp.SetColumn(0, "DEPT_CD", "");
			
			// 콤보오브젝트에 바인딩
			oComboObj.CodeColumn = "USER_ID";
			oComboObj.DataColumn = "USER_NAME";			
		}
		
		oComboObj.Index = 0;
		
		// 콤보오브젝트 저장
		var iAppendRow = dsDeptComboDsId.addRow();
		dsDeptComboDsId.setColumn(iAppendRow, "COMBO_DS_ID", sLocalDataSetName);
		dsDeptComboDsId.setColumn(iAppendRow, "COMBO_ID", sComboObjTemp);
		dsDeptComboDsId.setColumn(iAppendRow, "COMBO_LEVEL", i);
		dsDeptComboDsId.setColumn(iAppendRow, "COMBO_GRP_IDX", iInitComboDeptGrpIndex);
	}		
	
	// 그룹인덱스 추가
	iInitComboDeptGrpIndex++;

}

/*******************************************************************************
* 조직콤보 콜백메소드
*
* @param svcid 서비스아이디
* @param errCode 에러코드
* @param errMsg 에러메세지
* @return 없음
================================================================================
* 변경내역 : 
* YYYYMMDD 담당자명 변경내용(Why?,What?)
*******************************************************************************/
function f_txComboCallback(svcid,errCode,errMsg)
{	if(svcid == "selectSelf")
	{
		if(errCode != 0 ){
			trace( errMsg );
		}else{			
			//alert( gds_dept_temp.RowCount() +"건이 조회되었습니다.");		
		}
	}
}

/*******************************************************************************
* 조직콤보에 레벨에 따라 해당하는 조직정보 리스트를 셋팅
*
* @param oDeptCombo 조직콤보객체
* @param iLevel 조직레벨(1,2,3)
* @param sDeptCode 조직코드
* @param sSelectedDeptCode 선택된 조직코드
* @return 없음
* @author 이명식
================================================================================
* 변경내역 : 
* YYYYMMDD 담당자명 변경내용(Why?,What?)
*******************************************************************************/
function f_setComboDept(oDeptCombo, sSelectedDeptCode)
{
	var dsDeptComboDsId = Eval("ds_dept_combo_ds_id");

	// 다음 콤보 셋팅
	var iFindIndex = dsDeptComboDsId.findRow("COMBO_DS_ID", oDeptCombo.InnerDataset) + 1;
	var iEndIndex = dsDeptComboDsId.caseCount("COMBO_GRP_IDX=" + dsDeptComboDsId.getColumn(iFindIndex-1, "COMBO_GRP_IDX"), iFindIndex) + iFindIndex;
	
	for(var i = iFindIndex; i < iEndIndex; i++)
	{
		var sFindDataSetName = dsDeptComboDsId.getColumn(i, "COMBO_DS_ID");
		var sFindObjectName = dsDeptComboDsId.getColumn(i, "COMBO_ID");
		
		var sTempDeptCode = "";
		if(i == iFindIndex) sTempDeptCode = sSelectedDeptCode;
		else sTempDeptCode = "";
		
		var dsDeptTemp = Eval(sFindDataSetName);
		// 상담원콤보인 경우에는 상담원 검색
		if(dsDeptComboDsId.getColumn(i, "COMBO_LEVEL") == 4)
		{
			// 실레벨에서 클릭한 경우만 상담원 검색
			if(iFindIndex == 3)
			{
				var t_URL = "service::sqlservice.do"  ;
				var t_InDatasets = "" ;
				var t_OutDatasets = sFindDataSetName + "=com_cm1_SrhDeptUserList";
				var t_Argument = " _sqlName=com_cm1_SrhDeptUserList P_DEPT_CD="+quote(sTempDeptCode);

				http.sync = true;
				Transaction("selectSelf"
						, t_URL
						, t_InDatasets
						, t_OutDatasets
						, t_Argument
						, "f_txComboCallback" ) ;
				http.sync = false;
				dsDeptTemp.InsertRow(0);
				dsDeptTemp.SetColumn(0, "USER_NAME", "전체");
				dsDeptTemp.SetColumn(0, "DEPT_CD", "");
			}else{
				dsDeptTemp.Filter("DEPT_CD='"+sTempDeptCode+"' OR DEPT_CD=''");
			}

		}else{
			dsDeptTemp.Filter("UPPER_DEPT='"+sTempDeptCode+"' OR UPPER_DEPT=''");
		}

		var oNextCombo = Eval(sFindObjectName);
		oNextCombo.Index = 0;
		
	}
}
function f_setComboDept_OnChanged(obj,strCode,strText,nOldIndex,nNewIndex)
{ 
	f_setComboDept(obj, strCode);
}

/*******************************************************************************
* 조직콤보에 조직정보를 셋팅
*
* 사용방법
* gfn_setComboDeptValue(div0.cmb_group, div0.cmb_team, div0.cmb_sil, div0.cmb_sawon,  'SA1001', 'SA2008', 'SA3023', 'F1021699');
* gfn_setComboDeptValue(div0.cmb_group, div0.cmb_team, div0.cmb_sil, div0.cmb_sawon);
* gfn_setComboDeptValue(div0.cmb_group, div0.cmb_team, div0.cmb_sil);
* gfn_setComboDeptValue(div0.cmb_group, div0.cmb_team, div0.cmb_sil, null,  'SA1001', 'SA2008', 'SA3023', null);

*
* @param oCmbGroup 그룹콤보오브젝트(필수)
* @param oCmbTeam 팀콤보오브젝트(필수)
* @param sCmbSil 실콤보오브젝트(필수)
* @param oCmbSawon 사원콤보오브젝트(선택:null 이면 셋팅안함)
* @param sGroupValue 그룹값(null 이면 세션정보값 셋팅)
* @param sTeamValue 팀값(null 이면 세션정보값 셋팅)
* @param sSilValue 실값(null 이면 세션정보값 셋팅)
* @param sSawonValue 사원값(null 이면 세션정보값 셋팅)
* @return 없음
* @author 이명식
================================================================================
* 변경내역 : 
* YYYYMMDD 담당자명 변경내용(Why?,What?)
*******************************************************************************/
function gfn_setComboDeptValue(oCmbGroup, oCmbTeam, sCmbSil, oCmbSawon, sGroupValue, sTeamValue, sSilValue, sSawonValue)
{
	if(oCmbGroup != null)
	{	
		if(sGroupValue == null) sGroupValue = gm_group_id;
		oCmbGroup.value = sGroupValue;
		f_setComboDept(oCmbGroup, oCmbGroup.value);
	}
	if(oCmbTeam != null)
	{
		if(sTeamValue == null) sTeamValue = gm_team_cd;
		oCmbTeam.value = sTeamValue;
		f_setComboDept(oCmbTeam, oCmbTeam.value);
	}
	if(sCmbSil != null)
	{
		if(sSilValue == null) sSilValue = gm_sil_id;
		sCmbSil.value = sSilValue;
		f_setComboDept(sCmbSil, sCmbSil.value);
	}
	if(oCmbSawon != null)
	{
		if(sSawonValue == null) sSawonValue = gm_emp_no;
		oCmbSawon.value = sSawonValue;
		f_setComboDept(oCmbSawon, oCmbSawon.value);
	}
}

/*******************************************************************************
* 취급점조회 콤보박스 공통함수
*
* 폼이 로드될 때 콤보아이디를 넘겨 초기화시키며 콤보아이디를 넘기면 해당하는
* 콤보박스에 데이터셋을 생성하여 바인딩한다.
* 
* @param sCombo1 영업점콤보 아이디
* @param sCombo2 영업지부콤보아이디
* @param sCombo3 영업자콤보아이디
* @return 없음
================================================================================
* 변경내역 : 
* YYYYMMDD 담당자명 변경내용(Why?,What?)
*******************************************************************************/
function gfn_initComboOffc(sCombo1,sCombo2,sCombo3)
{

	var bIsInputValid = true;

	// 글로벌에 있는 조직데이터셋을 못가져오는 경우 조회
	if(gfn_findObject("gds_offc", "Dataset") == false || (gds_offc.GetCount() < 1))
	{
		Create("Dataset", "gds_offc");

		var t_URL = "service::sqlservice.do"  ;
		var t_InDatasets = "" ;
		var t_OutDatasets = "gds_offc=comm_cb6_srhOffcList";
		var t_Argument = " _sqlName=comm_cb6_srhOffcList";
	
		http.sync = true;
		Transaction("selectSelf"
				, t_URL
				, t_InDatasets
				, t_OutDatasets
				, t_Argument
				, "f_txComboCallback" ) ;
		http.sync = false;
	}

	// 콤보오브젝트 검증
	for(var i = 1; i < 4; i++)
	{
		var sComboObjTemp = Eval("sCombo"+i);
		if(!IsValid(Object(sComboObjTemp)))
		{	
			trace("콤보박스를 확인하여 주십시요. 입력콤보아이디: " + sComboObjTemp);
			bIsInputValid = false;
		}
	}
	// 데이터셋 생성하고 바인딩 및 이벤트 처리
	if(bIsInputValid)
	{		
		var gds_offc_local = eval("gds_offc");
		for(var i = 1; i < 4; i++)
		{
			var oComboObjTemp = Eval("sCombo"+i);
			//var comTmp = oComboObjTemp;
			//if(indexOf(oComboObjTemp,".cmb") > 0){
			//	comTmp  = substr(oComboObjTemp,indexOf(oComboObjTemp,".cmb")+1,oComboObjTemp.length);
			//}
			Create("Dataset", "ds_offc_"+i);
			var dsDeptTemp = Eval("ds_offc_"+i);
			gds_offc_local.Filter("JOJIK_GB="+(ToNumber(i)+1));
			dsDeptTemp.CopyF(gds_offc_local);
			
			dsDeptTemp.InsertRow(0);
			dsDeptTemp.SetColumn(0, "BELG_CD", "");
			dsDeptTemp.SetColumn(0, "BELG_BRCH", "-");
			dsDeptTemp.SetColumn(0, "BELG_NM", "전체");
			dsDeptTemp.SetColumn(0, "JOJIK_GB", i+1);
			dsDeptTemp.SetColumn(0, "HDOFC", oComboObjTemp);
	
			var oComboObj = Eval(oComboObjTemp);
			oComboObj.InnerDataset = "ds_offc_"+i;
			oComboObj.CodeColumn = "BELG_CD";
			oComboObj.DataColumn = "BELG_NM";
			if(i < 3){
				oComboObj.OnChanged = "f_setComboOffc_OnChanged";
			}
			oComboObj.Index = 0;
		}		
	}
} 
function f_setComboOffc(oCombo, sCode, innDs)
{	
	var tmpDs = substr(innDs,innDs.length-1,innDs.length+1);
	
	//생성된 데이터셋의 이름은 ds_offc_1,ds_offc_2,ds_offc_3	이중 변화될것은 2와3이고 넘어오는 값은 1과2이다.
	var sFindDataSetName = "ds_offc_"+(ToNumber(tmpDs)+1);
	var dsOffcTemp = Eval(sFindDataSetName);
	var oComboTmp = Eval(dsOffcTemp.GetColumn(0,"HDOFC"));
	if(tmpDs == "2") {
		//dsOffcTemp.Filter("BELG_BRCH='"+sCode+"' OR BELG_BRCH='-'");
		var t_URL = "service::sqlservice.do"  ;
		var t_InDatasets = "" ;
		var t_OutDatasets = "ds_offc_3=comm_cb6_srhHdlr";
		var t_Argument = "P_BELG_CD='"+sCode+"' _sqlName=comm_cb6_srhHdlr";
	
		http.sync = true;
		Transaction("selectHdlr"
				, t_URL
				, t_InDatasets
				, t_OutDatasets
				, t_Argument
				, "f_txComboCallback" ) ;
		http.sync = false;
		
		ds_offc_3.InsertRow(0);
		ds_offc_3.SetColumn(0, "BELG_CD", "");
		ds_offc_3.SetColumn(0, "BELG_BRCH", "-");
		ds_offc_3.SetColumn(0, "BELG_NM", "전체");
		ds_offc_3.SetColumn(0, "JOJIK_GB", 4);
		ds_offc_3.SetColumn(0, "HDOFC", oComboTmp);
	}else{
		dsOffcTemp.Filter("BELG_BRCH='"+substr(sCode,0,4)+"' OR BELG_BRCH='-'");
	}
	oComboTmp.Index = 0;
}
function f_setComboOffc_OnChanged(obj,strCode,strText,nOldIndex,nNewIndex)
{ 	
	f_setComboOffc(obj,strCode, obj.InnerDataSet);
}



/*******************************************************************************
* 취급점조회 콤보박스 공통함수
* 
* 그리드의 text 에 codeType을 넣어서 사용한다.
  -> :L 을 입력하면 기간계 코드를 가져온다.
  -> ex) APP_COM_501 (일반코드)
		 0826:L		 (기간계 코드)
================================================================================
* 변경내역 : 
* YYYYMMDD 담당자명 변경내용(Why?,What?)
*******************************************************************************/
function gfn_initGridComboCodes(grd_obj, idxCol){
	var sOutDs;
	var sTrId;
	var sDsTemp;
	var sTrId = "gridComboBox";
	var sCallBack = "";
	
	
	for(var i=0; i<=grd_obj.GetCellCount("HEAD"); i++){
		
		var sCodes = split(grd_obj.GetCellProp("BODY", i, "text"), ":");
		
		if( length(sCodes) > 0 ){
			sDsTemp = "ds_" + sCodes[0];
			
			Create("Dataset", sDsTemp);
			var objTemp = object(sDsTemp);
			
			
			//sOutDs = sDsTemp+"='"+sCodes[0]+"' ";
			
			//trace(sCodes[0]);
			//trace(sCodes[1]);
			
			
			if(sCodes[1] != "L"){
				sOutDs = sDsTemp+"='"+sCodes[0]+"' ";
				http.Sync = true;
				Transaction( sTrId,
							 "service::wfm.com.codeutil.do",
							 //"service::sys.codebook.codeutil.do",
							 "",
							 sOutDs,
							 "cmd=getCodes codeType=" + sCodes[0],
							 sCallBack);
				http.Sync = false;
				
				// 필터셋팅
				sFilter = "USEYN='Y'";
				objTemp.Filter(sFilter);
			}
			else if(sCodes[1] == "L"){
				sOutDs = sDsTemp+"='app_com_legacyCodeutil' ";
				http.Sync = true;
				var t_svcID = "legacyCodeutil" ;
				var t_URL = "service::app_com_legacyCodeutil.do" ;
				var t_InDatasets = "" ;
				var t_OutDatasets = sOutDs;
				var t_Argument = "_sqlName ='app_com_legacyCodeutil' "
							+ " codediv=" + quote("'" + sCodes[0] + "'")
							;
				var sCallBack = "";
				gfn_transaction(t_svcID, t_URL, t_InDatasets, t_OutDatasets, t_Argument, sCallBack ) ;	
				http.Sync = false;
			}
			
			
			//var oDsTemp = eval(objTemp);
			//traceDS(objTemp);
			
			grd_obj.SetCellProp("BODY", i, "combodataset", objTemp.id);
			grd_obj.SetCellProp("BODY", i, "combocol", "CODEID");
			grd_obj.SetCellProp("BODY", i, "combotext", "CODENAME");
		}
	}
}


/*******************************************************************************
* 기간계 코드 가져오기
* tbzacode 테이블만 지원된다.
* gfn_initCommonCodes 와 사용 방법은 같다.
================================================================================
* 변경내역 : 
* YYYYMMDD 담당자명 변경내용(Why?,What?)
*******************************************************************************/
function gfn_initLegacyCodes(sCodeSets, sCallBack, sTrId)
{
	// 코드셋 검증
	if(length(sCodeSets) == 0 ) 
	{
		trace("공통코드 gfn_initCommonCodes함수에 sCodeSets 파라메터 내용이 없습니다.");
		return;
	}
	
	// 공통코드 데이터 조회 파라메터 생성
	var sCodes = "'";
	var sOutDs = "";
	//trace("sCodeSets:"+sCodeSets);
	var arCodeSets = split(sCodeSets, ",");


	for(var i=0; i < length(arCodeSets); i++)
	{
		var sTemp = split(arCodeSets[i], "=");
		var sTempDsArgs = split(sTemp[1], ":");
		var sDsTemp = "ds_commcode_" + iif(indexOf(sTemp[0], ".") == -1, sTemp[0], replace(sTemp[0], ".", "_"));
		var sTempObjectName = sTemp[0];
		if(indexOf(sTemp[0], ".") > -1)
		{
			var arTempObjectSplit = split(sTemp[0], ".");
			sTempObjectName = arTempObjectSplit[length(arTempObjectSplit)-1];
		}
		//trace("sDsTemp:"+sDsTemp + " " + sTempObjectName);
		if(indexOf(sTempObjectName ,"cmb") == 0)
		{
			if(gfn_findObject(sDsTemp, "Dataset") == false)
			{
				Create("Dataset", sDsTemp);
			}

			var oComboObj;
			if(indexOf(sTemp[0], ".") != -1){
				oComboObj = eval(sTemp[0]);
			} else {
				oComboObj = f_findObject(this, sTemp[0]);
			}
			if(oComboObj == null)
			{
				trace(sTemp[0] + " 객체를 찾을 수가 없습니다.");
				continue;
			}
			
			//trace(sDsTemp);
			oComboObj.InnerDataset = sDsTemp;
			oComboObj.CodeColumn = "CODEID";		
			oComboObj.DataColumn = "CODENAME";
		}
		else
		{
			//- intae_add ----------------------------------------------------
			// combo 가 아닌 경우 dataset 으로 데이터를 받아온다.
			sDsTemp = iif(indexOf(sTemp[0], ".") == -1, sTemp[0], replace(sTemp[0], ".", "_"));
			if(gfn_findObject(sDsTemp, "Dataset") == false)
			{
				var objTemp = object(sDsTemp);
				Create("Dataset", sDsTemp);
				
				objTemp.InnerDataset = sDsTemp;
				objTemp.CodeColumn = "CODEID";		
				objTemp.DataColumn = "CODENAME";
			}
			//----------------------------------------------------------------
		}
			
		sCodes = "'" + sTempDsArgs[0] + "'";
		sOutDs = sDsTemp+"='app_com_legacyCodeutil' ";
		
		// 공통코드 데이터 조회
		if(sCallBack == null) sCallBack = "";
		if(sTrId == null) sTrId = "gfn_initCommonCodes_getCodes";
		
		http.Sync = true;
		var t_svcID = "legacyCodeutil" ;
		var t_URL = "service::app_com_legacyCodeutil.do" ;
		var t_InDatasets = "" ;
		var t_OutDatasets = sOutDs;
		var t_Argument = "_sqlName ='app_com_legacyCodeutil' "
					+ " code_div=" + quote(sCodes)
					;
		var sCallBack = "";
		gfn_transaction(t_svcID, t_URL, t_InDatasets, t_OutDatasets, t_Argument, sCallBack ) ;	
		http.Sync = false;
	}

	//trace(sOutDs);
	
	// 필터설정
	for(var i=0; i < length(arCodeSets); i++)
	{
		//trace(arCodeSets[i]);
		var sTemp = split(arCodeSets[i], "=");
		var sTempDsArgs = split(sTemp[1], ":");
		var sTempObjectName = sTemp[0];
		if(indexOf(sTemp[0], ".") > -1)
		{
			var arTempObjectSplit = split(sTemp[0], ".");
			sTempObjectName = arTempObjectSplit[length(arTempObjectSplit)-1];
		}
		var iCmbTxtIndex = indexOf(sTempObjectName,"cmb");
		var sObjNameReplaceUnderbar = iif(indexOf(sTemp[0], ".") == -1, sTemp[0], replace(sTemp[0], ".", "_"));
		var sDsTemp = "ds_commcode_" + sObjNameReplaceUnderbar;	
		var sFilter = "";

		if(iCmbTxtIndex != 0)
		{
			sDsTemp = sObjNameReplaceUnderbar;
		}
		//trace("sDsTemp#2:"+sDsTemp);
		var oDsTemp = eval(sDsTemp);

		//traceDS(oDsTemp);
		// 필터셋팅
		//sFilter = "USEYN='Y'";
	
		//trace("sTempDsArgs[1]:"+sTempDsArgs[1]+":"+sTempDsArgs[1]);
		//trace("sTempDsArgs[2]:"+sTempDsArgs[2]+":"+urlDecode(sTempDsArgs[2]));
		if(sTempDsArgs[2] != null && sTempDsArgs[2] != "")
		{
			sFilter = urlDecode(sTempDsArgs[2]);
		}		
		oDsTemp.Filter(sFilter);
		
		// 콤보인경우에"::선택::" 항목을 기본으로 생성하고 데이터셋이면 생성하지 않음
		//trace("sTempDsArgs[1]#1:"+sTempDsArgs[1] == "A");
		if(iCmbTxtIndex == 0 || sTempDsArgs[1] == "A" || sTempDsArgs[1] == "O")
		{
			//trace("sTempDsArgs[1]#2:"+sTempDsArgs[1]);
			if(sTempDsArgs[1] != "X")
			{
				var sTitle = iif(sTempDsArgs[1] == "A", "전체", ":: 선택 ::");
				
				oDsTemp.InsertRow(0);
				oDsTemp.SetColumn(0,"CODEID", "");
				oDsTemp.SetColumn(0,"CODENAME", sTitle);
				oDsTemp.SetColumn(0,"USEYN","Y");
				
				//traceDs(oDsTemp);
				
				if(iCmbTxtIndex == 0)
				{
					var oComboObj;
					if(indexOf(sTemp[0], ".") != -1){
						oComboObj = eval(sTemp[0]);
					} else {
						oComboObj = f_findObject(this, sTemp[0]);
					}
					oComboObj.index = 0;
				}
			}
		}
		
	}

}