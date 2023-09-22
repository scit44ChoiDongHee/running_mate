package net.softsociety.running_mate.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.extern.slf4j.Slf4j;
import net.softsociety.running_mate.blog.service.BlogService;
import net.softsociety.running_mate.vo.BlogVo;

@Slf4j
@Controller
@CrossOrigin(origins = "*")
public class BlogController {
	
	@Autowired
	BlogService service;
	
//	@RequestMapping(method = RequestMethod.OPTIONS, value = "/blogWrite")
	@GetMapping("/api/blogWrite")
	public String blogWrite(@RequestParam String title, @RequestParam String content) {
	    // title과 content를 사용하여 작업 수행
	    log.debug("Title: " + title);
	    log.debug("Content: " + content);

	    return "안녕하세용";
	}
}
