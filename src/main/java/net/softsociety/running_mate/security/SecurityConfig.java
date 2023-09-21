package net.softsociety.running_mate.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import net.softsociety.running_mate.filter.CorsFilter;
import net.softsociety.running_mate.jwt.JwtAccessDeniedHandler;
import net.softsociety.running_mate.jwt.JwtAuthenticationEntryPoint;
import net.softsociety.running_mate.jwt.JwtSecurityConfig;
import net.softsociety.running_mate.jwt.TokenProvider;

@Configuration
public class SecurityConfig {
	private final TokenProvider tokenProvider;
	private final CorsFilter corsFilter;
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
	
	public SecurityConfig(
			TokenProvider tokenProvider,
			CorsFilter corsFilter,
			JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
			JwtAccessDeniedHandler jwtAccessDeniedHandler
			) {
		this.tokenProvider = tokenProvider;
		this.corsFilter = corsFilter;
		this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
		this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.addAllowedOrigin("*");
		configuration.addAllowedHeader("*");
		configuration.addAllowedMethod("*");
		configuration.setAllowCredentials(true);
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
	
	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors().configurationSource(corsConfigurationSource())
            .and()
            .csrf().disable()
            .httpBasic().disable()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
                .antMatchers("/api/running-mate/user/get").permitAll()
                .antMatchers("/api/running-mate/user/login").permitAll()
                .antMatchers("/api/running-mate/user/join").permitAll()
                .antMatchers("/api/**").permitAll()
            .and()
            .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler);

//        http.apply(new JwtSecurityConfig(tokenProvider));

        return http.build();
    }
}
