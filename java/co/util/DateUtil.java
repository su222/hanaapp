package co.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class DateUtil
{
	private static DateUtil			instance	= null;
	private static SimpleDateFormat	longFormatter;
	private static SimpleDateFormat	normalFormatter;
	private static final int[]		END_DAY		= { 0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };

	private DateUtil()
	{
		longFormatter = new SimpleDateFormat("yyyyMMddHHmmss", java.util.Locale.KOREA);
		normalFormatter = new SimpleDateFormat("yyyyMMdd", java.util.Locale.KOREA);
	}

	public static String getDateTime()
	{
		if (instance == null)
			instance = new DateUtil();

		return longFormatter.format(Calendar.getInstance().getTime());
	}

	public static String getDate()
	{
		if (instance == null)
			instance = new DateUtil();

		return normalFormatter.format(Calendar.getInstance().getTime());
	}

	public static String getTime()
	{
		return new SimpleDateFormat("hhMMss").format(Calendar.getInstance().getTime());
	}

	public static String getToday(String format)
	{
		return new SimpleDateFormat(format).format(Calendar.getInstance().getTime());
	}

	public static String getValidDateString(String s)
	{
		if (s == null || s.length() != 8)
			return "";

		int year = Integer.parseInt(s.substring(0, 4));
		int month = Integer.parseInt(s.substring(4, 6));
		int day = Integer.parseInt(s.substring(6, 8));

		if (year < 1900 || year > 2100)
			return "";

		if (month < 1 || month > 12)
			return "";

		if (day < 1)
			day = 1;
		else if (day > END_DAY[month])
		{
			if (month == 2)
			{
				if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
					day = 29;
				else
					day = 28;
			}
			else
				day = END_DAY[month];
		}

		return String.valueOf(year) + (month > 9 ? String.valueOf(month) : "0" + String.valueOf(month))
				+ (day > 9 ? String.valueOf(day) : "0" + String.valueOf(day));
	}
}