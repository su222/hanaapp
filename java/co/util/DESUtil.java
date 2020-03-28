package co.util;

import gnu.crypto.cipher.IBlockCipher;
import gnu.crypto.cipher.TripleDES;
import gnu.crypto.util.Util;

import java.util.HashMap;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class DESUtil
{

    private static final String CRYPT_HEXA_KEY  = KeyStore.getKey();

    /**
     *  plain 문자를 복호화한다.
     * @param plainStr
     * @return String
     * @throws Exception
     */
    public static String strEncrypt(String plainStr) throws Exception
    {
        if (plainStr == null || plainStr.length() < 15)
            throw new Exception();

        TripleDES cipher = new TripleDES();
        HashMap<String, Object> map = new HashMap<String, Object>();
        byte[] ct2 = new byte[TripleDES.BLOCK_SIZE];

        byte[] kb = Util.toBytesFromString(CRYPT_HEXA_KEY);
        byte[] pt = Util.toBytesFromString(plainStr);
        map.put(IBlockCipher.KEY_MATERIAL, kb);
        cipher.reset();
        cipher.init(map);
        cipher.encryptBlock(pt, 0, ct2, 0);

        return new BASE64Encoder().encode(ct2);
    }

    /**
     * encryptStr 문자를 복호화한다.
     * @param encryptStr
     * @return
     * @throws Exception
     */
    public static String strDecrypt(String encryptStr) throws Exception
    {

        if (encryptStr == null)
            throw new Exception();

        TripleDES cipher = new TripleDES();
        HashMap<String, Object> map = new HashMap<String, Object>();
        byte[] ct2 = new byte[TripleDES.BLOCK_SIZE];
        byte[] kb = Util.toBytesFromString(CRYPT_HEXA_KEY);
        byte[] pt = new BASE64Decoder().decodeBuffer(encryptStr);

        map.put(IBlockCipher.KEY_MATERIAL, kb);
        cipher.reset();
        cipher.init(map);
        cipher.decryptBlock(pt, 0, ct2, 0);

        if ( Util.toString(ct2).startsWith("0"))
        {
            return Util.toString(ct2).substring(1);
        }
        else
        {
            return Util.toString(ct2);
        }
    }
}
