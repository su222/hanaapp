 -- 먼저 데이터 백업

-- 청구 마스터
DROP TABLE TB_AC_TIEUPASK_MST_TMP;

 CREATE TABLE TB_AC_TIEUPASK_MST_TMP AS 
 SELECT *
   FROM TB_AC_TIEUPASK_MST;


-- 청구 디테일은 값이 없음


-- 입금정보 
DROP TABLE TB_AC_PAY_LST_TMP;

 CREATE TABLE TB_AC_PAY_LST_TMP AS 
 SELECT *
   FROM TB_AC_PAY_LST;


   
-- 제휴사 입금정보
DROP TABLE TB_AC_TIEUPPAY_LST_TMP;

 CREATE TABLE TB_AC_TIEUPPAY_LST_TMP AS 
 SELECT *
   FROM TB_AC_TIEUPPAY_LST;
   
   
   
   

-- 기존정보 삭제  
-- 먼저 FK 삭제한다. 
-- 관련파일: FK_삭제

DELETE FROM TB_AC_TIEUPASK_DTL;

DELETE FROM TB_AC_TIEUPASK_MST;

DELETE FROM TB_AC_TIEUPPAY_LST;

DELETE FROM TB_AC_PAY_LST;


   
-- 청구 마스터    
INSERT INTO TB_AC_TIEUPASK_MST
(
BRCH_ID,
TUB_SEQ,
ASK_SEQ,
ASK_DT,
TUB_NM,
SIN_NM,
BAS_ST_DT,
BAS_ED_DT,
UNP_AMT,
OCC_AMT,
VAT_AMT,
ASK_AMT,
NOTE,
CRT_USR,
CRT_DT,
EDT_USR,
EDT_DT,
HNA_CHG_USR,
USE_YN,
SIN_GBN
)
SELECT 'H10' AS BRCH_ID,
제휴사코드 AS TUB_SEQ,
ROW_NUMBER() OVER (PARTITION BY BRCH_ID, TUB_SEQ ORDER BY BRCH_ID, TUB_SEQ) AS ASK_SEQ,
NVL(청구일, TO_DATE(SUBSTR(언제까지,1,8)) + 1) ASK_DT,   --  값없음
B.TUB_NM,
B.SIN_NM,
SUBSTR(언제부터,1,8) BAS_ST_DT,
SUBSTR(언제까지,1,8) BAS_ED_DT,
NVL(미수잔액,0) - NVL(발생금,0) UNP_AMT,  
NVL(발생금,0) OCC_AMT, -- 
부가세 VAT_AMT, -- 
NVL(미수잔액,0) ASK_AMT,  -- ????
적요 NOTE,
'SYSTEM' CRT_USR,
SYSDATE CRT_DT,
'SYSTEM' EDT_USR,
SYSDATE EDT_DT,
B.HNA_CHG_USR,
'N', -- 사용유무
B.SIN_GBN
  FROM 제휴사입금리스트 A, TB_CC_TIEUP_LST B
 WHERE A.제휴사코드 = B.TUB_SEQ
  
-------- 채권사의 최종 데이터는 사용유무 Y로 한다.
UPDATE TB_AC_TIEUPASK_MST A
   SET USE_YN = 'Y'
 WHERE (BRCH_ID, TUB_SEQ, ASK_SEQ) IN 
       (SELECT BRCH_ID, TUB_SEQ, ASK_SEQ
          FROM TB_AC_TIEUPASK_MST B
         WHERE BRCH_ID = A.BRCH_ID
           AND TUB_SEQ = A.TUB_SEQ
           AND ASK_SEQ = (SELECT MAX(ASK_SEQ)
                            FROM TB_AC_TIEUPASK_MST
                           WHERE BRCH_ID = B.BRCH_ID
                             AND TUB_SEQ = B.TUB_SEQ
                         )
      )
 
 
 
  
-- 입금내역 
  
INSERT INTO TB_AC_PAY_LST
(
BRCH_ID,
PAY_SEQ,
PAY_DT,
BANK_GBN,
PAY_AMT,
PAY_NOTE,
PAY_HNDL_GBN,
CRT_USR,
CRT_DT,
EDT_USR,
EDT_DT
)   
SELECT
'H10' AS BRCH_ID,
ROWNUM AS PAY_SEQ,
SUBSTR(일자,1,8) PAY_DT,
CASE 
     WHEN 거래은행 = '우체국' THEN 'A'
     WHEN 거래은행 = 'SC은행' THEN 'B'
END  BANK_GBN,
입금액 PAY_AMT,
하나민원적요 PAY_NOTE,
CASE 
     WHEN 처리상황 = '등록' THEN 'N'
     WHEN 처리상황 = '결재완료' THEN 'Y'
END  PAY_HNDL_GBN,
'SYSTEM' CRT_USR,
SYSDATE CRT_DT,
'SYSTEM' EDT_USR,
SYSDATE EDT_DT
  FROM 입금내역


