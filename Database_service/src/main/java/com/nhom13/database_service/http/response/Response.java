package com.nhom13.database_service.http.response;

import com.google.gson.annotations.Expose;

public class Response {
    @Expose
    private int code;
    @Expose
    private String message;
    @Expose
    private Object data;

    public void setCode(int code) {
        this.code = code;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public Response(int code, String message, Object data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
