package com.imagesharing.repository;

import com.imagesharing.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface PostRepository extends JpaRepository<Post,Integer>{
    Post findByTitle(String title);
    Set<Post> findByAuthorId(Integer id);
}
