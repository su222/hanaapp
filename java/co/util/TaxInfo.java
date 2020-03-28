package co.util;

public class TaxInfo
{
	private boolean	success		= false;
	private String	result		= "";
	private String	bizNo		= "";
	private String	taxType		= "";
	private String	changeYmd	= "";
	private String	openStat	= "";
	private String	closeYmd	= "";
	private String	ntsYmd		= "";

	public TaxInfo()
	{

	}

	public TaxInfo(byte[] bufRecv)
	{
		parse(bufRecv);
	}

	public void parse(byte[] buffer)
	{		
		bizNo = new String(buffer, 68, 10);
		result = new String(buffer, 78, 4);
		ntsYmd = new String(buffer, 82, 8);
		taxType = new String(buffer, 90, 1);
		changeYmd = new String(buffer, 91, 8);
		closeYmd = new String(buffer, 99, 8);
		success = result.equals("0000");
	}

	public String getBizNo()
	{
		return bizNo;
	}

	public void setBizNo(String bizNo)
	{
		this.bizNo = bizNo;
	}

	public String getTaxType()
	{
		return taxType;
	}

	public void setTaxType(String taxType)
	{
		this.taxType = taxType;
	}

	public String getChangeYmd()
	{
		return changeYmd;
	}

	public void setChangeYmd(String changeYmd)
	{
		this.changeYmd = changeYmd;
	}

	public String getOpenStat()
	{
		return openStat;
	}

	public void setOpenStat(String openStat)
	{
		this.openStat = openStat;
	}

	public String getCloseYmd()
	{
		return closeYmd;
	}

	public void setCloseYmd(String closeYmd)
	{
		this.closeYmd = closeYmd;
	}

	public boolean isSuccess()
	{
		return success;
	}

	public void setSuccess(boolean success)
	{
		this.success = success;
	}

	public String getNtsYmd()
	{
		return ntsYmd;
	}

	public void setNtsYmd(String ntsYmd)
	{
		this.ntsYmd = ntsYmd;
	}

	public String getResult()
	{
		return result;
	}

	public void setResult(String result)
	{
		this.result = result;
	}
}