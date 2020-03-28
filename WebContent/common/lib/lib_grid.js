/***************************************************************************************************
 * gfn_grid_init Grid 공통 초기화  
 *
 * @param pGrid    - 그리드
 * ex)
***************************************************************************************************/

function gfn_grid_init(pGrid)
{
	
	// 그리드 바로 수정가능한 상태로
	pGrid.AutoEnter = True;

}


/***************************************************************************************************
 * gfn_grid_init Grid 복사하기 
 *
 * @param pGrid    - 그리드
 * @param pDataSet    - Dataset
 * @param nChar    - 키보드key
 * @param bCtrl    - 그리드 컨트롤 유무

 * ex)
***************************************************************************************************/
//(obj,nChar,bShift,bCtrl,bAlt,LLParam,HLParam)
function gfn_gridCopy(pGrid, pDataSet, nChar, bCtrl)
{	
	var csv_data;
	
	if (bCtrl == true )
	{
		if(nChar == 65) // 키보드이벤트 A 
		{
			for(i=0;i<pDataSet.count;i++)
			{
				pDataSet.SelectRow(i);
			}
		}

		if(nchar == 67) //키보드이벤트 C
		{
			ClearClipboard(); // 클립보드를 Clear합니다.
			csv_data = pGrid.GetCSVData(true);
			SetClipBoard("CF_CSV", csv_data);  // 외부 Excel에 Ctrl+c로 보냄.
		}
	}
}



/***************************************************************************************************
 * gfn_setGridCombo Grid combo DataSet 매핑 
 *
 * @param (pGrid    - 그리드
 * @param pDsName - 데이터셋 명
 * @param nCell   - 그리드순서
 * @param pComboCol   - 콤보컬럼명
 * @param pComboText   - 텍스트컬럼명 
 * ex)
***************************************************************************************************/

function gfn_setGridCombo(pGrid, pDsName, nCell, pComboCol, pComboText)
{
	var combo_col = "";
	var combo_text = "";
	
	if(pComboCol != null)
	{
		combo_col = pComboCol;
	}
	else
	{
		combo_col = "DTL_CD";
	}
	
	if(pComboText != null)
	{
		combo_text = pComboText;
	}
	else
	{
		combo_text = "DTL_NM";
	}
	
	pGrid.SetCellProp("body",nCell,"ComboDataSet",pDsName);
	pGrid.SetCellProp("body",nCell,"ComboCol",combo_col);
	pGrid.SetCellProp("body",nCell,"ComboText",combo_text);
}

/***************************************************************************************************
 * gfn_insa_setGridCombo Grid combo DataSet 매핑 
 *
 * @param (pGrid    - 그리드
 * @param pDsName - 데이터셋 명
 * @param nCell   - 그리드순서
 * @param pComboCol   - 콤보컬럼명
 * @param pComboText   - 텍스트컬럼명 
 * ex)
***************************************************************************************************/
function gfn_insa_setGridCombo(pGrid, pDsName, nCell, pComboCol, pComboText)
{
	var combo_col = "";
	var combo_text = "";
	
	if(pComboCol != null)
	{
		combo_col = pComboCol;
	}
	else
	{
		combo_col = "leg_DTL_CD";
	}
	
	if(pComboText != null)
	{
		combo_text = pComboText;
	}
	else
	{
		combo_text = "leg_DTL_NM";
	}
	
	pGrid.SetCellProp("body",nCell,"ComboDataSet",pDsName);
	pGrid.SetCellProp("body",nCell,"ComboCol",combo_col);
	pGrid.SetCellProp("body",nCell,"ComboText",combo_text);
}

/***************************************************************************************************
 * gfn_GridSort Grid 헤더 클릭시 Sort
 *
 * @param gridId    - 그리드 아이디
 * @param dataSetId - 데이터셋 아이디
 * @param cellNum   - 바인드 컬럼 이름
 * ex) gfn_GridSort(obj, nCell);
***************************************************************************************************/

