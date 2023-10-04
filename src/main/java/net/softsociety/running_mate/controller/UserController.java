package net.softsociety.running_mate.controller;

import javax.servlet.http.Cookie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.softsociety.running_mate.dto.BaseResponse;
import net.softsociety.running_mate.dto.LoginDTO;
import net.softsociety.running_mate.dto.SingleDataResponse;
import net.softsociety.running_mate.dto.TokenDTO;
import net.softsociety.running_mate.dto.UserDTO;
import net.softsociety.running_mate.exception.DuplicatedUsernameException;
import net.softsociety.running_mate.exception.LoginFailedException;
import net.softsociety.running_mate.exception.UserNotFoundException;
import net.softsociety.running_mate.jwt.TokenProvider;
import net.softsociety.running_mate.service.ResponseService;
import net.softsociety.running_mate.service.UserService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	UserService service;
	@Autowired
	ResponseService responseService;
	@Autowired
	TokenProvider tokenProvider;
    
	@PostMapping("/sign-up")
	public ResponseEntity<?> join(@RequestBody UserDTO userDto) {
		ResponseEntity<?> responseEntity = null;
		
		try {
			service.join(userDto);
			TokenDTO tokenDto = service.tokenGenerator(userDto.getUser_id());
			ResponseCookie responseCookie = 
					ResponseCookie.from(HttpHeaders.SET_COOKIE, tokenDto.getRefreshToken())
					.path("/")
					.maxAge(14 * 24 * 60 * 60) // 14일
					.httpOnly(true)
					.build();
			
			SingleDataResponse<String> response = responseService.getSingleDataResponse(true, userDto.getUser_id(), tokenDto.getAccessToken());
			responseEntity = ResponseEntity.status(HttpStatus.OK)
					.header(HttpHeaders.SET_COOKIE, responseCookie.toString())
					.body(response);
		} catch (DuplicatedUsernameException exception) {
			BaseResponse response = responseService.getBaseResponse(false, exception.getMessage());
			responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
		return responseEntity;
	}
	
	@PostMapping("/sign-in")
	public ResponseEntity<?> login(@RequestBody LoginDTO loginDto) {
		ResponseEntity<?> responseEntity = null;
		
		try {
			String user_id = service.login(loginDto);
			TokenDTO tokenDto = service.tokenGenerator(user_id);
			ResponseCookie responseCookie = 
					ResponseCookie.from(HttpHeaders.SET_COOKIE, tokenDto.getRefreshToken())
					.path("/")
					.maxAge(14 * 24 * 60 * 60) // 14일
					.httpOnly(true)
					.build();
			SingleDataResponse<String> response = responseService.getSingleDataResponse(true, user_id, tokenDto.getAccessToken());
			responseEntity = ResponseEntity.status(HttpStatus.OK)
					.header(HttpHeaders.SET_COOKIE, responseCookie.toString())
					.body(response);
		} catch (LoginFailedException exception) {
			log.debug(exception.getMessage());
			BaseResponse response = responseService.getBaseResponse(false, exception.getMessage());
			
			responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
		return responseEntity;
	}
	
	@PostMapping("/sign-out")
	public ResponseEntity<?> logout(
			@CookieValue(value = HttpHeaders.SET_COOKIE) Cookie refreshCookie
			) {
		ResponseEntity<?> responseEntity = null;
		try {
			ResponseCookie responseCookie = 
					ResponseCookie.from(HttpHeaders.SET_COOKIE, "")
					.path("/")
					.httpOnly(true)
					.secure(true)
					.maxAge(0)
					.build();
			BaseResponse response = 
					responseService.getBaseResponse(true, "로그아웃 성공");
			responseEntity = ResponseEntity.status(HttpStatus.OK)
					.header(HttpHeaders.SET_COOKIE, responseCookie.toString())
					.body(response);
		} catch (LoginFailedException exception) {
			log.debug(exception.getMessage());
			BaseResponse response = responseService.getBaseResponse(false, exception.getMessage());
			
			responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
		return responseEntity;
	}
	
	/**
     * @param idDTO user_id 전송을 위한 DTO
     * @return userId가 있다면 success값을 true, 없다면 false를 리턴.
     */
	 @GetMapping("/get")
	    public ResponseEntity<?> isHaveUser(@RequestParam String user_id) {
	        ResponseEntity<?> responseEntity = null;
	        try {
	            boolean isHaveUser = service.haveUser(user_id);
	            String message = isHaveUser ? "회원가입된 유저입니다." : "회원가입 안된 유저입니다.";
	            SingleDataResponse<Boolean> response = responseService.getSingleDataResponse(true, message, isHaveUser);
	            responseEntity = ResponseEntity.status(HttpStatus.CREATED).body(response);
	        } catch(UserNotFoundException exception) {
	            log.debug(exception.getMessage());
	            BaseResponse response = responseService.getBaseResponse(false, exception.getMessage());
	            responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	        }
	        return responseEntity;
	    }
}
