package br.com.api.case_join_backend.domain.repository;

import br.com.api.case_join_backend.domain.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {
    boolean existsByName(String name);
}
