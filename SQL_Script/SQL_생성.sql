/*

1. 테이블명
2. 구분: I=insert, U=update, D=delete
3. keyupdate 유무 : Y, N

*/

select FC_CC_CRT_SQL(:table_name, :gbn, :keyup) as sql  from dual 