package com.nhom13.database_service.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class Test {
    @GetMapping("/Hello")
    public String test() {
        return "Hello World!";
    }
}
