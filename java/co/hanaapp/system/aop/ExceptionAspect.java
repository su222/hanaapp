/*
 * Project Name : 2012 GIS Project
 * Copyright(c) 2011 by TSIS
 * Create on 2012. 3. 23.
 */
package co.hanaapp.system.aop;


import java.sql.SQLException;


import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.aspectj.lang.JoinPoint;
import org.mybatis.spring.MyBatisSystemException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.jdbc.UncategorizedSQLException;

import co.hanaapp.bean.common.MessageBean;
import co.hanaapp.exception.ValidationException;

/**
 * AOP를 사용하여 Exception 발생하면 log 남기도록 Aspect Class 정의한다.
 * @author komm 
 */
public class ExceptionAspect {

    private static final Logger log = LoggerFactory.getLogger(ExceptionAspect.class);

    /**
     * Exception AOP Handler
     * AfterThrowing(pointcut = "execution(* nds..webservice.*Impl.*(..))", throwing = "e")
     */
    public void daoHandlerException(JoinPoint joinPoint, Exception e) throws Throwable {

        
    	//System.out.println("system.aop.ExceptionAspect.daoHandlerException Start!!!!!!!!!!!!!!!!");
    	
    	//e.printStackTrace();
    	
    	
    	
    	log.error("+--->[Core Exception] {}", buildSimpleExecutionInfo(joinPoint));

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
        Boolean isSqlCustomMsg = false;
        if (e instanceof BadSqlGrammarException || e instanceof MyBatisSystemException) {
            // SQL 구문 오류
            isSqlErr = true;
            isSqlCustomMsg = true;
            message = MessageBean.getMessage("sql.error.msg02");
        } else if (e instanceof DuplicateKeyException) {
            // 중복된 Key 값 입력 오류
            isSqlCustomMsg = true;
            message = MessageBean.getMessage("sql.error.msg03");
        } else if (e instanceof SQLException || e instanceof UncategorizedSQLException) {
            String[] sqlErrors = StringUtils.split(message, "ORA-");
            for (String sqlError : sqlErrors) {
                if (sqlError.length() > 5 && StringUtils.isNumeric(StringUtils.left(sqlError, 5))) {
                    String sqlErrCode = StringUtils.substringBefore(sqlError, ":");
                    
                    
                    System.out.println("SQL ERR="+sqlErrCode);
                    

                    /////////////////////////////// Oracle 메시지를 여기에 넣기 //////////////////////////////////////////
                    if (sqlErrCode.equals("12899")) {
                        // 입력값 너무큼
                        isSqlCustomMsg = true;
                        message = MessageBean.getMessage("sql.error.msg01");
                        break;
                    }
                    else if (sqlErrCode.equals("02292")) {
                        // 무결성
                        isSqlCustomMsg = true;
                        message = MessageBean.getMessage("sql.error.msg04");
                        
                        break;
                    }
                    else if (sqlErrCode.equals("20501")) {
                        // 커스텀 오류
                        isSqlCustomMsg = true;
                        message = StringUtils.substringAfter(sqlError,":");
                        break;
                    }                    
                                          
                    
                    
                    
                    
                }
            }
        } else if (e instanceof NullPointerException) {
            throw new RuntimeException(MessageBean.getMessage("general.illegal.argument"), e);
        } else if (e instanceof ValidationException) {
            ValidationException ve = (ValidationException)e;
            throw new RuntimeException(MessageBean.getMessage(ve.getErrorMessageCode()), e);
        }

        if (isSqlErr) {
            if (isSqlCustomMsg) {
                throw new RuntimeException(StringUtils.isBlank(message) ? MessageBean.getMessage("sql.error.msg02") : message, e);
            } else {
                log.error("+--->[Core SQLException class] {}", e.getClass());
                throw new RuntimeException(MessageBean.getMessage("progress.error"), e);
            }
//            throw new RuntimeException(isSqlCustomMsg ? message : MessageBean.getMessage("progress.error"), e);
        }
    }

    /**
     * 호출 메서드의 클래스 정보와 파라미터 정보를 아래와 같이 보여 줍니다. 
     * ex) UserService.insertUser(User[id =testhihi,name=안녕하세요,password=12312,info=회원정보])
     */
    private static final String buildSimpleExecutionInfo(JoinPoint joinPoint) {
        StringBuilder execution = new StringBuilder();

        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        execution.append(className).append(".");
        execution.append(methodName);

        String dummy = "";
        execution.append("(");
        for (Object param : joinPoint.getArgs()) {
            if (param instanceof String) {
                execution.append("String" + "[" + param + "]");
            } else {
                dummy = ToStringBuilder.reflectionToString(param, ToStringStyle.SHORT_PREFIX_STYLE);
                execution.append(dummy);
            }
            execution.append(", ");
        }
        if (joinPoint.getArgs().length > 0) {
            execution.deleteCharAt(execution.lastIndexOf(", "));
        }
        execution.append(")");

        return execution.toString();
    }
}
