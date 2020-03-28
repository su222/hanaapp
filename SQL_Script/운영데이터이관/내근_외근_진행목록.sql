 -- ���� ������ ���

-- ����������
DROP TABLE TB_AC_AFFAIRPRS_LST_TMP;

 CREATE TABLE TB_AC_AFFAIRPRS_LST_TMP AS 
 SELECT *
   FROM TB_AC_AFFAIRPRS_LST;

-- �������� Ư�̻��� 
DROP TABLE TB_AC_AFFAIRPRSNOTE_LST_TMP;

 CREATE TABLE TB_AC_AFFAIRPRSNOTE_LST_TMP AS 
 SELECT *
   FROM TB_AC_AFFAIRPRSNOTE_LST;


   
-- �ܱ�������
DROP TABLE TB_AC_AFFAIROUT_LST_TMP;

 CREATE TABLE TB_AC_AFFAIROUT_LST_TMP AS 
 SELECT *
   FROM TB_AC_AFFAIROUT_LST;
   
   
   
   

-- �������� ����  
-- ���� FK �����Ѵ�. 
-- ��������: FK_����

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
        "���ڵ�" AS AFF_SEQ,
        "�����ڵ�" DTL_SEQ,
        "�����ڵ�" STS_SEQ,
        SUBSTR(������,1,9) ACP_DT,
        CASE
             WHEN ������� = '����' THEN 'ZZ'
             WHEN ������� = '���ݼ�' THEN 'DR'
             WHEN ������� = '�ѽ�' THEN 'F'
             WHEN ������� = '����' THEN 'R'
             WHEN ������� = '���' THEN 'D'
             WHEN ������� IS NULL THEN 'X'
        END ACP_MTD,
        B.CLT_NM,
        B.CLT_JMN,
        ����ܰ� PRS_STEP, 
        NVL((SELECT BND_SEQ FROM TB_CC_BOND_LST WHERE BND_NM = ä�ǻ� AND ROWNUM = 1), '99999') BND_SEQ,  -- ���ý��ۿ� �ִµ� ä�ǻ������� ������ �ڵ带 �ش����� �� �ֱ� 
        ä�ǻ� BND_NM,
        (SELECT BND_TEL FROM TB_CC_BOND_LST WHERE BND_NM = ä�ǻ� AND ROWNUM = 1) BND_TEL,
        (SELECT BND_FAX FROM TB_CC_BOND_LST WHERE BND_NM = ä�ǻ� AND ROWNUM = 1) BND_FAX,
        (SELECT BND_ADDR FROM TB_CC_BOND_LST WHERE BND_NM = ä�ǻ� AND ROWNUM = 1)  BND_ADDR,
        (SELECT BND_ZIP FROM TB_CC_BOND_LST WHERE BND_NM = ä�ǻ� AND ROWNUM = 1)  BND_ZIP,               
        "�߱޺��" CHRG_AMT,
        "������" PRS_CHG_USR, -- �ѱ۸� �� 
        NULL SPT_SEQ,
        NULL SPT_NM,
        "����ȣ" REGS_NO,
        (SELECT DTL_CD FROM TB_CC_CODE_DTL WHERE MST_CD = 'AD04' AND DTL_NM = ���࿩�� AND ROWNUM = 1 ) PRS_STS,
        NULL PRS_NOTE,
        ��¼��� SORT_NO,
        �������� RMT_BNK_NM,
       'SYSTEM' CRT_USR,
       SYSDATE CRT_DT,
       'SYSTEM' EDT_USR,
       SYSDATE EDT_DT
  FROM ���������� A, TB_AC_AFFAIR_MST B
 WHERE A.���ڵ� = B.AFF_SEQ 
   AND ���ڵ� IS NOT NULL
   AND �����ڵ� IS NOT NULL
   
 

       
-- �������� Ư�̻��� 
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
        (SELECT AFF_SEQ FROM TB_AC_AFFAIRPRS_LST WHERE STS_SEQ = �����ڵ�) AFF_SEQ,
        (SELECT DTL_SEQ FROM TB_AC_AFFAIRPRS_LST WHERE STS_SEQ = �����ڵ�) DTL_SEQ,
        NVL(TO_DATE(SUBSTR(�������,1,9)), TRUNC(SYSDATE)) + 0.0001 * ROWNUM PRS_DT,
        "�����ڵ�" STS_SEQ,
        Ư�̻��� NOTE,
       'SYSTEM' CRT_USR,
       SYSDATE CRT_DT,
       'SYSTEM' EDT_USR,
       SYSDATE EDT_DT        
  FROM ����������Ư�̻���
 WHERE (�����ڵ�) IN 
       (SELECT �����ڵ� FROM TB_AC_AFFAIRPRS_LST WHERE STS_SEQ = �����ڵ�);
   

-- �ܱپ������� 

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
       ���ڵ� AFF_SEQ,
       0 DTL_SEQ,  -- �ܱ��������� �����ڵ尡 ��� 0���� �ϰ� ����
       ID STS_SEQ,
       SUBSTR(������,1,10) ACP_DT,
       �������� OUT_CHG_USR,
       CLT_NM,
       CLT_JMN,
       ������� PRS_STEP,
        NVL((SELECT BND_SEQ FROM TB_CC_BOND_LST WHERE BND_NM = ä�ǻ� AND ROWNUM = 1), '99999') BND_SEQ,  -- ���ý��ۿ� �ִµ� ä�ǻ������� ������ �ڵ带 �ش����� �� �ֱ� 
        ä�ǻ� BND_NM,
        NULL OSU_BNK,
        NULL OSU_CARD,
        NULL OSU_CEX,
        NULL OSU_BEX,
        "������" CHRG_AMT,
        Ȯ�ο����� PRS_CHG_USR,  -- ����� �³�??
        (SELECT DTL_CD FROM TB_CC_CODE_DTL WHERE MST_CD = 'AD04' AND DTL_NM = �����Ȳ AND ROWNUM = 1 ) PRS_STS, 
        "Ư�̻���" PRS_NOTE,
        SUBSTR("�߱޿�����",1,10) ISU_EXP_DT,
        NULL SORT_NO,
       'SYSTEM' CRT_USR,
       SYSDATE CRT_DT,
       'SYSTEM' EDT_USR,
       SYSDATE EDT_DT
  FROM �ܱپ������� A, TB_AC_AFFAIR_MST B
 WHERE A.���ڵ� = B.AFF_SEQ 
