/***************************************************************************************************
 * 차트 초기화 
 *
 * @param  차트 오브젝트, 차트 타이틀, 서브타이틀, 차트좌측, 차트바닥글, 우측 Legend 표시유무, TeeList 사용유무, 3D유무, 값보기유무
 * @return  none
 * 주의: 우측 Legend 표시유무는 (TeeListbox 를 사용할때는 false 처리하고 TeeListBox 사용안하면 true 처리)
***************************************************************************************************/
function gfn_init_chart(chart, title_text, subtitle_text, left_text, bottom_text, isLegend, isUseTeeList)
{
	
	if(chart == null) alert("차트가 null 입니다.");
	
	
	// chart 속성
	chart.SetTheme(ctFacts);	// 테마(기본) 	
	
	chart.Aspect.View3D = false;	// 3D 유무
	chart.Panel.BevelWidth = 0;		// 판넬 베벨 두께
	chart.Panel.color = gfn_rgb(255, 255, 255);	// 배경색
	chart.Scroll.Enable = 0;	// Scroll 좌우로만 이동 (0: 없음, 1:좌우만 이동)
	chart.Language = 24;	// 한국어
	//chart.Language =0;	// 영어
	

	// Title
	gfn_set_title(chart, title_text);

	// Sub Title
	gfn_set_subtitle(chart, subtitle_text);

	gfn_set_left(chart, left_text);


	//Wall Color (3D일때 벽의 색깔)
	chart.Walls.Back.color = gfn_rgb(255,187,187);		// 뒤
	chart.Walls.Left.color = gfn_rgb(187,187,187);		// 좌측
	chart.Walls.Bottom.color = gfn_rgb(187,187,187);	// 바닥


	//하단 (X축)
	chart.Axis.Bottom.Title.Font.color = gfn_rgb(16, 58, 142);	// 글자색
	chart.Axis.Bottom.Title.Font.Name = "돋움";			// 글자체
	chart.Axis.Bottom.Title.Font.Size = 10;					// 크기
	chart.Axis.Bottom.AxisPen.color = gfn_rgb(108,108,108);		// line color
	chart.Axis.Bottom.Ticks.color = gfn_rgb(108,108,108);		// Tick Color

	if(bottom_text != "")
	{
		chart.Axis.Bottom.Title.Caption = bottom_text;			// 텍스트
	}

	chart.Axis.Bottom.Labels.Font.color = gfn_rgb(108,108,108);	// X축값 글자색
	chart.Axis.Bottom.Labels.Font.Name = "돋움";			// X축값 글자체
	chart.Axis.Bottom.Labels.Font.Size = 8;					// X축값 크기
	

	//차트 우측의 목록
	chart.Legend.Visible = isLegend;
	chart.Legend.LegendStyle = 1;		// Legend 표시방식 = lsSeries
	chart.Legend.TextStyle = 0;			// Text 표시방식 = ltsPlain
	chart.Legend.Font.color = gfn_rgb(108,108,108);	// 글자색
	chart.Legend.Font.Name = "돋움";			// 글자체
	chart.Legend.Font.Size = 8;					// 크기
	chart.Legend.ShadowColor = gfn_rgb(108,108,108);	//Shadow 배경색
	chart.Legend.checkboxes = true;
	chart.Legend.alignment = 1;


	/// Tools //
	chart.Tools.Clear();

	// Animation tool
	//chart.Tools.Add(14);	
	//chart.Tools.Items(0).asSeriesAnimation.Steps = 200;		// 증가스텝
	//chart.Tools.Items(0).asSeriesAnimation.DrawEvery = 1;	// 1개씩 움직이게
	//chart.Tools.Items(0).asSeriesAnimation.StartAtMin = false;	// Y축 0에서 시작 (만약 true이면 최소값에서 시작됨)

	// 마우스 롤오버시 힌트(Mark Tip)
	chart.Tools.Add(8);
	chart.Tools.Items(0).Active = true;
	chart.Tools.Items(0).asMarksTip.Delay = 100;
	chart.Tools.Items(0).asMarksTip.MouseAction = 0;
	chart.Tools.Items(0).asMarksTip.Style = 0;
	chart.Tools.Items(0).asMarksTip.Style = 0;

	// 차트 색상(팔레트) => 이걸 적용해도 Series의 색상이 엎어버린다.
	//chart.ApplyPalette(cpDefault);

	// 데이타 초기화
	chart.RemoveAllSeries();

}

