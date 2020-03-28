var logTrace;
var resultCode;
var resultMessage;
var popupyn;
var naviyn;
var FnOnSize;

#include "script::common_code.js"


/**
 * 메시지창을 팝업.
 * @param showMsg
 * @return
 */
function gfn_message(showMsg)
{
	if (resultCode == '0' || length(resultCode) == 0) {	
		if (showMsg) {
			Progress.Url = "sys_common::done.xml";
			Progress.Visible = true;
		}
		return true;
	}
	
	if (getAttribute("timeout", "0") != "1") {		
		Open("sys_common::MessageView.xml", "", "258", "92", "Title=false Autosize=false");
	}
	
	if (resultCode == 'SessionTimeOut' && getAttribute("timeout", "0") == "0") {
		setAttribute("timeout", "1");
		global.g_mainform.logout();
	}

	return false;
}


/**
 * 메시지창을 팝업(확장).
 * @param showMsg
 * @return
 */
function gfn_messageEx(showMsg)
{
	if (resultCode == '0' || length(resultCode) == 0) {	
		if (showMsg) {
			Progress.Url = "sys_common::done.xml";
			Progress.Visible = true;
		}
		return true;
	}
	
	if (getAttribute("timeout", "0") != "1") {		
		Open("sys_common::MessageView.xml", "", "258", "92", "Title=false Autosize=false session=false");
	
	}
	
	if (resultCode == 'SessionTimeOut' && getAttribute("timeout", "0") == "0") {
		setAttribute("timeout", "1");
		global.g_mainform.logout();
	}

	return false;
}


/**
 * Grid Header 에 있는 Checkbox 를 눌렀을 경우 모든 Checkbox 를 선택.
 * expr 을 인자로 넘겨주는 경우 Expression 의 true, false 를 검사하여 선택가능.
 * Grid Redraw 제어.
 * @param gridID
 * @param dsID
 * @param colID
 * @param expr
 * @param checkCol
 * @return
 */
function gfn_checkAll(gridID, dsID, colID, expr, checkCol)
{
	gridID.Redraw = false;

	if (checkCol == null) {
		checkCol = "allchk";
	}
	
	var allChk = dsID.GetConstColumn(checkCol);
	if (allChk == null) {
		dsID.AddConstColumn(checkCol, '0');	
	}
	
	var chkVal = "";
	if (dsID.GetConstColumn(checkCol) == "1") chkVal = "0";
	else chkVal = "1";

	dsID.SetConstColumn(checkCol, chkVal);
	for (var i = 0; i < dsID.GetRowCount(); i++) {
		if (expr == null) dsID.SetColumn(i, colID, chkVal);
		else if (eval(expr)) dsID.SetColumn(i, colID, chkVal);
	}
	gridID.Redraw("head");
	gridID.Redraw = true;
}


/**
 * Grid Header 에 있는 Checkbox 를 눌렀을 경우 모든 Checkbox 를 선택.
 * expr 을 인자로 넘겨주는 경우 Expression 의 true, false 를 검사하여 선택가능.
 * Grid Visible 제어.
 * @param gridID
 * @param dsID
 * @param colID
 * @param expr
 * @return
 */
function gfn_checkAll2(gridID, dsID, colID, expr)
{
	var allChk = dsID.GetConstColumn("allchk2");
	gridID.visible = false;

	if (allChk == null) {
		dsID.AddConstColumn("allchk2", '0');	
	}
	
	if (dsID.GetConstColumn("allchk2") == "1")	{
		dsID.SetConstColumn("allchk2", "0");
		for (var i = 0; i < dsID.GetRowCount(); i++) {
			if (expr != null) {
				if (eval(expr)) dsID.SetColumn(i, colID, "0");
			} else {
				dsID.SetColumn(i, colID, "0");
			}
		}
	} else {
		dsID.SetConstColumn("allchk2", "1");
		for ( var i = 0; i < ds.GetRowCount(); i++) {
			if (expr != null) {
				if (eval(expr)) dsID.SetColumn(i, colID, "1");
			} else {
				dsID.SetColumn(i, colID, "1");
			}			
		}
	}
	gridID.Redraw("head");
	gridID.visible = true;
}


/**
 * dsSource 에 있는 chkColNm 의 Checkbox 중 선택된 row 의 valColNm 컬럼의 값을
 * 추출하여 dsTarget 에 셋팅한다.
 * @param dsTarget
 * @param dsSource
 * @param chkColNm
 * @param valColNm
 * @return
 */
function gfn_setCheckedValues(dsTarget, dsSource, chkColNm, valColNm) 
{
	dsTarget.ClearData();
	for (var i = 0 ; i < dsSource.GetRowCount(); i++) {
		if (dsSource.GetColumn(i, chkColNm) == "1") {
			dsTarget.AddRow();
			dsTarget.SetColumn(dsTarget.CurRow, 0, dsSource.GetColumn(i, valColNm));
		}
	}	
}


/**
 * Grid 에서 선택된 행을 위아래로 한칸씩 이동한다.
 * @param gridID
 * @param dsID
 * @param selRow 복수행인 경우 체크박스 컬럼명-String Type, 단일행인 경우 해당 행-Number Type
 * @param bFlag
 * @return
 */
function gfn_moveGridRow(gridID, dsID, selRow, bFlag)
{
	gridID.Redraw = false;
	
	var bMulti = (toNumber(selRow) != selRow);
	
	if (toUpper(bFlag) == "UP") {
		//** 첫번째 줄 선택한 경우 이동없음.
		if ((bMulti && dsID.GetColumn(0, selRow)) 
				|| (!bMulti && selRow == 0)) return;
		if (bMulti) {
			for (var i = 0; i < dsID.rowcount; i++) {
				if (dsID.GetColumn(i, selRow)) {
					dsID.InsertRow(i - 1);
					dsID.CopyRow(i - 1, dsID, i + 1);
					dsID.DeleteRow(i + 1);
					dsID.row = i - 1;
				}
			}
		} else {
			dsID.InsertRow(selRow - 1);
			dsID.CopyRow(selRow - 1, dsID, selRow + 1);
			dsID.DeleteRow(selRow + 1);
			dsID.row = selRow - 1;
		}
	} else if (toUpper(bFlag) == "DOWN") {
		//** 마지막 줄 선택한 경우 이동없음.
		if ((bMulti && dsID.GetColumn(dsID.rowcount - 1, selRow)) 
					|| (!bMulti && selRow == dsID.rowcount - 1)) return;		
		if (bMulti) {
			for (var i = dsID.rowcount - 1; i >= 0; i--) {
				if (dsID.GetColumn(i, selRow)) {
					dsID.InsertRow(i + 2);
					dsID.CopyRow(i + 2, dsID, i);
					dsID.DeleteRow(i);
					dsID.row = i + 1;
				}
			}
		} else {
			dsID.InsertRow(selRow + 2);
			dsID.CopyRow(selRow + 2, dsID, selRow);
			dsID.DeleteRow(selRow);
			dsID.row = selRow + 1;
		}
	}
	
	gridID.Redraw = true;
}


/**
 * Combo 에 binding 되는 Dataset에 Index 0번째 기본값 셋팅.
 * @param dsID
 * @param initCodeID
 * @param initCodeNm
 * @param initCodeTp
 * @return
 */
function gfn_setInitCombo(dsID, initCodeID, initCodeNm, initCodeTp) 
{
	if (dsID == null) {
		alert("DataSet이 지정되지 않았습니다.\n==>common.js -> setInitCombo");
		return;
	}
	
	var arrCodeID = Array();
	var arrCodeNm = Array();
	var arrCodeTp = Array();

	for (var i = 0; i < dsID.count; i++) {
		arrCodeID[i] = dsID.getColumn(i, "codeid");
		arrCodeNm[i] = dsID.getColumn(i, "codename");
		arrCodeTp[i] = dsID.getColumn(i, "codetype");
	}

	dsID.ClearData();
	dsID.InsertRow(0);
	dsID.SetColumn(0, "codeid", initCodeID);
	dsID.SetColumn(0, "codename", initCodeNm);
	dsID.SetColumn(0, "codetype", initCodeTp);

	for ( var i = 1; i <= length(arrCodeID); i++) {
		dsID.InsertRow(i );
		dsID.SetColumn(i, "codeid", arrCodeID[i - 1]);
		dsID.SetColumn(i, "codename", arrCodeNm[i - 1]);
		dsID.SetColumn(i, "codetype", arrCodeTp[i - 1]);
	}	
}


/**
 * Grid Multi Sort
 * 일반적인 경우 Single Sort.
 * Shift Key 를 누른 상태에서는 Multi Sort 로 동작.
 * Sort 한 컬럼 순서대로 우선순위가 정해짐.
 * @param gridID
 * @param dsID
 * @param nCell
 * @param bMulti
 * @return
 */
