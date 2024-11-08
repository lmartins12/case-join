package br.com.api.case_join_backend.domain.repository;

import br.com.api.case_join_backend.domain.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    boolean existsByName(String name);
}
