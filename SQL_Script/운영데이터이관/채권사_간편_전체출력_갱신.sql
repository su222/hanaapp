TB_CC_BOND_LST

update tb_cc_bond_lst
   set prt_gbn = 'B' 
 where (bnd_nm like '%은행%' or bnd_nm like '%카드%' or bnd_nm like '%신협%' or bnd_nm like '%새마을금고%')
 
 
update tb_cc_bond_lst
   set prt_gbn = 'A' 
 where (bnd_nm not like '%은행%' and bnd_nm not like '%카드%' and bnd_nm not like '%신협%' and bnd_nm not like '%새마을금고%') 
 
select count(*)
  from tb_cc_bond_lst
 where bnd_nm is not null 
 