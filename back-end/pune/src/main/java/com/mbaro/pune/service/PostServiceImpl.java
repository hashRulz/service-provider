package com.mbaro.pune.service;

import com.mbaro.pune.model.Post;
import com.mbaro.pune.repository.PostRepository;
import com.mbaro.pune.request.PostDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostService{

    @Autowired
    private PostRepository postRepository;

    @Override
    public void createPost(PostDTO post) {

       Post p = new Post(
               post.getTitle(),
               post.getDescription(),
               post.getCategory()
       );
         postRepository.save(p);
    }
}
