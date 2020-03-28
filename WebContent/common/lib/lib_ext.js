//*------------------------------------------------------------------------------------------------
//* �Լ�����     : �޿�������� �������� 
//* �Լ�����     : 
//* parameter    : ȸ�� �Ǵ� ���� �ڵ� 
//* return value : ����
//*-----------------------------------------------------------------------------------------------
function gfn_sary_calc_tp(com_group_cd)
{
	
	svcID			= "SaryComm.selectCalcTp";
	url   			= "service::SaryComm.selectCommCode.do";
	inDatasets  	= "";
	outDatasets 	= "ds_sary_calc_tp=SaryComm.selectCalcTp";
	argument    	= " _sqlName=SaryComm.selectCalcTp"
							+ " com_group_cd=" + quote(com_group_cd);					
						
	callbackFunc 	= "gfn_callback";

	gfn_showProgressWindow(true);
	gfn_SyncTransaction(svcID, url, inDatasets, outDatasets, argument, callbackFunc);	 
}


//*------------------------------------------------------------------------------------------------
//* �Լ�����     : �����ݰ������ �������� 
//* �Լ�����     : 
//* parameter    : ȸ�� �Ǵ� ���� �ڵ� 
//* return value : ����
//*-----------------------------------------------------------------------------------------------
function gfn_rtm_calc_tp(com_group_cd)
{
	
	svcID			= "SaryComm.selectRtmCalcTp";
	url   			= "service::SaryComm.selectCommCode.do";
	inDatasets  	= "";
	outDatasets 	= "ds_rtm_calc_tp=SaryComm.selectRtmCalcTp";
	argument    	= " _sqlName=SaryComm.selectRtmCalcTp"
							+ " com_group_cd=" + quote(com_group_cd);					
						
	callbackFunc 	= "gfn_callback";

	gfn_showProgressWindow(true);
	gfn_SyncTransaction(svcID, url, inDatasets, outDatasets, argument, callbackFunc);	 
}

//*------------------------------------------------------------------------------------------------
//* �Լ�����     : ���� �������� 
//* �Լ�����     : 
//* parameter    : ���� �ڵ� 
//* return value : ����
//*-----------------------------------------------------------------------------------------------
function gfn_area_dtl(corp_list)
{
	
	svcID			= "SaryComm.selectAreaDtl";
	url   			= "service::SaryComm.selectAreaDtl.do";
	inDatasets  	= "";
	outDatasets 	= "ds_area_cd=SaryComm.selectAreaDtl";
	argument    	= " _sqlName=SaryComm.selectAreaDtl"
							+ " corp_list=" + quote(corp_list);					
						
	callbackFunc 	= "gfn_callback";

	gfn_showProgressWindow(true);
	gfn_SyncTransaction(svcID, url, inDatasets, outDatasets, argument, callbackFunc);	 
}


//*------------------------------------------------------------------------------------------------
//* �Լ�����     : �����ݿ���� �������� 
//* �Լ�����     : 
//* parameter    : ȸ�� �Ǵ� ���� �ڵ� 
//* return value : ����
//*-----------------------------------------------------------------------------------------------
function gfn_rtm_aui_cd(corp_cd)
{
	
	svcID			= "SaryComm.selectRtmAuiCd";
	url   			= "service::SaryComm.selectCommCode.do";
	inDatasets  	= "";
	outDatasets 	= "ds_aui_cd=SaryComm.selectRtmAuiCd";
	argument    	= " _sqlName=SaryComm.selectRtmAuiCd"
							+ " corp_cd=" + quote(corp_cd);					
						
	callbackFunc 	= "gfn_callback";

	gfn_showProgressWindow(true);
	gfn_SyncTransaction(svcID, url, inDatasets, outDatasets, argument, callbackFunc);	 
}
