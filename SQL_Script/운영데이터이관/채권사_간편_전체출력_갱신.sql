TB_CC_BOND_LST

update tb_cc_bond_lst
   set prt_gbn = 'B' 
 where (bnd_nm like '%����%' or bnd_nm like '%ī��%' or bnd_nm like '%����%' or bnd_nm like '%�������ݰ�%')
 
 
update tb_cc_bond_lst
   set prt_gbn = 'A' 
 where (bnd_nm not like '%����%' and bnd_nm not like '%ī��%' and bnd_nm not like '%����%' and bnd_nm not like '%�������ݰ�%') 
 
select count(*)
  from tb_cc_bond_lst
 where bnd_nm is not null 
 