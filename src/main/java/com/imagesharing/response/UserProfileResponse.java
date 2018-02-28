package com.imagesharing.response;

public class UserProfileResponse extends BaseResponse{
    private boolean _a;
    private Integer id;

    public boolean is_a() {
        return _a;
    }

    public void set_a(boolean _a) {
        this._a = _a;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
