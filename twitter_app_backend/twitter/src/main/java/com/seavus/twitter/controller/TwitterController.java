package com.seavus.twitter.controller;

import com.seavus.twitter.model.Twittmessage;
import com.seavus.twitter.model.Twittuser;
import com.seavus.twitter.service.TwittmessageService;
import com.seavus.twitter.service.TwittuserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/v1")
public class TwitterController {
    @Autowired
    TwittmessageService message_service;

    @Autowired
    TwittuserService user_service1;

    private int id_current_user=-1;

    @RequestMapping(value = "/twitts", method = RequestMethod.GET)
    public List<Twittmessage> getTwitts(){
        return message_service.getAllMessagesFromFollowing(id_current_user);
    }
//
//    @RequestMapping(value = "/followers", method = RequestMethod.GET)
//    public List<Twittuser> getFollowers(){
//        return user_service1.getAllTwittFollowers(id_current_user);
//    }
//
//
//    @RequestMapping(value = "/following", method = RequestMethod.GET)
//    public List<Twittuser> getFollowings(){
//        return user_service1.getAllTwittFollowing(id_current_user);
//    }
//
    @RequestMapping(value = "/twitts", method = RequestMethod.POST)
    @ResponseBody
    public Twittmessage createTwitt(@RequestParam(value="twitt_content") String content, @RequestParam(value="tags") String tags){
        Twittmessage message_to_send = new Twittmessage();
        message_to_send.setContent(content);
        String[] alltags = tags.split("@");
        System.out.println("Creating new twitt!");
        return message_service.createMessage(message_to_send, id_current_user, alltags);
    }

        @RequestMapping(value = "/follow", method = RequestMethod.POST)
    @ResponseBody
    public Twittuser redirectToFollowSite(@RequestParam(value="mail_input") String mail){
        System.out.println("Following user!");
        return user_service1.followUser(id_current_user, mail);
    }

//    @RequestMapping(value = "/following", method = RequestMethod.POST)
//    @ResponseBody
//    public Twittuser followTwittuser(@RequestParam(value="mail") String mail){
//        System.out.println("Following user!");
//        return user_service1.followUser(id_current_user, mail);
//    }
//
//    @RequestMapping(value = "/followers", method = RequestMethod.POST)
//    public @ResponseBody Twittuser unfollowTwittuser(@RequestParam(value="mail") String mail){
//        System.out.println("Unfollowing user!");
//        return user_service1.unfollowUser(id_current_user, mail);
//    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    @ResponseBody
    public Twittuser createTwittuser(@RequestParam(value="mail") String mail){
        System.out.println("Creating user...");
        Twittuser twittuser = new Twittuser();
        twittuser.setMail(mail);
        return user_service1.createUser(twittuser);
    }


    @RequestMapping(value = "/search", method = RequestMethod.POST)
    @ResponseBody
    public Twittuser getTwittuser(@RequestParam(value="mail") String mail){
        System.out.println("Searching for user...");
        Twittuser twittuser = user_service1.checkTwittuser(mail);
        if(twittuser!=null){
            System.out.println("Loading user...");
        }
        else{
            System.out.println("The user you've been searching for doesn't exist!");
        }
        return user_service1.createUser(twittuser);
    }

    @RequestMapping(value = "/account", method = RequestMethod.POST)
    public @ResponseBody Twittuser signInTwittuser(@RequestParam(value="mail") String mail){
        System.out.println("Trying to sign in...");
        Twittuser twittuser = user_service1.checkTwittuser(mail);
        if(twittuser!=null)
        {
            id_current_user = twittuser.getId();
        }
        else {
            System.out.println("Invalid user mail... Sign in again.");
             }
        return  twittuser;
    }

    @RequestMapping(value = "/account", method = RequestMethod.GET)
    public @ResponseBody List<Twittuser> getTwittuserss(){
        return user_service1.getAllTwittusers();
    }


    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public List<Twittuser> getTwittusers(){
        return user_service1.getAllTwittusers();
    }

//    @RequestMapping(value = "/users/{id}", method = RequestMethod.PUT)
//    public @ResponseBody Twittuser update(@PathVariable Long id, @RequestBody Twittuser twittuser){
//        //return user_service1.updateUser(id, twittuser);
//        return null;
//    }
//
//    @RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
//    public Twittuser deleteTwittuser(@PathVariable int id){
//        return user_service1.deleteTwittuser(id);
//    }

}
