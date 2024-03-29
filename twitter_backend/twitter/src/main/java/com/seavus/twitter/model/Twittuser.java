package com.seavus.twitter.model;

import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.List;

@Entity
@Component
public class Twittuser {

    private int id;
    private String mail;
    private List<Twittmessage> messages; //these are messages(twitts) created by users that we are following and
    // shared with this user with the @username (m to m association)
    private List<Twittuser> following; // this is because of the m to m association between the users in follow relationship
    private List<Twittuser> followers;

    private List<Twittmessage> created_messages;

     public Twittuser(){}

     public Twittuser(String mail){this.mail = mail;}

     public Twittuser(String mail, List<Twittmessage> messages, List<Twittuser> leaders){

         this.mail = mail;
         this.messages = messages;
         this.following = leaders;
     }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return mail;
    }

    public void setEMail(String mail) {
        this.mail = mail;
    }

    @ManyToMany(mappedBy = "users")
    public List<Twittmessage> getMessages() {
        return messages;
    }

    public void setMessages(List<Twittmessage> messages) {
        this.messages = messages;
    }

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "follower_following", joinColumns = @JoinColumn(name = "follower_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "following_id", referencedColumnName = "id"))
    public List<Twittuser> getFollowing() {
        return following;
    }
    public void setFollowing(List<Twittuser> following) {
        this.following = following;
    }

    @ManyToMany(mappedBy = "following")
    public List<Twittuser> getFollowers() {
        return followers;
    }
    public void setFollowers(List<Twittuser> followers) {
        this.followers = followers;
    }

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    public List<Twittmessage> getCreatedMessages() {
        return created_messages;
    }

    public void setCreated_messages(List<Twittmessage> created_messages) {
        this.created_messages = created_messages;
    }

    @Override
    public String toString() {
        String result = String.format(
                "Twittuser [id=%d, mail='%s']%n",
                id, mail);
        if (messages != null) {
            for(Twittmessage message : messages) {
                result += String.format(
                        "Twittmessage[id=%d, content='%s']%n",
                        message.getId(), message.getContent());
            }
        if (following != null){
            for(Twittuser leader : following) {
                result += String.format(
                        "Twittuser[id=%d, mail='%s']%n",
                        leader.getId(), leader.getEmail());
            }
         if (created_messages != null){
             for(Twittmessage created_message : messages) {
                 result += String.format(
                         "Twittmessage[id=%d, content='%s']%n",
                         created_message.getId(), created_message.getContent());
             }
         }

        }

        }

        return result;
    }


}
