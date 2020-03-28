/***************************************************************************************************
 * gfn_grid_init Grid ���� �ʱ�ȭ  
 *
 * @param pGrid    - �׸���
 * ex)
***************************************************************************************************/

function gfn_grid_init(pGrid)
{
	
	// �׸��� �ٷ� ���������� ���·�
	pGrid.AutoEnter = True;

}


/***************************************************************************************************
 * gfn_grid_init Grid �����ϱ� 
 *
 * @param pGrid    - �׸���
 * @param pDataSet    - Dataset
 * @param nChar    - Ű����key
 * @param bCtrl    - �׸��� ��Ʈ�� ����

 * ex)
***************************************************************************************************/
//(obj,nChar,bShift,bCtrl,bAlt,LLParam,HLParam)
function gfn_gridCopy(pGrid, pDataSet, nChar, bCtrl)
{	
	var csv_data;
	
	if (bCtrl == true )
	{
		if(nChar == 65) // Ű�����̺�Ʈ A 
		{
			for(i=0;i<pDataSet.count;i++)
			{
				pDataSet.SelectRow(i);
			}
		}

		if(nchar == 67) //Ű�����̺�Ʈ C
		{
			ClearClipboard(); // Ŭ�����带 Clear�մϴ�.
			csv_data = pGrid.GetCSVData(true);
			SetClipBoard("CF_CSV", csv_data);  // �ܺ� Excel�� Ctrl+c�� ����.
		}
	}
}



/***************************************************************************************************
 * gfn_setGridCombo Grid combo DataSet ���� 
 *
 * @param (pGrid    - �׸���
 * @param pDsName - �����ͼ� ��
 * @param nCell   - �׸������
 * @param pComboCol   - �޺��÷���
 * @param pComboText   - �ؽ�Ʈ�÷��� 
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
 * gfn_insa_setGridCombo Grid combo DataSet ���� 
 *
 * @param (pGrid    - �׸���
 * @param pDsName - �����ͼ� ��
 * @param nCell   - �׸������
 * @param pComboCol   - �޺��÷���
 * @param pComboText   - �ؽ�Ʈ�÷��� 
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
 * gfn_GridSort Grid ��� Ŭ���� Sort
 *
 * @param gridId    - �׸��� ���̵�
 * @param dataSetId - �����ͼ� ���̵�
 * @param cellNum   - ���ε� �÷� �̸�
 * ex) gfn_GridSort(obj, nCell);
***************************************************************************************************/

function gfn_GridSort(gridId,dataSetId,cellNum)
{
	var str_head = ""; // ��� �̸�
	var str_body = ""; // �ٵ� �̸�
	var grd_col;       // �÷� ����

	//����Ÿ�� ������ �����Ѵ�.
	if(dataSetId.RowCount() < 1){
		return;
	}
	
	//�÷� ������ ���Ѵ�.
	grd_col = gridId.GetCellCount("head");
	
	str_head = gridId.GetCellProp("head",cellNum,"text");
	str_body = gridId.GetCellProp("body",cellNum,"colid");
	
	if(IndexOf(str_head,"�� ") != -1 ){
	
		gridId.SetCellProp("head",cellNum,"text",replace(str_head,"�� ","�� "));
		dataSetId.Sort(str_body, false);
		
	}else if(IndexOf(str_head,"�� ") != -1){
	
		gridId.SetCellProp("head",cellNum,"text",replace(str_head,"�� ","�� "));
		dataSetId.Sort(str_body, true);
		
	}else{
	
		//������ ȭ��ǥ�� ������ ����!
		for(i=0;i<grd_col;i++)
		{
			var str_head_tmp = gridId.GetCellProp("head",i,"text");
			var f_pos1 = Pos(str_head_tmp,"�� ");
			if(f_pos1 == 0){
				str_head_tmp = str_head_tmp.Replace("�� ","");
			}else{
				f_pos2 = Pos(str_head_tmp,"�� ");
				if(f_pos2 == 0){
					str_head_tmp = str_head_tmp.Replace("�� ","");
				}
			}
			gridId.SetCellProp("head",i,"text",str_head_tmp);
			gridId.SetCellProp("head",i,"align","center");
		}
		
		//���ο� �÷��� Ŭ���� ȭ��ǥ ����!
		gridId.SetCellProp("head",cellNum,"text","�� "+str_head);
		//Dataset�� ��Ʈ�Ѵ�.
		dataSetId.Sort(str_body, false);
		
	}
}


