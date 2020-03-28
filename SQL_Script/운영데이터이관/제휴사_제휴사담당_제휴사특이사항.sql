/*

 2014.02.19  => �ŷ���Ȳ�� ������ Y ó�� 

*/


-- ���� ������ ���

-- ���޻�
DROP TABLE TB_CC_TIEUP_LST_TMP;

 CREATE TABLE TB_CC_TIEUP_LST_TMP AS 
 SELECT *
   FROM TB_CC_TIEUP_LST;

-- ���޻� ���
DROP TABLE TB_CC_TIEUPCHG_LST_TMP;

 CREATE TABLE TB_CC_TIEUPCHG_LST_TMP
 AS 
 SELECT *
   FROM TB_CC_TIEUPCHG_LST;


-- ���޻� Ư�̻���
DROP TABLE TB_CC_TIEUPNOTE_LST_TMP;

 CREATE TABLE TB_CC_TIEUPNOTE_LST_TMP
 AS 
 SELECT *
   FROM TB_CC_TIEUPNOTE_LST;


-- �������� ����  

DELETE FROM TB_CC_TIEUPNOTE_LST;

DELETE FROM TB_CC_TIEUPCHG_LST;

DELETE FROM TB_CC_TIEUP_LST;


-- ���޻� ���� �ֱ� 


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
        "���޻��ڵ�" AS TUB_SEQ,
        "���޻�" TUB_NM,
        "��ȭ��ȣ" TUB_TEL, 
        "�ѽ���ȣ" TUB_FAX,
        "�ּ�" TUB_ADDR,
        NULL TUB_ZIP,
        "�⺻�����" BAG_AGC_AMT, 
        "�׿ܴ����" ETC_AGC_AMT,
        "���޻�����" SIN_NM, 
        "����ڿ���ó" SIN_TEL, 
        'DA' SIN_GBN, -- ���籸���� ��� �Ⱓ����
        DECODE(���ݰ�꼭����, '���̿�����', 'BE', 'NO') RCP_GBN, -- ���������౸���� ���̿������� ������ 
        DECODE(���ݰ�꼭����, '����', 'ALLY', 'NOT')  BIL_GBN, --  ���� ������ߵ�(���������͸� �� �ΰ��������� �Ұ����� ����)
        NVL(CASE
             WHEN �ŷ����� IN ('�ŷ���','�߼�') THEN 'Y'
             WHEN �ŷ����� IN ('ü����ü') THEN 'H'
             WHEN �ŷ����� IN ( '�ŷ�����') THEN 'N'
             ELSE 'Y'  -- ������ Y
       END, 'Y')  DEAL_STS,
       CASE WHEN �ŷ����� = 'ü����ä' THEN �ŷ�����
       END  DEAL_STOP_RSN,
       (SELECT USR_ID FROM TB_CC_USER_LST WHERE USR_NM = "�ϳ������") HNA_CHG_USR,
       CASE 
            WHEN "������۹��" = '�湮' THEN 'B'
            WHEN "������۹��" = '���' THEN 'D'
            WHEN "������۹��" = '���' THEN 'H'
            ELSE NULL
       END AS DOC_CARY,
       NULL BIZ_FILE_NM, -- ����ڵ������ ������ ÷��
       'SYSTEM' CRT_USR,
       SYSDATE CRT_DT,
       'SYSTEM' EDT_USR,
       SYSDATE EDT_DT,
       NULL BIZ_FILE_SAVE_NM,  -- ����ڵ������ ������ ÷��
       NULL AFF_REG_NOTE,
       NULL AFF_PRS_NOTE,
       NULL COST_NOTE,
       'A' REG_GBN,
       "����Ī" RLT_NM,
       SUBSTR("������û����", 1,9) LST_DEAL_DT,
       "���޻��ڵ�" OLD_TUB_SEQ, 
       "���޻�����" OLD_SIN_NM,
       "������"  SIN_DT_STR,
       "�̼���"
  FROM ���޻����


