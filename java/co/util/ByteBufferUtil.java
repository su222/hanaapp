package co.util;

import java.nio.ByteBuffer;

/**
 * <p>
 * ByteBuferUtil.java <br>
 * ByteBuffer 을 사용할때 필요한 Util 메소드 추가
 * </p>
 * 
 * @author <a href="mailto:kidani@paran.com">Kang Ki Dan </a>
 * 
 * @version Revision: Date: Apr 24, 2005 8:24:05 PM
 */
public class ByteBufferUtil {
    private ByteBufferUtil() {
    }

    /**
     * string 데이타를 추가한다.
     * 
     * @param byteBuffer
     * @param str
     *            strData
     */
    public static void putString(ByteBuffer byteBuffer, String str) {
        if (str == null) {
            return;
        }

        byteBuffer.put(str.getBytes());
    }

    public static void putString(ByteBuffer byteBuffer, String str, int size) {
        putStringLeft(byteBuffer, str, size);
    }
    
    public static void putStringLeft(ByteBuffer byteBuffer, String str, int size) {
        byteBuffer.put(ByteTranFormatter.alignLeft(str, size, (byte)' ').getBytes());
    }
    
    public static void putStringRight(ByteBuffer byteBuffer, String str, int size) {
        byteBuffer.put(ByteTranFormatter.alignRight(str, size, (byte)' ').getBytes());
    }
    
    public static void putNumber(ByteBuffer byteBuffer, String str, int size) {
        byteBuffer.put(ByteTranFormatter.alignRight(str, size, (byte)'0').getBytes());
    }

    public static void putNumber(ByteBuffer byteBuffer, Number n, int size) {
        byteBuffer.put(ByteTranFormatter.alignRight(String.valueOf(n), size, (byte)'0').getBytes());
    }

    /**
     * string 데이타의 길이를 추가하고 string 데이타를 추가한다.
     * 
     * @param byteBuffer
     * @param str
     *            strData
     */
    public static void putStringAndSizeInt(ByteBuffer byteBuffer, String str) {
        if (str == null) {
            byteBuffer.putInt(0);

            return;
        }

        byte[] tempByte = str.getBytes();
        byteBuffer.putInt(tempByte.length);
        byteBuffer.put(tempByte);
    }

    /**
     * string 데이타의 길이를 추가하고 string 데이타를 추가한다.
     * 
     * @param byteBuffer
     * @param str
     *            strData
     */
    public static void putStringAndSizeShort(ByteBuffer byteBuffer, String str) {
        if (str == null) {
            byteBuffer.putShort((short) 0);

            return;
        }

        byte[] tempByte = str.getBytes();
        byteBuffer.putShort((short) tempByte.length);
        byteBuffer.put(tempByte);
    }

    /**
     * string 데이타의 길이를 추가하고 string 데이타를 추가한다.
     * 
     * @param byteBuffer
     * @param str
     *            strData
     */
    public static void putStringAndSizeByte(ByteBuffer byteBuffer, String str) {
        if (str == null) {
            byteBuffer.put((byte) 0);

            return;
        }

        byte[] tempByte = str.getBytes();
        byteBuffer.put((byte) tempByte.length);
        byteBuffer.put(tempByte);
    }
    
    /**
     * ByteBuffer 에서 size 길이만틈 String 을 가져온다.
     * 
     * @param byteBuffer
     * @param size
     *            사이즈
     * 
     * @return String
     */
    public static String getLogString(ByteBuffer byteBuffer) {
        int position = byteBuffer.position();
        byte[] temp = new byte[byteBuffer.limit()];
        byteBuffer.rewind();
        byteBuffer.get(temp);
        byteBuffer.position(position);

        return new String(temp) + ":" + byteBuffer.limit() + "bytes";
    }

    /**
     * ByteBuffer 에서 size 길이만틈 String 을 가져온다.
     * 
     * @param byteBuffer
     * @param size
     *            사이즈
     * 
     * @return String
     */
    public static String getString(ByteBuffer byteBuffer, int size) {
        if (size == 0) {
            return "";
        }

        byte[] temp = new byte[size];
        byteBuffer.get(temp);

        return new String(temp).trim();
    }

    /**
     * ByteBuffer 에서 position 위치에서 size 길이만틈 String 을 가져온다.
     * 
     * @param byteBuffer
     * @param size
     *            사이즈
     * @param position
     *            포지션
     * 
     * @return String
     */
    public static String getString(ByteBuffer byteBuffer, int size, int position) {
        if (size == 0) {
            return "";
        }
        byteBuffer.position(position);

        byte[] temp = new byte[size];
        byteBuffer.get(temp);

        return new String(temp).trim();
    }

}