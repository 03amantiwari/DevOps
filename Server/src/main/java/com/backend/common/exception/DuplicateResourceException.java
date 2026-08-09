package com.backend.common.exception;

public class DuplicateResourceException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public DuplicateResourceException(String msg) {
		super(msg);
	}

}
