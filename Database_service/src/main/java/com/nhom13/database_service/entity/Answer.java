package com.nhom13.database_service.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "answer")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id")
    @JsonIgnore
    private int id;

    @NotEmpty(message = "Question id is required")
    @Column(name = "question_id")
    private int questionId;

    @NotEmpty(message = "The answer number is required")
    @Column(name = "answernumber")
    private int answerNumber;

    @NotEmpty(message = "The content is required")
    @Column(name = "content")
    private String content;
}