-- ���޻��� 
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
       "���޻��ڵ�" AS TUB_SEQ,
       RANK() OVER (PARTITION BY "���޻��ڵ�" ORDER BY "�����" DESC ) AS CHG_SEQ,
       "�����" CHG_NM,
       "�ڵ�����ȣ" CHG_HP,
       "��ȭ��ȣ" CHG_TEL,
       "����" CHG_POS,
       NULL TEL_OPN_YN, -- ��ȭ��ȣ ���� ���� ������ �̻��ؼ� �� NULL ó�� 
       NULL DESC_PRV,
       NULL DPST_NM,
       "Ư�̻���" NOTE,
       'SYSTEM' CRT_USR,
       SYSDATE CRT_DT,
       'SYSTEM' EDT_USR,
       SYSDATE EDT_DT
  FROM ���޻�����       
  
  
-- ���޻�Ư�̻���
-- Ư�̻��ױ����� ERP_TEMP_TABLE�� ����Ѵ� 
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
       "���޻��ڵ�" AS TUB_SEQ,
       ROWNUM AS NOTE_SEQ,
       CASE 
            WHEN ����2 = '��ǵ��' THEN '100'
            WHEN ����2 IN ('�������','�������') THEN '200'
            WHEN ����2 = '������' THEN '300'
       END JOB_GBN,
       (SELECT ATTR03 FROM ERP_TEMP_TABLE WHERE ID BETWEEN 50000 AND 51000 AND ����2 = ATTR01 AND ����=ATTR02 ) JOB_GBN,
       "����" NOTE_DESC,
       'SYSTEM' CRT_USR,
       SYSDATE CRT_DT,
       'SYSTEM' EDT_USR,
       SYSDATE EDT_DT       
  FROM ���޻�Ư�̻���
  

-- ���� ���޻� ������û����, �̼��� �ȵ��� �ֱ�
UPDATE TB_CC_TIEUP_LST A 
   SET UNP_AMT = (SELECT �̼��� FROM ���޻���� WHERE ���޻��ڵ� = TUB_SEQ),
       LST_DEAL_DT = (SELECT ������û���� FROM ���޻���� WHERE ���޻��ڵ� = TUB_SEQ)
       




SELECT *
  FROM ���޻����
 WHERE ���޻��ڵ� = 1259



-- ������ ���ڿ� �̻��Ѱ͵� ����

-- �Ǻ� ����
UPDATE TB_CC_TIEUP_LST
   SET SIN_GBN = 'CO'
 WHERE SIN_DT_STR = '�Ǻ�'
 

-- ���ڿ� ����

-- 1. ����, �������� �ٸ��ɷ� ġȯ �� �� �� �ٲٰ� �ٽ� ����
UPDATE TB_CC_TIEUP_LST
   SET SIN_DT_STR = 
       CASE 
            WHEN SIN_DT_STR IN ('������','��������') THEN 'E-1'
            WHEN SIN_DT_STR IN ('����') THEN 'E0'
            ELSE SIN_DT_STR
       END             

-- 2. �ٹٲ�
UPDATE TB_CC_TIEUP_LST
   SET SIN_DT_STR = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(SIN_DT_STR, '����', ''),'��',''), '/', ','), '�Ŵ�',''), '����', '')
   

-- 3.���� ������ ����                    
UPDATE TB_CC_TIEUP_LST
   SET SIN_DT_STR = 
       CASE 
            WHEN SIN_DT_STR IN ('E-1') THEN '������'
            WHEN SIN_DT_STR IN ('E0') THEN '����'
            ELSE SIN_DT_STR
       END   

-- 4 ���ݰ�꼭 ���౸�� ����
UPDATE TB_CC_TIEUP_LST 
   SET BIL_GBN = DECODE(BIL_GBN,'Y','ALLY', 'NOT')

SELECT *
  FROM TB_CC_TIEUP_LST
 WHERE BIL_GBN ='ALLY'
