package com.nhom13.database_service.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nhom13.database_service.constant.ApiStatus;
import com.nhom13.database_service.constant.MessageCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component("delegatedAuthenticationEntryPoint")
public class DelegatedAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver resolver;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        Exception e = (Exception) request.getAttribute("exception");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        if (!authException.equals(null) && e==null) {
            Map<String , Object> res = new HashMap<>();
            res.put("code", ApiStatus.TOKEN_INVALID);
            res.put("message", MessageCode.TOKEN_INVALID);
            byte[] body = new ObjectMapper().writeValueAsBytes(res);
            response.getOutputStream().write(body);
        }
        resolver.resolveException(request, response, null, authException);
    }
}
