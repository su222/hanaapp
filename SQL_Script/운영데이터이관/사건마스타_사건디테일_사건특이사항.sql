 -- 먼저 데이터 백업

-- 사건마스터
DROP TABLE TB_AC_AFFAIR_MST_TMP;

 CREATE TABLE TB_AC_AFFAIR_MST_TMP AS 
 SELECT *
   FROM TB_AC_AFFAIR_MST;
   
-- 사건디테일
DROP TABLE TB_AC_AFFAIR_DTL_TMP;

 CREATE TABLE TB_AC_AFFAIR_DTL_TMP AS 
 SELECT *
   FROM TB_AC_AFFAIR_DTL;
   
-- 사건특이사항
DROP TABLE TB_AC_AFFNOTE_LST_TMP;

 CREATE TABLE TB_AC_AFFNOTE_LST_TMP AS 
 SELECT *
   FROM TB_AC_AFFNOTE_LST;



-- 기존정보 삭제  
-- 먼저 FK 삭제한다. 
-- 관련파일: FK_삭제

DELETE FROM TB_AC_AFFNOTE_LST;

DELETE FROM TB_AC_AFFAIR_DTL;

DELETE FROM TB_AC_AFFAIR_MST;   
   
INSERT INTO TB_AC_AFFAIR_MST
(
BRCH_ID,
AFF_SEQ,
TUB_SEQ,
CHG_SEQ,
TUB_NM,
CHG_NM,
TUB_TEL,
TUB_FAX,
HNA_CHG_USR,
HNA_CHG_USR_NM,
PRS_CHG_USR,
DOC_CRT_USR,
AFF_ST_DT,
AFF_ED_DT,
AFF_NO,
AFF_GBN,
CLT_NM,
CLT_TEL,
CLT_JMN,
CLT_ADDR,
CLT_ZIP,
DOC_CARY,
AFF_PRS_STS,
CRT_USR,
CRT_DT,
EDT_USR,
EDT_DT,
CHG_PRS_NOTE,
AFF_ETC_ED_DT,
SMT_PLC,
ADD_INF_GBN,
BEF_CLT_NM,
BEF_CLT_JMN,
SIN_NM
)
SELECT 'H10' AS BRCH_ID,
        "고객코드" AS AFF_SEQ,
        "제휴사코드" TUB_SEQ,
        (SELECT CHG_SEQ FROM TB_CC_TIEUPCHG_LST WHERE TUB_SEQ = "제휴사코드" AND CHG_NM = "제휴사사건담당자" ) CHG_SEQ,
        B.TUB_NM,
        "제휴사사건담당자" CHG_NM,
        TUB_TEL,
        TUB_FAX,
        HNA_CHG_USR,
        FC_CC_GET_USRNAME('H10', HNA_CHG_USR) AS HNA_CHG_USR_NM,
        "서류담당" PRS_CHG_USR,
        "담당이" DOC_CRT_USR,
        SUBSTR("시작일", 1,10) AFF_ST_DT,
        SUBSTR("마감일", 1,10) AFF_ED_DT,
        NULL AFF_NO, -- 사건번호 없음
        사건구분 AFF_GBN, 
        "이름" CLT_NM,
        "전화번호" CLT_TEL,
        "주민등록번호" CLT_JMN,
        "주소" CLT_ADDR,
        NULL CLT_ZIP, -- 우편번호는 없음
        B.DOC_CARY,
        CASE 
             WHEN 비용청구 = '1' THEN '30'  -- 비용청구 
             WHEN "마감일" IS NOT NULL THEN '30'  -- 마감일 넣으면 무조건 비용청구 (확인 필요)
             WHEN "마감일" IS  NULL THEN '10'
        END AFF_PRS_STS ,    
       'SYSTEM' CRT_USR,
       SYSDATE CRT_DT,
       'SYSTEM' EDT_USR,
       SYSDATE EDT_DT,  
       "진행내역" CHG_PRS_NOTE,
       NULL AFF_ETC_ED_DT,
       NULL SMT_PLC, -- 제출처 없음 
       NULL ADD_INF_GBN,
       NULL BEF_CLT_NM,
       NULL BEF_CLT_JMN,
       B.SIN_NM
  FROM 의뢰사건 A, TB_CC_TIEUP_LST B
 WHERE "제휴사코드" = B.TUB_SEQ
  

