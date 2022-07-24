package com.mbaro.pune.repository;

import com.mbaro.pune.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;

@EnableJpaRepositories
public interface MessageRepository extends JpaRepository<Message,Long> {
    List<Message> findAllByChatId(long id);
}
