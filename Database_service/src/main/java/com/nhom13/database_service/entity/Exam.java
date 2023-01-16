package com.nhom13.database_service.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Entity
@Table(name = "exam")
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exam_id")
    @JsonIgnore
    private int id;

    @NotEmpty(message = "The name is required")
    @Size(max = 256, message = "The name is too long")
    @Column(name = "exam_name")
    private String name;

    @NotEmpty(message = "The type of exam is required")
    @Column(name = "exam_type")
    private String type;
}
