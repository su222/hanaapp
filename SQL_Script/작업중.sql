SELECT /* û����������Ʈ */
             'N' AS FLAG,
              ' ' AS ROW_ID,
              '0' AS CHK,
               'komm' /**P*/ AS OPERATOR,
             NVL(A.BRCH_ID,' ') AS BRCH_ID,
             NVL(A.TUB_SEQ,'-99999') AS TUB_SEQ,
             '-99999' AS ASK_SEQ,
              '20140314' /**P*/ AS ASK_DT,
             NVL(A.TUB_NM,' ') AS TUB_NM,
             NVL(C.SIN_NM,' ') AS SIN_NM,
             NVL(C.UNP_AMT,'-99999') AS UNP_AMT,
             
             -- �ΰ�������, �ΰ�������, �����ΰ�������, �����ΰ�������
             
             -- ���ް�
             NVL(NVL(CASE
                  WHEN C.BIL_GBN = 'ALLY' THEN TRUNC(SUM(B.OCC_AMT) )  -- �ΰ�������
                  WHEN C.BIL_GBN = 'ALLN' THEN TRUNC(SUM(B.OCC_AMT) * 10 / 11 )  -- �ΰ��������̸� �ΰ����� �� �ݾ��� ���ް� �̴�.
                  WHEN C.BIL_GBN = 'AGCY' THEN TRUNC(SUM(B.AGC_CHRG) )  -- �����ΰ�������
                  WHEN C.BIL_GBN = 'AGCN' THEN TRUNC(SUM(B.AGC_CHRG) * 10 / 11 )  -- �����ΰ�������
                  ELSE SUM(B.OCC_AMT)
             END,0),'-99999') AS  OCC_AMT, 
             
             -- �ΰ��� 
             NVL(NVL(CASE
                  WHEN C.BIL_GBN = 'ALLY' THEN SUM(B.OCC_AMT) / 10  -- �ΰ�������
                  WHEN C.BIL_GBN = 'ALLN' THEN TRUNC(SUM(B.OCC_AMT) / 11)  -- �ΰ�������
                  WHEN C.BIL_GBN = 'AGCY' THEN SUM(B.AGC_CHRG) / 10  -- �����ΰ�������
                  WHEN C.BIL_GBN = 'AGCN' THEN TRUNC(SUM(B.AGC_CHRG) / 11)  -- �����ΰ�������
                  ELSE 0
             END,0),'-99999') AS  VAT_AMT, 
             
             NVL(C.UNP_AMT,0) 
             + NVL(CASE
                  WHEN C.BIL_GBN = 'ALLY' THEN TRUNC(SUM(B.OCC_AMT) )  -- �ΰ�������
                  WHEN C.BIL_GBN = 'ALLN' THEN TRUNC(SUM(B.OCC_AMT) * 10 / 11 )  -- �ΰ��������̸� �ΰ����� �� �ݾ��� ���ް� �̴�.
                  WHEN C.BIL_GBN = 'AGCY' THEN TRUNC(SUM(B.AGC_CHRG) )  -- �����ΰ�������
                  WHEN C.BIL_GBN = 'AGCN' THEN TRUNC(SUM(B.AGC_CHRG) * 10 / 11 )  -- �����ΰ�������
                  ELSE SUM(B.OCC_AMT)
             END,0)
             + NVL(CASE
                  WHEN C.BIL_GBN = 'ALLY' THEN SUM(B.OCC_AMT) / 10  -- �ΰ�������
                  WHEN C.BIL_GBN = 'ALLN' THEN TRUNC(SUM(B.OCC_AMT) / 11)  -- �ΰ�������
                  WHEN C.BIL_GBN = 'AGCY' THEN SUM(B.AGC_CHRG) / 10  -- �����ΰ�������
                  WHEN C.BIL_GBN = 'AGCN' THEN TRUNC(SUM(B.AGC_CHRG) / 11)  -- �����ΰ�������
                  ELSE 0
             END,0) AS  ASK_AMT, 
             NVL((SELECT TO_CHAR(MAX(ASK_DT), 'YYYYMMDD')
                FROM TB_AC_TIEUPASK_MST
               WHERE BRCH_ID = A.BRCH_ID
                 AND TUB_SEQ = A.TUB_SEQ
                 AND TO_DATE(  '20140314' /**P*/) > ASK_DT 
             ), ' ') AS LST_ASK_DT,
             NVL(FC_CC_GET_CODENAME('AC05', C.DOC_CARY),' ')   AS DOC_CARY,
             NVL(TO_CHAR(NVL(C.LST_DEAL_DT, TO_DATE('20000101')) + 1 ,'YYYYMMDD'),' ')  AS BAS_ST_DT,
             NVL(TO_CHAR(TO_DATE( '20140314' /**P*/),'YYYYMMDD'),' ')   AS BAS_ED_DT,
             NVL(TO_CHAR(A.ASK_EXP_DT, 'YYYYMMDD'),' ') AS ASK_EXP_DT       
        FROM TB_AC_AFFAIR_MST A,
             (SELECT BRCH_ID, AFF_SEQ,
                     SUM(BNK_CHRG) AS BNK_CHRG,
                     SUM(AGC_CHRG) AS AGC_CHRG,
                     NVL(SUM(BNK_CHRG),0) + NVL(SUM(AGC_CHRG),0) AS OCC_AMT               
                FROM TB_AC_AFFAIR_DTL
               GROUP BY BRCH_ID, AFF_SEQ
             ) B, TB_CC_TIEUP_LST C
       WHERE A.BRCH_ID = B.BRCH_ID
         AND A.BRCH_ID = C.BRCH_ID
         AND A.AFF_SEQ = B.AFF_SEQ
         AND A.TUB_SEQ = C.TUB_SEQ
         AND A.BRCH_ID =   'H10' /**P*/
           AND (C.TUB_SEQ LIKE   '' /**P*/ || '%' 
                OR C.TUB_NM LIKE '%' ||  '' /**P*/ || '%'
                OR C.SIN_NM LIKE '%' ||  '' /**P*/ || '%'
               )
           AND NVL(A.DOC_CARY, ' ') LIKE  '' /**P*/ || '%'    
           AND (( 'A' /**P*/  = 'N' AND A.ASK_EXP_DT BETWEEN  '20140314' /**P*/ AND TO_DATE( '20140314' /**P*/) + 0.99999  AND C.SIN_GBN = 'DA')  -- ����(�Ⱓ)
               OR ( 'A' /**P*/  = 'T' AND A.ASK_EXP_DT >=  '20140314' /**P*/ AND C.SIN_GBN = 'DA') -- ��ü(�Ⱓ)
               OR ( 'A' /**P*/  = 'A' AND 1=1)  -- ���(��ü) 
               OR ( 'A' /**P*/  = 'Z' AND C.SIN_GBN = 'CO')  -- �Ǻ�
               )
         AND A.AFF_PRS_STS IN ('20', '25') -- ��������, �߰����� 
         AND A.TUB_SEQ = 6000000
      GROUP BY A.BRCH_ID,
             A.TUB_SEQ,
             A.TUB_NM,
             C.BIL_GBN,
             C.SIN_NM,
             C.UNP_AMT,
             C.LST_DEAL_DT,
             A.ASK_EXP_DT,
             C.DOC_CARY
      ORDER BY A.TUB_SEQ
