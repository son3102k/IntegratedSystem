package com.nhom13.database_service.service;

import com.nhom13.database_service.entity.Exam;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface ExamService extends TableDBService<Exam>{
    @Override
    List<Exam> getAll();

    void save(Exam exam);
}
