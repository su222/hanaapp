package co.hanaapp.exception;

public class ValidationException extends Exception implements ServiceException {
	/**
 * 
 */
	private static final long serialVersionUID = -4928222804608720184L;

	private final String errorMessageCode;
	private Object vo;
	private final String serviceId;

	public ValidationException(String errorMessageCode, String serviceId, Object vo, Exception e) {
		super(e);
		this.errorMessageCode = errorMessageCode;
		this.serviceId = serviceId;
		this.vo = vo;
	}

	public Object getVo() {
		return vo;
	}

	public void setVo(Object vo) {
		this.vo = vo;
	}

	public String getServiceId() {
		return serviceId;
	}

	public String getErrorMessageCode() {
		return errorMessageCode;
	}
}
