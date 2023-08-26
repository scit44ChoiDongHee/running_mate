package net.softsociety.running_mate.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
	@GetMapping("/api/hello")
	public String test() {
		return "Hello, world!";
	}
}
