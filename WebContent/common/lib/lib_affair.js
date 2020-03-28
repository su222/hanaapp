/***************************************************************************************************
 * 사건관련 공통 함수
 * 사건관련 스크립트가 너무 길어서 lib로 하나 뺀다 
***************************************************************************************************/


/**************************************************************************************************
  * 사용자 정의  Function 처리 부분
***************************************************************************************************/






// 내근의 접수방법 가져오기
// 만약 내근에 접수방법이 있다면 해당 접수방법으로 상태 바꾸고 발급 진행
function set_acp_mtd_event(brch_id, aff_seq, dtl_seq, bnd_seq)
{
	
	DS_ACP_MTD.ClearData();
	
	svcID			= "ACAA01T01.selectBndAcpMtd";
	url   			= "service::common/select_mi.do";
	inDatasets  	= "";
	outDatasets 	= "DS_ACP_MTD=ac.ACAffairDAO.selectBndAcpMtd";	
	
	argument    	= " _sqlName=ac.ACAffairDAO.selectBndAcpMtd"
					+ " BRCH_ID=" + quote(brch_id)			
					+ " BND_SEQ=" + quote(bnd_seq)
					+ " AFF_SEQ=" + quote(aff_seq)
					+ " DTL_SEQ=" + quote(dtl_seq)
					;	


	callbackFunc 	= "gfn_callback";

	gfn_SyncTransaction(svcID, url, inDatasets, outDatasets, argument, callbackFunc);	
	
}



// 컬럼값 변경에 따른 이벤트
function set_dtl_event(c_row, col_id)
{
	
	
	var cur_bnd_seq_col = "";
	var next_bnd_seq_col = "";
	
	///////////// 이후 채권사 있는지 체크하는 로직 넣기 ///////////////////
	// 반드시 처음에 넣어야 된다.
	// 만약 의뢰채권사 => 진행1 셋팅 후 이거 태우면 무조건 이후 채권사 있는것으로 인식함 
	
	// 의뢰 채권사
	if(col_id == "REQ_BND_STS")
	{	
		cur_bnd_seq_col = "REQ_BND_SEQ";
		next_bnd_seq_col = "BND_SEQ_1";
	}
	// 진행1
	else if(col_id == "PRS_STS_1")
	{	
		cur_bnd_seq_col = "BND_SEQ_1";
		next_bnd_seq_col = "BND_SEQ_2";
	}
	// 진행2
	else if(col_id == "PRS_STS_2")
	{	
		cur_bnd_seq_col = "BND_SEQ_2";
		next_bnd_seq_col = "";
	}
	
	isNextBnd = getIsNextBnd(c_row, next_bnd_seq_col);
	
	
	// 매각, 일부매각, 보증, 추가확인, 의뢰추가, 은행연합, 신용조회, 신용회복, 계약이전
	if(	DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "100" 	// 공란
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "110" 	// 매각
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "120"	// 일부매각
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "130"	// 보증
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "140"	// 대위변제
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "150"	// 추가확인
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "160"	// 의뢰추가
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "170"	// 은행연합
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "180"	// 신용조회
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "190"	// 신용회복
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "400"	// 계약이전
	  )
	  {
		// 의뢰 채권사 상태가 해당상태를 제외한 모든 상태는  진행1이 없다면 자동으로 진행1은 의뢰채권사로 셋팅
		if(DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "" && length(DS_AFFAIR_DTL.GetColumn(c_row, "BND_NM_1")) == 0)
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "BND_SEQ_1", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_SEQ"));
			DS_AFFAIR_DTL.SetColumn(c_row, "BND_NM_1", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_NM"));
			DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS"));
			DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1_NM", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS_NM"));
			DS_AFFAIR_DTL.SetColumn(c_row, "BAR_1", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BAR"));
		}
		
		// 의뢰채권사명은 있고 진행1명 없고 진행1상태 변경시 진행1 명도 자동 셋팅
		if(DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_NM") != "" 
			&& length(DS_AFFAIR_DTL.GetColumn(c_row, "BND_NM_1")) == 0 
			&& length(DS_AFFAIR_DTL.GetColumn(c_row, "PRS_STS_1_NM")) != 0
		   )
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "BND_SEQ_1", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_SEQ"));
			DS_AFFAIR_DTL.SetColumn(c_row, "BND_NM_1", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_NM"));
			DS_AFFAIR_DTL.SetColumn(c_row, "BAR_1", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BAR"));
		}
		
	  
	  }
	
	
/*
	// 의뢰 채권사 상태가 해당상태를 제외한 모든 상태는  진행1이 없다면 자동으로 진행1은 의뢰채권사로 셋팅
	// 매각, 일부매각, 보증, 추가확인, 의뢰추가, 은행연합, 신용조회, 신용회복, 계약이전
	if((DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "" 
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "100" 	// 공란
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "110" 	// 매각
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "120"	// 일부매각
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "130"	// 보증
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "140"	// 대위변제
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "150"	// 추가확인
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "160"	// 의뢰추가
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "170"	// 은행연합
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "180"	// 신용조회
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "190"	// 신용회복
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "400"	// 계약이전
		
	   ) && length(DS_AFFAIR_DTL.GetColumn(c_row, "BND_NM_1")) == 0 )
	{
		
//		trace('상태넣기=>' + DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS"));
		
		DS_AFFAIR_DTL.SetColumn(c_row, "BND_SEQ_1", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_SEQ"));
		DS_AFFAIR_DTL.SetColumn(c_row, "BND_NM_1", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_NM"));
		DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS"));
		DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1_NM", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS_NM"));
		
		
//trace('req_bnd_sts_nm='+DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS_NM"));
		
		//DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1_NM", '222');
	}	
*/
	
//	trace('cur_bnd_seq_col='+cur_bnd_seq_col+','+c_row+'=>'+DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col));
	
	
	//  채권사 진행상태 변경에 따른 이벤트 
	if(col_id == "REQ_BND_STS" || col_id == "PRS_STS_1" || col_id == "PRS_STS_2")
	{

		// 먼저 사건진행부터 체크한다.
		set_acp_mtd_event(DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), 
							DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"), 
							DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"), 
							DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col));

		// 발급일때  등기/원격/등기+반송이면 그것으로 상태 변경하기
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "210")
		{
			// 등기
			if(DS_ACP_MTD.GetColumn(0, "ACP_MTD") == 'D')
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "TMP_PRS_STS", "330");
			}
			
			// 원격
			if(DS_ACP_MTD.GetColumn(0, "ACP_MTD") == 'R')
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "TMP_PRS_STS", "350");
			}
			
			// 등기반송
			if(DS_ACP_MTD.GetColumn(0, "ACP_MTD") == 'DR')
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "TMP_PRS_STS", "360");
			}
		}

		// 중복 선택시 바로 발급으로 바꿔서 처리함
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "220" && isNextBnd == false)
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "TMP_PRS_STS", "210");
		}




//		TRACE('ACP_MTD='+DS_ACP_MTD.GetColumn(0, "ACP_MTD"));
		
		
		//trace('isNextBnd='+isNextBnd);
		//trace('col_id='+DS_AFFAIR_DTL.GetColumn(c_row, col_id));
		
		
		// 의뢰채권사 -> 진행1은 진행1이 있더라도 무조건 의뢰 진행으로 셋팅함
		if(col_id == "REQ_BND_STS")
		{
			isNextBnd = false;
		}
		
		
		
//		trace('isNextBnd='+isNextBnd);
		

		// 아무것도 없으면 클리어 
		if((DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "" || DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "100" ) && isNextBnd == false)
		{
			
			if(cur_bnd_seq_col == "REQ_BND_SEQ")
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "REQ_BND_STS", "");
				DS_AFFAIR_DTL.SetColumn(c_row, "REQ_BND_STS_NM", "");
			}

			if(cur_bnd_seq_col == "BND_SEQ_1")
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1", "");
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1_NM", "");
			}
			
			if(cur_bnd_seq_col == "BND_SEQ_2")
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_2", "");
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_2_NM", "");
			}				
			
			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 0);	// 부채			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// 내용
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 0);	// 은행
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 0);	// 카드		
				
			DS_AFFAIR_DTL.SetColumn(c_row, "BNK_CHRG", "");	// 은행수수료		
			DS_AFFAIR_DTL.SetColumn(c_row, "AGC_CHRG", "");	// 대행수수료
		
