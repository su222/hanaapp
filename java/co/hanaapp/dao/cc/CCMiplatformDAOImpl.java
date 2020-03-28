/*
 * Project Name : 2012 GIS Project
 * Copyright(c) 2011 by TSIS
 * Create on 2011. 9. 22.
 */
package co.hanaapp.dao.cc;

import java.util.List;
import java.util.Map;


import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

/**
 * 코드디테일 등록, 수정, 삭제, 조회 등 관리 기능을 제공한다.
 * @author komm 
 */
@Repository
public class CCMiplatformDAOImpl extends SqlSessionDaoSupport implements CCMiplatformDAO {

    
	@Override
    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> query(String sqlName, Map<String, String> paramMap) {
    	
    	
		String strMapper = "co.hanaapp.dao."+sqlName;
    	
        return getSqlSession().selectList(strMapper, paramMap);
    
    
    }
    
 
}
