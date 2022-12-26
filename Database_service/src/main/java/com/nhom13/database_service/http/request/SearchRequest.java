package com.nhom13.database_service.http.request;

import com.nhom13.database_service.constant.SearchSubject;
import com.nhom13.database_service.constant.SearchType;
import com.nhom13.database_service.util.ValueOfEnum;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class SearchRequest {
    @NotNull(message = "Search type is require")
    @ValueOfEnum(enumClass = SearchType.class, message = "Search Type must be in : [MidHK1 , MidHK2 , HK1 , HK2 , Try , HSG]")
    private String type;
    @NotNull(message = "Subject is require")
    @ValueOfEnum(enumClass = SearchSubject.class , message = "Subject must be in : [MATH, PHYSIC , CHEMISTRY , BIOLOGY]")
    private String subject;
    @NotNull(message = "Grade is require")
    @Min(value = 10 , message = "grade must be greater than or equal to 10 and be less than or equal to 12")
    @Max(value = 12 , message = "grade must be greater than or equal to 10 and be less than or equal to 12")
    private int grade = 10;
    private String text = "";
    private String level = "";

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }
}
