package co.hanaapp.service.miplatform;


import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import co.hanaapp.dao.cc.CCMiplatformDAOImpl;
import co.util.ExceptionUtil;
import co.vo.miplaform.*;

import com.tobesoft.platform.data.ColumnInfo;
import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;

/**
 * @description 업무와 관련 로직을 실제로 구현하는 메소드들을 포함하고 있는 class를 정의한다. 웹 서비스를 통해 핵심
 *              업무로직을 요청하고 그 결과를 받아 사용자에게 전달하는 역할을 하며 웹 서비스 와의 연결을 중계하여 클라이언트
 *              개발자로 하여금 웹 서비스를 인식하지 않고 업무로직을 호출할 수 있도록 한다.
 * @since 2011-05-01
 * @author Kwangje Cho
 */
@Service
@Transactional(readOnly = true, rollbackFor = Exception.class)
public class CCMiplatformSVCImpl implements CCMiplatformSVC {

	private static Logger log = LoggerFactory
			.getLogger(CCMiplatformSVCImpl.class);

	@Autowired
	private CCMiplatformDAOImpl cCommonDao;

	// 처리용
	public ComMiplatformVO sendData(List<CCMiplatformInputVO> list) {
		// TODO Auto-generated method stub

		
		VariableList vl = new VariableList() ;
		DatasetList dl = new DatasetList();		
		String key;
		String value;	
		int ds_row;
		
		ComMiplatformVO comMiplatformVO = new ComMiplatformVO();
		
		
		try {
			
		
			// input 인자 확인
			for (int i = 0; i < list.size(); i++) {
	
				CCMiplatformInputVO vo = (CCMiplatformInputVO) list.get(i);
			
				List<Map<String, Object>> retList = cCommonDao.query(vo.getSqlName(), vo.getParmValue());		
			
				
				// 값이 있을때만 datalist에 넣어야 된다 없을때 넣으면 데이터셋이 null로 만들어져 컬럼 매핑이 안된다.	
				if(retList.size() > 0)
				{
					
					Dataset ds = new Dataset(vo.getDatasetName());
					
					for (int row = 0; row < retList.size(); row++) {
		
						Map<String, Object> mm = retList.get(row);
											
						// 첫행일때만 Col 정보 넣기 
						if(row == 0)
						{
							Iterator iter_col = mm.keySet().iterator();
							
							while (iter_col.hasNext()) {
								ds.addColumn((String)iter_col.next(), ColumnInfo.CY_COLINFO_STRING, 255);
							}
						}
						
						
						// 행추가
						ds_row = ds.appendRow();
						
						Iterator iter_val = mm.keySet().iterator();
		
						while (iter_val.hasNext()) {
		
							key = (String) iter_val.next();
							value = mm.get(key).toString();
							
							// 공백 제거 
							// -999 제거 (숫자 NULL일 경우 -99999 처리)
							if(value.equals(" ")) value = "";
							if(value.equals("-99999")) value = "";
							
							// 값 채우기
							ds.setColumn(ds_row, key, value);
						
						}
					}
					
					dl.addDataset(ds);
				}
					
			}
			
			vl.addStr("ErrorCode", "0");
			vl.addStr("ErrorMsg", "SUCCESS");
			vl.addStr("resultCode", "0");	//  0 이면 정상 
			vl.addStr("resultMessage", null);	// 실제로 사용하는거		
		}
		catch (Exception e) {
			
			
			// Miplatform Dataset 생성
			vl = new VariableList();

			String message = ExceptionUtil.ConvertMessage(e);
			
			
			vl.addStr("ErrorCode", "-1");
			vl.addStr("ErrorMsg", message);
			vl.addStr("resultCode", "-1");	//  0 이면 정상 
			vl.addStr("resultMessage", message);	// 실제로 사용하는거		
			
			
			
			
			//e.printStackTrace();
		}			
		finally {
			comMiplatformVO.setVl(vl);
			comMiplatformVO.setDl(dl);		
		}
		
		return comMiplatformVO;
	}


	
}
