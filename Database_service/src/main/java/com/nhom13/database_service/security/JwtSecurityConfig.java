package com.nhom13.database_service.security;

import com.nhom13.database_service.security.filter.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class JwtSecurityConfig {
    @Autowired
    JwtRequestFilter jwtRequestFilter;

    @Autowired
    @Qualifier("delegatedAuthenticationEntryPoint")
    AuthenticationEntryPoint authEntryPoint;
    @Bean
    public AuthenticationManager authenticationManager(
            final AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain configure(final HttpSecurity http) throws Exception {
        return http
                .cors().and()
                .csrf().disable()
                .authorizeRequests().
                antMatchers("/auth/*").permitAll()
                .antMatchers("/user/*").permitAll()
                .anyRequest().authenticated().and()
                .exceptionHandling()
                .authenticationEntryPoint(authEntryPoint).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
