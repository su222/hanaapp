/*
 * Project Name : 2012 GIS 열배관 관리 System
 * Copyright(c) 2012 by BY21C
 * Create on 2012. 12. 01.
 */
package co.hanaapp.controller.miplatform;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import co.hanaapp.service.miplatform.CCMiplatformSVC;
import co.util.SqlInfo;
import co.vo.miplaform.*;

import com.ibm.icu.util.StringTokenizer;
import com.tobesoft.platform.PlatformRequest;
import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.PlatformData;
import com.tobesoft.platform.data.VariableList;


/**
 * Miplatform Control
 * @author komm
 */
@Controller
@RequestMapping("/common")
public class CCMiplatformCTL {

	private static final String CONTEXT_PATH = "common";


//	@Autowired
//	private CCMiplatformWS CCMiplatformWS;
	
    @Autowired
    private CCMiplatformSVC cCMiplatformSVC;	


	private static final Logger log = LoggerFactory.getLogger(CCMiplatformCTL.class);
	
	
	
	/**
	 * Miplatform 호출
	 */
	@RequestMapping("/select_mi")
	@SuppressWarnings({ "unchecked", "deprecation" })
	public ModelMap selectMiplatform(HttpServletRequest request, 
			HttpServletResponse response,
			ComMiplatformVO comMiplatformVO) {

		ModelMap modelMap = new ModelMap();
		
		VariableList vl = new VariableList() ;
		DatasetList dl = new DatasetList();
		
		List<CCMiplatformInputVO> inputs = this.setInputData(request, SqlInfo.SQLINFO_SELECT);

		// 서비스 호출
		comMiplatformVO = cCMiplatformSVC.sendData(inputs);

		
		modelMap.addObject("comMiplatformVO", comMiplatformVO);				
					

		return modelMap;
	
	}




	/**
	 * input VO 생성
	 */
	
	private List<CCMiplatformInputVO> setInputData(HttpServletRequest request, short sqlInfo) {

		//ModelMap modelMap = new ModelMap();
		Map<String, String> keyMap = new HashMap<String, String>();
		List<CCMiplatformInputVO> parm = new ArrayList<CCMiplatformInputVO>();
		
		try {
		
			// Miplatform 전송데이터 받기	
			PlatformRequest platformRequest = new PlatformRequest (request, "euc-kr");
			platformRequest.receiveData();
			PlatformData inMixml = platformRequest.getPlatformData();   
			
			log.debug("inMixml=" + inMixml.toString());
			
	
			VariableList vars = inMixml.getVariableList();
			Map varmap = vars.getVariableMap();
			DatasetList in_dl = platformRequest.getDatasetList();
	
			// 파라미터 생성
			Iterator iter = varmap.keySet().iterator();
	
			while (iter.hasNext()) {
				String key = (String)iter.next();
				String value = varmap.get(key).toString();
	
				if (value == null) {
					value = "";
				}
				

	
				keyMap.put(key, value);
			}
	
	
			// SQL 생성(다중 SQL 분리)
			// SQL은 패키지명.클래스명.ID이다
			String strSql = varmap.get("_sqlName").toString();
	
			StringTokenizer tokens = new StringTokenizer(strSql, ",");
	
			int count = tokens.countTokens();

			CCMiplatformInputVO vo;

			for (int i = 0; i < count; i++) {

				String sqlName = tokens.nextToken().trim();
				Dataset ds = in_dl.getDataset(sqlName);
				Map <String, String> cols = new HashMap<String, String>();

				if(ds != null) { 
				
					// Dataset Loop로 vo 만들기
					for(int row=0;row<ds.getRowCount();row++) {
	
						cols = new HashMap<String, String>();
	
						//  Map 생성 
						for(int col = 0; col<ds.getColumnCount();col++) {
							cols.put(ds.getColumnID(col), ds.getColumn(row, col).getString());
						}
	
						vo = new CCMiplatformInputVO();
	
						vo.setDatasetName(sqlName);
						vo.setSqlName(sqlName);
						vo.setParmValue(cols);
						vo.setSqlType(sqlInfo);
	
						parm.add(vo);
					}
				}
				else {
					
					vo = new CCMiplatformInputVO();
					
					vo.setDatasetName(sqlName);
					vo.setSqlName(sqlName);
					vo.setParmValue(keyMap);
					vo.setSqlType(sqlInfo);
		
					parm.add(vo);				
				}
		
			}	
		}
		catch (Exception e) {
			e.printStackTrace();
		}			
		return parm;
	}
	
	
	
	
	/**
	 * AJAX 한글 깨짐 없이 통신하기 위해 별도의 ResponseEntity 설정한다.
	 * @param map 화면에 넘겨줄 Map
	 * @return 화면에 넘겨줄 ResponseEntity
	 */
	private ResponseEntity<Map<String, Object>> returnEntity(Map<String, Object> map) {
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.add("Content-Type", "application/json; charset=utf-8");
		return new ResponseEntity<Map<String, Object>>(map, responseHeaders, HttpStatus.CREATED);
	}
}
