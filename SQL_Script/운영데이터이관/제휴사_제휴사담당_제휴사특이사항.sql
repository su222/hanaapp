/*

 2014.02.19  => 거래상황이 없으면 Y 처리 

*/


-- 먼저 데이터 백업

-- 제휴사
DROP TABLE TB_CC_TIEUP_LST_TMP;

 CREATE TABLE TB_CC_TIEUP_LST_TMP AS 
 SELECT *
   FROM TB_CC_TIEUP_LST;

-- 제휴사 담당
DROP TABLE TB_CC_TIEUPCHG_LST_TMP;

 CREATE TABLE TB_CC_TIEUPCHG_LST_TMP
 AS 
 SELECT *
   FROM TB_CC_TIEUPCHG_LST;


-- 제휴사 특이사항
DROP TABLE TB_CC_TIEUPNOTE_LST_TMP;

 CREATE TABLE TB_CC_TIEUPNOTE_LST_TMP
 AS 
 SELECT *
   FROM TB_CC_TIEUPNOTE_LST;


-- 기존정보 삭제  

DELETE FROM TB_CC_TIEUPNOTE_LST;

DELETE FROM TB_CC_TIEUPCHG_LST;

DELETE FROM TB_CC_TIEUP_LST;


-- 제휴사 정보 넣기 


INSERT INTO TB_CC_TIEUP_LST
(
BRCH_ID,
TUB_SEQ,
TUB_NM,
TUB_TEL,
TUB_FAX,
TUB_ADDR,
TUB_ZIP,
BAG_AGC_AMT,
ETC_AGC_AMT,
SIN_NM,
SIN_TEL,
SIN_GBN,
RCP_GBN,
BIL_GBN,
DEAL_STS,
DEAL_STOP_RSN,
HNA_CHG_USR,
DOC_CARY,
BIZ_FILE_NM,
CRT_USR,
CRT_DT,
EDT_USR,
EDT_DT,
BIZ_FILE_SAVE_NM,
AFF_REG_NOTE,
AFF_PRS_NOTE,
COST_NOTE,
REG_GBN,
RLT_NM,
LST_DEAL_DT,
OLD_TUB_SEQ,
OLD_SIN_NM,
SIN_DT_STR,
UNP_AMT
)
SELECT 'H10' AS BRCH_ID,
        "제휴사코드" AS TUB_SEQ,
        "제휴사" TUB_NM,
        "전화번호" TUB_TEL, 
        "팩스번호" TUB_FAX,
        "주소" TUB_ADDR,
        NULL TUB_ZIP,
        "기본대행료" BAG_AGC_AMT, 
        "그외대행료" ETC_AGC_AMT,
        "제휴사담당자" SIN_NM, 
        "담당자연락처" SIN_TEL, 
        'DA' SIN_GBN, -- 결재구분은 모두 기간으로
        DECODE(세금계산서발행, '간이영수증', 'BE', 'NO') RCP_GBN, -- 영수증발행구분은 간이영수증만 선발행 
        DECODE(세금계산서발행, '발행', 'ALLY', 'NOT')  BIL_GBN, --  따로 물어봐야됨(기존데이터를 다 부가세별도로 할것인지 여부)
        NVL(CASE
             WHEN 거래상태 IN ('거래중','발송') THEN 'Y'
             WHEN 거래상태 IN ('체납업체') THEN 'H'
             WHEN 거래상태 IN ( '거래중지') THEN 'N'
             ELSE 'Y'  -- 없으면 Y
       END, 'Y')  DEAL_STS,
       CASE WHEN 거래상태 = '체납업채' THEN 거래상태
       END  DEAL_STOP_RSN,
       (SELECT USR_ID FROM TB_CC_USER_LST WHERE USR_NM = "하나정담당") HNA_CHG_USR,
       CASE 
            WHEN "서류운송방법" = '방문' THEN 'B'
            WHEN "서류운송방법" = '등기' THEN 'D'
            WHEN "서류운송방법" = '행랑' THEN 'H'
            ELSE NULL
       END AS DOC_CARY,
       NULL BIZ_FILE_NM, -- 사업자등록증은 별도로 첨부
       'SYSTEM' CRT_USR,
       SYSDATE CRT_DT,
       'SYSTEM' EDT_USR,
       SYSDATE EDT_DT,
       NULL BIZ_FILE_SAVE_NM,  -- 사업자등록증은 별도로 첨부
       NULL AFF_REG_NOTE,
       NULL AFF_PRS_NOTE,
       NULL COST_NOTE,
       'A' REG_GBN,
       "구명칭" RLT_NM,
       SUBSTR("마지막청구일", 1,9) LST_DEAL_DT,
       "제휴사코드" OLD_TUB_SEQ, 
       "제휴사담당자" OLD_SIN_NM,
       "결제일"  SIN_DT_STR,
       "미수금"
  FROM 제휴사관리


