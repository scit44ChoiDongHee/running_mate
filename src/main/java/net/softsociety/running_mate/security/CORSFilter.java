//package net.softsociety.running_mate.security;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
//
//@SuppressWarnings("deprecation")
//@Configuration
//public class CORSFilter {
//
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurerAdapter() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                // 특정 경로에 대한 CORS 설정 예시
//                registry.addMapping("/running_mate/**")
//                        .allowedOrigins("http://localhost:5173")
//                        .allowedMethods("GET", "POST", "PUT", "DELETE")
//                        .allowedHeaders("Origin", "Content-Type", "Authorization")
//                        .exposedHeaders("Authorization")
//                        .allowCredentials(false);
//            }
//        };
//    }
//}