function gfn_gridSort(gridID, dsID, nCell, bMulti) {
	
	var colEdit = gridID.GetCellProp("Head", nCell, "Edit");	
	if (colEdit == "checkbox") return;	
	
	var colspan = gridID.GetCellProp("Head", nCell, "Colspan");
	if (colspan != 1) return;
	
	//** 데이타가 없으면 리턴한다.
	if (dsID.RowCount() < 1) return;
	if (!IsValid(Object("_ds_gridsort_" + gridID.ID))) {
		Create("Dataset", "_ds_gridsort_" + gridID.ID, "");
		Object("_ds_gridsort_" + gridID.ID).AddColumn("sortkey");
		Object("_ds_gridsort_" + gridID.ID).AddRow();
	}
	
	var bSingle = false;
	if (!getKeyState("shift") && bMulti == null) {
		//** 멀티소트 컬럼 헤더 초기화 (e.g. ,avail_cnt:D,sch_unit_cd:A	)
		if (length(Object("_ds_gridsort_" + gridID.ID).GetColumn(0,"sortkey")) > 0) {
			var arrSortCols = split(Object("_ds_gridsort_" + gridID.ID).GetColumn(0,"sortkey"), ",");
			for (var i = 0; i < length(arrSortCols); i++) {
				arrSortCols[i] = substr(arrSortCols[i], 0, indexOf(arrSortCols[i], ":"));
				for (var j = 0; j < gridID.GetCellCount("head"); j++) {
					//if(gridID.GetCellProp("head", j, "text") == arrSortCols[i])
					if (j != nCell)	{
						//gridID.SetCellProp("head", j, "text", replace(replace(gridID.GetCellProp("head", j, "text"), "▼", ""), "▲", ""));
						gridID.SetCellProp("head", j, "expandimage", decode(right(gridID.GetCellProp("head", j, "expandimage"), 4), "asce", "grid_btn_sort_desc", "desc", "grid_btn_sort_asce", "_asc", "grid_btn_sort_asc"));
					}
				}
			}	
			Object("_ds_gridsort_"+gridID.ID).SetColumn(0, "sortkey", "");//* 0번째 row 살림.
		}
		
		bSingle = true;
	}
	
	//** 멀티소트 첫 컬럼인 경우.
	else if (length(Object("_ds_gridsort_" + gridID.ID).GetColumn(0,"sortkey")) == 0) {
		gridID.Contents = replace(replace(gridID.Contents, "grid_btn_sort_asce", "grid_btn_sort_asc"), "grid_btn_sort_desc", "grid_btn_sort_asc");
	}

	//** 헤더, 바디.
	//var strHead = gridID.GetCellProp("head", nCell, "text");
	var strHead = right(gridID.GetCellProp("head", nCell, "expandimage"), 4); 
	
	//** 헤더 이동시 nCell 과 col 이 상이하여 수정함.
	//** 예) body는 한줄씩, 헤더는 2줄 또는 3줄인 경우 nCell 값을 colum 갯수로 나눈 나머지 값으로 대체.
	//var nCol = gridID.GetCellProp("head", nCell, "col");
	var nCol = nCell;
	var nRatio = gridID.GetCellCount("head") / gridID.GetCellCount("body");
	if (nRatio > 1) nCol = nCol % gridID.GetColCount();
	var strBody = gridID.GetCellProp("body", nCol, "colid");

	var strSort = "";

	if (bSingle) {
		gfn_gridSortSingle(gridID, dsID, nCell);
		if (indexOf(strHead,"asce") > -1 ) strSort = "," + strBody + ":D";
		else strSort = "," + strBody + ":A";
	} else {

		strSort = Object("_ds_gridsort_" + gridID.ID).GetColumn(0, "sortkey");
		if (indexOf(strHead,"desc") > -1 ) {
			//gridID.SetCellProp("head", nCell, "text", replace(strHead, "▲", "▼"));
			gridID.SetCellProp("head", nCell, "expandimage", "grid_btn_sort_asce");
			strSort = replace(strSort, "," + strBody + ":A", "," + strBody + ":D");
		} else if (indexOf(strHead, "asce") > -1) { 
			//gridID.SetCellProp("head", nCell, "text", replace(strHead, "▼", ""));
			gridID.SetCellProp("head", nCell, "expandimage", "grid_btn_sort_asc");
			strSort = replace(strSort, "," + strBody + ":D", "");
		} else {
			//gridID.SetCellProp("head", nCell, "text", "▲" + strHead);
			gridID.SetCellProp("head", nCell, "expandimage", "grid_btn_sort_desc");
			strSort += "," + strBody + ":A";
		}
		dsID.Sort(substr(strSort, 1));
	}
	//alert(sSort);
	Object("_ds_gridsort_" + gridID.ID).SetColumn(0, "sortkey", strSort);

	gridID.Redraw("body");
}


/**
 * Grid 컬럼별 소트.
 * @param gridID
 * @param dsID
 * @param nCell
 * @return
 */
function gfn_gridSortSingle(gridID, dsID, nCell) {

	var strHead = ""; //* 헤더 이름.
	var strBody = ""; //* 바디 이름.
	var gridCol;      //* 컬럼 갯수.

	//** 데이타가 없으면 리턴한다.
	if (dsID.RowCount() < 1) return;

	//** 컬럼 갯수를 구한다.
	gridCol = gridID.GetCellCount("head");
	
	strHead = right(gridID.GetCellProp("head", nCell, "expandimage"), 4); //gridID.GetCellProp("head", nCell, "text");
	
	var nCol = nCell;
	var nRatio = gridID.GetCellCount("head") / gridID.GetCellCount("body");
	if (nRatio > 1) nCol = nCol % gridID.GetColCount();
	strBody = gridID.GetCellProp("body", nCol, "colid");

	if (indexof(strHead, "asce") > -1 ) {
		//gridID.SetCellProp("head", nCell, "text", replace(strHead, "▼", "▲"));
		gridID.SetCellProp("head", nCell, "expandimage", "grid_btn_sort_desc");
		dsID.Sort(strBody, true);
	} else if (strHead == "desc") { 
		//gridID.SetCellProp("head", nCell, "text", replace(strHead, "▲", "▼"));
		gridID.SetCellProp("head", nCell, "expandimage", "grid_btn_sort_asce");
		dsID.Sort(strBody, false);
	} else {
		//** 생성된 화살표가 있으면 삭제.
		for (var i = 0; i < gridCol; i++) {
			var strHeadTmp = gridID.GetCellProp("head", i, "expandimage");
			var nHeadFlag1 = decode(strHeadTmp, "", 1, null, 1, 0);

			//var strHeadTmp = gridID.GetCellProp("head", i, "text");
			//var nHeadFlag1 = Pos(strHeadTmp, "▼");
			if (nHeadFlag1 == 0) {
				//strHeadTmp = strHeadTmp.Replace("▼", "");
				strHeadTmp = "grid_btn_sort_asc";
			} else {
				var nHeadFlag2 = Pos(strHeadTmp, "▲");
				if (nHeadFlag2 == 0) {
					//strHeadTmp = strHeadTmp.Replace("▲", ""); 
					strHeadTmp = "grid_btn_sort_asc"; 
				}
			}
			gridID.SetCellProp("head", i, "expandimage", strHeadTmp);   
			gridID.SetCellProp("head", i, "align", "center");
		}
		//** 새로운 컬럼을 클릭시 화살표 생성.
		//gridID.SetCellProp("head", nCell, "text", "▲" + strHead);
		gridID.SetCellProp("head", nCell, "expandimage", "grid_btn_sort_desc");   
		//** Dataset를 소트한다.
		dsID.Sort(strBody, true);
	}
}


/**
 * Grid 컬럼별 소트.
 * @param gridID
 * @param dsID
 * @param nCell
 * @param body
 * @return
 */
function gfn_gridSort2(gridID, dsID, nCell, body) 
{
	var strHead = ""; //* 헤더 이름.
	var strBody = ""; //* 바디 이름.
	var gridCol;      //* 컬럼 갯수.

	//** 데이타가 없으면 리턴한다.
	if (dsID.RowCount() < 1) return;
	
	//** 컬럼 갯수를 구한다.
	gridCol = gridID.GetCellCount("head");
	
	strHead = gridID.GetCellProp("head", nCell, "text");
	strBody = body;
	
	if (indexOf(strHead, "▼") != -1 ) {
		gridID.SetCellProp("head", nCell, "text", replace(strHead, "▼", "▲"));
		dsID.Sort(strBody, true);
	} else if (indexOf(strHead, "▲") != -1) { 
		gridID.SetCellProp("head", nCell, "text", replace(strHead, "▲", "▼"));
		dsID.Sort(strBody, false);
	} else {
		//** 생성된 화살표가 있으면 삭제.
		for (var i = 0; i < gridCol; i++) {
			var strHeadTmp = gridID.GetCellProp("head", i, "text");
			var nHeadFlag1 = Pos(strHeadTmp, "▼");
			if (nHeadFlag1 == 0) {
				strHeadTmp = strHeadTmp.Replace("▼", "");
			} else {
				var nHeadFlag2 = Pos(strHeadTmp, "▲");
				if (nHeadFlag2 == 0) {
					strHeadTmp = strHeadTmp.Replace("▲", ""); 
				}
			}
			gridID.SetCellProp("head", i, "text", strHeadTmp);   
			gridID.SetCellProp("head", i, "align", "center");
		}
		//** 새로운 컬럼을 클릭시 화살표 생성.
		gridID.SetCellProp("head", nCell, "text", "▲" + strHead);
		//** Dataset를 소트한다.
		dsID.Sort(strBody, true);
	}
}


