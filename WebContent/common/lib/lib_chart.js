/***************************************************************************************************
 * ��Ʈ �ʱ�ȭ 
 *
 * @param  ��Ʈ ������Ʈ, ��Ʈ Ÿ��Ʋ, ����Ÿ��Ʋ, ��Ʈ����, ��Ʈ�ٴڱ�, ���� Legend ǥ������, TeeList �������, 3D����, ����������
 * @return  none
 * ����: ���� Legend ǥ�������� (TeeListbox �� ����Ҷ��� false ó���ϰ� TeeListBox �����ϸ� true ó��)
***************************************************************************************************/
function gfn_init_chart(chart, title_text, subtitle_text, left_text, bottom_text, isLegend, isUseTeeList)
{
	
	if(chart == null) alert("��Ʈ�� null �Դϴ�.");
	
	
	// chart �Ӽ�
	chart.SetTheme(ctFacts);	// �׸�(�⺻) 	
	
	chart.Aspect.View3D = false;	// 3D ����
	chart.Panel.BevelWidth = 0;		// �ǳ� ���� �β�
	chart.Panel.color = gfn_rgb(255, 255, 255);	// ����
	chart.Scroll.Enable = 0;	// Scroll �¿�θ� �̵� (0: ����, 1:�¿츸 �̵�)
	chart.Language = 24;	// �ѱ���
	//chart.Language =0;	// ����
	

	// Title
	gfn_set_title(chart, title_text);

	// Sub Title
	gfn_set_subtitle(chart, subtitle_text);

	gfn_set_left(chart, left_text);


	//Wall Color (3D�϶� ���� ����)
	chart.Walls.Back.color = gfn_rgb(255,187,187);		// ��
	chart.Walls.Left.color = gfn_rgb(187,187,187);		// ����
	chart.Walls.Bottom.color = gfn_rgb(187,187,187);	// �ٴ�


	//�ϴ� (X��)
	chart.Axis.Bottom.Title.Font.color = gfn_rgb(16, 58, 142);	// ���ڻ�
	chart.Axis.Bottom.Title.Font.Name = "����";			// ����ü
	chart.Axis.Bottom.Title.Font.Size = 10;					// ũ��
	chart.Axis.Bottom.AxisPen.color = gfn_rgb(108,108,108);		// line color
	chart.Axis.Bottom.Ticks.color = gfn_rgb(108,108,108);		// Tick Color

	if(bottom_text != "")
	{
		chart.Axis.Bottom.Title.Caption = bottom_text;			// �ؽ�Ʈ
	}

	chart.Axis.Bottom.Labels.Font.color = gfn_rgb(108,108,108);	// X�ప ���ڻ�
	chart.Axis.Bottom.Labels.Font.Name = "����";			// X�ప ����ü
	chart.Axis.Bottom.Labels.Font.Size = 8;					// X�ప ũ��
	

	//��Ʈ ������ ���
	chart.Legend.Visible = isLegend;
	chart.Legend.LegendStyle = 1;		// Legend ǥ�ù�� = lsSeries
	chart.Legend.TextStyle = 0;			// Text ǥ�ù�� = ltsPlain
	chart.Legend.Font.color = gfn_rgb(108,108,108);	// ���ڻ�
	chart.Legend.Font.Name = "����";			// ����ü
	chart.Legend.Font.Size = 8;					// ũ��
	chart.Legend.ShadowColor = gfn_rgb(108,108,108);	//Shadow ����
	chart.Legend.checkboxes = true;
	chart.Legend.alignment = 1;


	/// Tools //
	chart.Tools.Clear();

	// Animation tool
	//chart.Tools.Add(14);	
	//chart.Tools.Items(0).asSeriesAnimation.Steps = 200;		// ��������
	//chart.Tools.Items(0).asSeriesAnimation.DrawEvery = 1;	// 1���� �����̰�
	//chart.Tools.Items(0).asSeriesAnimation.StartAtMin = false;	// Y�� 0���� ���� (���� true�̸� �ּҰ����� ���۵�)

	// ���콺 �ѿ����� ��Ʈ(Mark Tip)
	chart.Tools.Add(8);
	chart.Tools.Items(0).Active = true;
	chart.Tools.Items(0).asMarksTip.Delay = 100;
	chart.Tools.Items(0).asMarksTip.MouseAction = 0;
	chart.Tools.Items(0).asMarksTip.Style = 0;
	chart.Tools.Items(0).asMarksTip.Style = 0;

	// ��Ʈ ����(�ȷ�Ʈ) => �̰� �����ص� Series�� ������ ���������.
	//chart.ApplyPalette(cpDefault);

	// ����Ÿ �ʱ�ȭ
	chart.RemoveAllSeries();

}

