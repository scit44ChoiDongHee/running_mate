//package net.softsociety.running_mate.controller;
//
//import java.io.IOException;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.apache.catalina.connector.Response;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//import net.softsociety.running_mate.security.JwtTokenProvider;
//import net.softsociety.running_mate.vo.TokenInfo;
//
//@Controller
//public class LoginController {
//	
//	@Autowired
//	private JwtTokenProvider jwtToken;
//	
//	@GetMapping({"", "/"})
//	public String home() {
//		return "home";
//	}
//	
//	@PostMapping(value="join")
//	public ResponseEntity<?> join(HttpServletRequest request,
//	        HttpServletResponse response,
//	        Authentication authentication) throws IOException, ServletException {
//		
//        // 사용자 인증 정보를 사용하여 JWT 토큰 생성
//		TokenInfo tokeninfo = jwtToken.generateToken(authentication);
//				
//        // JWT 토큰을 JSON 형식으로 응답에 추가
//        response.setContentType("application/json");
//        response.setCharacterEncoding("UTF-8");
//        response.getWriter().write(
//            new ObjectMapper().writeValueAsString(tokeninfo)
//        );
//        
//		return ResponseEntity.ok(tokeninfo);
//    }
//}
