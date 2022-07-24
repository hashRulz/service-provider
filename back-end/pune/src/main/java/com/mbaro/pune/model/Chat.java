package com.mbaro.pune.model;

import javax.persistence.*;

@Entity
@Table(name = "CHATS")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id")
    private long chat_id;

    @Column(name = "name")
    private String name;

//    private String Partecipant;

    public Chat() {
    }

    public Chat(String name) {
        this.name = name;
    }

//    public String getPartecipant() {
//        return Partecipant;
//    }
//
//    public void setPartecipant(String partecipant) {
//        Partecipant = partecipant;
//    }

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