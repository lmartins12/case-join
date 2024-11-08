package br.com.api.case_join_backend.presentation.mapper;

import br.com.api.case_join_backend.domain.entity.Product;
import br.com.api.case_join_backend.presentation.dto.ProductDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    @Mapping(source = "category.id", target = "categoryId")
    ProductDto toDto(Product product);

    @Mapping(source = "categoryId", target = "category.id")
    Product toEntity(ProductDto productDto);
}
