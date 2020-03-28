package co.util;

//import tacs.common.dao.DAO;
//import tacs.common.dao.DAOException;

public class SmsUtility {
    
    /**
     * SMS를 발송한다.
     * @param sendPhone 보내는사람 번호
     * @param destPhone 받는사람 번호
     * @param msgBody 내용
     * @param sendTime 예약발송 시간
     * @param sender 보내는 사람
     * @throws DAOException
     */
/*    public static void send( String cmid, String sendPhone, String[] destPhone, String msgBody, String sendTime, String sender, String recYn, String authNo) throws DAOException {
        DAO dao = null;
        try {
            dao = DAO.getDAO();
            
            //예약발송이면 특정날짜를, 아니면 sysdate
            String tmp_sendTime = "";
            if("T".equals(recYn)) {
                tmp_sendTime = "to_date('" + sendTime + "', 'yyyymmddhh24:mi')";
            } else {
                tmp_sendTime = "sysdate";
            }
            
            //보내는 사람의 번호가 배열로 넘어오지 않았을 경우 배열화
            String[] destNum = splitPhoneNumber(destPhone);

            //sms전송
            String query =" INSERT INTO  uds.SC_TRAN                                           \n" +
                          "     ( tr_num, tr_sendstat, tr_msgtype, tr_senddate, tr_phone,      \n" +
                          "       tr_callback, tr_msg, tr_etc2, tr_etc3, tr_etc4 )             \n" +
                          "     VALUES (get_seq('SC_TRAN'), '0', '0', " + tmp_sendTime + ", ?, ?, ?, ?, 'SY31003', 'SY32001') ";
           
            //update
            for(int i = 0; i < destNum.length; i++) {
                if(destNum[i].equals(""))
                    continue;
            //dao.update( query, new Object[] { cmid, getPhoneNumber(destNum[i]), sendPhone, msgBody, sender, authNo});
                dao.update( query, new Object[] { getPhoneNumber(destNum[i]), sendPhone, msgBody, sender });
            }
            
            dao.commit();
        } catch (DAOException e) {
            e.printStackTrace();
            if( dao != null) dao.rollback();
            throw e;
        } finally {
            if( dao !=null) dao.close();
        }
    }
    
    
    public static void leaveRecord( String taxNo, String cmid, String userTyp, String hpNo, String ipAddress) throws DAOException {
        DAO dao = null;
        try {
            dao = DAO.getDAO();
            String query =  " INSERT INTO TBL090104                                                 \n" +
                            "             (tax_no, cmid, user_typ, hp_no, ip_address, ins_dt        \n" +
                            "             )                                                         \n" +
                            "      VALUES (?, ?, ?, ?, ?, SYSDATE                                   \n" +
                            "             )                                                         \n" ;
            
            dao.update( query, new Object[] { taxNo, cmid, userTyp, hpNo, ipAddress});            
            dao.commit();
        } catch (DAOException e) {
            e.printStackTrace();
            if( dao != null) dao.rollback();
            throw e;
        } finally {
            if( dao !=null) dao.close();
        }
    }
    
    public static void send( String cmid, String sendPhone, String[] destPhone, String msgBody, String authNo) throws DAOException {
        send( cmid, sendPhone, destPhone, msgBody, "", "ADMIN", "", authNo);
    }
    
    public static void send( String sendPhone, String[] destPhone, String msgBody, String sender, String recYn) throws DAOException {
        send( Utility.getCurrentDate("yyyyMMddHHmmssSSS"), sendPhone, destPhone, msgBody, "", sender, recYn, "");
    }
    
    *//**
     * 인자로 받은 전화번호를 숫자를 제외한 나머지를 모두 삭제하고 돌려주는 메소드
     * @param phoneNumber 전화번호
     * @return
     *//*
    private static String getPhoneNumber(String phoneNumber) {
        
        StringBuffer buf = new StringBuffer();
        
        char ch;
        int len = phoneNumber.length();
        
        for (int i = 0; i < len; i++) {
            ch = phoneNumber.charAt(i);
            if (ch >= '0' && ch <= '9') {
                buf.append(ch);
            }
        }
        
        return buf.toString();
    }
    
    *//**
     * , ; 로 구분되어 한꺼번에 넘어오는 전화번호를 배열화
     * 이미 배열로 넘어오면 받은 인자를 그대로 돌려줌
     * @param phoneNumbers 보내는사람 번호
     * @return
     *//*
    private static String[] splitPhoneNumber(String[] phoneNumbers) {
        
        String[] tmp_destNum = null;
        
        if(phoneNumbers.length == 1 && (phoneNumbers[0].indexOf(",") != -1) || (phoneNumbers[0].indexOf(";") != -1)) {
            tmp_destNum = phoneNumbers[0].replaceAll(",", ";").split(";");
        }
        else { 
            tmp_destNum = phoneNumbers;
        }
        
        return tmp_destNum;
    }  */ 

}
