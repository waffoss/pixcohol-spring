package com.imagesharing.response;

import java.util.List;

public class PostsResponse extends BaseResponse{
    private List<PostResponse> postResponses;

    public List<PostResponse> getPostResponses() {
        return postResponses;
    }

    public void setPostResponses(List<PostResponse> postResponses) {
        this.postResponses = postResponses;
    }
}
