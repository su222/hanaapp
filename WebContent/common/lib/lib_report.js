//*------------------------------------------------------------------------
//* 함수설명     : RD 초기화 함수
//* 함수유형     :
//* parameter    :
//* return value : 없음
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
//* 함수설명     : mrd 보기
//* 함수유형     :
//* @param  pReport  Report Designer ID
//* @param  pMrd     MRD
//* @param  pParam     MRD 파라미터
//* @return  none
//* return value : 없음
//*------------------------------------------------------------------------
function gfn_viewReport(pReport, pMrd, pParam, isPrint)
{
	if(gds_system.rd_svc_url == "" || gds_system.rd_svc_name == "" || gds_system.rd_mrd_url)
	{
		gfn_popup_message("modal", "error", "보고서 초기화값이 없습니다. 관리자에게 문의하세요.", "확인");
	}
	
	var realpath = "/rxlsfullhorz [1] /rcontype [RDAGENT] /rfn ["+gds_system.rd_svc_url+"] /rsn ["+gds_system.rd_svc_name+"] ";
	
	pReport.AutoAdjust=false;
	pReport.zoomratio=100;
	
	
	trace('print='+gds_system.rd_mrd_url + pMrd +','+ realpath + pParam);
	
	
	pReport.FileOpen(gds_system.rd_mrd_url + pMrd, realpath + pParam);
	
	if(isPrint == true)
	{
		pReport.CMPrint(); //인쇄 시작
	}

}

