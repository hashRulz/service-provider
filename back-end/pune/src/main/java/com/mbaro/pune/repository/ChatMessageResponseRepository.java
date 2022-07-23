package com.mbaro.pune.repository;

import com.mbaro.pune.model.ChatMessageResponse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageResponseRepository extends JpaRepository<ChatMessageResponse,Long> {
}
