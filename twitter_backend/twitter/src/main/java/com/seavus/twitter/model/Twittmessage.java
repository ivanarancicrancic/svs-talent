package com.seavus.twitter.model;

import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.List;

@Entity
@Component
public class Twittmessage {
    private int id;
    private String content;
    private List<Twittuser> twittusers; //these are the twittusers with which this message is shared (m to m association)
    private Twittuser twittuser_id; // this is the user that created the message - the owner of the message

    public Twittmessage(){}

    public Twittmessage(String content){this.content = content;}

    public Twittmessage(String content, List<Twittuser> twittusers, Twittuser twittuser_id){
        this.content = content;
        this.twittusers = twittusers;
        this.twittuser_id = twittuser_id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "twittmessage_twittuser", joinColumns = @JoinColumn(name = "twittmessage_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "twittuser_id", referencedColumnName = "id"))
    public List<Twittuser> getTwittusers() {
        return twittusers;
    }

    public void setTwittusers(List<Twittuser> twittusers) {
        this.twittusers = twittusers;
    }


    @ManyToOne
    @JoinColumn(name = "owner_id")
    public Twittuser getTwittuser_id() {
        return twittuser_id;
    }

    public void setTwittuser_id(Twittuser owner) {
        this.twittuser_id = owner;
    }


}