-- 제휴사입금정보
INSERT INTO TB_AC_TIEUPPAY_LST
(
BRCH_ID,
TUB_SEQ,
TUB_PAY_SEQ,
ASK_SEQ,
ASK_DT,
PAY_DT,
PAY_SEQ,
ASK_AMT,
PAY_AMT,
PAY_GBN,
SIN_GBN,
CRT_USR,
CRT_DT,
EDT_USR,
EDT_DT
)
SELECT 'H10' AS BRCH_ID,
제휴사코드 AS TUB_SEQ,
ROW_NUMBER() OVER (PARTITION BY BRCH_ID, TUB_SEQ ORDER BY BRCH_ID, TUB_SEQ) AS TUB_PAY_SEQ, -- 제휴사입금순번
ROW_NUMBER() OVER (PARTITION BY BRCH_ID, TUB_SEQ ORDER BY BRCH_ID, TUB_SEQ) AS ASK_SEQ, -- 청구와 제휴사 입금테이블 동일해서 동일값 넣기 
NVL(청구일, TO_DATE(SUBSTR(언제까지,1,8)) + 1) ASK_DT,   --  값없음
실제입금일 PAY_DT,
NULL PAY_SEQ,
NVL(미수잔액,0) ASK_AMT,  -- ????
입금액 AS PAY_AMT,
'A' 전액입금,
'30' 결재완료,
'SYSTEM' CRT_USR,
SYSDATE CRT_DT,
'SYSTEM' EDT_USR,
SYSDATE EDT_DT
  FROM 제휴사입금리스트 A, TB_CC_TIEUP_LST B
 WHERE A.제휴사코드 = B.TUB_SEQ



-- 제휴사 미수잔액은 제휴사 정보의 잔액이 최종잔액이므로 최종 데이터에 해당 금액을 넣고 없으면 INSERT 한다

DECLARE 
CURSOR CUR_ITEM IS  
 SELECT 'H10' AS BRCH_ID,
        제휴사코드 TUB_SEQ,
        미수금 UNP_AMT, 
        SUBSTR(마지막청구일,1,8) LST_DEAL_DT
   FROM 제휴사관리;   
BEGIN  
    FOR C1 IN CUR_ITEM LOOP
       DBMS_OUTPUT.PUT_LINE(C1.TUB_SEQ||'/'||C1.UNP_AMT||'/'||C1.LST_DEAL_DT);
        BEGIN
            UPDATE TB_AC_TIEUPASK_MST A
               SET UNP_AMT = C1.UNP_AMT
            WHERE BRCH_ID = C1.BRCH_ID
              AND TUB_SEQ = C1.TUB_SEQ
              AND ASK_SEQ = (SELECT MAX(ASK_SEQ) FROM TB_AC_TIEUPASK_MST WHERE BRCH_ID = C1.BRCH_ID AND TUB_SEQ = C1.TUB_SEQ  );     
              if sql%rowcount=0 then
                INSERT INTO TB_AC_TIEUPASK_MST
                (
                BRCH_ID,
                TUB_SEQ,
                ASK_SEQ,
                ASK_DT,
                TUB_NM,
                SIN_NM,
                BAS_ST_DT,
                BAS_ED_DT,
                UNP_AMT,
                OCC_AMT,
                VAT_AMT,
                ASK_AMT,
                NOTE,
                CRT_USR,
                CRT_DT,
                EDT_USR,
                EDT_DT
                )
                SELECT C1.BRCH_ID,
                        C1.TUB_SEQ,
                        (SELECT NVL(MAX(ASK_SEQ),0) + 1 FROM TB_AC_TIEUPASK_MST  WHERE BRCH_ID = C1.BRCH_ID AND TUB_SEQ = C1.TUB_SEQ  ),
                        TRUNC(SYSDATE),
                        TUB_NM,
                        SIN_NM,
                        NULL BAS_ST_DT,
                        NULL BAS_ED_DT,
                        UNP_AMT,
                        0 OCC_AMT,
                        0 VAT_AMT,
                        0 ASK_AMT,
                        '미수금 정산' NOTE,
                        'SYSTEM' CRT_USR,
                        SYSDATE CRT_DT,
                        'SYSTEM' EDT_USR,
                        SYSDATE EDT_DT
                 FROM TB_CC_TIEUP_LST
                WHERE BRCH_ID = C1.BRCH_ID
                  AND TUB_SEQ = C1.TUB_SEQ;
              END IF;                         
        EXCEPTION
            WHEN OTHERS THEN
                NULL;
               DBMS_OUTPUT.PUT_LINE(' ERR='||SQLERRM);
        END;                  
    END LOOP;         
END; 




SELECT *
  FROM TB_AC_TIEUPASK_MST
  ORDER BY TUB_SEQ, ASK_DT DESC
