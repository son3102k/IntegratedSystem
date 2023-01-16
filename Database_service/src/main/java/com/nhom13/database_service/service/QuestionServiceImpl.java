package com.nhom13.database_service.service;

import com.nhom13.database_service.entity.Question;
import com.nhom13.database_service.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService{
    @Autowired
    QuestionRepository questionRepo;
    @Override
    public void save(Question question) {
        questionRepo.save(question);
    }

    @Override
    public List<Question> findAllQuestionExam(int examId) {
        return questionRepo.findAllByExamId(examId);
    }

    @Override
    public Page<Question> getAll(Pageable pageable) {
        return null;
    }

    @Override
    public List<Question> getAll() {
        return null;
    }

    @Override
    public Optional<Question> findById(Integer id) {
        return Optional.empty();
    }
}
