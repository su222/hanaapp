//*------------------------------------------------------------------------
//* �Լ�����     : RD �ʱ�ȭ �Լ�
//* �Լ�����     :
//* parameter    :
//* return value : ����
//*------------------------------------------------------------------------
function gfn_initReport()
{
	Report0.EnableThreadEngine(1);
	Report0.AutoAdjust = false;
	Report0.zoomratio = 80;
	Report0.SetBackgroundColor(255,255,255);
	Report0.ZoomDefault();
	
}
 

//*------------------------------------------------------------------------
//* �Լ�����     : mrd ����
//* �Լ�����     :
//* @param  pReport  Report Designer ID
//* @param  pMrd     MRD
//* @param  pParam     MRD �Ķ����
//* @return  none
//* return value : ����
//*------------------------------------------------------------------------
function gfn_viewReport(pReport, pMrd, pParam, isPrint)
{
	if(gds_system.rd_svc_url == "" || gds_system.rd_svc_name == "" || gds_system.rd_mrd_url)
	{
		gfn_popup_message("modal", "error", "���� �ʱ�ȭ���� �����ϴ�. �����ڿ��� �����ϼ���.", "Ȯ��");
	}
	
	var realpath = "/rxlsfullhorz [1] /rcontype [RDAGENT] /rfn ["+gds_system.rd_svc_url+"] /rsn ["+gds_system.rd_svc_name+"] ";
	
	pReport.AutoAdjust=false;
	pReport.zoomratio=100;
	
	
	trace('print='+gds_system.rd_mrd_url + pMrd +','+ realpath + pParam);
	
	
	pReport.FileOpen(gds_system.rd_mrd_url + pMrd, realpath + pParam);
	
	if(isPrint == true)
	{
		pReport.CMPrint(); //�μ� ����
	}

}

