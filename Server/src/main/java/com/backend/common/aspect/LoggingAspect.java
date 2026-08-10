package com.backend.common.aspect;

import java.util.Arrays;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Aspect
@Component
@Slf4j
public class LoggingAspect {

	// Updated Pointcut: Fits controllers, services, repositories AND all their sub-packages
	@Pointcut("within(com.backend.user.controller..*) || " +
	          "within(com.backend.user.service..*) || " +
	          "within(com.backend.user.repositary..*)")
	public void applicationPackagePointcut() {
		// Method is empty as this is just a Pointcut declaration
	}

	@Around("applicationPackagePointcut()")
	public Object logExecutionDetails(ProceedingJoinPoint jointPoint) throws Throwable {
		String className = jointPoint.getSignature().getDeclaringTypeName();
		String methodName = jointPoint.getSignature().getName();
		Object[] args = jointPoint.getArgs();

		log.info("--------------------------------------------------------------------------------------------------------");
		log.info("ENTER: {}.{}() with arguments = {}", className, methodName, Arrays.toString(args));

		long startTime = System.currentTimeMillis();
		try {
			Object result = jointPoint.proceed();
			long elapsedTime = System.currentTimeMillis() - startTime;

			log.info("EXIT: {}.{}() executed in {} ms with result = {}", className, methodName, elapsedTime, result);
			log.info("--------------------------------------------------------------------------------------------------------");

			return result;
		} catch (IllegalArgumentException e) {
			log.error("ILLEGAL ARGUMENTS: {}.{}() with arguments = {}", className, methodName, Arrays.toString(args));
			log.info("--------------------------------------------------------------------------------------------------------");
			throw e;
		} catch (Throwable e) {
			log.error("EXCEPTION: {}.{}() message = {}", className, methodName, e.getMessage());
			log.info("--------------------------------------------------------------------------------------------------------");
			throw e;
		}
	}
}