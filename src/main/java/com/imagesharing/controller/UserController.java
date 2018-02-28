package com.imagesharing.controller;

import com.imagesharing.bindingModel.IdBindingModel;
import com.imagesharing.entity.Post;
import com.imagesharing.entity.Role;
import com.imagesharing.entity.User;
import com.imagesharing.repository.PostRepository;
import com.imagesharing.repository.RoleRepository;
import com.imagesharing.repository.UserRepository;
import com.imagesharing.bindingModel.UserBindingModel;
import com.imagesharing.response.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PostRepository postRepository;

    @RequestMapping(value = "/register",method = RequestMethod.POST)
    public BaseResponse registerProcess(@RequestBody UserBindingModel request){

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        User user = new User(request.getEmail(),bCryptPasswordEncoder.encode(request.getPassword()));

        Role userRole = this.roleRepository.findByName("ROLE_USER");
        user.addRole(userRole);
        this.userRepository.saveAndFlush(user);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setSuccess("true");
        baseResponse.setReason("User registered succefully");
        return baseResponse;
    }




    @RequestMapping(value = "/profile",method = RequestMethod.GET)
    public UserProfileResponse profile(){
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        User user = this.userRepository.findByEmail(loggedInUser.getName());
        UserProfileResponse userProfileResponse = new UserProfileResponse();
        if(user == null){
            userProfileResponse.setSuccess("false");
            userProfileResponse.setReason("User not logged in");
        }


        userProfileResponse.setSuccess("true");
        userProfileResponse.setReason("User logged succefully");
        userProfileResponse.set_a(user.isAdmin());
        userProfileResponse.setId(user.getId());


        return userProfileResponse;
    }

    @RequestMapping(value = "/api/admin/users/all",method = RequestMethod.GET)
    public UsersResponse allUsers(){
        List<User> users = this.userRepository.findAll();
        UsersResponse usersResponse = new UsersResponse();
        usersResponse.setSuccess("true");
        usersResponse.setReason("");
        List<UserResponse> usersResonse = new ArrayList<>();

        for (User user : users) {
            usersResonse.add(new UserResponse(user.getEmail(),user.getId()));
        }

        usersResponse.setUsers(usersResonse);

        return usersResponse;
    }

    @RequestMapping(value = "/api/admin/user/delete",method = RequestMethod.POST)
    public BaseResponse deleteUserProcess(@RequestBody IdBindingModel idBindingModel){
        BaseResponse response = new BaseResponse();
        if(!this.userRepository.exists(idBindingModel.getId())){
            response.setSuccess("false");
            response.setReason("Missing user");
            return response;
        }

        User user = this.userRepository.findOne(idBindingModel.getId());
        this.userRepository.delete(user);

        response.setSuccess("true");
        response.setReason("User deleted succefully");

        return response;
    }

    @RequestMapping(value = "/api/user/{id}",method = RequestMethod.GET)
    public UserResponse getSingleUser(@PathVariable Integer id){
            UserResponse userResponse = new UserResponse();
        if (!this.userRepository.exists(id)){
            userResponse.setSuccess("false");
            userResponse.setReason("Missing user");

            return userResponse;
        }

        User user = this.userRepository.findOne(id);

        userResponse.setReason("");
        userResponse.setSuccess("true");
        userResponse.setId(user.getId());
        userResponse.setEmail(user.getEmail());

        return userResponse;

    }

    @RequestMapping(value = "/api/user/favorites/add",method = RequestMethod.POST)
    public BaseResponse addToFavoritesProcess(@RequestBody IdBindingModel idBindingModel){

        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        User user = this.userRepository.findByEmail(loggedInUser.getName());
        BaseResponse baseResponse = new BaseResponse();

        if (!this.postRepository.exists(idBindingModel.getId())){
            baseResponse.setSuccess("false");
            baseResponse.setReason("Post not found!");

            return baseResponse;
        }

        Post post = this.postRepository.findOne(idBindingModel.getId());
        Set<Post> userFavorites = user.getFavorites();

        if (userFavorites.contains(post)) {
            userFavorites.remove(post);
        } else {
            userFavorites.add(post);
        }

        user.setFavorites(userFavorites);

        this.userRepository.saveAndFlush(user);

        baseResponse.setSuccess("true");
        baseResponse.setReason("");
        return baseResponse;
    }

    @RequestMapping(value = "/api/user/favorites",method = RequestMethod.POST)
    public PostsResponse getFavorites(){

        PostsResponse postsResponse = new PostsResponse();

        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        User user = this.userRepository.findByEmail(loggedInUser.getName());
        Set<Post> favorites = user.getFavorites();
        List<PostResponse> responses = new ArrayList<>();




        for (Post favorite : favorites) {
            List<Integer> likes = new ArrayList<>();

            for (User userr : favorite.getLikes()) {
                likes.add(userr.getId());
            }

            Integer[] likesArray = new Integer[likes.size()];
            likesArray = likes.toArray(likesArray);
            responses.add(new PostResponse(favorite.getTitle(),favorite.getPictureName(),favorite.getData(),favorite.getAuthor().getId(),favorite.getId(),favorite.getCreatedAt(),likesArray));
        }

        postsResponse.setPostResponses(responses);
        postsResponse.setSuccess("true");
        postsResponse.setReason("");

        return postsResponse;
    }

    @RequestMapping(value = "/api/post/getLatestPosts/{id}",method = RequestMethod.GET)
    public PostsResponse getLatest(@PathVariable Integer id){
        PostsResponse postsResponse = new PostsResponse();

        if(!this.userRepository.exists(id)){
            postsResponse.setSuccess("false");
            postsResponse.setReason("User not found!");
            return postsResponse;
        }

        User user = this.userRepository.findOne(id);
        Set<Post> posts = this.postRepository.findByAuthorId(id);
        List<PostResponse> postResponses = new ArrayList<>();

        for (Post post : posts) {
            List<Integer> likes = new ArrayList<>();

            for (User userr : post.getLikes()) {
                likes.add(userr.getId());
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



}
