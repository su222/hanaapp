/***************************************************************************************************
 * ��ǰ��� ���� �Լ�
 * ��ǰ��� ��ũ��Ʈ�� �ʹ� �� lib�� �ϳ� ���� 
***************************************************************************************************/


/**************************************************************************************************
  * ����� ����  Function ó�� �κ�
***************************************************************************************************/






// ������ ������� ��������
// ���� ���ٿ� ��������� �ִٸ� �ش� ����������� ���� �ٲٰ� �߱� ����
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



// �÷��� ���濡 ���� �̺�Ʈ
function set_dtl_event(c_row, col_id)
{
	
	
	var cur_bnd_seq_col = "";
	var next_bnd_seq_col = "";
	
	///////////// ���� ä�ǻ� �ִ��� üũ�ϴ� ���� �ֱ� ///////////////////
	// �ݵ�� ó���� �־�� �ȴ�.
	// ���� �Ƿ�ä�ǻ� => ����1 ���� �� �̰� �¿�� ������ ���� ä�ǻ� �ִ°����� �ν��� 
	
	// �Ƿ� ä�ǻ�
	if(col_id == "REQ_BND_STS")
	{	
		cur_bnd_seq_col = "REQ_BND_SEQ";
		next_bnd_seq_col = "BND_SEQ_1";
	}
	// ����1
	else if(col_id == "PRS_STS_1")
	{	
		cur_bnd_seq_col = "BND_SEQ_1";
		next_bnd_seq_col = "BND_SEQ_2";
	}
	// ����2
	else if(col_id == "PRS_STS_2")
	{	
		cur_bnd_seq_col = "BND_SEQ_2";
		next_bnd_seq_col = "";
	}
	
	isNextBnd = getIsNextBnd(c_row, next_bnd_seq_col);
	
	
	// �Ű�, �ϺθŰ�, ����, �߰�Ȯ��, �Ƿ��߰�, ���࿬��, �ſ���ȸ, �ſ�ȸ��, �������
	if(	DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "100" 	// ����
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "110" 	// �Ű�
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "120"	// �ϺθŰ�
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "130"	// ����
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "140"	// ��������
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "150"	// �߰�Ȯ��
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "160"	// �Ƿ��߰�
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "170"	// ���࿬��
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "180"	// �ſ���ȸ
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "190"	// �ſ�ȸ��
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "400"	// �������
	  )
	  {
		// �Ƿ� ä�ǻ� ���°� �ش���¸� ������ ��� ���´�  ����1�� ���ٸ� �ڵ����� ����1�� �Ƿ�ä�ǻ�� ����
		if(DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "" && length(DS_AFFAIR_DTL.GetColumn(c_row, "BND_NM_1")) == 0)
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "BND_SEQ_1", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_SEQ"));
			DS_AFFAIR_DTL.SetColumn(c_row, "BND_NM_1", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_NM"));
			DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS"));
			DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1_NM", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS_NM"));
			DS_AFFAIR_DTL.SetColumn(c_row, "BAR_1", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BAR"));
		}
		
		// �Ƿ�ä�ǻ���� �ְ� ����1�� ���� ����1���� ����� ����1 �� �ڵ� ����
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
	// �Ƿ� ä�ǻ� ���°� �ش���¸� ������ ��� ���´�  ����1�� ���ٸ� �ڵ����� ����1�� �Ƿ�ä�ǻ�� ����
	// �Ű�, �ϺθŰ�, ����, �߰�Ȯ��, �Ƿ��߰�, ���࿬��, �ſ���ȸ, �ſ�ȸ��, �������
	if((DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "" 
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "100" 	// ����
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "110" 	// �Ű�
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "120"	// �ϺθŰ�
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "130"	// ����
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "140"	// ��������
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "150"	// �߰�Ȯ��
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "160"	// �Ƿ��߰�
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "170"	// ���࿬��
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "180"	// �ſ���ȸ
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "190"	// �ſ�ȸ��
		&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "400"	// �������
		
	   ) && length(DS_AFFAIR_DTL.GetColumn(c_row, "BND_NM_1")) == 0 )
	{
		
//		trace('���³ֱ�=>' + DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS"));
		
		DS_AFFAIR_DTL.SetColumn(c_row, "BND_SEQ_1", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_SEQ"));
		DS_AFFAIR_DTL.SetColumn(c_row, "BND_NM_1", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_NM"));
		DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS"));
		DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1_NM", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS_NM"));
		
		
//trace('req_bnd_sts_nm='+DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS_NM"));
		
		//DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1_NM", '222');
	}	
*/
	
//	trace('cur_bnd_seq_col='+cur_bnd_seq_col+','+c_row+'=>'+DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col));
	
	
	//  ä�ǻ� ������� ���濡 ���� �̺�Ʈ 
	if(col_id == "REQ_BND_STS" || col_id == "PRS_STS_1" || col_id == "PRS_STS_2")
	{

		// ���� ���������� üũ�Ѵ�.
		set_acp_mtd_event(DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), 
							DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"), 
							DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"), 
							DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col));

		// �߱��϶�  ���/����/���+�ݼ��̸� �װ����� ���� �����ϱ�
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "210")
		{
			// ���
			if(DS_ACP_MTD.GetColumn(0, "ACP_MTD") == 'D')
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "TMP_PRS_STS", "330");
			}
			
			// ����
			if(DS_ACP_MTD.GetColumn(0, "ACP_MTD") == 'R')
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "TMP_PRS_STS", "350");
			}
			
			// ���ݼ�
			if(DS_ACP_MTD.GetColumn(0, "ACP_MTD") == 'DR')
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "TMP_PRS_STS", "360");
			}
		}

		// �ߺ� ���ý� �ٷ� �߱����� �ٲ㼭 ó����
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "220" && isNextBnd == false)
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "TMP_PRS_STS", "210");
		}




//		TRACE('ACP_MTD='+DS_ACP_MTD.GetColumn(0, "ACP_MTD"));
		
		
		//trace('isNextBnd='+isNextBnd);
		//trace('col_id='+DS_AFFAIR_DTL.GetColumn(c_row, col_id));
		
		
		// �Ƿ�ä�ǻ� -> ����1�� ����1�� �ִ��� ������ �Ƿ� �������� ������
		if(col_id == "REQ_BND_STS")
		{
			isNextBnd = false;
		}
		
		
		
//		trace('isNextBnd='+isNextBnd);
		

		// �ƹ��͵� ������ Ŭ���� 
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
			
			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 0);	// ��ä			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 0);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 0);	// ī��		
				
			DS_AFFAIR_DTL.SetColumn(c_row, "BNK_CHRG", "");	// ���������		
			DS_AFFAIR_DTL.SetColumn(c_row, "AGC_CHRG", "");	// ���������
		