function gfn_GridSort(gridId,dataSetId,cellNum)
{
	var str_head = ""; // 헤더 이름
	var str_body = ""; // 바디 이름
	var grd_col;       // 컬럼 갯수

	//데이타가 없으면 리턴한다.
	if(dataSetId.RowCount() < 1){
		return;
	}
	
	//컬럼 갯수를 구한다.
	grd_col = gridId.GetCellCount("head");
	
	str_head = gridId.GetCellProp("head",cellNum,"text");
	str_body = gridId.GetCellProp("body",cellNum,"colid");
	
	if(IndexOf(str_head,"▲ ") != -1 ){
	
		gridId.SetCellProp("head",cellNum,"text",replace(str_head,"▲ ","▼ "));
		dataSetId.Sort(str_body, false);
		
	}else if(IndexOf(str_head,"▼ ") != -1){
	
		gridId.SetCellProp("head",cellNum,"text",replace(str_head,"▼ ","▲ "));
		dataSetId.Sort(str_body, true);
		
	}else{
	
		//생성된 화살표가 있으면 삭제!
		for(i=0;i<grd_col;i++)
		{
			var str_head_tmp = gridId.GetCellProp("head",i,"text");
			var f_pos1 = Pos(str_head_tmp,"▲ ");
			if(f_pos1 == 0){
				str_head_tmp = str_head_tmp.Replace("▲ ","");
			}else{
				f_pos2 = Pos(str_head_tmp,"▼ ");
				if(f_pos2 == 0){
					str_head_tmp = str_head_tmp.Replace("▼ ","");
				}
			}
			gridId.SetCellProp("head",i,"text",str_head_tmp);
			gridId.SetCellProp("head",i,"align","center");
		}
		
		//새로운 컬럼을 클릭시 화살표 생성!
		gridId.SetCellProp("head",cellNum,"text","▼ "+str_head);
		//Dataset를 소트한다.
		dataSetId.Sort(str_body, false);
		
	}
}


/**
*	1. 함수명   : gfn_AddColumn
*	2. 파라미터 : dataSetId - 데이터셋 아이디
*	              colName   - 바인드 컬럼 이름
*	3. 함수설명 : 그리드에 리스트를 추가한다.
*   4. 리턴값   : 없음
*    
*/
function gfn_AddColumn(dataSetId,colName)
{
	dataSetId.InsertRow(dataSetId.rowcount);
	dataSetId.SetColumn(dataSetId.rowcount-1,colName,1);
}


/**
*	1. 함수명   : gfn_DeleteColumn
*	2. 파라미터 : dataSetId - 데이터셋 아이디
*	              colName   - 바인드 컬럼 이름
*	3. 함수설명 : 그리디에서 체크된 리스트를 삭제한다.
*   4. 리턴값   : 없음
*   
*/
function gfn_DeleteColumn(dataSetId,colName)
{
	// 삭제되면서 총 로우수가 변하므로 큰 것부터 삭제한다.
	for(var i=dataSetId.rowcount; i >= 0; i--)
	{	
		if(dataSetId.GetColumn(i,colName) == 1){
			dataSetId.DeleteRow(i);
		}
	}
}







/**
*	1. 함수명   : gfn_SetCheckBoxAllSelected
*	2. 파라미터 : cellNum   - 컬럼번호
*	              gridId    - 그리드 아이디
*	              dataSetId - 데이터셋 아이디
*	              colName   - 바인드 컬럼 이름
*	3. 함수설명 : 그리드 해더에서 체크박스를 클릭했을때 하위의 리스트들이 전부 체크되게 하는 함수
*   4. 리턴값   : 없음
*    
*/
function gfn_SetCheckBoxAllSelected(cellNum, gridId, dataSetId, colName)
{
	if(gridId.GetCellProp("head", cellNum, "Text") == 1){
	
		gridId.SetCellProp("head", cellNum, "Text", 0);
		
		for(i=0;i<dataSetId.RowCount();i++)
		{
			dataSetId.SetColumn(i, colName, 0);
		}
		
	}else{
		
		gridId.SetCellProp("head", cellNum, "Text", 1);
	
		for(i=0;i<dataSetId.RowCount();i++)
		{
			dataSetId.SetColumn(i, colName, 1);
		}
	}
}



