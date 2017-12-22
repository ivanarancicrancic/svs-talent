package com.seavus.twitter.service;

import com.seavus.twitter.model.Twittmessage;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface TwittmessageService {

    //all messages from people that we are following
    public List<Twittmessage> getAllMessagesFromFollowing(int id);

    //this messages will be assigned as notification for tag - messages in which we are tagged
    public List<Twittmessage> getAllSharedMessagesFromFollowing(int id);

    public Twittmessage getMessage(int id);

    //this message will be stored in database with the list of tagged followers
    public Twittmessage createMessage(Twittmessage twittmessage, int id_owner, String[] alltags);

    public Twittmessage updateMessage(int id, Twittmessage twittmessage);

    public Twittmessage deleteMessage(int id);



}
