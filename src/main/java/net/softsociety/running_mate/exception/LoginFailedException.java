package net.softsociety.running_mate.exception;

import java.io.Serializable;

public class LoginFailedException extends RuntimeException implements Serializable {
	private static final long serialVersionUID = 1L;
	
	public LoginFailedException() {
		super();
	}
	
	public LoginFailedException(String message) {
		super(message);
	}
	
	public LoginFailedException(String message, Throwable cause) {
		super(message, cause);
	}
	
	public LoginFailedException(Throwable cause) {
		super(cause);
	}
}
