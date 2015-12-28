package ch.ethz.globis.web.facebook;

public class InvalidRequestException extends Exception {

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public InvalidRequestException() {
		super("Request is invalid");
	}
}
