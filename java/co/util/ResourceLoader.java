package co.util;

/**
 *	프로그램명		:	com.amway.eshop.common.Configuration
 *	프로그램번호	:	
 *	프로그램설명	:	property 에서 필요한 정보를 읽어온다.
 *	작성자				:	eshop
 *	작성일				:	2005.09.25
 *	수정내역			:	
 */

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URL;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class ResourceLoader {
    
    private static Logger log = LoggerFactory.getLogger(ResourceLoader.class);
    
	/** JDK 1.1x버전인지 여부 */
	private  static boolean isJava1 = true;

	/**
	 * JVM 버전이  1.1.x 인지 체크한다.
	 */
	static {
	    String prop = System.getProperty("java.version", null);
	    
	    if(prop != null) {
	      int i = prop.indexOf('.');
	      if(i != -1) {	
		if(prop.charAt(i+1) != '1')
		  isJava1 = false;
	      } 
	    }
	  }	

	  /**
	    * Get the Thread Context Loader which is a JDK 1.2 feature. If we
	    * are running under JDK 1.1 or anything else goes wrong the method
	    * returns <code>null<code>.
	    *
	    *  */
	  private static ClassLoader getTCL() throws IllegalAccessException,    InvocationTargetException {

	    // Are we running on a JDK 1.2 or later system?
	    Method method = null;
	    try {
	      method = Thread.class.getMethod("getContextClassLoader", null);
	    } catch (NoSuchMethodException e) {
	      return null;
	    }
	    
	    return (ClassLoader) method.invoke(Thread.currentThread(), null);
	  }	
	  
	  public static URL getResource(String resource) {
	    ClassLoader classLoader = null;
	    URL url = null;
	    
	    try {
	  	if(!isJava1) {
	  	  classLoader = getTCL();
	  	  if(classLoader != null) {
	  	    log.debug("Trying to find ["+resource+"] using context classloader "	  			 +classLoader+".");
	  	    url = classLoader.getResource(resource);      
	  	    if(url != null) {
	  	      return url;
	  	    }
	  	  }
	  	}
	  	
	  	// We could not find resource. Ler us now try with the
	  	// classloader that loaded this class.
	  	classLoader = ResourceLoader.class.getClassLoader(); 
	  	if(classLoader != null) {
	  	  log.debug("Trying to find ["+resource+"] using "+classLoader +" class loader.");
	  	  url = classLoader.getResource(resource);
	  	  if(url != null) {
	  	    return url;
	  	  }
	  	}
	    } catch(Throwable t) {
	    	log.warn("Resource loading failed.");
	    }
	    
	    // Last ditch attempt: get the resource from the class path. It
	    // may be the case that clazz was loaded by the Extentsion class
	    // loader which the parent of the system class loader. Hence the
	    // code below.
	    log.debug("Trying to find ["+resource+
	  		   "] using ClassLoader.getSystemResource().");
	    return ClassLoader.getSystemResource(resource);
	  } 

}
