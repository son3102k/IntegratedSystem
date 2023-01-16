package com.nhom13.database_service.controller;
import com.google.gson.Gson;
import com.nhom13.database_service.constant.ApiStatus;
import com.nhom13.database_service.constant.MessageCode;
import com.nhom13.database_service.entity.User;
import com.nhom13.database_service.http.request.AuthenticationRequest;
import com.nhom13.database_service.http.response.AuthenticationResponse;
import com.nhom13.database_service.http.response.Response;
import com.nhom13.database_service.security.service.JwtTokenService;
import com.nhom13.database_service.security.service.JwtUserDetailsService;
import com.nhom13.database_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.Optional;



@RestController
@RequestMapping(value = "/auth",produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin("*")
public class AuthenticationController {
    @Autowired
    UserService userService;
    @Autowired
    JwtUserDetailsService jwtUserDetailsService;
    @Autowired
    JwtTokenService jwtTokenService;
    @Autowired
    AuthenticationManager authenticationManager;
    Gson gson = new Gson();

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid User user) {
        Optional<User> duplicateUser = userService.findByEmail(user.getEmail());
        System.out.println(duplicateUser);
        if (duplicateUser.equals(Optional.empty())) {
            duplicateUser = userService.findByPhoneNumber(user.getPhoneNumber());
        }
        else {
            return ResponseEntity.ok().body(gson.toJson(new Response(ApiStatus.DUPLICATE_VALUE_PARAM, "The email was existed!")));
        }
        if (duplicateUser.equals(Optional.empty())) {
            duplicateUser = userService.findByUsername(user.getUsername());
        }
        else {
            return ResponseEntity.ok().body(gson.toJson(new Response(ApiStatus.DUPLICATE_VALUE_PARAM, "The phone number was existed!")));
        }
        if (duplicateUser.equals(Optional.empty())) {
            String password = user.getPassword();
            user.setPassword(new BCryptPasswordEncoder().encode(password));
            userService.save(user);
            return ResponseEntity.ok(gson.toJson(new Response(ApiStatus.SUCCESS, MessageCode.SUCCESS)));
        }
        else {
            return ResponseEntity.badRequest().body(gson.toJson(new Response(ApiStatus.DUPLICATE_VALUE_PARAM, "The username was existed!")));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody @Valid final AuthenticationRequest authenticationRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        }
        catch (final BadCredentialsException e) {
            return ResponseEntity.ok(gson.toJson(new Response(ApiStatus.BAD_CREDENTIALS, MessageCode.BAD_CREDENTIALS)));
        }
        final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final Optional<User> user = userService.findByUsername(authenticationRequest.getUsername());
        final AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setAccessToken(jwtTokenService.generateToken(userDetails));
        authenticationResponse.setAuthorities(userDetails.getAuthorities());
        User responseUser = user.isEmpty() ? null : user.get();
        if (responseUser!=null) {
            responseUser.setUsername(null);
            responseUser.setPassword(null);
            authenticationResponse.setUser(responseUser);
        }
        return ResponseEntity.ok(gson.toJson(new Response(ApiStatus.SUCCESS,MessageCode.SUCCESS, authenticationResponse)));
    }
}
