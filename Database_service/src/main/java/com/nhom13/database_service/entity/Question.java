package com.nhom13.database_service.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "question")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    @JsonIgnore
    private int questionId;

    @NotEmpty(message = "Exam id is required")
    @Column(name = "exam_id")
    private int examId;

    @Column(name = "question_number")
    private int questionNumber;

    @NotEmpty(message = "Question content is required")
    @Column(name = "content")
    private String content;

    @NotEmpty(message = "Data type is required")
    @Column(name = "data_type")
    private String dataType;

    @Column(name = "true_answer")
    private String trueAnswer;

    public int getQuestionId() {
        return questionId;
    }

    public int getExamId() {
        return examId;
    }

    public int getQuestionNumber() {
        return questionNumber;
    }

    public String getContent() {
        return content;
    }

    public String getDataType() {
        return dataType;
    }

    public String getTrueAnswer() {
        return trueAnswer;
    }
}
