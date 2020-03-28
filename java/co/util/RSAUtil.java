package co.util;

import java.math.BigInteger;

/**
 * <PRE>
 * Filename : RSAUtil.java 
 * Class    : RSAUtil
 * Function : utility
 * Comment  : RSA와 관련된 암호화를 도와주는 Util 
 * History  : 2007/10/04
 * </PRE>
 */

public class RSAUtil {
    
    /**
     * 소수인지를 판단 - 2,3,5의 배수가 아니면서 소수의 제곱수가 아닌 것
     * [-1]:1보다큰양의정수입력요망 [0]:소수가아님 [>0]:소수
     */
    public static long isPrime(long a) 
    {
        long i = 0;

        if (a < 2)
            return -1;

        if (a == 2 || a == 3 || a == 5)
            return a;

        if (a % 2 == 0 )    return 0;
        if (a % 3 == 0 )    return 0;
        if (a % 5 == 0 )    return 0;

        for ( i = 7 ; i * i <= a ; i += 2 )
        {
            if (a %  i == 0 )
                return 0;
        }

        return a;
    }
    
    
    /**
     *  최대공약수 구하기 - 유클리드 알고리즘
     *  [-1]:양의정수입력요망 [0]:0이아닌정수입력요망 [>0]:최대공약수
     * @param a
     * @param b
     * @return
     */
    public static long getGCM(long a, long b)
    {
        long  nA, nB, n;

        nA = a;
        nB = b;

        if (nA < 0 || nB < 0 )
            return -1;

        if (nA == 0 || nB == 0)
            return 0;

        while (nB != 0)
        {
            n = nA % nB;
            nA = nB;
            nB = n;
        }

        return nA;
    }
    
    
    /**
     * 비밀키 구하기 - 확장된 유클리드 알고리즘
     * [-2]:같은 수 입력 금지
     * [-1]:양의 정수 중 소수 입력 요망
     * [0]:한글 처리를 위해 두 소수의 곱이 256(1Byte)보다 커야 하고 HEX3자리표현을 위해 HEX1000(4095)보다 작아야 함
     * [1]:(p-1)*(q-1)과 ePublic이 서로 소가 아님
     * [>1]:개인키 
     * @param p
     * @param q
     * @param ePublic
     * @return
     */
    public static long getPrivateKey(int p, int q, int ePublic)  
    {
        long nPrivate = 0;
        long pipq = (p - 1) * (q -1);
        long e = ePublic;
        
        long y1 = 0;
        long y2 = 1;

        long re = 0; //나머지
        long qu = 0; //몫
        long cnt= 0;

        if (p == q || p == ePublic || q == ePublic) return -2;

        if (isPrime(p) < 2 || isPrime(q) < 2 || isPrime(ePublic) < 2) return -1;

        if (p * q < 256 || p * q > 4095) return 0;

        while (e != 0 )
        {
            re = pipq % e;
            qu = new Double(Math.floor((double)pipq / (double)e)).longValue();

            if (cnt % 2 == 0 )
                y1 -= (y2 * qu);
            else
                y2 -= (y1 * qu);

            cnt++;

            pipq = e; 
            e = re;
        }

        if (pipq != 1) return 1;        //pipq의 최종값이 최대공약수

        if (cnt % 2  == 0 )
            nPrivate = y1;
        else
            nPrivate = y2;

        if (nPrivate < 0 ) // 양의 정수로..
            nPrivate += ((p - 1) * (q -1));
        
        return nPrivate;
    }

    
    /**
     * Encoding해서 돌려주는 메소드
     * @param n
     * @param e
     * @param str
     * @return
     */
    public static String endcryptRSA(int n, int e, String str)
    {
        byte[] bt = null;
        StringBuffer sb = null;
        int nTemp = 0;
        String strTemp = null;
        int i = 0;
        BigInteger bi = null;

        if (str == null || "".equals(str)) 
            return "";

        bt = str.getBytes();
        sb = new StringBuffer();

        for ( i = 0 ; i < bt.length ; i++ )
        {
            nTemp = (int)bt[i];

            if (nTemp < 0 ) nTemp += 0x100; // ascii code 한글문제 해결을 위한 조치


            bi = new BigInteger(String.valueOf(nTemp));

            bi = bi.pow(e);

            nTemp = bi.mod( new BigInteger(String.valueOf(n)) ).intValue();
            strTemp = Integer.toHexString(nTemp);

            if (strTemp.length() == 1)
                strTemp = "00" + strTemp;
            else if (strTemp.length() == 2)
                strTemp = "0" + strTemp;
            
            sb.append(strTemp);
        }

        return sb.toString();
    }
    
    
    /**
     * Decoding해서 돌려주는 메소드
     * @param n 공개키
     * @param d 비밀키
     * @param str
     * @return
     */
    public static String decryptRSA(int n, int d, String str)
    {
        BigInteger modulus = null;
        BigInteger bi =  null;
        byte[] btRe = null;
        String tmp;
        int nHex;
        int i;
        int nTemp;

        if (str == null || "".equals(str)) 
            return "";

        modulus = new BigInteger(String.valueOf(n));
        btRe = new byte[str.length() / 3];

        for (i = 0 ; i < str.length() ; i = i + 3 )
        {
            tmp = str.substring(i, i + 3);

            nHex = Integer.parseInt(tmp, 16);

            bi = new BigInteger( String.valueOf(nHex) );

            bi = bi.pow(d);

            nTemp = bi.mod(modulus).intValue();

            if (i == 0 )
                btRe[i] = (byte)nTemp;
            else
                btRe[i / 3] = (byte)nTemp;
        }
        
        return new String(btRe);
    }

    
    /**
     * Main 메소드
     * @param args
     * @throws Exception
     */
    public static void main(String[] args) throws Exception
    {
        /*
        //RSA 암복호화

        //Step 1
        //   두개의 큰 소수 p, q를 선정하여 자신의 비밀열쇠로 한다
        //Step 2
        //   n = pq인 n을 공개하고 φ(n)과 서로 소인 임의의 정수 e를 선택하여 공개키로 한다. 
        //Step 3
        //   ed ≡ 1 (mod φ(n)) 이 되는 d를 Euclidean Algorithm등으로 계산하여 비밀 열쇠로 한다.
        //   즉, p와 q 그리고 d는 비밀 열쇠로, n과 e는 공개키로 한다. 

        //암호화 Step
        //평문 M을 공개키 e를 사용하여 Me를 계산한 다음 modular n으로 간단히 한다.
        //즉 암호문 C는 다음과 같다. C = M^e (mod n) 

        //복호화 Step. 
        //암호문 C를 비밀열쇠 d를 이용하여 Cd한 다음 modular n으로 간단히 한다. 
        //다시 평문이 나오게 되는 관계식은 다음과 같다. 
        // Cd ≡ (Me)d = Mtφ(n)+1 = Mφ(n)t M ≡ M (mod n)
        //여기서 t는 ed ≡ 1 (mod φ(n))에서 유도되는 ed = tφ(n)+1 을 만족하는 정수이다. 

        예를 들어 설명하면 다음과 같다. RSA 암호화 기법에는 private key, public key, modulus가 필요하다.
        암호화하는데에는 public key와 modulus, 복호화하는데에는 private key와 modulus가 이용된다.

        암호화 : (암호화된문장) = (원래문장)^(public key) mod modulus
        암호화 : (원래문장) = (암호화된문장)^(private key) mod modulus

        단, 여기서 (원래 문장)의 비트수는 (modulus)의 비트수보다 작아야 한다. 따라서 실제의 메세지를 n보다 작거나 같은 길이로 잘라서 입력해야 한다. 좀 더 구체적인 예를 들기 위해서 이번에는 크기가 매우(!) 작은 수를 이용하여 위의 과정을 따라가 보자
        public key = 5 
        private key = 77 
        modulus = 119 
        비밀키를 자신이 소유하고 공개키는 안전한 공개키 디렉토리에 등록한다.
        그런 다음 아스키코드 한자리 "a"=65를 전송한다고 해 보자.(아스키코드는 7비트 이내에 있으므로 7비트 짜리 modulus로 전송할 수 있다.)

        암호화 : 65^5 mod 119 = 46
        복호화 : 46^77 mod 119 = 65
        */

/*      int p = 17;   
        int q = 19;
        int n = p * q;
        //int pipq = (p -1) * (q -1); //= 288
        int e = 5;
        int d = (int)getPrivateKey(p, q, e);*/
        
        
        int p = 23;
        int q = 29;
        int n = p * q;
        System.out.println("p * q :  "+  n ); 
        System.out.println("pipq :  "+  (p -1) * (q -1)); 
        int e = 3;
        int d = (int)getPrivateKey(p, q, e);
        
        String str = null;

        if (d < 2 ) throw new Exception(String.valueOf(d) + " : 제길");

        System.out.println("공개키 n = " + String.valueOf(n));
        System.out.println("공개키 e = " + String.valueOf(e));
        System.out.println("비밀키 d = " + String.valueOf(d));
        System.out.println();

        //암호화할 문장
        str = "1234abcd~!@#$%^&*()_+|=\\[]{}<>?';\":무궁화 꽃이 피었습니다,./";
        System.out.println("원문 : " + str);
        System.out.println();

        str = endcryptRSA(n, e, str); //endcryptRSA(667, 3, str)
        System.out.println("암호화 + Hex String : " + str);
        System.out.println();
        
        /*
        // VB에서 받은 스트링
        str = "0790540CC0560F113F0830680C604301E0890FD0380F602610811712C0390A110D04A0E80D30C40E100706E0B413511E12A1320601010AB03E0090621040DF13B0D80B80EE0DF0360360D10E00970B80F409E0F40B70B0058095";
        System.out.println("VB String : " + str);
        System.out.println();
        */
        
        str = decryptRSA(n, d, str); // decryptRSA(667,411, str)
        System.out.println("복호화 : " + str);
        System.out.println();
    }
}//End class

