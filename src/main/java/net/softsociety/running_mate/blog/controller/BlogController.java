package net.softsociety.running_mate.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import lombok.extern.slf4j.Slf4j;
import net.softsociety.running_mate.blog.service.BlogService;
import net.softsociety.running_mate.vo.BlogVo;

@Slf4j
@Controller
@RequestMapping("/api")
public class BlogController {
	
	@Autowired
	BlogService service;
	
	@CrossOrigin(origins = {"http://localhost:5173"})
	@RequestMapping(method = RequestMethod.OPTIONS, value = "/blogWrite")
	public ResponseEntity<?> blogWrite(@RequestBody BlogVo data) {
		
//		System.out.println(data.toString());
		log.debug(data.toString());
		
		return ResponseEntity.ok("데이터를 성공적으로 받았습니다.");
	}
}
