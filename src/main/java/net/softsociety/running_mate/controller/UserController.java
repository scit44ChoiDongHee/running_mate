package net.softsociety.running_mate.controller;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import net.softsociety.running_mate.domain.UserInfo;
import net.softsociety.running_mate.service.UserService;

@Slf4j
@RestController
public class UserController {

	@Autowired
	UserService service;
	
    @PostMapping("/api/register")
    public ResponseEntity<String> registerUser(@RequestBody UserInfo userInfo) {
    	 try 
    	 {
    		 //등록 성공 시
    		 log.debug("가져온 값 확인 {}", userInfo);
    		 int i = service.userSingUp(userInfo);
    		 log.debug("가입 확인 {}", i);
    		 return ResponseEntity.ok("User registered successfully");
       
    	} catch (Exception e) 
    	{
    		// 등록 실패 시
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed");
    	}
       
        
    }
}