//			trace('clear==========>');
		
		}



		// �Ű�(���� �������2���� �Ű��̸� ���߰� �Ѵ�.
		// 2014/09/16 �ڵ� ���߰� ����(�������� ���� �߰���)
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "110" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
			
			
			if(col_id == "PRS_STS_2")
			{
				fn_pop_bnd_continue(c_row);				
			}
		}

		// �ϺθŰ��� ��� ���� ä�ǻ� ���� �˾�
		//if(DS_AFFAIR_DTL.GetColumn(c_row, col_id) == "120" && isNextBnd == false)
		// �ϺθŰ� �켱 ��Ȱ��ȭ �ϰ� ä�ǻ� �˾� �����Ǹ� �ϰ� �պ��� 2014.11.08
		/*
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "120")
		{
			fn_pop_part_bnd_info(c_row, cur_bnd_seq_col);
		}
		*/
		
		// ����
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "130" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
		}
		
		// �������� 370�� �ߺ���
		/*
		if(DS_AFFAIR_DTL.GetColumn(c_row, col_id) == "140" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
		}
		*/
				
		// �߰�Ȯ��
		//�߰�Ȯ�� ���� �ؾߵȴٳ�..
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "150")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "REQ_BND_SEQ", "");	// �Ƿ�ä�ǻ�
			DS_AFFAIR_DTL.SetColumn(c_row, "REQ_BND_NM", "");	// �Ƿ�ä�ǻ�
			//DS_AFFAIR_DTL.SetColumn(c_row, "REQ_BND_STS", "");	// �Ƿ�ä�ǻ�
			//DS_AFFAIR_DTL.SetColumn(c_row, "REQ_BND_STS_NM", "");	// �Ƿ�ä�ǻ�
		}
		

		// �߱�����
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "200" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
		}		
		
		// �߱�
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "210" && isNextBnd == false)
		{
			// �߱޽� �������� äũ�ؼ� �ֱ�
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", CHK_DEB_YN.Value);	// ��ä			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", CHK_BNK_YN.Value);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", CHK_CARD_YN.Value);	// ī��				
			
			// �߱޻��� ������, ��������� �ڵ� �ֱ�
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));
		
		
			// ä�ǻ簡 �ſ���ȸ�� ��������ῡ  �ſ���ȸ ������ �ֱ� 
			// ���������� 0
			if(DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col) == '6235')
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 0);	// ��ä			
				DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// ����
				DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 0);	// ����
				DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 0);	// ī��	
				DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CRDT", 1);	// �ſ�					
				
				DS_AFFAIR_DTL.SetColumn(c_row, "BNK_CHRG", ToNumber(GDS_BRCH_BAS.GetColumn(0,"CRDT_AMT")));
				DS_AFFAIR_DTL.SetColumn(c_row, "AGC_CHRG", ToNumber(GDS_BRCH_BAS.GetColumn(0,"CRDT_AMT2")));
				
			}

		
		}
		
		// �ߺ�
		// ���� �ݾ��� �ߺ� üũ���� �ϰ� ó������.
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "220" && isNextBnd == false)
		{
			
			if(cur_bnd_seq_col == "REQ_BND_SEQ")
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "REQ_BND_STS", "220");
				DS_AFFAIR_DTL.SetColumn(c_row, "REQ_BND_STS_NM", "�߱�");
				//DS_AFFAIR_DTL.SetColumn(c_row, "REQ_PRS_NOTE", "(�ٸ��ǰ��ߺ�(û��X))");
				//DS_AFFAIR_DTL.SetColumn(c_row, "BNK_CHRG", "0");
				//DS_AFFAIR_DTL.SetColumn(c_row, "AGC_CHRG", "0");
			}

			if(cur_bnd_seq_col == "BND_SEQ_1")
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1", "220");
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1_NM", "�߱�");
				//DS_AFFAIR_DTL.SetColumn(c_row, "PRS_NOTE_1", "(�ٸ��ǰ��ߺ�(û��X))");
				//DS_AFFAIR_DTL.SetColumn(c_row, "BNK_CHRG", "0");
				//DS_AFFAIR_DTL.SetColumn(c_row, "AGC_CHRG", "0");
			}
			
			if(cur_bnd_seq_col == "BND_SEQ_2")
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_2", "220");
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_2_NM", "�߱�");
				//DS_AFFAIR_DTL.SetColumn(c_row, "PRS_NOTE_2", "(�ٸ��ǰ��ߺ�(û��X))");
				//DS_AFFAIR_DTL.SetColumn(c_row, "BNK_CHRG", "0");
				//DS_AFFAIR_DTL.SetColumn(c_row, "AGC_CHRG", "0");
			}			
		}			

		// ��ī
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "230")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 1);	// ��ä			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 0);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 1);	// ī��		

			// �߱޻��� ������, ��������� �ڵ� �ֱ�
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));
			
		}	
	
		// ����
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "240")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 1);	// ��ä			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 1);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 0);	// ī��	

			// �߱޻��� ������, ��������� �ڵ� �ֱ�
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));
				
		}	
	
		// ��ī��
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "250")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 1);	// ��ä			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 1);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 1);	// ī��	
				
			// �߱޻��� ������, ��������� �ڵ� �ֱ�
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));
				
		}	

		// ī��
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "260")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 0);	// ��ä			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 1);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 1);	// ī��	
				
			// �߱޻��� ������, ��������� �ڵ� �ֱ�
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));
				
		}	

		// ī�常
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "270")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 0);	// ��ä			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 0);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 1);	// ī��	
				
			// �߱޻��� ������, ��������� �ڵ� �ֱ�
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));
				
		}	

		// ���常
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "280")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 0);	// ��ä			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 1);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 0);	// ī��	
				
			// �߱޻��� ������, ��������� �ڵ� �ֱ�
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));
				
		}	

		// ��������
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "290")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 0);	// ��ä			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 1);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 0);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 0);	// ī��	
			
			// �߱޻��� ������, ��������� �ڵ� �ֱ�
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));
			
			// ���������� ȸ�������� ����,��������� �������� ������ 
			DS_AFFAIR_DTL.SetColumn(c_row, "BNK_CHRG", ToNumber(GDS_BRCH_BAS.GetColumn(0,"COC_AMT")));
			DS_AFFAIR_DTL.SetColumn(c_row, "AGC_CHRG", ToNumber(GDS_BRCH_BAS.GetColumn(0,"COC_AMT2")));
				
		}	

		// �߱޺Ұ�
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "300" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
		}
		
		// �Ƿ����
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "310" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
		}
				
		// ä������
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "320" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
		}

		// ���Ϸ�
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "330" && isNextBnd == false)
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 1);	// ��ä			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 0);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 0);	// ī��	
			
		
			// ���Ϸ� = ��������� + 2020
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));

			// ��������Ḹ �ٲ� 
			//DS_AFFAIR_DTL.SetColumn(c_row, "BNK_CHRG", ToNumber(DS_AFFAIR_DTL.GetColumn(c_row, "BNK_CHRG")) + ToNumber(GDS_BRCH_BAS.GetColumn(0,"REGS_AMT")));


		}
									
						
		// �ϳ�
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "340" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
		}						

		// ���ݿϷ�
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "350")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 1);	// ��ä			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 0);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 0);	// ī��				
			
			// ���ݿϷ� = ��������� + 5000
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));

			// ��������Ḹ �ٲ� 
			//DS_AFFAIR_DTL.SetColumn(c_row, "BNK_CHRG", ToNumber(DS_AFFAIR_DTL.GetColumn(c_row, "BNK_CHRG")) + ToNumber(GDS_BRCH_BAS.GetColumn(0,"RMT_AMT")));
		}		
	
		// ���+�ݼۿϷ�
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "360")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 1);	// ��ä			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 0);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 0);	// ī��				
			
			// ���Ϸ� = ��������� + 2020 * 2 (�� ���������� 2��)
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));
		
			// ��������Ḹ �ٲ� 
			//DS_AFFAIR_DTL.SetColumn(c_row, "BNK_CHRG", ToNumber(DS_AFFAIR_DTL.GetColumn(c_row, "BNK_CHRG")) + ToNumber(GDS_BRCH_BAS.GetColumn(0,"REGS_AMT")) * 2);
	
		
		}
				
		// ��������
		// �Ű��� ���� 2014.02.24
		/*
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "370" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
		}
		*/
	
		// �߱޿���
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "380")
		{
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_DEB", 1);	// ��ä			
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_COC", 0);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_BNK", 0);	// ����
			DS_AFFAIR_DTL.SetColumn(c_row, "ISU_CARD", 0);	// ī��				
			
			// �߱޻��� ������, ��������� �ڵ� �ֱ�
			fn_chrg_amt(c_row, DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, cur_bnd_seq_col),DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(c_row, "DTL_SEQ"));
		}	

		// �߱޺���
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "390" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
		}		

		// �������
		if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "400" && isNextBnd == false)
		{
			fn_reset_bond_info(DS_AFFAIR_DTL, c_row, cur_bnd_seq_col);
		}
				
				
				
	}



	// �Ƿ� ä�ǻ� ���°� �ش�����̸� �Ƿ�ä�ǻ��� ���¸� ���ְ� ����1�� �߱����� �ٲ�
	// ��ī, ����, ��ī��, ī��, ī�常, ���常, ���Ϸ�, ���+�ݼۿϷ�, ���ݿϷ�, �߱޿���
	if((DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "210" 	// �߱�
	    || DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "230" 	// ��ī
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "240" 	// ����
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "250"	// ��ī��
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "260"	// ī��
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "270"	// ī�常
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "280"	// ���常
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "330"	// ���Ϸ�
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "360"	// ���+�ݼۿϷ�
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "350"	// ���ݿϷ�
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "290"	// ��������
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "320"	// ä������
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "200"	// �߱�����
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "300"	// �߱޺Ұ�
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "340"	// �ϳ�
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "310"	// �Ƿ����
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "380"	// �߱޿���
		|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "390"	// �߱޺���
		)
      )  
	{
		if(col_id == "REQ_BND_STS" || col_id == "PRS_STS_1")
		{
		
			// �Ƿ� ä�ǻ� ���°� �ش���¸� ������ ��� ���´�  �Ƿڻ��� ���� ó�� 
			// �Ű�, �ϺθŰ�, ����, �߰�Ȯ��, �Ƿ��߰�, ���࿬��, �ſ���ȸ, �ſ�ȸ��, �������
			if(DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "" 
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "100" 	// ����
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "110" 	// �Ű�
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "120"	// �ϺθŰ�
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "130"	// ����
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "140"	// ��������
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "150"	// �߰�Ȯ��
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "160"	// �Ƿ��߰�
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "170"	// ���࿬��
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "180"	// �ſ���ȸ
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "190"	// �ſ�ȸ��
				&& DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") != "400"	// �������
			  )
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "REQ_BND_STS", "");
				DS_AFFAIR_DTL.SetColumn(c_row, "REQ_BND_STS_NM", "");
			}	
			
			// �߱޿����� �߱޿�������
			if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "380")
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1", "380");
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1_NM", "�߱޿���");		
			}
			// �׳� ���¸� �ٲٴ°� 
			else if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "290"	// ��������
					|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "320"	// ä������
					|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "200"	// �߱�����
					|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "300"	// �߱޺Ұ�
					|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "340"	// �ϳ�
					|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "310"	// �Ƿ����
					|| DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "390"	// �߱޺���
				  )  
			{
				// ����� �׳� �н� 
			}
			else
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1", "210");
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1_NM", "�߱�");		
			}
		}
		else if(col_id == "PRS_STS_2")
		{
			if(DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS") == "380")
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_2", "380");
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_2_NM", "�߱޿���");		
			}
			else
			{
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_2", "210");
				DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_2_NM", "�߱�");		
			}		
		

		}
	
