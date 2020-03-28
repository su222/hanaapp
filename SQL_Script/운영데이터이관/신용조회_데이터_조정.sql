-- 신용조회는 신용조회만 체크되고 부채, 내용, 은행, 카드는 체크 안한다.
-- 신용조회의 기준은 채권사코드가 6235 일 경우 이다.


UPDATE TB_AC_AFFAIR_DTL
   SET ISU_DEB = 'N',
       ISU_COC = 'N',
       ISU_BNK = 'N',
       ISU_CARD = 'N',
       ISU_CRDT = 'Y'
 WHERE  (REQ_BND_SEQ = '6235' OR BND_SEQ_1 = '6235' OR  BND_SEQ_2 = '6235')
   --AND AFF_SEQ = '2000656'
   