-- �ſ���ȸ�� �ſ���ȸ�� üũ�ǰ� ��ä, ����, ����, ī��� üũ ���Ѵ�.
-- �ſ���ȸ�� ������ ä�ǻ��ڵ尡 6235 �� ��� �̴�.


UPDATE TB_AC_AFFAIR_DTL
   SET ISU_DEB = 'N',
       ISU_COC = 'N',
       ISU_BNK = 'N',
       ISU_CARD = 'N',
       ISU_CRDT = 'Y'
 WHERE  (REQ_BND_SEQ = '6235' OR BND_SEQ_1 = '6235' OR  BND_SEQ_2 = '6235')
   --AND AFF_SEQ = '2000656'
   