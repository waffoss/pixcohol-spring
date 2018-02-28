package com.imagesharing.response;

public class UserResponse extends BaseResponse{

    private String email;
    private Integer id;

    public UserResponse(String email, Integer id) {
        this.email = email;
        this.id = id;
    }

    public UserResponse() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