//		trace('��Ī���� YES ='+c_row+'/'+col_id);
		
		//DS_AFFAIR_DTL.SetColumn(c_row, "PRS_STS_1_NM", '222');
	}
	else
	{
//		trace('��Ī���� NO ='+c_row+'/'+col_id);
	
	}
	

	// ������ �̸� �ְ� �߱� ó���ؾߵ�
	setPrsNote(c_row, col_id);

}


// ������ �ڵ� �ֱ�
// ������ ��� �ٲ�� �ƿ� �и��ؼ� ������ 
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



// �ڵ忡 ���� ��� ���� 
function getPrsNote(prs_sts_code)
{
	
//	TRACE('prs_sts_code='+prs_sts_code);
	
	
	var tmp_prs_note = "";
	
	if(prs_sts_code == "220")
	{
		tmp_prs_note = "(�ٸ��ǰ��ߺ�(û��X))";
	}
	else if(prs_sts_code == "230")
	{
		tmp_prs_note = "(��ä+ī��ŷ�����)";
	}
	else if(prs_sts_code == "240")
	{
		tmp_prs_note = "(��ä+����ŷ�����)";
	}
	else if(prs_sts_code == "250")
	{
		tmp_prs_note = "(��ä+ī��/����ŷ�����)";
	}		
	else if(prs_sts_code == "260")
	{
		tmp_prs_note = "(ī��/����ŷ�����)";
	}	
	else if(prs_sts_code == "270")
	{
		tmp_prs_note = "(ī��ŷ�������)";
	}
	else if(prs_sts_code == "280")
	{
		tmp_prs_note = "(����ŷ�������)";
	}		
	else if(prs_sts_code == "330")
	{
		tmp_prs_note = "(�������)";
	}
	else if(prs_sts_code == "350")
	{
		tmp_prs_note = "(��������)";
	}		
	else if(prs_sts_code == "360")
	{
		tmp_prs_note = "(���+�ݼ�����)";
	}				
	else if(prs_sts_code == "380")
	{
		tmp_prs_note = "�߱޿���";
	}				
				
	else
	{
		tmp_prs_note = "";
	}	
	
//	trace('tmp_prs_note='+tmp_prs_note);
	
	return tmp_prs_note;
}










