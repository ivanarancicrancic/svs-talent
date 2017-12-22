package com.seavus.twitter.repository;

import com.seavus.twitter.model.Twittmessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface TwittmessageRepository extends JpaRepository<Twittmessage, Integer> {

}