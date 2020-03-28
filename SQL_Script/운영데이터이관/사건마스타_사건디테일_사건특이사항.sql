 -- ���� ������ ���

-- ��Ǹ�����
DROP TABLE TB_AC_AFFAIR_MST_TMP;

 CREATE TABLE TB_AC_AFFAIR_MST_TMP AS 
 SELECT *
   FROM TB_AC_AFFAIR_MST;
   
-- ��ǵ�����
DROP TABLE TB_AC_AFFAIR_DTL_TMP;

 CREATE TABLE TB_AC_AFFAIR_DTL_TMP AS 
 SELECT *
   FROM TB_AC_AFFAIR_DTL;
   
-- ���Ư�̻���
DROP TABLE TB_AC_AFFNOTE_LST_TMP;

 CREATE TABLE TB_AC_AFFNOTE_LST_TMP AS 
 SELECT *
   FROM TB_AC_AFFNOTE_LST;



-- �������� ����  
-- ���� FK �����Ѵ�. 
-- ��������: FK_����

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
        "���ڵ�" AS AFF_SEQ,
        "���޻��ڵ�" TUB_SEQ,
        (SELECT CHG_SEQ FROM TB_CC_TIEUPCHG_LST WHERE TUB_SEQ = "���޻��ڵ�" AND CHG_NM = "���޻��Ǵ����" ) CHG_SEQ,
        B.TUB_NM,
        "���޻��Ǵ����" CHG_NM,
        TUB_TEL,
        TUB_FAX,
        HNA_CHG_USR,
        FC_CC_GET_USRNAME('H10', HNA_CHG_USR) AS HNA_CHG_USR_NM,
        "�������" PRS_CHG_USR,
        "�����" DOC_CRT_USR,
        SUBSTR("������", 1,10) AFF_ST_DT,
        SUBSTR("������", 1,10) AFF_ED_DT,
        NULL AFF_NO, -- ��ǹ�ȣ ����
        ��Ǳ��� AFF_GBN, 
        "�̸�" CLT_NM,
        "��ȭ��ȣ" CLT_TEL,
        "�ֹε�Ϲ�ȣ" CLT_JMN,
        "�ּ�" CLT_ADDR,
        NULL CLT_ZIP, -- �����ȣ�� ����
        B.DOC_CARY,
        CASE 
             WHEN ���û�� = '1' THEN '30'  -- ���û�� 
             WHEN "������" IS NOT NULL THEN '30'  -- ������ ������ ������ ���û�� (Ȯ�� �ʿ�)
             WHEN "������" IS  NULL THEN '10'
        END AFF_PRS_STS ,    
       'SYSTEM' CRT_USR,
       SYSDATE CRT_DT,
       'SYSTEM' EDT_USR,
       SYSDATE EDT_DT,  
       "���೻��" CHG_PRS_NOTE,
       NULL AFF_ETC_ED_DT,
       NULL SMT_PLC, -- ����ó ���� 
       NULL ADD_INF_GBN,
       NULL BEF_CLT_NM,
       NULL BEF_CLT_JMN,
       B.SIN_NM
  FROM �Ƿڻ�� A, TB_CC_TIEUP_LST B
 WHERE "���޻��ڵ�" = B.TUB_SEQ
  

