-- 공통코드 넣기
-- 코드정의서로 넣는다.

TB_CC_CODE_MST
TB_CC_CODE_DTL

select *
  from tb_cc_code_mst 

select *
  from tb_cc_code_DTL

-- 회사정보 넣기 

TB_CC_BRCH_BAS

BRCH_ID    BRCH_NM    CORP_NO    BIZ_NO    TEL_NO    FAX_NO    ADDR_NM    ZIP_CD    CHG_NM    USE_YN    CRT_USR    CRT_DT    EDT_USR    EDT_DT
H10    하나정보                                Y    INIT        INIT    


-- 부서정보 넣기
TB_CC_DEPT_BAS

BRCH_ID    DEPT_CD    DEPT_NM    UP_DEPT_CD    DEPT_LVL    NOTE    USE_YN    CRT_USR    CRT_DT    EDT_USR    EDT_DT
H10    100000    임원        1        Y                
H10    110000    관리부    100000    2        Y                

-- 사용자정보 넣기 
TB_CC_USER_LST

BRCH_ID    USR_ID    DEPT_CD    USR_PWD    USR_NM    USR_GBN    TEL_NO    HP_NO    EMAIL    ST_DT    ED_DT    ADDR    USE_YN    CRT_USR    CRT_DT    EDT_USR    EDT_DT
H10    komm    110000    1    이용재    10                            Y                
 




DROP PUBLIC DATABASE LINK GIS;

CREATE PUBLIC DATABASE LINK GIS
 CONNECT TO HECON
 IDENTIFIED BY by21c
 USING 'HEDATA_GIS';
 
 
 
 select *
   from tb_cc_brch_bas@gis