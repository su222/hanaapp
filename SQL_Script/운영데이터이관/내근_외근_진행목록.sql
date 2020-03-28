 -- 먼저 데이터 백업

-- 내근진행목록
DROP TABLE TB_AC_AFFAIRPRS_LST_TMP;

 CREATE TABLE TB_AC_AFFAIRPRS_LST_TMP AS 
 SELECT *
   FROM TB_AC_AFFAIRPRS_LST;

-- 내근진행 특이사항 
DROP TABLE TB_AC_AFFAIRPRSNOTE_LST_TMP;

 CREATE TABLE TB_AC_AFFAIRPRSNOTE_LST_TMP AS 
 SELECT *
   FROM TB_AC_AFFAIRPRSNOTE_LST;


   
-- 외근진행목록
DROP TABLE TB_AC_AFFAIROUT_LST_TMP;

 CREATE TABLE TB_AC_AFFAIROUT_LST_TMP AS 
 SELECT *
   FROM TB_AC_AFFAIROUT_LST;
   
   
   
   

-- 기존정보 삭제  
-- 먼저 FK 삭제한다. 
-- 관련파일: FK_삭제

DELETE FROM TB_AC_AFFAIRPRSNOTE_LST;

DELETE FROM TB_AC_AFFAIRPRS_LST;

DELETE FROM TB_AC_AFFAIROUT_LST;

   
   
INSERT INTO TB_AC_AFFAIRPRS_LST
(
BRCH_ID,
AFF_SEQ,
DTL_SEQ,
STS_SEQ,
ACP_DT,
ACP_MTD,
CLT_NM,
CLT_JMN,
PRS_STEP,
BND_SEQ,
BND_NM,
BND_TEL,
BND_FAX,
BND_ADDR,
BND_ZIP,
CHRG_AMT,
PRS_CHG_USR,
SPT_SEQ,
SPT_NM,
REGS_NO,
PRS_STS,
PRS_NOTE,
SORT_NO,
RMT_BNK_NM,
CRT_USR,
CRT_DT,
EDT_USR,
EDT_DT
)
SELECT 'H10' AS BRCH_ID,
        "고객코드" AS AFF_SEQ,
        "진행코드" DTL_SEQ,
        "일지코드" STS_SEQ,
        SUBSTR(접수일,1,9) ACP_DT,
        CASE
             WHEN 접수방법 = '진흥' THEN 'ZZ'
             WHEN 접수방법 = '등기반송' THEN 'DR'
             WHEN 접수방법 = '팩스' THEN 'F'
             WHEN 접수방법 = '원격' THEN 'R'
             WHEN 접수방법 = '등기' THEN 'D'
             WHEN 접수방법 IS NULL THEN 'X'
        END ACP_MTD,
        B.CLT_NM,
        B.CLT_JMN,
        진행단계 PRS_STEP, 
        NVL((SELECT BND_SEQ FROM TB_CC_BOND_LST WHERE BND_NM = 채권사 AND ROWNUM = 1), '99999') BND_SEQ,  -- 구시스템에 있는데 채권사정보에 없으면 코드를 해당으로 다 넣기 
        채권사 BND_NM,
        (SELECT BND_TEL FROM TB_CC_BOND_LST WHERE BND_NM = 채권사 AND ROWNUM = 1) BND_TEL,
        (SELECT BND_FAX FROM TB_CC_BOND_LST WHERE BND_NM = 채권사 AND ROWNUM = 1) BND_FAX,
        (SELECT BND_ADDR FROM TB_CC_BOND_LST WHERE BND_NM = 채권사 AND ROWNUM = 1)  BND_ADDR,
        (SELECT BND_ZIP FROM TB_CC_BOND_LST WHERE BND_NM = 채권사 AND ROWNUM = 1)  BND_ZIP,               
        "발급비용" CHRG_AMT,
        "접수자" PRS_CHG_USR, -- 한글명 들어감 
        NULL SPT_SEQ,
        NULL SPT_NM,
        "등기번호" REGS_NO,
        (SELECT DTL_CD FROM TB_CC_CODE_DTL WHERE MST_CD = 'AD04' AND DTL_NM = 진행여부 AND ROWNUM = 1 ) PRS_STS,
        NULL PRS_NOTE,
        출력순서 SORT_NO,
        접수은행 RMT_BNK_NM,
       'SYSTEM' CRT_USR,
       SYSDATE CRT_DT,
       'SYSTEM' EDT_USR,
       SYSDATE EDT_DT
  FROM 등기업무일지 A, TB_AC_AFFAIR_MST B
 WHERE A.고객코드 = B.AFF_SEQ 
   AND 고객코드 IS NOT NULL
   AND 진행코드 IS NOT NULL
   
 

       
