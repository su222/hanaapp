UPDATE TB_AC_AFFAIR_MST A
   SET SIN_NM = (SELECT SIN_NM
                   FROM TB_CC_TIEUP_LST
                  WHERE TUB_SEQ = A.TUB_SEQ
                )
                
                
SELECT *
  FROM TB_AC_AFFAIR_MST                