//			trace('clear==========>');
		
		}



		// 매각(만약 진행상태2에서 매각이면 행추가 한다.
		// 2014/09/16 자동 행추가 빼기(수동으로 행을 추가함)
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "110" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
			
			
			if(col_id == "PRS_STS_2")
			{
				fn_pop_bnd_continue(c_row);				
			}
		}

		// 일부매각의 경우 매입 채권사 선택 팝업
		//if(DS_AFFAIR_DTL.GetColumn(c_row, col_id) == "120" && isNextBnd == false)
		// 일부매각 우선 비활성화 하고 채권사 팝업 정리되면 일괄 손보자 2014.11.08
		/*
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "120")
		{
			fn_pop_part_bnd_info(c_row, cur_bnd_seq_col);
		}
		*/
		
		// 보증
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "130" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
		}
		
		// 대위변제 370과 중복됨
		/*
		if(DS_AFFAIR_DTL.GetColumn(c_row, col_id) == "140" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
		}
		*/
				
		// 추가확인
		//추가확인 기재 해야된다네..
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "150")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "REQ_BND_SEQ", "");	// 의뢰채권사
			DS_AFFAIR_DTL.SetColumn(c_row, "REQ_BND_NM", "");	// 의뢰채권사
			//DS_AFFAIR_DTL.SetColumn(c_row, "REQ_BND_STS", "");	// 의뢰채권사
			//DS_AFFAIR_DTL.SetColumn(c_row, "REQ_BND_STS_NM", "");	// 의뢰채권사
		}
		

		// 발급진행
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "200" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
		}		
		
		// 발급
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "210" && isNextBnd == false)
		{
			// 발급시 서류종류 채크해서 넣기
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", CHK_DEB_YN.Value);	// 부채			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", CHK_BNK_YN.Value);	// 통장
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", CHK_CARD_YN.Value);	// 카드				
			
			// 발급사의 수수료, 은행수수료 자동 넣기
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));
		
		
			// 채권사가 신용조회면 은행수수료에  신용조회 수수료 넣기 
			// 은행수수료는 0
			if(DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col) == '6235')
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 0);	// 부채			
				DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// 내용
				DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 0);	// 은행
				DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 0);	// 카드	
				DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CRDT", 1);	// 신용					
				
				DS_AFFAIR_DTL.SetColumn(c_row, "BNK_CHRG", ToNumber(GDS_BRCH_BAS.GetColumn(0,"CRDT_AMT")));
				DS_AFFAIR_DTL.SetColumn(c_row, "AGC_CHRG", ToNumber(GDS_BRCH_BAS.GetColumn(0,"CRDT_AMT2")));
				
			}

		
		}
		
		// 중복
		// 비고와 금액은 중복 체크에서 일괄 처리하자.
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "220" && isNextBnd == false)
		{
			
			if(cur_bnd_seq_col == "REQ_BND_SEQ")
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "REQ_BND_STS", "220");
				DS_AFFAIR_DTL.SetColumn(c_row, "REQ_BND_STS_NM", "발급");
				//DS_AFFAIR_DTL.SetColumn(c_row, "REQ_PRS_NOTE", "(다른건과중복(청구X))");
				//DS_AFFAIR_DTL.SetColumn(c_row, "BNK_CHRG", "0");
				//DS_AFFAIR_DTL.SetColumn(c_row, "AGC_CHRG", "0");
			}

			if(cur_bnd_seq_col == "BND_SEQ_1")
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1", "220");
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1_NM", "발급");
				//DS_AFFAIR_DTL.SetColumn(c_row, "PRS_NOTE_1", "(다른건과중복(청구X))");
				//DS_AFFAIR_DTL.SetColumn(c_row, "BNK_CHRG", "0");
				//DS_AFFAIR_DTL.SetColumn(c_row, "AGC_CHRG", "0");
			}
			
			if(cur_bnd_seq_col == "BND_SEQ_2")
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_2", "220");
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_2_NM", "발급");
				//DS_AFFAIR_DTL.SetColumn(c_row, "PRS_NOTE_2", "(다른건과중복(청구X))");
				//DS_AFFAIR_DTL.SetColumn(c_row, "BNK_CHRG", "0");
				//DS_AFFAIR_DTL.SetColumn(c_row, "AGC_CHRG", "0");
			}			
		}			

		// 부카
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "230")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 1);	// 부채			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// 내용
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 0);	// 은행
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 1);	// 카드		

			// 발급사의 수수료, 은행수수료 자동 넣기
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));
			
		}	
	
		// 부통
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "240")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 1);	// 부채			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// 내용
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 1);	// 은행
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 0);	// 카드	

			// 발급사의 수수료, 은행수수료 자동 넣기
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));
				
		}	
	
		// 부카통
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "250")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 1);	// 부채			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// 내용
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 1);	// 은행
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 1);	// 카드	
				
			// 발급사의 수수료, 은행수수료 자동 넣기
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));
				
		}	

		// 카통
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "260")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 0);	// 부채			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// 내용
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 1);	// 은행
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 1);	// 카드	
				
			// 발급사의 수수료, 은행수수료 자동 넣기
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));
				
		}	

		// 카드만
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "270")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 0);	// 부채			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// 내용
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 0);	// 은행
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 1);	// 카드	
				
			// 발급사의 수수료, 은행수수료 자동 넣기
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));
				
		}	

		// 통장만
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "280")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 0);	// 부채			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// 내용
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 1);	// 은행
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 0);	// 카드	
				
			// 발급사의 수수료, 은행수수료 자동 넣기
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));
				
		}	

		// 내용증명
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "290")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 0);	// 부채			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 1);	// 내용
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 0);	// 은행
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 0);	// 카드	
			
			// 발급사의 수수료, 은행수수료 자동 넣기
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));
			
			// 내용증명은 회사정보의 은행,대행수수료 내용증명 수수료 
			DS_AFFAIR_DTL.SetColumn(c_row, "BNK_CHRG", ToNumber(GDS_BRCH_BAS.GetColumn(0,"COC_AMT")));
			DS_AFFAIR_DTL.SetColumn(c_row, "AGC_CHRG", ToNumber(GDS_BRCH_BAS.GetColumn(0,"COC_AMT2")));
				
		}	

		// 발급불가
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "300" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
		}
		
		// 의뢰취소
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "310" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
		}
				
		// 채무없음
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "320" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
		}

		// 등기완료
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "330" && isNextBnd == false)
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 1);	// 부채			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// 내용
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 0);	// 은행
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 0);	// 카드	
			
		
			// 등기완료 = 은행수수료 + 2020
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));

			// 은행수수료만 바꿈 
			//DS_AFFAIR_DTL.SetColumn(c_row, "BNK_CHRG", ToNumber(DS_AFFAIR_DTL.GetColumn(c_row, "BNK_CHRG")) + ToNumber(GDS_BRCH_BAS.GetColumn(0,"REGS_AMT")));


		}
									
						
		// 완납
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "340" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
		}						

		// 원격완료
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "350")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 1);	// 부채			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// 내용
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 0);	// 은행
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 0);	// 카드				
			
			// 원격완료 = 은행수수료 + 5000
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));

			// 은행수수료만 바꿈 
			//DS_AFFAIR_DTL.SetColumn(c_row, "BNK_CHRG", ToNumber(DS_AFFAIR_DTL.GetColumn(c_row, "BNK_CHRG")) + ToNumber(GDS_BRCH_BAS.GetColumn(0,"RMT_AMT")));
		}		
	
		// 등기+반송완료
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "360")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 1);	// 부채			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// 내용
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 0);	// 은행
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 0);	// 카드				
			
			// 등기완료 = 은행수수료 + 2020 * 2 (즉 등기수수료의 2배)
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));
		
			// 은행수수료만 바꿈 
			//DS_AFFAIR_DTL.SetColumn(c_row, "BNK_CHRG", ToNumber(DS_AFFAIR_DTL.GetColumn(c_row, "BNK_CHRG")) + ToNumber(GDS_BRCH_BAS.GetColumn(0,"REGS_AMT")) * 2);
	
		
		}
				
		// 대위변제
		// 매각과 동일 2014.02.24
		/*
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "370" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
		}
		*/
	
		// 발급예정
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "380")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 1);	// 부채			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// 내용
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 0);	// 은행
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 0);	// 카드				
			
			// 발급사의 수수료, 은행수수료 자동 넣기
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));
		}	

		// 발급보류
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "390" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
		}		

		// 계약이전
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "400" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
		}
				
				
				
	}



	// 의뢰 채권사 상태가 해당상태이면 의뢰채권사의 상태를 없애고 진행1을 발급으로 바꿈
	// 부카, 부통, 부카통, 카통, 카드만, 통장만, 등기완료, 등기+반송완료, 원격완료, 발급예정
	if((DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "210" 	// 발급
	    || DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "230" 	// 부카
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "240" 	// 부통
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "250"	// 부카통
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "260"	// 카통
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "270"	// 카드만
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "280"	// 통장만
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "330"	// 등기완료
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "360"	// 등기+반송완료
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "350"	// 원격완료
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "290"	// 내용증명
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "320"	// 채무없음
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "200"	// 발급진행
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "300"	// 발급불가
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "340"	// 완납
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "310"	// 의뢰취소
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "380"	// 발급예정
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "390"	// 발급보류
		)
      )  
	{
		if(col_id == "REQ_BND_STS" || col_id == "PRS_STS_1")
		{
		
			// 의뢰 채권사 상태가 해당상태를 제외한 모든 상태는  의뢰상태 공란 처리 
			// 매각, 일부매각, 보증, 추가확인, 의뢰추가, 은행연합, 신용조회, 신용회복, 계약이전
			if(DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "" 
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "100" 	// 공란
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "110" 	// 매각
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "120"	// 일부매각
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "130"	// 보증
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "140"	// 대위변제
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "150"	// 추가확인
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "160"	// 의뢰추가
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "170"	// 은행연합
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "180"	// 신용조회
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "190"	// 신용회복
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "400"	// 계약이전
			  )
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "REQ_BND_STS", "");
				DS_AFFAIR_DTL.SetColumn(c_row, "REQ_BND_STS_NM", "");
			}	
			
			// 발급예정은 발급예정으로
			if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "380")
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1", "380");
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1_NM", "발급예정");		
			}
			// 그냥 상태만 바꾸는거 
			else if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "290"	// 내용증명
					|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "320"	// 채무없음
					|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "200"	// 발급진행
					|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "300"	// 발급불가
					|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "340"	// 완납
					|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "310"	// 의뢰취소
					|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "390"	// 발급보류
				  )  
			{
				// 여기는 그냥 패스 
			}
			else
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1", "210");
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1_NM", "발급");		
			}
		}
		else if(col_id == "PRS_STS_2")
		{
			if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "380")
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_2", "380");
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_2_NM", "발급예정");		
			}
			else
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_2", "210");
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_2_NM", "발급");		
			}		
		

		}
	
//		trace('명칭변경 YES ='+c_row+'/'+col_id);
		
		//DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1_NM", '222');
	}
	else
	{
//		trace('명칭변경 NO ='+c_row+'/'+col_id);
	
	}
	

	// 진행비고 미리 넣고 발급 처리해야됨
	setPrsNote(c_row, col_id);

}


// 진행비고 자동 넣기
// 진행이 계속 바뀌니 아예 분리해서 관리함 
function setPrsNote( c_row, col_id)
{
	if(col_id == "REQ_BND_STS" || col_id == "PRS_STS_1" )
	{
		DS_AFFAIR_DTL.SetColumn(c_row, "PRS_NOTE_1",  getPrsNote(DS_AFFAIR_DTL.GetColumn(c_row,"TMP_PRS_STS")));
	}
	else if(col_id == "PRS_STS_2")
	{
		DS_AFFAIR_DTL.SetColumn(c_row, "PRS_NOTE_2",  getPrsNote(DS_AFFAIR_DTL.GetColumn(c_row,"TMP_PRS_STS")));
	}

}



// 코드에 따른 비고 매핑 
function getPrsNote(prs_sts_code)
{
	
//	TRACE('prs_sts_code='+prs_sts_code);
	
	
	var tmp_prs_note = "";
	
	if(prs_sts_code == "220")
	{
		tmp_prs_note = "(다른건과중복(청구X))";
	}
	else if(prs_sts_code == "230")
	{
		tmp_prs_note = "(부채+카드거래내역)";
	}
	else if(prs_sts_code == "240")
	{
		tmp_prs_note = "(부채+통장거래내역)";
	}
	else if(prs_sts_code == "250")
	{
		tmp_prs_note = "(부채+카드/통장거래내역)";
	}		
	else if(prs_sts_code == "260")
	{
		tmp_prs_note = "(카드/통장거래내역)";
	}	
	else if(prs_sts_code == "270")
	{
		tmp_prs_note = "(카드거래내역만)";
	}
	else if(prs_sts_code == "280")
	{
		tmp_prs_note = "(통장거래내역만)";
	}		
	else if(prs_sts_code == "330")
	{
		tmp_prs_note = "(등기진행)";
	}
	else if(prs_sts_code == "350")
	{
		tmp_prs_note = "(원격진행)";
	}		
	else if(prs_sts_code == "360")
	{
		tmp_prs_note = "(등기+반송진행)";
	}				
	else if(prs_sts_code == "380")
	{
		tmp_prs_note = "발급예정";
	}				
				
	else
	{
		tmp_prs_note = "";
	}	
	
//	trace('tmp_prs_note='+tmp_prs_note);
	
	return tmp_prs_note;
}










