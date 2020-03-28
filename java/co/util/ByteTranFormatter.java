package co.util;

/**
 * <p>
 * ByteTranFormatter.java <br>
 * TCP/IP로 전송하기 위한 문자열 및 숫자를 Fotmat에 맞게 처리하는 객체
 * </p>
 * 
 * @author 이관우
 * 
 * @since 2007년 02월 05일
 * @version 2007년 02월 05일
 */

public class ByteTranFormatter {
    
    /**
     * 인자로 받은 문자열을 인자로 받은 사이즈에 맞게 처리(왼쪽정렬)하여 돌려주는 메소드
     * @param str 문자열
     * @param size 사이즈
     * @return
     */
    public static String alignLeft(String str, int size) {
        return alignLeft(str, size, (byte)' ');
    }
    
    
    /**
     * 인자로 받은 문자열을 인자로 받은 사이즈에 맞게 처리(왼쪽정렬)하여 돌려주는 메소드 
     *   -> 처리하는 단위는 byte이고, 
     *      문자열이 작을경우 문자열을 왼쪽에 정렬시키고 나머지는 인자로 받은 바이트로 채워서 돌려준다.
     * @param str 문자열
     * @param size 사이즈
     * @param b 기본 Byte
     * @return
     */
    public static String alignLeft(String str, int size, byte b) {
        byte[] strByte = str.getBytes();
        byte[] returnByte = new byte[size];
        
        if (strByte.length >= size) {
            // 인자로 받은 문자열이 충분할 경우
            System.arraycopy(strByte, 0, returnByte, 0, size);
        } else {
            // 인자로 받은 문자열이 부족할 경우
            System.arraycopy(strByte, 0, returnByte, 0, strByte.length);
            
            for (int i = strByte.length; i < size; i++)
                returnByte[i] = b;
        }
        
        return new String(returnByte);
    }
    
    
    /**
     * 인자로 받은 문자열을 인자로 받은 사이즈에 맞게 처리(오른쪽정렬)하여 돌려주는 메소드
     * @param str 문자열
     * @param size 사이즈
     * @return
     */
    public static String alignRight(String str, int size) {
        return alignRight(str, size, (byte)' ');
    }

    
    /**
     * 인자로 받은 문자열을 인자로 받은 사이즈에 맞게 처리(오른쪽정렬)하여 돌려주는 메소드 
     *   -> 처리하는 단위는 byte이고, 
     *      문자열이 작을경우 문자열을 오른쪽에 정렬시키고 나머지는 인자로 받은 바이트로 채워서 돌려준다.
     * @param str
     * @param size
     * @param b
     * @return
     */
    public static String alignRight(String str, int size, byte b) {
        byte[] strByte = str.getBytes();
        byte[] returnByte = new byte[size];
        
        if (strByte.length >= size) {
            // 인자로 받은 문자열이 충분할 경우
            System.arraycopy(strByte, 0, returnByte, 0, size);
        } else {
            // 인자로 받은 문자열이 부족할 경우
            for (int i = 0; i < (size - strByte.length); i++)
                returnByte[i] = b;
            
            System.arraycopy(strByte, 0, returnByte, (size - strByte.length), strByte.length);
        }
        
        return new String(returnByte);
    }
    
    
    /**
     * 인자로 받은 문자열을 인자로 받은 사이즈에 맞게 처리(오른쪽정렬)하여 돌려주는 메소드
     * @param str 문자열
     * @param size 사이즈
     * @return
     */
    public static String getFitString(String str, int size) {
        return alignRight(str, size, (byte)' ');
    }
    

    /**
     * 인자로 받은 숫자를 인자로 받은 사이즈에 맞게 처리하여 돌려주는 메소드
     * @param num 숫자
     * @param size 사이즈
     * @return
     */
    public static String getFitNumber(long num, int size) {
        if (num < 0)
            return "-" + alignLeft(String.valueOf(-num), size - 1, (byte)'0');
        else
            return alignLeft(String.valueOf(num), size, (byte)'0');
    }

    
    /**
     * 인자로 받은 숫자를 인자로 받은 사이즈에 맞게 처리하여 돌려주는 메소드
     * @param num 숫자
     * @param precision
     * @param scale
     * @return
     */
    public static String getFitNumber(double num, int precision, int scale) {
        String s;
        String min = String.valueOf(num);
        int pos = min.indexOf('.');

        if (pos < 0)
            min = "";
        else
            min = min.substring(pos + 1);

        long lnum = (long) num; // 소숫점 이하를 잘라내기 위해서
        if (lnum < 0)
            s = "-" + alignLeft(String.valueOf(-lnum), precision - 1, (byte)'0');
        else
            s = alignLeft(String.valueOf(lnum), precision, (byte)'0');

        return s + alignRight(min, scale, (byte)'0');
    }

}//End class
