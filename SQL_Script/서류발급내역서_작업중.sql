-- 서류발급내역서

SELECT /*서류발급내역서*/
       A.TUB_NM,
       A.CHG_NM,
       NULL AS SAMU_NM,
       A.CLT_NM,
       SUBSTR(A.CLT_JMN,1,6) ||'-*******' AS CLT_JMN,
       SUBSTR(A.CLT_TEL,1,3) ||'-'||SUBSTR(A.CLT_TEL,4,4) ||'-'||SUBSTR(A.CLT_TEL,8) AS CLT_TEL,
       A.HNA_CHG_USR_NM,
       NULL AS HNA_CHG_USR_NM2,
       TO_CHAR(A.AFF_ST_DT,'YYYY-MM-DD') AS AFF_ST_DT,
       TO_CHAR(A.AFF_ED_DT,'YYYY-MM-DD') AS AFF_ED_DT,
       DEB_CNT,
       COC_CNT,
       BNK_CNT,
       CARD_CNT,
       CRDT_CNT,
       BNK_CHRG,
       AGC_CHRG,
       NVL(BNK_CHRG,0) + NVL(AGC_CHRG,0) AS TOT_CHRG
  FROM TB_AC_AFFAIR_MST A, 
       (SELECT BRCH_ID, AFF_SEQ,
              SUM(CASE WHEN ISU_DEB = 'Y' THEN 1 END) AS DEB_CNT,
              SUM(CASE WHEN ISU_COC = 'Y' THEN 1 END) AS COC_CNT,
              SUM(CASE WHEN ISU_BNK = 'Y' THEN 1 END) AS BNK_CNT,
              SUM(CASE WHEN ISU_CARD = 'Y' THEN 1 END) AS CARD_CNT,
              SUM(CASE WHEN ISU_CRDT = 'Y' THEN 1 END) AS CRDT_CNT,
              SUM(BNK_CHRG) AS BNK_CHRG,
              SUM(AGC_CHRG) AS AGC_CHRG              
         FROM TB_AC_AFFAIR_DTL
        GROUP BY BRCH_ID, AFF_SEQ       
       ) B
 WHERE A.BRCH_ID = B.BRCH_ID(+)
   AND A.AFF_SEQ = B.AFF_SEQ(+)
   AND A.BRCH_ID = 'H10'
   AND A.AFF_SEQ = 10149



-- 진행상태

SELECT REQ_BND_NM,
       REQ_BND_STS_NM,
       BND_NM_1,
       PRS_STS_1_NM,
       BND_NM_2,
       PRS_STS_2_NM,
       BND_NM_3,
       PRS_STS_3_NM,
       SUBSTR(DOC_TYP,1,LENGTH(DOC_TYP)-1) AS DOC_TYP,
       BNK_CHRG,
       AGC_CHRG
  FROM (SELECT 
               SORT_NO,
               DTL_SEQ,
               REQ_BND_NM,
               FC_CC_GET_CODENAME('AD03', REQ_BND_STS) AS REQ_BND_STS_NM,
               BND_NM_1,
               FC_CC_GET_CODENAME('AD03', PRS_STS_1) AS PRS_STS_1_NM,
               BND_NM_2,
               FC_CC_GET_CODENAME('AD03', PRS_STS_2) AS PRS_STS_2_NM,
               BND_NM_3,
               FC_CC_GET_CODENAME('AD03', PRS_STS_3) AS PRS_STS_3_NM,
               DECODE(ISU_DEB, 'Y','부채,','') ||
               DECODE(ISU_COC, 'Y','내용,','') ||
               DECODE(ISU_BNK, 'Y','통장,','') ||
               DECODE(ISU_CARD, 'Y','카드,','') ||
               DECODE(ISU_CRDT, 'Y','신용,','') AS DOC_TYP,
               BNK_CHRG, 
               AGC_CHRG
          FROM TB_AC_AFFAIR_DTL A
         WHERE A.BRCH_ID = 'H10'
           AND A.AFF_SEQ = 10149
     )
 ORDER BY SORT_NO, DTL_SEQ          