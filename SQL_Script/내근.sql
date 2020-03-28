SELECT 
       A.BRCH_ID,
       A.AFF_SEQ,
       B.DTL_SEQ,
       '-99999' AS STS_SEQ,
       'I' AS IOT_GBN,
       C.ACP_MTD,
       ' ' AS ACP_DT,
       A.CLT_NM,
       A.CLT_JMN,
       C.BND_SEQ,
       C.BND_NM,
       '-99999' AS SPT_SEQ,
       ' ' AS SPT_NM,
       C.BND_TEL,
       C.BND_FAX,
       C.BND_ZIP,
       C.BND_ADDR,
       C.CHRG_AMT,
       ' ' AS PRS_NOTE,
       'OPERATOR' AS PRS_CHG_USR       
  FROM TB_AC_AFFAIR_MST A, 
  (SELECT BRCH_ID,
           AFF_SEQ,
           DTL_SEQ,
           B.SEQ AS PRS_STEP,
           CASE 
                WHEN B.SEQ = 1 THEN REQ_BND_SEQ 
                WHEN B.SEQ = 2 THEN BND_SEQ_1
                WHEN B.SEQ = 3 THEN BND_SEQ_2 
           END AS BND_SEQ,
           CASE 
                WHEN B.SEQ = 1 THEN REQ_BND_STS 
                WHEN B.SEQ = 2 THEN PRS_STS_1
                WHEN B.SEQ = 3 THEN PRS_STS_2 
           END AS BND_STS
     FROM TB_AC_AFFAIR_DTL A, COPYT B
    WHERE B.SEQ BETWEEN 1 AND 3    
  ) B, TB_CC_BOND_LST C
 WHERE A.BRCH_ID = B.BRCH_ID
   AND A.BRCH_ID = C.BRCH_ID(+)
   AND A.AFF_SEQ = B.AFF_SEQ
   AND A.AFF_PRS_STS = '10'
   AND B.BND_SEQ IS NOT NULL
   AND NVL(B.BND_STS,'10') = '10'
   AND A.AFF_SEQ = 10259
   
   
   SELECT *
     FROM TB_AC_AFFAIR_DTL
    WHERE AFF_SEQ = 10259
    ORDER BY DTL_SEQ
   
   
      
   
   
select *
  from tb_ac_affair_mst
 where aff_seq = 10259   