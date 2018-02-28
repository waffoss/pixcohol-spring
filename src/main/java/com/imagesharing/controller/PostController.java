package com.imagesharing.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.imagesharing.bindingModel.IdBindingModel;
import com.imagesharing.entity.Post;
import com.imagesharing.entity.Tag;
import com.imagesharing.entity.User;
import com.imagesharing.repository.PostRepository;
import com.imagesharing.repository.TagRepository;
import com.imagesharing.repository.UserRepository;
import com.imagesharing.response.BaseResponse;
import com.imagesharing.response.PostResponse;
import com.imagesharing.response.PostsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.*;

@RestController
public class PostController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PostRepository postRepository;
    @Autowired
    TagRepository tagRepository;
    @Autowired
    ObjectMapper objectMapper;

    @RequestMapping(path = "/api/post/create",method = RequestMethod.POST)
    public BaseResponse postCreationProcess(MultipartHttpServletRequest mrequest) throws IOException {
        BaseResponse baseResponse = new BaseResponse();

        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        User user = this.userRepository.findByEmail(loggedInUser.getName());

        List<Tag> tagIds = Arrays.asList(objectMapper.readValue(mrequest.getParameter("tags"), Tag[].class));
        Set<Tag> tags = new HashSet<>();
        for (Tag tagId : tagIds) {
            tags.add(this.tagRepository.findOne(Integer.parseInt(tagId.getName())));
        }

        Post post = new Post(mrequest.getParameter("title"),user,tags,mrequest.getFile("picture").getOriginalFilename(),mrequest.getFile("picture").getBytes());
        this.postRepository.saveAndFlush(post);


        baseResponse.setSuccess("true");
        baseResponse.setReason("");
        return baseResponse;
    }

    @RequestMapping(path = "/api/post/all",method = RequestMethod.GET)
    public PostsResponse allPosts(){
        List<Post> postsEntity = this.postRepository.findAll();
        PostsResponse postsResponse = new PostsResponse();
        ArrayList<PostResponse> postResponses = new ArrayList<>();


        for (Post post : postsEntity) {

            List<Integer> likes = new ArrayList<>();

            for (User user : post.getLikes()) {
                likes.add(user.getId());
            }

            Integer[] likesArray = new Integer[likes.size()];
            likesArray = likes.toArray(likesArray);

            postResponses.add(new PostResponse(post.getTitle(),post.getPictureName(),post.getData(),post.getAuthor().getId(),post.getId(),post.getCreatedAt(),likesArray));
        }

        postsResponse.setPostResponses(postResponses);
        postsResponse.setSuccess("true");
        postsResponse.setReason("");
        return postsResponse;
    }

    @RequestMapping(path = "/api/post/{id}",method = RequestMethod.GET)
    public PostResponse getSinglePost(@PathVariable Integer id){
        PostResponse postResponse = new PostResponse();

        if (!postRepository.exists(id)){
            postResponse.setSuccess("false");
            postResponse.setReason("Post not found!");

            return postResponse;
        }

        Post post = postRepository.findOne(id);

        postResponse.setSuccess("true");
        postResponse.setReason("");

        List<Integer> likes = new ArrayList<>();

        for (User user : post.getLikes()) {
            likes.add(user.getId());
        }

        Integer[] likesArray = new Integer[likes.size()];
        likesArray = likes.toArray(likesArray);

        postResponse.setAuthorId(post.getAuthor().getId());
        postResponse.setCreatedAt(post.getCreatedAt());
        postResponse.setData(post.getData());
        postResponse.setPictureName(post.getPictureName());
        postResponse.setTitle(post.getTitle());
        postResponse.setId(post.getId());
        postResponse.setLikes(likesArray);

        return postResponse;
    }

    @RequestMapping(path = "/api/post/like",method = RequestMethod.POST)
    public BaseResponse postLikeProcess(@RequestBody String postId) throws IOException{
        BaseResponse baseResponse = new BaseResponse();

        IdBindingModel idBindingModel = objectMapper.readValue(postId,IdBindingModel.class);
        Integer id = idBindingModel.getId();

        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        User user = this.userRepository.findByEmail(loggedInUser.getName());

        Post post = this.postRepository.findOne(id);
        Set<User> likes = post.getLikes();
        if(likes.contains(user)){
            likes.remove(user);
        }else{
            likes.add(user);
        }

        post.setLikes(likes);


        this.postRepository.saveAndFlush(post);

        baseResponse.setSuccess("true");
        baseResponse.setReason("");
        return baseResponse;
    }

    @RequestMapping(path = "/api/post/delete",method = RequestMethod.POST)
    public BaseResponse deleteProcess(@RequestBody IdBindingModel idBindingModel){
        BaseResponse baseResponse = new BaseResponse();

        if (!this.postRepository.exists(idBindingModel.getId())){
            baseResponse.setSuccess("false");
            baseResponse.setReason("Post not found");
            return baseResponse;
        }

        Post post = this.postRepository.findOne(idBindingModel.getId());

        this.postRepository.delete(post);
        baseResponse.setSuccess("true");
        baseResponse.setReason("");

        return baseResponse;
    }
}
