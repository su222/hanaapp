-- 기존꺼로 백업

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
  







-- 데이터 초기화(장표 테스트용 채권사는 제외)
-- 기존에 있던 채권사는 삭제하면 안된다.(이미 데이터 갱신이 일어났으므로 신규 채권사만 넣는다.)
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
       채권사코드 AS BND_SEQ, 
       NVL(채권사명칭,채권사) AS BND_NM,
       전화번호 BND_TEL,
       팩스번호 BND_FAX,
       주소 BND_ADDR,
       SUBSTR(우편번호,1,7) BND_ZIP,
       CASE 
            WHEN 구분 = '1구역' THEN '1'
            WHEN 구분 = '2구역' THEN '2'
            ELSE NULL 
       END ZONE_GBN,
       NULL DT_GBN,
       계좌번호 ACC_NO,
       수수료 CHRG_AMT,
       DECODE(사업자등록증,'필요', 'Y', 'N') BIZ_PRT_YN,        
       NULL FORM_FILE,
       발급예상기간 ISU_EXP_DD,
       관련명칭 RLT_NM,
       매입채권 BUY_BND,
       매각경로 SEL_ROUT,
       "발급Tip" ISU_TIP,
       'SYSTEM' CRT_USR,
        SYSDATE CRT_DT,
        'SYSTEM' EDT_USR,
        SYSDATE EDT_DT,        
       NULL FORM_SAVE_FILE,
       CASE 
            WHEN TRIM(접수방법) IN ('등기') THEN 'D'
            WHEN TRIM(접수방법) IN ('팩스', '팩스진행','fax') THEN 'D'
            WHEN TRIM(접수방법) IN ('원격', '원격지') THEN 'R'
            WHEN TRIM(접수방법) IN ('방문', '방문(지점별)') THEN 'I'
             WHEN TRIM(접수방법) IN ('등기+반송') THEN 'DR'
            ELSE NULL 
       END ACP_MTD,
       CASE 
            WHEN TRIM(서류) LIKE '%자체양식%' THEN 'S'
            WHEN TRIM(서류) LIKE '%기본%' THEN 'C'
            ELSE 'N' 
       END FORM_GBN,
       NULL ISU_NOTE,
       'A' REG_GBN,
       DECODE(도장반출,'반출','Y','N') STP_OUT_GBN,
       채권사코드 OLD_BND_SEQ,
       채권사 BND_FUL_NM,
        접수방법 OLD_ACP_MTD,
        서류 OLD_FORM_GBN,
        지점정보 OLD_BONDSPOT_NM,
        "서류특이사항" FORM_NOTE,
       "외근담당" ACP_CHG_USR,
       NULL PRT_GBN,
       'N',
       'Y'
  FROM (select *
          from 채권사정보
        order by  채권사코드 
       ) A


-- 양식파일명을 바꾸기 
UPDATE TB_CC_BOND_LST A
   SET FORM_FILE = (SELECT FORM_FILE FROM TB_CC_BOND_LST_TMP WHERE OLD_BND_SEQ = A.BND_SEQ),
       FORM_SAVE_FILE = (SELECT FORM_SAVE_FILE FROM TB_CC_BOND_LST_TMP WHERE OLD_BND_SEQ = A.BND_SEQ)
  WHERE BND_SEQ != 10000


-- 채권사 간편출력 전체출력 구분 갱신
update tb_cc_bond_lst
   set prt_gbn = 'B' 
 where (bnd_nm like '%은행%' or bnd_nm like '%카드%' or bnd_nm like '%신협%' or bnd_nm like '%새마을금고%')
 
 
update tb_cc_bond_lst
   set prt_gbn = 'A' 
 where (bnd_nm not like '%은행%' and bnd_nm not like '%카드%' and bnd_nm not like '%신협%' and bnd_nm not like '%새마을금고%') 


-- 저축은행은 모두 간편출력 N
update tb_cc_bond_lst
   set prt_gbn = 'A' 
 where (bnd_nm  like '%저축은행%') 


-- 건강보험공단, 생명사는 고객정보 공개
SELECT *
  FROM TB_CC_BOND_LST
   WHERE BND_NM LIKE '%건강보험%'
    OR BND_NM LIKE '%생명%' 



UPDATE TB_CC_BOND_LST
   SET CLT_OPN_YN = 'N'

UPDATE TB_CC_BOND_LST
   SET CLT_OPN_YN = 'Y'
 WHERE BND_NM LIKE '%건강보험%'
    OR BND_NM LIKE '%생명%' 


-- 주민번호 공개는 무조건 공개로 넣자
UPDATE TB_CC_BOND_LST
   SET JMN_OPN_YN = 'Y'


-- 채권사지점정보 
-- 채권사 지점정보는 수기로 등록 





