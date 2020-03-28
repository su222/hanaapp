-- �������� ���

DROP TABLE TB_CC_BONDSPOT_LST_TMP

create TABLE TB_CC_BONDSPOT_LST_TMP
AS 
SELECT *
  FROM TB_CC_BONDSPOT_LST

DROP TABLE TB_CC_USERBOND_LST_TMP

create TABLE TB_CC_USERBOND_LST_TMP
AS 
SELECT *
  FROM TB_CC_USERBOND_LST

DROP TABLE TB_CC_BOND_LST_TMP
  
create TABLE TB_CC_BOND_LST_TMP
AS 
SELECT *
  FROM TB_CC_BOND_LST
  







-- ������ �ʱ�ȭ(��ǥ �׽�Ʈ�� ä�ǻ�� ����)
-- ������ �ִ� ä�ǻ�� �����ϸ� �ȵȴ�.(�̹� ������ ������ �Ͼ���Ƿ� �ű� ä�ǻ縸 �ִ´�.)
/*
DELETE FROM TB_CC_USERBOND_LST
WHERE BND_SEQ != 10000


DELETE FROM TB_CC_BONDSPOT_LST
WHERE BND_SEQ != 10000

delete from TB_CC_BOND_LST
WHERE BND_SEQ != 10000
*/




INSERT INTO TB_CC_BOND_LST
(BRCH_ID,
BND_SEQ,
BND_NM,
BND_TEL,
BND_FAX,
BND_ADDR,
BND_ZIP,
ZONE_GBN,
DT_GBN,
ACC_NO,
CHRG_AMT,
BIZ_PRT_YN,
FORM_FILE,
ISU_EXP_DD,
RLT_NM,
BUY_BND,
SEL_ROUT,
ISU_TIP,
CRT_USR,
CRT_DT,
EDT_USR,
EDT_DT,
FORM_SAVE_FILE,
ACP_MTD,
FORM_GBN,
ISU_NOTE,
REG_GBN,
STP_OUT_GBN,
OLD_BND_SEQ,
BND_FUL_NM,
OLD_ACP_MTD,
OLD_FORM_GBN,
OLD_BONDSPOT_NM,
FORM_NOTE, 
ACP_CHG_USR, 
PRT_GBN,
CLT_OPN_YN,
JMN_OPN_YN
)
SELECT 'H10' AS BRCH_ID,
       ä�ǻ��ڵ� AS BND_SEQ, 
       NVL(ä�ǻ��Ī,ä�ǻ�) AS BND_NM,
       ��ȭ��ȣ BND_TEL,
       �ѽ���ȣ BND_FAX,
       �ּ� BND_ADDR,
       SUBSTR(�����ȣ,1,7) BND_ZIP,
       CASE 
            WHEN ���� = '1����' THEN '1'
            WHEN ���� = '2����' THEN '2'
            ELSE NULL 
       END ZONE_GBN,
       NULL DT_GBN,
       ���¹�ȣ ACC_NO,
       ������ CHRG_AMT,
       DECODE(����ڵ����,'�ʿ�', 'Y', 'N') BIZ_PRT_YN,        
       NULL FORM_FILE,
       �߱޿���Ⱓ ISU_EXP_DD,
       ���ø�Ī RLT_NM,
       ����ä�� BUY_BND,
       �Ű���� SEL_ROUT,
       "�߱�Tip" ISU_TIP,
       'SYSTEM' CRT_USR,
        SYSDATE CRT_DT,
        'SYSTEM' EDT_USR,
        SYSDATE EDT_DT,        
       NULL FORM_SAVE_FILE,
       CASE 
            WHEN TRIM(�������) IN ('���') THEN 'D'
            WHEN TRIM(�������) IN ('�ѽ�', '�ѽ�����','fax') THEN 'D'
            WHEN TRIM(�������) IN ('����', '������') THEN 'R'
            WHEN TRIM(�������) IN ('�湮', '�湮(������)') THEN 'I'
             WHEN TRIM(�������) IN ('���+�ݼ�') THEN 'DR'
            ELSE NULL 
       END ACP_MTD,
       CASE 
            WHEN TRIM(����) LIKE '%��ü���%' THEN 'S'
            WHEN TRIM(����) LIKE '%�⺻%' THEN 'C'
            ELSE 'N' 
       END FORM_GBN,
       NULL ISU_NOTE,
       'A' REG_GBN,
       DECODE(�������,'����','Y','N') STP_OUT_GBN,
       ä�ǻ��ڵ� OLD_BND_SEQ,
       ä�ǻ� BND_FUL_NM,
        ������� OLD_ACP_MTD,
        ���� OLD_FORM_GBN,
        �������� OLD_BONDSPOT_NM,
        "����Ư�̻���" FORM_NOTE,
       "�ܱٴ��" ACP_CHG_USR,
       NULL PRT_GBN,
       'N',
       'Y'
  FROM (select *
          from ä�ǻ�����
        order by  ä�ǻ��ڵ� 
       ) A


-- ������ϸ��� �ٲٱ� 
UPDATE TB_CC_BOND_LST A
   SET FORM_FILE = (SELECT FORM_FILE FROM TB_CC_BOND_LST_TMP WHERE OLD_BND_SEQ = A.BND_SEQ),
       FORM_SAVE_FILE = (SELECT FORM_SAVE_FILE FROM TB_CC_BOND_LST_TMP WHERE OLD_BND_SEQ = A.BND_SEQ)
  WHERE BND_SEQ != 10000


-- ä�ǻ� ������� ��ü��� ���� ����
update tb_cc_bond_lst
   set prt_gbn = 'B' 
 where (bnd_nm like '%����%' or bnd_nm like '%ī��%' or bnd_nm like '%����%' or bnd_nm like '%�������ݰ�%')
 
 
update tb_cc_bond_lst
   set prt_gbn = 'A' 
 where (bnd_nm not like '%����%' and bnd_nm not like '%ī��%' and bnd_nm not like '%����%' and bnd_nm not like '%�������ݰ�%') 


-- ���������� ��� ������� N
update tb_cc_bond_lst
   set prt_gbn = 'A' 
 where (bnd_nm  like '%��������%') 


-- �ǰ��������, ������ ������ ����
SELECT *
  FROM TB_CC_BOND_LST
   WHERE BND_NM LIKE '%�ǰ�����%'
    OR BND_NM LIKE '%����%' 



UPDATE TB_CC_BOND_LST
   SET CLT_OPN_YN = 'N'

UPDATE TB_CC_BOND_LST
   SET CLT_OPN_YN = 'Y'
 WHERE BND_NM LIKE '%�ǰ�����%'
    OR BND_NM LIKE '%����%' 


-- �ֹι�ȣ ������ ������ ������ ����
UPDATE TB_CC_BOND_LST
   SET JMN_OPN_YN = 'Y'


-- ä�ǻ��������� 
-- ä�ǻ� ���������� ����� ��� 





