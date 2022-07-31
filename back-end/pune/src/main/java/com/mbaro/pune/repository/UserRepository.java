package com.mbaro.pune.repository;

import com.mbaro.pune.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    User findByUsername(String username);

    User findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.fullName = :fullName")
    User getUserByFullName(@Param("fullName") String fullName);

    @Query("SELECT u FROM User u WHERE active = 1")
    List<User> getUserCount();
}
