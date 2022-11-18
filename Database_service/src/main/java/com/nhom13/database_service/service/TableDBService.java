package com.nhom13.database_service.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface TableDBService <T>{
    Page<T> getAll(Pageable pageable);

    List<T> getAll();

    Optional<T> findById(Integer id);
}

