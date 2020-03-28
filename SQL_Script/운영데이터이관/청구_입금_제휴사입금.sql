 -- ���� ������ ���

-- û�� ������
DROP TABLE TB_AC_TIEUPASK_MST_TMP;

 CREATE TABLE TB_AC_TIEUPASK_MST_TMP AS 
 SELECT *
   FROM TB_AC_TIEUPASK_MST;


-- û�� �������� ���� ����


-- �Ա����� 
DROP TABLE TB_AC_PAY_LST_TMP;

 CREATE TABLE TB_AC_PAY_LST_TMP AS 
 SELECT *
   FROM TB_AC_PAY_LST;


   
-- ���޻� �Ա�����
DROP TABLE TB_AC_TIEUPPAY_LST_TMP;

 CREATE TABLE TB_AC_TIEUPPAY_LST_TMP AS 
 SELECT *
   FROM TB_AC_TIEUPPAY_LST;
   
   
   
   

-- �������� ����  
-- ���� FK �����Ѵ�. 
-- ��������: FK_����

DELETE FROM TB_AC_TIEUPASK_DTL;

DELETE FROM TB_AC_TIEUPASK_MST;

DELETE FROM TB_AC_TIEUPPAY_LST;

DELETE FROM TB_AC_PAY_LST;


   
-- û�� ������    
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
���޻��ڵ� AS TUB_SEQ,
ROW_NUMBER() OVER (PARTITION BY BRCH_ID, TUB_SEQ ORDER BY BRCH_ID, TUB_SEQ) AS ASK_SEQ,
NVL(û����, TO_DATE(SUBSTR(��������,1,8)) + 1) ASK_DT,   --  ������
B.TUB_NM,
B.SIN_NM,
SUBSTR(��������,1,8) BAS_ST_DT,
SUBSTR(��������,1,8) BAS_ED_DT,
NVL(�̼��ܾ�,0) - NVL(�߻���,0) UNP_AMT,  
NVL(�߻���,0) OCC_AMT, -- 
�ΰ��� VAT_AMT, -- 
NVL(�̼��ܾ�,0) ASK_AMT,  -- ????
���� NOTE,
'SYSTEM' CRT_USR,
SYSDATE CRT_DT,
'SYSTEM' EDT_USR,
SYSDATE EDT_DT,
B.HNA_CHG_USR,
'N', -- �������
B.SIN_GBN
  FROM ���޻��Աݸ���Ʈ A, TB_CC_TIEUP_LST B
 WHERE A.���޻��ڵ� = B.TUB_SEQ
  
-------- ä�ǻ��� ���� �����ʹ� ������� Y�� �Ѵ�.
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
 
 
 
  
-- �Աݳ��� 
  
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
SUBSTR(����,1,8) PAY_DT,
CASE 
     WHEN �ŷ����� = '��ü��' THEN 'A'
     WHEN �ŷ����� = 'SC����' THEN 'B'
END  BANK_GBN,
�Աݾ� PAY_AMT,
�ϳ��ο����� PAY_NOTE,
CASE 
     WHEN ó����Ȳ = '���' THEN 'N'
     WHEN ó����Ȳ = '����Ϸ�' THEN 'Y'
END  PAY_HNDL_GBN,
'SYSTEM' CRT_USR,
SYSDATE CRT_DT,
'SYSTEM' EDT_USR,
SYSDATE EDT_DT
  FROM �Աݳ���


-- ���޻��Ա�����
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
���޻��ڵ� AS TUB_SEQ,
ROW_NUMBER() OVER (PARTITION BY BRCH_ID, TUB_SEQ ORDER BY BRCH_ID, TUB_SEQ) AS TUB_PAY_SEQ, -- ���޻��Աݼ���
ROW_NUMBER() OVER (PARTITION BY BRCH_ID, TUB_SEQ ORDER BY BRCH_ID, TUB_SEQ) AS ASK_SEQ, -- û���� ���޻� �Ա����̺� �����ؼ� ���ϰ� �ֱ� 
NVL(û����, TO_DATE(SUBSTR(��������,1,8)) + 1) ASK_DT,   --  ������
�����Ա��� PAY_DT,
NULL PAY_SEQ,
NVL(�̼��ܾ�,0) ASK_AMT,  -- ????
�Աݾ� AS PAY_AMT,
'A' �����Ա�,
'30' ����Ϸ�,
'SYSTEM' CRT_USR,
SYSDATE CRT_DT,
'SYSTEM' EDT_USR,
SYSDATE EDT_DT
  FROM ���޻��Աݸ���Ʈ A, TB_CC_TIEUP_LST B
 WHERE A.���޻��ڵ� = B.TUB_SEQ



-- ���޻� �̼��ܾ��� ���޻� ������ �ܾ��� �����ܾ��̹Ƿ� ���� �����Ϳ� �ش� �ݾ��� �ְ� ������ INSERT �Ѵ�

DECLARE 
CURSOR CUR_ITEM IS  
 SELECT 'H10' AS BRCH_ID,
        ���޻��ڵ� TUB_SEQ,
        �̼��� UNP_AMT, 
        SUBSTR(������û����,1,8) LST_DEAL_DT
   FROM ���޻����;   
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
                        '�̼��� ����' NOTE,
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