/**
*	1. 함수명   : gfn_SetGridHeaderBodyValue
*	2. 파라미터 : gridObj - 그리드 객체
*	              gdsObj  - 글로벌 데이터셋 객체 (그리드의 )
*	              bindDs  - 데이터셋 아이디
*	              index   - 바인드 컬럼 이름
*	3. 함수설명 : 그리드의 헤더와 바디의 내용을 바꿔주는 메서드
*   4. 리턴값   : 없음
*    
*/
function gfn_SetGridHeaderBodyValue(gridObj,gdsObj,bindDs,index)
{
	var colidx = 0;
	var strColumns = '<columns>';
	var strHead = '<head>';
	var strBody = '<body>';

	for(i=0 ; i < gdsObj.rowcount ; i++) // 소스 데이터셋 카운트 루핑
	{
		//trace(headerName[i]);
		
		strColumns += '<col width="' + gdsObj.GetColumn(i,"colWidth") + '"/>';

		if(gdsObj.GetColumn(i,"headerName") == "checkbox"){
			strHead += '<cell col="' + colidx + '"' +
					   ' display="checkbox" ' +
					   ' edit="checkbox" ' +
					   ' bkcolor="user51" bkimagealign="stretch" bkimageid="grid_t_bg" color="user52" />';					   
		}else{
			strHead += '<cell col="' + colidx + '"' +
					   ' display="text" ' +
					   ' text="' + gdsObj.GetColumn(i,"headerName") + '"' +
					   ' bkcolor="user51" bkimagealign="stretch" bkimageid="grid_t_bg" color="user52" />';
		}	
		
		if(gdsObj.GetColumn(i,"headerName") == "checkbox"){
			strBody += '<cell col="' + colidx + '"' +
					   ' colid="' + gdsObj.GetColumn(i,"colid") + '"' +
					   ' align="' + gdsObj.GetColumn(i,"align") + '"' +
					   ' display="checkbox" edit="checkbox" '  + 
					   ' />';
		}else if(gdsObj.GetColumn(i,"headerName") == index){
			strBody += '<cell col="' + colidx + '"' +
					   ' colid="' + gdsObj.GetColumn(i,"colid") + '"' +
					   ' align="' + gdsObj.GetColumn(i,"align") + '"' +
					   ' display="text" expr="row+1" '  + 
					   ' />';
		}else{
			strBody += '<cell col="' + colidx + '"' +
					   ' colid="' + gdsObj.GetColumn(i,"colid") + '"' +
					   ' align="' + gdsObj.GetColumn(i,"align") + '"' +
					   ' display="text" '  + 
					   ' />';
		}
		
		colidx++;
	}
	
	strColumns += '</columns>';   //columns 정보  
	strHead += '</head>';         // header 정보  
	strBody += '</body>';         // body 정보    	
	gridObj.Contents = '<contents>' + strColumns + strHead + strBody + '</contents>';

	gridObj.BindDataset = bindDs;
}


/**
*	1. 함수명   : gfn_clearHeader
*	2. 파라미터 : griObj - 그리드 객체
*	3. 함수설명 : 그리드의 헤더에 있는 정렬 기호(삼각형)을 없앤다.
*   4. 리턴값   : 없음
*    
*/
function gfn_clearHeader(griObj)
{
	for(var i=0;i<griObj.GetCellCount("head");i++)
	{
		// Head Sort 표시 제거..
		griObj.SetCellProp("head",i,"text",replace(replace(griObj.GetCellProp("head",i,"text"),"▲"),"▼"));
	}
} 


