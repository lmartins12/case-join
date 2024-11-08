package br.com.api.case_join_backend.presentation.dto;

import lombok.Data;

@Data
public class UserDto {

    @jakarta.validation.constraints.NotBlank(message = "O nome de usuário é obrigatório.")
    private String username;

    @jakarta.validation.constraints.NotBlank(message = "A senha é obrigatória.")
    private String password;
}
