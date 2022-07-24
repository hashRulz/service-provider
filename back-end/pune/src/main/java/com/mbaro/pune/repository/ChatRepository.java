package com.mbaro.pune.repository;

import com.mbaro.pune.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface ChatRepository extends JpaRepository<Chat,Long> {

    Chat findByName(String chat);
//    List<ChatEntity> findByPartecipant(String usr);
}
