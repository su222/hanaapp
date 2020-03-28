var upload_packetSize = 4096000; //1048576;
var download_packetSize = 1048576;


// 파일 확장자 리턴
function gfn_getExt(tmpFileName){

	var chkFile = "";
	var fileExt = "";
	
	for(i=0; i < length(tmpFileName); i++)
	{
		chkFile = substr(tmpFileName, i, 1);
		if(chkFile == ".")
		{
			fileExt = substr(tmpFileName, i+1, 3);
		}
	}
	
	return fileExt;
}



function gfn_FileWrite(httpfileObj, file_url, save_file_name, savepath){

	var rtn_arr = Array(3);
	var readpercent;
	rtn_arr[0] = "FAIL";

	if (length(file_url) < 1) {
		rtn_arr[1] = "Not Found Seleced File!";
		return rtn_arr;
	}
	
	if (length(save_file_name) < 1){
		rtn_arr[1] = "Not Found CookieParam!";
		return rtn_arr;
	} 
	
	var write_size;
	var tot_write_size;
	var file_size;
	
	remote_url =  globalURL + "JSP/fileUpload.jsp?savepath=" + savepath;
	file_size = httpfileObj.GetFileSizeLocal(file_url);


	//httpfileObj.CookieParam = save_file_name;
	httpFileObj.CookieParam = UrlEncode(save_file_name);

//	trace("httpfileObj.CookieParam : " + httpfileObj.CookieParam);
	
//	trace("remote_url : " + remote_url);
//	trace("file_size : " + file_size);
//	trace("file_url : " + file_url);

	ret = httpfileObj.OpenFile(remote_url, file_url, "PUT");
	
//	trace('ret='+ret);
	
	
	if( ret < 0 )	{
		rtn_arr[0] = "FAIL";
		rtn_arr[1] = "OpenFile Failed :: " + httpfileObj.ErrorMsg;
		return rtn_arr;
	}
	
	while(1) {
		write_size = httpfileObj.WriteFile(upload_packetSize);
		trace('write_size='+write_size);
		tot_write_size += write_size;
		
		readpercent = truncate((tot_write_size / file_size) * 100,1);
		
		if( write_size < upload_packetSize )	break;
	}

	httpfileObj.CloseFile();

	if ( write_size == -1 )	{
		rtn_arr[0] = "FAIL";
		rtn_arr[1] = httpfileObj.ErrorMsg;
		return rtn_arr;
	}

	var rtn_val = httpfileObj.CookieParam;

	var str_sp = split2(rtn_val,";","=");
	var tmp_a;
	
	for ( var i = 0 ; i < str_sp.length() ; i++ )
	{
		tmp_a = str_sp[i];
		if ( tmp_a[0].pos("FileParam") > -1 )
		{
			rtn_arr[0] = left(tmp_a[1],4);
			rtn_arr[1] = right(tmp_a[1], length(tmp_a[1]) -6);
		}	
	}	
	
	
	return rtn_arr;
}



function gfn_ReadFile(httpfileObj, file_url, savepath, str_size){

	var rtn_arr = Array(2);
	rtn_arr[0] = "FAIL";

	if (length(quote(file_url)) < 1) {
		rtn_arr[1] = "Not Found Seleced File!";
		return rtn_arr;
	}
	
	if (length(quote(savepath)) < 1){
		rtn_arr[1] = "Not Found CookieParam!";
		return rtn_arr;
	}


	var remote_url =  globalURL + "JSP/fileDownload.jsp?savepath=" + savepath;
	
	var read_size;
	var tot_read_size;
	var file_size;

	httpFileObj.CookieParam = UrlEncode(savepath);
	
	file_size = str_size;
	//trace("remote_url::"+remote_url);	
	//trace("file_url::"+file_url);
	ret = httpfileObj.OpenFile(remote_url, file_url, "GET");
	
	if( ret < 0 ) {
		rtn_arr[0] = "FAIL";
		rtn_arr[1] = "OpenFile Fail ::" + httpfileObj.ErrorMsg;
		return rtn_arr;
	}
	
	tot_read_size = 0;	

	while(1) {
		read_size = httpfileObj.ReadFile(download_packetSize);
		if( (read_size == 0) || ( read_size == -1) ) break;
	}
	
	httpfileObj.CloseFile();
	
	if ( read_size == -1 )	{
		rtn_arr[0] = "FAIL";
		rtn_arr[1] = httpfileObj.ErrorMsg;
		return rtn_arr;
	}
	
	var rtn_val = httpfileObj.CookieParam;
	
	//alert(rtn_val);
	
	var str_sp = split2(rtn_val,";","=");
	var tmp_a;
	
	for ( var i = 0 ; i < str_sp.length() ; i++ )
	{
		tmp_a = str_sp[i];
		if ( tmp_a[0].pos("FileParam") > -1 )
		{
			rtn_arr[0] = left(tmp_a[1],4);
			rtn_arr[1] = right(tmp_a[1], length(tmp_a[1]) -6);
		}	
	}	
	
	return rtn_arr;
}
