package co.util;

import java.text.DecimalFormat;

public class Converter
{   
    private Converter()
    {
    }

    public static String checkNull(String origin)
    {
        return origin == null ? "" : origin.trim();
    }

    public static String formatString(String data, int len) throws Exception
    {
        String dataTmp = (data == null) ? "" : data;
        int lenTmp = dataTmp.getBytes().length;

        if (lenTmp == len)
            return data;
        if (lenTmp > len)
            return new String(data.getBytes(), 0, len);

        StringBuilder sb = new StringBuilder(len);
        sb.append(dataTmp);
        if (len > lenTmp)
        {
            for (int i = 0; i < len - lenTmp; i++)
                sb.append(" ");
        }

        return sb.toString();
    }

    public static String formatStringRight(String data, int len) throws Exception
    {
        String dataTmp = (data == null) ? "" : data;
        int lenTmp = dataTmp.getBytes().length;

        if (lenTmp == len)
            return data;
        if (lenTmp > len)
            throw new Exception("값의 크기가 요구하는 데이터 사이즈보다 큽니다[" + data + ":" + len + "]");

        StringBuilder sb = new StringBuilder(len);
        if (len > lenTmp)
        {
            for (int i = 0; i < len - lenTmp; i++)
                sb.append(" ");
        }
        sb.append(dataTmp);

        return sb.toString();
    }
    
    public static String formatMoneyMac(String money) throws Exception
    {
        return formatMoneyMac(Double.parseDouble(money));
    }

    public static String formatMoneyMac(double money) throws Exception
    {
        DecimalFormat df = new DecimalFormat("P000000000000000.00;N000000000000000.00");
        String v = df.format(money);
        if (v.length() > 19)
            throw new Exception("값의 크기가 요구하는 데이터 사이즈보다 큽니다[" + v + ":19]");

        return v;
    }

    public static String formatMoneyMac(String money, int len) throws Exception
    {
        return formatMoneyMac(Double.parseDouble(money), len);
    }

    public static String formatMoneyMac(double money, int len) throws Exception
    {
        StringBuilder s = new StringBuilder();
        for (int i = 4; i < len; i++)
            s.append("0");
        s.append(".00");

        DecimalFormat df = new DecimalFormat("P" + s.toString() + ";N" + s.toString());
        String v = df.format(money);
        if (v.length() > len)
            throw new Exception("값의 크기가 요구하는 데이터 사이즈보다 큽니다[" + v + ":" + len + "]");

        return v;
    }

    public static String formatMoneyMac2(double money, int len) throws Exception
    {
        DecimalFormat df = new DecimalFormat("0.00");
        String data = df.format(Math.abs(money));

        int lenTmp = data.getBytes().length;

        if (lenTmp > len - 1)
            throw new Exception("값의 크기가 요구하는 데이터 사이즈보다 큽니다[" + data + ":" + (len - 1) + "]");

        StringBuilder sb = new StringBuilder(len);
        if (money < 0)
            sb.append("N");
        else
            sb.append("P");

        for (lenTmp += 1; lenTmp < len; lenTmp++)
            sb.append("0");

        sb.append(data);

        return sb.toString();
    }

    public static String formatNumber(String data, int len) throws Exception
    {
        String dataTmp = (data == null) ? "0" : data;
        int lenTmp = dataTmp.getBytes().length;

        if (lenTmp == len)
            return data;
        if (lenTmp > len)
            throw new Exception("값의 크기가 요구하는 데이터 사이즈보다 큽니다[" + data + ":" + len + "]");

        StringBuilder sb = new StringBuilder(len);
        if (len > lenTmp)
        {
            for (int i = 0; i < len - lenTmp; i++)
                sb.append("0");
        }
        sb.append(dataTmp);

        return sb.toString();
    }

    public static String formatNumber(int num, int len) throws Exception
    {
        return formatNumber(String.valueOf(num), len);
    }

    public static String formatNumber(long num, int len) throws Exception
    {
        return formatNumber(String.valueOf(num), len);
    }

    public static double parseAmount(String strAmt)
    {
        double amt = 0.0;
        if ("".equals(strAmt))
            return amt;

        String mark = null;
        String tmp = null;

        mark = strAmt.substring(0, 1);
        tmp = strAmt.substring(1);

        amt = Math.abs(new Double(tmp.substring(0, tmp.length() - 3)).doubleValue()
                + (new Double(tmp.substring(tmp.length() - 3)).doubleValue() / 1000));

        if ("1".equals(mark))
            amt = -amt;

        return amt;
    }

    /**
     * 전각문자를 반각문자로 돌려준다.
     * 
     * @return 반각문자
     */
    public static String getHalfString(String strFull)
    {

        if (strFull == null)
        {
            return strFull;
        }

        char[] charArray = strFull.toCharArray();

        for (int i = 0; i < charArray.length; i++)
        {
            if (charArray[i] >= 0xFF01 && charArray[i] <= 0xFF5E)
            { // 전자 영문 영숫자/문자부호를 골라, 0xFEE0 만큼 뺀다.
                charArray[i] -= 0xFEE0;
            }
            else if (charArray[i] == 0x3000)
            { // 전자 공백을 반자 공백으로 바꾼다.
                charArray[i] = 0x20;
            }
        }

        return new String(charArray);
    }

    public static String cutHalfBytes(String strData, int offset, int len)
    {
        if (strData == null || strData.equals(""))
            return "";

        byte[] data = strData.getBytes();
        return getHalfString(new String(data, offset, len)).trim();
    }

    public static String cutHalfBytes(byte[] buf, int offset, int len)
    {
        if (buf == null)
            return "";

        return getHalfString(new String(buf, offset, len)).trim();
    }

    public static String cutBytes(String strData, int offset, int len)
    {
        if (strData == null || strData.equals(""))
            return "";

        byte[] data = strData.getBytes();
        return new String(data, offset, len).trim();
    }

    public static String cutBytes(byte[] buf, int offset, int len)
    {
        if (buf == null)
            return "";

        return new String(buf, offset, len).trim();
    }

    public static byte[] copyBytes(byte[] buf, int offset, int len)
    {
        byte[] b = new byte[len];

        for (int i = 0; i < len; i++)
        {
            b[i] = buf[offset + i];
        }

        return b;
    }

    public static void main(String[] args) throws Exception
    {
        int i = 3456433;
        long l = 394847;
        double d = -49837848.2984;
        double d1 = 49837848.1234;
        double d2 = 49837848;

        System.out.println(Converter.formatMoneyMac(-1923.432, 19));
        System.out.println(Converter.formatMoneyMac(-1923.432));
        System.out.println(Converter.formatMoneyMac(1923, 19));
        System.out.println(Converter.formatMoneyMac(1923));
        System.out.println(Converter.formatMoneyMac(i, 19));
        System.out.println(Converter.formatMoneyMac(i));
        System.out.println(Converter.formatMoneyMac(l, 19));
        System.out.println(Converter.formatMoneyMac(l));
        System.out.println(Converter.formatMoneyMac(d, 19));
        System.out.println(Converter.formatMoneyMac(d));
        System.out.println(Converter.formatMoneyMac(d1, 19));
        System.out.println(Converter.formatMoneyMac(d1));
        System.out.println(Converter.formatMoneyMac(d2, 19));
        System.out.println(Converter.formatMoneyMac(d2));
        System.out.println(Converter.formatMoneyMac("1923.432", 19));
        System.out.println(Converter.formatMoneyMac("1923.432"));
    }
}