/***************************************************************************************************
 * TeeCommander 초기화
 *
 * @param  커멘드명, 차트명
 * @return  none
 * 주의: 
***************************************************************************************************/
function gfn_init_commander(commander, chart)
{
	commander.Chart = chart;
	
	arCom = Array();
	
	/*
	var tcbNormal = 0; 
	var tcbSeparator = 1;
	var tcbRotate = 2; 
	var tcbMove = 3; 
	var tcbZoom = 4; 
	var tcbDepth = 5; 
	var tcbEdit = 6; 
	var tcbPrintPreview = 7;
	var tcbCopy = 8; 
	var tcbSave = 9; 
	var tcbLabel = 10;
	var tcb3D = 11;
	*/
	
	
	// 커멘드 명령창
	for(var i=0;i<12;i++)
	{
		arCom[i] = i;
	}
	
	commander.Controls = arCom;
}


/***************************************************************************************************
 * 차트에 배열로 데이터 생성 
 *
 * @param  차트, 차트명, 차트index, 차트타입, X축배열, Y축배열, 계단형태유무
 * @return  none
 * 주의: arrX[순번] = x축값, arrY[순번] = y축값 (순번은 동일해야 함)
***************************************************************************************************/
function gfn_add_series_array(chart, title, index, type, arrX, arrY, isStairs )
{
	if(arrX == null || arrY == null) return;

	// series type 
	var iType = ToNumber(type);

	chart.AddSeries(iType);		// 차트 타입

	chart.Series(index).title = title;	// 제목
	chart.Series(index).Clear();
	chart.Series(index).Marks.Style = 0;	// 값스타일
	chart.Series(index).Cursor = 21;
	chart.Series(index).ColorEachPoint = false;	// 각각의 포인트 색지정(하나의 series의 각포인트의미이므로 false)
	chart.Series(index).ColorEachLine = false;	// 각각의 라인 색지정(하나의 series의 각포인트의미이므로 false)
	
	chart.Series(index).Marks.Visible = false;	// 값을 보일지
	chart.Series(index).Color = gfn_set_color(index);
	chart.Series(index).asLine.Stairs = isStairs;	// 계단형태
	

	// line 관련 추가셋팅
	if(iType == 0)
	{
		chart.Series(index).asLine.Pointer.Visible = true;	// Line에 점찍기
		chart.Series(index).asLine.LinePen.Width = 1;			// 선 굵기
		chart.Series(index).Marks.Style = 0;					// Value
	}
	
	// bar 관련 추가셋팅
	else if(iType == 1)
	{
		chart.Series(index).Marks.Style = 0;					// Value
	}

	// area 관련 추가셋팅
	else if(iType == 3)
	{
		chart.Series(index).asArea.Stairs = true;
		chart.Series(index).Marks.Style = 0;					// Value
	}
	// pie 관련 추가셋팅
	else if(iType == 5)
	{
		chart.Series(index).asPie.AutoMarkPosition = true;		// mark 위치 자동지정
		chart.Series(index).Marks.Style = 2;					// Label + Value
	}
	else
	{
		chart.Series(index).Marks.Style = 0;					// Value
	}

	for(var i=0; i< Length(arrX); i++)
	{
		
		chart.Series(index).Add(arrY[i],arrX[i], gfn_set_color(index));
	}
	
	// 포인트 지정
	gfn_set_line_pointer(chart, index);
		
	
}