/**
 * 재조회 하였을 경우 이전의 Sort 순서를 유지하도록 하는 메서드이다.
 * @param dsID
 * @param gridID
 * @return
 */
function gfn_sortPrevGridOrder(dsID, gridID)
{
	if (dsID.RowCount() < 1) return;
	var gridCol = gridID.GetCellCount("head");
	var sSort = "";
	
	for (var i = 0; i < gridCol; i++) {
		var strHead = gridID.GetCellProp("head", i, "text");
		var strBody = gridID.GetCellProp("body", gridID.GetCellProp("head", i, "col"), "colid");
	
		if (indexOf(strHead, "▼") > -1) {
			sSort += "," + strBody + ":D";
		} else if (indexOf(strHead, "▲") > -1) {
			sSort += "," + strBody + ":A";
		}
	}
	
	if (gfn_isEmpty(sSort)) return;

	dsID.FireEvent = false;	
	dsID.Sort(sSort);
	dsID.FireEvent = true;
}

/**
 * rowspan 된 Grid 에서 Column Index 를 구하는 메서드.
 * @param colSize
 * @param mergeCnt
 * @param nCell
 * @return
 */
function gfn_getColumnIndex(colSize, mergeCnt, nCell)
{
	var distColCnt = colSize - mergeCnt;
	
	if (nCell >= colSize) {
		var i = 1;
		while(1) {
			var stat = mergeCnt + distColCnt * i;
			if(nCell < stat) break;
			i++;
		}
		nCell = nCell - distColCnt * --i;
	}
	
	return nCell;
}


/**
 * 프로그래스 팝업창.
 * @param visibleFlag
 * @param formID
 * @return
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
 * 엑셀저장.
 * @param gridID
 * @param fileDlgID
 * @return
 */
function gfn_saveExcel(gridID, fileDlgID)
{
	if (fileDlgID.Open(global.g_lastopenpath)) {
		var fileName = fileDlgID.FileName;
		global.g_lastOpenPath = fileDlgID.FilePath;
		
		if (indexOf(ToLower(fileName), ".xls") == -1) 
			fileName += ".xls";
		
		gridID.SaveExcel(fileDlgID.FilePath + "\\" + fileName, "보고서");
	}
}

/**
 * FTP로 파일을 다운로드
 * 사용예 : gfn_ftpFileDownload("/123/", "123.txt", c:\temp, "123.txt", "59.12.238.168", "thisapp", "this1234", "21") ;
 *
 * @param filepath		리모트 파일의 경로(루트 기준의 경로)
 * @param filename		리모트 파일의 파일명
 * @param savefilepath	로컬의 파일의 경로
 * @param savefilename	로컬의 파일명
 * @param ftp_ip		FTP IP
 * @param ftp_id		FTP 계정
 * @param ftp_pass		FTP 패스워드
 * @param ftp_port		FTP 포트
 */
function gfn_ftpFileDownload(filepath, filename, savefilepath, savefilename, ftp_ip, ftp_id, ftp_pass, ftp_port)
{
	var ret ;
	var strAttr = 'Height="1" Left="1" Width="1" ';

	if(ftp_ip == null) ftp_ip = g_file_server_ip;
	if(ftp_id == null) ftp_id = 'thisapp';
	if(ftp_pass == null) ftp_pass = 'this1234';
	if(ftp_port == null) ftp_port = '21';

	if (Find("Ftp") == NULL && !IsValidObject("CommonFtp")) {
		Create("Ftp", "CommonFtp", strAttr);
	}

	if (Find("File") == NULL && !IsValidObject("CommonLocalFile")) {
		Create("File", "CommonLocalFile", strAttr);
	}
	//* FTP Connect
	ret = CommonFtp.Open(ftp_ip, ftp_id, ftp_pass, ftp_port );

	if(ret < 0) {
		alert(" FTP 연결 실패.");
		return;
	}
	//* FTP 디렉토리 이동
	ret = CommonFtp.ChangeDir(filepath);
	
	if(ret < 0) {
		Trace("디렉토리 이동시 에러 발생");
		return;
	}
	//* FTP 파일 다운로드
	ret = CommonFtp.GetFile(filename, savefilepath + "\\" + savefilename);
	Trace("ret [" + ret + "]");
	
	if (ret < 0) {
		alert("Get File실패");
		return;
	}

	Trace("ret [" + ret + "]");
	CommonFtp.Close();

	return ret;
}

/**
 * FTP 로 파일을 삭제
 * 사용예 : gfn_ftpFileRemove( "c:\123.txt", "path", "123.txt", "59.12.238.168", "thisapp", "this1234", "21") ;
 * @param filefullname	로컬파일의 경로+파일명
 * @param savefilepath	리모트 파일의 경로(루트 기준의 경로)
 * @param savefilename	리모트 파일의 파일명
 * @param ftp_ip		FTP IP
 * @param ftp_id		FTP 계정
 * @param ftp_pass		FTP 패스워드
 * @param ftp_port		FTP 포트
 */
function gfn_ftpFileRemove( filefullname, savefilepath, savefilename, ftp_ip, ftp_id, ftp_pass, ftp_port)
{
	var file_size;
	var ret ;
	var strAttr = 'Height="1" Left="1" Width="1" ';

	if (ftp_ip == null) ftp_ip = g_file_server_ip;
	if (ftp_id == null) ftp_id = 'thisapp';
	if (ftp_pass == null) ftp_pass = 'this1234';
	if (ftp_port == null) ftp_port = '21';

//	file_size = httpfileObj.GetFileSizeLocal(filefullname);

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
	//* 파일의 존재 여부를 확인
	ret = CommonFtp.ExistFile(savefilename);
	
	if (ret < 0) {
		CommonFtp.Close();
		alert("File이 존재하지 않아 삭제를 할수 없습니다.");
		return -1;
	}
	//* 파일을 삭제 함
	ret = CommonFtp.RemoveFile(CommonFtp.GetCurrentDir() + "/" + savefilename);
	
	if (ret < 0) {
		CommonFtp.Close();
		alert("File 삭제 실패");
		return -1;
	
	} else {
		CommonFtp.Close();
		return ret;
	}
}


/**
 * 콤보에 값을 추가.
 * Ex> addComboValue(0, ds_combo, "id", "%", "value", "전체");
 * @param index
 * @param dsID
 * @param code
 * @param codeVal
 * @param name
 * @param nameVal
 * @return
 */
function gfn_addComboValue(index, dsID, code, codeVal, name, nameVal)
{
	dsID.InsertRow(index);
	dsID.SetColumn(index, code, codeVal);
	dsID.SetColumn(index, name, nameVal);	
}


/**
 * 콤보에 값을 추가.
 * Ex> addComboValue2(0, ds_combo, "id", "%", "value", "전체", "useyn", "Y");
 * @param index
 * @param dsID
 * @param code
 * @param codeVal
 * @param name
 * @param nameVal
 * @param useyn
 * @param useynVal
 * @return
 */
function gfn_addComboValue2(index, dsID, code, codeVal, name, nameVal, useyn, useynVal)
{
	dsID.InsertRow(index);
	dsID.SetColumn(index, code, codeVal);
	dsID.SetColumn(index, name, nameVal);	
	dsID.SetColumn(index, useyn, useynVal);	
}


/**
 * 필수입력항목 체크.
 * Ex> if (!gfn_checkValue(highTemp, "최고기온")) return;
 * @param obj
 * @param objNm
 * @return
 */
function gfn_checkValue(obj, objNm)
{
		if (length(obj.value) == 0) {
			alert("'" + objNm + "'을 입력해주세요.");
			obj.SetFocus();
			obj.Setsel();
			return false;
		} else {
			return true;
		}			
}


/**
 * 필수입력항목 길이 체크.
 * Ex> if (gfn_checkLength(fact_name, "날씨팩터명", 50)) return;
 * @param obj
 * @param objNm
 * @param nMax
 * @return
 */
function gfn_checkLength(obj, objNm, nMax)
{
	if (lengthb(obj) > nMax ) {
		alert( "'" + objNm + "'항목의 입력범위가 초과되었습니다.\n\n'" + nMax 
				    + "byte'이하로 입력해 주세요. 현재는 '"+ lengthb(obj) +"byte' 입니다." );
		//obj.SetFocus();
		//obj.Setsel();
		return false;
	} else {
		return true;
	}			
}


