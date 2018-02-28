package com.imagesharing.response;

import com.imagesharing.entity.Tag;

import java.util.List;
import java.util.Set;

public class TagsResponse extends BaseResponse {

    private List<TagResponse> tags;

    public List<TagResponse> getTags() {
        return tags;
    }

    public void setTags(List<TagResponse> tags) {
        this.tags = tags;
    }
}
