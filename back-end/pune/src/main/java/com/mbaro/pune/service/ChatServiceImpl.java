package com.mbaro.pune.service;

import com.mbaro.pune.model.Chat;
import com.mbaro.pune.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    ChatRepository chatRepository;

    @Override
    public Long saveChat(Chat chat){
        return chatRepository.save(chat).getChat_id();
    }

    @Override
    public Chat findByName(String name) {
        return chatRepository.findByName(name);
    }
}
