package co.util;
/**
 *
 * Helper class to encode/decode Strings with Numeric Character References as defined in SGML.
 * 
 * @author franz.willer
 *
 * @version $Revision: 1.2 $
 * @since 25.11.2005
 */
public class NumericCharacterReference {

  /**
   * Decodes a String with Numeric Character References.
   * <p>
   * 
   * @param str A NCR encoded String
   * @param unknownCh, A character that is used if nnnn of &#nnnn; is not a int.
   * 
   * @return The decoded String.
   */
   public static String ncrDecode(String str, char unknownCh) {
          StringBuffer sb = new StringBuffer();
          int i1=0;
          int i2=0;

          while(i2<str.length()) {
             i1 = str.indexOf("&#",i2);
             if (i1 == -1 ) {
                  sb.append(str.substring(i2));
                  break ;
             }
             sb.append(str.substring(i2, i1));
             i2 = str.indexOf(";", i1);
             if (i2 == -1 ) {
                  sb.append(str.substring(i1));
                  break ;
             }

             String tok = str.substring(i1+2, i2);
              try {
                   int radix = 10 ;
                   if (tok.charAt(0) == 'x' || tok.charAt(0) == 'X') {
                      radix = 16 ;
                      tok = tok.substring(1);
                   }
                   sb.append((char) Integer.parseInt(tok, radix));
              } catch (NumberFormatException exp) {
                   sb.append(unknownCh);
              }
              i2++ ;
          }
          return sb.toString();
  }

   /**
    * Encode a String with Numeric Character Refernces.
    * <p>
    * Formats each character < 0x20 or > 0x7f to &#nnnn; where nnnn is the char value as int.
    * <p>
    *  
    * @param str The raw String
    * @return The encoded String
    */
   public static String ncrEncode( String str ) {
     char[] ch = str.toCharArray();
     StringBuffer sb = new StringBuffer();
     for ( int i = 0 ; i < ch.length ; i++ ) {
      if ( ch[i] < 0x20 || ch[i] > 0x7f )
        sb.append("&#").append((int) ch[i]).append(";");
      else
        sb.append(ch[i]);
     }
     return sb.toString();
   }
   
   static public int getType( char value ) 
   {
   if ( ( value >= 'A' && value <= 'z' )  || ( value >= 'a' && value <= 'z' ) )
       return 1;

   if ( value >= '0' && value <= '9' )
       return 2;

   // Check UNICODE SET, refer UNICODE CODE SET ver 2.0 or higher
   //
   if ( value >= '\uAC00' && value <= '\uD7A3' )
       return 3;
   // …. 이하 생략
   return 0;
   }


   public static void main(String[] args) {
       System.out.println(ncrEncode("똠뷁각하"));
       System.out.println(ncrDecode(ncrEncode("똠뷁").concat("갑니다&lt;&rt;&amp;"),'?'));
       System.out.println(ncrDecode("&#46624;&#48577;&#52012;&오나라가나라",'?'));
       String tmp = "똠방";
       for(char ch : tmp.toCharArray()) {
           System.out.println(getType(ch));
       }
   }
}
