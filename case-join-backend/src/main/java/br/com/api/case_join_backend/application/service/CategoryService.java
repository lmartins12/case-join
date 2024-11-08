package br.com.api.case_join_backend.application.service;

import br.com.api.case_join_backend.application.exception.ResourceNotFoundException;
import br.com.api.case_join_backend.domain.entity.Category;
import br.com.api.case_join_backend.domain.repository.CategoryRepository;
import br.com.api.case_join_backend.presentation.dto.CategoryDto;
import br.com.api.case_join_backend.presentation.mapper.CategoryMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @Transactional
    public CategoryDto createCategory(CategoryDto categoryDto) {
        if (categoryRepository.existsByName(categoryDto.getName())) {
            throw new IllegalArgumentException("Categoria já existe.");
        }
        Category category = categoryMapper.toEntity(categoryDto);
        Category savedCategory = categoryRepository.save(category);
        return categoryMapper.toDto(savedCategory);
    }

    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(categoryMapper::toDto)
                .toList();
    }

    public CategoryDto getCategoryById(UUID id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada."));
        return categoryMapper.toDto(category);
    }

    @Transactional
    public CategoryDto updateCategory(UUID id, CategoryDto categoryDto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada."));
        category.setName(categoryDto.getName());
        Category updatedCategory = categoryRepository.save(category);
        return categoryMapper.toDto(updatedCategory);
    }

    @Transactional
    public void deleteCategory(UUID id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Categoria não encontrada.");
        }
        categoryRepository.deleteById(id);
    }
}
