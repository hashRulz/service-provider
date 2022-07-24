package com.mbaro.pune.service;

import com.mbaro.pune.model.Message;

import java.util.List;

public interface MessageService {

    Message saveMessage(Message message);
    List<Message> findAllByChat(long id);
}