/**
 * Form 의 툴팁처리.
 * @param visibleFlag
 * @param obj
 * @param nPosX
 * @param nPosY
 * @param strMsg
 * @param formID
 * @return
 */
function gfn_showToolTip(visibleFlag, obj, nPosX, nPosY, strMsg, formID)
{
	if (formID != null) {
		if (IsValidObject(Object("ToolTip"))) {
			formID.Create("TextArea", "ToolTip", 
			'BKColor="INFOBK" Border="Flat" Id="Tooltip" Readonly="TRUE" Visible="FALSE"'
			);
		}
	} else {
		if (Find("ToolTip") == null) {
			Create("TextArea", "ToolTip", 
			'BKColor="INFOBK" Border="Flat" Id="Tooltip" Readonly="TRUE" Visible="FALSE"'
			);
		}
	}

	if (visibleFlag) {
		var arr = Split(strMsg, "\n");
		var nMaxLength = 0;
		
		for (var i = 0; i < arr.length; i++) {
			var j = Length(arr[i]);
			if (j > nMaxLength) nMaxLength = j;
		}
		
		if (formID != null) {
			formID.ToolTip.Left = obj.Left + nPosX + 15;
			formID.ToolTip.Top = obj.Top + nPosY + 15;
			formID.ToolTip.Width = nMaxLength * 14;
			formID.ToolTip.Height = arr.length * 16;
			formID.ToolTip.Value = strMsg;
		} else {
			ToolTip.Left = obj.Left + nPosX + 15;
			ToolTip.Top = obj.Top + nPosY + 15;
			ToolTip.Width = nMaxLength * 14;
			ToolTip.Height = arr.length * 16;
			ToolTip.Value = strMsg;
		}
	}
	
	if (formID != null) formID.ToolTip.Visible = visibleFlag;
	else ToolTip.Visible = visibleFlag;
}


/**
 * Grid 의 툴팁처리.
 * @param gridID
 * @param nPosX
 * @param nPosY
 * @param nRow
 * @param nCell
 * @param nPivotIndex
 * @return
 */
function gfn_showGridToolTip(gridID, nPosX, nPosY, nRow, nCell, nPivotIndex)
{
	if (gfn_isEmpty(nRow) && nRow < 0) return;
	
	if (nRow < 0 || gfn_isEmpty(nRow)) {
		gridID.TooltipText = "";
	} else {
		var strText = gridID.GetCellText("Body", nRow, nCell);
		
		if (gridID.GetCellProp("Body", nCell, "Display") == "checkbox") {
			gridID.TooltipText = "";
		} else {
			gridID.TooltipText = strText;
		}
	}
}


/**
 * TextArea 의 내용을 Grid 의 Cell 에 보여줘야 하는 경우 사용.
 * @param strMsg
 * @param nLength
 * @return
 */
function gfn_getShortenString(strMsg, nLength)
{
	var message = trim(strMsg);
	var firstStmt = indexOf(message, "\n");

	if (firstStmt > 0) {
		message = substr(message, 0, firstStmt);
		if (length(message) > nLength) return substr(message, 0, nLength) + "...";
		else return message + "...";
	} else if (Length(message) > nLength) {
		return substr(message, 0, nLength) + "...";
	} else {
		return message;
	}
}


/**
 * jedi Framework 에서 사용되는 listparam 객체의 특정 key-rowindex 에 해당하는 값을 가져온다.
 * @param paramLog
 * @param key
 * @param rowIndex
 * @param column
 * @return
 */
function gfn_getListParamValue(paramLog, key, rowIndex, column)
{
	var startIndex = indexOf(paramLog, key + "=");
	if (startIndex == -1) return "";

	var head = "[column:";
	var body = "[0:";
	var columnIndex = -1;
		
	startIndex += length(key) + 1;
	startIndex = indexOf(paramLog, head, startIndex);
	startIndex += length(head);
	
	var endIndex = indexOf(paramLog, body, startIndex);
	var strHead = substr(paramLog, startIndex, endIndex - startIndex);
	var arrHead = split(strHead, ",");
	
	for (var i = 0; i < arrHead.length(); i++) {
		if (arrHead[i] == column) {
			columnIndex = i;
			break;
		}
	}
	
	if (columnIndex == -1) return "";
	
	startIndex += length(strHead);
	var strRowIndex = "[" + rowIndex + ":";
	startIndex = indexOf(paramLog, strRowIndex, startIndex);
	startIndex += length(strRowIndex);
	
	var strBody = substr(paramLog, startIndex, indexOf(paramLog, "]", startIndex));
	
	return NToken(strBody, ",", columnIndex + 1);
}


/**
 * Window의 Registry에 저장된 값을 가져온다.
 * @param key 데이터를 찿아올 KeyValue
 * @param defaultValue 데이터가 없는 경우 기본으로 Setting할 값
 * @return
 */
function gfn_getProperty(key, defaultValue)
{
	var res = ext_RegGetValue("HKEY_LOCAL_MACHINE", "SOFTWARE\\thm\\this", key, "S");

	if (res == 0) return defaultValue;
	else return res;
}


/**
 * Window의 Registry에 값을 저장한다.
 * @param key 데이터를 저장할 KeyValue
 * @param value 저장할 데이터
 * @return
 */
function gfn_setProperty(key, value)
{
	var err = ext_RegSetValue("HKEY_LOCAL_MACHINE", "SOFTWARE\\thm\\this", key, toString(value));
	return err;
}


/**
 * Grid 에 바인딩된 Dataset 의 rowIndex 번째 Row 를 선택.
 * rowIndex 는 0 부터 시작. 
 * @param dsID
 * @param rowIndex 선택할 Row 의 Index.
 * @return
 */
function gfn_selectRow(dsID, rowIndex) {
	dsID.row = rowIndex;
}


/**
 * 입력된 문자가 null 또는 빈문자인지 체크한다.
 * @param strVal
 * @return
 */
function gfn_isEmpty(strVal) {
	if (strVal == null || strVal == "") return true;
	else return false;
}


/**
 * PopupDiv 를 화면에 Popup 해서 사용자의 입력을 유도하는 메서드.
 * @param obj
 * @param objSenderObj
 * @param nPosX
 * @param nPosY
 * @return
 */
function gfn_trackMenu(obj, objSenderObj, nPosX, nPosY)
{
	trackpopup(obj, objSenderObj, nPosX, nPosY);
}


/**
 * Oracle의 Nvl함수와 유사 넘긴 변수가 Null이면 0을 Return.
 * @param inVal Nvl을 처리할 함수
 * @return toNumbe(rst)  
 */
function gfn_nvlN(inVal) 
{
	var rst = inVal;
	
	if (gfn_isEmpty(inVal) || inVal == null || inVal == "") {
		rst = "0";
	}
	return toNumber(rst);
}


/**
 * 숫자형 변수에 3자리 마다 ,(comma)를 처리하여 Return 데이터가 없는 경우 defaultVal 을 Return.
 * @param val
 * @param defaultVal 디폴트 리턴 값.
 * @param bTruncate 소수점이하 버림 여부체크.
 * @return rst comma 처리된 문자열.
 */
function gfn_addComma(val, defaultVal, bTruncate) 
{
	var rst = "";
	
	if (defaultVal == null && length(defaultVal) < 1) defaultVal = "";
	
	if (gfn_nvlN(val) == 0) return defaultVal;
	
	if (bTruncate) {
		val = Truncate(val);
	}

	val = toNumber(val) + "";
	var comPosi = indexOf(val, ".");
	
	//** case minus.
	var minusPosi = indexOf(val, "-");
	var bFlag = false;
	if (minusPosi > -1) {
		val = substr(val, minusPosi + 1, length(val));
		bFlag = true;
	}
	
	var Hval = val;
	var Tval = "";
	var HHval = "";
	
	if (comPosi > -1) Hval = substr(val, 0, comPosi);
	if (comPosi > -1) Tval = substr(val, comPosi + 1, length(val));
	
	if (length(Hval) % 3 != 0) HHval = substr(Hval, 0, length(Hval) % 3);
	
	Hval = substr(Hval, length(Hval) % 3);
	
	var roofCnt = 0;
	while (length(Hval) > 0) {
		if (rst != "") rst = "," + rst;
		rst = substr(Hval,  length(Hval)-3) + rst;
		
		Hval = substr(Hval, 0, length(Hval)-3);
		roofCnt++;
	}
	
	if (rst != "" && HHval != "") rst = "," + rst;
	rst = HHval + rst;
	
	if (comPosi > -1) rst += "." + Tval;
	
	//** case minus.
	if (bFlag) {
		rst = "-" + rst;
	}

	return rst;
}


/**
 * yyyyMMdd 형식의 입력된 날짜의 요일을 보여준다.
 * @param strDate
 * @return
 */
function gfn_getDayOfWeek(strDate) 
{
	return gfn_getDayOfWeekByIndex(GetDay(strDate));
}


