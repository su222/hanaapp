/*
 * Project Name : 2012 GIS Project
 * Copyright(c) 2011 by TSIS
 * Create on 2012. 4. 15.
 */
package co.util;

import java.lang.reflect.InvocationTargetException;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * XML 구성된 SQL 파일을 Parsing 변환하는 함수이다.
 * @author komm 
 */
public class SqlXmlUtils {

    private static final Logger log = LoggerFactory.getLogger(SqlXmlUtils.class);

    /**
     * 가변값 치환으로 구성되어 있는 SQL 구문을 바인딩 가능한 변수(?)로 변경한다.
     * @param sql SQL 구문
     * @return SQL 구문
     */
    public static String removeVariableParameter(String sql) {
        int startPos = 0, endPos = 0;
        String sectionChar = "#{";
        String searchChar = "";
        while (StringUtils.indexOf(sql, sectionChar, startPos) >= 0) {
            startPos = StringUtils.indexOf(sql, sectionChar, startPos);
            endPos = StringUtils.indexOf(sql, "}", startPos);
            if (endPos < 0) {
                log.error("SQL 구문 오류");
                return "";
            }
            searchChar = StringUtils.substring(sql, startPos, endPos + 1);
            sql = StringUtils.replace(sql, searchChar, "?");
            startPos = endPos;
        }
        return sql;
    }

    /**
     * 가변값 치환으로 구성되어 있는 SQL 구문에 바인딩할 값들을 구분자에 맞춰 문자열 형태로 반환한다.
     * @param sql SQL 구문
     * @param object 속성을 읽어 변경할 Object
     * @param delim 구분자
     * @return 바인딩할 값
     */
    public static String getVariableParameter(String sql, Object object, String delim) {
        int startPos = 0, endPos = 0;
        String sectionChar = "#{";
        String searchChar = "", searchProperty = "";
        StringBuilder parameter = new StringBuilder();
        try {
            while (StringUtils.indexOf(sql, sectionChar, startPos) >= 0) {
                startPos = StringUtils.indexOf(sql, sectionChar, startPos);
                endPos = StringUtils.indexOf(sql, "}", startPos);
                if (endPos < 0) {
                    log.error("SQL 구문 오류");
                    return "";
                }
                searchChar = StringUtils.substring(sql, startPos, endPos + 1);
                searchProperty = StringUtils.removeStart(StringUtils.split(searchChar, ",")[0], sectionChar);
                if (!PropertyUtils.isReadable(object, searchProperty)) {
                    log.error("SQL 구문 오류");
                    return "";
                }
                parameter.append(delim).append(PropertyUtils.getProperty(object, searchProperty));
                startPos = endPos;
            }
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }
        return StringUtils.removeStart(parameter.toString(), delim);
    }
}
