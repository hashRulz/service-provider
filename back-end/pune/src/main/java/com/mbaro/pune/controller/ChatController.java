package com.mbaro.pune.controller;

import com.mbaro.pune.model.Chat;
import com.mbaro.pune.model.Message;
import com.mbaro.pune.service.ChatService;
import com.mbaro.pune.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private ChatService chatService;
    @Autowired
    private MessageService messageService;

    @MessageMapping("/chat/{to}") //to = nome canalekjj
    public void sendMessage(@DestinationVariable String to , Message message) {
        System.out.println("handling send message: " + message + " to: " + to);
        message.setChat_id(createAndOrGetChat(to));
        message.setT_stamp(generateTimeStamp());
        message = messageService.saveMessage(message);
        simpMessagingTemplate.convertAndSend("/topic/messages/" + to, message);
    }

//    @PostMapping("/getChats")
//    public List<ChatEntity> getChats(@RequestBody String user){
//        return chatDAO.findByPartecipant(user);
//    }

    //returns an empty list if the chat doesn't exist
    @PostMapping("/getMessages")
    public List<Message> getMessages(@RequestBody String chat) {
        Chat ce = chatService.findByName(chat);

        if(ce != null) {
            return messageService.findAllByChat(ce.getChat_id());
        }
        else{
            return new ArrayList<Message>();
        }
    }

    //finds the chat whose name is the parameter, if it doesn't exist it gets created, the ID gets returned either way
    private Long createAndOrGetChat(String name) {
        Chat ce = chatService.findByName(name);

        if (ce != null) {
            return ce.getChat_id();
        }
        else {
            Chat newChat = new Chat(name);
            return chatService.saveChat(newChat);
        }
    }

    private String generateTimeStamp() {
        Instant i = Instant.now();
        String date = i.toString();
        System.out.println("Source: " + i.toString());
        int endRange = date.indexOf('T');
        date = date.substring(0, endRange);
        date = date.replace('-', '/');
        System.out.println("Date extracted: " + date);
        String time = Integer.toString(i.atZone(ZoneOffset.UTC).getHour() + 1);
        time += ":";

        int minutes = i.atZone(ZoneOffset.UTC).getMinute();
        if (minutes > 9) {
            time += Integer.toString(minutes);
        } else {
            time += "0" + Integer.toString(minutes);
        }

        System.out.println("Time extracted: " + time);
        String timeStamp = date + "-" + time;
        return timeStamp;
    }
}
