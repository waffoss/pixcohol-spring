package com.imagesharing.response;

import com.imagesharing.entity.User;

import java.util.List;

public class UsersResponse extends BaseResponse {

    private List<UserResponse> users;

    public List<UserResponse> getUsers() {
        return users;
    }

    public void setUsers(List<UserResponse> users) {
        this.users = users;
    }
}
