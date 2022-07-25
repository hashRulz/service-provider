package com.mbaro.pune.service;

import com.mbaro.pune.model.Chat;

public interface ChatService {

    Chat findByName(String name);
    Long saveChat(Chat chat);
}
