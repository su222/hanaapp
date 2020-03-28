


 -- MS-SQL에서 데이터 받을때 받기전에 테이블 drop 및 delete 해야됨
 
drop table 내용증명발송리스트;
drop table 등기업무일지        ;
drop table 등기업무일지특이사항;
drop table 사건입금리스트;
drop table 우편발송리스트;
drop table 의뢰내역특이사항;
drop table 입금내역;
drop table 입금처리내역;
drop table 제휴사관리;
drop table 제휴사담당자;
drop table 제휴사입금내역요청;
drop table 제휴사입금리스트;
drop table 제휴사특이사항;
drop table 직원관리;
drop table 채권사정보;
drop table 채권사특이사항;


-- 이 테이블은 대용량이므로 delete 로 한다.
-- java 에서는 insert만 할뿐~

delete from 외근업무일지;

delete from 의뢰사건;

delete from 채권사진행내역;


commit;