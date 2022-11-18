package com.nhom13.database_service.http.response;

import java.util.Collection;

public class AuthenticationResponse {
    private String accessToken;
    private Collection<?> role;

    public Collection<?> getRole() {
        return role;
    }

    public void setRole(Collection<?> role) {
        this.role = role;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
