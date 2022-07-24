package com.mbaro.pune.service;

import com.mbaro.pune.model.Message;
import com.mbaro.pune.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    MessageRepository messageRepository;

    @Override
    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    @Override
    public List<Message> findAllByChat(long id) {
        return messageRepository.findAllByChatId(id);
    }
}