/***************************************************************************************************
 * 차트에 DataSet 으로 데이터 생성 
 *
 * @param  차트, 차트명, 차트index, 차트타입, 데이터셋명, X축Row, Y축Row, 계단형태유무
 * @return  none
 * 주의: 컬럼은 가변적으로 변하는것이다(CrossTab).
***************************************************************************************************/
/*
function gfn_add_series(chart, title, index, type, arrX, arrY, isStairs )
{
	if(arrX == null || arrY == null) return;

	// series type 
	var iType = ToNumber(type);

	chart.AddSeries(iType);		// 차트 타입

	chart.Series(index).title = title;	// 제목
	chart.Series(index).Clear();
	chart.Series(index).Marks.Style = 0;	// 값스타일
	chart.Series(index).Cursor = 21;
	chart.Series(index).ColorEachPoint = false;	// 각각의 포인트 색지정(하나의 series의 각포인트의미이므로 false)
	chart.Series(index).ColorEachLine = false;	// 각각의 라인 색지정(하나의 series의 각포인트의미이므로 false)
	
	chart.Series(index).Marks.Visible = false;	// 값을 보일지
	chart.Series(index).Color = gfn_set_color(index);
	chart.Series(index).asLine.Stairs = isStairs;	// 계단형태
	

	// line 관련 추가셋팅
	if(iType == 0)
	{
		chart.Series(index).asLine.Pointer.Visible = true;	// Line에 점찍기
		chart.Series(index).asLine.LinePen.Width = 1;			// 선 굵기
		chart.Series(index).Marks.Style = 0;					// Value
	}
	
	// bar 관련 추가셋팅
	else if(iType == 1)
	{
		chart.Series(index).Marks.Style = 0;					// Value
	}

	// area 관련 추가셋팅
	else if(iType == 3)
	{
		chart.Series(index).asArea.Stairs = true;
		chart.Series(index).Marks.Style = 0;					// Value
	}
	// pie 관련 추가셋팅
	else if(iType == 5)
	{
		chart.Series(index).asPie.AutoMarkPosition = true;		// mark 위치 자동지정
		chart.Series(index).Marks.Style = 2;					// Label + Value
	}
	else
	{
		chart.Series(index).Marks.Style = 0;					// Value
	}

	for(var i=0; i< Length(arrX); i++)
	{
		chart.Series(index).Add(arrY[i],arrX[i], gfn_set_color(index));
	}
	
	//chart.Series(index).ColorEachPoint=true;
	//chart.Series(index).ColorEachLine=true;
	
	
}
*/


/***************************************************************************************************
 * 차트에 DataSet 으로 데이터 생성 (컬럼 ROW 사용)
 *
 * @param  차트, 차트명, 차트index, 차트타입, 데이터셋명, X축Row, Y축Row, 계단형태유무
 * @return  none
 * 주의: 컬럼은 가변적으로 변하는것이다(CrossTab).
***************************************************************************************************/
function gfn_add_series_dataset(chart, title, index, type, pDataSet, rowX, rowY, isStairs )
{
	if(pDataSet == null) return;

	// series type 
	var iType = ToNumber(type);

	chart.AddSeries(iType);		// 차트 타입

	chart.Series(index).title = title;	// 제목
	chart.Series(index).Clear();
	chart.Series(index).Marks.Style = 0;	// 값스타일
	chart.Series(index).Cursor = 21;
	chart.Series(index).ColorEachPoint = false;	// 각각의 포인트 색지정(하나의 series의 각포인트의미이므로 false)
	chart.Series(index).ColorEachLine = false;	// 각각의 라인 색지정(하나의 series의 각포인트의미이므로 false)
	
	chart.Series(index).Marks.Visible = false;	// 값을 보일지
	chart.Series(index).Color = gfn_set_color(index);
	chart.Series(index).asLine.Stairs = isStairs;	// 계단형태
	

	// line 관련 추가셋팅
	if(iType == 0)
	{
		chart.Series(index).asLine.Pointer.Visible = true;	// Line에 점찍기
		chart.Series(index).asLine.LinePen.Width = 1;			// 선 굵기
		chart.Series(index).Marks.Style = 0;					// Value
	}
	
	// bar 관련 추가셋팅
	else if(iType == 1)
	{
		chart.Series(index).Marks.Style = 0;					// Value
	}

	// area 관련 추가셋팅
	else if(iType == 3)
	{
		chart.Series(index).asArea.Stairs = true;
		chart.Series(index).Marks.Style = 0;					// Value
	}
	// pie 관련 추가셋팅
	else if(iType == 5)
	{
		chart.Series(index).asPie.AutoMarkPosition = true;		// mark 위치 자동지정
		chart.Series(index).Marks.Style = 2;					// Label + Value
	}
	else
	{
		chart.Series(index).Marks.Style = 0;					// Value
	}

	for(var c=1; c< pDataSet.colcount; c++)
	{
		
		//trace("c="+pDataSet.GetColumn(rowY, c) +"/"+ pDataSet.GetColumn(rowX, c));
		
		chart.Series(index).Add(pDataSet.GetColumn(rowY, c), pDataSet.GetColumn(rowX, c), gfn_set_color(index));
	}
	
	// 포인트 지정
	gfn_set_line_pointer(chart, index);
		
	
}



