package net.softsociety.running_mate.exception;

import java.io.Serializable;

public class DuplicatedUsernameException extends RuntimeException implements Serializable {
	private static final long serialVersionUID = 1L;

	public DuplicatedUsernameException() {
        super();
    }

    public DuplicatedUsernameException(String message) {
        super(message);
    }

    public DuplicatedUsernameException(String message, Throwable cause) {
        super(message, cause);
    }

    public DuplicatedUsernameException(Throwable cause) {
        super(cause);
    }
}
