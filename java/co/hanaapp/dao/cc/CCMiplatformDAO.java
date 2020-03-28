package co.hanaapp.dao.cc;


import java.util.List;
import java.util.Map;


public interface CCMiplatformDAO {
	
	// SQL 실행
	public List<Map<String, Object>> query(String sqlName, Map<String, String> paramMap);


}
