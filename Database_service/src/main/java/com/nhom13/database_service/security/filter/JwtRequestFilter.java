package com.nhom13.database_service.security.filter;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.nhom13.database_service.constant.ApiStatus;
import com.nhom13.database_service.constant.MessageCode;
import com.nhom13.database_service.security.service.JwtTokenService;
import com.nhom13.database_service.security.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    @Autowired
    JwtTokenService jwtTokenService;
    @Autowired
    JwtUserDetailsService jwtUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        final String token = header.substring(7);
        try {
            final String username = jwtTokenService.validateTokenAndGetUsername(token);
            // set user details on spring security context
            final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(username);
            final UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
            response.setHeader("Access-Control-Max-Age", "3600");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
            // continue with authenticated user
            filterChain.doFilter(request, response);
        }
        catch (JWTVerificationException e) {
            Map<String , Object> res = new HashMap<>();
            res.put("code", ApiStatus.JWT_VERIFICATION_FAIL);
            res.put("message", e.getMessage());
            byte[] body = new ObjectMapper().writeValueAsBytes(res);
            response.getOutputStream().write(body);
            request.setAttribute("exception", e);
            filterChain.doFilter(request, response);
            return;
        }
    }
}