// 매각 계속 진행
function fn_pop_bnd_continue(c_row)
{
	DS_AFFAIR_DTL.FireEvent = false;	

	var curGrpSeq = DS_AFFAIR_DTL.GetColumn(c_row,"GRP_SEQ");
		
	var tRow = DS_AFFAIR_DTL.InsertRow(c_row+1);
	
	TRACE('계속='+DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS"));
	
	
	DS_AFFAIR_DTL.SetColumn(tRow,"FLAG","I");	// 추가 FLAG 넣기
	DS_AFFAIR_DTL.SetColumn(tRow,"ROW_ID","");	// ROW_ID(조회후 셋팅됨)
	DS_AFFAIR_DTL.SetColumn(tRow,"OPERATOR", GDS_USER_INFO.GetColumn(0, "USR_ID"));// 등록자, 수정자 넣기
	DS_AFFAIR_DTL.SetColumn(tRow,"CHK","1");	// 선택
	
	DS_AFFAIR_DTL.SetColumn(tRow,"BRCH_ID", DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"));// 
	DS_AFFAIR_DTL.SetColumn(tRow,"AFF_SEQ", DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"));// 
	
	DS_AFFAIR_DTL.SetColumn(tRow,"DTL_SEQ", '');//  저장시 자동 부여
	DS_AFFAIR_DTL.SetColumn(tRow,"GRP_CD", DS_AFFAIR_DTL.GetColumn(c_row, "GRP_CD"));// 그룹코드는 이전 행의 동일 그룹코드 
	DS_AFFAIR_DTL.SetColumn(tRow,"GRP_SEQ", '');//  그룹순번(재정렬)	   
	DS_AFFAIR_DTL.SetColumn(tRow,"REQ_SEQ", '');// 의뢰순번은 없음 
	DS_AFFAIR_DTL.SetColumn(tRow,"SORT_NO", '');// 출력순서(재정렬) 
	DS_AFFAIR_DTL.SetColumn(tRow,"PRT_EDT_YN", 'Y');// 기본출력
	DS_AFFAIR_DTL.SetColumn(tRow,"PRT_YN", '1');// 기본출력
	DS_AFFAIR_DTL.SetColumn(tRow,"REQ_BND_SEQ", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_SEQ")); 
	DS_AFFAIR_DTL.SetColumn(tRow,"REQ_BND_NM", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_NM")); 
	
	// 의뢰채권사 진행이 공란이면 매각으로 처리 
	if(DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") == '')
	{
		DS_AFFAIR_DTL.SetColumn(tRow,"REQ_BND_STS", "110"); 
		DS_AFFAIR_DTL.SetColumn(tRow,"REQ_BND_STS_NM", "매각"); 
	}
	else
	{
		DS_AFFAIR_DTL.SetColumn(tRow,"REQ_BND_STS", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS")); 
		DS_AFFAIR_DTL.SetColumn(tRow,"REQ_BND_STS_NM", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS_NM")); 
	}
	
	
	
	
	trace('PRT_EDT_YN='+DS_AFFAIR_DTL.GetColumn(tRow,"PRT_EDT_YN"));
	trace('PRT_YN='+DS_AFFAIR_DTL.GetColumn(tRow,"PRT_YN"));
	
	//alert(gfn_dsToString(DS_AFFAIR_DTL));
	
	
	// 중간에 일부매각이 있을 수 있으므로 같은 그룹코드의 순번을 재 정렬 한다.
	fn_set_grp_sort(DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, "GRP_CD"));
	
	// 순번 다시 매기기 
	fn_set_dtl_sort(DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"));

	curDtlRow = tRow;

	fn_affair_dtl(0);

	DS_AFFAIR_DTL.FireEvent = true;		


}



//*------------------------------------------------------------------------------------------------
//* 함수설명     : 행추가
//* 함수유형     : 
//* parameter    : 
//* return value : 없음
//* 비고         :
//*-----------------------------------------------------------------------------------------------
function fn_add_dtl(isInsert)
{
	var vRow;
	
	// 기본정보가 선택되지 않으면 경고 
	if(length(DS_AFFAIR_MST.GetColumn(DS_AFFAIR_MST.curRow,"AFF_SEQ")) == 0)
	{
		gfn_popup_message("modal", "error", "먼저 사건진행 기본정보를 선택 해야 합니다. ", "확인");
		return;
	}
	
	// 첫행 
	if(isInsert == "FIRST")
	{
		vRow = DS_AFFAIR_DTL.InsertRow(0);
	}
	// 중간
	else if(isInsert == "CENTER")
	{
		vRow = DS_AFFAIR_DTL.InsertRow(DS_AFFAIR_DTL.currow+1);
	}
	// 끝
	else
	{
		vRow = DS_AFFAIR_DTL.AddRow();
	}
	
	
//	trace('aft vRow/mst/dtl/note='+vRow+'/'+curMstRow+'/'+curDtlRow+'/'+curNoteRow);
	
	
	curDtlRow = vRow;
	
	// 기초값
	DS_AFFAIR_DTL.SetColumn(vRow,"FLAG","I");	// 추가 FLAG 넣기
	DS_AFFAIR_DTL.SetColumn(vRow,"ROW_ID","");	// ROW_ID(조회후 셋팅됨)
	DS_AFFAIR_DTL.SetColumn(vRow,"OPERATOR", GDS_USER_INFO.GetColumn(0, "USR_ID"));// 등록자, 수정자 넣기
	DS_AFFAIR_DTL.SetColumn(vRow,"CHK","1");	// 선택
    
    DS_AFFAIR_DTL.SetColumn(vRow,"BRCH_ID", DS_AFFAIR_MST.GetColumn(DS_AFFAIR_MST.curRow, "BRCH_ID"));// 
    DS_AFFAIR_DTL.SetColumn(vRow,"AFF_SEQ", DS_AFFAIR_MST.GetColumn(DS_AFFAIR_MST.curRow, "AFF_SEQ"));// 
    
    DS_AFFAIR_DTL.SetColumn(vRow,"DTL_SEQ", '');// 
    DS_AFFAIR_DTL.SetColumn(vRow,"GRP_CD", '');//  저장시부여
    DS_AFFAIR_DTL.SetColumn(vRow,"GRP_SEQ", '');// 	   저장시부여
    DS_AFFAIR_DTL.SetColumn(vRow,"REQ_SEQ", '');// 정렬하면서 부여
    DS_AFFAIR_DTL.SetColumn(vRow,"SORT_NO", '');// 정렬하면서 부여 
    
    DS_AFFAIR_DTL.SetColumn(vRow,"REQ_DEB", '1');// 부채
    DS_AFFAIR_DTL.SetColumn(vRow,"REQ_BNK", '0');// 통장
    DS_AFFAIR_DTL.SetColumn(vRow,"REQ_CARD", '0');// 카드
    
	DS_AFFAIR_DTL.SetColumn(vRow,"PRT_YN", '1');// 출력 
 
	DS_AFFAIR_DTL.SetColumn(vRow,"CLOSE_YN", 'N');// 미마감 
 

// 	trace('bef curDtlRow='+curDtlRow);
	
 	
	fn_set_dtl_sort(DS_AFFAIR_MST.GetColumn(0, "AFF_SEQ"));
	

//	trace('aft curDtlRow='+curDtlRow);
	
	
	DS_AFFAIR_DTL.row = curDtlRow;
	
}
 


//*------------------------------------------------------------------------------------------------
//* 함수설명     :  정렬순서 매기기 (이때 이벤트를 태우지 않는다)
//* 함수유형     : 
//* parameter    : 
//* return value : 없음
//* 비고         : 
//*-----------------------------------------------------------------------------------------------
function fn_set_dtl_sort(aff_seq)
{
	

//	trace('sort bef dtl/note='+curDtlRow+'/'+curNoteRow);
	

	
	
	DS_AFFAIR_DTL.FireEvent = false;	
	
	DS_AFFAIR_DTL.Filter("AFF_SEQ ='"+aff_seq+"' && flag != 'D'");		
	
	// 순번 다시 지정
	var oldSortNo;
	var newSortNo;
	for(var i=0;i<DS_AFFAIR_DTL.rowcount;i++)
	{
		oldSortNo = DS_AFFAIR_DTL.GetColumn(i, "SORT_NO");
		newSortNo = i+1;
		
		DS_AFFAIR_DTL.SetColumn(i, "SORT_NO", newSortNo);
		
		// 순번만 바뀌면 U로 하기
		if(oldSortNo != newSortNo && DS_AFFAIR_DTL.GetColumn(i, "FLAG") == 'N')
		{
			DS_AFFAIR_DTL.SetColumn(i, "FLAG", "U");
		}
	}
	
	
	
	DS_AFFAIR_DTL.FireEvent = true;	
	
//	trace('sort aft dtl/note='+curDtlRow+'/'+curNoteRow);


//	DS_AFFAIR_DTL.row = curDtlRow;
}

//*------------------------------------------------------------------------------------------------
//* 함수설명     :  그룹순서  매기기 
//* 함수유형     : 
//* parameter    : 
//* return value : 없음
//* 비고         : 순번매길때는 이벤트를 걸지 않아야 자동저장 안탄다 
//*-----------------------------------------------------------------------------------------------
function fn_set_grp_sort(aff_seq, grp_cd)
{
	
	DS_AFFAIR_DTL.Filter("AFF_SEQ ='"+aff_seq+"' && GRP_CD ='"+grp_cd+"' && flag != 'D'");		
	
	// 필수체크
	for(var i=0;i<DS_AFFAIR_DTL.rowcount;i++)
	{
		//DS_AFFAIR_DTL.SetColumn(i, "REQ_SEQ", i+1);
		DS_AFFAIR_DTL.SetColumn(i, "GRP_SEQ", i+1);
	}

	DS_AFFAIR_DTL.UnFilter();	
	DS_AFFAIR_DTL.Filter("AFF_SEQ ='"+aff_seq+"' && flag != 'D'");	

}




//*------------------------------------------------------------------------------------------------
//* 함수설명     : DTL 필터링
//* 함수유형     : 
//* parameter    : 
//* return value : 없음
//* 비고 : 마스터 한건만 사용하므로 해당 함수 사용안함  
//*-----------------------------------------------------------------------------------------------
function fn_affair_dtl(c_row)
{
/*
	DS_AFFAIR_DTL.FireEvent = false;		
	DS_AFFNOTE_LST.FireEvent = false;	
	DS_TIEUPNOTE_LST.FireEvent = false;
	DS_BONDPAY_LST.FireEvent = false;

	
//	trace('fn_affair_dtl mst/dtl/note='+curMstRow+'/'+curDtlRow+'/'+curNoteRow);
	
	DS_AFFAIR_MST.row = c_row;
	
	var AFF_SEQ = DS_AFFAIR_MST.GetColumn(c_row,"AFF_SEQ");
	var TUB_SEQ = DS_AFFAIR_MST.GetColumn(c_row,"TUB_SEQ");

	// 해당 사건번호로 필터 
	DS_AFFAIR_DTL.UnFilter();
	DS_AFFAIR_DTL.Filter("AFF_SEQ ='"+AFF_SEQ+"' && flag != 'D'");	

	DS_AFFAIR_DTL.row = curDtlRow;	

	// 진행특이사항 필터링
	// 해당 사건번호로 필터 
	DS_AFFNOTE_LST.UnFilter();
	DS_AFFNOTE_LST.Filter("AFF_SEQ ='"+AFF_SEQ+"' && flag != 'D'");	

	DS_AFFNOTE_LST.row = curNoteRow;
		
	// 제휴사 사건 특이사항 	
	// 해당 사건번호로 필터 
	DS_TIEUPNOTE_LST.UnFilter();
	DS_TIEUPNOTE_LST.Filter("AFF_SEQ ='"+AFF_SEQ+"'");	

	DS_TIEUPNOTE_LST.row = curTubNoteRow;

	// 입금내역 필터
	DS_BONDPAY_LST.UnFilter();
	DS_BONDPAY_LST.Filter("TUB_SEQ ='"+TUB_SEQ+"'");	


	DS_AFFAIR_DTL.FireEvent = true;
	DS_AFFNOTE_LST.FireEvent = true;	
	DS_TIEUPNOTE_LST.FireEvent = true;
	DS_BONDPAY_LST.FireEvent = true;
	
	
	// 사건내외근 진행 필터
	fn_affair_prs(AFF_SEQ);
*/

}



//*------------------------------------------------------------------------
//* 함수설명     : 1.2 출력 체크 함수 
//* 함수유형     :
//* parameter    :
//* return value : 없음
//* 비고      
//*------------------------------------------------------------------------
function fn_chk_print(c_row)
{
	
	var bValidate = true;
	var cMessage = "";
	
	// 기본정보가 선택되지 않으면 경고 
	if(length(DS_AFFAIR_MST.GetColumn(DS_AFFAIR_MST.curRow,"CHG_SEQ")) == 0)
	{
		gfn_popup_message("modal", "error", "사건담당을 선택하세요. ", "확인");
		return false;
	}	
	
	if(length(DS_AFFAIR_MST.GetColumn(0, "CLT_NM")) == 0)
	{
		bValidate = false;
		cMessage += "고객명 누락 ";
	}

	/*
	if(length(DS_AFFAIR_MST.GetColumn(0, "CLT_TEL")) == 0)
	{
		bValidate = false;
		cMessage += "전화번호 누락 ";
	}
	*/
	
	if(length(Replace(DS_AFFAIR_MST.GetColumn(0, "CLT_JMN"),'-','')) == 0)
	{
		bValidate = false;
		cMessage += "주민번호 누락 ";
	}

	/*
	if(length(DS_AFFAIR_MST.GetColumn(0, "CLT_ADDR")) == 0)
	{
		bValidate = false;
		cMessage += "주소 누락 ";
	}
	*/
				
			
	
	if(bValidate == false)
	{
		gfn_popup_message("modal", "error", cMessage, "확인");
		return false;
	}
}


//*------------------------------------------------------------------------
//* 함수설명     : 1.2 출력 체크 함수 
//* 함수유형     :
//* parameter    :
//* return value : 없음
//* 비고      
//*------------------------------------------------------------------------
function fn_bef_print(c_row)
{
	var mrd = "";
	var param = "";
	
	if(fn_chk_print(c_row) == false)
	{
		return;
	}
	else
	{
		prtRow = c_row;
	
		// 먼저 사업자 출력 요구이면 사업자번호를 먼저 출력한다.
		if(DS_AFFAIR_DTL.GetColumn(c_row, "BIZ_REQ_YN") == 'Y')
		{
			prtGbn = "BIZ";
			
			// 사업자 출력 먼저
			fn_print(c_row);
			
		}
		// 장표2가 있으면 계속 진행 으로 한다. 
		else if(length(DS_AFFAIR_DTL.GetColumn(c_row, "FORM_SAVE_FILE2")) > 0)
		{
			prtGbn = "CONTINUE";
			
			// 두번째 출력이 있다고 flag
			fn_print(c_row);
			
		}
		else
		{
			prtGbn = "END1";
			
			// 마지막 출력 
			fn_print(c_row);		
		}	
	}	
}


//*------------------------------------------------------------------------
//* 함수설명     : 1.3출력  함수 
//* 함수유형     :
//* parameter    :
//* return value : 없음
//* 비고      
// 수정사항: 2014-02-25 파산추가 
//*------------------------------------------------------------------------
function fn_print(c_row)
{
	
	var mrd = "";
	var param = "";
	
	// 사업자 출력
	if(prtGbn == "BIZ")
	{
		mrd = DS_AFFAIR_MST.GetColumn(0, "BIZ_FILE_SAVE_NM");
		param = "";	
		
//		trace(prtGbn +"/"+ mrd + "/" + param);
		
		// 사업자 등록증 없으면 바로 양식 출력 
		if(mrd == '')
		{
			gfn_popup_message("modal", "error", "제휴사 사업자 등록증 파일이 없어 바로 채권사 양식 출력합니다.", "확인");
			
			// 장표2가 있으면 계속 진행 으로 한다. 
			if(length(DS_BND_PRINT_INFO.GetColumn(0, "FORM_SAVE_FILE2")) > 0)
			{
				prtGbn = "CONTINUE";
			}
			else
			{
				prtGbn = "END1";
			}			
			
			
			fn_print(c_row);				
		}
		else
		{

//			trace(prtGbn +"/"+ mrd + "/" + param);
			
			gfn_viewReport(Report0, mrd, param, true);			
		}
	}
	else
	{
		// 파산 채권사이면 팝업창
		IF(DS_BND_PRINT_INFO.GetColumn(0, "REG_GBN") == 'Z')
		{
			
			alert('파산 채권사!');
			
			return;
		}
		// 공통양식 개별양식 체크 
		else if(prtGbn == "CONTINUE")
		{
			mrd = DS_BND_PRINT_INFO.GetColumn(0, "FORM_SAVE_FILE1");
			prtGbn = "END2";
		}
		else if(prtGbn == "CONTINUE")
		{
			mrd = DS_BND_PRINT_INFO.GetColumn(0, "FORM_SAVE_FILE1");
			prtGbn = "END2";
		}
		else if(prtGbn == "END1")
		{
			mrd = DS_BND_PRINT_INFO.GetColumn(0, "FORM_SAVE_FILE1");
			prtGbn = "";
		}
		else if(prtGbn == "END2")
		{
			mrd = DS_BND_PRINT_INFO.GetColumn(0, "FORM_SAVE_FILE2");
			prtGbn = "";
		}
		else
		{
			trace('prtGbn 오류='+prtGbn);
		}
				
		// 추가정보에 따라서 고객명과 주민번호를 달리한다.
		var tmp_clt_nm = "";
		var tmp_clt_jmn = "";
		var enc_clt_jmn = "";	// 개인정보 보호용 주민번호 만약 주민번호 공개 아니면 ******* 로 한다.
		var enc_bef_clt_jmn = "";
		var tmp_clt_tel = "";	// 제휴사 공개
				

		if(DS_BND_PRINT_INFO.GetColumn(0, "JMN_OPN_YN") == 'Y')
		{
			enc_bef_clt_jmn = substr(DS_AFFAIR_MST.GetColumn(0, "BEF_CLT_JMN"),6);
			enc_clt_jmn = substr(DS_AFFAIR_MST.GetColumn(0, "CLT_JMN"),6);
		}
		else
		{
			enc_bef_clt_jmn = "*******";
			enc_clt_jmn = "*******";
		}
			
		
		
		// 상속채무 변경
		if(DS_AFFAIR_MST.GetColumn(0, "ADD_INF_GBN") == "A")
		{
			tmp_clt_nm = "상속：(망)"+ DS_AFFAIR_MST.GetColumn(0, "BEF_CLT_NM") + " (상속인)" + DS_AFFAIR_MST.GetColumn(0, "CLT_NM");
			tmp_clt_jmn = "상속：(망)"+ substr(DS_AFFAIR_MST.GetColumn(0, "BEF_CLT_JMN"),0,6) 
						+ "-" + enc_bef_clt_jmn 
						+ " (상속인):"+substr(DS_AFFAIR_MST.GetColumn(0, "CLT_JMN"),0,6) 
						+ "-" + enc_clt_jmn;
		}		
		// 이름 변경
		else if(DS_AFFAIR_MST.GetColumn(0, "ADD_INF_GBN") == "B")
		{
			tmp_clt_nm = DS_AFFAIR_MST.GetColumn(0, "CLT_NM") + "(변경전:" + DS_AFFAIR_MST.GetColumn(0, "BEF_CLT_NM") + ")";
			tmp_clt_jmn = substr(DS_AFFAIR_MST.GetColumn(0, "CLT_JMN"),0,6) + "-" + enc_clt_jmn;
		}
		// 주민번호 변경
		else if(DS_AFFAIR_MST.GetColumn(0, "ADD_INF_GBN") == "C")
		{
			tmp_clt_nm = DS_AFFAIR_MST.GetColumn(0, "CLT_NM");
			tmp_clt_jmn = substr(DS_AFFAIR_MST.GetColumn(0, "CLT_JMN"),0,6) 
						+ "-" +  enc_clt_jmn
						+ "(변경전:"+substr(DS_AFFAIR_MST.GetColumn(0, "BEF_CLT_JMN"),0,6) 
						+ "-" + enc_bef_clt_jmn;
		}
		// 이름+주민번호 변경
		else if(DS_AFFAIR_MST.GetColumn(0, "ADD_INF_GBN") == "D")
		{
			tmp_clt_nm = DS_AFFAIR_MST.GetColumn(0, "CLT_NM") + "(변경전:" + DS_AFFAIR_MST.GetColumn(0, "BEF_CLT_NM") + ")";
			tmp_clt_jmn = substr(DS_AFFAIR_MST.GetColumn(0, "CLT_JMN"),0,6) 
						+ "-" + enc_clt_jmn
						+ "(변경전:"+substr(DS_AFFAIR_MST.GetColumn(0, "BEF_CLT_JMN"),0,6) 
						+ "-" + enc_bef_clt_jmn;
		}		
		else
		{
			tmp_clt_nm = DS_AFFAIR_MST.GetColumn(0, "CLT_NM");
			tmp_clt_jmn = substr(DS_AFFAIR_MST.GetColumn(0, "CLT_JMN"),0,6) + "-" + enc_clt_jmn;
		}
				
		// 채권사 정보에서 전화공개면 제휴사와 상관없이 공개해야됨(건강보험, 생명사들)
		// 제휴사 전화 공개에 따라서 전화번호 교체
		if(DS_BND_PRINT_INFO.GetColumn(0, "CLT_OPN_YN") != 'Y' && DS_AFFAIR_MST.GetColumn(0, "CLT_OPN_YN") == 'N' && length(DS_AFFAIR_MST.GetColumn(0, "CLT_OPN_HP")) > 0)
		{
			tmp_clt_tel = DS_AFFAIR_MST.GetColumn(0, "CLT_OPN_HP");
		}
		else
		{
			tmp_clt_tel = DS_AFFAIR_MST.GetColumn(0, "CLT_TEL");
		}		
		
		// 출력날짜 조정
		// 시작일 : (날짜를 시작일 -1이 되야한다. 왜냐면 출력물에 이미 +1 해서 시작일 +1 하면 +2 가된다.)	
		// 당일은 PC날짜를 사용해야 한다.(PC 날짜 조정으로 출력함)
		var print_date = "";
		
		// 당일
		if(DS_BND_PRINT_INFO.GetColumn(0, "DT_GBN") == "D")
		{
			print_date = gfnGetToday('');
		}
		else
		{
			print_date = addDate(DS_AFFAIR_MST.GetColumn(0, "AFF_ST_DT"),-1);
		}	
		
		var barCode = "";	
			
		// 바코드 	
		if(curBarCell == 12)
		{
			barCode = DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BAR");
		}
		else if(curBarCell == 15)
		{
			barCode = DS_AFFAIR_DTL.GetColumn(c_row, "BAR_1");
		}
		else if(curBarCell == 18)
		{
			barCode = DS_AFFAIR_DTL.GetColumn(c_row, "BAR_2");
		}		
		
		param = "/rv 부채["
			+gfn_StrYn(CHK_DEB_YN.Value)+"] 내용["
			+gfn_StrYn(0)+"] 통장["
			+gfn_StrYn(CHK_BNK_YN.Value)+"] 카드["
			+gfn_StrYn(CHK_CARD_YN.Value)+"] 신용["
			+gfn_StrYn(0)+"] /rp ["
			+DS_AFFAIR_MST.GetColumn(0, "BRCH_ID")+"] ["        // 회사코드 1
			+tmp_clt_nm+"] ["   // 고객명2
			+tmp_clt_jmn+"] ["  // 고객주민3
			+DS_AFFAIR_MST.GetColumn(0, "CLT_ADDR")+"] [" // 고객주소4
			+tmp_clt_tel+"] ["  // 고객전화5
			+DS_AFFAIR_MST.GetColumn(0, "AFF_GBN")+"] ["         // 사용용도6
			+DS_BND_PRINT_INFO.GetColumn(0, "DT_GBN")+"] ["         // 날짜구분7
			+EDT_BNK_NOTE.Text+"] ["         // 통장거래기간8
			+EDT_CARD_NOTE.Text+"] ["         // 카드거래기간9
			+DS_BND_PRINT_INFO.GetColumn(0, "BND_SEQ")+"] ["         // 채권사코드(이미 데이터셋에 담김)10
			+"-999] ["         // 채권사지점(현재는 없다)11
			+DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ")+"] ["         // 제휴사코드12
			+DS_AFFAIR_MST.GetColumn(0, "CHG_SEQ")+"] ["         // 제휴사담당13
			+print_date+"] ["       // 날짜14		
			+GlobalURL+"] ["			// 이미지 URL
			+DS_AFFAIR_MST.GetColumn(0, "SMT_PLC")+"] ["	     // 제출처		
			+DS_AFFAIR_MST.GetColumn(0, "PRS_CHG_USR")+"] ["	     // 진행담당   17
			+gfn_StrYn(CHK_DEB_YN.Value) + "] ["	// 부채 체크 유무 18
			+ barCode + "]"							// 바코드 19	
				;         		
				
	
		trace('ppp='+prtGbn +"/"+ mrd + "/" + param);

		// 양식 파일이 없음이 아닌데 양식 없으면 경고 띄움
		if(DS_BND_PRINT_INFO.GetColumn(0, "FORM_GBN") == 'N')
		{
			// 양식없음
		}
		else if(mrd == '')
		{
			gfn_popup_message("modal", "error", "출력할 양식파일이 등록되지 않았습니다. 양식파일 등록 후 사건진행에서 개별 출력 하세요.", "확인");
		}
		else
		{
			gfn_viewReport(Report0, mrd, param, true);			
		}		

	}
}




//*------------------------------------------------------------------------------------------------
//* 함수설명     : 사건담당 팝업
//* 함수유형     : 
//* parameter    : 
//* return value : 없음
//* 비고         : 이름은 안넣고 무조건 선택하게만 
//*-----------------------------------------------------------------------------------------------
function fn_chg_popup()
{
	
	// 기본정보가 선택되지 않으면 경고 
	if(length(DS_AFFAIR_MST.GetColumn(DS_AFFAIR_MST.curRow,"AFF_SEQ")) == 0)
	{
		gfn_popup_message("modal", "error", "신규추가 또는 좌측목록의 사건을 선택 해야 합니다. ", "확인");
		return;
	}
		
	var params = "P_BRCH_ID=" + quote(GDS_USER_INFO.BRCH_ID)
			     + " P_CHG_NM=";
			   //+ " P_CHG_NM=" + quote(EDT_CHG_NM.Text);
			   	
			   	
	var retArr = gfn_openPopup(this, "CP::CPAB03P01.xml", params, true);

	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"BRCH_ID", retArr[0]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"TUB_SEQ", retArr[1]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"TUB_NM", retArr[2]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"CHG_SEQ", retArr[3]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"CHG_NM", retArr[4]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"TUB_TEL", retArr[5]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"TUB_FAX", retArr[6]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"HNA_CHG_USR", retArr[7]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"HNA_CHG_USR_NM", retArr[8]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"PRS_CHG_USR", retArr[8]);	// 사건진행자는 하나담당으로 
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"DOC_CARY", retArr[9]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"BIZ_FILE_SAVE_NM", retArr[10]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"AFF_REG_NOTE", retArr[11]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"CLT_OPN_YN", retArr[12]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"CLT_OPN_HP", retArr[13]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"SIN_GBN", retArr[14]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"SIN_NM", retArr[15]);


}


//*------------------------------------------------------------------------------------------------
//* 함수설명     : 하나담당 팝업
//* 함수유형     : 
//* parameter    : 
//* return value : 없음
//* 비고         :
//*-----------------------------------------------------------------------------------------------
function fn_hna_popup()
{
	
	// 기본정보가 선택되지 않으면 경고 
	if(length(DS_AFFAIR_MST.GetColumn(DS_AFFAIR_MST.curRow,"AFF_SEQ")) == 0)
	{
		gfn_popup_message("modal", "error", "신규추가 또는 좌측목록의 사건을 선택 해야 합니다. ", "확인");
		return;
	}
		
	var params = "P_BRCH_ID=" + quote(GDS_USER_INFO.BRCH_ID)
			   + " P_USR_NM=" + quote(EDT_HNA_CHG_USR_NM.Text);
			   	
			   	
	var retArr = gfn_openPopup(this, "CP::CPAB04P01.xml", params, true);

	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"HNA_CHG_USR", retArr[0]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"HNA_CHG_USR_NM", retArr[1]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"PRS_CHG_USR", retArr[1]);	// 사건진행자명은 하나담당으로

}





//*------------------------------------------------------------------------------------------------
//* 함수설명     : 팝업
//* 함수유형     : 
//* parameter    : 
//* return value : 없음
//*-----------------------------------------------------------------------------------------------
function fn_pop_cell_info(nRow, cur_bnd_seq_col, p_type)
{
	var tmp_seq_code = "";
	var tmp_nm_code = "";
	var tmp_sts_code = "";
	var tmp_bar_code = "";
	var tmp_acp_mtd = "";
	var tmp_seq_val = "";
	var tmp_nm_val = "";
	var tmp_sts_val = "";

	// 의뢰 채권사
	if(cur_bnd_seq_col == "REQ_BND_SEQ")
	{	
		tmp_seq_code = "REQ_BND_SEQ";
		tmp_nm_code = "REQ_BND_NM";
		tmp_sts_code = "REQ_BND_STS";
		tmp_bar_code = "REQ_BAR";
		tmp_acp_mtd = "";
	}
	// 진행1
	else if(cur_bnd_seq_col == "BND_SEQ_1")
	{	
		tmp_seq_code = "BND_SEQ_1";
		tmp_nm_code = "BND_NM_1";
		tmp_sts_code = "PRS_STS_1";
		tmp_bar_code = "BAR_1";
		//tmp_acp_mtd = "ACP_MTD_1";
	}
	// 진행2
	else if(cur_bnd_seq_col == "BND_SEQ_2")
	{	
		tmp_seq_code = "BND_SEQ_2";
		tmp_nm_code = "BND_NM_2";
		tmp_sts_code = "PRS_STS_2";
		tmp_bar_code = "BAR_2";
		//tmp_acp_mtd = "ACP_MTD_2";
	}
	
	// 채권사명 팝업
	if(p_type == "bnd_seq")
	{
	
		// 파라미터 먼저 받고 데이터셋 지우기
		tmp_seq_val = DS_AFFAIR_DTL.GetColumn(nRow,tmp_seq_code);
		tmp_nm_val = DS_AFFAIR_DTL.GetColumn(nRow,tmp_nm_code);

		//  기존값은 클리어
		DS_AFFAIR_DTL.SetColumn(nRow,tmp_seq_code, "");
		DS_AFFAIR_DTL.SetColumn(nRow,tmp_nm_code, "");
		
		var params = "P_BRCH_ID="+quote(GDS_USER_INFO.BRCH_ID) 
					+ " P_BND_NM=" + quote(tmp_nm_val)
					;
						
		var retArr = gfn_openPopup(this, "CP::CPAB05P01.xml", params, true);
		
		// 값이 없으면 해당 채권사의 진행 상태도 없앰
		if(retArr == 0)
		{
			DS_AFFAIR_DTL.SetColumn(nRow,tmp_seq_code, '');
			DS_AFFAIR_DTL.SetColumn(nRow,tmp_nm_code, '');
			DS_AFFAIR_DTL.SetColumn(nRow,tmp_sts_code, '');
			DS_AFFAIR_DTL.SetColumn(nRow,tmp_bar_code, '');
			//DS_AFFAIR_DTL.SetColumn(nRow,tmp_acp_mtd, '');
		}
		else
		{
			DS_AFFAIR_DTL.SetColumn(nRow,tmp_seq_code, retArr[1]);
			DS_AFFAIR_DTL.SetColumn(nRow,tmp_nm_code, retArr[2]);
			
			// 여기는 바코드를 계속 바꾸도록 한다.
			// 왜냐면 의뢰채권사 등록되면 진행1이 의뢰 채권사랑 동일 바코드로 지정되나 진행1을 바꾸면 바코드도 바뀌어야 한다.
			DS_AFFAIR_DTL.SetColumn(nRow,tmp_bar_code, retArr[12]);
					
			
			//DS_AFFAIR_DTL.SetColumn(nRow,tmp_acp_mtd, retArr[5]);
		}
	}
	// 채권사 진행상태 팝업
	else if(p_type == "prs_sts")	
	{
		//  기존값은 클리어
		// 선택할때 클리어 하기 
		//DS_AFFAIR_DTL.SetColumn(nRow,tmp_sts_code, "");
		
		var params = "P_STS_CODE_NM="+DS_AFFAIR_DTL.GetColumn(nRow,tmp_sts_code+"_NM");
		
//trace('params='+params);				
						
		var retArr = gfn_openPopup(this, "CP::CPAB05P03.xml", params, true);
		
		// 정상 데이터 받으면 셋팅 아니면 지우기
		if(retArr.length == 2)
		{
			DS_AFFAIR_DTL.SetColumn(nRow,tmp_sts_code, retArr[0]);
			DS_AFFAIR_DTL.SetColumn(nRow,tmp_sts_code+"_NM", retArr[1]);
		}
		else
		{
			DS_AFFAIR_DTL.SetColumn(nRow,tmp_sts_code, '');
			DS_AFFAIR_DTL.SetColumn(nRow,tmp_sts_code+"_NM", '');
		}
	}
	
		
		
}

//*------------------------------------------------------------------------------------------------
//* 함수설명     : 일부매각팝업
//* 함수유형     : 
//* parameter    : 
//* return value : 안띄움
//*-----------------------------------------------------------------------------------------------
function fn_pop_part_bnd_info(nRow, cur_bnd_seq_col)
{
	var tmp_seq_code = "";
	var tmp_nm_code = "";
	var tmp_seq_val = "";
	var tmp_nm_val = "";
	var tmp_next_seq_code = "";
	var tmp_next_nm_code = "";

	var tRow;
	var dtl_seq;

	DS_AFFAIR_DTL.FireEvent = false;	


	// 의뢰 채권사
	if(cur_bnd_seq_col == "REQ_BND_SEQ")
	{	
		tmp_seq_code = "REQ_BND_SEQ";
		tmp_nm_code = "REQ_BND_NM";
		tmp_next_seq_code = "BND_SEQ_1";
		tmp_next_nm_code = "BND_NM_1";
		
		DS_AFFAIR_DTL.SetColumn(nRow,"REQ_BND_STS", "120");
		DS_AFFAIR_DTL.SetColumn(nRow,"REQ_BND_STS_NM", "일부매각");
	}
	// 진행1
	else if(cur_bnd_seq_col == "BND_SEQ_1")
	{	
		tmp_seq_code = "BND_SEQ_1";
		tmp_nm_code = "BND_NM_1";
		tmp_next_seq_code = "BND_SEQ_2";
		tmp_next_nm_code = "BND_NM_2";
		
		DS_AFFAIR_DTL.SetColumn(nRow,"PRS_STS_1", "120");
		DS_AFFAIR_DTL.SetColumn(nRow,"PRS_STS_1_NM", "일부매각");		
	}
	// 진행2
	else if(cur_bnd_seq_col == "BND_SEQ_2")
	{	
		tmp_seq_code = "BND_SEQ_2";
		tmp_nm_code = "BND_NM_2";
		tmp_next_seq_code = "";
		tmp_next_nm_code = "";

		DS_AFFAIR_DTL.SetColumn(nRow,"PRS_STS_2", "120");
		DS_AFFAIR_DTL.SetColumn(nRow,"PRS_STS_2_NM", "일부매각");		
	}

	else
	{	
		tmp_seq_code = "";
		tmp_nm_code = "";
	}
	
	if(tmp_seq_code != "" && tmp_nm_code != "")
	{
		var params = "P_BRCH_ID="+quote(GDS_USER_INFO.BRCH_ID) 
					+ " P_BND_NM="
					;
						
		gfn_openPopup(this, "CP::CPAB05P02.xml", params, true);


		// 먼저 일부매각 대상 행의 정보를 임시 데이터 셋에 담는다.
		cur_affair_dtl.ClearData();
		cur_affair_dtl.CopyF("DS_AFFAIR_DTL");
		cur_affair_dtl.Filter("DTL_SEQ = '"+DS_AFFAIR_DTL.GetColumn(nRow,"DTL_SEQ")+"'");
		
		
		// 일부매각은 GDS_SEL_BOND_LST 글로벌 데이터셋에 담긴다.
		// 첫번째 행만 다음 행에 넣고 둘째 행 부터는 행추가 한다.
		for(var i=0;i<GDS_SEL_BOND_LST.rowcount;i++)
		{
			if(i == 0)
			{
				DS_AFFAIR_DTL.SetColumn(nRow,tmp_next_seq_code, GDS_SEL_BOND_LST.GetColumn(i, "BND_SEQ"));
				DS_AFFAIR_DTL.SetColumn(nRow,tmp_next_nm_code, GDS_SEL_BOND_LST.GetColumn(i, "BND_NM"));			
			}
			else
			{
				tRow = DS_AFFAIR_DTL.InsertRow(nRow+i);
				
				// 우선 기존꺼 다 넣고 새거로 채우자
				for(var col=0;col<cur_affair_dtl.colcount;col++)
				{
					DS_AFFAIR_DTL.CopyColumn(tRow,col,cur_affair_dtl,0,col);
				}
				

				// 변경값들 셋팅
				DS_AFFAIR_DTL.SetColumn(tRow,"FLAG","I");	// 추가 FLAG 넣기
				DS_AFFAIR_DTL.SetColumn(tRow,"ROW_ID","");	// ROW_ID(조회후 셋팅됨)
				DS_AFFAIR_DTL.SetColumn(tRow,"OPERATOR", GDS_USER_INFO.GetColumn(0, "USR_ID"));// 등록자, 수정자 넣기
				DS_AFFAIR_DTL.SetColumn(tRow,"CHK","1");	// 선택
				
				DS_AFFAIR_DTL.SetColumn(tRow,"BRCH_ID", DS_AFFAIR_DTL.GetColumn(nRow, "BRCH_ID"));// 
				DS_AFFAIR_DTL.SetColumn(tRow,"AFF_SEQ", DS_AFFAIR_DTL.GetColumn(nRow, "AFF_SEQ"));// 
				
				DS_AFFAIR_DTL.SetColumn(tRow,"DTL_SEQ", '');//  저장시 자동 부여
				DS_AFFAIR_DTL.SetColumn(tRow,"GRP_CD", DS_AFFAIR_DTL.GetColumn(nRow, "GRP_CD"));// 그룹코드는 이전 행의 동일 그룹코드 
				DS_AFFAIR_DTL.SetColumn(tRow,"GRP_SEQ", '');// 	   그룹내순번(재정렬)
				DS_AFFAIR_DTL.SetColumn(tRow,"REQ_SEQ", '');// 의뢰순번은 없음 
				DS_AFFAIR_DTL.SetColumn(tRow,"SORT_NO", '');// 출력순서(재정렬) 
				DS_AFFAIR_DTL.SetColumn(tRow,"PRT_EDT_YN", 'Y');// 기본출력
				DS_AFFAIR_DTL.SetColumn(tRow,"PRT_YN", '1');// 기본출력				
				
				DS_AFFAIR_DTL.SetColumn(tRow,"CLOSE_YN", 'N');// 미마감 
				DS_AFFAIR_DTL.SetColumn(tRow,tmp_next_seq_code, GDS_SEL_BOND_LST.GetColumn(i, "BND_SEQ"));
				DS_AFFAIR_DTL.SetColumn(tRow,tmp_next_nm_code, GDS_SEL_BOND_LST.GetColumn(i, "BND_NM"));			
			
			}
			
		}
		
		// 중간에 일부매각이 있을 수 있으므로 같은 그룹코드의 순번을 재 정렬 한다.
		fn_set_grp_sort(DS_AFFAIR_DTL.GetColumn(nRow, "AFF_SEQ"), DS_AFFAIR_DTL.GetColumn(nRow, "GRP_CD"));
		
		// 순번 다시 매기기 
		fn_set_dtl_sort(DS_AFFAIR_MST.GetColumn(0, "AFF_SEQ"));
		
		DS_AFFAIR_DTL.FireEvent = true;	

	}	
}



//*------------------------------------------------------------------------------------------------
//* 함수설명     : 서류발급내역서 출력
//* 함수유형     : 
//* parameter    : 
//* return value : 없음
//* 비고         :
//*-----------------------------------------------------------------------------------------------
function fn_print_doc()
{
	
	var mrd = "";
	var param = "";
	
	
	// 기본정보가 선택되지 않으면 경고 
	if(length(DS_AFFAIR_MST.GetColumn(DS_AFFAIR_MST.curRow,"AFF_SEQ")) == 0)
	{
		gfn_popup_message("modal", "error", "서류 발급내역서를 출력할 사건기본정보를 선택하세요. ", "확인");
		return;
	}		

	
	// 건별과 기간의 서류발급내역서 틀림
	if(DS_AFFAIR_MST.GetColumn(0,"SIN_GBN") == 'CO')
	{
		mrd = "PG_AC_DOC_LST_CO.mrd";
	}
	else
	{
		mrd = "PG_AC_DOC_LST_DA.mrd";
	}
	
	param = "/rp ["+DS_AFFAIR_MST.GetColumn(0,"BRCH_ID")+"] ["+DS_AFFAIR_MST.GetColumn(0,"AFF_SEQ")+"]";


	TRACE('MRD='+mrd+'/PARAM = ' + param );

	
	gfn_viewReport(Report0, mrd, param, true);


	// 출력했다고 플래그 달기
	prtDoc = "N";


}

//*------------------------------------------------------------------------------------------------
//* 함수설명     : 채권사 출력정보 가져오기 
//* 함수유형     : 
//* parameter    : 
//* return value : 없음
//* 비고         :
//*-----------------------------------------------------------------------------------------------
function fn_get_bnd_print_info(bnd_seq)
{
	
	svcID			= "ACAA01T01.selectBndPrintInfo";
	url   			= "service::common/select_mi.do";
	inDatasets  	= "";
	outDatasets 	= "DS_BND_PRINT_INFO=cc.CCBondDAO.selectBndPrintInfo";	
	
	argument    	= " _sqlName=cc.CCBondDAO.selectBndPrintInfo"
					+ " BRCH_ID=" + quote(GDS_USER_INFO.BRCH_ID)			
					+ " BND_SEQ=" + quote(bnd_seq)
					;	
						
	callbackFunc 	= "gfn_callback";

	gfn_SyncTransaction(svcID, url, inDatasets, outDatasets, argument, callbackFunc);	
	    
}



// 중복 체크
// 2014.02.20 중복체크에서 값이 없이 체크하면 해당 채권사의 상태중 발급/중복으로 된것은 다 초기화/금액도 초기화 
function fn_check_duple(c_row, c_col)
{
	var isDup;	// 중복여부 
	var bnd_seq = DS_AFFAIR_DTL.GetColumn(c_row, c_col);
	var tmp_prs_sts = DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS");
	
	
	trace('///////////////// 중복체크 시작 =>'+bnd_seq + '/' + tmp_prs_sts)	;	


	if(length(bnd_seq) > 0)
	{
		isDup = false;
		
		for(var i=0;i<DS_AFFAIR_DTL.rowcount;i++)
		{
			
			trace('dup row/bnd_seq='+i+'/'+bnd_seq);
			trace('BND_SEQ_1/BND_SEQ_2=>'+ DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_1") +'/'+ DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_2"));
			trace('PRS_STS_1/PRS_STS_2=>'+ DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_1") +'/'+ DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_2"));


			
			// 발급, 발급진행, 발급예정, 중복, 공백상태이며 다음 진행이 없을때만 셋팅함 
			// 의뢰채권사
			// 의뢰채권사명이 중복체크 채권사명과 동일하고 채권사1이 없으면 의뢰채권사 => 채권사1 지정 및 발급처리 
			if(DS_AFFAIR_DTL.GetColumn(i, "REQ_BND_SEQ") == bnd_seq && length(DS_AFFAIR_DTL.GetColumn(i, "BND_NM_1")) == 0)
			{
				trace('REQ_BND_SEQ 동일 =>' +i+ '/' + bnd_seq);
				
				DS_AFFAIR_DTL.SetColumn(i, "BND_SEQ_1", DS_AFFAIR_DTL.GetColumn(i, "REQ_BND_SEQ"));
				DS_AFFAIR_DTL.SetColumn(i, "BND_NM_1", DS_AFFAIR_DTL.GetColumn(i, "REQ_BND_NM"));
				DS_AFFAIR_DTL.SetColumn(i, "BAR_1", DS_AFFAIR_DTL.GetColumn(i, "REQ_BAR"));
				
				//DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1", DS_AFFAIR_DTL.GetColumn(i, "REQ_BND_STS"));
				//DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1_NM", DS_AFFAIR_DTL.GetColumn(i, "REQ_BND_STS_NM"));			
			
			}
			
			
			// 내용증명, 발급불가, 의뢰취소, 완납, 매각 포함
			// 진행1
			if((length(DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_1")) == 0 || 
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_1") == "" || 
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_1") == "100" ||
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_1") == "200" ||
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_1") == "210" ||
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_1") == "220" ||
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_1") == "380" ||
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_1") == "999" || 
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_1") == "290" || 
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_1") == "300" || 
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_1") == "310" || 
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_1") == "340" || 
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_1") == "110" 
				
				) && getIsNextBnd(i, "BND_SEQ_2") == false 
			 )
			 {
			 
				trace('진행1 체크 시작>>' + DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_1"));
			 
				// 채권사 동일
				
				trace('check='+ DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_1") +'=='+ bnd_seq);
				
				if(DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_1") == bnd_seq )
				 {
					trace('BND_SEQ_1 동일 =>' +i+ '/' + bnd_seq);
					
					// 상태 셋팅값이 있을때만 설정하고 없으면 취소이기 때문에 발급/중복 제거함 
					if(tmp_prs_sts != '' && tmp_prs_sts != '100')
					{
						
						// 처음일때 
						if(isDup == false)
						{
							DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1", "210");
							DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1_NM", "발급");
							
							// 발급사의 수수료, 은행수수료 자동 넣기
							// 등기완료, 원격완료, 등기+반송완료는 
							fn_chrg_amt(i, DS_AFFAIR_DTL.GetColumn(i, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_1"),DS_AFFAIR_DTL.GetColumn(i, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(i, "DTL_SEQ"));
							
							
							// 채권사가 신용조회면 은행수수료에  신용조회 수수료 넣기 
							// 은행수수료는 0
							if(DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_1") == '6235')
							{
								DS_AFFAIR_DTL.SetColumn(i, "ISU_DEB", 0);	// 부채			
								DS_AFFAIR_DTL.SetColumn(i, "ISU_COC", 0);	// 내용
								DS_AFFAIR_DTL.SetColumn(i, "ISU_BNK", 0);	// 은행
								DS_AFFAIR_DTL.SetColumn(i, "ISU_CARD", 0);	// 카드	
								DS_AFFAIR_DTL.SetColumn(i, "ISU_CRDT", 1);	// 신용					
								
								DS_AFFAIR_DTL.SetColumn(i, "BNK_CHRG", ToNumber(GDS_BRCH_BAS.GetColumn(0,"CRDT_AMT")));
								DS_AFFAIR_DTL.SetColumn(i, "AGC_CHRG", ToNumber(GDS_BRCH_BAS.GetColumn(0,"CRDT_AMT2")));
							}							
							
							
							
							
							
							isDup = true;
						}
						else
						{
							DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1", "220");
							DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1_NM", "발급");
							DS_AFFAIR_DTL.SetColumn(i, "PRS_NOTE_1", "(다른건과중복(청구X))");
							DS_AFFAIR_DTL.SetColumn(i, "ISU_DEB", 0);	// 부채			
							DS_AFFAIR_DTL.SetColumn(i, "ISU_COC", 0);	// 내용
							DS_AFFAIR_DTL.SetColumn(i, "ISU_BNK", 0);	// 은행
							DS_AFFAIR_DTL.SetColumn(i, "ISU_CARD", 0);	// 카드		
							DS_AFFAIR_DTL.SetColumn(i, "BNK_CHRG", "0");
							DS_AFFAIR_DTL.SetColumn(i, "AGC_CHRG", "0");	
						} 
					}
					else
					{
						DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1", "");
						DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1_NM", "");
						DS_AFFAIR_DTL.SetColumn(i, "PRS_NOTE_1", "");
						DS_AFFAIR_DTL.SetColumn(i, "ISU_DEB", 0);	// 부채			
						DS_AFFAIR_DTL.SetColumn(i, "ISU_COC", 0);	// 내용
						DS_AFFAIR_DTL.SetColumn(i, "ISU_BNK", 0);	// 은행
						DS_AFFAIR_DTL.SetColumn(i, "ISU_CARD", 0);	// 카드		
						DS_AFFAIR_DTL.SetColumn(i, "BNK_CHRG", "");
						DS_AFFAIR_DTL.SetColumn(i, "AGC_CHRG", "");				
					}
					
				}
			 }				
			
			
			// 발급, 발급진행, 발급예정, 공백상태이며 다음 진행이 없을때만 셋팅함 
			// 진행2
			// 진행2는 다음진행 체크 안함
			if((length(DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_2")) == 0 || 
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_2") == "" || 
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_2") == "100" ||
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_2") == "200" ||
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_2") == "210" ||
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_2") == "220" ||
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_2") == "380" ||
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_2") == "999" ||
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_2") == "290" || 
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_2") == "300" || 
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_2") == "310" || 
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_2") == "340" || 
				DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_2") == "110" 
				
				) 
			 )
			 {
			 
				trace('진행2 체크 시작>>' + DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_2"));
			 
			 
				// 채권사 동일
				if(DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_2") == bnd_seq )
				 {
					
					trace('BND_SEQ_2 동일 =>' +i+ '/' + bnd_seq);
					
	
					// 상태 셋팅값이 있을때만 설정하고 없으면 취소이기 때문에 발급/중복 제거함 
					if(tmp_prs_sts != '' && tmp_prs_sts != '100')
					{
					
						// 처음일때 
						if(isDup == false)
						{
							DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_2", "210");
							DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_2_NM", "발급");
							
							// 발급사의 수수료, 은행수수료 자동 넣기
							fn_chrg_amt(i, DS_AFFAIR_DTL.GetColumn(i, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_2"),DS_AFFAIR_DTL.GetColumn(i, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(i, "DTL_SEQ"));
							

							// 채권사가 신용조회면 은행수수료에  신용조회 수수료 넣기 
							// 은행수수료는 0
							if(DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_2") == '6235')
							{
								DS_AFFAIR_DTL.SetColumn(i, "ISU_DEB", 0);	// 부채			
								DS_AFFAIR_DTL.SetColumn(i, "ISU_COC", 0);	// 내용
								DS_AFFAIR_DTL.SetColumn(i, "ISU_BNK", 0);	// 은행
								DS_AFFAIR_DTL.SetColumn(i, "ISU_CARD", 0);	// 카드	
								DS_AFFAIR_DTL.SetColumn(i, "ISU_CRDT", 1);	// 신용					
								
								DS_AFFAIR_DTL.SetColumn(i, "BNK_CHRG", ToNumber(GDS_BRCH_BAS.GetColumn(0,"CRDT_AMT")));
								DS_AFFAIR_DTL.SetColumn(i, "AGC_CHRG", ToNumber(GDS_BRCH_BAS.GetColumn(0,"CRDT_AMT2")));
							}								
							
							isDup = true;
						}
						else
						{
							DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_2", "220");
							DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_2_NM", "발급");
							DS_AFFAIR_DTL.SetColumn(i, "PRS_NOTE_2", "(다른건과중복(청구X))");
							DS_AFFAIR_DTL.SetColumn(i, "ISU_DEB", 0);	// 부채			
							DS_AFFAIR_DTL.SetColumn(i, "ISU_COC", 0);	// 내용
							DS_AFFAIR_DTL.SetColumn(i, "ISU_BNK", 0);	// 은행
							DS_AFFAIR_DTL.SetColumn(i, "ISU_CARD", 0);	// 카드		
							DS_AFFAIR_DTL.SetColumn(i, "BNK_CHRG", "0");
							DS_AFFAIR_DTL.SetColumn(i, "AGC_CHRG", "0");
						} 

					}
					else
					{
						DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_2", "");
						DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_2_NM", "");
						DS_AFFAIR_DTL.SetColumn(i, "PRS_NOTE_2", "");
						DS_AFFAIR_DTL.SetColumn(i, "ISU_DEB", 0);	// 부채			
						DS_AFFAIR_DTL.SetColumn(i, "ISU_COC", 0);	// 내용
						DS_AFFAIR_DTL.SetColumn(i, "ISU_BNK", 0);	// 은행
						DS_AFFAIR_DTL.SetColumn(i, "ISU_CARD", 0);	// 카드		
						DS_AFFAIR_DTL.SetColumn(i, "BNK_CHRG", "");
						DS_AFFAIR_DTL.SetColumn(i, "AGC_CHRG", "");				
					}				
				}
			 }				
		}
	}

trace('///////////////// 중복체크 완료 =>'+bnd_seq+ '/' + tmp_prs_sts)	;	

}




// 자동 전체 적용
function fn_check_auto(c_row, c_col)
{
	var bnd_seq = DS_AFFAIR_DTL.GetColumn(c_row, c_col);
	var tmp_prs_sts = DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS");
	
	
//	trace('///////////////// 전체적용 시작 =>'+bnd_seq + '/' + tmp_prs_sts)	;	


	if(length(bnd_seq) > 0)
	{
		
		for(var i=0;i<DS_AFFAIR_DTL.rowcount;i++)
		{
			
			// 의뢰채권사
			// 의뢰채권사명이 중복체크 채권사명과 동일하고 채권사1이 없으면 의뢰채권사 => 채권사1 지정 및 발급처리 
			if(DS_AFFAIR_DTL.GetColumn(i, "REQ_BND_SEQ") == bnd_seq && length(DS_AFFAIR_DTL.GetColumn(i, "BND_NM_1")) == 0)
			{
//				trace('REQ_BND_SEQ 동일 =>' +i+ '/' + bnd_seq);
				
				DS_AFFAIR_DTL.SetColumn(i, "BND_SEQ_1", DS_AFFAIR_DTL.GetColumn(i, "REQ_BND_SEQ"));
				DS_AFFAIR_DTL.SetColumn(i, "BND_NM_1", DS_AFFAIR_DTL.GetColumn(i, "REQ_BND_NM"));
				DS_AFFAIR_DTL.SetColumn(i, "BAR_1", DS_AFFAIR_DTL.GetColumn(i, "REQ_BAR"));
				//DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1", DS_AFFAIR_DTL.GetColumn(i, "REQ_BND_STS"));
				//DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1_NM", DS_AFFAIR_DTL.GetColumn(i, "REQ_BND_STS_NM"));			
			
			}			
			
			
			// 진행1
			// 채권사 동일
			//trace('check1='+ DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_1") +'=='+ bnd_seq);
			
			if(DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_1") == bnd_seq )
			 {
				//trace('BND_SEQ_1 동일 =>' +i+ '/' + bnd_seq);
				
				DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1", tmp_prs_sts);
				DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1_NM", gfn_getCodeName("AD03",tmp_prs_sts));
			
				setPrsNote(i, "PRS_STS_1");
			
			
			}
			 				
			
			//  공백상태이며 다음 진행이 없을때만 셋팅함 
			// 진행2
			// 채권사 동일
			//trace('check2='+ DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_2") +'=='+ bnd_seq);
			
			if(DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_2") == bnd_seq )
			 {
				//trace('BND_SEQ_2 동일 =>' +i+ '/' + bnd_seq);
				
				DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_2", tmp_prs_sts);
				DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_2_NM", gfn_getCodeName("AD03",tmp_prs_sts));
				
				setPrsNote(i, "PRS_STS_2");
			}
		}
	}

//trace('///////////////// 전체적용 완료 =>'+bnd_seq+ '/' + tmp_prs_sts)	;	

}


// 다음 진행유무 리턴
// 다음진행은 무조건 없다. 
function getIsNextBnd(c_row, next_bnd_seq_col)
{
	var retIsNextBnd = false;	// 이후 진행 있는지 유무
    
    ds_dtl_temp.ClearData();
	ds_dtl_temp.CopyF("DS_AFFAIR_DTL");

    // 다음채권사 상태
    var next_bnd_sts_col = "";

    if(next_bnd_seq_col == 'BND_SEQ_1')
    {
       next_bnd_sts_col = 'PRS_STS_1'; 
    }
    else if(next_bnd_seq_col == 'BND_SEQ_2')
    {
       next_bnd_sts_col = 'PRS_STS_2'; 
    }

    /*
    if(length(ds_dtl_temp.GetColumn(c_row, next_bnd_seq_col)) > 0)
    {
        // 발급, 발급예정, 중복, 공백만 체크
        if(ds_dtl_temp.GetColumn(c_row, next_bnd_sts_col) != "" && 
            ds_dtl_temp.GetColumn(c_row, next_bnd_sts_col) != "100" &&
            ds_dtl_temp.GetColumn(c_row, next_bnd_sts_col) != "210" &&
            ds_dtl_temp.GetColumn(c_row, next_bnd_sts_col) != "220" &&
            ds_dtl_temp.GetColumn(c_row, next_bnd_sts_col) != "999"  
          )
        {
            retIsNextBnd = true;
        }
    }
    */
       
	return retIsNextBnd;
		
}




// 진행 채권사 리셋하기
function fn_reset_bond_info(obj_dataset, c_row, bnd_seq_col)
{
	obj_dataset.SetColumn(c_row, "BNK_CHRG", 0);	// 은행수수료
	obj_dataset.SetColumn(c_row, "AGC_CHRG", 0);	// 대행수수료
	obj_dataset.SetColumn(c_row, "ISU_DEB", 0);	// 부채			
	obj_dataset.SetColumn(c_row, "ISU_COC", 0);	// 내용
	obj_dataset.SetColumn(c_row, "ISU_BNK", 0);	// 은행
	obj_dataset.SetColumn(c_row, "ISU_CARD", 0);	// 카드
	
	if(bnd_seq_col == "BND_SEQ_1")
	{
		obj_dataset.SetColumn(c_row, "PRS_NOTE_1", "");	// 채권사1비고
	}
	
	if(bnd_seq_col == "BND_SEQ_2")
	{
		obj_dataset.SetColumn(c_row, "PRS_NOTE_2", "");	// 채권사2비고
	}
}




// 수수료 
// 2014.02.21 부채+통장+카드에 따른 대행수수료 수정
function fn_chrg_amt(nRow, brch_id, tub_seq, bnd_seq, aff_seq, dtl_seq)
{
	svcID			= "ACAA01T01.selectChrgAmt";
	url   			= "service::common/select_mi.do";
	inDatasets  	= "";
	outDatasets 	= "DS_CHRG_AMT=ac.ACAffairDAO.selectChrgAmt";	
	
	argument    	= " _sqlName=ac.ACAffairDAO.selectChrgAmt"
					+ " BRCH_ID=" + quote(brch_id)			
					+ " TUB_SEQ=" + quote(tub_seq)
					+ " BND_SEQ=" + quote(bnd_seq)
					+ " AFF_SEQ=" + quote(aff_seq)
					+ " DTL_SEQ=" + quote(dtl_seq)
					;	


//	trace('argument='+argument);


	callbackFunc 	= "gfn_callback";

	gfn_SyncTransaction(svcID, url, inDatasets, outDatasets, argument, callbackFunc);	
	
	var bnk_chrg = ToNumber(DS_CHRG_AMT.GetColumn(0, "CHRG_AMT"));
	var agc_chrg = ToNumber(DS_CHRG_AMT.GetColumn(0, "AGC_AMT"));
	
	
	// 대행수수료 조정
	// 부채+통장+카드 => 대행수수료 + 2000 + 2000
	// 부채+통장 => 대행수수료 + 2000
	// 부채+카드 => 대행수수료 + 2000
	
	
	
	if(DS_AFFAIR_DTL.GetColumn(nRow, "ISU_DEB") == 1
	   && DS_AFFAIR_DTL.GetColumn(nRow, "ISU_BNK") == 1
	   && DS_AFFAIR_DTL.GetColumn(nRow, "ISU_CARD") == 1 
	  )
	{
		agc_chrg += 4000;
	}
	else if(DS_AFFAIR_DTL.GetColumn(nRow, "ISU_DEB") == 1
	        && DS_AFFAIR_DTL.GetColumn(nRow, "ISU_BNK") == 1
	       )
	{
		agc_chrg += 2000;
	}       
	
	else if(DS_AFFAIR_DTL.GetColumn(nRow, "ISU_DEB") == 1
	        && DS_AFFAIR_DTL.GetColumn(nRow, "ISU_CARD") == 1
	       )
	{
		agc_chrg += 2000;
	}


    // 등기완료
    if(DS_AFFAIR_DTL.GetColumn(nRow, "TMP_PRS_STS") == "330")
    {
        // 등기완료 = 은행수수료 + 2020
        // 은행수수료만 바꿈 
        bnk_chrg += ToNumber(GDS_BRCH_BAS.GetColumn(0,"REGS_AMT"));

    }

    // 원격완료
    if(DS_AFFAIR_DTL.GetColumn(nRow, "TMP_PRS_STS") == "350")
    {
        // 은행수수료만 바꿈 
        bnk_chrg += ToNumber(GDS_BRCH_BAS.GetColumn(0,"RMT_AMT"));
    }		

    // 등기+반송완료
    if(DS_AFFAIR_DTL.GetColumn(nRow, "TMP_PRS_STS") == "360")
    {
        // 은행수수료만 바꿈 
        bnk_chrg +=  ToNumber(GDS_BRCH_BAS.GetColumn(0,"REGS_AMT")) * 2;
    }    


	
//	trace('aff_seq/dtl_seq/tub_seq/bnd_seq/bnk_chrg/agc_chrg='+aff_seq+'/'+dtl_seq+'/'+tub_seq+'/'+bnd_seq+'/'+bnk_chrg+'/'+agc_chrg);
	
	    
	// 결과값 넣기
	DS_AFFAIR_DTL.SetColumn(nRow, "BNK_CHRG", bnk_chrg);	// 은행수수료     AGC_AMT
	DS_AFFAIR_DTL.SetColumn(nRow, "AGC_CHRG", agc_chrg);	// 대행수수료     AGC_CHRG
	
//	alert('set=>'+aff_seq+'/'+dtl_seq+'/'+tub_seq+'/'+bnd_seq+'/'+bnk_chrg+'/'+agc_chrg);
	
}	    