-- 사건디테일
INSERT INTO TB_AC_AFFAIR_DTL
(
BRCH_ID,
AFF_SEQ,
DTL_SEQ,
GRP_CD,
GRP_SEQ,
REQ_SEQ,
SORT_NO,
REQ_BND_SEQ,
REQ_BND_NM,
REQ_BND_STS,
REQ_DEB,
REQ_BNK,
REQ_CARD,
BNK_NOTE,
CARD_NOTE,
BIZ_REQ_YN,
REQ_PRT_YN,
BND_SEQ_1,
BND_NM_1,
PRS_STS_1,
BND_SEQ_2,
BND_NM_2,
PRS_STS_2,
ISU_DEB,
ISU_COC,
ISU_BNK,
ISU_CARD,
ISU_CRDT,
BNK_CHRG,
AGC_CHRG,
PRT_YN,
CLOSE_YN,
CRT_USR,
CRT_DT,
EDT_USR,
EDT_DT,
NOTE,
PRS_NOTE_1,
PRS_NOTE_2,
ACP_MTD_1,
ACP_MTD_2,
NOTE2,
REQ_PRS_NOTE,
BNK_NOTE_TRM,
BNK_NOTE_ETC,
CARD_NOTE_TRM,
CARD_NOTE_ETC
) 
SELECT 'H10' AS BRCH_ID,
       "고객코드" AS AFF_SEQ,
       "진행코드" DTL_SEQ,
       "진행코드" GRP_CD,
       RANK() OVER (PARTITION BY "진행코드" ORDER BY "진행코드"  ) GRP_SEQ,
       "진행코드" REQ_SEQ,
      RANK() OVER (PARTITION BY "고객코드" ORDER BY "마감순서"  ) SORT_NO,
      (SELECT MAX(BND_SEQ) FROM TB_CC_BOND_LST WHERE BND_NM = "의뢰채권사" ) REQ_BND_SEQ,
      "의뢰채권사" REQ_BND_NM,
      NVL(
           (SELECT DTL_CD FROM TB_CC_CODE_DTL WHERE MST_CD = 'AD03' AND DTL_NM = "비고일" AND ROWNUM = 1 ),
           (SELECT DTL_CD FROM TB_CC_CODE_DTL WHERE MST_CD = 'AD03' AND DTL_NM = "비고이" AND ROWNUM = 1 )
         )  REQ_BND_STS, -- 의뢰상태가 없으면 진행1으로 
      NULL REQ_DEB,
      NULL REQ_BNK,
      NULL REQ_CARD,
      "통장거래비고" BNK_NOTE,   
      "카드거래비고" CARD_NOTE,  
      NULL BIZ_REQ_YN,
      NULL REQ_PRT_YN,
      (SELECT MAX(BND_SEQ) FROM TB_CC_BOND_LST WHERE BND_NM = "진행이" ) BND_SEQ_1,
      "진행이" BND_NM_1,
      (SELECT DTL_CD FROM TB_CC_CODE_DTL WHERE MST_CD = 'AD03' AND DTL_NM = "비고이" AND ROWNUM = 1 ) PRS_STS_1,
      (SELECT MAX(BND_SEQ) FROM TB_CC_BOND_LST WHERE BND_NM = "진행삼" ) BND_SEQ_2,
      "진행삼" BND_NM_2,
      (SELECT DTL_CD FROM TB_CC_CODE_DTL WHERE MST_CD = 'AD03' AND DTL_NM = "비고삼" AND ROWNUM = 1 ) PRS_STS_2,
      DECODE("부채증명", '-1', 'Y', 'N') ISU_DEB,
      DECODE("내용증명", '-1', 'Y', 'N') ISU_COC,
      DECODE("통장거래", '-1', 'Y', 'N') ISU_BNK,
      DECODE("카드거래", '-1', 'Y', 'N') ISU_CARD,
      DECODE("신용조회", '-1', 'Y', 'N') ISU_CRDT,
      TRUNC("은행수수료") BNK_CHRG,
      TRUNC("대행수수료") AGC_CHRG,
      DECODE("마감출력", '-1', 'Y', 'N') PRT_YN,
      'Y' CLOSE_YN,
       'SYSTEM' CRT_USR,
       SYSDATE CRT_DT,
       'SYSTEM' EDT_USR,
       SYSDATE EDT_DT,
      "진행특이사항" NOTE,
      "진행이밑" PRS_NOTE_1,
      "진행삼밑" PRS_NOTE_2,
      NULL ACP_MTD_1,
      NULL ACP_MTD_2,
      NULL NOTE2,
      NULL REQ_PRS_NOTE,
      NULL BNK_NOTE_TRM,
      NULL BNK_NOTE_ETC,
      NULL CARD_NOTE_TRM,
      NULL CARD_NOTE_ETC
  FROM 채권사진행내역 
 WHERE  "고객코드" IN (SELECT "고객코드" FROM 의뢰사건)
 --ORDER BY "고객코드" ,   "진행코드"
 
-- 사건진행특이사항 
INSERT INTO TB_AC_AFFNOTE_LST
(
BRCH_ID,
AFF_SEQ,
PRS_DT,
NOTE,
CRT_USR,
CRT_DT,
EDT_USR,
EDT_DT
)
SELECT 'H10' AS BRCH_ID,
       "고객코드" AS AFF_SEQ,
       NVL(TO_DATE(SUBSTR(등록일,1,9)), TRUNC(SYSDATE)) + 0.0001 * ROWNUM PRS_DT,
       등록내용 NOTE,
       'SYSTEM' CRT_USR,
       SYSDATE CRT_DT,
       'SYSTEM' EDT_USR,
       SYSDATE EDT_DT
  FROM 의뢰내역특이사항      
 WHERE 고객코드 IS NOT NULL
 
 
 
 
 -- 사건정보에 마감일 있으면 다 비용청구
 UPDATE TB_AC_AFFAIR_MST
    SET AFF_PRS_STS = '30'
  WHERE (AFF_SEQ)
    IN (SELECT 고객코드 FROM  의뢰사건 WHERE 마감일 IS NOT NULL AND NVL(비용청구,0) = 0)
    
    
    S