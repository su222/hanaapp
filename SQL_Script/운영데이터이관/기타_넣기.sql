

-- 봉투출력

DROP TABLE TB_AC_EVP_LST_TMP;

 CREATE TABLE TB_AC_EVP_LST_TMP AS 
 SELECT *
   FROM TB_AC_EVP_LST;

DELETE FROM TB_AC_EVP_LST;



INSERT INTO TB_AC_EVP_LST
(
BRCH_ID,
EVP_SEQ,
BND_NM,
BND_ADDR,
BND_ZIP,
CRT_USR,
CRT_DT,
EDT_USR,
EDT_DT
)
SELECT 'H10' AS BRCH_ID,
        ID EVP_SEQ,
        채권사 BND_NM,
        발송주소 BND_ADDR,
        우편번호1 || 우편번호2 || 우편번호3 || 우편번호4 || 우편번호5 || 우편번호6 BND_ZIP,
       'SYSTEM' CRT_USR,
       SYSDATE CRT_DT,
       'SYSTEM' EDT_USR,
       SYSDATE EDT_DT
  FROM 우편발송리스트         