/**
*	1. �Լ���   : gfn_AddColumn
*	2. �Ķ���� : dataSetId - �����ͼ� ���̵�
*	              colName   - ���ε� �÷� �̸�
*	3. �Լ����� : �׸��忡 ����Ʈ�� �߰��Ѵ�.
*   4. ���ϰ�   : ����
*    
*/
function gfn_AddColumn(dataSetId,colName)
{
	dataSetId.InsertRow(dataSetId.rowcount);
	dataSetId.SetColumn(dataSetId.rowcount-1,colName,1);
}


/**
*	1. �Լ���   : gfn_DeleteColumn
*	2. �Ķ���� : dataSetId - �����ͼ� ���̵�
*	              colName   - ���ε� �÷� �̸�
*	3. �Լ����� : �׸��𿡼� üũ�� ����Ʈ�� �����Ѵ�.
*   4. ���ϰ�   : ����
*   
*/
function gfn_DeleteColumn(dataSetId,colName)
{
	// �����Ǹ鼭 �� �ο���� ���ϹǷ� ū �ͺ��� �����Ѵ�.
	for(var i=dataSetId.rowcount; i >= 0; i--)
	{	
		if(dataSetId.GetColumn(i,colName) == 1){
			dataSetId.DeleteRow(i);
		}
	}
}







/**
*	1. �Լ���   : gfn_SetCheckBoxAllSelected
*	2. �Ķ���� : cellNum   - �÷���ȣ
*	              gridId    - �׸��� ���̵�
*	              dataSetId - �����ͼ� ���̵�
*	              colName   - ���ε� �÷� �̸�
*	3. �Լ����� : �׸��� �ش����� üũ�ڽ��� Ŭ�������� ������ ����Ʈ���� ���� üũ�ǰ� �ϴ� �Լ�
*   4. ���ϰ�   : ����
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
*	1. �Լ���   : gfn_SetGridHeaderBodyValue
*	2. �Ķ���� : gridObj - �׸��� ��ü
*	              gdsObj  - �۷ι� �����ͼ� ��ü (�׸����� )
*	              bindDs  - �����ͼ� ���̵�
*	              index   - ���ε� �÷� �̸�
*	3. �Լ����� : �׸����� ����� �ٵ��� ������ �ٲ��ִ� �޼���
*   4. ���ϰ�   : ����
*    
*/
function gfn_SetGridHeaderBodyValue(gridObj,gdsObj,bindDs,index)
{
	var colidx = 0;
	var strColumns = '<columns>';
	var strHead = '<head>';
	var strBody = '<body>';

	for(i=0 ; i < gdsObj.rowcount ; i++) // �ҽ� �����ͼ� ī��Ʈ ����
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
	
	strColumns += '</columns>';   //columns ����  
	strHead += '</head>';         // header ����  
	strBody += '</body>';         // body ����    	
	gridObj.Contents = '<contents>' + strColumns + strHead + strBody + '</contents>';

	gridObj.BindDataset = bindDs;
}


/**
*	1. �Լ���   : gfn_clearHeader
*	2. �Ķ���� : griObj - �׸��� ��ü
*	3. �Լ����� : �׸����� ����� �ִ� ���� ��ȣ(�ﰢ��)�� ���ش�.
*   4. ���ϰ�   : ����
*    
*/
function gfn_clearHeader(griObj)
{
	for(var i=0;i<griObj.GetCellCount("head");i++)
	{
		// Head Sort ǥ�� ����..
		griObj.SetCellProp("head",i,"text",replace(replace(griObj.GetCellProp("head",i,"text"),"��"),"��"));
	}
} 


