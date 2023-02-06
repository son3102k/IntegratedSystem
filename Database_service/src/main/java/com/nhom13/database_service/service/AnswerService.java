package com.nhom13.database_service.service;

import com.nhom13.database_service.entity.Answer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AnswerService extends  TableDBService<Answer>{
    void save(Answer answer);

    List<Answer> getAllAnswerByQuestionId(int questionId);
}
