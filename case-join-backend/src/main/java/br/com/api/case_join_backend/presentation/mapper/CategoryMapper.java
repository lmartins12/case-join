package br.com.api.case_join_backend.presentation.mapper;


import br.com.api.case_join_backend.domain.entity.Category;
import br.com.api.case_join_backend.presentation.dto.CategoryDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    CategoryDto toDto(Category category);

    Category toEntity(CategoryDto categoryDto);
}
