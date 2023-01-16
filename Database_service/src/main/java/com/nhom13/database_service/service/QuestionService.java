package com.nhom13.database_service.service;

import com.nhom13.database_service.entity.Question;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface QuestionService extends TableDBService<Question>{
    void save(Question question);

    List<Question> findAllQuestionExam(int examId);
}