/***************************************************************************************************
 * 차트에 DataSet 으로 데이터 생성 (컬럼ID 사용)
 *
 * @param  차트, 차트명, 차트index, 차트타입, 데이터셋명, X축ID, Y축ID, 계단형태유무
 * @return  none
 * 주의: 컬럼은 가변적으로 변하는것이다(CrossTab).
***************************************************************************************************/
function gfn_add_series_datasetID(chart, title, index, type, pDataSet, colX, colY, isStairs )
{
	if(pDataSet == null) return;

	// series type 
	var iType = ToNumber(type);

	chart.AddSeries(iType);		// 차트 타입

	chart.Series(index).title = title;	// 제목
	chart.Series(index).Clear();
	chart.Series(index).Marks.Style = 0;	// 값스타일
	chart.Series(index).Cursor = 21;
	chart.Series(index).ColorEachPoint = false;	// 각각의 포인트 색지정(하나의 series의 각포인트의미이므로 false)
	chart.Series(index).ColorEachLine = false;	// 각각의 라인 색지정(하나의 series의 각포인트의미이므로 false)
	
	chart.Series(index).Marks.Visible = false;	// 값을 보일지
	chart.Series(index).Color = gfn_set_color(index);
	chart.Series(index).asLine.Stairs = isStairs;	// 계단형태
	

	// line 관련 추가셋팅
	if(iType == 0)
	{
		chart.Series(index).asLine.Pointer.Visible = true;	// Line에 점찍기
		chart.Series(index).asLine.LinePen.Width = 1;			// 선 굵기
		chart.Series(index).Marks.Style = 0;					// Value
	}
	
	// bar 관련 추가셋팅
	else if(iType == 1)
	{
		chart.Series(index).Marks.Style = 0;					// Value
	}

	// area 관련 추가셋팅
	else if(iType == 3)
	{
		chart.Series(index).asArea.Stairs = true;
		chart.Series(index).Marks.Style = 0;					// Value
	}
	// pie 관련 추가셋팅
	else if(iType == 5)
	{
		chart.Series(index).asPie.AutoMarkPosition = false;		// mark 위치 자동지정
		chart.Series(index).Marks.Style = 2;					// Label + Value
	}
	else
	{
		chart.Series(index).Marks.Style = 0;					// Value
	}
	

	for(var row=0; row< pDataSet.rowcount; row++)
	{
		chart.Series(index).Add(pDataSet.GetColumn(row, colY), pDataSet.GetColumn(row, colX), gfn_set_color(index));
	}	
	
	
	// 포인트 지정
	gfn_set_line_pointer(chart, index);
		
	
}




