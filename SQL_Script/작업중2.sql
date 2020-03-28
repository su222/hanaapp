SELECT 
       GBN AS ����,
       TO_CHAR(DT,'YYYY-MM-DD') AS ���ó������,
       ' ' AS ����,
       ASK_AMT AS ���߻���,
       PAY_AMT AS �Ա�ó����,
       SUM(NVL(ASK_AMT,0))  OVER (ORDER BY DT, SEQ) - PAY_AMT AS �̼��ܾ�
  FROM (
           
        SELECT BRCH_ID,
               TUB_SEQ, 
               1 AS SEQ,
               '���߻�' AS GBN,
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
              '�Ա�ó��' AS GBN,
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
         
       