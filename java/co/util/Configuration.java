package co.util;

/**
 * 시스템 설정 정보
 *
 * @version $Revision: 1.1 $
 * @author $Author: chki $
 */

import java.io.File;
import java.io.FileInputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Configuration
{
    private static Logger log = LoggerFactory.getLogger(Configuration.class);
    
    /** 락을 위한 객체 */
    private static Object       lockObject      = new Object();

    /** 속성값 객체 */
    private static Properties   prop            = null;

    /** 속성 파일 마지막 변경 시간 */
    private static long         lastModified    = 0;

    /** 속성 파일명 */
    private final static String CONF_FILE_NAME  = "tacs.properties";

    /**
     * Configuration 생성자<br>
     * File이 변경되었으면 새로 생성한다.
     */
    public Configuration()
    {
        super();
        initialize();
    }

    /**
     * 주어진 key에 대한 속성값을 읽는다,
     *
     * @param key
     * @return
     */
    public String getProperty(String key)
    {

        if (prop == null)
        {
            log.error("configration not initialized");
            throw new RuntimeException("configration not initialized");
        }
        String value = prop.getProperty(key);
        if (value == null)
        {
            log.error("configration property not found : " + key);
            throw new RuntimeException("configration property not found : " + key);
        }
        return value;
    }

    /**
     * 설정을 Resource에서 읽는다.
     *
     * @param fileName 파일명
     * @return
     */
    private boolean loadFromResource(String fileName)
    {
        long fileTime = 0;
        log.debug("Loading configuration file from resource");
        try
        {
            URL url = ResourceLoader.getResource(fileName);
            if (url == null)
            {
                log.debug("Configuration file not found : " + fileName);
                return false;
            }

            URLConnection con = url.openConnection();
            fileTime = con.getIfModifiedSince();

            if ((lastModified != fileTime) || prop == null)
            {
                prop = new java.util.Properties();
                prop.load(new java.io.BufferedInputStream(con.getInputStream()));
                lastModified = fileTime;
            }

        }
        catch (Exception e)
        {
            log.debug("Error while loading configuration file : " + fileName, e);
            return false;
        }
        return true;
    }

    /**
     * 설정을 파일에서 읽는다.
     *
     * @param fileName 파일명
     * @return
     */
    private boolean loadFromFile(String fileName)
    {
        log.debug("Loading configuration file from resource");
        try
        {
            File conf_file = new File(fileName);
            if (!conf_file.canRead())
            {
                log.debug("Configuration file not found : " + fileName);
                return false;
            }

            if ((lastModified != conf_file.lastModified()) || prop == null)
            {
                prop = new java.util.Properties();
                conf_file = new File(fileName);
                prop.load(new java.io.BufferedInputStream(new FileInputStream(fileName)));
                lastModified = conf_file.lastModified();

            }

        }
        catch (Exception e)
        {
            log.debug("Error while loading configuration file : " + fileName, e);
            return false;
        }
        return true;
    }

    /**
     * 초기화한다.
     */
    public void initialize()
    {
        synchronized (lockObject)
        {
            if (!loadFromResource(CONF_FILE_NAME))
            {
                if (!loadFromFile("/" + CONF_FILE_NAME))
                {
                    log.error("Configuration file not found!");
                    throw new RuntimeException("Configuration file load error! " + CONF_FILE_NAME);
                }
            }
        }
    }
}