/***************************************************************************************************
 * 차트에 DataSet 으로 데이터 생성 (파이용)
 *
 * @param  차트, 차트명, 차트index, 차트타입, 데이터셋명, X축ID, Y축ID, 계단형태유무
 * @return  none
 * 주의: 컬럼은 가변적으로 변하는것이다(CrossTab).
***************************************************************************************************/
function gfn_add_series_datasetPie(chart, title, index, type, pDataSet, colX, colY, isStairs )
{
	if(pDataSet == null) return;

	// series type 
	var iType = ToNumber(type);

	chart.AddSeries(iType);		// 차트 타입

	chart.Series(index).title = title;	// 제목
	chart.Series(index).Clear();

	chart.Series(index).Marks.Style = smsLabelPercent;					// Label + %
	chart.Series(index).Cursor = 21;
	chart.Series(index).ColorEachPoint = false;	// 각각의 포인트 색지정(하나의 series의 각포인트의미이므로 false)
	chart.Series(index).ColorEachLine = false;	// 각각의 라인 색지정(하나의 series의 각포인트의미이므로 false)
	
	chart.Series(index).Marks.Visible = false;	// 값을 보일지
	chart.Series(index).Color = gfn_set_color(index);
	
	
	chart.Series(index).asPie.AutoMarkPosition = true;		// mark 위치 자동지정
	//chart.Series(index).asPie.PieMarks.VertCenter = true;
	chart.Series(index).asPie.Circled  = true;
	chart.Series(index).asPie.CircleHeight = 20;
	chart.Series(index).asPie.CircleWidth = 20;
	
	chart.Series(index).asPie.PieMarks.LegSize = 1;
	chart.Series(index).asPie.XRadius = 60;
	chart.Series(index).asPie.YRadius = 60;
	
	//chart.Series(index).asPie.Transparency = 50;
	
	chart.Series(index).Marks.RoundSize = 5;	// 마크의 모서리 둥글게
	
	chart.Series(index).Marks.ArrowLength = -20;	// 파이 안으로 넣기 
	chart.Series(index).Marks.Arrow.Show();
	
	for(var row=0; row< pDataSet.rowcount; row++)
	{
		chart.Series(index).Add(pDataSet.GetColumn(row, colY), pDataSet.GetColumn(row, colX), gfn_set_color(row));
	}	
	
	
}



/***************************************************************************************************
 * 차트 값보기
 *
 * @param  차트, 값 볼지유무
 * @return  none
 * 주의: 
***************************************************************************************************/
function gfn_view_chart_value(chart, isView)
{
	if(chart == null) return;
	
	for(var i=0;i<chart.SeriesCount;i++)
	{
		if(isView)
		{
			chart.Series(i).Marks.Visible = true;	// 값보이기
		}
		else
		{
			chart.Series(i).Marks.Visible = false;	// 안보이기
		}
	}
	
	
	
	
}




// 차트 페이징 설정

/***************************************************************************************************
 * 차트 페이징 설정 
 *
 * @param  차트 오브젝트, 한화면에 보여질 카운트
 * @return  none
 * 주의: 
***************************************************************************************************/
function gfn_set_pagecount(chart, page_count)
{
	chart.Page.MaxPointsPerPage = page_count;	// 페이지당 보일 카운트
}


/***************************************************************************************************
 * 차트와 리스트 바인드 하기
 *
 * @param  차트, 바인드할 리스트
 * @return  none
 * 주의: 
***************************************************************************************************/
function gfn_chart_bind(chart, list)
{
	if(list != null)
	{
		list.Chart = chart;
	}
		
}


/***************************************************************************************************
 * 차트와 그리드 바인드 하기
 *
 * @param  차트, 바인드할 그리드
 * @return  none
 * 주의: 
***************************************************************************************************/
function gfn_chart_grid_bind(chart, grid)
{
	if(grid != null)
	{
		grid.Chart = chart;
	}
}


/***************************************************************************************************
 * 라인의 Pointer 스타일 지정
 *
 * @param 차트, 라인index 
 * @return  none
 * 주의: 
***************************************************************************************************/
function gfn_set_line_pointer(chart, index)
{
	// 12 이상은 0으로 셋팅
	if(index > 12) 
	{
		index = 0;
	}
	
	var arrPointer = Array();
	

	arrPointer[0] = psRectangle;
	arrPointer[1] = psCircle;
	arrPointer[2] = psTriangle;
	arrPointer[3] = psDownTriangle;	
	arrPointer[4] = psCross;
	arrPointer[5] = psDiagCross;
	arrPointer[6] = psStar;
	arrPointer[7] = psDiamond;
	arrPointer[8] = psSmallDot;
	arrPointer[9] =  psNothing;
	arrPointer[10] = psLeftTriangle;
	arrPointer[11] = psRightTriangle;
	arrPointer[12] = psHexagon;


	chart.Series(index).asLine.Pointer.style = arrPointer[index];
	

}




