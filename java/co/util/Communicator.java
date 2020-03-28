package co.util;

import java.io.*;
import java.net.Socket;

import org.apache.log4j.Logger;

public class Communicator
{

	public final static Logger	logger		= Logger.getLogger("tacs.taxinfo");
	public final int			RETRY_COUNT	= 10;
	public final int			MTU_SIZE	= 1460;
	public final int			RECV_SIZE	= 532;

	Socket						socket		= null;
	BufferedInputStream			bs;
	BufferedReader				br			= null;
	OutputStream				os;
	int							cntFail		= 0;
	String						host;
	int							port;

	public Communicator(String s, int p) throws Exception
	{
		host = s;
		port = p;
	}

	private void connect() throws Exception
	{
		socket = new Socket(host, port);

		bs = new BufferedInputStream(socket.getInputStream());
		os = socket.getOutputStream();
	}

	public void close()
	{
		try
		{
			socket.close();
		}
		catch (Exception e)
		{
			logger.warn(e);
		}
	}

	public byte[] communicate(byte[] buffer, int size) throws Exception
	{
		try
		{
			connect();
			logger.info("SEND:" + new String(buffer, 0, size));
			//byte[] b = new byte[] { 0x02 };
			//os.write(b, 0, 1);
			os.write(buffer, 0, size);

			return recvContent(120);
		}
		finally
		{
			close();
		}
	}

	private byte[] recvContent(int size) throws Exception
	{
		byte[] buffer = new byte[size];
		int left = size;
		int read, saved = 0;

		logger.debug("size:" + size);
		for (int i = 0; i < 5; i++)
		{
			read = bs.read(buffer, saved, left);
			if (read < 1)
			{
				Thread.sleep(1000);
				logger.warn("read -1 times : " + i);
				continue;
			}

			saved += read;
			left -= read;

			logger.debug("saved:" + saved + ", read:" + read + ", left:" + left);

			if (left <= 0)
				break;
		}

		return buffer;
	}
}
