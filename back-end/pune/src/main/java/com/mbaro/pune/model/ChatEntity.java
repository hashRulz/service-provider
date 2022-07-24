package com.mbaro.pune.model;

import javax.persistence.*;

@Entity(name="Chat")
@Table(name = "CHATS")
public class ChatEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id")
    private long chat_id;

    @Column(name = "name")
    private String name;


    public ChatEntity() {
    }

    public ChatEntity(String name) {
        this.name = name;
    }

    public long getChat_id() {
        return chat_id;
    }

    public void setChat_id(long chat_id) {
        this.chat_id = chat_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "ChatEntity{" +
                "chat_id=" + chat_id +
                ", name='" + name + '\'' +
                '}';
    }
}