/***************************************************************************************************
 * 차트의 색상 지정
 *
 * @param  
 * @return  none
 * 주의: 
***************************************************************************************************/
function gfn_set_color(idx)
{
	var col = Array();
	

	col[0] = 10708548;
	col[1] = 3513587;
	col[2] = 1330417;
	col[3] = 11048782;	
	col[4] = 2627328;
	col[5] = 6519581;
	col[6] = 919731;
	col[7] = 6144242;
	col[8] = 10401629;
	col[9] =  7368816;
	col[10] = 9300723;
	col[11] = 11842740;
	col[12] = 10708548;
	col[13] = 3513587;
	col[14] = 1330417;
	col[15] = 1330417;
	col[16] = 1330417;
	col[17] = 1330417;
	col[18] = 1330417;
	col[19] = 1330417;
	col[20] = 1330417;
	col[21] = 1330417;
	col[22] = 1330417;
	col[23] = 1330417;
	col[24] = 1330417;
	col[25] = 1330417;
	col[26] = 1330417;
	col[27] = 1330417;
	col[28] = 1330417;
	col[29] = 1330417;
	col[30] = 1330417;

	
	/*
	col[0] = "93^165^161";
	col[1] = "196^83^49";
	col[2] = "43^86^125";
	col[3] = "38^169^59";	
	col[4] = "189^189^189";
	col[5] = "251^80^64";
	col[6] = "159^224^66";
	col[7] = "22^157^191";
	col[8] = "255^153^199";
	col[9] =  "218^101^251";
	col[10] = "109^199^255";
	col[11] = "199^156^25";
	col[12] = "62^177^202";
	col[13] = "242^213^54";
	col[14] = "162,166 ^226";
	col[15] = "177^10^69";
	col[16] = "166^255^33";
	col[17] = "94^166^210";
	col[18] = "166^110^210";
	col[19] = "94^205^192";
	col[20] = "255^0^0";
	col[21] = "0^128^0";
	col[22] = "255^255^0";
	col[23] = "128^128^128";
	col[24] = "153^153^255";
	col[25] = "102^0^102";
	col[26] = "255^128^128";
	col[27] = "204^255^255";
	col[28] = "0^255^0";
	col[29] = "255^165^0";
	col[30] = "0^152^152";
	*/
	
	return col[idx];

	//return gfn_rgb2(col[idx]);

}

/***************************************************************************************************
 * RGB함수
 *
 * @param  
 * @return  none
 * 주의: 
***************************************************************************************************/
function gfn_rgb(R,G,B)
{
	var retStr = 0;
	
	retStr = 65536 * ToFloat(B) + 256 * ToFloat(G) + ToFloat(R);
	
	return retStr;
}

/***************************************************************************************************
 * RGB함수 문자열 (^로 연결됨)
 *
 * @param  
 * @return  none
 * 주의: 
***************************************************************************************************/
function gfn_rgb2(strInput)
{
	var retStr = 0;
	
	var arVal = Split(strInput,"^");
	
	retStr = 65536 * ToFloat(arVal[0]) + 256 * ToFloat(arVal[1]) + ToFloat(arVal[2]);
	
	trace(arVal[0]+","+arVal[1]+","+arVal[2]+"=>"+ retStr);
	
	
	return retStr;
}


/***************************************************************************************************
 * 차트 값 초기화
 *
 * @param  
 * @return  none
 * 주의: 
***************************************************************************************************/
function gfn_reset_chart(chart)
{
	chart.RemoveAllSeries();
}


