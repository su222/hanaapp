/***************************************************************************************************
 * Source Name : lib_globak.js
 * Description : ȭ�� start, stop ���� ��ü ���õ� �Լ� ó�� 
 * DATE : 2013.01.22
 * Author  : �̿���
 * History : 
***************************************************************************************************/
 

/***************************************************************************************************
 * HotKey ����
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
 * �����ڵ� Dataset�� ������� DataSet ä���
 *
 * @param  none
 * @return  none
***************************************************************************************************/
function gfn_fillCodeDataSet(){
	
	// ����Ÿ���� ���� ������ �����´�.
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
 * �����ڵ� Dataset ä��� ���� callback
 *
 * @param  none
 * @return  none
***************************************************************************************************/
function fn_code_callback()
{
	//alert('�����ڵ� Load');
}


/***************************************************************************************************
 * ���� init �Լ�(��ü ȭ�鿡�� ���ÿ� include �Ѵ�)
 * ��_OnLoadCompleted ���� �ش� �Լ� ȣ��
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
	
	// HotKey ���
	gfn_HotKey_Support(this);
	
	// 1. ī���� component ���� �ʼ� ����
	gfn_FormLoadEventProc(obj);	
}

/***************************************************************************************************
 * ���� exit �Լ�(��ü ȭ�鿡�� ���ÿ� include �Ѵ�)
 * ��_OnUnloadCompleted ���� �ش� �Լ� ȣ��
 * @param  none
 * @return  none
***************************************************************************************************/
function gfn_OnBeforeExit() 
{
    // �������� ���ֱ�
	//SetReg("GlobalVal", "");

    /*
    var checkLogOut = false;	
	if(!g_closeFlag){
		var rtn = gfn_popup_message("modal", "confirm", "�����Ͻðڽ��ϱ�?", "����");
		
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

