package com.seavus.twitter.service;

import com.seavus.twitter.model.Twittuser;
import com.seavus.twitter.repository.TwittuserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service("twittuserService")
@Component
public class TwittuserServiceImpl implements TwittuserService {
    @Autowired
    TwittuserRepository twittuserRepository;

    public List<Twittuser> getAllTwittusers(){
        return twittuserRepository.findAll();
    }

    public List<Twittuser> getAllTwittFollowers(int twittuser_id){
       Twittuser twittuser = twittuserRepository.findOne(twittuser_id);
        return twittuser.getFollowers();
    }

    public List<Twittuser> getAllTwittFollowing(int twittuser_id){
        Twittuser twittuser = twittuserRepository.findOne(twittuser_id);
        return twittuser.getFollowing();
    }

    public Twittuser getUser(int id){
        return twittuserRepository.findOne(id);
    }

    public Twittuser followUser(int twittuser_id, String userToFollow_mail){
        Twittuser twittuser = twittuserRepository.findOne(twittuser_id);
        Twittuser userToFollow = twittuserRepository.findByMail(userToFollow_mail);
       List<Twittuser> following = new ArrayList<>();
       following = twittuser.getFollowers();
       following.add(userToFollow);
        twittuser.setFollowing(following);
        updateUser(twittuser.getId(),twittuser);
        return twittuser;
    }

    public Twittuser unfollowUser(int twittuser_id, String userToUnfollow_mail){
        Twittuser twittuser = twittuserRepository.findOne(twittuser_id);
        Twittuser userToUnfollow = twittuserRepository.findByMail(userToUnfollow_mail);
        List<Twittuser> following = new ArrayList<>();
        following = twittuser.getFollowers();
        following.remove(userToUnfollow);
        twittuser.setFollowing(following);
        updateUser(twittuser.getId(),twittuser);
        return twittuser;
    }

    public Twittuser createUser(Twittuser twittuser){
        twittuserRepository.save(twittuser);
        return twittuser;
    }

   public Twittuser checkTwittuser(String mail){
        Twittuser twittuser = twittuserRepository.findByMail(mail);
        return twittuser;
   }


    public Twittuser updateUser(int id, Twittuser twittuser){
            Twittuser userToUpdate = twittuserRepository.findOne(id);
            userToUpdate.setEMail(twittuser.getEmail());

            for(Twittuser current_following: userToUpdate.getFollowing()){
                if(twittuser.getFollowing().contains(current_following)){
                    continue;
                }
                else{
                    List<Twittuser> updatedFollowers = current_following.getFollowers();
                    updatedFollowers.remove(userToUpdate);
                    current_following.setFollowers(updatedFollowers);
                    twittuserRepository.save(current_following);
                }
            }

            for(Twittuser new_following: twittuser.getFollowing()){
                if(userToUpdate.getFollowing().contains(new_following))
                {
                    continue;
                }
                else{
                    List<Twittuser> followers = new_following.getFollowers();
                    followers.add(userToUpdate);
                    new_following.setFollowers(followers);
                    twittuserRepository.save(new_following);
                }
            }

            userToUpdate.setFollowing(twittuser.getFollowing());
            userToUpdate.setFollowers(twittuser.getFollowers());
            //preparing to update followers
//         for(Twittuser current_follower: userToUpdate.getFollowers()){
//            if(twittuser.getFollowers().contains(current_follower)){
//                continue;
//            }
//            else{
//                List<Twittuser> updatedFollowing = current_follower.getFollowing();
//                updatedFollowing.remove(userToUpdate);
//                current_follower.setFollowing(updatedFollowing);
//                message_repository.save(current_follower);
//            }
//        }
           // userToUpdate.setFollowers(twittuser.getFollowers());


            userToUpdate.setCreated_messages(twittuser.getCreatedMessages());
            userToUpdate.setMessages(twittuser.getMessages());
            twittuserRepository.save(userToUpdate);
            return userToUpdate;
    }

    public Twittuser deleteTwittuser(int id){

        Twittuser user = twittuserRepository.findOne(id);
        twittuserRepository.delete(id);
        return user;
    }


}
