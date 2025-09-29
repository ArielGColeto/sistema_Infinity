package com.Infinity.cadastro.repository;

import com.Infinity.cadastro.model.pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface pessoaRepo extends JpaRepository<pessoa, Long> {

}
