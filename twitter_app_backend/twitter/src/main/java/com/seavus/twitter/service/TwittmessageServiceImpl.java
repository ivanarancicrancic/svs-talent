package com.seavus.twitter.service;

import com.seavus.twitter.model.Twittmessage;
import com.seavus.twitter.model.Twittuser;
import com.seavus.twitter.repository.TwittmessageRepository;
import com.seavus.twitter.repository.TwittuserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service("twittmessageService")
@Component
public class TwittmessageServiceImpl implements TwittmessageService {

    @Autowired
    TwittmessageRepository message_repository;

    @Autowired
    TwittuserRepository user_repository;

    public List<Twittmessage> getAllMessagesFromFollowing(int id_currentUser){

            Twittuser twittuser = user_repository.findOne(id_currentUser);
            List<Twittmessage> messages = new ArrayList<>();
        for(Twittmessage twittmessage : message_repository.findAll()) {
          Twittuser owner = twittmessage.getTwittuser_id();
             if(twittuser.getFollowing().contains(owner))
                    messages.add(twittmessage);
        }

          return messages;
     }

    public List<Twittmessage> getAllSharedMessagesFromFollowing(int id_currentUser){

        Twittuser twittuser = user_repository.findOne(id_currentUser);
        List<Twittmessage> messages = new ArrayList<>();
        for(Twittmessage twittmessage : message_repository.findAll()) {
            Twittuser owner = twittmessage.getTwittuser_id();
            if(twittuser.getFollowing().contains(owner) && twittmessage.getTwittusers().contains(twittuser))
                messages.add(twittmessage);
        }
        return messages;

    }

    public Twittmessage getMessage(int id){
        return message_repository.findOne(id);
    }

    public Twittmessage createMessage(Twittmessage twittmessage, int id_owner, String[] alltags){
        Twittuser owner = user_repository.findOne(id_owner);
        twittmessage.setTwittuser_id(owner);
        List<Twittuser> twittusers = new ArrayList<>();
        for(String mail:alltags){
             twittusers.add(user_repository.findByMail(mail));
         }
         twittmessage.setTwittusers(twittusers);
        message_repository.save(twittmessage);
            return twittmessage;
    }

    public Twittmessage updateMessage(int id, Twittmessage twittmessage){
           Twittmessage message = message_repository.findOne(id);
           message.setContent(twittmessage.getContent());
           message.setTwittuser_id(twittmessage.getTwittuser_id());
           message.setTwittusers(twittmessage.getTwittusers());
           message_repository.save(message);
           return message;
    }

    public Twittmessage deleteMessage(int id){
        Twittmessage message = message_repository.findOne(id);
             message_repository.delete(id);
        return message;
    }

}
