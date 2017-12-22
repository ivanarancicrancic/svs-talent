package com.seavus.twitter.repository;

import com.seavus.twitter.model.Twittuser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface TwittuserRepository extends JpaRepository<Twittuser, Integer> {

    public Twittuser findByMail(String mail);

}