/**
 * gfn_getDayOfWeek() 메서드의 종속관계.
 * @param strIndex
 * @return
 */
function gfn_getDayOfWeekByIndex(strIndex)
{
	return decode(strIndex, 0, '일', 1, '월', 2, '화', 3, '수', 4, '목', 5, '금', 6, '토');	
}


/**
 * null 또는 빈문자열을 "0" 으로 변환한다.
 * @param strVal
 * @return
 */
function gfn_setZero(strVal)
{
	if (strVal == "" || strVal == null) return "0";
	else return strVal;
}


/**
 * Key Press 시 파라미터에 해당하는 함수 실행.
 * @param nChar
 * @param nCharVal
 * @param fn
 * @return
 */
function gfn_pressKey(nChar, nCharVal, fn)
{
	if (nChar == nCharVal) {	
		fn;
	}
}


/**
 * Form에 속한 Components 중 Split 객체의 경로를 찾는 메소드이다.
 * gfn_getSplitComponent 메소드를 Recursive 하게 호출한다.
 * @return
 */
function gfn_getSplitObjectInfo()
{	
	this.Create("Dataset", "_ds_splitinfo");
	_ds_splitinfo.addcolumn("paramCompID");
	_ds_splitinfo.addcolumn("compID");

	gfn_getSplitComponent(this.Components, "this");
	_ds_splitinfo.Sort("paramCompID");
}


/**
 * gfn_getSplitObjectInfo() 메서드에 종속.
 * @param component
 * @param id
 * @return
 */
function gfn_getSplitComponent(component, id) 
{
	if (component.count == 0) return;
	
	for (var i = 0; i < component.count; i++) {
		if (component[i].GetType() == "Tab" || 
			component[i].GetType() == "MultiLineTab" || 
			component[i].GetType() == "Div" ||
			component[i].GetType() == "TabPage") {
			gfn_getSplitComponent(component[i].Components, id + "." + component[i].id);
		} else if (component[i].GetType() == "Split") {
			var currow = _ds_splitinfo.AddRow();
			_ds_splitinfo.SetColumn(currow, "compID", id + "." + component[i].id);
			_ds_splitinfo.SetColumn(currow, "paramCompID", id);
			continue;
		}
	}
}


/**
 * 화면의 OnSize Event에 해당 메소드를 정의하면,
 * GetSplitObjectInfo 메소드로 생성된 Split 객체를 모은 DataSet을 
 * 호출하여 Split 객체의 위치를 이동 시킨다.
 * @return
 */
function gfn_relocationSplitObject()
{
	for (var i = 0; i < _ds_splitinfo.rowcount; i++) {
		var splitObject = _ds_splitinfo.GetColumn(i, "compID");
		var paramObject = _ds_splitinfo.GetColumn(i, "paramCompID");

		if (paramObject == "this") {
			this.ResizeScroll();
			if (indexOf(splitObject, "Splith") != -1) this.Splith.Left = this.width;
			if (indexOf(splitObject, "Splitv") != -1) this.Splitv.Top = this.height;	
		} else {
			object(paramObject).ResizeScroll(); 
			if (indexOf(splitObject, "Splith") != -1) object(paramObject).Splith.Left = object(paramObject).width;
			if (indexOf(splitObject, "Splitv") != -1) object(paramObject).Splitv.Top = object(paramObject).height;
		}
	}
}


/**
 * Graph Series의 색깔을 설정한다.
 * @param graphObj
 * @return
 */
function gfn_setGraphColor(graphObj)
{
	graphObj.OpenData("COD_COLORS", graphObj.NSeries, 0);
	var graphColor = gfn_getGraphColor();
	
	for (var i = 0; i < graphObj.NSeries ; i++) {
		if (!gfn_isEmpty(graphColor[i])) graphObj.Series[i].Color = graphColor[i];
	}
	
	graphObj.CloseData("COD_COLORS");	
}	


/**
 * Graph Series의 색깔을 반환한다.
 * @return
 */
var _grpColor = Array(10);

function gfn_getGraphColor()
{
	if (gfn_isEmpty(_grpColor[0])) {
		_grpColor[0] = "#0099ff";
		_grpColor[1] = "#ff00ff";
		_grpColor[2] = "#33cc00";
		_grpColor[3] = "#ff9900";
		_grpColor[4] = "#cc00ff";
		_grpColor[5] = "#03d1e3";
		_grpColor[6] = "#fe6464";
		_grpColor[7] = "#84604a";
		_grpColor[8] = "#e79272";
		_grpColor[9] = "#0090a1";
		_grpColor[10] = "#c68764";
	}
	
	return _grpColor;
}


/**
 * 그리드에서 x, y 로 셀을 선택하는 메서드.
 * @param gridID 그리드 오브젝트.
 * @param dsID 데이터베이스 오브젝트.
 * @param nPosX 몇번째 컬럼인지..
 * @param nPosY 몇번째 로우인지..
 * @return
 */
function gfn_setGridPositionXY(gridID, dsID, nPosX, nPosY) 
{
	gridID.SetFocus();
	gridID.SetCellPos(nPosX);
	dsID.rowpos = nPosY;
}


/**
 * 날씨관련 이미지를 반환한다.
 * 순서 : 비, 눈, 고온, 저온, 황사
 * Ex> gfn_getWeatherImage("YNNNN");
 * @param weatherType 원하는 이미지를 순서대로 체크한다. 해당 날씨에 Y를 표시한다.
 * @return
 */
var _weatherImage = Array(5);

function gfn_getWeatherImage(weatherType)
{
	if (gfn_isEmpty(weatherType)) 
		return "";
	
	if (gfn_isEmpty(_weatherImage[0])) {
		_weatherImage[0] = "wth_rain";
		_weatherImage[1] = "wth_snow";
		_weatherImage[2] = "wth_high";
		_weatherImage[3] = "wth_low";
		_weatherImage[4] = "wth_sand";	
	}
	
	for (var i = 0; i < length(weatherType); i++) {
		var weatherFlag = CharAt(weatherType, i);
		if (weatherFlag == 'Y') return _weatherImage[i];
	}
	
	return "wth_default";
}




function _printPage()
{
	PrintScreen(false);
}

function _reloadPage()
{
	reload();
}


/**
 * 그리드내 달력 표현.
 * @param gridID
 * @param nRow
 * @param nCell
 * @param strColID
 * @return
 */
function gfn_makeGridCalendar(gridID, nRow, nCell, strColID)
{
	var arrCellRect =  gridID.GetCellRect(nRow, nCell);		
	var nLeft = gridID.Left + arrCellRect[0]; 			
	var nTop =  gridID.Top + arrCellRect[3]; 
	
	var divObj;
	for (var i = 0; i < Components.count; i++) {
		var tempObj = Components[i].id;
		var objType = object(tempObj).GetType();		
		if (objType == "Div"){			
			if (indexOf(object(tempObj).Contents, gridID.id) > -1) {
				divObj = object(tempObj);
				nLeft += divObj.Left + iif(divObj.Border = "Sunken", 2, 0);
				nTop += divObj.top + iif(divObj.Border = "Sunken", 2, 0);
				break;
			}
		}		
	}	
	
	var strObjID = "gridComCalendar";
	
	if (IsValidObject(object(strObjID))) {	
		if (object(strObjID).Visible == true) {
			Destroy(strObjID);
			return;
		}
		
		Destroy(strObjID);
	}
	
	var strAttr = "";
		strAttr += "ButtonImageID='Btn_i_calendar' ";
		strAttr += "DayStyle='calendar_day' ";
		strAttr += "HeadStyle='calendar_head' ";
		strAttr += "Height='166' ";
		strAttr += "Left='"+nLeft+"' ";
		strAttr += "LeftMargin='2' ";
		strAttr += "MonthOnly='TRUE' ";
		strAttr += "OnDayClick='GridComCalendar_OnDayClick' ";
		strAttr += "RightMargin='2' ";
		strAttr += "SaturdayTextColor='user10' ";
		strAttr += "SelDayStyle='calendar_sel' ";
		strAttr += "SpinStyle='1' ";
		strAttr += "Style='s_edit' ";
		strAttr += "SundayTextColor='user11' ";		
		strAttr += "TodayColor='user12' ";
		strAttr += "Top='"+nTop+"' ";
		strAttr += "WeekBKColor='user13' ";
		strAttr += "Width='168' ";		
	Create("Calendar", strObjID, strAttr);
	
	//object(strObjID).SetFocus();
	object(strObjID).Text = object(gridID.BindDataset).GetColumn(nRow, strColID);		
	object(strObjID).UserData = gridID.BindDataset + "!" + nRow + "!" + strColID + "!" + gridID.id;
}


/**
 * gfn_makeGridCalendar() 메서드의 종속관계.
 * 그리드내 캘린더에 대한 동적 이벤트함수 구현.
 * @param obj
 * @param strText
 * @return
 */
