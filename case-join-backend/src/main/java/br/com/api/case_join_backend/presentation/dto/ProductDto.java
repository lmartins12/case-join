package br.com.api.case_join_backend.presentation.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Data
public class ProductDto {

    private UUID id;

    @jakarta.validation.constraints.NotBlank(message = "O nome do produto é obrigatório.")
    private String name;

    @jakarta.validation.constraints.NotNull(message = "O preço do produto é obrigatório.")
    @jakarta.validation.constraints.DecimalMin(value = "0.0", inclusive = false, message = "O preço deve ser maior que zero.")
    private BigDecimal price;

    @jakarta.validation.constraints.NotNull(message = "A categoria do produto é obrigatória.")
    private UUID categoryId;
}
