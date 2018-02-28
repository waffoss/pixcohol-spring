package com.imagesharing.response;

import com.imagesharing.entity.User;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

public class PostResponse extends BaseResponse{
    private String title;
    private String pictureName;
    private byte[] Data;
    private Integer authorId;
    private Integer id;
    private Date createdAt;
    private Integer[] likes;


    public PostResponse(String title, String pictureName, byte[] data, Integer authorId, Integer id, Date createdAt,Integer[] likes) {
        this.title = title;
        this.pictureName = pictureName;
        Data = data;
        this.authorId = authorId;
        this.id = id;
        this.createdAt = createdAt;
        this.likes = likes;
    }

    public PostResponse() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPictureName() {
        return pictureName;
    }

    public void setPictureName(String pictureName) {
        this.pictureName = pictureName;
    }

    public byte[] getData() {
        return Data;
    }

    public void setData(byte[] data) {
        Data = data;
    }

    public Integer getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Integer authorId) {
        this.authorId = authorId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Integer[] getLikes() {
        return likes;
    }

    public void setLikes(Integer[] likes) {
        this.likes = likes;
    }
}
