/*
 * Project Name : 2012 GIS Project
 * Copyright(c) 2011 by TSIS
 * Create on 2012. 3. 3.
 */
package co.hanaapp.bean.common;

import java.util.Locale;

import org.springframework.context.support.MessageSourceAccessor;

/**
 * @author komm 
 */
public class MessageBean {

    private static MessageSourceAccessor messageSourceAccessor;

    public void setMessageSourceAccessor(MessageSourceAccessor messageSourceAccessor) {
        MessageBean.messageSourceAccessor = messageSourceAccessor;
    }

    /**
     * KEY에 해당하는 메시지 반환
     * @param key
     * @return 메시지
     */
    public static String getMessage(String key) {
        return messageSourceAccessor.getMessage(key, Locale.getDefault());
    }

    /**
     * KEY에 해당하는 메시지 반환
     * @param key
     * @param objs
     * @return 메시지
     */
    public static String getMessage(String key, Object[] objs) {
        return messageSourceAccessor.getMessage(key, objs, Locale.getDefault());
    }
}