function gridComCalendar_OnDayClick(obj, strText)
{		
	var arryUserData = split(obj.userData,"!");	
	var dsObj = object(arryUserData[0]);	
	var nRow = arryUserData[1];
	var strColID = arryUserData[2];
	var gdObj = object(arryUserData[3]);				
	obj.Visible = false;
	dsObj.SetColumn(nRow, strColID,  strText);
}


function initCom2(popup,resize,thd,fth) 
{
	if(popup == 'Y')
		{
			var objForm = this;
			objForm.title = objForm.titletxt.Value;

			var bLeft =objForm.width ;
			
			//objForm.Create("button", "_btn_print", 'width="22" height="22" top="9" ImageID="btn_print" Cursor="HAND" OnClick="_printPage" left="'+(tonumber(bLeft)-87)+'" ');
			//objForm.Create("button", "_btn_reload", 'width="22" height="22" top="9" ImageID="btn_reload" Cursor="HAND" OnClick="_reloadPage" left="'+(tonumber(bLeft)-60)+'" ');
			objForm.Create("button", "_btn_close", 'width="20" height="20" top="10" ImageID="btn_close" Cursor="HAND" OnClick="child_close" left="'+(tonumber(bLeft)-30)+'" ');		
			titleimg.width = this.width-60;
			titleimg.left = 30;
			title_tail.left = this.width-30;
			title_head.left = 0;
			titletxt.style = "title";
		}
	if(resize != 'N')
	{
		ResizeInit();
	}
}

function initCom3(popup,resize,thd,fth) 
{
	if(popup == 'Y')
		{
			var objForm = this;
			objForm.title = objForm.titletxt.Value;

			var bLeft =objForm.width ;
			
			objForm.Create("button", "_btn_print", 'width="22" height="22" top="9" ImageID="btn_print" Cursor="HAND" OnClick="_printPage" left="'+(tonumber(bLeft)-60)+'" ');
			objForm.Create("button", "_btn_reload", 'width="22" height="22" top="9" ImageID="btn_reload" Cursor="HAND" OnClick="_reloadPage" left="'+(tonumber(bLeft)-30)+'" ');
			//objForm.Create("button", "_btn_close", 'width="20" height="20" top="10" ImageID="btn_close" Cursor="HAND" OnClick="child_close" left="'+(tonumber(bLeft)-30)+'" ');		
			titleimg.width = this.width-60;
			titleimg.left = 30;
			title_tail.left = this.width-30;
			title_head.left = 0;
			titletxt.style = "title";
		}
	if(resize != 'N')
	{
		ResizeInit();
	}
}

/**
 * 화면안의 componet에서 입력한 Object가 있는지 찿는다.
 *
 * @param objID 검색할 Object id
 * @param objType 검색할 Object id의 Type
 */
function gfn_findObject(objID, objType)
{
	if (components[objType] != null) {
		var cnt = components[objType].count();

		for (var i = 0; i < cnt; i++) {

			if (components[objType][i].id == objID) {
				return components[objType][i];
			}
		}
	}
	
	return false;
}

/**
 * 오브젝트를 스트링으로 받아서 지정된 오브젝트 범위내에서 검색하여 검색된 오브젝트를 리턴.
 * 
 * @param oObject 검색할 오브젝트 범위
 * @param sObjName 검색할 오브젝트의 스트링명
 * @return Object 검색된 오브젝트(값이 없으면 null)
 */
function f_findObject(oObject, sObjName)
{
	var oObjectComp = oObject.Components;
	
	for (var i = 0; i < oObjectComp.Count; i++ ) {

		if (oObjectComp[i].id == sObjName) {
			return oObjectComp[i];
		}
		
		if (oObjectComp[i].IsComposite()) {

			var oFindObjet = f_findObject(oObjectComp[i], sObjName);
			
			if (oFindObjet != null) {
				return oFindObjet;
			}
		}
	}
}

/**
 * 기능성 팝업함수
 * @param  p_id id중복체크 기능 - p_id(화면명 넘기기)
 * @param  p_url Ex> csi_send_c71::a.xml
 * @param  p_params open하는 윈도우로 넘길 param
 * @param  p_modal_yn modal 여부지정
 * @param  p_size 파라미터 자동 (NORMAL-830,590,FULL-1024,590 이외는 수동 (W,H,L,T) -> 중앙정렬시에는 L,T를 -1로 입력 "430,290,-1,-1"
 * @param  flag
 * @param  title_yn Title표시여부
 * @param  closeFlag 화면 상에 close X표를 나타낼 것인지 아닌지 표시
 * @param  scrollFlag 화면 상에 스크롤울 나타낼 것인지 아닌지 표시
 * @param  self_yn 화면의 팝업 기준위치를 팝업시키는 해당화면으로 할지에 대한 구분 데이터
 */
function gfn_idPopup(p_id, p_url, p_params, p_modal_yn, p_size, flag, title_yn, closeFlag, scrollFlag, self_yn)
{
	var modaless_strOpenStyle ;
	var modal_strOpenStyle ;
	var returnValue;
	
	if (title_yn == "Y" || gfn_isEmpty(title_yn)) {
		// modaless_strOpenStyle += ' Taskbar=true resize=true Autosize=true';
		// modal_strOpenStyle += ' Taskbar=true resize=true Autosize=false';

		if (toUpper(p_id) == "COMCM3_M900_P01") {
			modaless_strOpenStyle = "Title=true Autosize=false";
			modal_strOpenStyle = "Title=true Autosize=true";
		} else {
			modaless_strOpenStyle += ' Taskbar=true resize=true Autosize=true';
			modal_strOpenStyle += ' Taskbar=true resize=true Autosize=false';
		}
    } else {
		modaless_strOpenStyle = "Title=false Autosize=false";
		modal_strOpenStyle = "Title=false Autosize=true";
    }

	if (flag == false) modaless_strOpenStyle = "";

	if (scrollFlag == 'Y') {
		modaless_strOpenStyle += ' Scroll=true';
		modal_strOpenStyle += ' Scroll=true';
	}

	if (CloseFlag == false) {
		modaless_strOpenStyle += ' CloseFlag=false';
		modal_strOpenStyle += ' CloseFlag=false';
	}

	// Popup Size Style
	var arrSize;
	//var obj = gfn_findObject("global.TopBar");
	var obj = object("global.TopBar");
	var whoami ;
	if (isValidObject(obj) == true) {
		//if (gfn_findObject(obj) == true) {
		//var whoami = global.TopBar;
		//var whoami = obj;
		//obj.setfocus();
		whoami = obj;
	} else {
		//var whoami = this;
		whoami = this;
	}

// gf_idPopup(p_id, p_url, p_params, p_modal_yn, p_size, flag, title_yn, closeFlag, scrollFlag)

	// 화면의 중심이 팝업시키는 화면으로 기준을 이동...시키는 조건...
	if (self_yn == 'Y') {
		whoami = this;
	}

//trace("p_size : "+p_size);

	var curX = ClientToScreenX(whoami, 0) - 6;
	var curY = ClientToScreenY(whoami, 0) - 25;
	var x = 146;
	var y = 156;
trace("curX1 : "+curX + " curY1 :"+curY);

	switch (ToUpper(trim(p_size))) {
		case "NORMAL" :
			x = 146;
			y = 156;
			arrSize = split(trim("830,590," + x + "," + y ), ",");
		break;
		case "FULL" :
			x = 0;
			y = 97;
			arrSize = split(trim("1024,590," + x + "," + y), ",");
		break;
		default  	  :
			arrSize = split(trim(p_size), ",");
			if (arrSize[0] == "0" || arrSize[0] == "" || arrSize[1] =="0" || arrSize[1] == "") {
				arrSize[0] = "830";
				arrSize[1] = "590";
				arrSize[2] = "146";
				arrSize[3] = "156";
			}
	}
	
	if (arrSize[0] == "" || ParseInt(arrSize[0]) == 0) {
		arrSize[0] = -1;
	}
	if (arrSize[1] == "" || ParseInt(arrSize[1]) == 0) {
		arrSize[1] = -1;
	}
	if (arrSize[2] == "-1" || ParseInt(arrSize[2]) == -1) {
		arrSize[2] = toNumber(whoami.width/2) - toNumber(ParseInt(arrSize[0])/2);
	}
	if (arrSize[3] == "-1" || ParseInt(arrSize[3]) == -1) {
		//arrSize[3] = toNumber(whoami.height/2) - toNumber(ParseInt(arrSize[1])/2);
		if (isValidObject(obj) == true) {
			if (self_yn == 'Y') {
				arrSize[3] = toNumber(whoami.height/2) - toNumber(ParseInt(arrSize[1])/2);
			} else {
				arrSize[3] = toNumber(whoami.width/(8/3)) - toNumber(ParseInt(arrSize[1])/2);
			}
		} else {
			arrSize[3] = toNumber(whoami.height/2) - toNumber(ParseInt(arrSize[1])/2);
		}
	}
// trace("arrSize[0] = "+arrSize[0]);
// trace("arrSize[1] = "+arrSize[1]);
// trace("arrSize[2] = "+arrSize[2]);
// trace("arrSize[3] = "+arrSize[3]);
// trace("curY = "+curY);

	// Popup Modal/Modaless Style
	if( ToUpper(p_modal_yn) == "MODALESS") {
		returnValue = Open(p_url, p_params, arrSize[0], arrSize[1], modaless_strOpenStyle, eval(curX + parseInt(arrSize[2])), eval(curY + parseInt(arrSize[3])));
		trace("open("+p_url+", "+ p_params + ", "+ arrSize[0] + ", "+ arrSize[1] + ", "+ modaless_strOpenStyle + ", " + eval(curX + parseInt(arrSize[2])) +", "+ eval(curY + parseInt(arrSize[3])) + ")");
	} else if (ToUpper(p_modal_yn) == "MODAL" || ToUpper(p_modal_yn) == "") {
		returnValue = Dialog(p_url, p_params, arrSize[0], arrSize[1], modal_strOpenStyle, eval(curX + parseInt(arrSize[2])),  eval(curY + parseInt(arrSize[3])));
		trace("Dialog("+p_url + ", "+ p_params + ", "+arrSize[0] + ", "+arrSize[1] +", "+ modal_strOpenStyle +", "+ eval(curX + parseInt(arrSize[2])) +", "+ eval(curY + parseInt(arrSize[3])) +")");
	}
	return returnValue;
}


