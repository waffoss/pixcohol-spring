package com.imagesharing.controller;

import com.imagesharing.bindingModel.TagBindingModel;
import com.imagesharing.entity.Tag;
import com.imagesharing.repository.TagRepository;
import com.imagesharing.response.BaseResponse;
import com.imagesharing.response.TagResponse;
import com.imagesharing.response.TagsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/tag")
public class TagController {

    @Autowired
    TagRepository tagRepository;

    @RequestMapping(value = "/create",method = RequestMethod.POST)
    public BaseResponse tagCreateProcess(@RequestBody TagBindingModel tagBindingModel){
        BaseResponse baseResponse = new BaseResponse();


        if(this.tagRepository.findByName(tagBindingModel.getName()) != null){
            baseResponse.setSuccess("false");
            baseResponse.setReason("Tag already exists");
            return baseResponse;
        }

        Tag tag = new Tag(tagBindingModel.getName());
        this.tagRepository.saveAndFlush(tag);
        baseResponse.setSuccess("true");
        baseResponse.setReason("Tag created succefully");

        return baseResponse;
    }

    @RequestMapping(value = "/all",method = RequestMethod.GET)
    public TagsResponse tagAll(){
        List<Tag> tagsEntity = this.tagRepository.findAll();
        TagsResponse tagsResponse = new TagsResponse();
        List<TagResponse> tagResponses = new ArrayList<>();

        for (Tag tag : tagsEntity) {
            tagResponses.add(new TagResponse(tag.getId(),tag.getName()));
        }

        tagsResponse.setSuccess("true");
        tagsResponse.setReason("");
        tagsResponse.setTags(tagResponses);
        return tagsResponse;
    }

}
