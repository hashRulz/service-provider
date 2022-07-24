package com.mbaro.pune.service;

import com.mbaro.pune.model.Post;
import com.mbaro.pune.request.PostDTO;

public interface PostService {

    void createPost(PostDTO post);
}