/**
*	1. �Լ���   : gfn_Grid_Multi_Sort
*	2. �Ķ���� : gridObj  - �׸��� ��ü
*	              divFlag  - Div ȭ������ �������� ���� �Ǻ�
*	              startCol - �׸����� ���° �÷����� �˾� �׸��忡 �������� ����
*	3. �Լ����� : �׸��忡�� ��Ƽ ������ �ϱ� ���� �˾�ȭ���� ����.
*   4. ���ϰ�   : ����
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
//* �޷� ���� �׸��� ���� 
//* ###############################################################################################
//*------------------------------------------------------------------------------------------------

//*------------------------------------------------------------------------------------------------
//* �Լ�����     : �׸��� �޷»���-���� üũ
//* �Լ�����     : 
//* parameter    :  yyyymmdd - ����� 
//*              
//* return value : ����: ���ڿ� (���ϸ�) ,������: ""
//* ���         :
//*-----------------------------------------------------------------------------------------------
function gfn_CalGrid_IsHoliday(yyyymmdd)
{
	var mmdd;
	var lunar;

	////// ��� üũ
	mmdd = substr(yyyymmdd, 4, 4);
	
	// ���� Check
	if( mmdd == "0101" )
		return "����";
	// ������
	if( mmdd == "0301" )
		return "������";
	// ��̳�
	if( mmdd == "0505" )
		return "��̳�";
	// ������
	if( mmdd == "0606" )
		return "������";
	// ������
	if( mmdd == "0717" )
		return "������";
	// ������
	if( mmdd == "0815" )
		return "������";
	// ��õ��
	if( mmdd == "1003" )
		return "��õ��";
	// ��ź��
	if( mmdd == "1225" )
		return "��ź��";

	
	/////// ���� üũ
	lunar = Solar2Lunar( yyyymmdd );
	mmdd = substr(lunar, 4, 4);
	// ����	
	if( mmdd == "1230" || mmdd == "0101" || mmdd == "0102" )
		return "����";
	// ������
	if( mmdd == "0408" )
		return "����ź����";
	// �߼�
	if( mmdd == "0814" || mmdd == "0815" || mmdd == "0816" )
		return "�߼�";
	// �Ͽ��� Check
	if( GetDay(yyyymmdd) == 0 )
		return "�Ͽ���";
		  
	return "";
}

//*------------------------------------------------------------------------------------------------
//* �Լ�����     : �׸��� �޷»���-�ش���� �� ������ ��¥�� ã�� �Լ�
//* �Լ�����     : 
//* parameter    : str_yyyymm 
//*              
//* return value : ���� = �� ������ ��¥ ,���� = -1
//* ���         :
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
//* �Լ�����     : �׸��� �޷»���-�޷¿� ���� �⺻���� ó�� ����
//*                �ſ����� ���� ����
//* �Լ�����     : 
//* parameter    : ds_base_note_obj ,yyyymm
//* return value : ����
//* ���         :
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

	// ������ ����
	for( i = 1 ; i < last_day ; i++ )
	{
		yyyymmdd = yyyymm+Lpad(i, "0", 2);
		holiday = gfn_CalGrid_IsHoliday(yyyymmdd);
		if( holiday != "" && holiday != "�Ͽ���" )
		{
			row = ds_base_note_obj.AddRow();
			ds_base_note_obj.SetColumn(row, "date", yyyymmdd);
			ds_base_note_obj.SetColumn(row, "note", holiday);
		}
	}
	
	// ����ǥ��(5�ϰ���) ---- ���ֱ�
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
//* �Լ�����     : �׸��� �޷»���-�޷� �׸���
//* �Լ�����     : 
//* parameter    : ds_calendar_obj ,grid_obj ,ds_base_note_obj ,yyyymm
//* return value : ����
//* ���         :
//*-----------------------------------------------------------------------------------------------
function gfn_CalGrid_DrawCalendar(ds_calendar_obj, grid_obj, ds_base_note_obj, yyyymm)
{
	var i, day, row, colid;
	var start_day, end_date, today;

	gfn_CalGrid_MakeBaseNote(ds_base_note_obj, yyyymm);	
	
	// Grid Header����
	gfn_CalGrid_drawheader(grid_obj,yyyymm);
	
	// Dataset �����
	grid_obj.BindDataset = "";
	ds_calendar_obj.ClearData();
	start_day = GetDay(yyyymm+"01");
	last_date = gfn_CalGrid_GetLastDay(yyyymm);
	row = ds_calendar_obj.AddRow();
	
	for( i = 1, day = start_day ; i <= last_date ; i++ )
	{
		// �޷� ����			
		ds_calendar_obj.SetColumn(row, "day"+day, i);
		
		// ���� ó��
		if( gfn_CalGrid_IsHoliday(yyyymm+Lpad(i, "0", 2)) != "" )
			ds_calendar_obj.SetColumn(row, "hol"+day, "1"); 
			
		// �������� ����
		var base_note_row;
		base_note_row = ds_base_note_obj.FindRow("date", yyyymm+Lpad(i, "0", 2));
		if( base_note_row >= 0 )
			ds_calendar_obj.SetColumn(row, "base_note"+day, ds_base_note_obj.GetColumn(base_note_row, "note"));

		// �޷»���
		day = (day+1)%7;
		if( day == 0 && i != last_date )
			row = ds_calendar_obj.AddRow();
	}
	
	grid_obj.BindDataset = ds_calendar_obj.ID;
	
	
	// Grid���� ����
	grid_obj.RowHeight = (grid_obj.Height - grid_obj.HeadHeight*2)/(ds_calendar_obj.RowCount()*3);

	//�� ���� ���� ��ư ���� - �� �������Ͽ��� ���̰� �ϱ�
    /*
    if(last_date!=substr(today(), 6, 2)){
		FinGeuntae.height=0;
	}
	*/
}