/**
*	1. 함수명   : gfn_Grid_Multi_Sort
*	2. 파라미터 : gridObj  - 그리드 객체
*	              divFlag  - Div 화면으로 보여줄지 여부 판별
*	              startCol - 그리드의 몇번째 컬럼부터 팝업 그리드에 보여줄지 선택
*	3. 함수설명 : 그리드에서 멀티 정렬을 하기 위한 팝업화면을 띄운다.
*   4. 리턴값   : 없음
*    
*/
function gfn_Grid_Multi_Sort(gridObj, divFlag, startCol)
{
	var str_arg, str_result; 
	
	str_arg = "arg_grid=" + gridObj + " strDivFlag="+divFlag+" startColum="+startCol;
	str_result = Dialog("COMM::MULTI_SORT_POPUP.xml", str_arg, 350, 225, false, -1, -1);
	
	if((str_result != null)  && (str_result != "")){
		ds_test_data.Sort(str_result);
	}
	
} 

//*------------------------------------------------------------------------------------------------
//* ###############################################################################################
//* 달력 형식 그리드 생성 
//* ###############################################################################################
//*------------------------------------------------------------------------------------------------

//*------------------------------------------------------------------------------------------------
//* 함수설명     : 그리드 달력생성-휴일 체크
//* 함수유형     : 
//* parameter    :  yyyymmdd - 년월일 
//*              
//* return value : 휴일: 문자열 (휴일명) ,비휴일: ""
//* 비고         :
//*-----------------------------------------------------------------------------------------------
function gfn_CalGrid_IsHoliday(yyyymmdd)
{
	var mmdd;
	var lunar;

	////// 양력 체크
	mmdd = substr(yyyymmdd, 4, 4);
	
	// 신정 Check
	if( mmdd == "0101" )
		return "신정";
	// 삼일절
	if( mmdd == "0301" )
		return "삼일절";
	// 어린이날
	if( mmdd == "0505" )
		return "어린이날";
	// 현충일
	if( mmdd == "0606" )
		return "현충일";
	// 제헌절
	if( mmdd == "0717" )
		return "제헌절";
	// 광복절
	if( mmdd == "0815" )
		return "광복절";
	// 개천절
	if( mmdd == "1003" )
		return "개천절";
	// 성탄절
	if( mmdd == "1225" )
		return "성탄절";

	
	/////// 음력 체크
	lunar = Solar2Lunar( yyyymmdd );
	mmdd = substr(lunar, 4, 4);
	// 구정	
	if( mmdd == "1230" || mmdd == "0101" || mmdd == "0102" )
		return "설날";
	// 초파일
	if( mmdd == "0408" )
		return "석가탄신일";
	// 추석
	if( mmdd == "0814" || mmdd == "0815" || mmdd == "0816" )
		return "추석";
	// 일요일 Check
	if( GetDay(yyyymmdd) == 0 )
		return "일요일";
		  
	return "";
}

//*------------------------------------------------------------------------------------------------
//* 함수설명     : 그리드 달력생성-해당월의 맨 마지막 날짜를 찾는 함수
//* 함수유형     : 
//* parameter    : str_yyyymm 
//*              
//* return value : 성공 = 맨 마지막 날짜 ,실패 = -1
//* 비고         :
//*-----------------------------------------------------------------------------------------------
function gfn_CalGrid_GetLastDay(str_yyyymm)
{
	var int_year, int_month;
	var	len;
	var	yy, mm, last_day, dd;
	var	c;

	int_year = ToInteger(substr(str_yyyymm, 0, 4));
	int_month = ToInteger(substr(str_yyyymm, 4, 2));
	
	if( int_month < 1 || int_month > 12 )
	{
		return -1;
	}
	
	if ( int_month == 2 )
	{
		if ( (int_year%4) == 0 && (int_year%100) != 0 || (int_year%400) == 0 )
		{
			last_day = 29;
		}
		else
		{
			last_day = 28;
		}
	}
	else if ( int_month == 4 || int_month == 6 || int_month == 9 || int_month == 11 )
	{
		last_day = 30;
	}
	else
	{
		last_day = 31;
	}

	return last_day;
}

