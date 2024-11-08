package br.com.api.case_join_backend.presentation.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class CategoryDto {

    private UUID id;

    @jakarta.validation.constraints.NotBlank(message = "O nome da categoria é obrigatório.")
    private String name;
}