// �Ű� ��� ����
function fn_pop_bnd_continue(c_row)
{
	DS_AFFAIR_DTL.FireEvent = false;	

	var curGrpSeq = DS_AFFAIR_DTL.GetColumn(c_row,"GRP_SEQ");
		
	var tRow = DS_AFFAIR_DTL.InsertRow(c_row+1);
	
	TRACE('���='+DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS"));
	
	
	DS_AFFAIR_DTL.SetColumn(tRow,"FLAG","I");	// �߰� FLAG �ֱ�
	DS_AFFAIR_DTL.SetColumn(tRow,"ROW_ID","");	// ROW_ID(��ȸ�� ���õ�)
	DS_AFFAIR_DTL.SetColumn(tRow,"OPERATOR", GDS_USER_INFO.GetColumn(0, "USR_ID"));// �����, ������ �ֱ�
	DS_AFFAIR_DTL.SetColumn(tRow,"CHK","1");	// ����
	
	DS_AFFAIR_DTL.SetColumn(tRow,"BRCH_ID", DS_AFFAIR_DTL.GetColumn(c_row, "BRCH_ID"));// 
	DS_AFFAIR_DTL.SetColumn(tRow,"AFF_SEQ", DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"));// 
	
	DS_AFFAIR_DTL.SetColumn(tRow,"DTL_SEQ", '');//  ����� �ڵ� �ο�
	DS_AFFAIR_DTL.SetColumn(tRow,"GRP_CD", DS_AFFAIR_DTL.GetColumn(c_row, "GRP_CD"));// �׷��ڵ�� ���� ���� ���� �׷��ڵ� 
	DS_AFFAIR_DTL.SetColumn(tRow,"GRP_SEQ", '');//  �׷����(������)	   
	DS_AFFAIR_DTL.SetColumn(tRow,"REQ_SEQ", '');// �Ƿڼ����� ���� 
	DS_AFFAIR_DTL.SetColumn(tRow,"SORT_NO", '');// ��¼���(������) 
	DS_AFFAIR_DTL.SetColumn(tRow,"PRT_EDT_YN", 'Y');// �⺻���
	DS_AFFAIR_DTL.SetColumn(tRow,"PRT_YN", '1');// �⺻���
	DS_AFFAIR_DTL.SetColumn(tRow,"REQ_BND_SEQ", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_SEQ")); 
	DS_AFFAIR_DTL.SetColumn(tRow,"REQ_BND_NM", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_NM")); 
	
	// �Ƿ�ä�ǻ� ������ �����̸� �Ű����� ó�� 
	if(DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS") == '')
	{
		DS_AFFAIR_DTL.SetColumn(tRow,"REQ_BND_STS", "110"); 
		DS_AFFAIR_DTL.SetColumn(tRow,"REQ_BND_STS_NM", "�Ű�"); 
	}
	else
	{
		DS_AFFAIR_DTL.SetColumn(tRow,"REQ_BND_STS", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS")); 
		DS_AFFAIR_DTL.SetColumn(tRow,"REQ_BND_STS_NM", DS_AFFAIR_DTL.GetColumn(c_row, "REQ_BND_STS_NM")); 
	}
	
	
	
	
	trace('PRT_EDT_YN='+DS_AFFAIR_DTL.GetColumn(tRow,"PRT_EDT_YN"));
	trace('PRT_YN='+DS_AFFAIR_DTL.GetColumn(tRow,"PRT_YN"));
	
	//alert(gfn_dsToString(DS_AFFAIR_DTL));
	
	
	// �߰��� �ϺθŰ��� ���� �� �����Ƿ� ���� �׷��ڵ��� ������ �� ���� �Ѵ�.
	fn_set_grp_sort(DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"), DS_AFFAIR_DTL.GetColumn(c_row, "GRP_CD"));
	
	// ���� �ٽ� �ű�� 
	fn_set_dtl_sort(DS_AFFAIR_DTL.GetColumn(c_row, "AFF_SEQ"));

	curDtlRow = tRow;

	fn_affair_dtl(0);

	DS_AFFAIR_DTL.FireEvent = true;		


}



//*------------------------------------------------------------------------------------------------
//* �Լ�����     : ���߰�
//* �Լ�����     : 
//* parameter    : 
//* return value : ����
//* ���         :
//*-----------------------------------------------------------------------------------------------
function fn_add_dtl(isInsert)
{
	var vRow;
	
	// �⺻������ ���õ��� ������ ��� 
	if(length(DS_AFFAIR_MST.GetColumn(DS_AFFAIR_MST.curRow,"AFF_SEQ")) == 0)
	{
		gfn_popup_message("modal", "error", "���� ������� �⺻������ ���� �ؾ� �մϴ�. ", "Ȯ��");
		return;
	}
	
	// ù�� 
	if(isInsert == "FIRST")
	{
		vRow = DS_AFFAIR_DTL.InsertRow(0);
	}
	// �߰�
	else if(isInsert == "CENTER")
	{
		vRow = DS_AFFAIR_DTL.InsertRow(DS_AFFAIR_DTL.currow+1);
	}
	// ��
	else
	{
		vRow = DS_AFFAIR_DTL.AddRow();
	}
	
	
//	trace('aft vRow/mst/dtl/note='+vRow+'/'+curMstRow+'/'+curDtlRow+'/'+curNoteRow);
	
	
	curDtlRow = vRow;
	
	// ���ʰ�
	DS_AFFAIR_DTL.SetColumn(vRow,"FLAG","I");	// �߰� FLAG �ֱ�
	DS_AFFAIR_DTL.SetColumn(vRow,"ROW_ID","");	// ROW_ID(��ȸ�� ���õ�)
	DS_AFFAIR_DTL.SetColumn(vRow,"OPERATOR", GDS_USER_INFO.GetColumn(0, "USR_ID"));// �����, ������ �ֱ�
	DS_AFFAIR_DTL.SetColumn(vRow,"CHK","1");	// ����
    
    DS_AFFAIR_DTL.SetColumn(vRow,"BRCH_ID", DS_AFFAIR_MST.GetColumn(DS_AFFAIR_MST.curRow, "BRCH_ID"));// 
    DS_AFFAIR_DTL.SetColumn(vRow,"AFF_SEQ", DS_AFFAIR_MST.GetColumn(DS_AFFAIR_MST.curRow, "AFF_SEQ"));// 
    
    DS_AFFAIR_DTL.SetColumn(vRow,"DTL_SEQ", '');// 
    DS_AFFAIR_DTL.SetColumn(vRow,"GRP_CD", '');//  ����úο�
    DS_AFFAIR_DTL.SetColumn(vRow,"GRP_SEQ", '');// 	   ����úο�
    DS_AFFAIR_DTL.SetColumn(vRow,"REQ_SEQ", '');// �����ϸ鼭 �ο�
    DS_AFFAIR_DTL.SetColumn(vRow,"SORT_NO", '');// �����ϸ鼭 �ο� 
    
    DS_AFFAIR_DTL.SetColumn(vRow,"REQ_DEB", '1');// ��ä
    DS_AFFAIR_DTL.SetColumn(vRow,"REQ_BNK", '0');// ����
    DS_AFFAIR_DTL.SetColumn(vRow,"REQ_CARD", '0');// ī��
    
	DS_AFFAIR_DTL.SetColumn(vRow,"PRT_YN", '1');// ��� 
 
	DS_AFFAIR_DTL.SetColumn(vRow,"CLOSE_YN", 'N');// �̸��� 
 

// 	trace('bef curDtlRow='+curDtlRow);
	
 	
	fn_set_dtl_sort(DS_AFFAIR_MST.GetColumn(0, "AFF_SEQ"));
	

//	trace('aft curDtlRow='+curDtlRow);
	
	
	DS_AFFAIR_DTL.row = curDtlRow;
	
}
 


//*------------------------------------------------------------------------------------------------
//* �Լ�����     :  ���ļ��� �ű�� (�̶� �̺�Ʈ�� �¿��� �ʴ´�)
//* �Լ�����     : 
//* parameter    : 
//* return value : ����
//* ���         : 
//*-----------------------------------------------------------------------------------------------
function fn_set_dtl_sort(aff_seq)
{
	

//	trace('sort bef dtl/note='+curDtlRow+'/'+curNoteRow);
	

	
	
	DS_AFFAIR_DTL.FireEvent = false;	
	
	DS_AFFAIR_DTL.Filter("AFF_SEQ ='"+aff_seq+"' && flag != 'D'");		
	
	// ���� �ٽ� ����
	var oldSortNo;
	var newSortNo;
	for(var i=0;i<DS_AFFAIR_DTL.rowcount;i++)
	{
		oldSortNo = DS_AFFAIR_DTL.GetColumn(i, "SORT_NO");
		newSortNo = i+1;
		
		DS_AFFAIR_DTL.SetColumn(i, "SORT_NO", newSortNo);
		
		// ������ �ٲ�� U�� �ϱ�
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
//* �Լ�����     :  �׷����  �ű�� 
//* �Լ�����     : 
//* parameter    : 
//* return value : ����
//* ���         : �����ű涧�� �̺�Ʈ�� ���� �ʾƾ� �ڵ����� ��ź�� 
//*-----------------------------------------------------------------------------------------------
function fn_set_grp_sort(aff_seq, grp_cd)
{
	
	DS_AFFAIR_DTL.Filter("AFF_SEQ ='"+aff_seq+"' && GRP_CD ='"+grp_cd+"' && flag != 'D'");		
	
	// �ʼ�üũ
	for(var i=0;i<DS_AFFAIR_DTL.rowcount;i++)
	{
		//DS_AFFAIR_DTL.SetColumn(i, "REQ_SEQ", i+1);
		DS_AFFAIR_DTL.SetColumn(i, "GRP_SEQ", i+1);
	}

	DS_AFFAIR_DTL.UnFilter();	
	DS_AFFAIR_DTL.Filter("AFF_SEQ ='"+aff_seq+"' && flag != 'D'");	

}




//*------------------------------------------------------------------------------------------------
//* �Լ�����     : DTL ���͸�
//* �Լ�����     : 
//* parameter    : 
//* return value : ����
//* ��� : ������ �ѰǸ� ����ϹǷ� �ش� �Լ� ������  
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

	// �ش� ��ǹ�ȣ�� ���� 
	DS_AFFAIR_DTL.UnFilter();
	DS_AFFAIR_DTL.Filter("AFF_SEQ ='"+AFF_SEQ+"' && flag != 'D'");	

	DS_AFFAIR_DTL.row = curDtlRow;	

	// ����Ư�̻��� ���͸�
	// �ش� ��ǹ�ȣ�� ���� 
	DS_AFFNOTE_LST.UnFilter();
	DS_AFFNOTE_LST.Filter("AFF_SEQ ='"+AFF_SEQ+"' && flag != 'D'");	

	DS_AFFNOTE_LST.row = curNoteRow;
		
	// ���޻� ��� Ư�̻��� 	
	// �ش� ��ǹ�ȣ�� ���� 
	DS_TIEUPNOTE_LST.UnFilter();
	DS_TIEUPNOTE_LST.Filter("AFF_SEQ ='"+AFF_SEQ+"'");	

	DS_TIEUPNOTE_LST.row = curTubNoteRow;

	// �Աݳ��� ����
	DS_BONDPAY_LST.UnFilter();
	DS_BONDPAY_LST.Filter("TUB_SEQ ='"+TUB_SEQ+"'");	


	DS_AFFAIR_DTL.FireEvent = true;
	DS_AFFNOTE_LST.FireEvent = true;	
	DS_TIEUPNOTE_LST.FireEvent = true;
	DS_BONDPAY_LST.FireEvent = true;
	
	
	// ��ǳ��ܱ� ���� ����
	fn_affair_prs(AFF_SEQ);
*/

}



//*------------------------------------------------------------------------
//* �Լ�����     : 1.2 ��� üũ �Լ� 
//* �Լ�����     :
//* parameter    :
//* return value : ����
//* ���      
//*------------------------------------------------------------------------
function fn_chk_print(c_row)
{
	
	var bValidate = true;
	var cMessage = "";
	
	// �⺻������ ���õ��� ������ ��� 
	if(length(DS_AFFAIR_MST.GetColumn(DS_AFFAIR_MST.curRow,"CHG_SEQ")) == 0)
	{
		gfn_popup_message("modal", "error", "��Ǵ���� �����ϼ���. ", "Ȯ��");
		return false;
	}	
	
	if(length(DS_AFFAIR_MST.GetColumn(0, "CLT_NM")) == 0)
	{
		bValidate = false;
		cMessage += "���� ���� ";
	}

	/*
	if(length(DS_AFFAIR_MST.GetColumn(0, "CLT_TEL")) == 0)
	{
		bValidate = false;
		cMessage += "��ȭ��ȣ ���� ";
	}
	*/
	
	if(length(Replace(DS_AFFAIR_MST.GetColumn(0, "CLT_JMN"),'-','')) == 0)
	{
		bValidate = false;
		cMessage += "�ֹι�ȣ ���� ";
	}

	/*
	if(length(DS_AFFAIR_MST.GetColumn(0, "CLT_ADDR")) == 0)
	{
		bValidate = false;
		cMessage += "�ּ� ���� ";
	}
	*/
				
			
	
	if(bValidate == false)
	{
		gfn_popup_message("modal", "error", cMessage, "Ȯ��");
		return false;
	}
}


//*------------------------------------------------------------------------
//* �Լ�����     : 1.2 ��� üũ �Լ� 
//* �Լ�����     :
//* parameter    :
//* return value : ����
//* ���      
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
	
		// ���� ����� ��� �䱸�̸� ����ڹ�ȣ�� ���� ����Ѵ�.
		if(DS_AFFAIR_DTL.GetColumn(c_row, "BIZ_REQ_YN") == 'Y')
		{
			prtGbn = "BIZ";
			
			// ����� ��� ����
			fn_print(c_row);
			
		}
		// ��ǥ2�� ������ ��� ���� ���� �Ѵ�. 
		else if(length(DS_AFFAIR_DTL.GetColumn(c_row, "FORM_SAVE_FILE2")) > 0)
		{
			prtGbn = "CONTINUE";
			
			// �ι�° ����� �ִٰ� flag
			fn_print(c_row);
			
		}
		else
		{
			prtGbn = "END1";
			
			// ������ ��� 
			fn_print(c_row);		
		}	
	}	
}


//*------------------------------------------------------------------------
//* �Լ�����     : 1.3���  �Լ� 
//* �Լ�����     :
//* parameter    :
//* return value : ����
//* ���      
// ��������: 2014-02-25 �Ļ��߰� 
//*------------------------------------------------------------------------
function fn_print(c_row)
{
	
	var mrd = "";
	var param = "";
	
	// ����� ���
	if(prtGbn == "BIZ")
	{
		mrd = DS_AFFAIR_MST.GetColumn(0, "BIZ_FILE_SAVE_NM");
		param = "";	
		
//		trace(prtGbn +"/"+ mrd + "/" + param);
		
		// ����� ����� ������ �ٷ� ��� ��� 
		if(mrd == '')
		{
			gfn_popup_message("modal", "error", "���޻� ����� ����� ������ ���� �ٷ� ä�ǻ� ��� ����մϴ�.", "Ȯ��");
			
			// ��ǥ2�� ������ ��� ���� ���� �Ѵ�. 
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
		// �Ļ� ä�ǻ��̸� �˾�â
		IF(DS_BND_PRINT_INFO.GetColumn(0, "REG_GBN") == 'Z')
		{
			
			alert('�Ļ� ä�ǻ�!');
			
			return;
		}
		// ������ ������� üũ 
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
			trace('prtGbn ����='+prtGbn);
		}
				
		// �߰������� ���� ����� �ֹι�ȣ�� �޸��Ѵ�.
		var tmp_clt_nm = "";
		var tmp_clt_jmn = "";
		var enc_clt_jmn = "";	// �������� ��ȣ�� �ֹι�ȣ ���� �ֹι�ȣ ���� �ƴϸ� ******* �� �Ѵ�.
		var enc_bef_clt_jmn = "";
		var tmp_clt_tel = "";	// ���޻� ����
				

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
			
		
		
		// ���ä�� ����
		if(DS_AFFAIR_MST.GetColumn(0, "ADD_INF_GBN") == "A")
		{
			tmp_clt_nm = "��ӣ�(��)"+ DS_AFFAIR_MST.GetColumn(0, "BEF_CLT_NM") + " (�����)" + DS_AFFAIR_MST.GetColumn(0, "CLT_NM");
			tmp_clt_jmn = "��ӣ�(��)"+ substr(DS_AFFAIR_MST.GetColumn(0, "BEF_CLT_JMN"),0,6) 
						+ "-" + enc_bef_clt_jmn 
						+ " (�����):"+substr(DS_AFFAIR_MST.GetColumn(0, "CLT_JMN"),0,6) 
						+ "-" + enc_clt_jmn;
		}		
		// �̸� ����
		else if(DS_AFFAIR_MST.GetColumn(0, "ADD_INF_GBN") == "B")
		{
			tmp_clt_nm = DS_AFFAIR_MST.GetColumn(0, "CLT_NM") + "(������:" + DS_AFFAIR_MST.GetColumn(0, "BEF_CLT_NM") + ")";
			tmp_clt_jmn = substr(DS_AFFAIR_MST.GetColumn(0, "CLT_JMN"),0,6) + "-" + enc_clt_jmn;
		}
		// �ֹι�ȣ ����
		else if(DS_AFFAIR_MST.GetColumn(0, "ADD_INF_GBN") == "C")
		{
			tmp_clt_nm = DS_AFFAIR_MST.GetColumn(0, "CLT_NM");
			tmp_clt_jmn = substr(DS_AFFAIR_MST.GetColumn(0, "CLT_JMN"),0,6) 
						+ "-" +  enc_clt_jmn
						+ "(������:"+substr(DS_AFFAIR_MST.GetColumn(0, "BEF_CLT_JMN"),0,6) 
						+ "-" + enc_bef_clt_jmn;
		}
		// �̸�+�ֹι�ȣ ����
		else if(DS_AFFAIR_MST.GetColumn(0, "ADD_INF_GBN") == "D")
		{
			tmp_clt_nm = DS_AFFAIR_MST.GetColumn(0, "CLT_NM") + "(������:" + DS_AFFAIR_MST.GetColumn(0, "BEF_CLT_NM") + ")";
			tmp_clt_jmn = substr(DS_AFFAIR_MST.GetColumn(0, "CLT_JMN"),0,6) 
						+ "-" + enc_clt_jmn
						+ "(������:"+substr(DS_AFFAIR_MST.GetColumn(0, "BEF_CLT_JMN"),0,6) 
						+ "-" + enc_bef_clt_jmn;
		}		
		else
		{
			tmp_clt_nm = DS_AFFAIR_MST.GetColumn(0, "CLT_NM");
			tmp_clt_jmn = substr(DS_AFFAIR_MST.GetColumn(0, "CLT_JMN"),0,6) + "-" + enc_clt_jmn;
		}
				
		// ä�ǻ� �������� ��ȭ������ ���޻�� ������� �����ؾߵ�(�ǰ�����, ������)
		// ���޻� ��ȭ ������ ���� ��ȭ��ȣ ��ü
		if(DS_BND_PRINT_INFO.GetColumn(0, "CLT_OPN_YN") != 'Y' && DS_AFFAIR_MST.GetColumn(0, "CLT_OPN_YN") == 'N' && length(DS_AFFAIR_MST.GetColumn(0, "CLT_OPN_HP")) > 0)
		{
			tmp_clt_tel = DS_AFFAIR_MST.GetColumn(0, "CLT_OPN_HP");
		}
		else
		{
			tmp_clt_tel = DS_AFFAIR_MST.GetColumn(0, "CLT_TEL");
		}		
		
		// ��³�¥ ����
		// ������ : (��¥�� ������ -1�� �Ǿ��Ѵ�. �ֳĸ� ��¹��� �̹� +1 �ؼ� ������ +1 �ϸ� +2 ���ȴ�.)	
		// ������ PC��¥�� ����ؾ� �Ѵ�.(PC ��¥ �������� �����)
		var print_date = "";
		
		// ����
		if(DS_BND_PRINT_INFO.GetColumn(0, "DT_GBN") == "D")
		{
			print_date = gfnGetToday('');
		}
		else
		{
			print_date = addDate(DS_AFFAIR_MST.GetColumn(0, "AFF_ST_DT"),-1);
		}	
		
		var barCode = "";	
			
		// ���ڵ� 	
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
		
		param = "/rv ��ä["
			+gfn_StrYn(CHK_DEB_YN.Value)+"] ����["
			+gfn_StrYn(0)+"] ����["
			+gfn_StrYn(CHK_BNK_YN.Value)+"] ī��["
			+gfn_StrYn(CHK_CARD_YN.Value)+"] �ſ�["
			+gfn_StrYn(0)+"] /rp ["
			+DS_AFFAIR_MST.GetColumn(0, "BRCH_ID")+"] ["        // ȸ���ڵ� 1
			+tmp_clt_nm+"] ["   // ����2
			+tmp_clt_jmn+"] ["  // ���ֹ�3
			+DS_AFFAIR_MST.GetColumn(0, "CLT_ADDR")+"] [" // ���ּ�4
			+tmp_clt_tel+"] ["  // ����ȭ5
			+DS_AFFAIR_MST.GetColumn(0, "AFF_GBN")+"] ["         // ���뵵6
			+DS_BND_PRINT_INFO.GetColumn(0, "DT_GBN")+"] ["         // ��¥����7
			+EDT_BNK_NOTE.Text+"] ["         // ����ŷ��Ⱓ8
			+EDT_CARD_NOTE.Text+"] ["         // ī��ŷ��Ⱓ9
			+DS_BND_PRINT_INFO.GetColumn(0, "BND_SEQ")+"] ["         // ä�ǻ��ڵ�(�̹� �����ͼ¿� ���)10
			+"-999] ["         // ä�ǻ�����(����� ����)11
			+DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ")+"] ["         // ���޻��ڵ�12
			+DS_AFFAIR_MST.GetColumn(0, "CHG_SEQ")+"] ["         // ���޻���13
			+print_date+"] ["       // ��¥14		
			+GlobalURL+"] ["			// �̹��� URL
			+DS_AFFAIR_MST.GetColumn(0, "SMT_PLC")+"] ["	     // ����ó		
			+DS_AFFAIR_MST.GetColumn(0, "PRS_CHG_USR")+"] ["	     // ������   17
			+gfn_StrYn(CHK_DEB_YN.Value) + "] ["	// ��ä üũ ���� 18
			+ barCode + "]"							// ���ڵ� 19	
				;         		
				
	
		trace('ppp='+prtGbn +"/"+ mrd + "/" + param);

		// ��� ������ ������ �ƴѵ� ��� ������ ��� ���
		if(DS_BND_PRINT_INFO.GetColumn(0, "FORM_GBN") == 'N')
		{
			// ��ľ���
		}
		else if(mrd == '')
		{
			gfn_popup_message("modal", "error", "����� ��������� ��ϵ��� �ʾҽ��ϴ�. ������� ��� �� ������࿡�� ���� ��� �ϼ���.", "Ȯ��");
		}
		else
		{
			gfn_viewReport(Report0, mrd, param, true);			
		}		

	}
}




//*------------------------------------------------------------------------------------------------
//* �Լ�����     : ��Ǵ�� �˾�
//* �Լ�����     : 
//* parameter    : 
//* return value : ����
//* ���         : �̸��� �ȳְ� ������ �����ϰԸ� 
//*-----------------------------------------------------------------------------------------------
function fn_chg_popup()
{
	
	// �⺻������ ���õ��� ������ ��� 
	if(length(DS_AFFAIR_MST.GetColumn(DS_AFFAIR_MST.curRow,"AFF_SEQ")) == 0)
	{
		gfn_popup_message("modal", "error", "�ű��߰� �Ǵ� ��������� ����� ���� �ؾ� �մϴ�. ", "Ȯ��");
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
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"PRS_CHG_USR", retArr[8]);	// ��������ڴ� �ϳ�������� 
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"DOC_CARY", retArr[9]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"BIZ_FILE_SAVE_NM", retArr[10]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"AFF_REG_NOTE", retArr[11]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"CLT_OPN_YN", retArr[12]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"CLT_OPN_HP", retArr[13]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"SIN_GBN", retArr[14]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"SIN_NM", retArr[15]);


}


//*------------------------------------------------------------------------------------------------
//* �Լ�����     : �ϳ���� �˾�
//* �Լ�����     : 
//* parameter    : 
//* return value : ����
//* ���         :
//*-----------------------------------------------------------------------------------------------
function fn_hna_popup()
{
	
	// �⺻������ ���õ��� ������ ��� 
	if(length(DS_AFFAIR_MST.GetColumn(DS_AFFAIR_MST.curRow,"AFF_SEQ")) == 0)
	{
		gfn_popup_message("modal", "error", "�ű��߰� �Ǵ� ��������� ����� ���� �ؾ� �մϴ�. ", "Ȯ��");
		return;
	}
		
	var params = "P_BRCH_ID=" + quote(GDS_USER_INFO.BRCH_ID)
			   + " P_USR_NM=" + quote(EDT_HNA_CHG_USR_NM.Text);
			   	
			   	
	var retArr = gfn_openPopup(this, "CP::CPAB04P01.xml", params, true);

	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"HNA_CHG_USR", retArr[0]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"HNA_CHG_USR_NM", retArr[1]);
	DS_AFFAIR_MST.SetColumn(DS_AFFAIR_MST.curRow,"PRS_CHG_USR", retArr[1]);	// ��������ڸ��� �ϳ��������

}





//*------------------------------------------------------------------------------------------------
//* �Լ�����     : �˾�
//* �Լ�����     : 
//* parameter    : 
//* return value : ����
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

	// �Ƿ� ä�ǻ�
	if(cur_bnd_seq_col == "REQ_BND_SEQ")
	{	
		tmp_seq_code = "REQ_BND_SEQ";
		tmp_nm_code = "REQ_BND_NM";
		tmp_sts_code = "REQ_BND_STS";
		tmp_bar_code = "REQ_BAR";
		tmp_acp_mtd = "";
	}
	// ����1
	else if(cur_bnd_seq_col == "BND_SEQ_1")
	{	
		tmp_seq_code = "BND_SEQ_1";
		tmp_nm_code = "BND_NM_1";
		tmp_sts_code = "PRS_STS_1";
		tmp_bar_code = "BAR_1";
		//tmp_acp_mtd = "ACP_MTD_1";
	}
	// ����2
	else if(cur_bnd_seq_col == "BND_SEQ_2")
	{	
		tmp_seq_code = "BND_SEQ_2";
		tmp_nm_code = "BND_NM_2";
		tmp_sts_code = "PRS_STS_2";
		tmp_bar_code = "BAR_2";
		//tmp_acp_mtd = "ACP_MTD_2";
	}
	
	// ä�ǻ�� �˾�
	if(p_type == "bnd_seq")
	{
	
		// �Ķ���� ���� �ް� �����ͼ� �����
		tmp_seq_val = DS_AFFAIR_DTL.GetColumn(nRow,tmp_seq_code);
		tmp_nm_val = DS_AFFAIR_DTL.GetColumn(nRow,tmp_nm_code);

		//  �������� Ŭ����
		DS_AFFAIR_DTL.SetColumn(nRow,tmp_seq_code, "");
		DS_AFFAIR_DTL.SetColumn(nRow,tmp_nm_code, "");
		
		var params = "P_BRCH_ID="+quote(GDS_USER_INFO.BRCH_ID) 
					+ " P_BND_NM=" + quote(tmp_nm_val)
					;
						
		var retArr = gfn_openPopup(this, "CP::CPAB05P01.xml", params, true);
		
		// ���� ������ �ش� ä�ǻ��� ���� ���µ� ����
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
			
			// ����� ���ڵ带 ��� �ٲٵ��� �Ѵ�.
			// �ֳĸ� �Ƿ�ä�ǻ� ��ϵǸ� ����1�� �Ƿ� ä�ǻ�� ���� ���ڵ�� �����ǳ� ����1�� �ٲٸ� ���ڵ嵵 �ٲ��� �Ѵ�.
			DS_AFFAIR_DTL.SetColumn(nRow,tmp_bar_code, retArr[12]);
					
			
			//DS_AFFAIR_DTL.SetColumn(nRow,tmp_acp_mtd, retArr[5]);
		}
	}
	// ä�ǻ� ������� �˾�
	else if(p_type == "prs_sts")	
	{
		//  �������� Ŭ����
		// �����Ҷ� Ŭ���� �ϱ� 
		//DS_AFFAIR_DTL.SetColumn(nRow,tmp_sts_code, "");
		
		var params = "P_STS_CODE_NM="+DS_AFFAIR_DTL.GetColumn(nRow,tmp_sts_code+"_NM");
		
//trace('params='+params);				
						
		var retArr = gfn_openPopup(this, "CP::CPAB05P03.xml", params, true);
		
		// ���� ������ ������ ���� �ƴϸ� �����
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
//* �Լ�����     : �ϺθŰ��˾�
//* �Լ�����     : 
//* parameter    : 
//* return value : �ȶ��
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


	// �Ƿ� ä�ǻ�
	if(cur_bnd_seq_col == "REQ_BND_SEQ")
	{	
		tmp_seq_code = "REQ_BND_SEQ";
		tmp_nm_code = "REQ_BND_NM";
		tmp_next_seq_code = "BND_SEQ_1";
		tmp_next_nm_code = "BND_NM_1";
		
		DS_AFFAIR_DTL.SetColumn(nRow,"REQ_BND_STS", "120");
		DS_AFFAIR_DTL.SetColumn(nRow,"REQ_BND_STS_NM", "�ϺθŰ�");
	}
	// ����1
	else if(cur_bnd_seq_col == "BND_SEQ_1")
	{	
		tmp_seq_code = "BND_SEQ_1";
		tmp_nm_code = "BND_NM_1";
		tmp_next_seq_code = "BND_SEQ_2";
		tmp_next_nm_code = "BND_NM_2";
		
		DS_AFFAIR_DTL.SetColumn(nRow,"PRS_STS_1", "120");
		DS_AFFAIR_DTL.SetColumn(nRow,"PRS_STS_1_NM", "�ϺθŰ�");		
	}
	// ����2
	else if(cur_bnd_seq_col == "BND_SEQ_2")
	{	
		tmp_seq_code = "BND_SEQ_2";
		tmp_nm_code = "BND_NM_2";
		tmp_next_seq_code = "";
		tmp_next_nm_code = "";

		DS_AFFAIR_DTL.SetColumn(nRow,"PRS_STS_2", "120");
		DS_AFFAIR_DTL.SetColumn(nRow,"PRS_STS_2_NM", "�ϺθŰ�");		
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


		// ���� �ϺθŰ� ��� ���� ������ �ӽ� ������ �¿� ��´�.
		cur_affair_dtl.ClearData();
		cur_affair_dtl.CopyF("DS_AFFAIR_DTL");
		cur_affair_dtl.Filter("DTL_SEQ = '"+DS_AFFAIR_DTL.GetColumn(nRow,"DTL_SEQ")+"'");
		
		
		// �ϺθŰ��� GDS_SEL_BOND_LST �۷ι� �����ͼ¿� ����.
		// ù��° �ุ ���� �࿡ �ְ� ��° �� ���ʹ� ���߰� �Ѵ�.
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
				
				// �켱 ������ �� �ְ� ���ŷ� ä����
				for(var col=0;col<cur_affair_dtl.colcount;col++)
				{
					DS_AFFAIR_DTL.CopyColumn(tRow,col,cur_affair_dtl,0,col);
				}
				

				// ���氪�� ����
				DS_AFFAIR_DTL.SetColumn(tRow,"FLAG","I");	// �߰� FLAG �ֱ�
				DS_AFFAIR_DTL.SetColumn(tRow,"ROW_ID","");	// ROW_ID(��ȸ�� ���õ�)
				DS_AFFAIR_DTL.SetColumn(tRow,"OPERATOR", GDS_USER_INFO.GetColumn(0, "USR_ID"));// �����, ������ �ֱ�
				DS_AFFAIR_DTL.SetColumn(tRow,"CHK","1");	// ����
				
				DS_AFFAIR_DTL.SetColumn(tRow,"BRCH_ID", DS_AFFAIR_DTL.GetColumn(nRow, "BRCH_ID"));// 
				DS_AFFAIR_DTL.SetColumn(tRow,"AFF_SEQ", DS_AFFAIR_DTL.GetColumn(nRow, "AFF_SEQ"));// 
				
				DS_AFFAIR_DTL.SetColumn(tRow,"DTL_SEQ", '');//  ����� �ڵ� �ο�
				DS_AFFAIR_DTL.SetColumn(tRow,"GRP_CD", DS_AFFAIR_DTL.GetColumn(nRow, "GRP_CD"));// �׷��ڵ�� ���� ���� ���� �׷��ڵ� 
				DS_AFFAIR_DTL.SetColumn(tRow,"GRP_SEQ", '');// 	   �׷쳻����(������)
				DS_AFFAIR_DTL.SetColumn(tRow,"REQ_SEQ", '');// �Ƿڼ����� ���� 
				DS_AFFAIR_DTL.SetColumn(tRow,"SORT_NO", '');// ��¼���(������) 
				DS_AFFAIR_DTL.SetColumn(tRow,"PRT_EDT_YN", 'Y');// �⺻���
				DS_AFFAIR_DTL.SetColumn(tRow,"PRT_YN", '1');// �⺻���				
				
				DS_AFFAIR_DTL.SetColumn(tRow,"CLOSE_YN", 'N');// �̸��� 
				DS_AFFAIR_DTL.SetColumn(tRow,tmp_next_seq_code, GDS_SEL_BOND_LST.GetColumn(i, "BND_SEQ"));
				DS_AFFAIR_DTL.SetColumn(tRow,tmp_next_nm_code, GDS_SEL_BOND_LST.GetColumn(i, "BND_NM"));			
			
			}
			
		}
		
		// �߰��� �ϺθŰ��� ���� �� �����Ƿ� ���� �׷��ڵ��� ������ �� ���� �Ѵ�.
		fn_set_grp_sort(DS_AFFAIR_DTL.GetColumn(nRow, "AFF_SEQ"), DS_AFFAIR_DTL.GetColumn(nRow, "GRP_CD"));
		
		// ���� �ٽ� �ű�� 
		fn_set_dtl_sort(DS_AFFAIR_MST.GetColumn(0, "AFF_SEQ"));
		
		DS_AFFAIR_DTL.FireEvent = true;	

	}	
}



//*------------------------------------------------------------------------------------------------
//* �Լ�����     : �����߱޳����� ���
//* �Լ�����     : 
//* parameter    : 
//* return value : ����
//* ���         :
//*-----------------------------------------------------------------------------------------------
function fn_print_doc()
{
	
	var mrd = "";
	var param = "";
	
	
	// �⺻������ ���õ��� ������ ��� 
	if(length(DS_AFFAIR_MST.GetColumn(DS_AFFAIR_MST.curRow,"AFF_SEQ")) == 0)
	{
		gfn_popup_message("modal", "error", "���� �߱޳������� ����� ��Ǳ⺻������ �����ϼ���. ", "Ȯ��");
		return;
	}		

	
	// �Ǻ��� �Ⱓ�� �����߱޳����� Ʋ��
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


	// ����ߴٰ� �÷��� �ޱ�
	prtDoc = "N";


}

//*------------------------------------------------------------------------------------------------
//* �Լ�����     : ä�ǻ� ������� �������� 
//* �Լ�����     : 
//* parameter    : 
//* return value : ����
//* ���         :
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



// �ߺ� üũ
// 2014.02.20 �ߺ�üũ���� ���� ���� üũ�ϸ� �ش� ä�ǻ��� ������ �߱�/�ߺ����� �Ȱ��� �� �ʱ�ȭ/�ݾ׵� �ʱ�ȭ 
function fn_check_duple(c_row, c_col)
{
	var isDup;	// �ߺ����� 
	var bnd_seq = DS_AFFAIR_DTL.GetColumn(c_row, c_col);
	var tmp_prs_sts = DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS");
	
	
	trace('///////////////// �ߺ�üũ ���� =>'+bnd_seq + '/' + tmp_prs_sts)	;	


	if(length(bnd_seq) > 0)
	{
		isDup = false;
		
		for(var i=0;i<DS_AFFAIR_DTL.rowcount;i++)
		{
			
			trace('dup row/bnd_seq='+i+'/'+bnd_seq);
			trace('BND_SEQ_1/BND_SEQ_2=>'+ DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_1") +'/'+ DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_2"));
			trace('PRS_STS_1/PRS_STS_2=>'+ DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_1") +'/'+ DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_2"));


			
			// �߱�, �߱�����, �߱޿���, �ߺ�, ��������̸� ���� ������ �������� ������ 
			// �Ƿ�ä�ǻ�
			// �Ƿ�ä�ǻ���� �ߺ�üũ ä�ǻ��� �����ϰ� ä�ǻ�1�� ������ �Ƿ�ä�ǻ� => ä�ǻ�1 ���� �� �߱�ó�� 
			if(DS_AFFAIR_DTL.GetColumn(i, "REQ_BND_SEQ") == bnd_seq && length(DS_AFFAIR_DTL.GetColumn(i, "BND_NM_1")) == 0)
			{
				trace('REQ_BND_SEQ ���� =>' +i+ '/' + bnd_seq);
				
				DS_AFFAIR_DTL.SetColumn(i, "BND_SEQ_1", DS_AFFAIR_DTL.GetColumn(i, "REQ_BND_SEQ"));
				DS_AFFAIR_DTL.SetColumn(i, "BND_NM_1", DS_AFFAIR_DTL.GetColumn(i, "REQ_BND_NM"));
				DS_AFFAIR_DTL.SetColumn(i, "BAR_1", DS_AFFAIR_DTL.GetColumn(i, "REQ_BAR"));
				
				//DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1", DS_AFFAIR_DTL.GetColumn(i, "REQ_BND_STS"));
				//DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1_NM", DS_AFFAIR_DTL.GetColumn(i, "REQ_BND_STS_NM"));			
			
			}
			
			
			// ��������, �߱޺Ұ�, �Ƿ����, �ϳ�, �Ű� ����
			// ����1
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
			 
				trace('����1 üũ ����>>' + DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_1"));
			 
				// ä�ǻ� ����
				
				trace('check='+ DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_1") +'=='+ bnd_seq);
				
				if(DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_1") == bnd_seq )
				 {
					trace('BND_SEQ_1 ���� =>' +i+ '/' + bnd_seq);
					
					// ���� ���ð��� �������� �����ϰ� ������ ����̱� ������ �߱�/�ߺ� ������ 
					if(tmp_prs_sts != '' && tmp_prs_sts != '100')
					{
						
						// ó���϶� 
						if(isDup == false)
						{
							DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1", "210");
							DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1_NM", "�߱�");
							
							// �߱޻��� ������, ��������� �ڵ� �ֱ�
							// ���Ϸ�, ���ݿϷ�, ���+�ݼۿϷ�� 
							fn_chrg_amt(i, DS_AFFAIR_DTL.GetColumn(i, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_1"),DS_AFFAIR_DTL.GetColumn(i, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(i, "DTL_SEQ"));
							
							
							// ä�ǻ簡 �ſ���ȸ�� ��������ῡ  �ſ���ȸ ������ �ֱ� 
							// ���������� 0
							if(DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_1") == '6235')
							{
								DS_AFFAIR_DTL.SetColumn(i, "ISU_DEB", 0);	// ��ä			
								DS_AFFAIR_DTL.SetColumn(i, "ISU_COC", 0);	// ����
								DS_AFFAIR_DTL.SetColumn(i, "ISU_BNK", 0);	// ����
								DS_AFFAIR_DTL.SetColumn(i, "ISU_CARD", 0);	// ī��	
								DS_AFFAIR_DTL.SetColumn(i, "ISU_CRDT", 1);	// �ſ�					
								
								DS_AFFAIR_DTL.SetColumn(i, "BNK_CHRG", ToNumber(GDS_BRCH_BAS.GetColumn(0,"CRDT_AMT")));
								DS_AFFAIR_DTL.SetColumn(i, "AGC_CHRG", ToNumber(GDS_BRCH_BAS.GetColumn(0,"CRDT_AMT2")));
							}							
							
							
							
							
							
							isDup = true;
						}
						else
						{
							DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1", "220");
							DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1_NM", "�߱�");
							DS_AFFAIR_DTL.SetColumn(i, "PRS_NOTE_1", "(�ٸ��ǰ��ߺ�(û��X))");
							DS_AFFAIR_DTL.SetColumn(i, "ISU_DEB", 0);	// ��ä			
							DS_AFFAIR_DTL.SetColumn(i, "ISU_COC", 0);	// ����
							DS_AFFAIR_DTL.SetColumn(i, "ISU_BNK", 0);	// ����
							DS_AFFAIR_DTL.SetColumn(i, "ISU_CARD", 0);	// ī��		
							DS_AFFAIR_DTL.SetColumn(i, "BNK_CHRG", "0");
							DS_AFFAIR_DTL.SetColumn(i, "AGC_CHRG", "0");	
						} 
					}
					else
					{
						DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1", "");
						DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1_NM", "");
						DS_AFFAIR_DTL.SetColumn(i, "PRS_NOTE_1", "");
						DS_AFFAIR_DTL.SetColumn(i, "ISU_DEB", 0);	// ��ä			
						DS_AFFAIR_DTL.SetColumn(i, "ISU_COC", 0);	// ����
						DS_AFFAIR_DTL.SetColumn(i, "ISU_BNK", 0);	// ����
						DS_AFFAIR_DTL.SetColumn(i, "ISU_CARD", 0);	// ī��		
						DS_AFFAIR_DTL.SetColumn(i, "BNK_CHRG", "");
						DS_AFFAIR_DTL.SetColumn(i, "AGC_CHRG", "");				
					}
					
				}
			 }				
			
			
			// �߱�, �߱�����, �߱޿���, ��������̸� ���� ������ �������� ������ 
			// ����2
			// ����2�� �������� üũ ����
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
			 
				trace('����2 üũ ����>>' + DS_AFFAIR_DTL.GetColumn(i, "PRS_STS_2"));
			 
			 
				// ä�ǻ� ����
				if(DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_2") == bnd_seq )
				 {
					
					trace('BND_SEQ_2 ���� =>' +i+ '/' + bnd_seq);
					
	
					// ���� ���ð��� �������� �����ϰ� ������ ����̱� ������ �߱�/�ߺ� ������ 
					if(tmp_prs_sts != '' && tmp_prs_sts != '100')
					{
					
						// ó���϶� 
						if(isDup == false)
						{
							DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_2", "210");
							DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_2_NM", "�߱�");
							
							// �߱޻��� ������, ��������� �ڵ� �ֱ�
							fn_chrg_amt(i, DS_AFFAIR_DTL.GetColumn(i, "BRCH_ID"), DS_AFFAIR_MST.GetColumn(0, "TUB_SEQ"), DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_2"),DS_AFFAIR_DTL.GetColumn(i, "AFF_SEQ"),DS_AFFAIR_DTL.GetColumn(i, "DTL_SEQ"));
							

							// ä�ǻ簡 �ſ���ȸ�� ��������ῡ  �ſ���ȸ ������ �ֱ� 
							// ���������� 0
							if(DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_2") == '6235')
							{
								DS_AFFAIR_DTL.SetColumn(i, "ISU_DEB", 0);	// ��ä			
								DS_AFFAIR_DTL.SetColumn(i, "ISU_COC", 0);	// ����
								DS_AFFAIR_DTL.SetColumn(i, "ISU_BNK", 0);	// ����
								DS_AFFAIR_DTL.SetColumn(i, "ISU_CARD", 0);	// ī��	
								DS_AFFAIR_DTL.SetColumn(i, "ISU_CRDT", 1);	// �ſ�					
								
								DS_AFFAIR_DTL.SetColumn(i, "BNK_CHRG", ToNumber(GDS_BRCH_BAS.GetColumn(0,"CRDT_AMT")));
								DS_AFFAIR_DTL.SetColumn(i, "AGC_CHRG", ToNumber(GDS_BRCH_BAS.GetColumn(0,"CRDT_AMT2")));
							}								
							
							isDup = true;
						}
						else
						{
							DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_2", "220");
							DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_2_NM", "�߱�");
							DS_AFFAIR_DTL.SetColumn(i, "PRS_NOTE_2", "(�ٸ��ǰ��ߺ�(û��X))");
							DS_AFFAIR_DTL.SetColumn(i, "ISU_DEB", 0);	// ��ä			
							DS_AFFAIR_DTL.SetColumn(i, "ISU_COC", 0);	// ����
							DS_AFFAIR_DTL.SetColumn(i, "ISU_BNK", 0);	// ����
							DS_AFFAIR_DTL.SetColumn(i, "ISU_CARD", 0);	// ī��		
							DS_AFFAIR_DTL.SetColumn(i, "BNK_CHRG", "0");
							DS_AFFAIR_DTL.SetColumn(i, "AGC_CHRG", "0");
						} 

					}
					else
					{
						DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_2", "");
						DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_2_NM", "");
						DS_AFFAIR_DTL.SetColumn(i, "PRS_NOTE_2", "");
						DS_AFFAIR_DTL.SetColumn(i, "ISU_DEB", 0);	// ��ä			
						DS_AFFAIR_DTL.SetColumn(i, "ISU_COC", 0);	// ����
						DS_AFFAIR_DTL.SetColumn(i, "ISU_BNK", 0);	// ����
						DS_AFFAIR_DTL.SetColumn(i, "ISU_CARD", 0);	// ī��		
						DS_AFFAIR_DTL.SetColumn(i, "BNK_CHRG", "");
						DS_AFFAIR_DTL.SetColumn(i, "AGC_CHRG", "");				
					}				
				}
			 }				
		}
	}

trace('///////////////// �ߺ�üũ �Ϸ� =>'+bnd_seq+ '/' + tmp_prs_sts)	;	

}




// �ڵ� ��ü ����
function fn_check_auto(c_row, c_col)
{
	var bnd_seq = DS_AFFAIR_DTL.GetColumn(c_row, c_col);
	var tmp_prs_sts = DS_AFFAIR_DTL.GetColumn(c_row, "TMP_PRS_STS");
	
	
//	trace('///////////////// ��ü���� ���� =>'+bnd_seq + '/' + tmp_prs_sts)	;	


	if(length(bnd_seq) > 0)
	{
		
		for(var i=0;i<DS_AFFAIR_DTL.rowcount;i++)
		{
			
			// �Ƿ�ä�ǻ�
			// �Ƿ�ä�ǻ���� �ߺ�üũ ä�ǻ��� �����ϰ� ä�ǻ�1�� ������ �Ƿ�ä�ǻ� => ä�ǻ�1 ���� �� �߱�ó�� 
			if(DS_AFFAIR_DTL.GetColumn(i, "REQ_BND_SEQ") == bnd_seq && length(DS_AFFAIR_DTL.GetColumn(i, "BND_NM_1")) == 0)
			{
//				trace('REQ_BND_SEQ ���� =>' +i+ '/' + bnd_seq);
				
				DS_AFFAIR_DTL.SetColumn(i, "BND_SEQ_1", DS_AFFAIR_DTL.GetColumn(i, "REQ_BND_SEQ"));
				DS_AFFAIR_DTL.SetColumn(i, "BND_NM_1", DS_AFFAIR_DTL.GetColumn(i, "REQ_BND_NM"));
				DS_AFFAIR_DTL.SetColumn(i, "BAR_1", DS_AFFAIR_DTL.GetColumn(i, "REQ_BAR"));
				//DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1", DS_AFFAIR_DTL.GetColumn(i, "REQ_BND_STS"));
				//DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1_NM", DS_AFFAIR_DTL.GetColumn(i, "REQ_BND_STS_NM"));			
			
			}			
			
			
			// ����1
			// ä�ǻ� ����
			//trace('check1='+ DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_1") +'=='+ bnd_seq);
			
			if(DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_1") == bnd_seq )
			 {
				//trace('BND_SEQ_1 ���� =>' +i+ '/' + bnd_seq);
				
				DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1", tmp_prs_sts);
				DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_1_NM", gfn_getCodeName("AD03",tmp_prs_sts));
			
				setPrsNote(i, "PRS_STS_1");
			
			
			}
			 				
			
			//  ��������̸� ���� ������ �������� ������ 
			// ����2
			// ä�ǻ� ����
			//trace('check2='+ DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_2") +'=='+ bnd_seq);
			
			if(DS_AFFAIR_DTL.GetColumn(i, "BND_SEQ_2") == bnd_seq )
			 {
				//trace('BND_SEQ_2 ���� =>' +i+ '/' + bnd_seq);
				
				DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_2", tmp_prs_sts);
				DS_AFFAIR_DTL.SetColumn(i, "PRS_STS_2_NM", gfn_getCodeName("AD03",tmp_prs_sts));
				
				setPrsNote(i, "PRS_STS_2");
			}
		}
	}

//trace('///////////////// ��ü���� �Ϸ� =>'+bnd_seq+ '/' + tmp_prs_sts)	;	

}


// ���� �������� ����
// ���������� ������ ����. 
function getIsNextBnd(c_row, next_bnd_seq_col)
{
	var retIsNextBnd = false;	// ���� ���� �ִ��� ����
    
    ds_dtl_temp.ClearData();
	ds_dtl_temp.CopyF("DS_AFFAIR_DTL");

    // ����ä�ǻ� ����
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
        // �߱�, �߱޿���, �ߺ�, ���鸸 üũ
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




// ���� ä�ǻ� �����ϱ�
function fn_reset_bond_info(obj_dataset, c_row, bnd_seq_col)
{
	obj_dataset.SetColumn(c_row, "BNK_CHRG", 0);	// ���������
	obj_dataset.SetColumn(c_row, "AGC_CHRG", 0);	// ���������
	obj_dataset.SetColumn(c_row, "ISU_DEB", 0);	// ��ä			
	obj_dataset.SetColumn(c_row, "ISU_COC", 0);	// ����
	obj_dataset.SetColumn(c_row, "ISU_BNK", 0);	// ����
	obj_dataset.SetColumn(c_row, "ISU_CARD", 0);	// ī��
	
	if(bnd_seq_col == "BND_SEQ_1")
	{
		obj_dataset.SetColumn(c_row, "PRS_NOTE_1", "");	// ä�ǻ�1���
	}
	
	if(bnd_seq_col == "BND_SEQ_2")
	{
		obj_dataset.SetColumn(c_row, "PRS_NOTE_2", "");	// ä�ǻ�2���
	}
}




// ������ 
// 2014.02.21 ��ä+����+ī�忡 ���� ��������� ����
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
	
	
	// ��������� ����
	// ��ä+����+ī�� => ��������� + 2000 + 2000
	// ��ä+���� => ��������� + 2000
	// ��ä+ī�� => ��������� + 2000
	
	
	
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


    // ���Ϸ�
    if(DS_AFFAIR_DTL.GetColumn(nRow, "TMP_PRS_STS") == "330")
    {
        // ���Ϸ� = ��������� + 2020
        // ��������Ḹ �ٲ� 
        bnk_chrg += ToNumber(GDS_BRCH_BAS.GetColumn(0,"REGS_AMT"));

    }

    // ���ݿϷ�
    if(DS_AFFAIR_DTL.GetColumn(nRow, "TMP_PRS_STS") == "350")
    {
        // ��������Ḹ �ٲ� 
        bnk_chrg += ToNumber(GDS_BRCH_BAS.GetColumn(0,"RMT_AMT"));
    }		

    // ���+�ݼۿϷ�
    if(DS_AFFAIR_DTL.GetColumn(nRow, "TMP_PRS_STS") == "360")
    {
        // ��������Ḹ �ٲ� 
        bnk_chrg +=  ToNumber(GDS_BRCH_BAS.GetColumn(0,"REGS_AMT")) * 2;
    }    


	
//	trace('aff_seq/dtl_seq/tub_seq/bnd_seq/bnk_chrg/agc_chrg='+aff_seq+'/'+dtl_seq+'/'+tub_seq+'/'+bnd_seq+'/'+bnk_chrg+'/'+agc_chrg);
	
	    
	// ����� �ֱ�
	DS_AFFAIR_DTL.SetColumn(nRow, "BNK_CHRG", bnk_chrg);	// ���������     AGC_AMT
	DS_AFFAIR_DTL.SetColumn(nRow, "AGC_CHRG", agc_chrg);	// ���������     AGC_CHRG
	
//	alert('set=>'+aff_seq+'/'+dtl_seq+'/'+tub_seq+'/'+bnd_seq+'/'+bnk_chrg+'/'+agc_chrg);
	
}	    






