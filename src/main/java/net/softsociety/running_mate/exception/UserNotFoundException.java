package net.softsociety.running_mate.exception;

import java.io.Serializable;

public class UserNotFoundException extends RuntimeException implements Serializable {
	private static final long serialVersionUID = 1L;
	
	public UserNotFoundException() {
        super();
    }

    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserNotFoundException(Throwable cause) {
        super(cause);
    }

}