//*------------------------------------------------------------------------------------------------
//* 함수설명     : 그리드 달력생성-달력에 쓰일 기본정보 처리 내용
//*                매월마다 정보 갱신
//* 함수유형     : 
//* parameter    : ds_base_note_obj ,yyyymm
//* return value : 없음
//* 비고         :
//*-----------------------------------------------------------------------------------------------
function gfn_CalGrid_MakeBaseNote(ds_base_note_obj, yyyymm)
{
	var i;
	var last_day;
	var holiday, lunar, lunar_mm, lunar_dd;
	var row;
	var yyyymmdd;

	ds_base_note_obj.ClearData();
	last_day = gfn_CalGrid_GetLastDay(yyyymm);

	// 공휴일 지정
	for( i = 1 ; i < last_day ; i++ )
	{
		yyyymmdd = yyyymm+Lpad(i, "0", 2);
		holiday = gfn_CalGrid_IsHoliday(yyyymmdd);
		if( holiday != "" && holiday != "일요일" )
		{
			row = ds_base_note_obj.AddRow();
			ds_base_note_obj.SetColumn(row, "date", yyyymmdd);
			ds_base_note_obj.SetColumn(row, "note", holiday);
		}
	}
	
	// 음력표기(5일간격) ---- 없애기
	for( i = 1 ; i < last_day ; i++ )
	{
		if( i%5 == 1 )
		{
			yyyymmdd = yyyymm+Lpad(i, "0", 2);
			lunar = Solar2Lunar(yyyymmdd);
			lunar_mm = ToInteger(substr(lunar, 4, 2));
			lunar_dd = ToInteger(substr(lunar, 6, 2));
			row = ds_base_note_obj.AddRow();
			ds_base_note_obj.SetColumn(row, "date", yyyymmdd);
			ds_base_note_obj.SetColumn(row, "note", "("+lunar_mm+"."+lunar_dd+")");
		}
	}
	
}

//*------------------------------------------------------------------------------------------------
//* 함수설명     : 그리드 달력생성-달력 그리기
//* 함수유형     : 
//* parameter    : ds_calendar_obj ,grid_obj ,ds_base_note_obj ,yyyymm
//* return value : 없음
//* 비고         :
//*-----------------------------------------------------------------------------------------------
function gfn_CalGrid_DrawCalendar(ds_calendar_obj, grid_obj, ds_base_note_obj, yyyymm)
{
	var i, day, row, colid;
	var start_day, end_date, today;

	gfn_CalGrid_MakeBaseNote(ds_base_note_obj, yyyymm);	
	
	// Grid Header생성
	gfn_CalGrid_drawheader(grid_obj,yyyymm);
	
	// Dataset 만들기
	grid_obj.BindDataset = "";
	ds_calendar_obj.ClearData();
	start_day = GetDay(yyyymm+"01");
	last_date = gfn_CalGrid_GetLastDay(yyyymm);
	row = ds_calendar_obj.AddRow();
	
	for( i = 1, day = start_day ; i <= last_date ; i++ )
	{
		// 달력 생성			
		ds_calendar_obj.SetColumn(row, "day"+day, i);
		
		// 휴일 처리
		if( gfn_CalGrid_IsHoliday(yyyymm+Lpad(i, "0", 2)) != "" )
			ds_calendar_obj.SetColumn(row, "hol"+day, "1"); 
			
		// 음력일자 셋팅
		var base_note_row;
		base_note_row = ds_base_note_obj.FindRow("date", yyyymm+Lpad(i, "0", 2));
		if( base_note_row >= 0 )
			ds_calendar_obj.SetColumn(row, "base_note"+day, ds_base_note_obj.GetColumn(base_note_row, "note"));

		// 달력생성
		day = (day+1)%7;
		if( day == 0 && i != last_date )
			row = ds_calendar_obj.AddRow();
	}
	
	grid_obj.BindDataset = ds_calendar_obj.ID;
	
	
	// Grid높이 조정
	grid_obj.RowHeight = (grid_obj.Height - grid_obj.HeadHeight*2)/(ds_calendar_obj.RowCount()*3);

	//월 근태 마감 버튼 생성 - 월 마지막일에만 보이게 하기
    /*
    if(last_date!=substr(today(), 6, 2)){
		FinGeuntae.height=0;
	}
	*/
}

