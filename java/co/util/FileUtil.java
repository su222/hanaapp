package co.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.channels.FileChannel;
import java.io.IOException;

public class FileUtil {

	public void copy(String source, String target) throws Exception {
		// 복사 대상이 되는 파일 생성

		File sourceFile = new File(source);
		// 스트림, 채널 선언
		FileInputStream inputStream = null;
		FileOutputStream outputStream = null;
		FileChannel fcin = null;
		FileChannel fcout = null;

		try {
			// 스트림 생성
			inputStream = new FileInputStream(sourceFile);
			outputStream = new FileOutputStream(target);
			// 채널 생성
			fcin = inputStream.getChannel();
			fcout = outputStream.getChannel();
			// 채널을 통한 스트림 전송
			long size = fcin.size();
			fcin.transferTo(0, size, fcout);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		} finally {
			// 자원 해제
			try {
				fcout.close();
			} catch (IOException ioe) {
			}
			try {
				fcin.close();
			} catch (IOException ioe) {
			}
			try {
				outputStream.close();
			} catch (IOException ioe) {
			}
			try {
				inputStream.close();
			} catch (IOException ioe) {
			}
		}
	}	
	
}
