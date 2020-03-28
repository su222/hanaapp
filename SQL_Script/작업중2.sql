SELECT 
       GBN AS 구분,
       TO_CHAR(DT,'YYYY-MM-DD') AS 비용처리일자,
       ' ' AS 적요,
       ASK_AMT AS 당기발생금,
       PAY_AMT AS 입금처리금,
       SUM(NVL(ASK_AMT,0))  OVER (ORDER BY DT, SEQ) - PAY_AMT AS 미수잔액
  FROM (
           
        SELECT BRCH_ID,
               TUB_SEQ, 
               1 AS SEQ,
               '비용발생' AS GBN,
               A.ASK_DT AS DT, 
               A.UNP_AMT,
               OCC_AMT,
               A.ASK_AMT,
               0 AS PAY_AMT
          FROM TB_AC_TIEUPASK_MST A
        UNION ALL
        SELECT BRCH_ID,
               TUB_SEQ, 
               2 AS SEQ,
              '입금처리' AS GBN,
              A.PAY_DT AS DT,
              0 AS UNP_AMT,
              0 AS OCC_AMT,
              0 AS ASK_AMT,
              A.PAY_AMT
         FROM TB_AC_TIEUPPAY_LST A
       )    
  WHERE BRCH_ID = '$1'
    AND TUB_sEQ = '$2' 
ORDER BY DT, SEQ    
         
       