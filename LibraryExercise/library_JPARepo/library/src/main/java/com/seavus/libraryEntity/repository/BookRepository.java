package com.seavus.libraryEntity.repository;

import com.seavus.libraryEntity.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
}
