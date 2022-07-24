package com.mbaro.pune.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "user_post")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Post {
    @Id
    @Column(name = "post_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    private String description;

    private String category;

    public Post(String title, String description, String category) {
        this.title = title;
        this.description = description;
        this.category = category;
    }
}