/**
 * Title Bar의 MDI에 창을 연다.
 *
 * @param formId  menu테이블의 메뉴아이디
 * @param formUrl  해당화면의 Url정보
 * @param formTitle   화면의 Title
 * @param popupYn   PopUp으로 처리할 것인지 Mdi안에 넣을 것인지구분
 */
function gfn_getTopNavigation(formId, formUrl, formTitle, popupYn)
{
	if (global.TopBar.ds_window.rowcount() > tonumber(global.TopBar.ds_winnum.getcolumn(0,"codename"))-1 && global.TopBar.ds_winnum.rowcount > 0) {
		alert("이미 "+global.TopBar.ds_winnum.getcolumn(0,"codename")+"개의 창이 열려있습니다. 다른창을 닫고 실행하세요.");
		return false;
	}

	if (global.TopBar.ds_window.findrow("formid",formId) > -1) {
		//* 폼아이디에 해당하는 윈도우가 없는 경우 생성
		if (isValidObject(formId) == false) {
			f_newNavigationWindow(formId, formUrl, formTitle, popupYn);
		}
		//* 폼아이디에 해당하는 윈도우를 활성화
		object(formId).setfocus();
		return;
	}

	gfn_newNavigationWindow(formId, formUrl, formTitle, popupYn);

	global.TopBar.ds_window.addrow();
	global.TopBar.ds_window.setcolumn(global.TopBar.ds_window.row, "formid", formId);
	global.TopBar.ds_window.setcolumn(global.TopBar.ds_window.row, "formtitle", formTitle);
	global.TopBar.ds_window.setcolumn(global.TopBar.ds_window.row, "formurl", formUrl);
	global.TopBar.ds_window.setcolumn(global.TopBar.ds_window.row, "popupyn", popupYn);

	global.TopBar.addTab(global.TopBar.ds_window.row, formId, formTitle);

}


/**
 * MDI에 PopUp 여부에 따라 화면을 메인MDI탭에 넣거나 PopUp으로 오픈한다.
 *
 * @param formId  menu테이블의 메뉴아이디
 * @param formUrl  해당화면의 Url정보
 * @param formTitle   화면의 Title
 * @param popupYn   PopUp으로 처리할 것인지 Mdi안에 넣을 것인지구분
 */
function gfn_newNavigationWindow(formId, formUrl, formTitle, formTitle_full, popupYn)
{
	trace("gfn_newNavigationWindow('"+formId+"','"+ formUrl+"','"+ formTitle+"','"+ formTitle_full+"','"+ popupYn+"') start...");
	if ( popupYn == "Y") {
		var s_param  = "";
		var s_status = "Title=True Status=true CloseFlag=true AutoSize=true Resize=false";

		if (indexOf( formUrl, "?" ) > -1) {
			s_param = substr( formUrl, indexOf( formUrl, "?" )+1, length(formUrl) );
			formUrl = substr( formUrl, 0, indexOf( formUrl, "?" ) );
			s_param = replace( s_param, "^", " " );
		}
		//Open( "csi_comm_cc1::CSICOMMCC1_M004.xml", "FormURL = "+formUrl+" form_title = "+formTitle+" form_id = "+formId, , , "Title=True Status=false CloseFlag=true AutoSize=false TaskBar=false Resize=false");
		Open("com_cm1::COMCM1_M004.xml", "FormURL="+quote(formUrl)+" form_title="+quote(formTitle)+" form_title_full="+quote(formTitle_full)+" form_id="+quote(formId), '', '', "Title=True Status=false CloseFlag=true AutoSize=false TaskBar=false Resize=false");
		formId.window.top = 100;
	} else {
		//NewWindow(formId, "csi_comm_cc1::CSICOMMCC1_M004.xml", "FormURL="+formUrl+" form_title="+formTitle+" form_id="+formId, 830 ,590, "OpenStyle=Max resize=true");
		NewWindow(formId, "com_cm1::COMCM1_M004.xml", "FormURL="+quote(formUrl)+" form_title="+quote(formTitle)+" form_title_full="+quote(formTitle_full)+" form_id="+quote(formId), 830 ,590, "OpenStyle=Max resize=true");
	}
	trace("gfn_newNavigationWindow() end...");
}


/**
 * 해당 화면에서 MDI의 메뉴를 클릭해서 오픈한 형태로 화면을 연다.
 *
 * @param form_pid      menu테이블의 메뉴아이디
 * @param form_url      해당화면의 Url정보
 * @param form_params   대상 화면에서 변수수 데이터를 받아 사용
	==> 파란 변수는 parent.변수명 형태로 받아서 사용
================================================================================
* 변경내역 :
* YYYYMMDD 담당자명 변경내용(Why?,What?)
*******************************************************************************/
function gfn_openOtherNaviMenu(form_pid, form_url, form_params)
{
//	var objFrm = Object("global.LeftBar.div_menu_p");
	var objFrm = Object("global.Leftbar.Div1.tab0.tab1.div_menu_p");

	objFrm.openOtherNaviMenu(form_pid, form_url, form_params);
}


/*******************************************************************************
* TopFrame에 탭을 추가하고 탭이 클릭되는 경우 호출하도록 데이터를 셋팅한다.
*
* @param formId menu테이블의 메뉴아이디
* @param formUrl 해당화면의 Url정보
* @param formTitle   화면의 Title
* @param popupYn  PopUp으로 처리할 것인지 Mdi안에 넣을 것인지구분
================================================================================
* 변경내역 :
* YYYYMMDD 담당자명 변경내용(Why?,What?)
*******************************************************************************/
function gfn_addTopNavigation(formId,formUrl,formTitle,formTitleFull,popupYn)
{
	trace("gfn_addTopNavigation('"+formId+"','"+ formUrl+"','"+ formTitle+"','"+ formTitle_full+"','"+ popupYn+"') start...");

	if (global.TopBar.ds_window.rowcount() > tonumber(global.TopBar.ds_winnum.getcolumn(0,"codename"))-1 && global.TopBar.ds_winnum.rowcount > 0) {
		alert("이미 "+global.TopBar.ds_winnum.getcolumn(0,"codename")+"개의 창이 열려있습니다. 다른창을 닫고 실행하세요.");
		return false;
	}

    //* 오픈된 화면인경우 focus 를 준다.
	if (global.TopBar.ds_window.findrow("formid", formId) >= 0) {
		object(formId).setfocus();
		return;
	}

	global.TopBar.ds_window.addrow();
	global.TopBar.ds_window.setcolumn(global.TopBar.ds_window.row, "formid", formId);
	global.TopBar.ds_window.setcolumn(global.TopBar.ds_window.row, "formurl", formUrl);
	global.TopBar.ds_window.setcolumn(global.TopBar.ds_window.row, "formtitle", formTitle);
	global.TopBar.ds_window.setcolumn(global.TopBar.ds_window.row, "formtitlefull", formTitleFull);
	global.TopBar.ds_window.setcolumn(global.TopBar.ds_window.row, "popupyn", popupYn);

	global.TopBar.addTab(global.TopBar.ds_window.row, formId, formTitle);

}

/**
 * 다이얼로그 박스를 띄우는 함수
 * Ex> gfn_dialogBox("select", "file_path", "file_name");
 *
 * @param var_gubun		다이얼로그 창 타입(SELECT/SAVE)
 * @param var_file_path	리턴받는 파일 경로의 변수명
 * @param var_file_name	리턴받는 파일명의 변수명
 * 
 */