//*------------------------------------------------------------------------------------------------
//* 함수설명     : 그리드 달력생성-달력 그리기2
//* 함수유형     : 
//* parameter    : ds_calendar_obj ,grid_obj ,ds_base_note_obj ,yyyymm
//* return value : 없음
//* 비고         :
//*-----------------------------------------------------------------------------------------------
function gfn_CalGrid_DrawCalendar2(ds_calendar_obj, grid_obj, ds_base_note_obj, yyyymm)
{
	var i, day, row, colid;
	var start_day, end_date, today;

	gfn_CalGrid_MakeBaseNote(ds_base_note_obj, yyyymm);	
	
	// Grid Header생성
	gfn_CalGrid_drawheader(grid_obj,yyyymm);
	
	// Dataset 만들기
	grid_obj.BindDataset = "";
	ds_calendar_obj.ClearData();
	start_day = GetDay(yyyymm+"01");
	last_date = gfn_CalGrid_GetLastDay(yyyymm);
	row = ds_calendar_obj.AddRow();
	
	for( i = 1, day = start_day ; i <= last_date ; i++ )
	{
		// 달력 생성			
		ds_calendar_obj.SetColumn(row, "day"+day, i);
		
		// 휴일 처리
		if( gfn_CalGrid_IsHoliday(yyyymm+Lpad(i, "0", 2)) != "" )
			ds_calendar_obj.SetColumn(row, "hol"+day, "1"); 
			
		// 음력일자 셋팅
		var base_note_row;
		base_note_row = ds_base_note_obj.FindRow("date", yyyymm+Lpad(i, "0", 2));
		if( base_note_row >= 0 )
			ds_calendar_obj.SetColumn(row, "base_note"+day, ds_base_note_obj.GetColumn(base_note_row, "note"));

		// 달력생성
		day = (day+1)%7;
		if( day == 0 && i != last_date )
			row = ds_calendar_obj.AddRow();
	}
	
	grid_obj.BindDataset = ds_calendar_obj.ID;
	
	
	// Grid높이 조정
	grid_obj.RowHeight = (grid_obj.Height - grid_obj.HeadHeight*2)/(ds_calendar_obj.RowCount()*3.8);

	//월 근태 마감 버튼 생성 - 월 마지막일에만 보이게 하기
    /*
    if(last_date!=substr(today(), 6, 2)){
		FinGeuntae.height=0;
	}
	*/
}
//*------------------------------------------------------------------------------------------------
//* 함수설명     : 그리드 달력생성-달력 그리드 헤더 텍스트 생성 (사용자가 선택한 해당월)
//* 함수유형     : 
//* parameter    : grid_obj ,yyyymm
//* return value : 없음
//* 비고         :
//*-----------------------------------------------------------------------------------------------
function gfn_CalGrid_drawheader(grid_obj,yyyymm)
{
	grid_obj.UserData = yyyymm;
	grid_obj.SetCellProp("head",0,"text",substr(yyyymm, 0, 4) + "년 " + ToInteger(substr(yyyymm, 4,2)) + "월");
}
