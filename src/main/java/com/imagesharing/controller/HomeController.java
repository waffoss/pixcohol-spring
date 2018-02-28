package com.imagesharing.controller;

import com.imagesharing.response.BaseResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HomeController {



    @RequestMapping(value = "/",method = RequestMethod.GET)
    public BaseResponse home(){
        BaseResponse response = new BaseResponse();

        response.setSuccess("true");
        response.setReason("Hello from image-sharing api");

        return response;
    }
}
