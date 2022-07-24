package com.mbaro.pune.model;

import javax.persistence.*;

@Entity
public class ChatMessageResponse {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    public ChatMessageResponse(String content) {
        this.content = content;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "ChatMessageResponse{" +
                "id=" + id +
                ", content='" + content + '\'' +
                '}';
    }
}
