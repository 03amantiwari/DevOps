package com.backend.common.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.backend.common.dto.ApiResponse;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

	/*
	 * To declare exc handling method (catch clause)
	 */
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e) {
		log.warn("Resource Not Found : {}", e.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND) // SC 404
				.body(new ApiResponse("Failed", e.getMessage()));
	}

	@ExceptionHandler(UserAlreadyExistsException.class)
	public ResponseEntity<?> handleUserAlreadyExistException(UserAlreadyExistsException e) {
		log.warn("Duplicate User are not allowed to registered : {}", e.getMessage());

		Map<String, Object> body = new HashMap<>();
		body.put("timeStamp", LocalDateTime.now());
		body.put("status", HttpStatus.CONFLICT.value());
		body.put("error", "User Already Exists.");
		body.put("message", e.getMessage());

		return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
	}

//	  @ExceptionHandler(AuthenticationFailedException.class) public
//	  ResponseEntity<?>
//	  handleAuthenticationFailedException(AuthenticationFailedException e) {
//	  System.out.println("in auth failed exc"); return
//	  ResponseEntity.status(HttpStatus.UNAUTHORIZED) // SC 401 .body(new
//	  ApiResponse("Failed", e.getMessage())); }

	// handle validation failures triggered @Valid
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
	public Map<String, String> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {

		log.warn("Validation failed for request: {}", e.getBindingResult().getObjectName());

		// 1. Get the list of affected (rejected) field errors
		List<FieldError> fieldErrors = e.getFieldErrors();

		
		Map<String, String> fieldErrMap = fieldErrors.stream()
				.collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
		return fieldErrMap;
	}

	// handle all remaining excs - catch all
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<?> handleRuntimeException(RuntimeException e) {

		log.warn("Unhandled Exception Occurred: ", e);

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR) // SC 500
				.body(new ApiResponse("Failed", e.getMessage()));
	}

	@ExceptionHandler({ BadCredentialsException.class, UsernameNotFoundException.class })
	public ResponseEntity<?> handleAuthenticationException(Exception e) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(new ApiResponse("Failed", "Invalid email or password"));
	}
}
