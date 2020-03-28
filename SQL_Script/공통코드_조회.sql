select A.MST_CD, A.MST_NM,b.dtl_cd,b.dtl_nm, b.txt_val1, b.txt_val2, b.txt_val3, b.num_val1, b.num_val2, b.num_val3
  from tb_cc_code_mst a, tb_cc_code_dtl b
 where a.mst_cd = b.mst_cd
   and a.mst_cd like '%'||:mst_cd||'%'
   and a.mst_nm like '%'||:mst_nm||'%'
   AND B.DTL_CD LIKE '%'||:DTL_ID||'%'
   and b.dtl_nm like '%'||:dtl_nm||'%'
 order by A.MST_CD, B.DTL_CD
 
 