//*------------------------------------------------------------------------------------------------
//* �Լ�����     : �׸��� �޷»���-�޷� �׸���2
//* �Լ�����     : 
//* parameter    : ds_calendar_obj ,grid_obj ,ds_base_note_obj ,yyyymm
//* return value : ����
//* ���         :
//*-----------------------------------------------------------------------------------------------
function gfn_CalGrid_DrawCalendar2(ds_calendar_obj, grid_obj, ds_base_note_obj, yyyymm)
{
	var i, day, row, colid;
	var start_day, end_date, today;

	gfn_CalGrid_MakeBaseNote(ds_base_note_obj, yyyymm);	
	
	// Grid Header����
	gfn_CalGrid_drawheader(grid_obj,yyyymm);
	
	// Dataset �����
	grid_obj.BindDataset = "";
	ds_calendar_obj.ClearData();
	start_day = GetDay(yyyymm+"01");
	last_date = gfn_CalGrid_GetLastDay(yyyymm);
	row = ds_calendar_obj.AddRow();
	
	for( i = 1, day = start_day ; i <= last_date ; i++ )
	{
		// �޷� ����			
		ds_calendar_obj.SetColumn(row, "day"+day, i);
		
		// ���� ó��
		if( gfn_CalGrid_IsHoliday(yyyymm+Lpad(i, "0", 2)) != "" )
			ds_calendar_obj.SetColumn(row, "hol"+day, "1"); 
			
		// �������� ����
		var base_note_row;
		base_note_row = ds_base_note_obj.FindRow("date", yyyymm+Lpad(i, "0", 2));
		if( base_note_row >= 0 )
			ds_calendar_obj.SetColumn(row, "base_note"+day, ds_base_note_obj.GetColumn(base_note_row, "note"));

		// �޷»���
		day = (day+1)%7;
		if( day == 0 && i != last_date )
			row = ds_calendar_obj.AddRow();
	}
	
	grid_obj.BindDataset = ds_calendar_obj.ID;
	
	
	// Grid���� ����
	grid_obj.RowHeight = (grid_obj.Height - grid_obj.HeadHeight*2)/(ds_calendar_obj.RowCount()*3.8);

	//�� ���� ���� ��ư ���� - �� �������Ͽ��� ���̰� �ϱ�
    /*
    if(last_date!=substr(today(), 6, 2)){
		FinGeuntae.height=0;
	}
	*/
}
//*------------------------------------------------------------------------------------------------
//* �Լ�����     : �׸��� �޷»���-�޷� �׸��� ��� �ؽ�Ʈ ���� (����ڰ� ������ �ش��)
//* �Լ�����     : 
//* parameter    : grid_obj ,yyyymm
//* return value : ����
//* ���         :
//*-----------------------------------------------------------------------------------------------
function gfn_CalGrid_drawheader(grid_obj,yyyymm)
{
	grid_obj.UserData = yyyymm;
	grid_obj.SetCellProp("head",0,"text",substr(yyyymm, 0, 4) + "�� " + ToInteger(substr(yyyymm, 4,2)) + "��");
}
