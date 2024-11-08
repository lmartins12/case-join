package br.com.api.case_join_backend.application.service;

import br.com.api.case_join_backend.application.exception.ResourceNotFoundException;
import br.com.api.case_join_backend.domain.entity.Category;
import br.com.api.case_join_backend.domain.entity.Product;
import br.com.api.case_join_backend.domain.repository.CategoryRepository;
import br.com.api.case_join_backend.domain.repository.ProductRepository;
import br.com.api.case_join_backend.presentation.dto.ProductDto;
import br.com.api.case_join_backend.presentation.mapper.ProductMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository,
                          ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.productMapper = productMapper;
    }

    @Transactional
    public ProductDto createProduct(ProductDto productDto) {
        if (productRepository.existsByName(productDto.getName())) {
            throw new IllegalArgumentException("Produto já existe.");
        }
        Category category = categoryRepository.findById(productDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada."));
        Product product = productMapper.toEntity(productDto);
        product.setCategory(category);
        Product savedProduct = productRepository.save(product);
        return productMapper.toDto(savedProduct);
    }

    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(productMapper::toDto)
                .toList();
    }

    public ProductDto getProductById(UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado."));
        return productMapper.toDto(product);
    }

    @Transactional
    public ProductDto updateProduct(UUID id, ProductDto productDto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado."));
        Category category = categoryRepository.findById(productDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada."));
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        product.setCategory(category);
        Product updatedProduct = productRepository.save(product);
        return productMapper.toDto(updatedProduct);
    }

    @Transactional
    public void deleteProduct(UUID id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Produto não encontrado.");
        }
        productRepository.deleteById(id);
    }
}

