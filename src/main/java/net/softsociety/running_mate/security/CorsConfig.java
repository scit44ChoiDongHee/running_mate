//package net.softsociety.running_mate.security;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class CorsConfig implements WebMvcConfigurer {
//    
//	@Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("*")
//                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
//                .allowedHeaders("*")
//                .exposedHeaders("Authorization")
//                .allowCredentials(true)
//                .maxAge(3600);
//    }
//
//
//    
////    @Bean
////    CorsConfigurationSource corsConfigurationSource() {
////    	CorsConfiguration configuration = new CorsConfiguration();
////    	
////    	configuration.setAllowCredentials(true);
////    	configuration.addAllowedOrigin("http://localhost:5173");
////    	configuration.addAllowedOrigin("http://localhost:5174");
////    	configuration.addAllowedMethod("*");
////    	configuration.addAllowedHeader("*");
////    	
////    	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
////    	
////    	source.registerCorsConfiguration("/**", configuration);
////        return source;
////    }
//}