-- 제휴사담당 
INSERT INTO TB_CC_TIEUPCHG_LST
(
BRCH_ID,
TUB_SEQ,
CHG_SEQ,
CHG_NM,
CHG_HP,
CHG_TEL,
CHG_POS,
TEL_OPN_YN,
DESC_PRV,
DPST_NM,
NOTE,
CRT_USR,
CRT_DT,
EDT_USR,
EDT_DT
)
SELECT 'H10' AS BRCH_ID,
       "제휴사코드" AS TUB_SEQ,
       RANK() OVER (PARTITION BY "제휴사코드" ORDER BY "담당자" DESC ) AS CHG_SEQ,
       "담당자" CHG_NM,
       "핸드폰번호" CHG_HP,
       "전화번호" CHG_TEL,
       "직급" CHG_POS,
       NULL TEL_OPN_YN, -- 전화번호 공개 여부 데이터 이상해서 걍 NULL 처리 
       NULL DESC_PRV,
       NULL DPST_NM,
       "특이사항" NOTE,
       'SYSTEM' CRT_USR,
       SYSDATE CRT_DT,
       'SYSTEM' EDT_USR,
       SYSDATE EDT_DT
  FROM 제휴사담당자       
  
  
-- 제휴사특이사항
-- 특이사항구분은 ERP_TEMP_TABLE을 사용한다 
INSERT INTO TB_CC_TIEUPNOTE_LST
(
BRCH_ID,
TUB_SEQ,
NOTE_SEQ,
JOB_GBN,
NOTE_GBN,
NOTE_DESC,
CRT_USR,
CRT_DT,
EDT_USR,
EDT_DT
)
SELECT 'H10' AS BRCH_ID,
       "제휴사코드" AS TUB_SEQ,
       ROWNUM AS NOTE_SEQ,
       CASE 
            WHEN 구분2 = '사건등록' THEN '100'
            WHEN 구분2 IN ('사건진행','사건지행') THEN '200'
            WHEN 구분2 = '비용관련' THEN '300'
       END JOB_GBN,
       (SELECT ATTR03 FROM ERP_TEMP_TABLE WHERE ID BETWEEN 50000 AND 51000 AND 구분2 = ATTR01 AND 구분=ATTR02 ) JOB_GBN,
       "내용" NOTE_DESC,
       'SYSTEM' CRT_USR,
       SYSDATE CRT_DT,
       'SYSTEM' EDT_USR,
       SYSDATE EDT_DT       
  FROM 제휴사특이사항
  

-- 만약 제휴사 마지막청구일, 미수금 안들어가면 넣기
UPDATE TB_CC_TIEUP_LST A 
   SET UNP_AMT = (SELECT 미수금 FROM 제휴사관리 WHERE 제휴사코드 = TUB_SEQ),
       LST_DEAL_DT = (SELECT 마지막청구일 FROM 제휴사관리 WHERE 제휴사코드 = TUB_SEQ)
       




SELECT *
  FROM 제휴사관리
 WHERE 제휴사코드 = 1259



-- 결재일 문자열 이상한것들 정리

-- 건별 갱신
UPDATE TB_CC_TIEUP_LST
   SET SIN_GBN = 'CO'
 WHERE SIN_DT_STR = '건별'
 

-- 문자열 정비

-- 1. 말일, 말일전은 다른걸로 치환 후 일 다 바꾸고 다시 복원
UPDATE TB_CC_TIEUP_LST
   SET SIN_DT_STR = 
       CASE 
            WHEN SIN_DT_STR IN ('말전날','말일전날') THEN 'E-1'
            WHEN SIN_DT_STR IN ('말일') THEN 'E0'
            ELSE SIN_DT_STR
       END             

-- 2. 다바꿈
UPDATE TB_CC_TIEUP_LST
   SET SIN_DT_STR = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(SIN_DT_STR, '요일', ''),'일',''), '/', ','), '매달',''), '매주', '')
   

-- 3.말일 말일전 복원                    
UPDATE TB_CC_TIEUP_LST
   SET SIN_DT_STR = 
       CASE 
            WHEN SIN_DT_STR IN ('E-1') THEN '말일전'
            WHEN SIN_DT_STR IN ('E0') THEN '말일'
            ELSE SIN_DT_STR
       END   

-- 4 세금계산서 발행구분 갱신
UPDATE TB_CC_TIEUP_LST 
   SET BIL_GBN = DECODE(BIL_GBN,'Y','ALLY', 'NOT')

SELECT *
  FROM TB_CC_TIEUP_LST
 WHERE BIL_GBN ='ALLY'