/***************************************************************************************************
 * TeeCommander �ʱ�ȭ
 *
 * @param  Ŀ����, ��Ʈ��
 * @return  none
 * ����: 
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
	
	
	// Ŀ��� ���â
	for(var i=0;i<12;i++)
	{
		arCom[i] = i;
	}
	
	commander.Controls = arCom;
}


/***************************************************************************************************
 * ��Ʈ�� �迭�� ������ ���� 
 *
 * @param  ��Ʈ, ��Ʈ��, ��Ʈindex, ��ƮŸ��, X��迭, Y��迭, �����������
 * @return  none
 * ����: arrX[����] = x�ప, arrY[����] = y�ప (������ �����ؾ� ��)
***************************************************************************************************/
function gfn_add_series_array(chart, title, index, type, arrX, arrY, isStairs )
{
	if(arrX == null || arrY == null) return;

	// series type 
	var iType = ToNumber(type);

	chart.AddSeries(iType);		// ��Ʈ Ÿ��

	chart.Series(index).title = title;	// ����
	chart.Series(index).Clear();
	chart.Series(index).Marks.Style = 0;	// ����Ÿ��
	chart.Series(index).Cursor = 21;
	chart.Series(index).ColorEachPoint = false;	// ������ ����Ʈ ������(�ϳ��� series�� ������Ʈ�ǹ��̹Ƿ� false)
	chart.Series(index).ColorEachLine = false;	// ������ ���� ������(�ϳ��� series�� ������Ʈ�ǹ��̹Ƿ� false)
	
	chart.Series(index).Marks.Visible = false;	// ���� ������
	chart.Series(index).Color = gfn_set_color(index);
	chart.Series(index).asLine.Stairs = isStairs;	// �������
	

	// line ���� �߰�����
	if(iType == 0)
	{
		chart.Series(index).asLine.Pointer.Visible = true;	// Line�� �����
		chart.Series(index).asLine.LinePen.Width = 1;			// �� ����
		chart.Series(index).Marks.Style = 0;					// Value
	}
	
	// bar ���� �߰�����
	else if(iType == 1)
	{
		chart.Series(index).Marks.Style = 0;					// Value
	}

	// area ���� �߰�����
	else if(iType == 3)
	{
		chart.Series(index).asArea.Stairs = true;
		chart.Series(index).Marks.Style = 0;					// Value
	}
	// pie ���� �߰�����
	else if(iType == 5)
	{
		chart.Series(index).asPie.AutoMarkPosition = true;		// mark ��ġ �ڵ�����
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
	
	// ����Ʈ ����
	gfn_set_line_pointer(chart, index);
		
	
}

/***************************************************************************************************
 * ��Ʈ�� DataSet ���� ������ ���� 
 *
 * @param  ��Ʈ, ��Ʈ��, ��Ʈindex, ��ƮŸ��, �����ͼ¸�, X��Row, Y��Row, �����������
 * @return  none
 * ����: �÷��� ���������� ���ϴ°��̴�(CrossTab).
***************************************************************************************************/
/*
function gfn_add_series(chart, title, index, type, arrX, arrY, isStairs )
{
	if(arrX == null || arrY == null) return;

	// series type 
	var iType = ToNumber(type);

	chart.AddSeries(iType);		// ��Ʈ Ÿ��

	chart.Series(index).title = title;	// ����
	chart.Series(index).Clear();
	chart.Series(index).Marks.Style = 0;	// ����Ÿ��
	chart.Series(index).Cursor = 21;
	chart.Series(index).ColorEachPoint = false;	// ������ ����Ʈ ������(�ϳ��� series�� ������Ʈ�ǹ��̹Ƿ� false)
	chart.Series(index).ColorEachLine = false;	// ������ ���� ������(�ϳ��� series�� ������Ʈ�ǹ��̹Ƿ� false)
	
	chart.Series(index).Marks.Visible = false;	// ���� ������
	chart.Series(index).Color = gfn_set_color(index);
	chart.Series(index).asLine.Stairs = isStairs;	// �������
	

	// line ���� �߰�����
	if(iType == 0)
	{
		chart.Series(index).asLine.Pointer.Visible = true;	// Line�� �����
		chart.Series(index).asLine.LinePen.Width = 1;			// �� ����
		chart.Series(index).Marks.Style = 0;					// Value
	}
	
	// bar ���� �߰�����
	else if(iType == 1)
	{
		chart.Series(index).Marks.Style = 0;					// Value
	}

	// area ���� �߰�����
	else if(iType == 3)
	{
		chart.Series(index).asArea.Stairs = true;
		chart.Series(index).Marks.Style = 0;					// Value
	}
	// pie ���� �߰�����
	else if(iType == 5)
	{
		chart.Series(index).asPie.AutoMarkPosition = true;		// mark ��ġ �ڵ�����
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
 * ��Ʈ�� DataSet ���� ������ ���� (�÷� ROW ���)
 *
 * @param  ��Ʈ, ��Ʈ��, ��Ʈindex, ��ƮŸ��, �����ͼ¸�, X��Row, Y��Row, �����������
 * @return  none
 * ����: �÷��� ���������� ���ϴ°��̴�(CrossTab).
***************************************************************************************************/
function gfn_add_series_dataset(chart, title, index, type, pDataSet, rowX, rowY, isStairs )
{
	if(pDataSet == null) return;

	// series type 
	var iType = ToNumber(type);

	chart.AddSeries(iType);		// ��Ʈ Ÿ��

	chart.Series(index).title = title;	// ����
	chart.Series(index).Clear();
	chart.Series(index).Marks.Style = 0;	// ����Ÿ��
	chart.Series(index).Cursor = 21;
	chart.Series(index).ColorEachPoint = false;	// ������ ����Ʈ ������(�ϳ��� series�� ������Ʈ�ǹ��̹Ƿ� false)
	chart.Series(index).ColorEachLine = false;	// ������ ���� ������(�ϳ��� series�� ������Ʈ�ǹ��̹Ƿ� false)
	
	chart.Series(index).Marks.Visible = false;	// ���� ������
	chart.Series(index).Color = gfn_set_color(index);
	chart.Series(index).asLine.Stairs = isStairs;	// �������
	

	// line ���� �߰�����
	if(iType == 0)
	{
		chart.Series(index).asLine.Pointer.Visible = true;	// Line�� �����
		chart.Series(index).asLine.LinePen.Width = 1;			// �� ����
		chart.Series(index).Marks.Style = 0;					// Value
	}
	
	// bar ���� �߰�����
	else if(iType == 1)
	{
		chart.Series(index).Marks.Style = 0;					// Value
	}

	// area ���� �߰�����
	else if(iType == 3)
	{
		chart.Series(index).asArea.Stairs = true;
		chart.Series(index).Marks.Style = 0;					// Value
	}
	// pie ���� �߰�����
	else if(iType == 5)
	{
		chart.Series(index).asPie.AutoMarkPosition = true;		// mark ��ġ �ڵ�����
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
	
	// ����Ʈ ����
	gfn_set_line_pointer(chart, index);
		
	
}



/***************************************************************************************************
 * ��Ʈ�� DataSet ���� ������ ���� (�÷�ID ���)
 *
 * @param  ��Ʈ, ��Ʈ��, ��Ʈindex, ��ƮŸ��, �����ͼ¸�, X��ID, Y��ID, �����������
 * @return  none
 * ����: �÷��� ���������� ���ϴ°��̴�(CrossTab).
***************************************************************************************************/
function gfn_add_series_datasetID(chart, title, index, type, pDataSet, colX, colY, isStairs )
{
	if(pDataSet == null) return;

	// series type 
	var iType = ToNumber(type);

	chart.AddSeries(iType);		// ��Ʈ Ÿ��

	chart.Series(index).title = title;	// ����
	chart.Series(index).Clear();
	chart.Series(index).Marks.Style = 0;	// ����Ÿ��
	chart.Series(index).Cursor = 21;
	chart.Series(index).ColorEachPoint = false;	// ������ ����Ʈ ������(�ϳ��� series�� ������Ʈ�ǹ��̹Ƿ� false)
	chart.Series(index).ColorEachLine = false;	// ������ ���� ������(�ϳ��� series�� ������Ʈ�ǹ��̹Ƿ� false)
	
	chart.Series(index).Marks.Visible = false;	// ���� ������
	chart.Series(index).Color = gfn_set_color(index);
	chart.Series(index).asLine.Stairs = isStairs;	// �������
	

	// line ���� �߰�����
	if(iType == 0)
	{
		chart.Series(index).asLine.Pointer.Visible = true;	// Line�� �����
		chart.Series(index).asLine.LinePen.Width = 1;			// �� ����
		chart.Series(index).Marks.Style = 0;					// Value
	}
	
	// bar ���� �߰�����
	else if(iType == 1)
	{
		chart.Series(index).Marks.Style = 0;					// Value
	}

	// area ���� �߰�����
	else if(iType == 3)
	{
		chart.Series(index).asArea.Stairs = true;
		chart.Series(index).Marks.Style = 0;					// Value
	}
	// pie ���� �߰�����
	else if(iType == 5)
	{
		chart.Series(index).asPie.AutoMarkPosition = false;		// mark ��ġ �ڵ�����
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
	
	
	// ����Ʈ ����
	gfn_set_line_pointer(chart, index);
		
	
}




/***************************************************************************************************
 * ��Ʈ�� DataSet ���� ������ ���� (���̿�)
 *
 * @param  ��Ʈ, ��Ʈ��, ��Ʈindex, ��ƮŸ��, �����ͼ¸�, X��ID, Y��ID, �����������
 * @return  none
 * ����: �÷��� ���������� ���ϴ°��̴�(CrossTab).
***************************************************************************************************/
function gfn_add_series_datasetPie(chart, title, index, type, pDataSet, colX, colY, isStairs )
{
	if(pDataSet == null) return;

	// series type 
	var iType = ToNumber(type);

	chart.AddSeries(iType);		// ��Ʈ Ÿ��

	chart.Series(index).title = title;	// ����
	chart.Series(index).Clear();

	chart.Series(index).Marks.Style = smsLabelPercent;					// Label + %
	chart.Series(index).Cursor = 21;
	chart.Series(index).ColorEachPoint = false;	// ������ ����Ʈ ������(�ϳ��� series�� ������Ʈ�ǹ��̹Ƿ� false)
	chart.Series(index).ColorEachLine = false;	// ������ ���� ������(�ϳ��� series�� ������Ʈ�ǹ��̹Ƿ� false)
	
	chart.Series(index).Marks.Visible = false;	// ���� ������
	chart.Series(index).Color = gfn_set_color(index);
	
	
	chart.Series(index).asPie.AutoMarkPosition = true;		// mark ��ġ �ڵ�����
	//chart.Series(index).asPie.PieMarks.VertCenter = true;
	chart.Series(index).asPie.Circled  = true;
	chart.Series(index).asPie.CircleHeight = 20;
	chart.Series(index).asPie.CircleWidth = 20;
	
	chart.Series(index).asPie.PieMarks.LegSize = 1;
	chart.Series(index).asPie.XRadius = 60;
	chart.Series(index).asPie.YRadius = 60;
	
	//chart.Series(index).asPie.Transparency = 50;
	
	chart.Series(index).Marks.RoundSize = 5;	// ��ũ�� �𼭸� �ձ۰�
	
	chart.Series(index).Marks.ArrowLength = -20;	// ���� ������ �ֱ� 
	chart.Series(index).Marks.Arrow.Show();
	
	for(var row=0; row< pDataSet.rowcount; row++)
	{
		chart.Series(index).Add(pDataSet.GetColumn(row, colY), pDataSet.GetColumn(row, colX), gfn_set_color(row));
	}	
	
	
}



/***************************************************************************************************
 * ��Ʈ ������
 *
 * @param  ��Ʈ, �� ��������
 * @return  none
 * ����: 
***************************************************************************************************/
function gfn_view_chart_value(chart, isView)
{
	if(chart == null) return;
	
	for(var i=0;i<chart.SeriesCount;i++)
	{
		if(isView)
		{
			chart.Series(i).Marks.Visible = true;	// �����̱�
		}
		else
		{
			chart.Series(i).Marks.Visible = false;	// �Ⱥ��̱�
		}
	}
	
	
	
	
}




// ��Ʈ ����¡ ����

/***************************************************************************************************
 * ��Ʈ ����¡ ���� 
 *
 * @param  ��Ʈ ������Ʈ, ��ȭ�鿡 ������ ī��Ʈ
 * @return  none
 * ����: 
***************************************************************************************************/
function gfn_set_pagecount(chart, page_count)
{
	chart.Page.MaxPointsPerPage = page_count;	// �������� ���� ī��Ʈ
}


/***************************************************************************************************
 * ��Ʈ�� ����Ʈ ���ε� �ϱ�
 *
 * @param  ��Ʈ, ���ε��� ����Ʈ
 * @return  none
 * ����: 
***************************************************************************************************/
function gfn_chart_bind(chart, list)
{
	if(list != null)
	{
		list.Chart = chart;
	}
		
}


/***************************************************************************************************
 * ��Ʈ�� �׸��� ���ε� �ϱ�
 *
 * @param  ��Ʈ, ���ε��� �׸���
 * @return  none
 * ����: 
***************************************************************************************************/
function gfn_chart_grid_bind(chart, grid)
{
	if(grid != null)
	{
		grid.Chart = chart;
	}
}


/***************************************************************************************************
 * ������ Pointer ��Ÿ�� ����
 *
 * @param ��Ʈ, ����index 
 * @return  none
 * ����: 
***************************************************************************************************/
function gfn_set_line_pointer(chart, index)
{
	// 12 �̻��� 0���� ����
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
 * ��Ʈ�� ���� ����
 *
 * @param  
 * @return  none
 * ����: 
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
 * RGB�Լ�
 *
 * @param  
 * @return  none
 * ����: 
***************************************************************************************************/
function gfn_rgb(R,G,B)
{
	var retStr = 0;
	
	retStr = 65536 * ToFloat(B) + 256 * ToFloat(G) + ToFloat(R);
	
	return retStr;
}

/***************************************************************************************************
 * RGB�Լ� ���ڿ� (^�� �����)
 *
 * @param  
 * @return  none
 * ����: 
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
 * ��Ʈ �� �ʱ�ȭ
 *
 * @param  
 * @return  none
 * ����: 
***************************************************************************************************/
function gfn_reset_chart(chart)
{
	chart.RemoveAllSeries();
}


/***************************************************************************************************
 * ��Ʈ 3D�� ����
 *
 * @param  ��Ʈ 3D ����
 * @return  none
 * ����: 
***************************************************************************************************/
function gfn_view_3d(chart, is3D)
{
	if(chart == null) return;

	chart.Aspect.View3D = is3D;	// 3D ����
}

/***************************************************************************************************
 * ��Ʈ�� Title ����
 *
 * @param  ��Ʈ, Ÿ��Ʋ
 * @return  none
 * ����: 
***************************************************************************************************/
function gfn_set_title(chart, title)
{
	if(chart == null || chart == null) return;
	
	// Title
	chart.Header.Text.Clear();
	chart.Header.Alignment = 2;	
	chart.Header.Font.color = gfn_rgb(0, 0, 0);		// ���ڻ�
	chart.Header.Font.Name = "����";			// ����ü
	chart.Header.Font.Size = 12;				// ũ��
	chart.Header.Font.Bold = true;				// ����
	
	if(title != '')
	{
		chart.Header.Text.Add(title);			// �ؽ�Ʈ
	}
}


/***************************************************************************************************
 * ��Ʈ�� SubTitle ����
 *
 * @param  ��Ʈ, ����Ÿ��Ʋ
 * @return  none
 * ����: 
***************************************************************************************************/
function gfn_set_subtitle(chart, title)
{
	if(chart == null || chart == null) return;
	
	// Sub Title
	chart.SubHeader.Text.Clear();
	chart.SubHeader.Alignment = 1;					// ���� ����
	chart.SubHeader.Font.color = gfn_rgb(0, 0, 0);		// ���ڻ�
	chart.SubHeader.Font.Name = "����";			// ����ü
	chart.SubHeader.Font.Size = 8;				// ũ��
	chart.SubHeader.Font.Bold = false;				// ����
	
	if(title != '')
	{
		chart.SubHeader.Text.Add(title);			// �ؽ�Ʈ
	}
}

/***************************************************************************************************
 * ��Ʈ�� ���� Text ����
 *
 * @param  ��Ʈ, ����Text
 * @return  none
 * ����: 
***************************************************************************************************/
function gfn_set_left(chart, title)
{
	if(chart == null || chart == null) return;
	
	// ����
	chart.Axis.Left.Title.Font.color = gfn_rgb(16, 58, 142);	// ���ڻ�
	chart.Axis.Left.Title.Font.Name = "����";				// ����ü
	chart.Axis.Left.Title.Font.Size = 10;					// ũ��
	chart.Axis.Left.AxisPen.color = gfn_rgb(108,108,108);		// Line Color
	chart.Axis.Left.Ticks.color = gfn_rgb(108,108,108);			// Tick Color
	chart.Axis.Left.MaximumRound = true;		// �ִ밪�� ����
	chart.Axis.Bottom.MinimumRound = true;	// �ּҰ��� ����

	if(title != "")
	{
		chart.Axis.Left.Title.Caption = title;				// �ؽ�Ʈ
	}
	
	chart.Axis.Left.Labels.Font.color = gfn_rgb(108,108,108);	// Y�ప ���ڻ�
	chart.Axis.Left.Labels.Font.Name = "����";				// Y�ప ����ä	
	chart.Axis.Left.Labels.Font.Size = 8;					// Y�ప ũ��

}






/***************************************************************************************************
 * ��Ʈ ����¡
 *
 * @param  ��Ʈ, ���(ó��=begin, ����=prev, ����=next, ��=end)
 * @return  none
 * ����: 
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
 * ��Ʈ���� ����
 *
 * @param  ��Ʈ
 * @return  none
 * ����: 
***************************************************************************************************/
function gfn_view_editor(chart)
{
	if(chart == null) return;

	chart.ShowEditor(-1);
}

/***************************************************************************************************
 * ����Ʈ ����
 *
 * @param  ��Ʈ
 * @return  none
 * ����: 
***************************************************************************************************/
function gfn_view_print(chart)
{
	if(chart == null) return;

	chart.Printer.ShowPreview();
}

/***************************************************************************************************
 * Export ����
 *
 * @param  ��Ʈ
 * @return  none
 * ����: 
***************************************************************************************************/
function gfn_view_export(chart)
{
	if(chart == null) return;

	chart.Export.SaveChartDialog();
}


/***************************************************************************************************
 * ��ƮŸ�� �޺� �����
 *
 * @param  ��Ʈ
 * @return  none
 * ����: 
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
 	objDs.SetColumn(tRow,"ch_nm", "��");

 	tRow = objDs.AddRow();
  	objDs.SetColumn(tRow,"ch_cd", "1");
 	objDs.SetColumn(tRow,"ch_nm", "����");
 		
 	tRow = objDs.AddRow();
  	objDs.SetColumn(tRow,"ch_cd", "2");
 	objDs.SetColumn(tRow,"ch_nm", "���򸷴�");
 		
 	tRow = objDs.AddRow();
 	objDs.SetColumn(tRow,"ch_cd", "3");
 	objDs.SetColumn(tRow,"ch_nm", "����");
 	
 	tRow = objDs.AddRow();
  	objDs.SetColumn(tRow,"ch_cd", "4");
 	objDs.SetColumn(tRow,"ch_nm", "��");	

 	tRow = objDs.AddRow();
  	objDs.SetColumn(tRow,"ch_cd", "5");
 	objDs.SetColumn(tRow,"ch_nm", "����"); 
 	
 	
	// ���ð��� ������ ���� �ƴϸ� ù°��
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
}

/***************************************************************************************************
 * ��Ʈ ������ ī��Ʈ �޺� �����
 *
 * @param  ��Ʈ
 * @return  none
 * ����: 
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
 	
 	// 10~ 90 ������ �ѷ��ֱ�
 	for(var i=1;i<=9;i++)
 	{
		tRow = objDs.AddRow();
		objDs.SetColumn(tRow,"cnt_cd",i*10);
		objDs.SetColumn(tRow,"cnt_nm",(i*10)+"��");
 	}
 	
	// ���ð��� ������ ���� �ƴϸ� ù°��
	if(pValue != ""){
		pCombo.Value = pValue;
	}
	else{
		pCombo.index = 0;
	}
}

