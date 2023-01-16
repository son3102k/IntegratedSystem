package com.nhom13.database_service.repository;

import com.nhom13.database_service.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer > {
    List<Question> findAllByExamId(int examId);
}
