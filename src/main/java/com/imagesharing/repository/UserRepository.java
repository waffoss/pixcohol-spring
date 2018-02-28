package com.imagesharing.repository;

import com.imagesharing.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository  extends JpaRepository<User,Integer>{
    User findByEmail(String email);
}
