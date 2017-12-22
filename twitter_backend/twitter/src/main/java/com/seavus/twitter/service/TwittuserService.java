package com.seavus.twitter.service;

import com.seavus.twitter.model.Twittuser;
import org.springframework.stereotype.Component;


import java.util.List;

@Component
public interface TwittuserService {

    public List<Twittuser> getAllTwittusers();

    public List<Twittuser> getAllTwittFollowers(int twittuser);

    public List<Twittuser> getAllTwittFollowing(int twittuser);

    public Twittuser getUser(int id);

    public Twittuser createUser(Twittuser twittuser);

    public Twittuser updateUser(int id, Twittuser twittuser);

    public Twittuser followUser(int twittuser_id, String userToFollow_mail);

    public Twittuser unfollowUser(int twittuser_id, String userToFollow_mail);

    public Twittuser checkTwittuser(String mail);

    public Twittuser deleteTwittuser(int id);


}
