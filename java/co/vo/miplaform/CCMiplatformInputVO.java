/*
 * Project Name : GIS Project
 * Copyright(c) 2013 by BY21C corporation
 * Create on 2011. 10. 18.
 */
package co.vo.miplaform;

import java.io.Serializable;
import java.util.Map;



/**
 * TABLE NAME : Miplatform<br>
 * COMMENTS   : Miplatform 입력항목
 * @author komm 이용재
 */
@SuppressWarnings("serial")
public class CCMiplatformInputVO  implements Serializable {

    
	private String sqlName;	// SqlName
    private Map<String, String> parmValue;	// 파라미터 Map
    private String datasetName;	// outDataSet Name
    private short sqlType;		// sql 방식 (select, transaction) => 현재 의미 없음
	
    public String getSqlName() {
		return sqlName;
	}
	public void setSqlName(String sqlName) {
		this.sqlName = sqlName;
	}
	public Map<String, String> getParmValue() {
		return parmValue;
	}
	public void setParmValue(Map<String, String> parmValue) {
		this.parmValue = parmValue;
	}
	public String getDatasetName() {
		return datasetName;
	}
	public void setDatasetName(String datasetName) {
		this.datasetName = datasetName;
	}
	public short getSqlType() {
		return sqlType;
	}
	public void setSqlType(short sqlType) {
		this.sqlType = sqlType;
	}
	
   
    








}