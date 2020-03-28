package co.util;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CommonUtil {
	
	/**
	 * null값을 ""로 치환한다.
	 * @author 김재호(ktinybird@nate.com)
	 * @param str
	 * @return
	 */
	public static String nullToString(String input){
		String result = null;
        if (input == null){
        	result = "";
        }else{
        	result = input;
        }
        return result;
	}
	
	public static int nullToZero(Integer input){
		int result;
        if (input == null){
        	result = 0;
        }else{
        	result = input;
        }
        return result;
	}
	
	public static BigDecimal nullToBigDecimal(BigDecimal input){
		BigDecimal result = null;
		if (input == null){
			result = new BigDecimal("0");
		}else{
			result = input;
		}
		return result;
	}
	
	public static String getSysdate(){
		long nowmills = System.currentTimeMillis();
	    
	    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	    //String now = sdf.format(new Date(now));  //누군가 소스를 이렇게 올렸는데, 이렇게 하면 에러가 난다. now 이름을 다시 쓸 수 없음.
	    String now = sdf.format(new Date(nowmills));
	    return now;
	}



}