/***************************************************************************************************
 * 차트 3D로 보기
 *
 * @param  차트 3D 유무
 * @return  none
 * 주의: 
***************************************************************************************************/
function gfn_view_3d(chart, is3D)
{
	if(chart == null) return;

	chart.Aspect.View3D = is3D;	// 3D 유무
}

/***************************************************************************************************
 * 차트의 Title 셋팅
 *
 * @param  차트, 타이틀
 * @return  none
 * 주의: 
***************************************************************************************************/
function gfn_set_title(chart, title)
{
	if(chart == null || chart == null) return;
	
	// Title
	chart.Header.Text.Clear();
	chart.Header.Alignment = 2;	
	chart.Header.Font.color = gfn_rgb(0, 0, 0);		// 글자색
	chart.Header.Font.Name = "돋움";			// 글자체
	chart.Header.Font.Size = 12;				// 크기
	chart.Header.Font.Bold = true;				// 굵게
	
	if(title != '')
	{
		chart.Header.Text.Add(title);			// 텍스트
	}
}


/***************************************************************************************************
 * 차트의 SubTitle 셋팅
 *
 * @param  차트, 서브타이틀
 * @return  none
 * 주의: 
***************************************************************************************************/
function gfn_set_subtitle(chart, title)
{
	if(chart == null || chart == null) return;
	
	// Sub Title
	chart.SubHeader.Text.Clear();
	chart.SubHeader.Alignment = 1;					// 우측 정렬
	chart.SubHeader.Font.color = gfn_rgb(0, 0, 0);		// 글자색
	chart.SubHeader.Font.Name = "돋움";			// 글자체
	chart.SubHeader.Font.Size = 8;				// 크기
	chart.SubHeader.Font.Bold = false;				// 굵게
	
	if(title != '')
	{
		chart.SubHeader.Text.Add(title);			// 텍스트
	}
}

/***************************************************************************************************
 * 차트의 좌측 Text 셋팅
 *
 * @param  차트, 좌측Text
 * @return  none
 * 주의: 
***************************************************************************************************/
function gfn_set_left(chart, title)
{
	if(chart == null || chart == null) return;
	
	// 좌측
	chart.Axis.Left.Title.Font.color = gfn_rgb(16, 58, 142);	// 글자색
	chart.Axis.Left.Title.Font.Name = "돋움";				// 글자체
	chart.Axis.Left.Title.Font.Size = 10;					// 크기
	chart.Axis.Left.AxisPen.color = gfn_rgb(108,108,108);		// Line Color
	chart.Axis.Left.Ticks.color = gfn_rgb(108,108,108);			// Tick Color
	chart.Axis.Left.MaximumRound = true;		// 최대값의 여백
	chart.Axis.Bottom.MinimumRound = true;	// 최소값의 여백

	if(title != "")
	{
		chart.Axis.Left.Title.Caption = title;				// 텍스트
	}
	
	chart.Axis.Left.Labels.Font.color = gfn_rgb(108,108,108);	// Y축값 글자색
	chart.Axis.Left.Labels.Font.Name = "돋움";				// Y축값 글자채	
	chart.Axis.Left.Labels.Font.Size = 8;					// Y축값 크기

}






/***************************************************************************************************
 * 차트 페이징
 *
 * @param  차트, 모드(처음=begin, 이전=prev, 다음=next, 끝=end)
 * @return  none
 * 주의: 
***************************************************************************************************/
function gfn_set_paging(chart, mode)
{
	if(chart == null || mode == null) return;

	switch(ToUpper(mode))
	{
		case "BEGIN":
			chart.Page.Current = 0;
		break;
		case "PREV":
			chart.Page.Previous();
		break;
		case "NEXT":
			chart.Page.Next();
		break;
		case "END":
			chart.Page.Current = chart.Page.Count;
		break;
	}
}

/***************************************************************************************************
 * 차트편집 띄우기
 *
 * @param  차트
 * @return  none
 * 주의: 
***************************************************************************************************/
function gfn_view_editor(chart)
{
	if(chart == null) return;

	chart.ShowEditor(-1);
}

