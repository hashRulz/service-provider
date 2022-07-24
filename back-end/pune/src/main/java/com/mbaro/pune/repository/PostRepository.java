package com.mbaro.pune.repository;

import com.mbaro.pune.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post,Long> {
}
