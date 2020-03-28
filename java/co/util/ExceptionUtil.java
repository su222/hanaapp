package co.util;


import java.math.BigDecimal;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang.StringUtils;
import org.aspectj.lang.JoinPoint;
import org.mybatis.spring.MyBatisSystemException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.jdbc.UncategorizedSQLException;

import co.hanaapp.bean.common.MessageBean;
import co.hanaapp.exception.ValidationException;
import co.hanaapp.system.aop.ExceptionAspect;

public class ExceptionUtil {
	
    private static final Logger log = LoggerFactory.getLogger(Exception.class);

	
	/**
	 * 에러 메시지 치환
	 * @author komm
	 * @param str
	 * @return
	 */
	public static String ConvertMessage(Exception e)
	{

    	
        String message = e.getMessage();
        Boolean isSqlErr = false;
        if (StringUtils.contains(message, "SQLException: ")) {
            isSqlErr = true;
            // SQL Exception Message 정제
            message = StringUtils.substringAfter(message, "SQLException: ");
            message = StringUtils.substringBefore(message, "###").trim();
            log.error("+--->[Core SQLException] {}", message);
        } else {
            log.error("+--->[Core Exception] {}", message);
        }

        // SQL Exception Custom Message
        if (e instanceof BadSqlGrammarException || e instanceof MyBatisSystemException) {
            // SQL 구문 오류
            isSqlErr = true;
            message = MessageBean.getMessage("sql.error.msg02");
        } else if (e instanceof DuplicateKeyException) {
            // 중복된 Key 값 입력 오류
        	isSqlErr = true;
        	message = MessageBean.getMessage("sql.error.msg03");
        }
        else if (e instanceof DataIntegrityViolationException) {
            // 무결성 오류
        	isSqlErr = true;
        	message = MessageBean.getMessage("sql.error.msg04");
        }
        
        else if (e instanceof SQLException || e instanceof UncategorizedSQLException) {
            String[] sqlErrors = StringUtils.split(message, "ORA-");
            for (String sqlError : sqlErrors) {
                if (sqlError.length() > 5 && StringUtils.isNumeric(StringUtils.left(sqlError, 5))) {
                    String sqlErrCode = StringUtils.substringBefore(sqlError, ":");
                    
                    /////////////////////////////// Oracle 메시지를 여기에 넣기 //////////////////////////////////////////
                    if (sqlErrCode.indexOf("12899") > -1) {
                        // 입력값 너무큼
                    	isSqlErr = true;
                    	message = MessageBean.getMessage("sql.error.msg01");
                        break;
                    }
                    else if (sqlErrCode.indexOf("02292") > -1) {
                        // 무결성
                    	isSqlErr = true;
                    	message = MessageBean.getMessage("sql.error.msg04");
                        
                        break;
                    }
                }
            }
            
  
            
        } else if (e instanceof NullPointerException) {
        	message = MessageBean.getMessage("general.illegal.argument");
        } else if (e instanceof ValidationException) {
        	message = MessageBean.getMessage("general.validation.argument");
        }

        log.error("+--->[Core SQLException class] {}", e.getClass());
    
        return message;
	
	}	
	
	
	
}
