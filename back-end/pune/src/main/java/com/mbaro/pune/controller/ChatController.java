package com.mbaro.pune.controller;

import com.mbaro.pune.model.ChatMessage;
import com.mbaro.pune.model.ChatMessageResponse;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class ChatController {

    @MessageMapping("/register")
    @SendTo("/topic/public")
    public ChatMessage register(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor){
        headerAccessor.getSessionAttributes().put("username",chatMessage.getSender());
        return chatMessage;
    }

    @MessageMapping("/hello")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage){
        return chatMessage;
    }

    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public ChatMessageResponse getMessage(final ChatMessage chatMessage) throws InterruptedException{
        Thread.sleep(1000);
        return new ChatMessageResponse(HtmlUtils.htmlEscape(chatMessage.getContent()));
    }
}
