

-- �������

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
        ä�ǻ� BND_NM,
        �߼��ּ� BND_ADDR,
        �����ȣ1 || �����ȣ2 || �����ȣ3 || �����ȣ4 || �����ȣ5 || �����ȣ6 BND_ZIP,
       'SYSTEM' CRT_USR,
       SYSDATE CRT_DT,
       'SYSTEM' EDT_USR,
       SYSDATE EDT_DT
  FROM ����߼۸���Ʈ         