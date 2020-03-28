/***************************************************************************************************
 * Source Name : lib_globak.js
 * Description : 화면 start, stop 등의 전체 관련된 함수 처리 
 * DATE : 2013.01.22
 * Author  : 이용재
 * History : 
***************************************************************************************************/
 

/***************************************************************************************************
 * HotKey 지정
 *
 * @param  object
 * @return  none
***************************************************************************************************/
function gfn_HotKey_Support(obj) {
	
	for(var i=0;i<obj.Components.count();i++){	
		compObj = obj.Components[i];
		//alert(compObj.GetType());
		if(toUpper(compObj.GetType()) == 'TAB') {
			compObj.setFocus();
			break;
		}
		if(toUpper(compObj.GetType()) == 'EDIT') {
			compObj.setFocus();
			break;
		}
		// else if(toUpper(compObj.GetType()) == 'IMAGE') {
			// compObj.setFocus();
			// break;
		// }else if(toUpper(compObj.GetType()) == 'BUTTON') {
			// compObj.setFocus();
			// break;
		// }
		// else if(toUpper(compObj.GetType()) == 'SHAPE') {
			// compObj.setFocus();
			// break;
		// }
		// else if(toUpper(compObj.GetType()) == 'STATIC') {
			// compObj.setFocus();
			// break;
		// }
	}
}

/***************************************************************************************************
 * 공통코드 Dataset이 없을경우 DataSet 채우기
 *
 * @param  none
 * @return  none
***************************************************************************************************/
function gfn_fillCodeDataSet(){
	
	// 데이타셋의 값이 없으면 가져온다.
	if(gds_code.rowcount = 0)
	{
		var svcID			= "common.selectCodeDListMap";
		var url   			= "service::common/select_mi.do";
		var inDatasets  	= "";
		var outDatasets 	= "gds_code=cc.CCCodeDDAO.selectCodeDListMap";
		var argument    	= " _sqlName=cc.CCCodeDDAO.selectCodeDListMap"
							;
		var callbackFunc 	= "fn_code_callback";
	
		gfn_SyncTransaction(svcID, url, inDatasets, outDatasets, argument, callbackFunc);	
	
	}
}

/***************************************************************************************************
 * 공통코드 Dataset 채우고 나서 callback
 *
 * @param  none
 * @return  none
***************************************************************************************************/
function fn_code_callback()
{
	//alert('공통코드 Load');
}


/***************************************************************************************************
 * 공통 init 함수(전체 화면에서 동시에 include 한다)
 * 폼_OnLoadCompleted 에서 해당 함수 호출
 * @param  none
 * @return  none
***************************************************************************************************/
function gfn_OnInit() {
	
	var serverUrl=global.StartXML;

	if(serverUrl.IndexOf("http://") != -1) {
		g_url = substr(serverUrl,0, indexOf(serverUrl,"/",8));
	}
	else {
		g_url = GlobalURL +"/heweb/";
	}
	
	// HotKey 사용
	gfn_HotKey_Support(this);
	
	// 1. 카렌더 component 사용시 필수 정의
	gfn_FormLoadEventProc(obj);	
}

/***************************************************************************************************
 * 공통 exit 함수(전체 화면에서 동시에 include 한다)
 * 폼_OnUnloadCompleted 에서 해당 함수 호출
 * @param  none
 * @return  none
***************************************************************************************************/
function gfn_OnBeforeExit() 
{
    // 전역변수 없애기
	//SetReg("GlobalVal", "");

    /*
    var checkLogOut = false;	
	if(!g_closeFlag){
		var rtn = gfn_popup_message("modal", "confirm", "종료하시겠습니까?", "종료");
		
		if(rtn  == true){
			
			checkLogOut = true;
		}
		else{
			return false;
		}
	}
	if(checkLogOut){
		fn_loggingHistory();
		exit();
		
	}
	*/
}

