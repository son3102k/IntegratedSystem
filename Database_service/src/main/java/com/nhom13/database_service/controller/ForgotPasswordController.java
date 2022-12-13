package com.nhom13.database_service.controller;

import com.google.gson.Gson;
import com.nhom13.database_service.constant.ApiStatus;
import com.nhom13.database_service.constant.MessageCode;
import com.nhom13.database_service.entity.User;
import com.nhom13.database_service.exception.UserNotFoundException;
import com.nhom13.database_service.http.Utility;
import com.nhom13.database_service.http.request.ResetPasswordRequest;
import com.nhom13.database_service.http.response.Response;
import com.nhom13.database_service.service.UserService;
import com.nhom13.database_service.service.UserServiceImpl;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping(value = "/user",produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin("*")
public class ForgotPasswordController {
    @Autowired
    private UserService userService;

    @Autowired
    private JavaMailSender mailSender;

    Gson gson = new Gson();

    @PostMapping("/reset_password")
    public ResponseEntity<?> processResetPassword(HttpServletRequest request, @RequestBody ResetPasswordRequest resetPasswordRequest){
//        String token = request.getParameter("token");
//        String newPassword = request.getParameter("newPassword");

        User user = userService.getByResetPasswordToken(resetPasswordRequest.getToken());

        if(user == null){
            return ResponseEntity.ok().body(gson.toJson(new Response(ApiStatus.TOKEN_INVALID, MessageCode.TOKEN_INVALID)));
        } else {
            userService.updatePassword(user, resetPasswordRequest.getNewPassword());
            return ResponseEntity.ok().body(gson.toJson(new Response(ApiStatus.SUCCESS,MessageCode.SUCCESS)));
        }
    }

    @PostMapping("/forgot_password")
    public ResponseEntity<?> processForgotPassword(HttpServletRequest request, @RequestBody String email){
//        String email = request.getParameter("email");
        String token = RandomString.make(50);

        try {
            userService.updateResetPasswordToken(token, email);

            //Generate reset password link
            String resetPasswordLink = Utility.getSiteURL(request) + "/reset_password?token=" + token;

            //send email
            sendEmail(email, resetPasswordLink);
        } catch (UserNotFoundException | MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok().body(gson.toJson(new Response(ApiStatus.SUCCESS,MessageCode.SUCCESS)));
    }

    private void sendEmail(String email, String resetPasswordLink) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("Nhom13@gmail.com", "Nhom13");
        helper.setTo(email);

        String subject = "Here's the link to reset your password";
        String content = "<p>Hello,</p>"
                + "<p>You have requested to reset your password.</p>"
                + "<p>Click the link below to change your password:</p>"
                + "<p><b><a href=\"" + resetPasswordLink + "\">Change my password</a><b></p>"
                + "<p>Ignore this email if you do remember your password, or you have not made the request.</p>";

        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }
}