function gfn_dialogBox(var_gubun, var_file_path, var_file_name)
{
	//* 객체목록저장 오브젝트 생성
	var objFDialogNM = "FDialogBox";
	var objFDialog = "";
	var file_path = "";
	var file_name = "";
	var err = true;

	if (isValidObject(objFDialogNM) == false) {
		Create("FileDialog", objFDialogNM);
	}
	objFDialog = eval(objFDialogNM);

	if (toUpper(var_gubun) == 'SAVE')
		objFDialog.Type = "Save";
	else
		objFDialog.Type = "Open";

//	objFDialog.Filter = "All(*.*)|*.*|Text File(*.txt)|*.txt|";

	if (objFDialog.Open()) {
		file_path = objFDialog.FilePath;
		file_name = objFDialog.FileName;
	
	} else {
		alert("File 을 선택하지 않으셨습니다.");
		file_path = "";
		file_name = "";
		err = false;
	}

	SetVariable(var_file_path, trim(file_path)); 
	SetVariable(var_file_name, trim(file_name));

	return err;
}


/**
 * 팝업화면 창 닫기.
 * @param form 폼오브젝트
 * @return
 */
function gfn_screenClose(form)
{
	//Trace("[창 닫기] 실행 --> " +form.id);
	var row = gds_screenList.FindRow("formID", form.id);
	if (row > -1) {
		gds_screenList.DeleteRow(row);
	}
	//Trace("[창 닫기] 종료 --> " +form.id);
	form.close();
}


/**
 * 전문통신을 하는 경우 데이터셋 또는 파라미터에 유저정보를 셋팅한다.
 * 데이터베이스통신을 하는 경우(추후 기능확장)
 * @param strSvcID
 * @param strURL
 * @param strInDatasets
 * @param strOutDatasets
 * @param strArgument
 * @param strCallbackFunc
 * @return
 */
function gfn_transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArgument, strCallbackFunc)
{
	//전문 통신일 경우만 처리
	/*
	if (IndexOf(strArgument,"_serviceName") >=0 ) {

		if(strIndatasets != "") {
			var oInDs = "";
			//var sInDs = gf_getParamValue(strInDatasets, "param");
			if(sInDs != "") {
				oInDs = gfn_findObject(sInDs, "Dataset");
				if(oInDs != false) {
					//oInDs.setColumn(0, "COMM_CHANNEL", "2");

				}
			}

		}

		//strArgument += " COMM_CHANNEL="+quote(2);

	}
	*/
	//trace(strargument);

	transaction(strSvcID, strURL, strInDatasets, strOutDatasets, strArgument, strCallbackFunc);

}


/**
 * dataset 용 trace.
 * @param dsID
 * @return
 */
function gfn_traceDS(dsID)
{
	var i,j;
	var tempStr = "";
	var RowCount = dsID.RowCount;
	var ColCount = dsID.ColCount;

	//Dataset ID 출력
	tempStr = "\n\n==============";
	tempStr = tempStr + "[" + dsID.id +  "(Cols:"+ ColCount + ", Rows:"+ rowCount + ")]==================\n";

	//Column Data 출력
	for ( i = 0 ; i < RowCount ; i++ ) {
		tempStr = tempStr + "----- " + i + " -----\n";

		for ( j = 0 ; j < ColCount ; j++ ) {
			tempStr = tempStr + "["+ dsID.GetColID(j) + "=" + dsID.GetColumn(i,j) + "]\n";
		}
	}
	
	tempStr = tempStr +"============================================================================\n\n";
	trace(tempStr);
}

/**
 * dataset 용 alert.
 * @param dsID
 * @return
 */
function gfn_alertDS(dsID)
{
	var i,j;
	var tempStr = "";
	var RowCount = dsID.RowCount;
	var ColCount = dsID.ColCount;

	//Dataset ID 출력
	tempStr = "\n\n==============";
	tempStr = tempStr + "[" + dsID.id +  "(Cols:"+ ColCount + ", Rows:"+ rowCount + ")]==================\n";

	//Column Data 출력
	for ( i = 0 ; i < RowCount ; i++ ) {
		tempStr = tempStr + "----- " + i + " -----\n";

		for ( j = 0 ; j < ColCount ; j++ ) {
			tempStr = tempStr + "["+ dsID.GetColID(j) + "=" + dsID.GetColumn(i,j) + "]";
		}
	}

	tempStr = tempStr +"============================================================================\n\n";
	alert(tempStr);
}



/**
 * 신규/수정 버튼 클릭에 따른 component 활성화/비활성화 처리.
 * Ex1> gfn_controlComponent("comm_co03_e004", true, "majorCode");
 * Ex2> gfn_controlComponent("comm_co03_e004", false, "majorCode", "focus:edt_majorCodeID");
 * Ex3> gfn_controlComponent("comm_co03_e004", false, "majorCode", "focus:edt_majorCodeID,tran:new");
 * Ex4> gfn_controlComponent("comm_co03_e004", false, "majorCode", "tran:new");
 * @param formID 폼아이디.
 * @param initFlag 초기화여부.
 * @param userKey 사용자 지정 컴포넌트 선별위한 키.
 * @param initFlag 신규/수정 구분.
 * @param expr 확장기능 수행을 위한 문자열.
 * @return
 */
function gfn_controlComponent(formID, initFlag, userKey, expr)
{
	var formObj = eval(formID);
	
	//** 제어할 컴포넌트 정의.
	var passComponent 	= "|Edit|MaskEdit|TextArea|Combo|Spin|Checkbox|Radio|List|Calendar|";
	var propReadonly 	= "|Edit|MaskEdit|TextArea|";
	var propEnable 		= "|Combo|Spin|Checkbox|Radio|List|Calendar|";
	var propText 		= "|Edit|";
	var propValue 		= "|MaskEdit|TextArea|Combo|Spin|Checkbox|Radio|List|Calendar|";

	//* component 제이이후  focus 처리를 위해 선언한 변수. 
	var firstIndex 	= "";
	var focusID 	= "";
	//* transaction 구분.
	var transStatus	= "";
	
	
	//*** 이후 expr 에 키워드를 선언함으로써 여러 속성정의가 가능하다.
	//*** expr = "XXX:YY,XXXX:YYYY" 의형태.
	if (!gfn_isEmpty(expr)) {
		var delimiterArr = split(expr, ",");
		
		for (var i = 0; i < delimiterArr.length; i++) {
			var tempArr = split(delimiterArr[i], ":");
			
			if (tempArr[0] == "focus") {
				focusID = tempArr[1];
			} else if (tempArr[0] == "tran") {
				transStatus = tempArr[1];
			}
		}
	}
	
	//** form 에 존재하는 특정 component 를 고른다.
	for (var j = 0; j < formObj.Components.count; j++) {
		//** component nt 의 타입을 알아내기.
		var objType = object(formObj.Components[j].id).GetType();

		//** 사용자 지정 component 처리되도록 분기처리.
		if (indexOf(passComponent, objType) == -1) {
			continue;
		}
		
		var userData = object(formObj.Components[j].id).UserData;
		var userStyle = object(formObj.Components[j].id).Style;
		
		if (initFlag && (indexOf(userData, userKey) > -1 || gfn_isEmpty(userKey))) {
			if (transStatus == "new") {
				if (indexOf(propText, objType) > -1) {
					object(formObj.Components[j].id).Text = "";
				} else if (indexOf(propValue, objType) > -1) {
					object(formObj.Components[j].id).Value = "";
				}
			}
			
			//* edit mode change.
			if (indexOf(propReadonly, objType) > -1) {
				object(formObj.Components[j].id).Readonly = true;
				//* style change.
				if (indexOf(userStyle, "_readonly") == -1) {
					object(formObj.Components[j].id).Style += "_readonly";
				}
			} else if (indexOf(propEnable, objType) > -1) {
				object(formObj.Components[j].id).Enable = false;
			}

		} else if (indexOf(userData, userKey) > -1 || gfn_isEmpty(userKey)) {
			//* focus setting.
			if (formObj.Components[j].id == focusID) firstIndex = j;
			
			//* new button click.
			if (transStatus == "new") {
				if (indexOf(propText, objType) > -1) {
					object(formObj.Components[j].id).Text = "";
				} else if (indexOf(propValue, objType) > -1) {
					object(formObj.Components[j].id).Value = "";
				}
			}
			
			//* edit mode change.
			if (indexOf(propReadonly, objType) > -1) {
				object(formObj.Components[j].id).Readonly = false;
				//* style change.
				if (indexOf(userStyle, "_readonly") > -1) {
					object(formObj.Components[j].id).Style = substr(userStyle, 0, userStyle.length - 9);
				}
			} else if (indexOf(propEnable, objType) > -1) {
				object(formObj.Components[j].id).Enable = true;
			}
		}
	}
	
	//* 사용자 지정 focus 설정.
	if (!gfn_isEmpty(firstIndex)) {
		formObj.Components[firstIndex].SetFocus();
	}

}