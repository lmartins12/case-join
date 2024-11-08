package br.com.api.case_join_backend.presentation.controller;

import br.com.api.case_join_backend.application.service.UserService;
import br.com.api.case_join_backend.presentation.dto.AuthResponseDto;
import br.com.api.case_join_backend.presentation.dto.UserDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody UserDto userDto) {
        userService.registerUser(userDto);
        return ResponseEntity.status(201).body("Usuário registrado com sucesso.");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> authenticateUser(@Valid @RequestBody UserDto userDto) {
        String token = userService.authenticate(userDto);
        return ResponseEntity.ok(new AuthResponseDto(token));
    }
}
