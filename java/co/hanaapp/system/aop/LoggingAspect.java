package co.hanaapp.system.aop;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.aspectj.lang.JoinPoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * AOP를 사용하여 데이터처리 및 업무로직 서비스 모듈에 속한 Method 호출 전/후에 log 남기도록 Aspect Class 정의한다.
 * @since 2011-05-01
 * @author Kwangje Cho
 */
public class LoggingAspect {

    private static final Logger log = LoggerFactory.getLogger(LoggingAspect.class);

    /**
     * Service AOP
     * Before("execution(* nds.ndap..*SVCImpl.*(..))")
     */
    public void doServiceProfiling(JoinPoint joinPoint) throws Throwable {
        log.debug("+--->[CORE ServiceImpl] {}", buildSimpleExecutionInfo(joinPoint));
    }

    /**
     * WEBService AOP
     * Before("execution(* nds.ndap..*WSImpl.*(..))")
     */
    public void doWebServiceProfiling(JoinPoint joinPoint) throws Throwable {
        log.debug("+--->[CORE WSImpl] {}", buildSimpleExecutionInfo(joinPoint));
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
