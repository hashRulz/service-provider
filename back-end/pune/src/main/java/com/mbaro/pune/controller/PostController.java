package com.mbaro.pune.controller;


import com.mbaro.pune.model.Post;
import com.mbaro.pune.request.PostDTO;
import com.mbaro.pune.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/createPost")
     public ResponseEntity<?> createPost(@RequestBody PostDTO post){
        try{
            postService.createPost(post);
            return new ResponseEntity<>("success",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
