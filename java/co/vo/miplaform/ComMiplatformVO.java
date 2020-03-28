/*
 * Project Name : GIS Project
 * Copyright(c) 2011 by TSIS corporation
 * Create on 2011. 10. 18.
 */
package co.vo.miplaform;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;

import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;



/**
 * TABLE NAME : Miplatform<br>
 * COMMENTS   : Miplatform 테스트
 * @author komm 이용재
 */
@SuppressWarnings("serial")
public class ComMiplatformVO  implements Serializable {

    
	private VariableList vl;	// 
	private DatasetList dl;
	public VariableList getVl() {
		return vl;
	}
	public void setVl(VariableList vl) {
		this.vl = vl;
	}
	public DatasetList getDl() {
		return dl;
	}
	public void setDl(DatasetList dl) {
		this.dl = dl;
	}
   
    








}