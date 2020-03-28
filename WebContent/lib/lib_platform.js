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



// 콤보버튼의 기본값
var COMBO_SEL = "선택하세요";
var COMBO_ALL = "전체";


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
				col_header += pDataSet.GetColID(j) + " | ";
			}
			
			col_body += pDataSet.GetColumn(i,pDataSet.GetColID(j)) + " | ";
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
 * 공통코드 콤보
 *
 * @param  pCombo  Combo 컴포넌트
 * @param  pComCd  공통코드
 * @param  pValue  선택될값
 * @param  [pFirstSel] 첫항목으로 들어갈 값을 설정
 *         'COMBO_ALL': 전체 
 *         'COMBO_SEL' :선택하세요
 * @param  pFilterStr filter시 사용될 조건식 
 * @return  none
***************************************************************************************************/
function gfn_comCodeCombo(pCombo, pComCd, pValue, pFirstSel, pFilterStr){ 
 	var objDs;
 	var ds_name="ds_code_" + pCombo.id;
 	
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
 	if(length(pFilterStr) > 0){
		gds_code.Filter(pFilterStr);
 	}else{
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
 * DataSet 콤보
 *
 * @param  pCombo  Combo 컴포넌트
 * @param  pDataSet  입력 DataSet
 * @param  codeCol  codeColumn 명
 * @param  dataCol  dataColumn 명
 * @param  pValue  선택될값
 * @param  [pFirstSel] 첫항목으로 들어갈 값을 설정
 *         'COMBO_ALL': 전체 
 *         'COMBO_SEL' :선택하세요
 * @param  pFilterStr filter시 사용될 조건식 
 * @return  none
***************************************************************************************************/
function gfn_comDataCombo(pCombo, pDataSet, codeCol, dataCol,  pValue, pFirstSel, pFilterStr){ 
 	var objDs;
 	var ds_name="ds_code_" + pCombo.id;

 	if(gfn_isEmpty(pCombo.InnerDataset)){
 		Create("Dataset",ds_name);
 		objDs = object(ds_name);
 		objDs.AddColumn(codeCol,"STRING", 256);
		objDs.AddColumn(dataCol,"STRING", 256);
		pCombo.CodeColumn=codeCol;
		pCombo.DataColumn=dataCol;
		pCombo.InnerDataset = ds_name;
 	}
 	else {
 		objDs = object(pCombo.InnerDataset);
 		objDs = object(ds_name);
		objDs.ClearData();
		pCombo.CodeColumn=codeCol;
		pCombo.DataColumn=dataCol;
 	}
 	if(length(pFilterStr) > 0){
		pDataSet.Filter(pFilterStr);
 	}
	
	objDs.CopyF(pDataSet);
	
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
	
	pDataSet.UnFilter();
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
 * @return  none
***************************************************************************************************/
function gfn_makeCodeDataSet(pComCd, pFirstSel, pDsName){
	if(pDsName != null) {
		Create("Dataset",pDsName);
	}
	var objDs = object(pDsName);
	objDs.AddColumn("DTL_CD","STRING", 256);
	objDs.AddColumn("DTL_NM","STRING", 256);
	gds_code.Filter("MST_CD="+quote(pComCd));
	objDs.CopyF(gds_code);
	gds_code.UnFilter();
	if(length(pFirstSel) > 0){
		objDs.InsertRow(0);
		objDs.SetColumn(0, "DTL_CD", "");
		objDs.SetColumn(0, "DTL_NM", decode(pFirstSel, null, COMBO_SEL, "", COMBO_SEL, pFirstSel ));
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
	1. 함수명   : gfn_SetCmnCheckBox
	2. 파라미터 : gdsObj       -  데이터셋 객체
			 	  chkName      -  체크박스명
			 	  fnName       -  체크박스에 연동된 함수명(원 클릭)
			 	  bkColor      -  배경색
			 	  p_top        -  top 
			 	  p_left       -  left 
			 	  p_width      -  width 
			 	  p_height     -  height 
			 	  p_gab        -  체크박스간 띄울 간격
			 	  positionFlag -  수평, 수직 배치 설정 (row or col)
			 	  p_value      -  체크 유무 (true or fasle)
	3. 함수설명 : 공통 라디오
    4. 리턴값   : 없다.
  
  
  gfn_SetCmnCheckBox("chk_test","P021", "chk_test_OnClick", "white", 190, 107, 300, 20, 70, "row", true);
  
***************************************************************************************************/
function gfn_SetCmnCheckBox(chkName, pComCd, pValue,  onClickFunction, p_left, p_top, p_width, positionFlag)
{
 	var objDs, objId, flag ;
 	var ds_name="ds_code_" + chkName;
	var obj = Components["checkbox"];

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
		
		for(var j=0;j<chkObj.count;j++)	{
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
			formID.Create("Div", "Progress", 'width="400" height="144" Url="sys_common::wait.xml" visible="false"');		
		progressObj = formID.Progress;
	} else {
		progressObj = Find("Progress");
		if (progressObj != null && progressObj.GetForm() != this) progressObj = null;
		iTop = (height - 144) / 2;
		iLeft = (width - 400) / 2;
		if (progressObj == null)
			progressObj = Create("Div", "Progress", 'width="400" height="144" Url="sys_common::wait.xml" visible="false"');
	}
	
	progressObj.Left = iLeft;
	progressObj.Top = iTop;
	progressObj.Url = "sys_common::wait.xml";
	progressObj.Visible = visibleFlag;
		
	if (visibleFlag) progressObj.SetFocus();
	else if (!gfn_isEmpty(_showProgressWindow_currentComponent)) _showProgressWindow_currentComponent.SetFocus();
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

	if(Find("Ftp") == NULL){
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
	
	//savefilename = CommonFtp.GetCurrentDir() + "/" + savefilename;
	
	//trace("savefilename : "+savefilename);
	alert("savefilename : "+UrlDecode(savefilename));
	
	//* 파일의 존재 여부를 확인
	ret = CommonFtp.ExistFile(UrlDecode(savefilename));
	
	if (ret < 0) {
		CommonFtp.Close();
		alert("File이 존재하지 않아 삭제를 할수 없습니다.");
		return -1;
	}
	//* 파일을 삭제 함
	ret = CommonFtp.RemoveFile(CommonFtp.GetCurrentDir() + "/" + savefilename);
	//ret = CommonFtp.RemoveFile(savefilename);
	
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

//var target_url = "http://localhost:8095/Test_1/";
var target_url = "http://localhost:8088/TKS/";

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


/* 미완성*/
function gfn_ftpFileDelete(httpfileObj, filename, nRow, strCol, objState)
{
	trace("httpfileObj : " + httpfileObj);
	trace("filename : " + filename);	
	trace("nRow      : " + nRow);
	trace("strCol    : " + strCol);
	trace("objState  : " + objState);
	
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

	remote_url = target_url + "deleteFtpFile.jsp?path="+filefullname;

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


 /**
*	1. 함수명   : gfn_loadExcelFile
*	2. 파라미터 : pObjDs     - xcel을 로드할 Dataset Component
*	              pHeaderFg  - 첫 로우가 헤더인지 여부를 true/false로 전달, default - false
*	3. 함수설명 : Excel파일을 그리드에 로드한다.
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
		return;
	}
	
	var result = ext_ExcelImportByIndex( _fd_excel.FilePath + "\\" + _fd_excel.FileName, 0, pObjDs.id, 1, 1, 0, iif(pHeaderFg, 2,1));

	if(pObjDs.rowcount < 1){
		alert("내용이 없습니다.");
		return;
	}

	if(result == 0){
		alert("Excel 파일 로드에 성공하였습니다.");
	}else{
		alert("Excel 파일 로드에 실패하였습니다.");
	}
	
	return _fd_excel.FileName;
}



/* 미완성*/
function gfn_ftpFileDelete(httpfileObj, filename, nRow, strCol, objState)
{
	trace("httpfileObj : " + httpfileObj);
	trace("filename : " + filename);	
	trace("nRow      : " + nRow);
	trace("strCol    : " + strCol);
	trace("objState  : " + objState);
	
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

	remote_url = target_url + "deleteFtpFile.jsp?path="+filefullname;

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



/***************************************************************************************************
 * gfn_InsacdUseComcd : DataSet 콤보 - 회사코드 사용 콤보 조회
 * @param  pCombo     Combo 컴포넌트
 * @param  pDsName    입력 DataSet 명
 * @param  compCd     COMPY_CD (SUB)
 * @param  bigComCd   MST_CD (MST)
 * @param  insaComCd  INSA_COMM_CD (BAS)
 * @param  legComCd   LEG_DTL_CD (SUB)
 * @param  codeCol    codeColumn 명
 * @param  dataCol    dataColumn 명
 * @param  pValue  선택될값
 * @param  [pFirstSel] 첫항목으로 들어갈 값을 설정
 *         'COMBO_ALL': 전체 
 *         'COMBO_SEL' :선택하세요
 * @param  pFilterStr filter시 사용될 조건식 
 * @return  none
***************************************************************************************************/
function gfn_InsacdUseComcd(pCombo, pDsName, compCd, bigComCd, insaComCd, legComCd, codeCol, dataCol,  pValue, pFirstSel, pFilterStr)
{ 
	//gfn_DSCombo(cbo_ds_sel, "ds_test", "COM_ID", "COM_NM",  "", "--회사선택--");
    var objDs;
    
    if(pDsName == "")
    {
		return;
    }
    
    objDs = object(pDsName);
    
    pCombo.CodeColumn = codeCol;
	pCombo.DataColumn = dataCol;
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
 * gfn_InsacdNoUseComcd : DataSet 콤보 - 회사코드를 사용하지 않는 콤보조회
 * @param  pCombo     Combo 컴포넌트
 * @param  pDsName    입력 DataSet 명
 * @param  bigComCd   MST_CD (MST)
 * @param  insaComCd  INSA_COMM_CD (BAS)
 * @param  codeCol    codeColumn 명
 * @param  dataCol    dataColumn 명
 * @param  pValue  선택될값
 * @param  [pFirstSel] 첫항목으로 들어갈 값을 설정
 *         'COMBO_ALL': 전체 
 *         'COMBO_SEL' :선택하세요
 * @param  pFilterStr filter시 사용될 조건식 
 * @return  none
***************************************************************************************************/
function gfn_InsacdNoUseComcd(pCombo, pDsName, bigComCd, insaComCd, codeCol, dataCol,  pValue, pFirstSel, pFilterStr)
{ 
	//gfn_DSCombo(cbo_ds_sel, "ds_test", "COM_ID", "COM_NM",  "", "--회사선택--");

    var objDs;
    
    if(pDsName == "")
    {
		return;
    }
    
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












