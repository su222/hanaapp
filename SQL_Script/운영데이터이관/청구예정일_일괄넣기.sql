SELECT *
  FROM TB_AC_AFFAIR_MST
 WHERE AFF_SEQ = '2000211'


TB_CC_TIEUP_LST


SELECT  FC_CC_GET_ASKEXP_DATE( 'H10' /**P*/ ,  '1259' /**P*/,  '20140302' /**P*/, 1)  -- �Ϸ��
  FROM DUAL
  
  
  
UPDATE TB_AC_AFFAIR_MST
   SET ASK_EXP_DT =   FC_CC_GET_ASKEXP_DATE( BRCH_ID ,  TUB_SEQ,  AFF_ED_DT, 0)
 WHERE AFF_PRS_STS >= '20'
   AND AFF_ED_DT BETWEEN '20130101' AND '20131231'
   
   
SELECT *
  FROM TB_AC_AFFAIR_MST
 WHERE AFF_PRS_STS IN ('20', '25') 
   AND AFF_ED_DT IS NOT NULL
   
     