/***************************************************************************************************
 * 프린트 띄우기
 *
 * @param  차트
 * @return  none
 * 주의: 
***************************************************************************************************/
function gfn_view_print(chart)
{
	if(chart == null) return;

	chart.Printer.ShowPreview();
}

/***************************************************************************************************
 * Export 띄우기
 *
 * @param  차트
 * @return  none
 * 주의: 
***************************************************************************************************/
function gfn_view_export(chart)
{
	if(chart == null) return;

	chart.Export.SaveChartDialog();
}


/***************************************************************************************************
 * 차트타입 콤보 만들기
 *
 * @param  차트
 * @return  none
 * 주의: 
***************************************************************************************************/
function gfn_chartTypeCombo(pCombo, pValue)
{ 
 	var objDs;
 	var ds_name="ds_chart_" + pCombo.id;
 	
 	if(gfn_isEmpty(pCombo.InnerDataset)){
 		Create("Dataset",ds_name);
 		objDs = object(ds_name);
 		objDs.AddColumn("ch_cd","STRING", 256);
		objDs.AddColumn("ch_nm","STRING", 256);
		pCombo.CodeColumn="ch_cd";
		pCombo.DataColumn="ch_nm";
		pCombo.InnerDataset = ds_name;
 	}
 	else {
 		objDs = object(pCombo.InnerDataset);
 		objDs = object(ds_name);
		objDs.ClearData();
		pCombo.CodeColumn="ch_cd";
		pCombo.DataColumn="ch_nm";
 	}
 	
 	var tRow = "";
 	
 	tRow = objDs.AddRow();
	objDs.SetColumn(tRow,"ch_cd", "0");
 	objDs.SetColumn(tRow,"ch_nm", "선");

 	tRow = objDs.AddRow();
  	objDs.SetColumn(tRow,"ch_cd", "1");
 	objDs.SetColumn(tRow,"ch_nm", "막대");
 		
 	tRow = objDs.AddRow();
  	objDs.SetColumn(tRow,"ch_cd", "2");
 	objDs.SetColumn(tRow,"ch_nm", "수평막대");
 		
 	tRow = objDs.AddRow();
 	objDs.SetColumn(tRow,"ch_cd", "3");
 	objDs.SetColumn(tRow,"ch_nm", "면적");
 	
 	tRow = objDs.AddRow();
  	objDs.SetColumn(tRow,"ch_cd", "4");
 	objDs.SetColumn(tRow,"ch_nm", "점");	

 	tRow = objDs.AddRow();
  	objDs.SetColumn(tRow,"ch_cd", "5");
 	objDs.SetColumn(tRow,"ch_nm", "파이"); 
 	
 	
	// 선택값이 있으면 선택 아니면 첫째행
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
}

/***************************************************************************************************
 * 차트 페이지 카운트 콤보 만들기
 *
 * @param  차트
 * @return  none
 * 주의: 
***************************************************************************************************/
function gfn_chartPageCombo(pCombo, pValue)
{ 
 	var objDs;
 	var ds_name="ds_chartCnt_" + pCombo.id;
 	
 	if(gfn_isEmpty(pCombo.InnerDataset)){
 		Create("Dataset",ds_name);
 		objDs = object(ds_name);
 		objDs.AddColumn("cnt_cd","STRING", 256);
		objDs.AddColumn("cnt_nm","STRING", 256);
		pCombo.CodeColumn="cnt_cd";
		pCombo.DataColumn="cnt_nm";
		pCombo.InnerDataset = ds_name;
 	}
 	else {
 		objDs = object(pCombo.InnerDataset);
 		objDs = object(ds_name);
		objDs.ClearData();
		pCombo.CodeColumn="cnt_cd";
		pCombo.DataColumn="cnt_nm";
 	}
 	
 	var tRow = "";
 	
 	// 10~ 90 개까지 뿌려주기
 	for(var i=1;i<=9;i++)
 	{
		tRow = objDs.AddRow();
		objDs.SetColumn(tRow,"cnt_cd",i*10);
		objDs.SetColumn(tRow,"cnt_nm",(i*10)+"개");
 	}
 	
	// 선택값이 있으면 선택 아니면 첫째행
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
}

