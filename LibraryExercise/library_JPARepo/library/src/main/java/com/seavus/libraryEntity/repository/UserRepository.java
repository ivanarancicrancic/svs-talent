package com.seavus.libraryEntity.repository;

import com.seavus.libraryEntity.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
