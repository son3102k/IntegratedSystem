package com.nhom13.database_service.http.response;

import com.nhom13.database_service.entity.Answer;
import com.nhom13.database_service.entity.Question;

import java.util.ArrayList;
import java.util.List;

public class GetExamResponse {
    private List<Question> listQuestion;
    private List<List<Answer>> listAnswer;

    public List<Question> getListQuestion() {
        return listQuestion;
    }

    public GetExamResponse() {
        listQuestion = new ArrayList<>();
        listAnswer = new ArrayList<>();
    }

    public void setListQuestion(List<Question> listQuestion) {
        this.listQuestion = listQuestion;
    }

    public List<List<Answer>> getListAnswer() {
        return listAnswer;
    }

    public void setListAnswer(List<List<Answer>> listAnswer) {
        this.listAnswer = listAnswer;
    }

    public void pushAnswer(List<Answer> answers) {
        listAnswer.add(answers);
    }
}