-- 내근진행 특이사항 
INSERT INTO TB_AC_AFFAIRPRSNOTE_LST
(
BRCH_ID,
AFF_SEQ,
DTL_SEQ,
PRS_DT,
STS_SEQ,
NOTE,
CRT_USR,
CRT_DT,
EDT_USR,
EDT_DT
)
SELECT 'H10' AS BRCH_ID,
        (SELECT AFF_SEQ FROM TB_AC_AFFAIRPRS_LST WHERE STS_SEQ = 일지코드) AFF_SEQ,
        (SELECT DTL_SEQ FROM TB_AC_AFFAIRPRS_LST WHERE STS_SEQ = 일지코드) DTL_SEQ,
        NVL(TO_DATE(SUBSTR(등록일자,1,9)), TRUNC(SYSDATE)) + 0.0001 * ROWNUM PRS_DT,
        "일지코드" STS_SEQ,
        특이사항 NOTE,
       'SYSTEM' CRT_USR,
       SYSDATE CRT_DT,
       'SYSTEM' EDT_USR,
       SYSDATE EDT_DT        
  FROM 등기업무일지특이사항
 WHERE (일지코드) IN 
       (SELECT 일지코드 FROM TB_AC_AFFAIRPRS_LST WHERE STS_SEQ = 일지코드);
   

-- 외근업무일지 

INSERT INTO TB_AC_AFFAIROUT_LST
(
BRCH_ID,
AFF_SEQ,
DTL_SEQ,
STS_SEQ,
ACP_DT,
OUT_CHG_USR,
CLT_NM,
CLT_JMN,
PRS_STEP,
BND_SEQ,
BND_NM,
OSU_BNK,
OSU_CARD,
OSU_CEX,
OSU_BEX,
CHRG_AMT,
PRS_CHG_USR,
PRS_STS,
PRS_NOTE,
ISU_EXP_DT,
SORT_NO,
CRT_USR,
CRT_DT,
EDT_USR,
EDT_DT
)     
SELECT 'H10' AS BRCH_ID,
       고객코드 AFF_SEQ,
       0 DTL_SEQ,  -- 외근일지에는 진행코드가 없어서 0으로 일괄 적용
       ID STS_SEQ,
       SUBSTR(접수일,1,10) ACP_DT,
       접수직원 OUT_CHG_USR,
       CLT_NM,
       CLT_JMN,
       진행순서 PRS_STEP,
        NVL((SELECT BND_SEQ FROM TB_CC_BOND_LST WHERE BND_NM = 채권사 AND ROWNUM = 1), '99999') BND_SEQ,  -- 구시스템에 있는데 채권사정보에 없으면 코드를 해당으로 다 넣기 
        채권사 BND_NM,
        NULL OSU_BNK,
        NULL OSU_CARD,
        NULL OSU_CEX,
        NULL OSU_BEX,
        "수수료" CHRG_AMT,
        확인예정자 PRS_CHG_USR,  -- 담당자 맞나??
        (SELECT DTL_CD FROM TB_CC_CODE_DTL WHERE MST_CD = 'AD04' AND DTL_NM = 진행상황 AND ROWNUM = 1 ) PRS_STS, 
        "특이사항" PRS_NOTE,
        SUBSTR("발급예정일",1,10) ISU_EXP_DT,
        NULL SORT_NO,
       'SYSTEM' CRT_USR,
       SYSDATE CRT_DT,
       'SYSTEM' EDT_USR,
       SYSDATE EDT_DT
  FROM 외근업무일지 A, TB_AC_AFFAIR_MST B
 WHERE A.고객코드 = B.AFF_SEQ 