-- ��ǵ�����
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
       "���ڵ�" AS AFF_SEQ,
       "�����ڵ�" DTL_SEQ,
       "�����ڵ�" GRP_CD,
       RANK() OVER (PARTITION BY "�����ڵ�" ORDER BY "�����ڵ�"  ) GRP_SEQ,
       "�����ڵ�" REQ_SEQ,
      RANK() OVER (PARTITION BY "���ڵ�" ORDER BY "��������"  ) SORT_NO,
      (SELECT MAX(BND_SEQ) FROM TB_CC_BOND_LST WHERE BND_NM = "�Ƿ�ä�ǻ�" ) REQ_BND_SEQ,
      "�Ƿ�ä�ǻ�" REQ_BND_NM,
      NVL(
           (SELECT DTL_CD FROM TB_CC_CODE_DTL WHERE MST_CD = 'AD03' AND DTL_NM = "�����" AND ROWNUM = 1 ),
           (SELECT DTL_CD FROM TB_CC_CODE_DTL WHERE MST_CD = 'AD03' AND DTL_NM = "�����" AND ROWNUM = 1 )
         )  REQ_BND_STS, -- �Ƿڻ��°� ������ ����1���� 
      NULL REQ_DEB,
      NULL REQ_BNK,
      NULL REQ_CARD,
      "����ŷ����" BNK_NOTE,   
      "ī��ŷ����" CARD_NOTE,  
      NULL BIZ_REQ_YN,
      NULL REQ_PRT_YN,
      (SELECT MAX(BND_SEQ) FROM TB_CC_BOND_LST WHERE BND_NM = "������" ) BND_SEQ_1,
      "������" BND_NM_1,
      (SELECT DTL_CD FROM TB_CC_CODE_DTL WHERE MST_CD = 'AD03' AND DTL_NM = "�����" AND ROWNUM = 1 ) PRS_STS_1,
      (SELECT MAX(BND_SEQ) FROM TB_CC_BOND_LST WHERE BND_NM = "�����" ) BND_SEQ_2,
      "�����" BND_NM_2,
      (SELECT DTL_CD FROM TB_CC_CODE_DTL WHERE MST_CD = 'AD03' AND DTL_NM = "����" AND ROWNUM = 1 ) PRS_STS_2,
      DECODE("��ä����", '-1', 'Y', 'N') ISU_DEB,
      DECODE("��������", '-1', 'Y', 'N') ISU_COC,
      DECODE("����ŷ�", '-1', 'Y', 'N') ISU_BNK,
      DECODE("ī��ŷ�", '-1', 'Y', 'N') ISU_CARD,
      DECODE("�ſ���ȸ", '-1', 'Y', 'N') ISU_CRDT,
      TRUNC("���������") BNK_CHRG,
      TRUNC("���������") AGC_CHRG,
      DECODE("�������", '-1', 'Y', 'N') PRT_YN,
      'Y' CLOSE_YN,
       'SYSTEM' CRT_USR,
       SYSDATE CRT_DT,
       'SYSTEM' EDT_USR,
       SYSDATE EDT_DT,
      "����Ư�̻���" NOTE,
      "�����̹�" PRS_NOTE_1,
      "������" PRS_NOTE_2,
      NULL ACP_MTD_1,
      NULL ACP_MTD_2,
      NULL NOTE2,
      NULL REQ_PRS_NOTE,
      NULL BNK_NOTE_TRM,
      NULL BNK_NOTE_ETC,
      NULL CARD_NOTE_TRM,
      NULL CARD_NOTE_ETC
  FROM ä�ǻ����೻�� 
 WHERE  "���ڵ�" IN (SELECT "���ڵ�" FROM �Ƿڻ��)
 --ORDER BY "���ڵ�" ,   "�����ڵ�"
 
-- �������Ư�̻��� 
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
       "���ڵ�" AS AFF_SEQ,
       NVL(TO_DATE(SUBSTR(�����,1,9)), TRUNC(SYSDATE)) + 0.0001 * ROWNUM PRS_DT,
       ��ϳ��� NOTE,
       'SYSTEM' CRT_USR,
       SYSDATE CRT_DT,
       'SYSTEM' EDT_USR,
       SYSDATE EDT_DT
  FROM �Ƿڳ���Ư�̻���      
 WHERE ���ڵ� IS NOT NULL
 
 
 
 
 -- ��������� ������ ������ �� ���û��
 UPDATE TB_AC_AFFAIR_MST
    SET AFF_PRS_STS = '30'
  WHERE (AFF_SEQ)
    IN (SELECT ���ڵ� FROM  �Ƿڻ�� WHERE ������ IS NOT NULL AND NVL(���û��,0) = 0)
    
    
    S